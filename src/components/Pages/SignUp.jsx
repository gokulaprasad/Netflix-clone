import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import assets from "../../data";
import Footer from "../footer";

export default function SignInOrSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // true = Sign Up, false = Sign In
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        // Sign Up flow
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign In flow
        await signInWithEmailAndPassword(auth, email, password);
      }

      // On success, redirect to home
      navigate("/homepage");
    } catch (err) {
      console.error(err);
      setError(err.message || "Authentication failed. Try again!");
    }
  };

  return (
    <>
      <div className="w-full h-screen relative">
        {/* Hero Image */}
        <img
          src={assets.HeroImage}
          alt=""
          className="w-full h-full object-cover absolute inset-0 z-0"
        />

        <div className="absolute bg-gradient-to-b from-black via-black/40 to-black inset-0"></div>

        {/* Logo */}
        <div className="absolute top-6 left-6 z-10 px-25">
          <img src={assets.logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <div className="absolute flex inset-0 justify-center items-center">
          <div className="bg-black/50 w-[450px] p-15 flex flex-col items-center space-y-5 rounded-md">
            <h1 className="text-white text-3xl mb-7">{isSignUp ? "Sign Up" : "Sign In"}</h1>

            <form onSubmit={handleSubmit} className="w-full px-5">
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 w-full h-[52px] px-5 mb-5 placeholder:text-gray-400 bg-black outline-none text-white rounded-md"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 w-full h-[52px] px-5 mb-5 placeholder:text-gray-400 bg-black outline-none text-white rounded-md"
                required
              />

              <button
                type="submit"
                className="w-full h-10 bg-[#E50914] text-white font-semibold rounded cursor-pointer"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button> 

              {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            </form>

            <p className="text-gray-400">OR</p>

            <button className="w-full h-10 bg-white/20 text-white cursor-pointer">
              Use a Sign-In Code
            </button>

            <a href="#" className="text-white">
              Forgot Password?
            </a>

            <div className="flex flex-col items-start space-y-5 mt-5">
              <div className="space-x-2 flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-5 w-5 border-gray-400 form-checkbox"
                />
                <label htmlFor="rememberMe" className="text-white">
                  Remember me
                </label>
              </div>

              <p className="text-gray-400">
                {isSignUp ? "Already have an account?" : "New to Netflix?"}{" "}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-white underline cursor-pointer"
                >
                  {isSignUp ? "Sign in now." : "Sign up now."}
                </span>
              </p>

              <p className="text-gray-400 text-sm">
                This page is protected by Google reCAPTCHA to ensure you’re not
                a bot.{" "}
                <a href="#" className="text-blue-700">
                  Learn more.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
