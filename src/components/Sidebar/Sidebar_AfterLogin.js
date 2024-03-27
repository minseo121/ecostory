import react from 'react';

function DevideLine() {
    return(
        <div className="devideline w-4/5 m-auto border border-[#A9D6C3]"/>
     );
}

function CheckList() {
    return(
        <div className="mx-auto my-[6px] text-center">
            <div className="inline-flex items-center ">
                <label className="relative flex items-center py-2 mr-2 rounded-full cursor-pointer" htmlFor="customStyle">
                    <input type="checkbox"
                    className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#C3E0D1] hover:scale-105"
                    //checked={true}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd">
                            </path>
                        </svg>
                    </span>
                </label>
                <span className="cursor-pointer select-none text-sm">
                    자전거 타기
                </span>
            </div>
        </div>
    );
}


function Sidebar() {
    return (
        <div className="sidebar bg-[#D3E7DD] basis-[185px] h-screen">
            <div className="profile_frame bg-[#EDF8F3] h-[22%] w-5/6 top-14 drop-shadow-md rounded-3xl relative flex mx-auto mt-6 mb-[90px]">
                <div className="profile_content flex-1">
                    <div className="profile_img bg-white h-2/3 w-2/3 rounded-full mx-auto mt-2"></div>
                    <div className="profile_info flex justify-center mt-[5%]">
                        <div className="nickname text-[#589B7F] text-lg mr-1.5">신민서</div>
                        <div className="tier max-h-6 max-w-6">
                            <img alt="tier" src="img/icon.png"/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="thisweek text-[#589B7F] text-lg ml-[15%]">이번 주</div>

            <div className="checklist bg-[#EDF8F3] h-[55%] w-5/6 drop-shadow-md rounded-3xl mx-auto flex justify-center items-center">
                <div className="list_container text-[#589B7F] flex-1">

                    <CheckList/>
                    <DevideLine/>


                    <CheckList/>
                    <DevideLine/>

                    <CheckList/>
                    <DevideLine/>

                    <CheckList/>
                    <DevideLine/>

                    <CheckList/>
                    <DevideLine/>

                    <CheckList/>
                    <DevideLine/>

                    <CheckList/>

                </div>
            </div>
        </div>
    );
}

export default Sidebar;