import react from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='profile-frame'>
                <div className='before-login'>
                    로그인 하면 보여요!
                </div>
            </div>
        </div>
//        <div className='sidebar'>
//            <div className='profile-frame'>
//                <div className='after-login'>
//                    <div className='profile-img'></div>
//                    <div className='user-info'>
//                        <div className='nickname'>구혜원</div>
//                        <div className='tier-icon'>
//                            <img className='tierimg' alt='tier' src='img/icon.png'/>
//                        </div>
//                    </div>
//                </div>
//            </div>
//            <div className='thisweek'>이번 주</div>
//            <div className='checklist'>
//                <div className='contents'>
//                    <input type="checkbox" className='content' checked={false}/>
//        		    <label for="all-check">3km 걷기</label>
//                    <div class="division-line"/>
//
//                    <input type="checkbox" className='content' checked={false}/>
//        		    <label for="all-check">3km 걷기</label>
//                    <div class="division-line"/>
//
//                    <input type="checkbox" className='content' checked={false}/>
//        		    <label for="all-check">3km 걷기</label>
//                    <div class="division-line"/>
//
//                    <input type="checkbox" className='content' checked={false}/>
//        		    <label for="all-check">3km 걷기</label>
//                    <div class="division-line"/>
//
//                    <input type="checkbox" className='content' checked={true}/>
//        		    <label for="all-check">3km 걷기</label>
//                    <div class="division-line"/>
//
//                    <input type="checkbox" className='content' checked={false}/>
//        		    <label for="all-check">3km 걷기</label>
//                    <div class="division-line"/>
//
//                    <input type="checkbox" className='content' checked={false}/>
//        		    <label for="all-check">3km 걷기</label>
//                    </div>
//            </div>
//
//        </div>
    );
}

export default Sidebar;