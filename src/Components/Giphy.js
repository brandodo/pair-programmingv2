import React from "react";

export default function Giphy({ gifUrl, display }) {
  return (
    <iframe
      src={gifUrl}
      className={display ? "gif-box gif-box--show" : "gif-box"}
    />
  );
}
