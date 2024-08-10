import arsh2 from "../assets/arsh2.jpg";

const ProfileCard = () => {
  return (
    <div
      className="container-md flex flex-col justify-center bg-gray-100 pb-10 pt-8 dark:bg-slate-900 dark:text-slate-200 md:flex-row"
      id="trainer"
    >
      <div className="flex flex-wrap justify-center rounded px-2">
        <div className="h-auto w-full border bg-white shadow-lg dark:border-0 dark:bg-slate-900 md:w-2/4 lg:w-1/4">
          <div className="p-6">
            <div className="max-w-100 mb-6 flex h-64 items-center justify-center rounded-xl bg-gray-300 dark:bg-slate-950">
            <img src={arsh2} alt="arsh pic" className="h-[100%] rounded-2xl lg:mt- p-3 xl:p-0 xl:mt-5 lg:h-auto w-full"  />
            </div>
            <h1 className="mb-2 mt-16 text-2xl font-bold dark:text-white xl:mt-9">
            Arsh sandhu
            </h1>
            <h2 className="mb-4 text-lg text-gray-600 dark:text-slate-300">
              Dietician & BodyBuilder
            </h2>
            {/* Contact Info*/} 
            {/* Hello */}
            <div className="mb-2 flex items-center rounded-full bg-gray-200 p-2 dark:bg-slate-950">
              <svg
                className="h-6 w-6 text-gray-800 dark:text-slate-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z" />
              </svg>

              <p className="ml-2 text-gray-600 dark:text-slate-300">
                +91 96894 00002
              </p>
            </div>
            {/* Email */}
            <div className="mb-2 flex items-center rounded-full bg-gray-200 p-2 dark:bg-slate-950">
              <svg
                className="h-6 w-6 text-gray-800 dark:text-slate-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.5a6 6 0 0 1 1.5 4v4a1 1 0 1 1-2 0v-4a4 4 0 0 0-4-4h-.5C5 6 3 8 3 10.5V16c0 .6.4 1 1 1h7v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h5c.6 0 1-.4 1-1v-6a4 4 0 0 0-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
              </svg>

              <p className="ml-2 text-gray-600 dark:text-slate-300 md:overflow-hidden">
              info@arshsandhufitness.com
              </p>
            </div>
            {/* Address */}
            <div className="mb-4 flex items-center rounded-full bg-gray-200 p-2 dark:bg-slate-950">
              <svg
                className="h-6 w-6 text-gray-800 dark:text-slate-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="ml-2 text-gray-600 dark:text-slate-300">
                Chandigarh, India
              </p>
            </div>
            <div className="flex xl:gap-16 md:gap-8">
              {/* Twitterr */}
              <a
                href="https://www.instagram.com/arshsandhu713?igsh=MWZnZ2V5cDE5c2s4Mw%3D%3D&utm_source=qr"
                className="mr-2 rounded-full bg-gray-200 p-2 text-gray-600 hover:text-gray-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-slate-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 5.9c-.7.3-1.5.5-2.4.6a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4.1 4.1 0 0 0-6.7 1.2 4 4 0 0 0-.2 2.5 11.7 11.7 0 0 1-8.5-4.3 4 4 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5a4 4 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.8c-1.8 1.3-4 2-6.1 1.7a11.7 11.7 0 0 0 10.7 1A11.5 11.5 0 0 0 20 8.5V8a10 10 0 0 0 2-2.1Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Linkedin */}
              <a
                href="https://www.instagram.com/arshsandhu713?igsh=MWZnZ2V5cDE5c2s4Mw%3D%3D&utm_source=qr"
                className="mr-2 rounded-full bg-gray-200 p-2 text-gray-600 hover:text-gray-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-slate-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.5 8.8v1.7a3.7 3.7 0 0 1 3.3-1.7c3.5 0 4.2 2.2 4.2 5v5.7h-3.2v-5c0-1.3-.2-2.8-2.1-2.8-1.9 0-2.2 1.3-2.2 2.6v5.2H9.3V8.8h3.2ZM7.2 6.1a1.6 1.6 0 0 1-2 1.6 1.6 1.6 0 0 1-1-2.2A1.6 1.6 0 0 1 6.6 5c.3.3.5.7.5 1.1Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.8H4v10.7h3.2V8.8Z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://www.instagram.com/arshsandhu713?igsh=MWZnZ2V5cDE5c2s4Mw%3D%3D&utm_source=qr"
                className="rounded-full bg-gray-200 p-2 text-gray-600 hover:text-gray-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-slate-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                 <path
                    fillRule="evenodd"
                    d="M12 2.2c2.7 0 3.1 0 4.2.1 1 .1 1.7.2 2.4.4.6.2 1.1.5 1.6.9.4.4.7.9.9 1.6.2.7.3 1.4.4 2.4.1 1.1.1 1.4.1 4.2s0 3.1-.1 4.2c-.1 1-.2 1.7-.4 2.4-.2.6-.5 1.1-.9 1.6-.4.4-.9.7-1.6.9-.7.2-1.4.3-2.4.4-1.1.1-1.4.1-4.2.1s-3.1 0-4.2-.1c-1-.1-1.7-.2-2.4-.4-.6-.2-1.1-.5-1.6-.9-.4-.4-.7-.9-.9-1.6-.2-.7-.3-1.4-.4-2.4-.1-1.1-.1-1.4-.1-4.2s0-3.1.1-4.2c.1-1 .2-1.7.4-2.4.2-.6.5-1.1.9-1.6.4-.4.9-.7 1.6-.9.7-.2 1.4-.3 2.4-.4 1.1-.1 1.4-.1 4.2-.1m0-2.2c-2.8 0-3.2 0-4.3.1-1.1.1-1.8.2-2.6.5a5.8 5.8 0 0 0-2.1 1.2A5.8 5.8 0 0 0 2.8 4c-.3.8-.4 1.5-.5 2.6-.1 1.1-.1 1.5-.1 4.3s0 3.2.1 4.3c.1 1.1.2 1.8.5 2.6.3.8.7 1.4 1.2 2.1a5.8 5.8 0 0 0 2.1 1.2c.8.3 1.5.4 2.6.5 1.1.1 1.5.1 4.3.1s3.2 0 4.3-.1c1.1-.1 1.8-.2 2.6-.5.8-.3 1.4-.7 2.1-1.2a5.8 5.8 0 0 0 1.2-2.1c.3-.8.4-1.5.5-2.6.1-1.1.1-1.5.1-4.3s0-3.2-.1-4.3c-.1-1.1-.2-1.8-.5-2.6a5.8 5.8 0 0 0-1.2-2.1A5.8 5.8 0 0 0 19.8 2c-.8-.3-1.5-.4-2.6-.5-1.1-.1-1.5-.1-4.3-.1zM12 6.8a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4zm0 8.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8zm6.4-10a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"
                    clipRule="evenodd"
                 />

                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full border p-6 shadow-lg dark:border-0 md:w-2/4">
          <h2 className="mb-4 text-3xl font-bold dark:text-white">
            Personal Details
          </h2>
          <p className="mb-4 md:line-clamp-3">
          Residing in a tranquil countryside, I have dedicated over five years to guiding individuals towards
          healthier lifestyles through personalized training and dietary plans. With a track record of a
          iding over 500 people, I bring a wealth of experience and commitment to each clients journey.
          </p>
          <h3 className="mb-2 text-xl font-bold">
            The Healthy Life Style For All
          </h3>
          <p className="mb-4 md:line-clamp-3">
          Join me on a journey to better health and vitality. Every person is unique, and I understand that.
          From tailored workouts to custom meal plans, I help individuals adopt sustainable habits that 
          promote long-term well-being.
          </p>
          {/* <ul className="mb-4 ms-6 list-disc">
            <li>
              Dynamically target high-payoff intellectual capital for customized
            </li>
            <li>Interactively procrastinate high-payoff content</li>
            <li>
              Credibly reinter mediate backend ideas for cross-platform models
            </li>
          </ul> */}
          <h3 className="mb-2 text-xl font-bold">
            Make real time a health improvements
          </h3>
          <p className="mb-4 ">
          I use the latest research and practical techniques to customize health solutions. By engaging clients in interactive exercises and nutritional guidance, I ensure progress towards their goals. With real-time adjustments, we optimize results for lasting health improvements.
          </p>
          <ol className="mb-4 ms-6 list-decimal">
            <li>
            I translate complex health concepts into practical solutions. By integrating backend ideas into client-focused strategies, I make wellness accessible and achievable. With clear guidance and support, clients confidently embrace positive changes.
            </li>
            <li>
            Together, we foster a supportive community that celebrates achievements and overcomes obstacles. Through shared experiences, we inspire each other to reach new levels of wellness. With teamwork, we create a healthier, happier future for everyone.
            </li>
            
          </ol>
          <p className="md:line-clamp-3">
            User generated content in real-time will have multiple touchpoints
            for offshoring. Capitalize on low hanging fruit to identify a
            ballpark value added activity to beta test. Override the digital
            divide with additional click throughs from DevOps. Nanotechnology
            immersion along the information highway will close the loop on
            focusing solely on the bottom line.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
