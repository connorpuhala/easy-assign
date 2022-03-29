import types from "../types/prolems";
import * as API from "../../services";
// import { sleep } from "utils/utilities";
// import { allTags, problemsByTagsData } from "mock_data";

export const getAllTags = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ALL_TAGS_REQUEST,
    });
    try {
      const { results, count } = await API.getAllTags();
      const updatedTags = results.map((i) => {
        return {
          id: i.id,
          label: i.label,
        };
      });
      return dispatch({
        type: types.GET_ALL_TAGS_SUCCESS,
        payload: { results: updatedTags, count },
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

export const getProblemsByTags = ({ tag_ids }) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_PROBLEMS_BY_TAGS_REQUEST,
    });
    try {
      const { results, count } = await API.getProblemsByTags({ tag_ids });

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
  return async (dispatch) => {
    dispatch({
      type: types.CREATE_PROBLEM_REQUEST,
    });
    try {
      const data = await API.createProblem(body);
      console.log("data =====", data);
      // await sleep(2000);
      return dispatch({
        type: types.CREATE_PROBLEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("errorrr createProblem", error);
      return dispatch({
        type: types.CREATE_PROBLEM_ERROR,
        payload: error.message,
      });
    }
  };
};

export const editProblem = (body, id) => {
  return async (dispatch) => {
    dispatch({
      type: types.EDIT_PROBLEM_REQUEST,
    });
    try {
      const data = await API.editProblem(body, id);
      console.log("editProblem data =====", data);
      return dispatch({
        type: types.EDIT_PROBLEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("errorrr editProblem", error);
      return dispatch({
        type: types.EDIT_PROBLEM_ERROR,
        payload: error.message,
      });
    }
  };
};
export const deleteProblem = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.DELETE_PROBLEM_REQUEST,
      payload: id,
    });
    try {
      const res = await API.deleteProblem(id);
      console.log("resres=", res);
      return dispatch({
        type: types.DELETE_PROBLEM_SUCCESS,
        payload: id,
      });
    } catch (err) {
      return dispatch({
        type: types.DELETE_PROBLEM_ERROR,
        payload: error.message,
      });
    }
  };
};
export const createNewTag = (body) => {
  return async (dispatch) => {
    dispatch({
      type: types.CREATE_TAG_REQUEST,
    });
    try {
      const { results } = await API.createNewTag(body);
      return dispatch({
        type: types.CREATE_TAG_SUCCESS,
        payload: results,
      });
    } catch (error) {
      console.log("errorrr createNewTag", error);
      return dispatch({
        type: types.CREATE_TAG_ERROR,
        payload: error.message,
      });
    }
  };
};

export const emptyStateAfterLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: types.EMPTY_STATE_AFTER_LOGOUT,
    });
  };
};
