import { Route, Switch, Redirect } from "react-router-dom";
import Login from "containers/login";
import Signup from "containers/signup";
import ProblemsListing from "containers/problemsListing";
import { getEasyAssignUser } from "utils/utilities";
import SplashScreen from "containers/splashScreen";
const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={SplashScreen} />
      <ProtectedRoute exact path="/login" component={Login} />
      <ProtectedRoute exact path="/create-account" component={Signup} />
      <PrivateRoute exact path="/problems" component={ProblemsListing} />
      <Redirect from="*" to="/" />
    </Switch>
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

export const NoLoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return getEasyAssignUser() && getEasyAssignUser().id ? (
        <Component {...props} />
      ) : (
        <Redirect to="/problems" />
      );
    }}
  />
);

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return getEasyAssignUser() && getEasyAssignUser().id ? (
        <Redirect to="/problems" />
      ) : (
        <Component {...props} />
      );
    }}
  />
);
