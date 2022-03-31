import types from "../types/prolems";
const initialState = {
  isGetAllTags: false,
  tags: [],
  tagsCount: 0,
  isGetAllTagsError: false,
  isGetAllTagsErrorMsg: "",

  isCreatingNewTag: false,

  isGetProblemsByTags: false,
  problems: [],
  problemsCount: 0,
  isGetProblemsByTagsError: false,
  isGetProblemsByTagsErrorMsg: "",

  isEditProblem: false,
  isEditProblemError: false,
};

const prolems = (state = initialState, action) => {
  switch (action.type) {
    //
    // GET_ALL_TAGS
    //
    case types.GET_ALL_TAGS_REQUEST:
      return {
        ...state,
        isGetAllTags: true,
        tags: [],
        tagsCount: 0,
        isGetAllTagsError: false,
        isGetAllTagsErrorMsg: "",
      };
    case types.GET_ALL_TAGS_SUCCESS:
      return {
        ...state,
        isGetAllTags: false,
        tags: action.payload.results,
        tagsCount: action.payload.count,
        isGetAllTagsError: false,
        isGetAllTagsErrorMsg: "",
      };

    case types.GET_ALL_TAGS_ERROR:
      return {
        ...state,
        isGetAllTags: false,
        tags: [],
        tagsCount: 0,
        isGetAllTagsError: true,
        isGetAllTagsErrorMsg: action.payload,
      };

    //
    // GET_PROBLEMS_BY_TAGS
    //
    case types.GET_PROBLEMS_BY_TAGS_REQUEST:
      return {
        ...state,
        isGetProblemsByTags: true,
        // problems: [],
        // problemsCount: 0,
        isGetProblemsByTagsError: false,
        isGetProblemsByTagsErrorMsg: "",
      };
    case types.GET_PROBLEMS_BY_TAGS_SUCCESS:
      return {
        ...state,
        isGetProblemsByTags: false,
        problems: action.payload.results ? action.payload.results : [],
        problemsCount: action.payload.count,
        isGetProblemsByTagsError: false,
        isGetProblemsByTagsErrorMsg: "",
      };

    case types.GET_PROBLEMS_BY_TAGS_ERROR:
      return {
        ...state,
        isGetProblemsByTags: false,
        problems: [],
        problemsCount: 0,
        isGetProblemsByTagsError: true,
        isGetProblemsByTagsErrorMsg: action.payload,
      };

    // CREATE_PROBLEM
    case types.CREATE_PROBLEM_REQUEST:
      return {
        ...state,
        isCreateProblem: true,
        // problems: [],
        // problemsCount: 0,
        isCreateProblemError: false,
        isCreateProblemErrorMsg: "",
      };
    case types.CREATE_PROBLEM_SUCCESS:
      return {
        ...state,
        isCreateProblem: false,
        isCreateProblemError: false,
        isCreateProblemErrorMsg: "",
      };

    case types.CREATE_PROBLEM_ERROR:
      return {
        ...state,
        isCreateProblem: false,
        isCreateProblemError: true,
        isCreateProblemErrorMsg: action.payload,
      };
    // delete problem
    case types.DELETE_PROBLEM_REQUEST: {
      return {
        ...state,
      };
    }

    case types.DELETE_PROBLEM_SUCCESS: {
      const oldProblems = state.problems;
      const existingProblemIndex = oldProblems.findIndex(
        (el) => el.id === action.payload
      );
      if (existingProblemIndex !== -1) {
        oldProblems.splice(existingProblemIndex, 1);
      }
      return {
        ...state,
        problems: oldProblems,
      };
    }

    case types.DELETE_PROBLEM_ERROR: {
      return {
        ...state,
      };
    }

    // EDIT_PROBLEM
    case types.EDIT_PROBLEM_REQUEST:
      return {
        ...state,
        isEditProblem: true,
      };
    case types.EDIT_PROBLEM_SUCCESS:
      let oldProblems = state.problems;
      let index = oldProblems.findIndex(
        (i) => action.payload.results[0].id === i.id
      );
      if (index > -1) {
        oldProblems.splice(index, 1, action.payload.results[0]);
      }
      return {
        ...state,
        isEditProblem: false,
        prolems: [...oldProblems],
      };

    case types.EDIT_PROBLEM_ERROR:
      return {
        ...state,
        isEditProblem: false,
        isEditProblemError: true,
      };

    // CREATE_TAG
    case types.CREATE_TAG_REQUEST:
      return {
        ...state,
        isCreatingNewTag: true,
      };
    case types.CREATE_TAG_SUCCESS:
      return {
        ...state,
        isCreatingNewTag: false,
        tags: [...state.tags, ...action.payload],
      };
    case types.CREATE_TAG_ERROR:
      return {
        ...state,
        isCreatingNewTag: false,
      };

    //
    // DELETE TAG
    //

    case types.DELETE_TAG_REQUEST:
      return {
        ...state,
        isDeletingTag: true,
      };
    case types.DELETE_TAG_SUCCESS:
      const oldTags = state.tags;
      const existingTagIndex = oldTags.findIndex(
        (el) => el.id === action.payload
      );
      if (existingTagIndex !== -1) {
        oldTags.splice(existingTagIndex, 1);
      }

      return {
        ...state,
        isDeletingTag: false,
        tags: oldTags,
      };
    case types.DELETE_TAG_ERROR:
      return {
        ...state,
        isDeletingTag: false,
      };

    // EMPTY_STATE_AFTER_LOGOUT
    case types.EMPTY_STATE_AFTER_LOGOUT:
      return {
        ...state,
        tags: [],
        tagsCount: 0,
        problems: [],
        problemsCount: 0,
      };

    default:
      return state;
  }
};

export default prolems;
