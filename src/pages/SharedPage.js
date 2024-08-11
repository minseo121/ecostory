import React from "react";
import SharedPost from "../components/SharedPost";
import Header from "../components/Header/Header_BeforeLogin";

export default function SharedPage() {
  return (
    <>
      <div>
        <Header />
        <div className="w-screen h-screen pt-14 bg-[#D3E7DD]">
          <SharedPost />
        </div>
      </div>
    </>
  );
}
