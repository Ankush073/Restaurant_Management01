import HERO from "../assets/HERO.png";

const Hero = () => {
  return (
    <div>
      <img src={HERO} className="max-w max-h-[1000px] object-cover align-middle" />
    </div>
  );
};

export default Hero;