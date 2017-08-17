export const filters = {
  ALL: 'all',
  IPA: 'ipa',
  SOUR: 'sour',
  STOUT: 'stout',
  CIDER: 'cider',
  OTHER: 'other'
};

export const filtersArr = Object.keys(filters).map(key => filters[key]);

export const orders = {
  TAP: 'Tap',
  BREWERY: 'Brewery',
  BEER: 'Beer',
  PRICE: 'Price',
  ABV: 'ABV'
};

export const url =
  'https://qz2twkw52m.execute-api.us-west-2.amazonaws.com/prod/taplist';

export const endpoints = {
  chucks85th: `${url}?location=85th`,
  chuckscd: `${url}?location=cd`
};

export const titles = {
  chucks85th: "Chuck's 85th",
  chuckscd: "Chuck's CD"
};

export const timeRange = 1000 * 60 * 10; // ten minutes
