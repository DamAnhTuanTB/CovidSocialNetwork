// @ts-nocheck

import { toast, Zoom } from "react-toastify";

const toastCustom = ({ mess = '', type = 'default' }) => {
  const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    newsestOnTop: true,
    transition: Zoom,
  };
  toast[type](mess, config);
};

export default toastCustom;
