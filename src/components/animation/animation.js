import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../json/Loading.json";

export default function Loading() {
  return (
    <div className="w-10 h-10">
      <Lottie loop animationData={lottieJson} play className="w-full h-full" />
    </div>
  );
}
