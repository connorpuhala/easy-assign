import types from "../types/prolems";
const initialState = {
  isGetAllTags: false,
  tags: [],
  tagsCount: 0,
  isGetAllTagsError: false,
  isGetAllTagsErrorMsg: "",
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

    default:
      return state;
  }
};

export default prolems;
