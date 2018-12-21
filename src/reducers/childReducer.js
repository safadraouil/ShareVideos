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
      newState = Object.assign({}, state);

      if (typeof action.data !== "string") action.data = `${action.data}`;
      let favorit_movies_props = [...newState.favorit_movies];
      if (
        newState.favorit_movies &&
        newState.favorit_movies.includes(action.data)
      ) {
        favorit_movies_props = newState.favorit_movies.filter(
          item => item !== action.data
        );
      } else {
        favorit_movies_props.push(action.data);
      }

      newState.favorit_movies = favorit_movies_props;
      return newState;

    default:
      return state;
  }
};

export default childReducer;
