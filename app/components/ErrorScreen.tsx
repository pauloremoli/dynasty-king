import React from "react";

const ErrorScreen = () => {
  return (
    <div className="flex flex-col py-12 items-center justify-center text-2xl text-center dark:text-white p-4 h-screen min-h-screen">
      <div className="flex flex-col">
        <p>Something went wrong</p>
        <p>Try reloading the page.</p>
      </div>
    </div>
  );
};
export default ErrorScreen;
