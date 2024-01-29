import React, {useEffect, useState} from "react";

const { kakao } = window;

function Kmap() {
    useEffect(()=>{
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 지도에 표시할 원을 생성합니다
        var yongin = new kakao.maps.Circle({
            center : new kakao.maps.LatLng(33.450701, 126.570667),  // 원의 중심좌표 입니다 
            radius: 100, // 미터 단위의 원의 반지름입니다 
            strokeWeight: 2, // 선의 두께입니다 
            strokeColor: '#75B8FA', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#CFE7FF', // 채우기 색깔입니다
            fillOpacity: 0.7  // 채우기 불투명도 입니다   
    }); 

        // 지도에 원을 표시합니다 
        yongin.setMap(map); 

        var content =  '<div className="wrap bg-white">' + 
        '       <div className="info">' + 
        '        <div className="title">' + 
        '            카카오 스페이스닷원' + 
        '            <div className="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div className="body">' + 
        '            <div className="img">' +
        '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
        '           </div>' + 
        '            <div className="desc">' + 
        '                <div className="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
        '                <div className="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';

        var overlay = new kakao.maps.CustomOverlay({
            content : content,
            position : yongin.getPosition()
        })

        kakao.maps.event.addListener(yongin, 'click', function(){
                overlay.setMap(map);
            });
        function closeOverlay(){
            overlay.setMap(null);
        }
        })

    return(
        <>
            <div id="map" style={{width:500, height:400}}>
            </div>
            <div>
                폰트 적용이 됐을까요?
            </div>
        </>
    )
};
export default Kmap;