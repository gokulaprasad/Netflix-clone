import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import assets from "../../data";
import Footer from "../footer";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully!");

      setTimeout(()=>{
        navigate("/homepage")
      })
    } catch (err) {
      console.error(err);
      setError("Sign up failed. Try a stronger password or different email.");
    }
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <img
          src={assets.HeroImage}
          alt=""
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
        <div className="absolute bg-gradient-to-b from-black via-black/40 to-black inset-0" />

        <div className="absolute top-6 left-6 z-10 px-25">
          <img src={assets.logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <div className="absolute flex inset-0 justify-center items-center">
          <div className="bg-black/50 w-[450px] h-[708px] p-15 flex flex-col items-center space-y-5">
            <h1 className="text-white text-3xl mb-7">Sign Up</h1>
            <form onSubmit={handleSignUp} className="w-full px-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 w-full h-[52px] px-5 mb-5 placeholder:text-gray-400 bg-black outline-none text-white rounded-md"
              />
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 w-full h-[52px] px-5 mb-5 placeholder:text-gray-400 bg-black outline-none text-white rounded-md"
              />
              <button
                type="submit"
                className="w-full h-10 bg-[#E50914] text-white"
              >
                Sign Up
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-sm text-center px-4">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center px-4">
                {success}
              </p>
            )}

            <p className="text-gray-400">
              Already have an account?{" "}
              <a href="/signin" className="text-white underline">
                Sign in now.
              </a>
            </p>
            <p className="text-gray-400 text-sm">
              This page is protected by Google reCAPTCHA to ensure you’re not a
              bot.{" "}
              <a href="#" className="text-blue-700">
                Learn more.
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
