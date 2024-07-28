import { Fade } from "react-awesome-reveal";

function Pricing() {
  return (
    <section className="dark:bg-slate-900">
      <p className="text-center text-2xl font-light"></p>
      <h2 className="pt-4 text-center text-5xl font-bold dark:text-slate-50">
        Plan & Pricing.
      </h2>
      <p className="mt-4 pb-3 text-center text-lg font-semibold opacity-60 dark:text-slate-100">
        Choose the right plan for your fitness goals
      </p>

      <div className="mx-auto flex w-full flex-wrap items-center gap-y-2 bg-slate-100 p-10 py-10 dark:bg-slate-900 ">
        <div className="w-full rounded border bg-white p-5 hover:shadow-lg dark:border-0 dark:bg-slate-950 dark:text-slate-100 md:w-1/2 lg:w-1/3">
          <h5 className="text-lg font-bold opacity-70">Premium</h5>
          <p className="my-2 text-sm">
            A Great way to start. Ideal for beginners
          </p>

          <span className="text-4xl font-bold">₹5,999</span>
          <span className="font-bold">/month</span>

          <p className="my-3 text-sm">
            Pause or cancel anytime. <br /> 7 days money back guarantee
          </p>

          <button
            type="button"
            className="my-3 w-[100%] rounded-full bg-black p-2 font-medium text-stone-200 dark:bg-slate-200 dark:text-black dark:hover:bg-white"
          >
            Get Started
          </button>

          <ol className="my-4 px-4 text-sm">
            <Fade cascade damping={0.2}>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">❌ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">❌ Fully Personalised Diet Plan Protocol</li>
            </Fade>
          </ol>
        </div>

        <div className="w-full rounded border bg-black p-5 text-white hover:shadow-lg dark:bg-slate-100 dark:text-slate-900 md:w-1/2 lg:w-1/3">
          <div className="flex">
            <h5 className="text-lg font-bold text-sky-500">Gold</h5>
            <span className="mx-2 animate-pulse">⭐</span>
          </div>
          <p className="my-2 text-sm">
            A Great way to start. Ideal for beginners
          </p>

          <span className="text-4xl font-bold">₹8,999</span>
          <span className="font-bold">/month</span>
          <hr className="my-5 hidden dark:border-slate-900 lg:block" />
          <p className="my-3 text-sm">
            Pause or cancel anytime. <br /> 7 days money back guarantee
          </p>

          <button
            type="button"
            className="my-3 w-[100%] rounded-full bg-sky-500 p-2 font-medium text-black dark:bg-slate-900 dark:text-slate-200"
          >
            Get Started
          </button>

          <ol className="my-4 px-4 text-sm">
            <Fade cascade damping={0.2}>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
            </Fade>
          </ol>
        </div>

        <div className="mx-auto w-full rounded border bg-white p-5 hover:shadow-lg dark:border-0 dark:bg-slate-950  dark:text-slate-100 md:w-1/2 lg:w-1/3">
          <h5 className="text-lg font-bold opacity-70">Premium +</h5>
          <p className="my-2 text-sm">
            A Great way to start. Ideal for beginners
          </p>

          <span className="text-4xl font-bold">₹6,999</span>
          <span className="font-bold">/month</span>

          <p className="my-3 text-sm">
            Pause or cancel anytime. <br /> 7 days money back guarantee
          </p>

          <button
            type="button"
            className="my-3 w-[100%] rounded-full bg-black p-2 font-medium text-stone-200 dark:bg-slate-200 dark:text-black dark:hover:bg-white"
          >
            Get Started
          </button>

          <ol className="my-4 px-4 text-sm">
            <Fade cascade damping={0.2}>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">✔ Fully Personalised Diet Plan Protocol</li>
              <li className="my-2">❌ Fully Personalised Diet Plan Protocol</li>
            </Fade>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
