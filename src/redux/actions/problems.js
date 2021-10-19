import types from "../types/prolems";
// import * as API from "../../services";
import { sleep } from "utils/utilities";
import { allTags, problemsByTagsData } from "mock_data";

export const getAllTags = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ALL_TAGS_REQUEST,
    });
    try {
      // const { data, error } = await API.getAllTags();
      await sleep(2000);
      return dispatch({
        type: types.GET_ALL_TAGS_SUCCESS,
        payload: allTags,
      });
    } catch (error) {
      console.log("errorrr getAllTags", error);
      return dispatch({
        type: types.GET_ALL_TAGS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getProblemsByTags = ({ tags }) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_PROBLEMS_BY_TAGS_REQUEST,
    });
    try {
      // const { data, error } = await API.getProblemsByTags({ tags });
      await sleep(2000);
      return dispatch({
        type: types.GET_PROBLEMS_BY_TAGS_SUCCESS,
        payload: problemsByTagsData,
      });
    } catch (error) {
      console.log("errorrr getAllTags", error);
      return dispatch({
        type: types.GET_PROBLEMS_BY_TAGS_ERROR,
        payload: error.message,
      });
    }
  };
};
