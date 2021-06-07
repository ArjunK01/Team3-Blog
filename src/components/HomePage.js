import banner from "./banner.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "",
  },
});

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <div style={{ float: "center" }}>
        <img
          src={banner}
          alt="City Street"
          style={{ width: "100%", marginLeft: 0, marginRight: 0 }}
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
