// components/ErrorModal.js
import React from "react";
import { useStore } from "./store";

import ContactLink from "./ContactLink";

const ErrorModal = () => {
  const { errorModal, setErrorModal, errorMsg } = useStore();

  if (!errorModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal modal-open">
        <div className="modal-box text-primary-content bg-black text-white space-y-4">
          <div className="bg-opacity-0 justify-end flex">
            <button onClick={() => setErrorModal(false)}>
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </button>
          </div>
          <div className="card bg-white text-primary-content w-full">
            <div className="card-body space-y-2">
              <h2 className="card-title">Error</h2>
              <p>
                Something went wrong. Please contact us
                <ContactLink />
                if the issue persists.
              </p>
            </div>
          </div>

          <div className="card bg-white text-primary-content w-full">
            <div className="card-body space-y-2">
              <h2 className="card-title">Error Message</h2>
              <div>{errorMsg.length > 0 ? errorMsg : "None"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
