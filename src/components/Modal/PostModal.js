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
        <div className="modal_overlay fixed w-full h-full inset-0 bg-slate-200/[.3] flex justify-center items-center">
            <div className="modal flex justify-start bg-white opacity-100 h-[611px] w-[1014px] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]">
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

                    <div className="devideline w-[465px] my-4 border-2 border-[#A9D6C3]"/>

                    <div className='post_content overflow-y-auto text-lg h-[455px] w-[460px] mx-auto'>
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
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;