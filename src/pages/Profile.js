import {useState} from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Modal from '../components/Modal/PostModal';
import PostingModal from '../components/Modal/PostingModal';
import { postData } from '../components/PostData.js';

function Profile() {
    const [modalOpen, setModal] = useState(false);
    const [PostingModalOpen, setPostingModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedText, setSelectedText] = useState("");


    const handleImageClick = (image) => {
        setSelectedImage(image);
        setSelectedText(findText(image.id));
        setModal(true);
        document.body.style.overflow = "hidden";
    };

    const findText = (id) => {
        const post = postData.postData.find(post => post.id === id);
        return post ? post.text : '';
    };

    return (
        <div>

            <Header/>     

            <div className='profile bg-white h-full mt-24 mb-8 sm:mb-16 sm:mt-28'>

                <div className='profile_container flex flex-col justify-center items-center'>
                    <div className='profile_img h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] mx-auto rounded-full border-[3px] sm:border-4 border-[#A9D6BE]'></div>
                    <div className='profile_info flex justify-center mt-[15px] '>
                        <div className='nickname text-[#589B7F] text-lg sm:text-xl mr-1.5'>신민서</div>
                        <div className='tier max-h-6 max-w-6'>
                            <img alt='tier' src='img/icon.png'/>
                        </div>
                    </div>
                </div>

                
                <div className='post_container mx-[5%] md:mx-[7%] lg:mx-[15%] my-[40px]'>
                    <div className='post_frame rounded-lg border-4 border-[#61D2A2]'>

                        <div className='post_title h-[50px] bg-[#61D2A2] text-white text-base sm:text-lg md:text-xl'>
                            <div className='h-full flex justify-start items-center mx-[20px]'>
                                {PostingModalOpen === true ? <PostingModal modalClose={setPostingModal} /> : null}
                                <div className='title1'>내 게시글</div>
                                <div className='title2 ml-auto text-2xl'>
                                    <button onClick={()=>{setPostingModal(true); document.body.style.overflow = "hidden";}}> + </button>
                                </div>
                            </div>
                        </div>

                        <div className='post_sort mx-2 my-2 sm:mx-[10px] sm:my-[10px] grid grid-cols-3 gap-x-1 gap-y-1 sm:gap-x-2 sm:gap-y-2 justify-items-center'>
{/*
                            {modalOpen === true ? <Modal modalClose={setModal} /> : null}
*/}

                            {modalOpen && selectedImage && <Modal image={selectedImage} text={selectedText} modalClose={setModal} />}

                            {postData.postData.map(image => (
                                <button key={image.id} onClick={() => handleImageClick(image)}>
                                    <img className='aspect-square object-cover' alt='post' src={image.src}/>
                                </button>
                            ))}
{/*
                            <button onClick={()=>{setModal(true); document.body.style.overflow = "hidden";}}>
                                <img className='aspect-square object-cover ' alt='post' src='img/post_img.png'/>
                            </button>
*/}
                        </div>
                    </div>
                </div>

            </div> 

        </div>
    );
}

export default Profile;