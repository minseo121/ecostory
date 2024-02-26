import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
    const { modalClose } = props;

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
            <div className="modal bg-white opacity-100 h-[611px] w-[1014px] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]">
                <button className="modal_close text-[#589B7F]" onClick={() => { modalClose(false); document.body.style.overflow = "unset"; }}>
                    X
                </button>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;
