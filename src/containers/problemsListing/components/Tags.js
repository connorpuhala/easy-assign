import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import { getAllTags, getProblemsByTags } from "redux/actions/problems";
import { LoaderWithinWrapper } from "components/global/loader";

const Tags = ({
  isGetAllTags,
  tags,
  tagsCount,
  isGetAllTagsError,
  isGetAllTagsErrorMsg,
  getAllTags,
  getProblemsByTags,
  mode,
  getSelectedTags,
  selectedTagIds,
  tagList,
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsList, setSelectedTagsList] = useState([]);
  useEffect(() => {
    if (!tags.length) {
      getAllTags();
    }
  }, []);

  useEffect(() => {
    if (selectedTagIds && selectedTagIds.length) {
      setSelectedTags([...selectedTagIds]);
      setSelectedTagsList([...tagList]);
    }
  }, [selectedTagIds]);

  const selectTagOnChangeHandler = (checked, tag) => {
    const tagId = tag.id;
    if (checked) {
      selectedTags.push(tagId);
      selectedTagsList.push(tag);
      setSelectedTags([...selectedTags]);
      setSelectedTagsList([...selectedTagsList]);
      if (mode === "listing") {
        getProblemsByTags({ tag_ids: selectedTags });
      } else {
        getSelectedTags({ selectedTags, selectedTagsList });
      }
    } else {
      let existingTagIndex = selectedTags.findIndex((i) => i === tagId);
      if (existingTagIndex > -1) {
        selectedTags.splice(existingTagIndex, 1);
        selectedTagsList.splice(existingTagIndex, 1);
        setSelectedTagsList([...selectedTagsList]);
        setSelectedTags([...selectedTags]);
        if (mode === "listing") {
          getProblemsByTags({ tag_ids: selectedTags });
        } else {
          getSelectedTags({ selectedTags, selectedTagsList });
        }
      }
    }
  };

  console.log("@selectedTagsList at tags ===", selectedTagsList);
  return (
    <div className="tag_bg" columns={mode === "modal" ? 2 : 3}>
      <ul>
        {isGetAllTags && <LoaderWithinWrapper />}
        {tags.length
          ? tags.map((tag, index) => (
              <TagItem
                key={tag.id}
                tag={tag}
                selectedTags={selectedTags}
                selectTagOnChangeHandler={selectTagOnChangeHandler}
              />
            ))
          : "No tags found"}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  let {
    isGetAllTags,
    tags,
    tagsCount,
    isGetAllTagsError,
    isGetAllTagsErrorMsg,
  } = state.problems;
  return {
    user: getEasyAssignUser(),
    isGetAllTags,
    tags,
    tagsCount,
    isGetAllTagsError,
    isGetAllTagsErrorMsg,
  };
};
const mapDispatch = (dispatch) =>
  bindActionCreators({ getAllTags, getProblemsByTags }, dispatch);

export default connect(mapStateToProps, mapDispatch)(Tags);

const TagItem = ({ tag, selectTagOnChangeHandler, selectedTags }) => {
  return (
    <>
      <li>{tag.label}</li>

      {/* <input
          type="checkbox"
          label={{ children: tag.label }}
          checked={selectedTags.includes(tag.id)}
          onChange={(e, data) => {
            // setChecked(data.checked)
            selectTagOnChangeHandler(data.checked, tag);
          }}
        /> */}
    </>
  );
};
