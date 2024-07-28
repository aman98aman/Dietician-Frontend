import React, { useState } from "react";

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content.",
    },
    {
      question: "Where can I get some?",
      answer: "There are many variations of passages of Lorem Ipsum available.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="mx-5 mt-5 max-w-lg p-6 shadow-lg">
      {faqData.map((faq, index) => (
        <div key={index} className="border-b border-gray-300">
          <button
            className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-lg font-medium">{faq.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${index === activeIndex ? "rotate-180 transform" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {index === activeIndex && <p className="p-4">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
