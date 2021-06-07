import banner from "../images/homeBanner.png";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../App.css";

const useStyles = makeStyles({
  root: {
    minWidth: 600,
    backgroundColor: "",
    color: "#446DAB",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const windowWidth = window.innerWidth;
  return (
    <div>
      <Card>
        <div style={{ float: "center" }}>
          <img
            src={banner}
            alt="City Street"
            style={{
              position: "absolute",
              width: windowWidth + 1,
              height: window.innerHeight * 0.75,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></img>
        </div>
      </Card>
      <div
        style={{
          textAlign: "left",
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 50,
          top: window.innerHeight - 200,
          position: "relative",
          fontSize: 30,
        }}
      >
        <Card className={classes.root}>
          <CardContent>
            <p>Welcome to City Girl Summer!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
