import React, { useState } from 'react';
import "../css/Modal.css";

export default function Modal({ onClose, quality, emission, dust }) {

    return (
        <div className='modal_container bg-[#A9D6C3] rounded-3xl border-[#589B7F] border-4 flex justify-center fixed top-[90%] left-[50%] sm:top-[60%] sm:left-[55%] p-3'>
            <div className='flex justify-center items-center text-center mb-2 w-full h-full pl-1 pt-2'>
                <div className='w-1/3 h-full'>
                    <div className='text-xl text-white h-1/2 flex items-center justify-center'>수질</div>
                    <hr />
                    <div className='text-xl bg-white rounded-bl-lg h-1/2 flex items-center justify-center'>{quality}</div>
                </div>
                <div className='w-1/3 h-full'>
                    <div className='text-xl text-white pb-3 h-1/2 flex items-center justify-center'>쓰레기<br/>배출량</div>
                    <hr />
                    <div className='text-xl bg-white h-1/2 flex items-center justify-center'>{emission}</div>
                </div>
                <div className='w-1/3 h-full'>
                    <div className='text-xl text-white pb-3 h-1/2 flex items-center justify-center'>미세먼지</div>
                    <hr />
                    <div className='text-xl bg-white rounded-br-lg h-1/2 flex items-center justify-center'>{dust}</div>
                </div>
                <div className='h-full'>
                    <div className='h-full flex justify-end items-start top-0 text-[#589B7F]' onClick={onClose}><button>x</button></div>
                </div>
            </div>
        </div>
    );
}