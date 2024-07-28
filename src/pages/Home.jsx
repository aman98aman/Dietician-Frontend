// import Hero from './Hero'
import Upcoming from "../components/Upcoming";
import CookiePopup from "../components/CookiePopup";
import About from "../components/About";
import ProfileCard from "../components/ProfileCard";
import Carousel from "../components/Carousel";
// import VideoBanner from './VideoBanner'
// import ContactUs from './ContactUs'
// import TrainerDetails from './TrainerDetails'
import CardMarquee from "../components/CardMarquee";
import Pricing from "../components/Pricing";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="no-scrollbar">
      <Navbar />
  {/* <CookiePopup /> */}
      <Carousel />
      {/* <Hero /> */}
      <About />
      <Upcoming />
      {/* <TrainerDetails /> */}
      <ProfileCard />
      <CardMarquee />
      {/* <ContactUs /> */}
      {/* <VideoBanner /> */}
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
