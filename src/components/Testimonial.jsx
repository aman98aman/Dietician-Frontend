import React from "react";

const Testimonial = ({ name, profession, rating, comment }) => {
  return (
    <div className="flex mx-2 mb-10 w-80 h-64 items-center divide-x-2 divide-slate-200 rounded bg-black p-2 shadow-lg dark:divide-slate-800 dark:bg-slate-100">
      {/* Uncomment and use if profile image is needed */}
      {/* <div className="me-4 h-24 w-24 overflow-hidden rounded-full">
        <img
          className="h-full w-full object-cover"
          src="https://source.unsplash.com/random"
          alt="Profile"
        />
      </div> */}
      <div className="px-4 flex-1">
        <h2 className="text-xl font-bold text-orange-400 dark:text-black">{name}</h2>
        <p className="text-red-600 dark:text-gray-800">{profession}</p>
        <div className="mt-4 flex items-center">
          <svg
            className="mr-1 h-4 w-4 fill-current text-yellow-500 dark:text-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 12.585l-4.243 2.41 1.02-4.735L2.93 7.565l4.738-.434L10 2l1.332 4.13 4.738.434-3.847 2.696 1.02 4.735L10 12.586z"
            />
          </svg>
          <p className="text-yellow-500 dark:text-amber-500">{rating}</p>
        </div>
        <p className="mt-2 text-gray-400 dark:text-gray-800">{comment}</p>
        <div id="plans"></div>
      </div>
    </div>
  );
};

export default Testimonial;
