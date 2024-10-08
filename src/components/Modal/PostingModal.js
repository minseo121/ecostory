import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import ImgCropModal from "../imgCrop/ImgCropModal.js";
import { API, getUserId } from "../../api/API.js";
import Resizer from "react-image-file-resizer";

function PostingModal(props) {
  const {
    modalClose,
    userName,
    userImage,
    id,
    postImage,
    postContent,
    postEdit,
    setPostEdit,
  } = props;

  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [updateData, setUpdateData] = useState(null);

  //렌더링 할때, 편집할 내용이 들어오면 변경해줌
  useEffect(() => {
    if (postEdit) {
      setCroppedImage(postImage);
      setContent(postContent);
    }
  }, []);

  const handleImageChange = (newImage) => {
    setImage(newImage);
    if (newImage.length > 0) {
      setIsCropModalOpen(true);
    }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  //반응형 할 때, textarea에서 글 작성으로 내용이 길어질 때 textarea의 크기도 같이 길어지도록
  const textAreaRef = useRef(null);
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      const cursorPosition = textArea.selectionStart; // 커서 위치 저장
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
      // 커서 위치 복원
    }
  }, [content]);

  // 이미지 리사이징 함수 수정
  const resizeFile = async (imageData) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageData;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      };

      img.onerror = function (error) {
        reject(error);
      };
    });
  };

  // Blob을 Base64로 변환하는 함수
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // 수정 & 게시 버튼 클릭 시 핸들러
  const postSubmit = async () => {
    //게시글 수정 기능
    if (postEdit) {
      try {
        // 원래 이미지에서 변경된 경우 base64 변환 처리
        if (postImage !== croppedImage) {
          const resizedImage = await resizeFile(croppedImage);
          const base64Image = await blobToBase64(resizedImage);

          setUpdateData({
            post_Id: id,
            post_Image: base64Image,
            content: content,
          });
        } else {
          setUpdateData({
            post_Id: id,
            post_Image: croppedImage,
            content: content,
          });
        }
      } catch (error) {
        console.error("이미지 리사이징 오류:", error);
      }
    } else {
      //게시 기능
      try {
        console.log("Image:", croppedImage);
        const resizedImage = await resizeFile(croppedImage);
        console.log("Resized Image:", resizedImage);

        // Blob을 Base64로 변환
        const base64Image = await blobToBase64(resizedImage);

        const postData = {
          post_Image: base64Image,
          content: content,
        };
        console.log("저장할 데이터:", postData);

        const token = localStorage.getItem("token");

        if (token) {
          try {
            const apiInstance = API();
            const userId = getUserId();
            console.log("userId:", userId); // userId 출력해서 확인
            console.log(`요청 경로: /user/mypage/${userId}/post`);

            const response = await apiInstance.post(
              `/user/mypage/${userId}/post`,
              postData
            );
            if (response) {
              console.log("post 데이터 요청 성공:", response.data);
              console.log(`요청 경로: /user/mypage/${userId}/post`);
            } else {
              console.log("응답이 없습니다.");
            }
          } catch (error) {
            console.error(
              "데이터 요청 실패:",
              error.response ? error.response.data : error.message
            );
          }
        } else {
          console.log("토큰이 없습니다.");
        }

        modalClose(false);
        document.body.style.overflow = "unset";
      } catch (error) {
        console.error("이미지 리사이징 오류:", error);
      }
    }
  };

  useEffect(() => {
    const updatePost = async () => {
      if (updateData) {
        console.log("업데이트데이터", updateData);
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const apiInstance = API();
            const userId = getUserId();

            const response = await apiInstance.put(
              `/user/mypage/${userId}/update`,
              updateData
            );

            if (response) {
              console.log("수정 요청 성공:", response.data);
              console.log(`수정 요청 경로: /user/mypage/${userId}/update`);
            } else {
              console.log("응답이 없습니다.");
            }
          } catch (error) {
            console.error(
              "수정 요청 실패:",
              error.response ? error.response.data : error.message
            );
          }
        } else {
          console.log("토큰이 없습니다.");
        }

        modalClose(false);
        setPostEdit(false);
        document.body.style.overflow = "unset";
      }
    };

    updatePost();
  }, [updateData]);

  return ReactDOM.createPortal(
    <div>
      <div className="hidden md:flex">
        <div className="modal_overlay fixed w-full h-full inset-0 bg-slate-200/[.3] flex justify-center items-center">
          <div className="modal flex justify-start bg-white opacity-100 h-[611px] w-[1014px] mx-[3%] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]">
            <div className="modal_img my-auto ml-[15px]">
              <ImageUploading value={image} onChange={handleImageChange}>
                {({ onImageUpload, onImageUpdate }) => (
                  <button
                    onClick={
                      image.length === 0
                        ? onImageUpload
                        : () => onImageUpdate(0)
                    }
                    {...props}
                  >
                    {croppedImage === null ? (
                      <div className="h-[570px] w-[465px] bg-[#D9D9D9] text-[#589B7F] rounded-xl text-xl flex items-center justify-center">
                        이미지 업로드
                      </div>
                    ) : (
                      <div>
                        <img
                          className="h-[570px] w-[465px] rounded-xl object-cover bg-[#D9D9D9]"
                          src={croppedImage}
                        />
                      </div>
                    )}
                  </button>
                )}
              </ImageUploading>
            </div>
            <div className="modal_contents flex-1 mr-[15px] ml-[25px] my-[15px] text-[#589B7F]">
              <div className="modal_button flex justify-end space-x-6">
                <button
                  className="post_upload text-xl my-auto"
                  onClick={postSubmit}
                >
                  {postEdit ? "수정" : "게시"}
                </button>
                <button
                  className="modal_close text-2xl"
                  onClick={() => {
                    setPostEdit(false);
                    modalClose(false);
                    document.body.style.overflow = "unset";
                  }}
                >
                  X
                </button>
              </div>
              <div className="writer_info flex mb-3">
                <div className="profile_img h-[65px] w-[65px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE] overflow-hidden">
                  {userImage == null ? (
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
                      src={userImage}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="username my-auto text-xl mr-2">{userName}</div>
              </div>
              <div className="devideline w-full my-4 border-2 border-[#A9D6C3]" />
              <div className="posting_content text-lg h-[435px] w-full mx-auto">
                <textarea
                  className="overflow-y-auto h-full w-full resize-none outline-none placeholder-[#589B7F]/[.4]"
                  placeholder="내용 입력"
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden">
        <div className="fixed w-screen h-screen top-14 bg-white text-[#589B7F]">
          <div className="w-full h-full overflow-y-auto flex flex-col">
            <div className="mx-[5%]">
              <div className="flex justify-between items-center">
                <div>
                  <button
                    className="modal_close float-left my-2 text-2xl"
                    onClick={() => {
                      modalClose(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    <svg
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        fill="#589B7F"
                        d="M34.5 23C34.5 23.7939 33.8564 24.4375 33.0625 24.4375H16.4079L22.579 30.6085C23.1403 31.1699 23.1403 32.0801 22.579 32.6415C22.0176 33.2028 21.1074 33.2028 20.546 32.6415L11.921 24.0165C11.3597 23.4551 11.3597 22.5449 11.921 21.9835L20.546 13.3585C21.1074 12.7972 22.0176 12.7972 22.579 13.3585C23.1403 13.9199 23.1403 14.8301 22.579 15.3915L16.4079 21.5625H33.0625C33.8564 21.5625 34.5 22.2061 34.5 23Z"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <button
                    className="post_upload float-right text-lg my-auto"
                    onClick={postSubmit}
                  >
                    {postEdit ? "수정" : "게시"}
                  </button>
                </div>
              </div>

              <div className="modal_img my-auto">
                <ImageUploading value={image} onChange={handleImageChange}>
                  {({ onImageUpload, onImageUpdate }) => (
                    <button
                      className="h-[350px] w-full"
                      onClick={
                        image.length === 0
                          ? onImageUpload
                          : () => onImageUpdate(0)
                      }
                      {...props}
                    >
                      {croppedImage === null ? (
                        <div className="h-full w-full bg-[#D9D9D9] text-[#589B7F] rounded-xl flex items-center justify-center">
                          이미지 업로드
                        </div>
                      ) : (
                        <div>
                          <img
                            className="h-[350px] w-full rounded-xl object-cover bg-[#D9D9D9]"
                            src={croppedImage}
                          />
                        </div>
                      )}
                    </button>
                  )}
                </ImageUploading>
              </div>
              <div className="writer_info flex mt-4">
                <div className="profile_img h-[50px] w-[50px] mr-2 rounded-full border-[3px] border-[#A9D6BE] overflow-hidden">
                  {userImage == null ? (
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
                      src={userImage}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="username my-auto text-base mr-2">
                  {userName}
                </div>
              </div>
              <div className="devideline w-full my-4 border-2 border-[#A9D6C3]" />
              <div className="posting_content text-base w-full mb-20 px-2">
                <textarea
                  ref={textAreaRef}
                  className="h-full w-full resize-none outline-none overflow-auto placeholder-[#589B7F]/[.4]"
                  placeholder="내용 입력"
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCropModalOpen && (
        <ImgCropModal
          modalClose={() => setIsCropModalOpen(false)}
          image={image.length > 0 ? image[0].dataURL : null}
          setCroppedImage={setCroppedImage}
        />
      )}
    </div>,
    document.getElementById("modal")
  );
}

export default PostingModal;
