import { Grid, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";
import Tags from "./components/Tags";

const ProblemsListing = () => {
  return (
    <Container>
      <Grid divided="vertically" style={{ border: "2px solid red" }}>
        <Tags />
        <Grid.Row columns={3} style={{ border: "2px solid blue" }}>
          problemssss: in progress
        </Grid.Row>
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
