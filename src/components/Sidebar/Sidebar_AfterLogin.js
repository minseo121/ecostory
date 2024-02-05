import react from 'react';

function DevideLine() {
    return(
        <div class="w-4/5 m-auto border border-[#A9D6C3]"/>
     );
}


function Sidebar() {
    return (
        <div className='bg-[#D3E7DD] basis-1/6 h-screen top-16'>
            <div className='bg-[#EDF8F3] h-1/4 w-3/4 drop-shadow-md rounded-3xl flex mx-auto my-6'>
                <div className='flex-1'>
                    <div className='bg-white h-2/3 w-2/3 rounded-full mx-auto mt-[5%]'></div>
                    <div className='flex justify-center mt-[5%] '>
                        <div className='text-[#589B7F] text-xl mr-1.5'>구혜원</div>
                        <div className='max-h-6 max-w-6'>
                            <img alt='tier' src='img/icon.png'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-[#589B7F] text-lg ml-[15%]'>이번 주</div>

            <div className='bg-[#EDF8F3] h-3/5 w-3/4 drop-shadow-md rounded-3xl mx-auto flex justify-center items-center'>
                <div className='text-[#589B7F] flex-1'>
                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                    <DevideLine/>


                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                    <DevideLine/>

                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                    <DevideLine/>
                    
                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                    <DevideLine/>

                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                    <DevideLine/>

                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                    <DevideLine/>

                    <label htmlFor="all-check" className="mx-auto block text-center my-[10%]">
                        <input type="checkbox" className='content' checked={false} />
                        <span className="ml-2">자전거 타기</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;