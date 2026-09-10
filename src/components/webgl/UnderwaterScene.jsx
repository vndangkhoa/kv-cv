import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  subjectVertexShader,
  subjectFragmentShader,
  fishVertexShader,
  fishFragmentShader,
} from './shaders/underwaterShaders';

export default function UnderwaterScene({ scrollProgress = 0, scrollVelocity = 0 }) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    subjectMat: null,
    fishObjects: [],
    particles: null,
    targetMouse: { x: 0, y: 0, uvX: 0.5, uvY: 0.5 },
    currentMouse: { x: 0, y: 0, uvX: 0.5, uvY: 0.5 },
    scatterImpulse: 0.0,
    baseCamZ: 4.6,
    animFrameId: null,
    clock: new THREE.Clock(),
    scrollProgress: 0,
    scrollVelocity: 0,
  });

  // Sync scroll props with animation loop
  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
    stateRef.current.scrollVelocity = Math.min(Math.abs(scrollVelocity) * 0.08, 1.5);
  }, [scrollProgress, scrollVelocity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, stateRef.current.baseCamZ);
    stateRef.current.camera = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    const textureLoader = new THREE.TextureLoader();

    // 3. Crisp 2.5D Human Subject with Volumetric Parallax Depth
    const subjectTex = textureLoader.load('/textures/character-base.jpg');
    const depthTex = textureLoader.load('/textures/character-depth.png');
    subjectTex.colorSpace = THREE.SRGBColorSpace;

    const subjectGeo = new THREE.PlaneGeometry(6.6, 6.6, 128, 128);
    const subjectMat = new THREE.ShaderMaterial({
      vertexShader: subjectVertexShader,
      fragmentShader: subjectFragmentShader,
      uniforms: {
        uTexture: { value: subjectTex },
        uDepthMap: { value: depthTex },
        uDisplacement: { value: 0.65 },
        uTime: { value: 0.0 },
        uFishPositions: {
          value: [
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, 1),
          ],
        },
      },
      wireframe: false,
      transparent: false,
    });
    stateRef.current.subjectMat = subjectMat;

    const subjectMesh = new THREE.Mesh(subjectGeo, subjectMat);
    subjectMesh.position.set(0, -0.15, 0);
    scene.add(subjectMesh);

    // 4. Autonomous 3D Goldfish System interacting directly with Human Subject
    // Anatomical targets on human:
    // Hands in prayer: (0.0, -0.62, 0.45)
    // Face & sunglasses: (-0.15, 0.45, 0.25)
    // Torso / chest: (0.0, -0.15, 0.25)
    // Shoulders: Left (-1.1, 0.05, 0.15), Right (1.1, 0.05, 0.15)
    const fishConfigs = [
      {
        id: 1,
        tex: '/textures/fish-1.png',
        width: 1.55,
        height: 1.1,
        tailDir: 1.0, // Head on right, tail on left
        baseSwimSpeed: 4.8,
        baseWagAmp: 0.07,
        // Hand Loop Leader: Weaves directly around the clasped prayer hands
        calcPos: (t, p) => {
          const speed = t * 0.95;
          const rX = 0.65 + p * 0.2;
          const rY = 0.24;
          const rZ = 0.55;
          return new THREE.Vector3(
            0.05 + Math.cos(speed) * rX,
            -0.62 + Math.sin(speed * 2.0) * rY,
            0.45 + Math.sin(speed) * rZ // Goes from +1.0 (in front of hands) to -0.1 (behind forearms)
          );
        },
      },
      {
        id: 2,
        tex: '/textures/fish-2.png',
        width: 1.45,
        height: 1.15,
        tailDir: 1.0,
        baseSwimSpeed: 4.5,
        baseWagAmp: 0.065,
        // Hand Companion: Swims with phase offset around hands and lower torso
        calcPos: (t, p) => {
          const speed = t * 1.1 + Math.PI;
          const rX = 0.58 + p * 0.15;
          const rY = 0.26;
          const rZ = 0.5;
          return new THREE.Vector3(
            -0.05 + Math.sin(speed) * rX,
            -0.56 + Math.cos(speed * 2.0) * rY,
            0.42 + Math.cos(speed) * rZ
          );
        },
      },
      {
        id: 3,
        tex: '/textures/fish-3.png',
        width: 1.4,
        height: 1.0,
        tailDir: -1.0, // Head on left, tail on right
        baseSwimSpeed: 4.2,
        baseWagAmp: 0.06,
        // Face & Sunglasses Inspector: Hovers inquisitively near face/sunglasses
        calcPos: (t, p) => {
          const speed = t * 0.85;
          const rX = 0.7 + p * 0.15;
          const rY = 0.28;
          const rZ = 0.52;
          return new THREE.Vector3(
            -0.18 + Math.cos(speed) * rX,
            0.45 + Math.sin(speed * 1.6) * rY,
            0.28 + Math.sin(speed) * rZ // Swoops in front of sunglasses at +0.8, curves behind head at -0.24
          );
        },
      },
      {
        id: 4,
        tex: '/textures/fish-4.png',
        width: 1.4,
        height: 0.95,
        tailDir: 1.0,
        baseSwimSpeed: 4.0,
        baseWagAmp: 0.055,
        // Left Shoulder to Torso Cruiser: Glides over shoulder and across chest
        calcPos: (t, p) => {
          const speed = t * 0.78 + 1.2;
          const rX = 0.85 + p * 0.2;
          const rY = 0.42;
          const rZ = 0.52;
          return new THREE.Vector3(
            -0.65 + Math.sin(speed) * rX,
            0.05 + Math.cos(speed) * rY,
            0.28 + Math.cos(speed * 1.2) * rZ
          );
        },
      },
      {
        id: 5,
        tex: '/textures/fish-5.png',
        width: 0.85,
        height: 1.05,
        tailDir: 1.0,
        baseSwimSpeed: 4.9,
        baseWagAmp: 0.065,
        // Full Torso 3D Orbit: Completely wraps around chest (front) and back (behind human)
        calcPos: (t, p) => {
          const speed = t * 0.7;
          const rX = 1.75 + p * 0.3;
          const rY = 0.32;
          const rZ = 0.85;
          return new THREE.Vector3(
            Math.sin(speed) * rX,
            -0.2 + Math.cos(speed * 2.0) * rY,
            0.15 + Math.cos(speed) * rZ // +1.0 in foreground across chest, -0.7 behind back!
          );
        },
      },
      {
        id: 6,
        tex: '/textures/fish-6.png',
        width: 0.85,
        height: 0.95,
        tailDir: 1.0,
        baseSwimSpeed: 4.6,
        baseWagAmp: 0.06,
        // Right Shoulder & Flank (Cursor Reactive): Plays around right silhouette, reacts to mouse
        calcPos: (t, p) => {
          const speed = t * 0.82 + 2.4;
          const rX = 0.85 + p * 0.25;
          const rY = 0.45;
          const rZ = 0.5;
          return new THREE.Vector3(
            0.95 + Math.cos(speed) * rX,
            -0.08 + Math.sin(speed * 1.4) * rY,
            0.32 + Math.sin(speed) * rZ
          );
        },
      },
      {
        id: 7,
        tex: '/textures/fish-7.png',
        width: 1.15,
        height: 1.0,
        tailDir: -1.0,
        baseSwimSpeed: 4.1,
        baseWagAmp: 0.055,
        // Depth Weaver: Sweeps gracefully between deep background and lens foreground
        calcPos: (t, p) => {
          const speed = t * 0.65 + 4.1;
          const rX = 1.6 + p * 0.3;
          const rY = 0.52;
          const rZ = 0.95;
          return new THREE.Vector3(
            Math.cos(speed) * rX,
            -0.35 + Math.sin(speed) * rY,
            0.15 + Math.sin(speed) * rZ
          );
        },
      },
    ];

    const fishObjects = [];

    fishConfigs.forEach((cfg) => {
      const tex = textureLoader.load(cfg.tex);
      tex.colorSpace = THREE.SRGBColorSpace;

      const geo = new THREE.PlaneGeometry(cfg.width, cfg.height, 32, 16);
      const mat = new THREE.ShaderMaterial({
        vertexShader: fishVertexShader,
        fragmentShader: fishFragmentShader,
        uniforms: {
          uTexture: { value: tex },
          uTime: { value: 0.0 },
          uSwimSpeed: { value: cfg.baseSwimSpeed },
          uWagAmplitude: { value: cfg.baseWagAmp },
          uTailDirection: { value: cfg.tailDir },
          uOpacity: { value: 1.0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      const initialPos = cfg.calcPos(0, 0);
      mesh.position.copy(initialPos);
      scene.add(mesh);

      fishObjects.push({
        mesh,
        mat,
        config: cfg,
        currentPos: initialPos.clone(),
        prevPos: initialPos.clone(),
        speedMultiplier: 1.0,
      });
    });

    stateRef.current.fishObjects = fishObjects;

    // 5. Ambient Plankton & Bubble Micro-Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 8.0;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0 + 0.5;
      particleScales[i] = Math.random() * 0.03 + 0.01;
      particleSpeeds[i] = Math.random() * 0.25 + 0.12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x64ffd9,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    stateRef.current.particles = { mesh: particles, speeds: particleSpeeds, count: particleCount };

    // 6. Pointer Movement & Interactive Spring Physics
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const uvX = (e.clientX - rect.left) / rect.width;
      const uvY = 1.0 - (e.clientY - rect.top) / rect.height;

      stateRef.current.targetMouse.x = Math.max(-1, Math.min(1, x));
      stateRef.current.targetMouse.y = Math.max(-1, Math.min(1, y));
      stateRef.current.targetMouse.uvX = uvX;
      stateRef.current.targetMouse.uvY = uvY;
    };

    // Click / Tap to interact: Startles fish and causes lively scatter burst
    const handlePointerDown = () => {
      stateRef.current.scatterImpulse = 1.0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize);

    // 8. Main Render & 3D Interactive Animation Loop
    const animate = () => {
      const elapsed = stateRef.current.clock.getElapsedTime();

      // Mouse Lerp Damping
      const currentM = stateRef.current.currentMouse;
      const targetM = stateRef.current.targetMouse;
      currentM.x += (targetM.x - currentM.x) * 0.05;
      currentM.y += (targetM.y - currentM.y) * 0.05;
      currentM.uvX += (targetM.uvX - currentM.uvX) * 0.05;
      currentM.uvY += (targetM.uvY - currentM.uvY) * 0.05;

      // Click scatter impulse decay
      stateRef.current.scatterImpulse *= 0.94;
      const scatter = stateRef.current.scatterImpulse;

      const p = stateRef.current.scrollProgress; // 0.0 to 1.0

      // Camera Orbit & Zoom with Scroll & Mouse
      const dollyZ = THREE.MathUtils.lerp(4.6, 2.5, p);
      const rotY = THREE.MathUtils.lerp(-0.24, 0.3, p);
      const rotX = THREE.MathUtils.lerp(-0.12, 0.15, p);

      camera.position.z = dollyZ;
      camera.position.x = currentM.x * 0.32 + Math.sin(p * Math.PI) * 0.22;
      camera.position.y = currentM.y * 0.22 + THREE.MathUtils.lerp(0.0, -0.18, p);

      camera.rotation.y = rotY + currentM.x * 0.08;
      camera.rotation.x = rotX - currentM.y * 0.06;

      // Approximate cursor position in 3D world space
      const mouseWorld = new THREE.Vector3(currentM.x * 2.4, currentM.y * 1.8, 0.4);

      // Human Center for proximity lighting calculations
      const humanCenter = new THREE.Vector3(0, -0.15, 0);

      // Update 3D Goldfish Kinematics & Human Interaction
      fishObjects.forEach((fish) => {
        const { mesh, mat, config } = fish;
        mat.uniforms.uTime.value = elapsed;

        // Base target position from interactive 3D orbit around human
        const baseTarget = config.calcPos(elapsed, p);

        // Distance from cursor to fish
        const distToMouse = baseTarget.distanceTo(mouseWorld);

        // Interactive cursor repulsion / startle reaction:
        // When cursor moves close (< 1.3 units), fish accelerate and dart toward human for shelter
        if (distToMouse < 1.35) {
          fish.speedMultiplier = Math.min(2.4, fish.speedMultiplier + 0.15);
          const fleeDir = new THREE.Vector3().subVectors(baseTarget, mouseWorld).normalize();
          baseTarget.addScaledVector(fleeDir, 0.35);
        } else {
          // Smoothly return to normal cruise speed
          fish.speedMultiplier += (1.0 - fish.speedMultiplier) * 0.04;
        }

        // Scatter burst on click/tap
        if (scatter > 0.02) {
          const scatterDir = new THREE.Vector3()
            .subVectors(baseTarget, humanCenter)
            .normalize();
          baseTarget.addScaledVector(scatterDir, scatter * 0.8);
          fish.speedMultiplier = Math.max(fish.speedMultiplier, 1.0 + scatter * 1.5);
        }

        // Smooth physics position lerp
        fish.prevPos.copy(mesh.position);
        mesh.position.lerp(baseTarget, 0.12);

        // Compute 3D velocity vector
        const vx = mesh.position.x - fish.prevPos.x;
        const vy = mesh.position.y - fish.prevPos.y;
        const vz = mesh.position.z - fish.prevPos.z;
        const speed = Math.hypot(vx, vy, vz);

        // Real 3D Orientation: Fish faces its swim trajectory and banks into curves
        if (speed > 0.0002) {
          const headingXY = Math.atan2(vy, Math.abs(vx) + 0.0001);
          const isMovingRight = vx >= 0;

          // Head-forward orientation based on texture layout
          if (config.tailDir > 0) {
            // Texture has head on right
            mesh.scale.x = isMovingRight ? config.width : -config.width;
            mesh.scale.y = config.height;
            mesh.rotation.z = isMovingRight ? headingXY : -headingXY;
          } else {
            // Texture has head on left
            mesh.scale.x = isMovingRight ? -config.width : config.width;
            mesh.scale.y = config.height;
            mesh.rotation.z = isMovingRight ? -headingXY : headingXY;
          }

          // Natural banking roll when turning & pitch when climbing/diving
          const bankRoll = THREE.MathUtils.clamp(-vx * 0.5, -0.45, 0.45);
          mesh.rotation.y = bankRoll + vz * 0.8;
          mesh.rotation.x = THREE.MathUtils.clamp(-vy * 0.35, -0.3, 0.3);
        }

        // Dynamic tail wagging frequency tied to swim velocity
        mat.uniforms.uSwimSpeed.value =
          config.baseSwimSpeed * fish.speedMultiplier * (1.0 + speed * 12.0);
        mat.uniforms.uWagAmplitude.value =
          config.baseWagAmp * (1.0 + scatter * 0.7);
      });

      // Update Subject Illumination from Closest Swimming Fish
      if (subjectMat) {
        subjectMat.uniforms.uTime.value = elapsed;

        // Sort fish by proximity to human center
        const sortedFish = [...fishObjects].sort(
          (a, b) =>
            a.mesh.position.distanceTo(humanCenter) -
            b.mesh.position.distanceTo(humanCenter)
        );

        // Feed the 3 closest fish coordinates to the human shader
        if (sortedFish[0]) {
          subjectMat.uniforms.uFishPositions.value[0].copy(sortedFish[0].mesh.position);
        }
        if (sortedFish[1]) {
          subjectMat.uniforms.uFishPositions.value[1].copy(sortedFish[1].mesh.position);
        }
        if (sortedFish[2]) {
          subjectMat.uniforms.uFishPositions.value[2].copy(sortedFish[2].mesh.position);
        }
      }

      // Update ambient plankton particles
      if (stateRef.current.particles) {
        const { mesh: pts, speeds, count } = stateRef.current.particles;
        const positions = pts.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          positions[i * 3 + 1] += speeds[i] * 0.012;
          positions[i * 3 + 0] += Math.sin(elapsed + i) * 0.0015;
          if (positions[i * 3 + 1] > 4.0) {
            positions[i * 3 + 1] = -4.0;
          }
        }
        pts.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      stateRef.current.animFrameId = requestAnimationFrame(animate);
    };

    stateRef.current.animFrameId = requestAnimationFrame(animate);

    // 9. Cleanup GPU Resources
    return () => {
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      subjectGeo.dispose();
      subjectMat.dispose();
      subjectTex.dispose();
      depthTex.dispose();

      fishObjects.forEach(({ mesh, mat }) => {
        mesh.geometry.dispose();
        mat.dispose();
      });

      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto select-none cursor-pointer"
      style={{ touchAction: 'none' }}
      title="Click or move cursor to interact with the 3D goldfish!"
    />
  );
}

