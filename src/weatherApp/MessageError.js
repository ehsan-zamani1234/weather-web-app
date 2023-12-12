import React from "react";

const MessageError = ({ message }) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
};

export default MessageError;
