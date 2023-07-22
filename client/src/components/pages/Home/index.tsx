import Footer from "../../layouts/Footer";
import Header from "./Header";
import Jumbotron from "./Jumbotron";

const Home = () => {
  return (
    <div className="px-20">
      <Header />
      <Jumbotron />
      <Footer />
    </div>
  );
};

export default Home;
