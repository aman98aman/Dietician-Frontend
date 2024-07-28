import { useState } from "react";

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleAccept = () => {
    setShowPopup(false);
    // TODO: Save the acceptance to the user's preferences or make any necessary API calls
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-black bg-opacity-80 p-4">
          {/* <p className="text-white">This website collects cookies to deliver better user experience. We collect cookies to analyze our website traffic and performance; we never collect any personal data</p> */}
          <p className="text-white">
            This website is design implementation of the actual website design
            can be Edit, Modified and Does not Represent any other live project.
          </p>
          <div>
            <button
              className="mr-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePopup;
