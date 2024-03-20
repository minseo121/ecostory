import react from 'react';

function GuideBook() {
    return (
        <div className='guidebook flex text-[#589B7F]'>
            <div className='category_frame bg-[#D3E7DD] h-screen w-[205px] text-lg'>
                <div className='category bg-[#EDF8F3] relative h-5/6 w-[180px] mx-auto top-24 rounded-2xl drop-shadow-lg'>
                    <p className='pl-4 pt-5 pb-4'>
                        카테고리
                    </p>

                    <div className='category_list bg-white h-5/6 w-[160px] mx-auto rounded-b-lg shadow-inner'>

                    </div>
                </div>
            </div>

            <div className='guidebook_page flex-1 mt-14 px-10 py-7'>
                <div className='flex mb-5'>
                    <div>
                        <p className='text-2xl'>목록</p>
                        <p className='text-sm'>
                            체크리스트에 넣고 싶은 목표들을 <span className='text-[#61D2A2]'>체크</span>해봐요.
                        </p>
                    </div>
                    <div className='list_search ml-auto my-auto bg-[#EDF8F3] h-11 w-[336px] rounded-full flex items-center'>
                        <div className='search_icon ml-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#9DA4A0">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                        </div>
                        <div className='search_textbox flex-1 ml-3 my-auto'>
                            <input className='bg-[#EDF8F3] outline-none w-11/12'></input>
                        </div>
                    </div>
                </div>

                <div className='bg-[#A9D6C3] h-[480px] w-full rounded-3xl shadow-inner'>
                    <div className='text-xl text-white ml-8 py-[12px]'>교통</div>
                    <div className='bg-[#EEF9F3] h-[420px] rounded-b-3xl mx-2'>

                    </div>
                </div>
                
            </div>
        </div>     
    );
}

export default GuideBook;