// Kmap.js

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom"; 
import Modal from "./Modal";
import { mapData } from "./MapData";

const Kmap = () => {
    const mapContainer = useRef(null); 
    const { kakao } = window;
    const mapOptions = {
        center: new kakao.maps.LatLng(37.5609337, 126.980987),
        level: 10 
    };

    const [showModal, setShowModal] = useState(false);
    const [mapClickable, setMapClickable] = useState(true); // 지도 클릭 가능 여부 상태
    const [selectedCircleInfo, setSelectedCircleInfo] = useState(null); // 클릭된 원의 정보 상태

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

            kakao.maps.event.addListener(circle, 'click', function () {
                setSelectedCircleInfo(circleInfo); // 클릭된 원의 정보 저장
                setShowModal(true);
                setMapClickable(false); // 모달이 열렸을 때 지도 클릭 비활성화
            });
        }

        mapData.results.forEach(circleInfo => {
            createCircle(map, circleInfo);
        });

        return () => {
            // 컴포넌트가 언마운트될 때 클릭 가능 여부를 다시 활성화
            setMapClickable(true);
        };
    }, []);

    const closeModal = () => {
        setShowModal(false);
        setMapClickable(true); // 모달이 닫혔을 때 지도 클릭 활성화
    };
    const getStrokeColor = (severity) => {
        switch(severity) {
            case "Very High" : 
                return "#75B8FA";
            case "High" :
                return "#f3d75d";
            case "Middle" :
                return "";
            case "Low" :
                return "";
            case "Very Low" :
                return "";
        }
    };
    const getFillColor = (severity) => {
        switch(severity) {
            case "Very High" : 
                return "#CFE7FF";
            case "High" :
                return "#f3d75d";
            case "Middle" :
                return "";
            case "Low" :
                return "";
            case "Very Low" :
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
