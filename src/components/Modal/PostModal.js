import react from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
    const { modalClose } = props;

    return (
        <>
            {ReactDOM.createPortal(
                <>
                    <div className='fixed w-full h-full inset-0 bg-slate-200/[.3]'>
                        <div className='bg-white opacity-100 h-[611px] w-[1014px] mt-[59px] mx-auto rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]'>
                            <button className='text-[#589B7F] ' 
                            onClick={() => { modalClose(false); document.body.style.overflow = "unset";}}>
                                    X
                            </button>
                        </div>
                    </div>
                </>,
                document.getElementById('modal')
            )}

        </>
    );
}
export default Modal;