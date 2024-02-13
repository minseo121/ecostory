import React, {useEffect, useState, useRef} from "react";

var circleData = [
    {
        center: { lat: 37.8282656, lng: 127.437594 },
        radius: 10000,
        strokeWeight: 2,
        strokeColor: '#75B8FA',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#CFE7FF',
        fillOpacity: 0.5
    },
    {
        center: { lat: 37.6577854, lng: 126.831051 },
        radius: 8000,
        strokeWeight: 2,
        strokeColor: '#f3d75d',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#f3d75d',
        fillOpacity: 0.5
    }
];

const Kmap = () => {
        const mapContainer = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
        const { kakao } = window;
        const mapOptions = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5609337, 126.980987), //지도의 중심좌표.
        level: 10 //지도의 레벨(확대, 축소 정도)
        };

        useEffect(()=>{
            const map = new kakao.maps.Map(mapContainer.current, mapOptions); //지도 생성 및 객체 리턴
            
            function createCircle(map, circleInfo) {
                var circle = new kakao.maps.Circle({
                    center: new kakao.maps.LatLng(circleInfo.center.lat, circleInfo.center.lng),
                    radius: circleInfo.radius,
                    strokeWeight: circleInfo.strokeWeight,
                    strokeColor: circleInfo.strokeColor,
                    strokeOpacity: circleInfo.strokeOpacity,
                    strokeStyle: circleInfo.strokeStyle,
                    fillColor: circleInfo.fillColor,
                    fillOpacity: circleInfo.fillOpacity
                });
                
                circle.setMap(map);

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
                position : circle.getPosition()
            })

            kakao.maps.event.addListener(circle, 'click', function(){
                    overlay.setMap(map);
                });
            function closeOverlay(){
                overlay.setMap(null);
            }
            }
            for (var i = 0; i < circleData.length; i++) {
                createCircle(map, circleData[i]);
            }
            })


    return(
        <>
            <div id="map" ref={mapContainer} className="h-[85%] rounded-xl border-8 border-[#C9EFEC]">
                </div>
        </>
    )
};
export default Kmap;