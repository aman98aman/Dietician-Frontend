import React from "react";
import { useSelector } from "react-redux";


const Home = () => {
  const userCount = useSelector((state)=> state.allUser.userArr||[])
  console.log("userCount is ", typeof userCount, userCount)
  return (
    <>
      <main className="mt-[95%] mx-8 my-4 p-2 lg:mx-16 md:mt-[12%] lg:mt-0">
        <h1 className="my-4 mb-8 text-3xl text-black">
          <i className="ai ai-house-line-fill mr-3 text-2xl text-black"></i>
          Home
        </h1>
        <section className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7">
          <div className="grid grid-cols-2 rounded-lg bg-white px-8 py-8 shadow-md">
            <div className="">
              <h4 className=" text-gray-400">Total Users</h4>
              <p className="text-3xl font-medium text-gray-600">{userCount.length}</p>
            </div>
            <div className="my-auto text-center">
              <i className="ai ai-users-three-light text-right text-6xl text-blue-600"></i>
            </div>
          </div>
          <div className="grid grid-cols-2 rounded-lg bg-white px-8 py-8 shadow-md">
            <div className="">
              <h4 className=" text-gray-400">Active Users</h4>
              <p className="text-3xl font-medium text-gray-600">{userCount?.length}</p>
            </div>
            <div className="my-auto text-center">
              <i className="ai ai-users-light text-right text-5xl text-emerald-600"></i>
            </div>
          </div>
          <div className="grid grid-cols-2 rounded-lg bg-white px-8 py-8 shadow-md">
            <div className="">
              <h4 className=" text-slate-400">Premium Users</h4>
              <p className="text-3xl font-medium text-gray-600">{userCount?.length}</p>
            </div>
            <div className="my-auto text-center">
              <i className="ai ai-users-light text-right text-5xl text-amber-500"></i>
            </div>
          </div>
          <div className="grid grid-cols-2 rounded-lg bg-white px-8 py-8 shadow-md">
            <div className="">
              <h4 className=" text-slate-400">Expiring Soon</h4>
              <p className="text-3xl font-medium text-gray-600">{userCount?.length}</p>
            </div>
            <div className="my-auto text-center">
              <i className="ai ai-user-minus-light text-right text-5xl text-red-400"></i>
            </div>
          </div>
        </section>

        <section className="my-7 rounded-lg bg-white p-20 shadow-md">
          <div className="text-center text-slate-400">User Growth Graph</div>
        </section>

        <section className="my-7 rounded-lg bg-white p-10 shadow-md">
          {/* <h2 className='text-2xl'>FAQ</h2> */}
          <ul className="mx-auto max-w-2xl divide-y text-white">
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="h-5 w-5 text-gray-400 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">What am I getting as a Premium Member?</span>
                </summary>

                <article className="px-4 pb-4">
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="h-5 w-5 text-gray-400 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">What am I getting as a Premium Member?</span>
                </summary>

                <article className="px-4 pb-4">
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.{" "}
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="h-5 w-5 text-gray-500 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">What am I getting as a Premium Member?</span>
                </summary>

                <article className="px-4 pb-4">
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.{" "}
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                  <svg
                    className="h-5 w-5 text-gray-400 transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">What am I getting as a Premium Member?</span>
                </summary>

                <article className="px-4 pb-4">
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.{" "}
                  </p>
                </article>
              </details>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
