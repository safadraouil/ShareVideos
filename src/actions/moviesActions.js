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

export const handelchange_action_comp = value => ({
  type: "SET_ACTION_TYPE_VALUE",
  data: value
});
export const handelclick_favorit = id => ({
  type: "SET_ACTION_TYPE_DATA_FAVORIT",
  data: id
});
/*
export const handelclick_favorit_list = id => ({
  type: "SET_ACTION_TYPE_DATA_FAVORIT_LIST",
  data: id
});*/
