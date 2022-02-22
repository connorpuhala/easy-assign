import { Grid, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import Tags from "./components/Tags";
import Problems from "./components/Problems";

const ProblemsListing = ({ user }) => {
  return (
    <Container>
      <h1>Easy Asign</h1>
      <h3>Problems at your fingertips - SAT/ACT</h3>
      <Grid divided="vertically">
        <Tags mode="listing" />
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
