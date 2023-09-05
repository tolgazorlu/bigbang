import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../components/Register/UserForm";
import { useMultistepForm } from "../utils/useMultistepForm";
import ValidationForm from "../components/Register/ValidationForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <ValidationForm {...data} updateFields={updateFields} />,
    ]);

  const navigation = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLastStep) return next();

    if (data.password == data.confirmPassword) {
      await axios
        .post("http://localhost:8000/user/register", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        })
        .then(function () {
          setTimeout(() => {
            navigation("/login");
          }, 1000);
          toast.success("Registration failed!");
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Registration successed!");
        });
    } else {
      toast.error("Password and confirm password not matching!");
    }
  };

  return (
    <section className="bg-black">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Helmet>
        <title>Bigbang Register</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="font-space flex items-center mb-6 text-2xl font-semibold text-gray-100 mt-12"
        >
          Create an account
        </a>
        <ul className="steps mb-8">
          <li className="step step-accent">User Information</li>
          <li className={currentStepIndex > 0 ? "step step-accent" : "step"}>
            Validation
          </li>
          <li className={currentStepIndex > 1 ? "step step-accent" : "step"}>
            Complete
          </li>
        </ul>
        <div className="w-full rounded-lg shadow border dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {step}

              <div className="w-full flex justify-between gap-1">
                {!isFirstStep && (
                  <button
                    onClick={back}
                    className="w-4/12 border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  className="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isLastStep ? "Finish" : "Next"}
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
