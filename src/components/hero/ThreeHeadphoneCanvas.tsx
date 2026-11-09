import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeadphoneCanvasProps {
  isPlaying: boolean;
  isZooming?: boolean;
  onClick?: () => void;
}

export const ThreeHeadphoneCanvas: React.FC<ThreeHeadphoneCanvasProps> = ({
  isPlaying,
  isZooming = false,
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isZoomingRef = useRef(isZooming);
  isZoomingRef.current = isZooming;

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. High-Fidelity PBR Materials
    const matteBlackMaterial = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.45,
      metalness: 0.25
    });

    const titaniumMetallicMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4f5d,
      roughness: 0.2,
      metalness: 0.95
    });

    const chromeSilverMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8dde8,
      roughness: 0.1,
      metalness: 0.98
    });

    const leatherCushionMaterial = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.85,
      metalness: 0.08
    });

    const acousticGrillMaterial = new THREE.MeshStandardMaterial({
      color: 0x040507,
      roughness: 0.7,
      metalness: 0.3
    });

    const glowingAuraRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5
    });

    // 3. Construct Volumetric 3D Headphone Assembly
    const headphoneGroup = new THREE.Group();

    // A. Main Arch Headband (Volumetric Curved Tube)
    const curvePoints: THREE.Vector3[] = [];
    const archRadius = 1.35;
    const segments = 36;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI; // 0 to PI
      const x = Math.cos(angle) * archRadius;
      const y = Math.sin(angle) * archRadius - 0.15;
      curvePoints.push(new THREE.Vector3(x, y, 0));
    }
    const headbandCurve = new THREE.CatmullRomCurve3(curvePoints);
    const headbandGeo = new THREE.TubeGeometry(headbandCurve, 48, 0.075, 16, false);
    const headbandMesh = new THREE.Mesh(headbandGeo, matteBlackMaterial);
    headphoneGroup.add(headbandMesh);

    // Headband Metallic Top Spine Accent
    const spineGeo = new THREE.TubeGeometry(headbandCurve, 48, 0.02, 12, false);
    const spineMesh = new THREE.Mesh(spineGeo, titaniumMetallicMaterial);
    spineMesh.position.y += 0.06;
    headphoneGroup.add(spineMesh);

    // Inner Memory-Foam Headband Cushion
    const cushionCurvePoints: THREE.Vector3[] = [];
    for (let i = 4; i <= segments - 4; i++) {
      const angle = (i / segments) * Math.PI;
      const x = Math.cos(angle) * (archRadius - 0.08);
      const y = Math.sin(angle) * (archRadius - 0.08) - 0.15;
      cushionCurvePoints.push(new THREE.Vector3(x, y, 0));
    }
    const cushionCurve = new THREE.CatmullRomCurve3(cushionCurvePoints);
    const cushionGeo = new THREE.TubeGeometry(cushionCurve, 32, 0.1, 16, false);
    const cushionMesh = new THREE.Mesh(cushionGeo, leatherCushionMaterial);
    headphoneGroup.add(cushionMesh);

    // B. Left and Right Earcups Construction
    const createEarcup = (side: 'left' | 'right') => {
      const cupGroup = new THREE.Group();
      const isLeft = side === 'left';
      const xOffset = isLeft ? -archRadius : archRadius;

      // 1. Slider Extender Bracket (Chrome Steel)
      const sliderGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.45, 16);
      const sliderMesh = new THREE.Mesh(sliderGeo, chromeSilverMaterial);
      sliderMesh.position.set(0, 0.25, 0);
      cupGroup.add(sliderMesh);

      // Pivot Gimbal Pin
      const pinGeo = new THREE.SphereGeometry(0.075, 16, 16);
      const pinMesh = new THREE.Mesh(pinGeo, titaniumMetallicMaterial);
      pinMesh.position.set(0, 0.05, 0);
      cupGroup.add(pinMesh);

      // Gimbal Fork Arm (Semi-circular fork holding cup)
      const forkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.05, -0.45),
        new THREE.Vector3(0, -0.05, -0.4),
        new THREE.Vector3(0, -0.25, 0),
        new THREE.Vector3(0, -0.05, 0.4),
        new THREE.Vector3(0, 0.05, 0.45)
      ]);
      const forkGeo = new THREE.TubeGeometry(forkCurve, 24, 0.035, 12, false);
      const forkMesh = new THREE.Mesh(forkGeo, titaniumMetallicMaterial);
      cupGroup.add(forkMesh);

      // 2. Volumetric 3D Outer Cup Shell
      const cupBodyGeo = new THREE.CylinderGeometry(0.56, 0.52, 0.32, 36);
      cupBodyGeo.rotateZ(Math.PI / 2);
      const cupBodyMesh = new THREE.Mesh(cupBodyGeo, matteBlackMaterial);
      cupBodyMesh.position.set(isLeft ? 0.08 : -0.08, -0.25, 0);
      cupGroup.add(cupBodyMesh);

      // Outer Dome Cap
      const domeGeo = new THREE.SphereGeometry(0.53, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      domeGeo.rotateZ(isLeft ? -Math.PI / 2 : Math.PI / 2);
      const domeMesh = new THREE.Mesh(domeGeo, matteBlackMaterial);
      domeMesh.position.set(isLeft ? -0.08 : 0.08, -0.25, 0);
      cupGroup.add(domeMesh);

      // Metallic Outer Chamfer Ring
      const ringGeo = new THREE.TorusGeometry(0.55, 0.025, 16, 48);
      ringGeo.rotateY(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, titaniumMetallicMaterial);
      ringMesh.position.set(isLeft ? 0.02 : -0.02, -0.25, 0);
      cupGroup.add(ringMesh);

      // 3. Plush Toroidal Ear Cushion (Memory Foam)
      const earpadGeo = new THREE.TorusGeometry(0.48, 0.16, 24, 48);
      earpadGeo.rotateY(Math.PI / 2);
      const earpadMesh = new THREE.Mesh(earpadGeo, leatherCushionMaterial);
      earpadMesh.position.set(isLeft ? 0.28 : -0.28, -0.25, 0);
      cupGroup.add(earpadMesh);

      // 4. Inner Recessed Acoustic Driver Grill
      const grillGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32);
      grillGeo.rotateZ(Math.PI / 2);
      const grillMesh = new THREE.Mesh(grillGeo, acousticGrillMaterial);
      grillMesh.position.set(isLeft ? 0.22 : -0.22, -0.25, 0);
      cupGroup.add(grillMesh);

      // Center Core Glowing Ring
      const coreRingGeo = new THREE.TorusGeometry(0.18, 0.015, 16, 32);
      coreRingGeo.rotateY(Math.PI / 2);
      const coreRingMesh = new THREE.Mesh(coreRingGeo, glowingAuraRingMaterial);
      coreRingMesh.position.set(isLeft ? 0.25 : -0.25, -0.25, 0);
      cupGroup.add(coreRingMesh);

      cupGroup.position.set(xOffset, -0.2, 0);
      return cupGroup;
    };

    const leftCup = createEarcup('left');
    const rightCup = createEarcup('right');
    headphoneGroup.add(leftCup);
    headphoneGroup.add(rightCup);

    headphoneGroup.position.set(0, 0.15, 0);
    scene.add(headphoneGroup);

    // 4. Studio Lighting Rig (Ambient White Halo + Rim Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Key Light (Crisp White Front-Left)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3.5, 4.5, 4.5);
    scene.add(keyLight);

    // Fill Light (Soft White Front-Right)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-3.5, 2.0, 3.5);
    scene.add(fillLight);

    // Backstage Ambient White Halo Rim Light (Behind the 3D Headphone)
    const backHaloLight = new THREE.PointLight(0xffffff, 5.0, 15);
    backHaloLight.position.set(0, 0.2, -2.2);
    scene.add(backHaloLight);

    const backRimLight = new THREE.DirectionalLight(0xffffff, 2.4);
    backRimLight.position.set(0, 3, -4);
    scene.add(backRimLight);

    // 5. Interactive Mouse Parallax Tracking
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltY = x * 0.45;
      targetTiltX = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with Zoom-In Transition
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      // Handle Zoom-In Transition to Cover Whole Screen
      if (isZoomingRef.current) {
        // Camera flies forward into the 3D headphone cavity
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 0.2, 0.12);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15, 0.12);
        headphoneGroup.rotation.y += 0.06;
        renderer.domElement.style.opacity = `${Math.max(0, camera.position.z - 0.4)}`;
      } else {
        // Continuous Volumetric 3D Rotation
        const rotSpeed = isPlayingRef.current ? 0.016 : 0.01;
        headphoneGroup.rotation.y += rotSpeed;

        // Floating Bob Physics
        headphoneGroup.position.y = 0.15 + Math.sin(elapsedTime * (isPlayingRef.current ? 2.5 : 1.5)) * 0.06;

        // Parallax Tilt applied on group
        headphoneGroup.rotation.x = currentTiltX;
        headphoneGroup.rotation.z = -currentTiltY * 0.3;

        // Audio beat micro-expansion
        if (isPlayingRef.current) {
          const beatScale = 1.0 + Math.sin(elapsedTime * 6.0) * 0.025;
          leftCup.scale.set(beatScale, beatScale, beatScale);
          rightCup.scale.set(beatScale, beatScale, beatScale);
        } else {
          leftCup.scale.set(1, 1, 1);
          rightCup.scale.set(1, 1, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      headbandGeo.dispose();
      spineGeo.dispose();
      cushionGeo.dispose();
      matteBlackMaterial.dispose();
      titaniumMetallicMaterial.dispose();
      chromeSilverMaterial.dispose();
      leatherCushionMaterial.dispose();
      acousticGrillMaterial.dispose();
      glowingAuraRingMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative w-full max-w-[500px] h-[460px] sm:h-[540px] flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer' : ''
      }`}
    />
  );
};
