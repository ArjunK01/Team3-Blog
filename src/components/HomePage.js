import banner from "../images/homeBanner.png";
import Card from "@material-ui/core/Card";
import FeaturedBlogCard from "./FeaturedBlogCard";
import "../App.css";
import { ApiContext } from "../context/ApiProvider";
import { useContext, useState, useEffect } from "react";

const HomePage = () => {
  //Define the screen window width variable
  const windowWidth = window.innerWidth;

  const { blog } = useContext(ApiContext);
  const [featuredList, setFeaturedList] = useState([]);
  useEffect(() => {
    console.log("Blogs", blog);
    let temp = blog.filter(b => b.isFeatured);
    setFeaturedList(temp);
  }, [blog]);

  return (
    <div style={{ height: 1600 }}>
      <Card>
        <div style={{ float: "center" }}>
          {/* City image for the banner */}
          <img
            src={banner}
            alt="City Street"
            style={{
              position: "absolute",
              width: windowWidth + 1, // sets width to the width of the screen
              height: window.innerHeight * 0.85, // sets height to  the screen
              left: 0,
              justifyContent: "center",
              alignItems: "center"
            }}
          ></img>
        </div>
      </Card>
      <div
        style={{
          position: "absolute",
          left: windowWidth / 7,
          right: windowWidth / 7,
          top: window.innerHeight * 0.97
        }}
      >
        <div className="blogHeader"> Featured Blog Posts</div>
        <div className="cont" style={{ marginBottom: "128px" }}>
          {featuredList.map(b => {
            return <FeaturedBlogCard b={b} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
