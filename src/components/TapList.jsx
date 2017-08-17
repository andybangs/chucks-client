import React from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Header from './Header';
import FilterBar from './FilterBar';
import TapTable from './TapTable';
import LocationMenu from './LocationMenu';
import {
  filters,
  filtersArr,
  orders,
  endpoints,
  titles,
  timeRange
} from '../constants';
import { loadState, saveState } from '../localStorage';

const propTypes = {
  params: PropTypes.object.isRequired
};

class TapList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      title: titles[this.props.params.location],
      filter: filters.ALL,
      order: orders.TAP,
      menuOpen: false,
      loading: false
    };
  }

  componentDidMount() {
    this.getList(this.props.params.location);
  }

  getList = location => {
    const savedState = loadState(location);
    console.log(savedState);
    if (
      !savedState ||
      (savedState && Date.now() - savedState.lastSaved > timeRange)
    ) {
      this.fetchList(location);
    } else {
      this.setState({ data: savedState.data });
    }
  };

  fetchList = location => {
    this.setState({ loading: true });
    fetch(endpoints[location])
      .then(res => {
        if (res.ok) {
          res.json().then(json => {
            this.setState({ data: json['body-json'].data, loading: false });
            saveState(location, json['body-json'].data);
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        throw new Error(error);
      });
  };

  filterItem = item => {
    const { filter } = this.state;
    const itemClass = item.class.split(' ')[1];

    if (filter === filters.ALL) return true;
    if (filter === itemClass) return true;
    if (
      filter === filters.OTHER &&
      (!itemClass || (itemClass && filtersArr.indexOf(itemClass) === -1))
    )
      return true;

    return false;
  };

  compareItems = (a, b) => {
    switch (this.state.order) {
      case orders.BREWERY:
        return a.brewery.toLowerCase() < b.brewery.toLowerCase() ? -1 : 1;
      case orders.BEER:
        return a.beer.toLowerCase() < b.beer.toLowerCase() ? -1 : 1;
      case orders.PRICE:
        return parseFloat(a.pint.slice(1)) - parseFloat(b.pint.slice(1));
      case orders.ABV:
        return a.abv - b.abv;
      default:
        return a.tap - b.tap;
    }
  };

  updateTitle = location => {
    this.setState({ title: titles[location] });
  };

  handleMenuClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  handleFilterClick = event => {
    const target = event.target.innerHTML;
    if (target) this.setState({ filter: target });
  };

  handleOrderClick = order => {
    this.setState({ order });
  };

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <Header
            title={this.state.title}
            handleMenuClick={this.handleMenuClick}
          />
          <LocationMenu
            menuOpen={this.state.menuOpen}
            fetchList={this.getList}
            updateTitle={this.updateTitle}
            handleMenuClick={this.handleMenuClick}
          />
          <FilterBar
            filter={this.state.filter}
            handleFilterClick={this.handleFilterClick}
          />
          <div style={styles.body}>
            <TapTable
              data={this.state.data}
              order={this.state.order}
              handleOrderClick={this.handleOrderClick}
              filterItem={this.filterItem}
              compareItems={this.compareItems}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header
          title={this.state.title}
          handleMenuClick={this.handleMenuClick}
        />
        <FilterBar
          filter={this.state.filter}
          filterItem={this.filterItem}
          handleFilterClick={this.handleFilterClick}
        />
        <div style={styles.body}>
          <RefreshIndicator
            size={50}
            left={window.innerWidth / 2 - 20}
            top={window.innerHeight / 2 - 20}
            status="loading"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  body: {
    paddingTop: 64 + 36
  }
};

TapList.propTypes = propTypes;

export default TapList;
