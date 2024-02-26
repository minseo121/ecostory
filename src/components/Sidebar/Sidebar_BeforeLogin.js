import react from 'react';

function Sidebar() {
    return (
        <div className="sidebar bg-[#D3E7DD] basis-1/6 h-screen top-16">
            <div className="profile_frame bg-[#EDF8F3] h-2/5 w-3/4 drop-shadow-md rounded-3xl relative mx-auto my-6 flex">
                <div className="profile_content text-[#498C80] text-2xl text-center w-4/5 mx-auto my-auto">
                    <p>로그인하면</p> 
                    <p>보여요!</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;