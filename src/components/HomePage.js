import banner from "../images/homeBanner.png";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../App.css";

const HomePage = () => {
  const windowWidth = window.innerWidth;
  return (
    <div>
      <div style={{ float: "center", color: "black" }}>
        <img
          src={banner}
          alt="City Street"
          style={{
            position: "absolute",
            width: windowWidth + 1,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
