import react from 'react';


function Header() {
    return (
        <div className='bg-white flex h-16 w-full drop-shadow-md'>   
            <img className='w-full max-w-40 h-full max-h-14 my-auto ml-4' alt='ecostory_logo' src='img/ecostory_logo.png'/>
            <ul className='list-none flex flex-1 justify-end pr-16 my-auto'>
                <li className='ml-10'>            
                    <a className='text-[#498D80]' href='#'>로그인</a>        
                </li>        
                <li className='ml-10'>            
                    <a className='text-[#498D80]' href='#'>회원가입</a>        
                </li>               
            </ul>
        </div>    
    );
}

export default Header;