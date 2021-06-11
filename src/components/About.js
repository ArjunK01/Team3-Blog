import react from "react";
import "../styles/about.css";
import camille from "../images/camille.png";

const About = () => {
  return (
    <div className="bottom-padding">
      <h2 className="temptemp" >
        ABOUT US
      </h2>
      <div className="aboutContainer">
        <div className="aboutHeroContainer">
          <img className="heroImg" src={camille} />
        </div>
        <div className="aboutBody">
          <h6>History:</h6> Camille’s Corner started back in the summer of 2019
          when Camille first moved to NYC for an internship. Sitting behind a
          screen all day in the middle of a giant concrete jungle made her long
          for the proper outdoors. Hopelessly stuck between being drawn to the
          culture of cities and the allure of Mother Nature, Camille decided to
          bridge the two worlds through adventure and discovery, adopting a
          digital nomad life that took her across the country. The name of the
          blog comes from the corner in her room where Camille hung up
          tapestries that depicted beautiful landscapes juxtaposed against her
          Soho apartment. The goal of Camille’s Corner is to show others that in
          every city, nature offers an escape, and no one has to choose only one
          world.
          <br></br>
          <h6 style={{ paddingTop: "10px" }}>About Camille:</h6> Camille is a
          recent college graduate from UVA currently traveling from city to city
          exploring what urban life offers while taking advantage of any
          opportunity to get back to the great outdoors. Educated as a chemical
          engineer, Camille threw that into the wind to pursue software
          development and adventure. Exclusively working for new start-ups as a
          freelancer, she has been able to have extended stays in NYC, Denver,
          SF, Seattle, and Barcelona. She hopes to go next to Austin or London,
          but, in truth, with her, you never know where she’ll be next. Known to
          be spontaneous and indecisive, Camille chose this life because it
          allows her to explore every option that life provides. She loves being
          a digital nomad because each new city brings new stories and
          opportunities. She never realized that documenting this way of life
          would garner such a large following for which she is grateful every
          day. Her goal is to promote adventures and positivity. One day she
          hopes to go to every national park.
          <li>
            Hobbies include hiking, climbing, yoga, snowboarding, and anything
            with music.
          </li>
          <li>She is a Virgo Libra cusp.</li>
          <br></br>
          <b>Best parts of nature: trees, mountains, and rivers</b>
          <b>Best parts of cities: music and rooftops</b>
        </div>
      </div>
    </div>
  );
};

export default About;
