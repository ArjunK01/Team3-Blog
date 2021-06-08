import React from "react";
import image from "../images/beach.jpg";

const FeaturedBlogCard = () => {
  return (
    <div class="featuredBlogCard">
      <div className="featuredBlogCardImageContainer">
        <img className="featuredBlogCardImage" src={image} />
      </div>
      <div className="featuredBlogCardInfo">
        <div className="date">Tuesday, June 11</div>
        <div className="title">My trip to Miami Beach</div>
        <div className="contentPreview">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et d
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogCard;
