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
import { Input ,Tooltip ,UncontrolledTooltip ,Button} from "reactstrap";

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
  setSelectedProblemTags,
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [requiredTags, setRequiredTags] = useState([]);
  const [selectedTagsList, setSelectedTagsList] = useState([]);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [search_term, setSearchTerm] = useState("");
  // const [tooltipOpen,setTooltipOpen] = useState(false);
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

  useEffect(() => {
    if (
      selectedTagsList &&
      selectedTagsList.length > 0 &&
      setSelectedProblemTags
    ) {
      setSelectedProblemTags([...selectedTagsList]);
    }
  }, [selectedTagsList]);
  
  

  const selectTagOnChangeHandler = (tag) => {
    const tagId = tag.id;
    const checked = !selectedTags.includes(tag.id);
    const required = !requiredTags.includes(tag.id);
    // const seletedRequiredTag = selectedTags.includes(tag.id)
    //  if(seletedRequiredTag) {
    //   setTooltipOpen(true)   
    //  } else {
    //   setTooltipOpen(false)
    //  }
    if (checked && required) {
      selectedTags.push(tagId);
      selectedTagsList.push(tag);
      setSelectedTags([...selectedTags]);
      setSelectedTagsList([...selectedTagsList]);

      if (mode === "listing") {
        getProblemsByTags({
          tag_ids: selectedTags,
          required_tag_ids: requiredTags,
        });
      } else {
        getSelectedTags({ selectedTags, selectedTagsList });
      }
    } else if (required && mode === "listing") {
      const existingTagIndex = selectedTags.findIndex((i) => i === tagId);
      if (existingTagIndex > -1) {
        const tagToReuired = selectedTags.splice(existingTagIndex, 1);
        const updatedRequiredTags = [...requiredTags, tagToReuired[0]];
        setRequiredTags(updatedRequiredTags);
        setSelectedTags([...selectedTags]);

        if (mode === "listing") {
          getProblemsByTags({
            tag_ids: selectedTags,
            required_tag_ids: updatedRequiredTags,
          });
        } else {
          getSelectedTags({ selectedTags, selectedTagsList });
        }
      }
    } else {
      if (mode === "listing") {
        const existingTagIndex = requiredTags.findIndex((i) => i === tagId);
        if (existingTagIndex > -1) {
          requiredTags.splice(existingTagIndex, 1);
          selectedTagsList.splice(existingTagIndex, 1);
          setSelectedTagsList([...selectedTagsList]);
          setRequiredTags([...requiredTags]);
        }
        getProblemsByTags({
          tag_ids: selectedTags,
          required_tag_ids: requiredTags,
        });
      } else {
        const existingTagIndex = selectedTags.findIndex((i) => i === tagId);
        if (existingTagIndex > -1) {
          selectedTags.splice(existingTagIndex, 1);
          selectedTagsList.splice(existingTagIndex, 1);
          setSelectedTagsList([...selectedTagsList]);
          setSelectedTags([...selectedTags]);
        }
      }
    }
  };

  const deleteTagHandler = (id) => {
    deleteTag(id);
  };

  const onSearchTags = (event) => {
    const value = event.target.value.toLowerCase();
    event.preventDefault();
    const data = tags.filter((el) => {
      const label = el.label.toLowerCase();
      return label.includes(value);
    });
    setSearchTerm(event.target.value);
    setFilteredTags(data);
  };

  const onSelectAllTags = () => {
    const tagsCopyArray = [...tags];
    const tagsSelected = tagsCopyArray.map((el) => el.id);
    setSelectedTags(tagsSelected);
    setSelectedTagsList(tagsCopyArray);
    setRequiredTags([]);
    if (mode === "listing") {
      getProblemsByTags({ tag_ids: tagsSelected, required_tag_ids: [] });
    } else {
      getSelectedTags({
        selectedTags: tagsSelected,
        selectedTagsList: tagsCopyArray,
      });
    }
  };

  const onDeselectAll = () => {
    setSelectedTagsList([]);
    setSelectedTags([]);
    setRequiredTags([]);
    if (mode === "listing") {
      getProblemsByTags({ tag_ids: [], required_tag_ids: [] });
    } else {
      getSelectedTags({ selectedTags: [], selectedTagsList: [] });
    }
  };

  const tagsToShow =
    mode === "listing" || mode === "modal" ? filteredTags : tags;
  tagsToShow.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className="tag_bg postion-relative" columns={mode === "modal" ? 2 : 3}>
      {isGetAllTags ? (
        <LoaderWithinWrapper />
      ) : tags.length ? (
        <>
          {mode === "listing" && (
            <div className="tags_filters">
              <div className="input_search d-flex">
                <Input
                  placeholder="search tags"
                  value={search_term}
                  onChange={onSearchTags}
                />
                {search_term.length > 0 && (
                  <CrossIcon
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredTags(tags);
                    }}
                  />
                )}
              </div>

              <button className="select_All" onClick={onSelectAllTags}>
                Select All
              </button>
              <button className="deSelect_All" onClick={onDeselectAll}>
                Select None
              </button>
            </div>
          )}
          {mode === "modal" && (
            <div className="tags_filters">
              <div className="input_search d-flex">
                <Input
                  placeholder="search tags"
                  value={search_term}
                  onChange={onSearchTags}
                />
                {search_term.length > 0 && (
                  <CrossIcon
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredTags(tags);
                    }}
                  />
                )}
              </div>
            </div>
          )}
          <ul>
            {tagsToShow.map((tag, index) => (
              <TagItem
                key={tag.id}
                tag={tag}
                selectedTags={selectedTags}
                requiredTags={requiredTags}
                selectTagOnChangeHandler={selectTagOnChangeHandler}
                mode={mode}
                deleteTag={deleteTagHandler}
                isEditTags={isEditTags}
                // tooltipOpen={tooltipOpen}
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
  requiredTags,
  mode,
  deleteTag,
  isEditTags,
  tooltipOpen
}) => {
  // const [open,setOpen] = useState(false)
  // const toggle =  () => {
  //   setOpen(!open)
  // }
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
              : requiredTags.includes(tag.id)
              ? "required-tag"
              : ""
            : ""
        }
      // id={requiredTags.includes(tag.id)
      //   ?`required-tag`
      //   : ""}   
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
        <div className="text-center">
  {/* <Button id="ScheduleUpdateTooltip">
    Click me
  </Button> */}
  {/* {tooltipOpen?
  <UncontrolledTooltip
    placement="right"
    target="required-tag"
    trigger="click"
  >
    fddgfdgfdggggggggggggg
  </UncontrolledTooltip>  :''} */}
 
</div>
    </>
  );
};
