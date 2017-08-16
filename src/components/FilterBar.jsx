import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { filtersArr } from '../constants';

const propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired
};

function FilterBar(props) {
  return (
    <div style={styles.container}>
      {filtersArr.map(val =>
        <FlatButton
          key={val}
          label={val}
          secondary={props.filter === val}
          onTouchTap={props.handleFilterClick}
          style={styles.button}
          labelStyle={styles.label}
          backgroundColor={'#FFF'}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 2px grey',
    position: 'fixed',
    marginTop: 64,
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    zIndex: 1000
  },
  button: {
    flex: 1,
    minWidth: 0
  },
  label: {
    padding: '0 2%',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0
  }
};

FilterBar.propTypes = propTypes;

export default FilterBar;
