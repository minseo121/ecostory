import React from "react";
import { useLocation } from "react-router-dom";
import pako from "pako";

function SharedPost() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get("data");

  if (!encodedData) {
    return <div>Invalid shared post link.</div>;
  }

  // Base64 디코딩 (URL 안전 문자를 원래대로 되돌림)
  const base64Decoded = encodedData.replace(/-/g, "+").replace(/_/g, "/");

  // Base64를 바이너리 데이터로 변환
  const binaryData = atob(base64Decoded);

  // 바이너리 데이터를 Uint8Array로 변환
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // 데이터 압축 해제
  const decompressedData = pako.inflate(uint8Array, { to: "string" });

  // JSON 파싱
  const postData = JSON.parse(decompressedData);

  return (
    <div className="shared-post max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
        공유된 게시물
      </h1>
      <div className="writer_info flex items-center mb-6">
        <div className="profile_img h-16 w-16 mr-4 rounded-full border-4 border-green-300 overflow-hidden">
          {postData.userImage ? (
            <img
              src={postData.userImage}
              className="object-cover w-full h-full"
              alt="User"
            />
          ) : (
            <svg
              className="object-cover w-full h-full"
              fill="#A9D6BE"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z"></path>
            </svg>
          )}
        </div>
        <div className="username text-xl font-semibold text-green-700">
          {postData.userName}
        </div>
      </div>
      <div className="post-image-container mb-6">
        <img
          src={postData.image}
          alt="Shared post"
          className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="post_content overflow-y-auto text-lg h-64 w-full mx-auto mt-4 p-4 bg-green-50 rounded-md">
        {postData.text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SharedPost;
