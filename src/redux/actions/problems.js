import types from "../types/prolems";
import * as API from "../../services";
import { sleep } from "utils/utilities";
import { allTags, problemsByTagsData } from "mock_data";

export const getAllTags = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ALL_TAGS_REQUEST,
    });
    try {
      const { results, count } = await API.getAllTags();
      return dispatch({
        type: types.GET_ALL_TAGS_SUCCESS,
        payload: { results, count },
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
      const { results, count } = await API.getProblemsByTags({ tagIDs: tags });

      return dispatch({
        type: types.GET_PROBLEMS_BY_TAGS_SUCCESS,
        payload: { results, count },
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

export const createProblem = (body) => {
  console.log("in action");
  return async (dispatch) => {
    console.log("in action dispatch");
    dispatch({
      type: types.GET_PROBLEMS_BY_TAGS_REQUEST,
    });
    try {
      const data = await API.createProblem(body);
      console.log("data =====", data);
      // await sleep(2000);
      return dispatch({
        type: types.GET_PROBLEMS_BY_TAGS_SUCCESS,
        payload: data,
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

export const createNewTag = (body) => {
  console.log("in action");
  return async (dispatch) => {
    console.log("in action dispatch");
    dispatch({
      type: types.CREATE_TAG_REQUEST,
    });
    try {
      const { results } = await API.createNewTag(body);
      console.log("data =====", results);
      // await sleep(2000);
      return dispatch({
        type: types.CREATE_TAG_SUCCESS,
        payload: results,
      });
    } catch (error) {
      console.log("errorrr getAllTags", error);
      return dispatch({
        type: types.CREATE_TAG_ERROR,
        payload: error.message,
      });
    }
  };
};
