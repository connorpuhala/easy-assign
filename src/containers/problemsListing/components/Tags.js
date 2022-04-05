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
import { Input } from "reactstrap";

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
  isEditTags,
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsList, setSelectedTagsList] = useState([]);
  const [filteredTags, setFilteredTags] = useState(tags);
  useEffect(() => {
    if (!tags.length) {
      getAllTags();
    }
  }, []);

  useEffect(() => {
    if (tags.length > 0) {
      setFilteredTags(tags);
    }
  }, [tags]);

  useEffect(() => {
    if (selectedTagIds && selectedTagIds.length) {
      setSelectedTags([...selectedTagIds]);
      setSelectedTagsList([...tagList]);
    }
  }, [selectedTagIds]);

  const selectTagOnChangeHandler = (tag) => {
    console.log(
      "selectedTagsselectedTags=",
      selectedTags,
      tag,
      selectedTags.includes(tag.id)
    );
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

  const onSearchTags = (event) => {
    event.preventDefault();
    const data = tags.filter((el) => {
      return el.label.includes(event.target.value);
    });
    setFilteredTags(data);
  };

  const onSelectAllTags = () => {
    // selectedTags.push(...tags.map((el) => el.id));
    // selectedTagsList.push([...tags]);
    const tagsSelected = tags.map((el) => el.id);
    setSelectedTags(tagsSelected);
    setSelectedTagsList(tags);
    if (mode === "listing") {
      getProblemsByTags({ tag_ids: tagsSelected });
    } else {
      getSelectedTags({ selectedTags: tagsSelected, selectedTagsList: tags });
    }
  };

  const onDeselectAll = () => {
    // selectedTags.splice(existingTagIndex, 1);
    // selectedTagsList.splice(existingTagIndex, 1);
    setSelectedTagsList([]);
    setSelectedTags([]);
    if (mode === "listing") {
      getProblemsByTags({ tag_ids: [] });
    } else {
      getSelectedTags({ selectedTags: [], selectedTagsList: [] });
    }
  };

  const tagsToShow = mode === "listing" ? filteredTags : tags;

  console.log("selectedTags=", selectedTags);

  return (
    <div className="tag_bg postion-relative" columns={mode === "modal" ? 2 : 3}>
      {isGetAllTags ? (
        <LoaderWithinWrapper />
      ) : tags.length ? (
        <>
          {mode === "listing" && (
            <div className="tags_filters">
              <Input placeholder="search tags" onChange={onSearchTags} />
              <button className="select_All" onClick={onSelectAllTags}>
                Select All
              </button>
              <button className="deSelect_All" onClick={onDeselectAll}>
                Select None
              </button>
            </div>
          )}
          <ul>
            {tagsToShow.map((tag, index) => (
              <TagItem
                key={tag.id}
                tag={tag}
                selectedTags={selectedTags}
                selectTagOnChangeHandler={selectTagOnChangeHandler}
                mode={mode}
                deleteTag={deleteTagHandler}
                isEditTags={isEditTags}
              />
            ))}
          </ul>
        </>
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
  isEditTags,
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
          {mode === "listing" && isEditTags && (
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
