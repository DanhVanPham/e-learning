import React from "react";

const LoadingPlayer = () => {
  return (
    <div>
      <div className="mb-5 aspect-video rounded-lg skeleton"></div>
      <div className="flex gap-3 mb-5">
        <div className="size-10 rounded-lg skeleton"></div>
        <div className="size-10 rounded-lg skeleton"></div>
      </div>
      <div className="w-full h-9 mb-10 skeleton"></div>
    </div>
  );
};

export default LoadingPlayer;
