import {useState} from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Modal from '../components/Modal/PostModal';

function Profile() {
    const [modalOpen, setModal] = useState(false);

    return (
        <div>

            <Header/>     

            <div className='bg-white h-screen mt-16'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='h-[150px] w-[150px] max-h-[150px] max-w-[150px] mx-auto rounded-full border-4 border-[#A9D6BE]'></div>
                    <div className='flex justify-center mt-[15px] '>
                        <div className='text-[#589B7F] text-xl mr-1.5'>구혜원</div>
                        <div className='max-h-6 max-w-6'>
                            <img alt='tier' src='img/icon.png'/>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <button onClick={()=>{setModal(true); document.body.style.overflow = "hidden";}}>
                        <img className='h-[275px] w-[275px] object-cover' alt='post' src='img/post_img.png'/>
                    </button>

                    {modalOpen === true ? <Modal modalClose={setModal} /> : null}
                </div>

            </div> 
        </div>
    );
}

export default Profile;