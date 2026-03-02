import Hero from "./components/sections/Hero";
import WhoWeAre from "./components/sections/WhoWeAre";
import WhyGreenBean from "./components/sections/WhyGreenBean";
import RealResults from "./components/sections/RealResults";
import GoogleReviews from "./components/sections/GoogleReviews";
import LocationDelivery from "./components/sections/LocationDelivery";
import FinalCTA from "./components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhyGreenBean />
      <RealResults />
      <GoogleReviews />
      <LocationDelivery />
      <FinalCTA />
    </>
  );
}
