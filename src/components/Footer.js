import "../styles/footer.css";
import React from "react";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div class="footer">
        <div class="footerLeft">
          Camille's Corner | camille@joinforge.co | PO Box 59
        </div>
        <div class="footerRight">
          <link
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            rel="stylesheet"
          ></link>
          <div class="container">
            <div
              class="text-center center-block footer-social-spacing"
              style={{ color: "white", margin: 1 }}
            >
              <a href="https://www.instagram.com">
                <i id="social-ig" class="fa fa-instagram fa-3x social"></i>
              </a>
              <a href="https://pinterest.com">
                <i class="fa fa-pinterest fa-3x social"></i>
              </a>
              <a href="https://youtube.com">
                <i id="social-yt" class="fa fa-youtube fa-3x social"></i>
              </a>
              <a href="https://tumblr.com">
                <i id="social-tb" class="fa fa-tumblr fa-3x social"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
