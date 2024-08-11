import React from "react";
import { useLocation } from "react-router-dom";

function SharedPost() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get("data");

  if (!encodedData) {
    return <div>Invalid shared post link.</div>;
  }

  const postData = JSON.parse(decodeURIComponent(encodedData));

  return (
    <div className="shared-post">
      <h1>공유된 게시물</h1>
      <div className="writer_info flex mb-3">
        <div className="profile_img h-[65px] w-[65px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE] overflow-hidden">
          {postData.userImage ? (
            <img
              src={postData.userImage}
              className="object-cover w-full h-full"
              alt="User"
            />
          ) : (
            <svg /* ... SVG code for default user icon ... */ />
          )}
        </div>
        <div className="username my-auto text-xl mr-2">{postData.userName}</div>
      </div>
      <img
        src={postData.image}
        alt="Shared post"
        className="h-[570px] w-[465px] rounded-xl object-cover"
      />
      <div className="post_content overflow-y-auto text-lg h-[455px] w-full mx-auto mt-4">
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
