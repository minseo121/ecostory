import react from 'react';

function Modal(props) {
    const { modalClose } = props;

    return (
        <div className='bg-white  h-[611px] w-[1014px] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]'>
            <button className='text-[#589B7F] ' 
            onClick={() => { modalClose(false) }}>
                        X
            </button>
        </div>
    );
}
export default Modal;