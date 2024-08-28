import React from "react";

const LoadingOutline = () => {
  return (
    <div>
      <div className="h-2 rounded-full w-full mb-5 skeleton"></div>
      <div className="flex flex-col gap-5">
        <div className="skeleton w-full h-14 rounded-lg"></div>
        <div className="skeleton w-full h-14 rounded-lg"></div>
      </div>
    </div>
  );
};

export default LoadingOutline;
