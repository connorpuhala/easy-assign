import { useHistory } from "react-router-dom";
import LogoImg from "../../images/Logo.svg";
const SplashScreen = () => {
  const history = useHistory();
  return (
    <div className="splash_bg">
      <div className="splash_enterapp">
        <img src={LogoImg} alt="logo" />
        <button onClick={() => history.push("/login")}>Enter app</button>
      </div>
    </div>
  );
};

export default SplashScreen;
