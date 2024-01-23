import react from 'react';
import './Mainpage.css';

function Mainpage() {
    return (
        <div className='mainpage'>
            <div className='box'>
                <div className='title'>
                    우리 <span className='highlight'>자연 환경 지수</span> 구경
                </div>
                <div className='tier'>
                    <span className='tier-type'>티어 기준 :</span>
                </div>
            </div>
            <div className='map'>
                
            </div>

        </div>
    );
}

export default Mainpage;