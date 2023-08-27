import { IoEarth } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-white bg-black">
      <div className="w-full flex justify-center items-center flex-col gap-10">
      <IoEarth size="10em" className="animate-spin" />
      <span className="font-space text-5xl">404 Page Not Found!</span>
      </div>
      
    </div>
  );
};

export default NotFound;
