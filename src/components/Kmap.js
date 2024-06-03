import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom"; 
import Modal from "./Modal";

const Kmap = () => {
    const mapContainer = useRef(null); 
    const { kakao } = window;
    const [mapOptions, setMapOptions] = useState({
        center: new kakao.maps.LatLng(37.5609337, 126.980987),
        level: 10
    });

    const [showModal, setShowModal] = useState(false);
    const [mapClickable, setMapClickable] = useState(true); // 지도 클릭 가능 여부 상태
    const [selectedCircleInfo, setSelectedCircleInfo] = useState(null); // 클릭된 원의 정보 상태
    const [mapData, setMapData] = useState([]); // 지도 데이터를 상태로 관리

    useEffect(() => {
        // API에서 데이터 가져오기
        const fetchData = async () => {
            try {
                const response = await fetch('http://13.209.53.13:8000/ecodata', {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! 상태: ${response.status}`);
                }

                const data = await response.json();
                setMapData(data);
                console.log("성공적 ", data);
            } catch (error) {
                console.error("오류 ", error);
            }
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        const map = new kakao.maps.Map(mapContainer.current, mapOptions); 

        function createCircle(map, circleInfo) {
            var circle = new kakao.maps.Circle({
                center: new kakao.maps.LatLng(circleInfo.Position_x, circleInfo.Position_y),
                radius: circleInfo.circle,
                strokeColor: getStrokeColor(circleInfo.Severity),
                fillColor: getFillColor(circleInfo.Severity),

                strokeWeight: 2,
                strokeOpacity: 1,
                strokeStyle: 'solid',
                fillOpacity: 0.5
            });

            circle.setMap(map);

            // 커스텀 오버레이(시군 이름)
            var customOverlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(circleInfo.Position_x, circleInfo.Position_y),
                content: `<div class="text-sm text-gray-950/[.7]">${circleInfo.SIGUN_NM}</div>`,
                xAnchor: 0.5,
                yAnchor: 0.5 //중앙으로 오게 하기 위한 코드
            });

            customOverlay.setMap(map);

            kakao.maps.event.addListener(circle, 'click', function () {
                setSelectedCircleInfo(circleInfo); // 클릭된 원의 정보 저장
                setShowModal(true);
                setMapClickable(false); // 모달이 열렸을 때 지도 클릭 비활성화
            });
        }

        mapData.forEach(circleInfo => {
            createCircle(map, circleInfo);
        });

        const handleResize = () => {
            // 화면 너비가 640px 이하라면 중앙 좌표를 변경
            if (window.innerWidth <= 640) {
                setMapOptions({
                    center: new kakao.maps.LatLng(37.6224568, 127.1473852),
                    level: 11
                });
            } else {
                // 그렇지 않으면 원래의 중앙 좌표로 설정
                setMapOptions({
                    center: new kakao.maps.LatLng(37.5609337, 126.980987),
                    level: 10
                });
            }
        };

        window.addEventListener('resize', handleResize);
        map.relayout();

        return () => {
            window.removeEventListener('resize', handleResize);
            // 컴포넌트가 언마운트될 때 클릭 가능 여부를 다시 활성화
            setMapClickable(true);
        };
    }, [mapData, mapOptions]);

    const closeModal = () => {
        setShowModal(false);
        setMapClickable(true); // 모달이 닫혔을 때 지도 클릭 활성화
    };

    const getStrokeColor = (severity) => {
        switch(severity) {
            case "Very High" : 
                return "#FF5052";
            case "High" :
                return "#FF9947";
            case "Low" :
                return "#FFFC6A";
            case "Very Low" :
                return "#96FF6A";
            default:
                return "";
        }
    };

    const getFillColor = (severity) => {
        switch(severity) {
            case "Very High" : 
                return "#FF9E9F";
            case "High" :
                return "#FFC595";
            case "Low" :
                return "#FFFEB3";
            case "Very Low" :
                return "#D4FFC2";
            default:
                return "";
        }
    };

    return (
        <>
            <div id="map" ref={mapContainer} className="h-[85%] rounded-xl border-8 border-[#C9EFEC]" style={{ pointerEvents: mapClickable ? 'auto' : 'none' }}></div>
            {showModal && <Modal onClose={closeModal} quality={selectedCircleInfo.Emission_Score.toFixed(2)} emission={selectedCircleInfo.Waste_Score.toFixed(2)} dust={selectedCircleInfo.Air_Score.toFixed(2)} />}
        </>
    );
};

export default Kmap;
