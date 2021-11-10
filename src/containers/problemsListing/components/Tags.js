import React, { useEffect, useState } from "react";
import { Grid, Checkbox } from "semantic-ui-react";
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
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    if (!tags.length) {
      getAllTags();
    }
  }, []);

  const selectTagOnChangeHandler = (checked, tagId) => {
    if (checked) {
      selectedTags.push(tagId);
      setSelectedTags([...selectedTags]);
      if (mode === "listing") {
        getProblemsByTags({ tags: selectedTags });
      } else {
        getSelectedTags(selectedTags);
      }
    } else {
      let existingTagIndex = selectedTags.findIndex((i) => i === tagId);
      if (existingTagIndex > -1) {
        selectedTags.splice(existingTagIndex, 1);
        setSelectedTags([...selectedTags]);
        if (mode === "listing") {
          getProblemsByTags({ tags: selectedTags });
        } else {
          getSelectedTags(selectedTags);
        }
      }
    }
  };
  return (
    <Grid.Row columns={mode === "modal" ? 2 : 3}>
      {isGetAllTags && <LoaderWithinWrapper />}
      {tags.length
        ? tags.map((tag, index) => (
            <TagItem
              key={tag.id}
              tag={tag}
              selectTagOnChangeHandler={selectTagOnChangeHandler}
            />
          ))
        : "No tags found"}
    </Grid.Row>
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

const TagItem = ({ tag, selectTagOnChangeHandler }) => {
  // const [checked, setChecked] = useState(false);
  return (
    <Grid.Column>
      id: {tag.id}
      <Checkbox
        label={{ children: tag.label }}
        // checked={checked}
        onChange={(e, data) => {
          // setChecked(data.checked)
          selectTagOnChangeHandler(data.checked, tag.id);
        }}
      />
    </Grid.Column>
  );
};
