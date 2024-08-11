import React from 'react';
import { Link } from 'react-router-dom';

const SuccessModal = () => {
    return (
        <div>
            <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-container bg-white w-2/3 sm:w-1/3 rounded shadow-lg z-100 overflow-y-auto">

                    <div className="modal-content py-8 sm:py-16 text-center px-6">
                        <div className="modal-header">
                            <h3 className="text-lg sm:text-2xl font-bold text-[#589B7F]">가입 성공</h3>
                        </div>

                        <div className="modal-footer mt-14">
                            <Link to="/login" className="btn bg-[#7BB49C] text-white p-6 sm:px-10 rounded-xl text-sm sm:text-lg hover:bg-[#589B7F] hover:cursor-pointer">로그인 하러가기</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;