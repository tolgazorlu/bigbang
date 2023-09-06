import Lottie from "lottie-react";
import ErrorAnimation from "../assets/animation/404.json";

const NotFound = () => {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center text-black bg-white">
      <div className="w-full flex justify-center items-center flex-col">
        <Lottie className="w-full h-64" animationData={ErrorAnimation} />
        <span className="font-space text-5xl">Page Not Found!</span>
      </div>
    </div>
  );
};

export default NotFound;
