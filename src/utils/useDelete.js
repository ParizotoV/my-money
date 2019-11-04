import { useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  console.log("State ->> ", state, " Action->> ", action);
  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: true
    };
  }
  if (action.type === "REQUEST") {
    return {
      ...state,
      loading: false,
      data: action.data
    };
  }
};

const useDelete = url => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  });

  const remove = url => {
    dispatch({ type: "REQUEST" });
    axios
      .delete(url)
      .then(() => {
      dispatch({ 
        type: "SUCCESS" 
      });
    });
  };
  return [data, remove]
};

export default useDelete;
