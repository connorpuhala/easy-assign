import { Grid, Container, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import Tags from "./components/Tags";
import Problems from "./components/Problems";

const ProblemsListing = ({ user }) => {
  console.log("user ----", user);
  return (
    <Container>
      <Grid divided="vertically">
        <Tags />
        {user.userRole === "admin" ? (
          <Grid.Row columns={3}>
            <Button primary>Create Problem</Button>
          </Grid.Row>
        ) : null}
        <Button secondary>Download</Button>
        <Problems />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getEasyAssignUser(),
  };
};
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatch)(ProblemsListing);
