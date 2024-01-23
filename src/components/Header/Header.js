import react from 'react';
import './Header.css';

function Header() {
    return (
        <div className='header'>   
            <img className='logo-img' alt='ecostory_logo' src='img/ecostory_logo.png'/>
            <ul className="header-nav">        
                <li className="nav-option" style={{ marginLeft: 'auto' }}>            
                    <a className="option1" href="#">로그인</a>        
                </li>        
                <li className="nav-option">            
                    <a className="option2" href="#">회원가입</a>        
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