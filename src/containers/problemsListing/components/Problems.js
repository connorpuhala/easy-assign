import React, { useState } from "react";
import { Grid, Image, Segment, Button, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { getEasyAssignUser } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import CreateProblemModal from "components/createProblemModal";

const Problems = ({
  user,
  isGetProblemsByTags,
  problems,
  problemsCount,
  isGetProblemsByTagsError,
  isGetProblemsByTagsErrorMsg,
}) => {
  const [isCreateProblemModal, setIsCreateProblemModal] = useState(false);

  const createProblemModalHandler = (val) => {
    console.log("setIsCreateProblemModal");
    setIsCreateProblemModal(val);
  };
  return (
    <Grid.Row columns={3}>
      {isGetProblemsByTags ? <LoaderWithinWrapper /> : null}
      <div>
        {problems.length
          ? problems.map((problem, index) => {
              return (
                <ProblemItem
                  key={problem.id}
                  problem={problem}
                  user={user}
                  createProblemModalHandler={createProblemModalHandler}
                />
              );
            })
          : null}
      </div>
      {isCreateProblemModal ? (
        <CreateProblemModal
          isOpen={isCreateProblemModal}
          onClose={setIsCreateProblemModal}
        />
      ) : null}
    </Grid.Row>
  );
};

const mapStateToProps = (state) => {
  let {
    isGetProblemsByTags,
    problems,
    problemsCount,
    isGetProblemsByTagsError,
    isGetProblemsByTagsErrorMsg,
  } = state.problems;
  return {
    user: getEasyAssignUser(),
    isGetProblemsByTags,
    problems,
    problemsCount,
    isGetProblemsByTagsError,
    isGetProblemsByTagsErrorMsg,
  };
};

export default connect(mapStateToProps)(Problems);

const options = [
  { key: "edit", icon: "edit", text: "Edit", value: "edit" },
  { key: "delete", icon: "delete", text: "Delete", value: "delete" },
];
export const ProblemItem = ({ problem, user, createProblemModalHandler }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Segment raised vertical padded color="olive" style={{ margin: "10px" }}>
      id: {problem.id}
      {isLoading ? <LoaderWithinWrapper /> : null}
      <Image
        src={problem.image_url}
        size="large"
        centered
        onLoad={() => setIsLoading(false)}
      />
      {user.userRole === "admin" ? (
        <Button.Group color="teal">
          <Button onClick={() => createProblemModalHandler(true)}>Edit</Button>
          <Dropdown
            className="button icon"
            floating
            options={options}
            trigger={<></>}
          />
        </Button.Group>
      ) : null}
    </Segment>
  );
};
