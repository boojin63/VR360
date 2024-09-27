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
            cameraFov: 75,
            backgroundColor: 0x000000
        });

        const panorama1 = new PANOLENS.ImagePanorama('/First.jpg');
        const panorama2 = new PANOLENS.ImagePanorama('/Second.jpg');
        const panorama3 = new PANOLENS.ImagePanorama('/Third.jpg');
        const panorama4 = new PANOLENS.ImagePanorama('/Fourth.jpg');

        // 첫 번째 파노라마 로드 완료 후 Infospot 추가 및 카메라 이동
        panorama1.addEventListener('load', () => {
            console.log('First panorama loaded');

            // 첫 번째 파노라마에 Infospot(커스텀 이미지 버튼) 생성
            const infospot1 = new PANOLENS.Infospot(1000, '/Icon.png');  // 커스텀 이미지 설정
            infospot1.position.set(9900, -3000, -1000);  // 좌표 설정

            infospot1.addEventListener('click', () => {
                console.log("Infospot clicked - moving to next panorama");
                viewer.setPanorama(panorama2);  // 두 번째 파노라마로 이동
            });

            panorama1.add(infospot1);
            viewer.tweenControlCenter(new THREE.Vector3(30, 0, 0), 0);  // 카메라 위치 중앙으로
        });

        // 두 번째 파노라마 로드 완료 후 Infospot 추가
        panorama2.addEventListener('load', () => {
            console.log('Second panorama loaded');

            const infospot2 = new PANOLENS.Infospot(1000, '/Icon.png');  // 커스텀 이미지 설정
            infospot2.position.set(9000, -3000, -1000);  // 두 번째 파노라마에서 Infospot의 좌표 설정

            infospot2.addEventListener('click', () => {
                console.log("Infospot clicked - moving back to first panorama");
                viewer.setPanorama(panorama3);  // 첫 번째 파노라마로 돌아감
            });

            panorama2.add(infospot2);
            viewer.tweenControlCenter(new THREE.Vector3(0, 0, 0), 0); // 카메라 위치 설정
        });

        panorama3.addEventListener('load', () => {
            console.log('First panorama loaded');

            
            const infospot3 = new PANOLENS.Infospot(1000, '/Icon.png');  // 커스텀 이미지 설정
            infospot3.position.set(9900, -3000, -1000);  // 좌표 설정

            infospot3.addEventListener('click', () => {
                console.log("Infospot clicked - moving to next panorama");
                viewer.setPanorama(panorama4);
            });

            panorama3.add(infospot3);
            viewer.tweenControlCenter(new THREE.Vector3(0, 0, 0), 0);  // 카메라 위치 중앙으로
        });

        panorama4.addEventListener('load', () => {
            console.log('First panorama loaded');

            
            const infospot4 = new PANOLENS.Infospot(1000, '/Icon.png');  // 커스텀 이미지 설정
            infospot4.position.set(9900, -3000, -1000);  // 좌표 설정

            infospot4.addEventListener('click', () => {
                console.log("Infospot clicked - moving to next panorama");
                viewer.setPanorama(panorama3);
            });

            panorama4.add(infospot4);
            viewer.tweenControlCenter(new THREE.Vector3(0, 0, 0), 0);  // 카메라 위치 중앙으로
        });

        viewer.add(panorama1);
        viewer.add(panorama2);
        viewer.add(panorama3);
        viewer.add(panorama4);

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
