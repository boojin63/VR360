import React, { useEffect, useRef } from 'react';
import * as PANOLENS from 'panolens';
import * as THREE from 'three';
import '../Assets/Main.css';

const Bridge = () => {
    const panoContainerRef = useRef(null);

    useEffect(() => {
        if (!panoContainerRef.current) return;

        const viewer = new PANOLENS.Viewer({
            container: panoContainerRef.current,
            autoResize: true,
            controlBar: true,
            cameraFov: 75,
            backgroundColor: 0x000000
        });

        const panoramas = [
            new PANOLENS.ImagePanorama('/images/월영교/A1.jpg'),  
            new PANOLENS.ImagePanorama('/images/월영교/A2.jpg'),  
            new PANOLENS.ImagePanorama('/images/월영교/A3.jpg'),   
            new PANOLENS.ImagePanorama('/images/월영교/A4.jpg'),  
            new PANOLENS.ImagePanorama('/images/월영교/A5.jpg'),   
            new PANOLENS.ImagePanorama('/images/월영교/A6.jpg'),   
            new PANOLENS.ImagePanorama('/images/월영교/A7.jpg'), 
            new PANOLENS.ImagePanorama('/images/월영교/A8.jpg'),  
            new PANOLENS.ImagePanorama('/images/월영교/A9.jpg'),   
            new PANOLENS.ImagePanorama('/images/월영교/A10.jpg'),   
            new PANOLENS.ImagePanorama('/images/월영교/A11.jpg'),
            new PANOLENS.ImagePanorama('/images/월영교/A12.jpg'), 
            new PANOLENS.ImagePanorama('/images/월영교/A13.jpg'), 
            new PANOLENS.ImagePanorama('/images/월영교/A14.jpg')  
        ];

        // 각 파노라마에 이벤트 및 Infospot 설정
        panoramas.forEach((panorama, index) => {
            panorama.addEventListener('load', () => {
                console.log(`Panorama ${index + 1} loaded`);

                // 텍스처가 정의되었는지 확인 후 필터 설정
                if (panorama && panorama.material && panorama.material.map) {
                    panorama.material.map.minFilter = THREE.LinearFilter;
                    panorama.material.map.magFilter = THREE.LinearFilter;
                    panorama.material.map.needsUpdate = true;
                }

                // 마지막 파노라마를 제외한 모든 파노라마에 Infospot 추가
                if (index < panoramas.length - 1) {
                    const infospot = new PANOLENS.Infospot(1000, '/images/NavIcon_ts.png');
                    infospot.position.set(5000, 0, -1500);
                    infospot.addEventListener('click', () => {
                        console.log(`Infospot clicked - moving to Panorama ${index + 2}`);
                        viewer.setPanorama(panoramas[index + 1]);
                    });

                    panorama.add(infospot);
                }

                // 카메라 위치 중앙으로 설정
                viewer.tweenControlCenter(new THREE.Vector3(0, 0, 0), 0);
            });
            viewer.add(panorama);
        });

        // 첫 번째 파노라마로 초기 설정
        viewer.setPanorama(panoramas[0]);

        const handleResize = () => {
            viewer.onWindowResize();
        };

        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 및 리소스 정리
        return () => {
            viewer.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div id="panolens-container" ref={panoContainerRef} style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    );
};

export default Bridge;