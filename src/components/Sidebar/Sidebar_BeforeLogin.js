import react from 'react';

function Sidebar() {
    return (
        <div>
            <div className="login_not_sidebar_row hidden sm:flex bg-[#D3E7DD] w-[185px] h-screen fixed">
                <div className="profile_frame bg-[#EDF8F3] h-[240px] w-10/12 top-16 drop-shadow-md rounded-3xl relative mx-auto my-10 flex">
                    <div className="profile_content text-[#498C80] text-xl text-center w-4/5 mx-auto my-auto">
                        <p>로그인 하면</p> 
                        <p>보여요!</p>
                    </div>
                </div>
            </div>

            <div className="login_not_sidebar_col flex sm:hidden bg-[#EDF8F3] h-[130px] justify-center items-center relative top-14">
                <div className="profile_content text-[#498C80] text-xl mx-auto my-auto"> 로그인 하면 보여요! </div>
            </div>
        </div>
        
    );
}

export default Sidebar;