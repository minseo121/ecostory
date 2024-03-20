import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom"; // ReactDOM을 import
import Modal from "./Modal";

var circleData = [
    {
        center: { lat: 37.8282656, lng: 127.437594 },
        radius: 6000,
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

    useEffect(() => {
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

            kakao.maps.event.addListener(circle, 'click', function () {
                ReactDOM.render(<Modal />, document.getElementById("modal-root")); // 모달 렌더링
            });
        }

        for (var i = 0; i < circleData.length; i++) {
            createCircle(map, circleData[i]);
        }
    }, []);

    return (
        <>
            <div id="map" ref={mapContainer} className="h-[70%] rounded-xl border-8 border-[#C9EFEC]"></div>
            <div id="modal-root" className="top-20 left-20"></div>
        </>
    );
};
export default Kmap;
