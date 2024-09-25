import { IconArrowLeft } from "@/components/icons";
import Link from "next/link";
import React from "react";

const BannedAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-6xl">403</h1>
      <h2 className="mb-5">Your account has been banned</h2>
    </div>
  );
};

export default BannedAccount;
