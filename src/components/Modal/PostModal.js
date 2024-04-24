import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
    const { modalClose , image , text} = props;

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

    return ReactDOM.createPortal(
        <div>
            <div className='hidden md:flex'>
                <div className="modal_overlay fixed w-full h-full inset-0 bg-slate-200/[.3] flex justify-center items-center">
                    <div className="modal flex justify-start bg-white opacity-100 h-[611px] w-[1014px] mx-[3%] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]">
                        <div className='modal_img my-auto ml-[15px]'>
                            <img className="h-[570px] w-[465px] rounded-xl object-cover" alt="modal_image" src={image.src} />
                        </div>

                        <div className='modal_contents flex-1 mr-[15px] ml-[25px] my-[15px] text-[#589B7F]'>
                            <button className="modal_close float-right text-2xl" onClick={() => { modalClose(false); document.body.style.overflow = "unset"; }}>
                                X
                            </button>

                            <div className='writer_info flex my-3'>
                                <div className='profile_img h-[65px] w-[65px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE]'></div>
                                <div className='nickname my-auto text-xl mr-2'>신민서</div>
                                <div className='tier max-h-6 max-w-6 my-auto'>
                                    <img alt='tier' src='img/icon.png'/>
                                </div>                        
                            </div>

                            <div className="devideline w-full my-4 border-2 border-[#A9D6C3]"/>

                            <div className='post_content overflow-y-auto text-lg h-[455px] w-full mx-auto'>
                                {text.split('\n').map(line => {
                                    return (
                                        <>
                                            {line}
                                            <br/>
                                        </>
                                    );})
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='flex md:hidden'>
                <div className="fixed w-screen h-screen top-14 bg-white text-[#589B7F]">
                    <div className="w-full h-full overflow-y-auto flex flex-col">
                        <div className='mx-[5%]'>
                            <div>
                                <button className="modal_close float-left my-2 text-2xl" onClick={() => { modalClose(false); document.body.style.overflow = "unset"; }}>
                                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" fill="#589B7F" d="M34.5 23C34.5 23.7939 33.8564 24.4375 33.0625 24.4375H16.4079L22.579 30.6085C23.1403 31.1699 23.1403 32.0801 22.579 32.6415C22.0176 33.2028 21.1074 33.2028 20.546 32.6415L11.921 24.0165C11.3597 23.4551 11.3597 22.5449 11.921 21.9835L20.546 13.3585C21.1074 12.7972 22.0176 12.7972 22.579 13.3585C23.1403 13.9199 23.1403 14.8301 22.579 15.3915L16.4079 21.5625H33.0625C33.8564 21.5625 34.5 22.2061 34.5 23Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className='modal_img my-auto'>
                                <img className="h-[350px] w-full rounded-xl object-cover" alt="modal_image" src={image.src} />
                            </div>
                    
                            <div className='writer_info flex mt-4'>
                                <div className='profile_img h-[50px] w-[50px] mr-2 rounded-full border-[3px] border-[#A9D6BE]'></div>
                                <div className='nickname my-auto text-base mr-2'>신민서</div>
                                <div className='tier max-h-6 max-w-6 my-auto'>
                                    <img alt='tier' src='img/icon.png'/>
                                </div>                        
                            </div>

                            <div className="devideline w-full my-4 border-2 border-[#A9D6C3]"/>

                            <div className='post_content text-base w-full mb-20 px-2'>
                                <div>
                                {text.split('\n').map(line => {
                                    return (
                                        <>
                                            {line}
                                            <br/>
                                        </>
                                    );})
                                }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;