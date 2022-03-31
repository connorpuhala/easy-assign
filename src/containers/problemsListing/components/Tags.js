import React, { useEffect, useState } from "react";
import { ReactComponent as CrossIcon } from "images/charm_cross.svg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import {
  getAllTags,
  getProblemsByTags,
  deleteTag,
} from "redux/actions/problems";
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
  deleteTag,
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

  const selectTagOnChangeHandler = (tag) => {
    const tagId = tag.id;
    const checked = !selectedTags.includes(tag.id);
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

  const deleteTagHandler = (id) => {
    deleteTag(id);
  };

  return (
    <div className="tag_bg postion-relative" columns={mode === "modal" ? 2 : 3}>
      {isGetAllTags ? (
        <LoaderWithinWrapper />
      ) : tags.length ? (
        <ul>
          {tags.map((tag, index) => (
            <TagItem
              key={tag.id}
              tag={tag}
              selectedTags={selectedTags}
              selectTagOnChangeHandler={selectTagOnChangeHandler}
              mode={mode}
              deleteTag={deleteTagHandler}
            />
          ))}
        </ul>
      ) : (
        "No tags found"
      )}
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
  bindActionCreators({ getAllTags, getProblemsByTags, deleteTag }, dispatch);

export default connect(mapStateToProps, mapDispatch)(Tags);

const TagItem = ({
  tag,
  selectTagOnChangeHandler,
  selectedTags,
  mode,
  deleteTag,
}) => {
  return (
    <>
      <li
        onClick={(event) => {
          event.stopPropagation();
          if (mode !== "listing-readonly") selectTagOnChangeHandler(tag);
        }}
        className={
          mode !== "listing-readonly"
            ? selectedTags.includes(tag.id)
              ? "selected-tag"
              : ""
            : ""
        }
      >
        <p>
          {tag.label}
          {mode === "listing" && (
            <span>
              <CrossIcon
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTag(tag.id);
                }}
              />
            </span>
          )}
        </p>
      </li>
    </>
  );
};
