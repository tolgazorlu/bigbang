import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../../contexts/Store";
import { useUpdateProfileMutation } from "../../hooks/userHooks";
import { toast } from "react-toastify";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";

const Profile = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [firstName, setFirstName] = useState(userInfo!.firstName);
  const [lastName, setLastName] = useState(userInfo!.lastName);
  const [email, setEmail] = useState(userInfo!.email);
  const [avatar, setAvatar] = useState(userInfo!.avatar);
  const [phoneNumber, setPhoneNumber] = useState(userInfo!.phoneNumber);

  const { mutateAsync: updateProfile } = useUpdateProfileMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await updateProfile({
        firstName,
        lastName,
        email,
        avatar,
        phoneNumber
      });
      console.log(data);

      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-12">
      {userInfo ? <Helmet>{userInfo?.firstName}'s Profile</Helmet> : <></>}
      <div className="col-span-4 px-4 py-10">
        <div className="flex flex-col gap-4 border rounded-md p-8 shadow-md bg-slate-50">
          <img src={userInfo?.avatar} className="rounded-lg h-32 w-32" />
          <div className="w-full flex flex-col">
            <span className="font-bold text-xl">
              {userInfo?.firstName} {userInfo?.lastName}
            </span>
            <span className="font-bold text-xl">{userInfo?.email}</span>
            <span className="font-bold text-xl">{userInfo?.phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className="col-span-8 p-10">
        <div className="flex flex-col gap-4 border rounded-md p-4 shadow-md bg-slate-50">
          <span className="text-2xl font-bold">Edit Profile</span>
          <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-600 "
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder={firstName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-600 "
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder={lastName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600 "
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder={email}
                required
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-medium text-gray-600 "
              >
                Avatar
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder={avatar}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-600 "
              >
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder={phoneNumber}
                required
              />
            </div>
            <div className="w-full flex justify-between gap-1">
              <button
                type="submit"
                className="w-full border text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
