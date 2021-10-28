import types from "../types/prolems";
const initialState = {
  isGetAllTags: false,
  tags: [],
  tagsCount: 0,
  isGetAllTagsError: false,
  isGetAllTagsErrorMsg: "",
  isGetProblemsByTags: false,
  problems: [],
  problemsCount: 0,
  isGetProblemsByTagsError: false,
  isGetProblemsByTagsErrorMsg: "",
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
        tags: action.payload.tags,
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
        problems: action.payload,
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
    default:
      return state;
  }
};

export default prolems;
