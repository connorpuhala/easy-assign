import { useHistory } from "react-router-dom";

const SplashScreen = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Easy asign</h1>
      <h3 onClick={() => history.push("/login")}>Enter app</h3>
    </div>
  );
};

export default SplashScreen;
