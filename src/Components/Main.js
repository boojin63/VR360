import React, { useEffect, useRef } from 'react';
import Sidebar from "./Sidebar";
import * as PANOLENS from 'panolens';
import * as THREE from 'three';  // Three.js를 불러옴
import '../Assets/Main.css';

const Main = () => {
    const panoContainerRef = useRef(null); // DOM 참조를 위한 ref

    useEffect(() => {
        if (!panoContainerRef.current) return; // ref가 존재하는지 확인

        const viewer = new PANOLENS.Viewer({
            container: panoContainerRef.current,
            autoResize: true,
            controlBar: true,
            cameraFov: 75,  // 시야각 설정
            backgroundColor: 0x000000  // 배경색 설정
        });

        // 첫 번째 파노라마 생성
        const panorama1 = new PANOLENS.ImagePanorama('/First.jpg');
        // 두 번째 파노라마 생성
        const panorama2 = new PANOLENS.ImagePanorama('/Second.jpg');

        // 첫 번째 파노라마에 Infospot(고정된 버튼 역할) 생성
        const infospot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);  // Infospot 크기 설정
        infospot.position.set(9900, -3000, -1000);  // 좌표 설정
        infospot.addHoverText('다음 장소로 이동', 30);
        infospot.addEventListener('click', () => {
            console.log("Infospot clicked - moving to next panorama");
            viewer.setPanorama(panorama2);
        });

        panorama1.add(infospot);

        // 첫 번째 파노라마를 기본으로 추가
        viewer.add(panorama1);

        // 첫 번째 파노라마 로드 완료 후 카메라 이동
        panorama1.addEventListener('load', () => {
            console.log('First panorama loaded');
            viewer.tweenControlCenter(new THREE.Vector3(30, 0, 0), 0);  // 카메라 위치 중앙으로
        });

        // 두 번째 파노라마 로드 확인
        panorama2.addEventListener('load', () => {
            console.log('Second panorama loaded');
            viewer.tweenControlCenter(new THREE.Vector3(0, 0, 0), 0); // 카메라 위치 설정
        });

        // 브라우저 크기에 맞춰 Panolens Viewer를 재조정하는 코드
        const handleResize = () => {
            viewer.onWindowResize();
        };

        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 리소스 정리
        return () => {
            viewer.dispose();  // Panolens 리소스 정리
            window.removeEventListener('resize', handleResize);  // resize 이벤트 제거
        };
    }, []);

    return (
        <div>
            <Sidebar />
            <div id="panolens-container" ref={panoContainerRef} style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    );
};

export default Main;
