import React from "react";

// Items Context
export const Context = React.createContext();

// Initial State
const initialState = {
  searches: [
    {
      searchTitle: "Top Food in Dallas",
      products: [
        {
          brand_name: "FoodLovers",
          product_name: "Tacos",
          category: "food",
          location: "Dallas",
        },
      ],
    },
  ],
};

// Actions
export const actions = {
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_SEARCH_TITLE: "SET_SEARCH_TITLE",
  APPEND_SEARCH: "APPEND_SEARCH",
  DELETE_SEARCH: "DELETE_SEARCH",
};

// Reducer to Handle Actions
const Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.APPEND_SEARCH:
      return {
        ...state,
        searches: [
          ...state.searches,
          {
            searchTitle: payload.searchTitle,
            products: payload.products,
          },
        ],
      };
    case actions.DELETE_SEARCH:
      console.log("pay", payload.searchTitle);
      return {
        ...state,
        searches: state.searches.filter(
          (search) => search.searchTitle !== payload.searchTitle
        ),
      };

    default:
      return { ...state };
  }
};

// Context Provider Wrapper
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Provider;
