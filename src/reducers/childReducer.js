/*
 * src/reducers/childReducer.js
 */
// action : component redux
//state: prevouse  state of the store

export const childReducer = (state = { favorit_movies: [] }, action) => {
  let newState;

  switch (action.type) {
    case "SET_ACTION_TYPE":
      newState = Object.assign({}, state, { data_mv: action.data });
      return newState;

    case "SET_ACTION_TYPE_VALUE":
      newState = Object.assign({}, state, {
        value_in_reducer: action.data
      });
      return newState;

    case "SET_ACTION_TYPE_DATA_FAVORIT":
      newState = Object.assign({}, state, {
        favorit_movies: action.data
      });
      console.log("newState", newState);
      return newState;

    //define more cases as your project builds.
    default:
      return state;
  }
};

export default childReducer;
/*
Text("childReducer", () => {
  expect(childReducer("data_mv", { type: "SET_ACTION_TYPE", data: "data_mv" }));
}).toBe("data_mv");*/
