/*
 * src/reducers/childReducer.js
 */

export const childReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {
    case "SET_ACTION_TYPE":
      newState = Object.assign({}, { data_mv: action.data });
      return newState;

    //define more cases as your project builds.
    default:
      return state;
  }
};

export default childReducer;
