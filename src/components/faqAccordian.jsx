import { useState } from "react";

import { PlusIcon, XMarkIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, smart TV, laptop, or streaming device for a fixed monthly fee. Plans range from ₹149 to ₹649 a month.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
    },
    {
      question: "Is Netflix good for kids?",
      answer:
        "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies.",
    },
  ];

  return (
    <>
      <div className="text-white bg-black max-w-3xl mx-auto px-4 py-10 ">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
  Frequently Asked Questions
</h1>


        <div className="space-y-2 ">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-[#2d2d2d] rounded-sm overflow-hidden "
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left text-lg md:text-xl font-medium cursor-pointer"
              >
                {item.question}
                {activeIndex === index ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <PlusIcon className="w-6 h-6" />
                )}
              </button>

              {activeIndex === index && (
                <div className="text-base md:text-lg px-6 pb-6">
                  {item.answer}
                </div>
              )}

              <div className="h-[1px] bg-black"></div>
            </div>
          ))}
          <div className=" flex flex-col justify-center items-center">
            <p className="text-lg mt-8 mb-5">Ready to watch? Enter your email to create or restart your membership.</p>


            <form action="/">
            <div className="space-x-3 flex">
              
              <input
                type="email"
                placeholder="Email address"
                className="border border-gray-400  w-[368px] h-[57px] rounded-md px-5 placeholder-gray-300 focus:outline-none"
              />
              <button className="w-[208px] h-[56px] bg-red-600 text-xl inline-flex items-center justify-center gap-3 px-3 rounded-md cursor-pointer" type="submit">
                Get Started <ChevronRightIcon className="w-5 h-5" type="submit"/>{" "}
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
