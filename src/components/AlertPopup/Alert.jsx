import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify's CSS


export const ValidLogin = ({username}) => {
  toast.success(`Welcome, ${username}`, {
    position: "top-center", 
    autoClose: 3000, 
    hideProgressBar: false, 
    closeOnClick: true, 
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const InvalidLogin = () => {
    toast.error("Invalid Username", {
        position: "top-center", 
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
};


export const Warning = ({message}) => {
  toast.warn(`${message}`, {
      position: "top-center", 
      autoClose: 3000, 
      hideProgressBar: false, 
      closeOnClick: true, 
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
};
