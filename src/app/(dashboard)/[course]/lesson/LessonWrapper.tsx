"use client";
import useGlobalStore from "@/store";
import React from "react";

const LessonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  return (
    <div
      className="grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 items-start"
      style={{
        display: expandedPlayer ? "block" : "grid",
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
