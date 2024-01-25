import react from 'react';
import './Header.css';

function Header() {
    return (
        <div className='header' class='bg-white flex h-16 w-full drop-shadow-md'>   
            <img className='logo' class='w-full max-w-40 h-full max-h-14 my-auto ml-4' alt='ecostory_logo' src='img/ecostory_logo.png'/>
            <ul className='header_nav' class='list-none flex flex-1 justify-end pr-16 my-auto'>
                <li className='nav_option' class='ml-10'>            
                    <a className='option_1' class='text-LochinvarColor' href='#'>로그인</a>        
                </li>        
                <li className='nav_option' class='ml-10'>            
                    <a className='option_2' class='text-LochinvarColor' href='#'>회원가입</a>        
                </li>               
            </ul>
        </div>
//        <div className='header'>   
//          <img className='logo-img' alt='ecostory_logo' src='img/ecostory_logo.png'/>
//          <ul className="header-nav">        
//              <li className="nav-option">      
//                  <a className="option1" href="#">로그아웃</a>
//              </li> 
//              <li className="nav-option">            
//                  <a className="option2" href="#">체크리스트 만들기</a>        
//              </li>      
//              <li className="nav-option">            
//                  <a className="option3" href="#">체크리스트 현황</a>        
//              </li>   
//              <li className="nav-option">            
//                  <a className="option4" href="#">가이드북</a>        
//              </li>            
//          </ul>
//        </div>        
    );
}

export default Header;