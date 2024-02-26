import react from 'react';
import Kmap from "../Kmap"

function Mainpage() {
    return (
        <div className="mainpage bg-white basis-5/6 mt-8 mx-[3%]">
            <div className="title flex mb-[2%]">
                <div className="title_content1 text-[#498D80] text-3xl float-left my-auto mr-[20%]">
                    우리 <span className="highlight text-[#61D2A2]">자연 환경 지수</span> 구경
                </div>
                <div className="title_content2 bg-[#E2F8F6] h-12 rounded-xl flex flex-1">
                    <span className="text-[#498D80] my-auto ml-[3%]">오염도 기준 :</span>
                </div>
            </div>
            <Kmap/>
        </div>
    );
}

export default Mainpage;