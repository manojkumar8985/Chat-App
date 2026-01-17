import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import toast from "react-hot-toast";



function Signup() {
    let [userInfo,set]=useState({"fullName":"","email":"","password":"","re-password":""});
    const [problem, setProblem] = useState("");


    const queryClient=useQueryClient();

    const control = async (e) => {
      e.preventDefault();
      
      

  try {
    // if(userInfo.password!=userInfo.re-password){throw "Enter the correct password"}
    const res = await axiosInstance.post(
      `/auth/signup`,
      { 
        userName:userInfo.fullName,
        email:userInfo.email,
        password:userInfo.password 
      }
    );


    queryClient.invalidateQueries({
      queryKey: ["authUser"],
    });

   toast.success("Signup success")
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    setProblem(errorMessage)
    // alert(err.response?.data?.message );
    
  }
};



    let change=(e)=>{
        set({...userInfo,[e.target.name]:e.target.value})
        setProblem("");
    }
    const [acceptedTerms, setAcceptedTerms] = useState(false);




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white" data-theme="forest">
      



    {/* 🎃 Floating Halloween Decorations */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <span className="pumpkin pumpkin-1">🎃</span>
  <span className="pumpkin pumpkin-2">🎃</span>
  <span className="pumpkin pumpkin-3">👻</span>
  <span className="pumpkin pumpkin-3">👻</span>
  <span className="pumpkin pumpkin-3">👻</span>
  <span className="pumpkin pumpkin-1">🎃</span>
  <span className="pumpkin pumpkin-4">🕸️</span>
  <span className="pumpkin pumpkin-2">🎃</span>
  <span className="pumpkin pumpkin-4">🕸️</span>
  <span className="pumpkin pumpkin-1">🎃</span>
  <span className="pumpkin pumpkin-4">🕸️</span>
  <span className="pumpkin pumpkin-2">🎃</span>
</div>
{/* 🦇 Flying Bats */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <span className="bat bat-1">🦇</span>
  <span className="bat bat-2">🦇</span>
  <span className="bat bat-3">🦇</span>
</div>
{/* 🌙 Moon */}
<div className="pointer-events-none absolute top-6 right-6 moon"></div>






      

      {/* Card */}
      <div className="w-[900px] max-w-[95%] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl bg-black/40 backdrop-blur-md border border-white/10 ">

        {/* LEFT: FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-green-400 mb-1 flex items-center gap-2 ">
            ✳ Streamify
          </h2>
          <p className="text-gray-400 mb-6">
            <span className="font-bold">Create an Account</span>   <br />
            <span className="text-sm">
              Join LangConnect and start your language learning journey
            </span>
          </p>
          {problem!=""&&(
            <div className="alert alert-error mb-4">
              <span>{problem}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={control}>
            {/* Name */}
            <div>
              <label className="text-sm text-gray-300" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                onChange={change}
                type="text"
                placeholder="John Doe"
                className="w-full mt-1 px-4 py-2 rounded-full bg-black/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                onChange={change}
                type="email"
                placeholder="hello@example.com"
                className="w-full mt-1 px-4 py-2 rounded-full bg-black/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                onChange={change}
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 rounded-full bg-black/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Re-Password */}
            <div>
              <label className="text-sm text-gray-300" htmlFor="re-password">Re-Password</label>
              <input
                id="re-password"
                name="re-password"
                onChange={change}
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 rounded-full bg-black/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>


<div className="flex items-center gap-2 text-sm text-gray-400">
        <input
          type="checkbox"
          className="accent-green-400 cursor-pointer"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <span>
          I agree to the{" "}
          <span className="text-green-400 cursor-pointer">
            terms of service
          </span>{" "}
          and{" "}
          <span className="text-green-400 cursor-pointer">
            privacy policy
          </span>
        </span>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!acceptedTerms}
        className={`w-full py-3 rounded-full font-semibold transition
          ${
            acceptedTerms
              ? "bg-green-500 hover:bg-green-600 text-black"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }
        `}
      >
        Create Account
      </button>



            {/* Login link */}
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

       {/* RIGHT: ILLUSTRATION */}
<div className="hidden md:flex flex-col items-center justify-center bg-green-900/20 p-8 text-center">
  <video
    src="/video.mp4"   // 🔁 replace with your video file path
    autoPlay
    loop
    muted
    playsInline
    className="w-134 mb-6 rounded-xl object-cover"
  />
  <h3 className="text-lg font-semibold text-green-300">
    Connect with language partners worldwide
  </h3>
  <p className="text-sm text-gray-300 mt-2">
    Practice conversations, make friends, and improve your language
    skills together
  </p>
</div>

      </div>
    </div>
  );
}

export default Signup;
