import React, { useState } from 'react'
import "../css/Modal.css"

export default function Modal() {
    const [quality, setQuality] = useState('1'); //수질
    const [emission, setEmission] = useState('1'); //쓰레기 배출량
    const [dust, setDust] = useState('1'); //미세먼지
  return (
    <div className='modal_container bg-[#A9D6C3] rounded-3xl border-[#589B7F] border-8 flex justify-center'>
        <div className='flex justify-center align-center text-center mt-2'>
            <div className='ml-2'>
                <div className='m-8 text-2xl text-white '>수질</div>
                <hr/>
                <div className='text-xl bg-white p-10 rounded-bl-3xl'>{quality}</div>
            </div>
            <div>
                <div className='m-8 text-2xl text-white'>쓰레기 배출량</div>
                <hr/>
                <div className='text-xl bg-white p-10'>{emission}</div>
            </div>
            <div>
                <div className='m-8 text-2xl text-white'>미세먼지</div>
                <hr/>
                <div className='text-xl bg-white p-10 px-13 rounded-br-3xl'>{dust}</div>
            </div>
            <div>
                <div className='flex justify-end'>x</div>
            </div>
        </div>
    </div>
  )
}
