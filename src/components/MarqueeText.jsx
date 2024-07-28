import Marquee from "react-fast-marquee";

const MarqueeText = () => {
  return (
    <Marquee className="text-lite mt-12 bg-black text-6xl font-bold uppercase text-white dark:bg-lime-400 dark:text-black">
      <div className="m-0 p-5">
        <p className="text-sky-500 font-mono ">
          Your Fitness Journey Starts Here | Train Hard Live Easy | Don't Quit | Your Health My Mission | Together We Conquer
        </p>
      </div>
    </Marquee>
  );
};

export default MarqueeText;
