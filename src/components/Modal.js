import React, { useState } from 'react';
import "../css/Modal.css";

export default function Modal({ onClose, quality, emission, dust }) {

    return (
        <div className='modal_container bg-[#A9D6C3] rounded-3xl border-[#589B7F] border-8 flex justify-center fixed top-[55%] left-[55%]'>
            <div className='flex justify-center align-center text-center mb-2 '>
                <div className='ml-2'>
                    <div className='m-8 text-2xl text-white '>수질</div>
                    <hr />
                    <div className='text-xl bg-white p-8 rounded-bl-2xl'>{quality}</div>
                </div>
                <div>
                    <div className='m-8 text-2xl text-white'>쓰레기 배출량</div>
                    <hr />
                    <div className='text-xl bg-white p-8'>{emission}</div>
                </div>
                <div>
                    <div className='m-8 text-2xl text-white'>미세먼지</div>
                    <hr />
                    <div className='text-xl bg-white p-8 px-16 rounded-br-2xl'>{dust}</div>
                </div>
                <div>
                    <div className='flex justify-end text-[#589B7F]' onClick={onClose}><button>x</button></div>
                </div>
            </div>
        </div>
    );
}