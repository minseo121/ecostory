import { useState, useEffect, useRef } from "react";
import Header from "../components/Header/Header_AfterLogin";
import Modal from "../components/Modal/PostModal";
import PostingModal from "../components/Modal/PostingModal";
import { API, getUserId } from "../api/API.js";
import pako from "pako";

function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [PostingModalOpen, setPostingModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [postData, setPostData] = useState([]);
  const [guest, setGuest] = useState(false);
  const [postEdit, setPostEdit] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setGuest(false);

        try {
          const apiInstance = API();
          const userId = getUserId();
          const response = await apiInstance.get(`/user/mypage/${userId}`);
          if (response) {
            setUserName(response.data.user_name);
            setUserImage(response.data.user_image);
            setPostData(response.data.post || []);

            console.log("초기 데이터 요청 성공:", response.data);
            console.log(`요청 경로: /user/mypage/${userId}`);
            console.log(
              `user: ${response.data.user_name} , image: ${response.data.user_image}, post: ${response.data.post || []}`
            );
          } else {
            console.log("response Error");
          }
        } catch (error) {
          console.error(
            "데이터 요청 실패:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        setGuest(true);
        console.log("token 유효하지 않음: 비회원");
      }
    };

    checkToken();
  }, [modalOpen, PostingModalOpen, postEdit]);

  const handleImageClick = (image) => {
    setSelectedImage(image.image);
    setSelectedText(image.content);
    setSelectedId(image.id);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleMenuClick = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(null);
    }
  };

  const handleShare = (post) => {
    setMenuOpen(null);

    const postData = {
      id: post.id,
      image: post.image,
      text: post.content,
      userName,
      userImage,
    };

    // 데이터를 JSON 문자열로 변환
    const jsonString = JSON.stringify(postData);

    // 문자열을 UTF-8 인코딩된 Uint8Array로 변환
    const uint8Array = new TextEncoder().encode(jsonString);

    // 데이터 압축
    const compressedData = pako.deflate(uint8Array);

    // 압축된 데이터를 Base64로 인코딩
    const base64Encoded = btoa(String.fromCharCode.apply(null, compressedData));

    // URL에 안전한 형식으로 인코딩
    const urlSafeEncoded = base64Encoded
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const shareUrl = `${window.location.origin}/sharedpost/useId/postId`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("공유 링크가 클립보드에 복사되었습니다.");
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // postEdit 값이 true일 때 PostingModal 열기
  useEffect(() => {
    if (postEdit) {
      setPostingModal(true);
      document.body.style.overflow = "hidden";
    }
  }, [postEdit]);

  return (
    <div>
      <Header />

      <div className="profile bg-white h-full mt-24 mb-8 sm:mb-16 sm:mt-28">
        <div className="profile_container flex flex-col justify-center items-center">
          <div className="profile_img h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] mx-auto rounded-full border-[3px] sm:border-4 border-[#A9D6BE] overflow-hidden">
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
              <img src={userImage} className="object-cover w-full h-full" />
            )}
          </div>

          <div className="username mt-[15px] text-[#589B7F] text-lg sm:text-xl">
            {userName}
          </div>
        </div>

        <div className="post_container mx-[5%] md:mx-[7%] lg:mx-[20%] my-[40px]">
          <div className="post_frame rounded-lg border-4 border-[#61D2A2]">
            <div className="post_title h-[50px] bg-[#61D2A2] text-white text-base sm:text-lg md:text-xl">
              <div className="h-full flex justify-start items-center mx-[20px]">
                {PostingModalOpen === true ? (
                  <PostingModal
                    modalClose={setPostingModal}
                    userName={userName}
                    userImage={userImage}
                    id={selectedId}
                    postImage={selectedImage}
                    postContent={selectedText}
                    postEdit={postEdit}
                    setPostEdit={setPostEdit}
                  />
                ) : null}
                <div className="title1">내 게시글</div>
                <div className="title2 ml-auto text-2xl">
                  <button
                    onClick={() => {
                      setPostingModal(true);
                      document.body.style.overflow = "hidden";
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
            </div>

            {postData.length > 0 ? (
              <div className="post_container mx-2 my-2 sm:mx-[10px] sm:my-[10px] grid grid-cols-3 gap-x-1 gap-y-1 sm:gap-x-2 sm:gap-y-2 justify-items-center">
                {modalOpen && selectedImage && (
                  <Modal
                    id={selectedId}
                    image={selectedImage}
                    text={selectedText}
                    modalClose={setModalOpen}
                    postEdit={setPostEdit}
                    userName={userName}
                    userImage={userImage}
                    guest={guest}
                  />
                )}

                {postData.map((post) => (
                  <div key={post.id} className="relative">
                    <button onClick={() => handleImageClick(post)}>
                      <div className="max-w-[320px] max-h-[320px] overflow-hidden flex items-center justify-center">
                        <img
                          className="w-[320px] h-full aspect-square object-cover"
                          alt="post"
                          src={post.image}
                        />
                      </div>
                    </button>
                    <div className="absolute top-0 right-0 pt-2">
                      <button onClick={() => handleMenuClick(post.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 sm:h-8 sm:w-8 text-[#61D2A2]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M12 6v.01M12 12v.01M12 18v.01"
                          />
                        </svg>
                      </button>
                      {menuOpen === post.id && (
                        <div
                          ref={menuRef}
                          className="absolute top-10 right-2 shadow-lg z-10"
                        >
                          <button
                            className="block h-12 w-24 px-4 py-2 text-sm rounded-md text-white bg-[#61D2A2] hover:bg-[#53B68C]"
                            onClick={() => handleShare(post)}
                          >
                            공유하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="post_container mx-2 my-2 sm:mx-[10px] sm:my-[10px]">
                <div className="text-center text-[#589B7F] text-base sm:text-lg md:text-xl">
                  게시글이 없습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
