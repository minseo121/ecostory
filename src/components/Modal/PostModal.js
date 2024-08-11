import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { API, getUserId } from "../../api/API";

function Modal(props) {
  const { modalClose, postEdit, id, image, text, userName, userImage, guest } =
    props;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal_overlay")) {
        modalClose(false);
        document.body.style.overflow = "unset";
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        modalClose(false);
        document.body.style.overflow = "unset";
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalClose]);

  //수정 버튼
  const postUpdate = () => {
    postEdit(true);
    modalClose(false);
  };

  //삭제 버튼 누르면 실행
  const postDelete = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const apiInstance = API();
        const userId = getUserId();
        const response = await apiInstance.delete(
          `/user/mypage/${userId}/delete`,
          {
            data: {
              post_Id: id,
            },
          }
        );
        if (response) {
          console.log("삭제 요청 성공:", response.data);
          console.log(`요청 경로: /user/mypage/${userId}/delete`);
          alert("삭제 성공");
          modalClose(false);
        } else {
          console.log("response Error");
          modalClose(false);
        }
      } catch (error) {
        console.error(
          "데이터 요청 실패:",
          error.response ? error.response.data : error.message
        );
        modalClose(false);
      }
    } else {
      console.log("token 유효하지 않음");
      modalClose(false);
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div className="hidden md:flex">
        <div className="modal_overlay fixed w-full h-full inset-0 bg-slate-200/[.3] flex justify-center items-center">
          <div className="modal flex justify-start bg-white opacity-100 h-[611px] w-[1014px] mx-[3%] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]">
            <div className="modal_img my-auto ml-[15px]">
              <img
                className="h-[570px] w-[465px] rounded-xl object-cover"
                alt="modal_image"
                src={image}
              />
            </div>

            <div className="modal_contents flex-1 mr-[15px] ml-[25px] my-[15px] text-[#589B7F]">
              {guest == false ? (
                <div className="modal_button flex justify-end space-x-6">
                  <button
                    className="post_edit text-xl my-auto"
                    onClick={postUpdate}
                  >
                    수정
                  </button>
                  <button
                    className="post_delete text-xl my-auto"
                    onClick={postDelete}
                  >
                    삭제
                  </button>
                  <button
                    className="modal_close float-right text-2xl"
                    onClick={() => {
                      modalClose(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="modal_button flex justify-end space-x-6">
                  <button
                    className="modal_close float-right text-2xl"
                    onClick={() => {
                      modalClose(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    X
                  </button>
                </div>
              )}

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

              <div className="post_content overflow-y-auto text-lg h-[455px] w-full mx-auto">
                {text.split("\n").map((line) => {
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
        </div>
      </div>

      <div className="flex md:hidden">
        <div className="fixed w-screen h-screen top-14 bg-white text-[#589B7F]">
          <div className="w-full h-full overflow-y-auto flex flex-col">
            <div className="mx-[5%]">
              {guest == false ? (
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
                  <div className="float-right text-lg my-auto flex">
                    <div className="mx-5">
                      <button onClick={postUpdate}>수정</button>
                    </div>
                    <div>
                      <button onClick={postDelete}>삭제</button>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}

              <div className="modal_img my-auto">
                <img
                  className="h-[350px] w-full rounded-xl object-cover"
                  alt="modal_image"
                  src={image}
                />
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

              <div className="post_content text-base w-full mb-20 px-2">
                <div>
                  {text.split("\n").map((line) => {
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
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
