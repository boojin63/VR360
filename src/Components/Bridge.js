import React, { useEffect, useRef } from 'react';
import * as PANOLENS from 'panolens';
import * as THREE from 'three';
import '../Assets/Main.css';

const PanolensViewer = () => {

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

        // 파노라마 이미지 (월영교)
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

        panoramas.forEach((panorama, index) => {
            panorama.addEventListener('load', () => {
                console.log(`Panorama ${index + 1} loaded`);

                if (panorama && panorama.material && panorama.material.map) {
                    panorama.material.map.minFilter = THREE.LinearFilter;
                    panorama.material.map.magFilter = THREE.LinearFilter;
                    panorama.material.map.needsUpdate = true;
                }

                // 다음 파노라마로 이동하는 Infospot
                if (index < panoramas.length - 1) {
                    const nextInfospot = new PANOLENS.Infospot(1000, '/images/NavIcon_1.png');
                    nextInfospot.position.set(5000, 0, -1500);

                    nextInfospot.addEventListener('click', () => {
                        console.log(`Next Infospot clicked - moving to Panorama ${index + 2}`);
                        viewer.setPanorama(panoramas[index + 1]);
                    });

                    nextInfospot.addEventListener('mousedown', () => {
                        nextInfospot.visible = true;
                        console.log(`Next Infospot ${index + 1} mousedown - visible set to true`);
                    });

                    nextInfospot.addEventListener('mouseup', () => {
                        nextInfospot.visible = true;
                        console.log(`Next Infospot ${index + 1} mouseup - visible set to true`);
                    });

                    panorama.add(nextInfospot);
                }

                // 이전 파노라마로 이동하는 Infospot 
                if (index > 0) {
                    const prevInfospot = new PANOLENS.Infospot(1000, '/images/NavIcon_1.png');
                    prevInfospot.position.set(-5000, 0, -1500);

                    prevInfospot.addEventListener('click', () => {
                        console.log(`Previous Infospot clicked - moving to Panorama ${index}`);
                        viewer.setPanorama(panoramas[index - 1]); // 이전 파노라마로 이동
                    });

                    prevInfospot.addEventListener('mousedown', () => {
                        prevInfospot.visible = true;
                        console.log(`Previous Infospot ${index + 1} mousedown - visible set to true`);
                    });

                    prevInfospot.addEventListener('mouseup', () => {
                        prevInfospot.visible = true;
                        console.log(`Previous Infospot ${index + 1} mouseup - visible set to true`);
                    });

                    panorama.add(prevInfospot);
                }

                // 카메라 위치 중앙으로 설정
                viewer.tweenControlCenter(new THREE.Vector3(0, 0, 0), 0);
            });


            viewer.add(panorama);
        });


        viewer.setPanorama(panoramas[0]);

        const handleResize = () => {
            viewer.onWindowResize();
        };

        window.addEventListener('resize', handleResize);


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

export default PanolensViewer;
