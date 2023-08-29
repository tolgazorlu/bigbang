import Lottie from "lottie-react";
import ErrorAnimation from "../assets/animation/404.json";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-white bg-black">
      <div className="w-full flex justify-center items-center flex-col gap-10">
        <Lottie className="w-full h-64" animationData={ErrorAnimation} />
        <span className="font-space text-5xl">Page Not Found!</span>
      </div>
    </div>
  );
};

export default NotFound;
