"use client";

import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IsModalProps {
  closeModal: () => void;
  modelComponent: React.ReactNode;
  additionalProps?: any[]; // Additional props as a key-value pair
}

function IsModal(props: IsModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const close = () => {
    document.body.style.overflow = "unset";
    props.closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      {/* {React.cloneElement(props.modelComponent as React.ReactElement, {
        props.additionalProps,
      })} */}
      {/* {props.modelComponent} */}
      <button onClick={close} className="absolute top-3 right-3">
        <AiOutlineClose size={24} className="text-white" />
      </button>
    </div>
  );
}

export default IsModal;
