import { useState } from "react";
import { useHistory } from "react-router-dom";
import LogoImg from "../../images/Logo.svg";
const SplashScreen = () => {
  const history = useHistory();
  const [isVideo, setVideo] = useState(false);
  return (
    <div className="splash_bg">
      <div className="splash_enterapp">
        <img src={LogoImg} alt="logo" />
        <button onClick={() => history.push("/login")}>Enter app</button>

        <a  className="iframe_video" onClick={() => setVideo(!isVideo)}>What is Easy Assign?</a>
        {/* <a href="http://www.youtube.com/embed/To1flvGxdG0">What is Easy Assign?</a> */}
        {isVideo ?
          <iframe width="840" height="690"
            src="http://www.youtube.com/embed/To1flvGxdG0">
          </iframe>
          : ""}
      </div>
    </div>
  );
};

export default SplashScreen;
