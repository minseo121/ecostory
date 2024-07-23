import React from 'react';

const PlanBtn = ( {onRegister} ) => {
  return (
    <div className='relative w-full h-full flex justify-end sm:items-end'>
      <div className='flex justify-end items-end z-0 h-20 w-full buttom-0'>
        <button 
          className='bg-[#61D2A2] py-5 px-28 text-xl text-white shadow-2xl rounded-lg'
          onClick={() => {
            console.log('Button clicked'); 
            console.log(typeof onRegister)
            if (typeof onRegister === 'function') { 
              onRegister();
            } else {
              console.error('onRegister is not a function');
            }
          }} 
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default PlanBtn;
