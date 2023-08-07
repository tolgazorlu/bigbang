import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import StarsImage from "../../assets/parallax/stars.png";
import NeutronImage from "../../assets/parallax/neutron.png";
import GroundImage from "../../assets/parallax/ground.png";
import AstronoutImage from "../../assets/parallax/astronaut.png";
import Jumbotron from "../Jumbotron/Jumbotron";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";

const ParallaxPage = () => {
  return (
    <Parallax pages={1.62} style={{ top: "0", left: "0" }} className="bg-black">
      <Navbar />
      <ParallaxLayer offset={0} speed={0.5}>
        <img src={StarsImage} className="absolute animate-pulse" />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.1}>
        <div className="h-[70vh] w-full flex justify-around items-center text-white">
          <span className="text-xl animate-textLeft font-space">
            Fascinationg Space
          </span>
          <span className="text-xl animate-textRight font-space">
            THE BIGBANG
          </span>
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={2}>
        <img src={NeutronImage} />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={2.5}>
        <img src={GroundImage} />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={2.5}>
        <img src={AstronoutImage} />
        <div className="h-auto bg-black text-slate-300 p-24 font-space">
          <p>
            The year is 2123.
            <br />
            <br />
            Humanity had begun to satisfy its fascination with stars and planets
            by traveling to the places they had only dreamed of. As spaceships
            navigated among celestial bodies, the infinite beauties of the
            universe unfolded before people's eyes. This enchanting journey gave
            rise to the birth of a new digital platform: "Bigbang"!
            <br />
            <br />
            Bigbang was a unique e-commerce site that presented a magnificent
            collection of planets, stars, and meteorites from the depths of the
            universe. Here, people found the opportunity to experience the
            thrilling discoveries of the cosmos and explore their own universes.
            Bigbang was an extraordinary cosmos market that pushed the
            boundaries of imagination.
            <br />
            <br />
            Do you wish to get lost among dazzling planets shimmering from the
            stars? Or perhaps you are one of the brave explorers seeking a new
            life in a mysterious corner of the universe? At Bigbang, all these
            dreams awaited with options that would make them come true!
            <br />
            <br />
            Customers at Bigbang could access a vast pool of information
            containing detailed descriptions of each planet, unique photographs,
            and even interviews with the natives of these planets. This allowed
            them to evaluate their choices better and see how well they could
            adapt to their own special planets.
            <br />
            <br />
            Bigbang also managed all the necessary legal processes for
            purchasing planets.
            <br />
            <br />
            So, gather your courage and take a step into Bigbang to discover an
            extraordinary place in the universe! The time has come to explore
            your own magical world and take a step towards the universe you have
            always dreamed of!
          </p>
        </div>
        <div className="bg-black text-slate-300 px-20 font-space ">
          <Jumbotron />
          <Footer />
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};

export default ParallaxPage;
