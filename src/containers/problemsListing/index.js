import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEasyAssignUser } from "utils/utilities";

const ProblemsListing = () => {
  return (
    <div>
      tags
      <br />
      problems listing
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getEasyAssignUser(),
  };
};
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatch)(ProblemsListing);
