import {useState} from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Modal from '../components/Modal/PostModal';
import PostingModal from '../components/Modal/PostingModal';

function Profile() {
    const [modalOpen, setModal] = useState(false);
    const [PostingModalOpen, setPostingModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { id: 1, src: 'img/post_img.png' },
        { id: 2, src: 'img/post_img1.jpg' },
        { id: 3, src: 'img/post_img.png' },

    ];

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setModal(true);
        document.body.style.overflow = "hidden";
    };

    return (
        <div>

            <Header/>     

            <div className='profile bg-white h-screen mt-16'>

                <div className='profile_container flex flex-col justify-center items-center'>
                    <div className='profile_img h-[150px] w-[150px] mx-auto rounded-full border-4 border-[#A9D6BE]'></div>
                    <div className='profile_info flex justify-center mt-[15px] '>
                        <div className='nickname text-[#589B7F] text-xl mr-1.5'>신민서</div>
                        <div className='tier max-h-6 max-w-6'>
                            <img alt='tier' src='img/icon.png'/>
                        </div>
                    </div>
                </div>

                
                <div className='post_container mx-[15%] my-[40px]'>
                    <div className='post_frame rounded-lg border-4 border-[#61D2A2]'>

                        <div className='post_title h-[50px] bg-[#61D2A2] text-white text-xl'>
                            <div className='h-full flex justify-start items-center mx-[20px]'>
                                {PostingModalOpen === true ? <PostingModal modalClose={setPostingModal} /> : null}
                                <div className='title1'>내 게시글</div>
                                <div className='title2 ml-auto text-2xl'>
                                    <button onClick={()=>{setPostingModal(true); document.body.style.overflow = "hidden";}}> + </button>
                                </div>
                            </div>
                        </div>

                        <div className='post_sort mx-[20px] my-[20px] grid grid-cols-3 gap-x-3 gap-y-3 justify-items-center'>
{/*
                            {modalOpen === true ? <Modal modalClose={setModal} /> : null}
*/}

                            {modalOpen && selectedImage && <Modal image={selectedImage} modalClose={setModal} />}

                            {images.map(image => (
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