import React, { useState, useEffect } from "react";
import userAuth from "../hooks/useAuthUser";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constant";
import Loading from "./Loading";

export default function Boarding() {
  const { isLoading, user } = userAuth();
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    pic: "",
  });
  //   console.log(userInfo.pic);

  useEffect(() => {
    if (user) {
      setUserInfo({
        fullName: user.userName || "",
        bio: user.bio || "",
        nativeLanguage: user.nativeLanguage || "",
        learningLanguage: user.learningLanguage || "",
        location: user.location || "",
        pic: user.pic || "",
      });
    }
  }, [user]);

  if (isLoading) return <Loading />;

  const change = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const control = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        `/auth/onboard`,
        {
          fullName: userInfo.fullName,
          bio: userInfo.bio,
          nativeLanguage: userInfo.nativeLanguage,
          learningLanguage: userInfo.learningLanguage,
          location: userInfo.location,
          pic: userInfo.pic,
        }
      );

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Onboarding completed successfully 🎉");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Onboarding failed");
    }
  };



  const randomAvatar = () => {
    let x = Math.floor(Math.random() * 9) + 1;
    setUserInfo(prev => ({ ...prev, pic: `${x}.jpeg` }));
    toast.success("Spooky avatar selected 🎃");
  };


  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/wallpaper.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-black/50 backdrop-blur-xl p-6 shadow-2xl border border-white/10">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Complete Your Profile
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {userInfo.pic && (
              <img
                src={userInfo.pic}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <button
            type="button"
            onClick={randomAvatar}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded-full text-sm font-medium transition"
          >
            🔀 Generate Random Avatar
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={control}>
          <div>
            <label className="text-sm text-white/70">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={change}
              className="w-full mt-1 px-4 py-3 rounded-full bg-black/40 border border-white/10"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Bio</label>
            <textarea
              name="bio"
              value={userInfo.bio}
              onChange={change}
              rows={3}
              placeholder="Tell others about yourself"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-white/70">
                Native Language
              </label>
              <select
                name="nativeLanguage"
                value={userInfo.nativeLanguage}
                onChange={change}
                className="w-full mt-1 px-4 py-3 rounded-full bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" className="bg-black text-white">
                  Select native language
                </option>
                {LANGUAGES.map((lan) => (
                  <option
                    key={`native-${lan}`}
                    value={lan.toLowerCase()}
                    className="bg-black text-white"
                  >
                    {lan}
                  </option>
                ))}
              </select>

            </div>

            <div>
              <label className="text-sm text-white/70">
                Learning Language
              </label>
              <select
                name="learningLanguage"
                value={userInfo.learningLanguage}
                onChange={change}
                className="w-full mt-1 px-4 py-3 rounded-full bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" className="bg-black text-white">
                  Select learning language
                </option>
                {LANGUAGES.map((lan) => (
                  <option
                    key={`learning-${lan}`}
                    value={lan.toLowerCase()}
                    className="bg-black text-white"
                  >
                    {lan}
                  </option>
                ))}
              </select>

            </div>
          </div>

          <div>
            <label className="text-sm text-white/70">Location</label>
            <input
              type="text"
              name="location"
              value={userInfo.location}
              onChange={change}
              placeholder="City, Country"
              className="w-full mt-1 px-4 py-3 rounded-full bg-black/40 border border-white/10"
            />
          </div>

          <button className="w-full mt-4 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-lg transition">
            🌐 Complete Onboarding
          </button>
        </form>
      </div>
    </div>
  );
}
