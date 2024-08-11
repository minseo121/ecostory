import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API } from "../api/API";

function SharedPost() {
  const location = useLocation();
  const { userId, postId } = useParams();
  const [postData, setPostData] = useState({
    id: null,
    image: null,
    content: "",
    username: "",
    userImage: null,
  });

  useEffect(() => {
    const initialShareData = async () => {
      try {
        const apiInstance = API();
        const response = await apiInstance.get(`/share/${userId}/${postId}`);
        if (response) {
          console.log("share 데이터 요청 성공:", response.data);
          console.log(`요청 경로: /share/${userId}/${postId}`);

          setPostData({
            id: response.data.id,
            image: response.data.image,
            content: response.data.content,
            username: response.data.username,
            userImage: response.data.userImage,
          });
        } else {
          console.log("response Error");
        }
      } catch (error) {
        console.error(
          "데이터 요청 실패:",
          error.response ? error.response.data : error.message
        );
      }
    };

    initialShareData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-white overflow-x-hidden overflow-y-auto pt-0 lg:flex-row lg:mx-[5%] sm:pt-32 lg:pt-0">
        <img
          src={postData.image}
          alt="post-image"
          className="w-5/6 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-lg border-4 border-[#A9D6BE]"
        />

        <div className="flex flex-col w-5/6 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 text-[#589B7F] mt-10 lg:ml-16">
          <div className="writer_info flex mb-3">
            <div className="profile_img h-[65px] w-[65px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE] overflow-hidden">
              {postData.userImage == null ? (
                <svg
                  className="object-cover w-full h-full"
                  fill="#A9D6BE"
                  width="800px"
                  height="800px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>user</title>
                  <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z"></path>
                </svg>
              ) : (
                <img
                  src={postData.userImage}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="username my-auto text-xl mr-2">
              {postData.username}
            </div>
          </div>

          <div className="devideline w-full my-4 border-2 border-[#A9D6C3]" />

          <div className="text-lg w-full mb-12 px-2 lg:h-[300px]">
            {postData.content.split("\n").map((line) => {
              return (
                <>
                  {line}
                  <br />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SharedPost;
