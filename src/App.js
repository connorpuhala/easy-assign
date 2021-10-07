import { Route, Switch, Redirect } from "react-router-dom";
import Login from "containers/login";
import Signup from "containers/signup";
import ProblemsListing from "containers/problemsListing";
import { getEasyAssignUser } from "utils/utilities";

const App = () => {
  console.log("APP====")
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/create-account" component={Signup} />
        <PrivateRoute exact path="/problems" component={ProblemsListing} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export default App;

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return getEasyAssignUser() && getEasyAssignUser().id ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);
