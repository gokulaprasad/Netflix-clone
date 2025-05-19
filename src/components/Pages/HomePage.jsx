import assets from "../../data";
import FaqAccordion from "../faqAccordian";
import Footer from "../footer";
import Navbar from "../navbar";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  return (
    <>
      <div className="bg-black z-10">
        <div
          className="relative w-full h-[700px] bg-cover bg-center "
          style={{ backgroundImage: `url(${assets.HeroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black"></div>
          <Navbar />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white space-y-6">
            <h1 className="text-5xl font-extrabold">
              Unlimited movies, TV shows, and more
            </h1>
            <h2 className="text-2xl">Watch anywhere. Cancel anytime.</h2>
            <p className="text-xl">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            
            <form action="">
            <div className="space-x-3 flex">
              
              <input
                type="email"
                placeholder="Email address"
                className="border border-gray-400  w-[368px] h-[57px] rounded-md px-5 placeholder-gray-300 focus:outline-none"
              />
              <button className="w-[208px] h-[56px] bg-red-600 text-2xl font-semibold inline-flex items-center justify-center gap-3 px-3 rounded-md cursor-pointer" type="submit">
                Get Started <ChevronRightIcon className="w-5 h-5" />{" "}
              </button>
              
            </div>
            </form>
          </div>
        </div>
        <div
          className="space-x-7 flex justify-center items-center w-full h-[144px] from-red-500 via-black to to-black "
          style={{
            backgroundImage:
              "radial-gradient(circle, #FF9900 0%, #E50914 14%, #0E1B4F 77%, #000413 100% )",
          }}
        >
          <div>
            <img src={assets.popcorn} alt="popcorn" />
          </div>

          <div className="text-white flex flex-col items-start space-y-2">
            <h1>The Netflix you love for just $6.99.</h1>
            <h2>Get the Standard with ads plan.</h2>
            <a
              href=""
              className="inline-flex gap-3 justify-center items-center text-[#448EF4]"
            >
              Learn More <ChevronRightIcon className="w-5 h-5" />
            </a>
          </div>
          <div></div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-20 py-20">
          <div className="text-white space-y-5 flex flex-col flex-wrap ">
            <h1 className="text-4xl font-bold">Enjoy on your TV</h1>
            <p className="text-xl">
              Watch on Smart TVs, Playstation, Xbox,<br></br> Chromecast, Apple
              TV, Blu-ray players, and more.
            </p>
          </div>

          <div>
            <img src={assets.ScreenPreview} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-center border-y-6 border-y-gray-800 py-10 gap-15">
          <div>
            <img src={assets.watch} alt="" className="w-[546px] h-[410px]" />
          </div>

          <div className="text-white">
            <h1 className="text-4xl font-bold mb-5">Watch Everywhere</h1>
            <p className="text-lg">
              Stream unlimited movies and TV shows on <br></br> your phone,
              tablet, laptop, and TV.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center border-b-6 border-y-gray-800 py-10 gap-15">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-5">
              Create profiles for kids
            </h1>
            <p className="text-lg">
              Send kids on adventures with their favorite <br></br>characters in
              a space made just for them— <br></br>free with your membership.
            </p>
          </div>

          <div>
            <img src={assets.kids} alt="" />
          </div>
        </div>

        <div className="flex justify-center items-center border-b-6 border-y-gray-800 py-15">
          <div>
            <img src={assets.strangersthings} alt="" />
          </div>

          <div className="text-white ">
            <h1 className="text-4xl font-bold mb-4">
              Download your shows <br></br>to watch offline
            </h1>
            <p className="text-xl">Watch on a plane, train, or submarine...</p>
          </div>
        </div>

        {/*Collapsible accordian */}

        <FaqAccordion />
      </div>

      <Footer />
    </>
  );
}
