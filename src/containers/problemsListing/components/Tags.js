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
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    getAllTags();
  }, []);

  const selectTagOnChangeHandler = (checked, tagId) => {
    if (checked) {
      selectedTags.push(tagId);
      setSelectedTags([...selectedTags]);
      // getProblemsByTags({tags: selectedTags })
    } else {
      let existingTagIndex = selectedTags.findIndex((i) => i === tagId);
      if (existingTagIndex > -1) {
        selectedTags.splice(existingTagIndex, 1);
        setSelectedTags([...selectedTags]);
        // getProblemsByTags({tags: selectedTags })
      }
    }
  };
  return (
    <Grid.Row columns={3} style={{ border: "2px solid yellow" }}>
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
    <Grid.Column style={{ border: "2px solid green" }}>
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
