import React from 'react';

const PlanBtn = ( onRegister ) => {
  return (
    <div className='flex justify-end z-0 min-[770px]:absolute right-20 bottom-20 max-[770px]:mr-32'>
      <button 
        className='bg-[#61D2A2] py-5 px-28 text-xl text-white shadow-2xl rounded-lg'
        onClick={() => {
          console.log('Button clicked'); 
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
  );
};

export default PlanBtn;
