/*
 * src/actions/index.js
 */
// not limited to only one argument
export const setMovies = data_mv => ({
  type: "SET_ACTION_TYPE",
  data: data_mv
});

// Redux also suggest defining constants for your action types.
export const setActionTypes = {
  SET_ACTION_TYPE: "SET_ACTION_TYPE"
};
