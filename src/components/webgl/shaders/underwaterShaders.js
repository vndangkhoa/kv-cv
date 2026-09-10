/**
 * Custom GLSL Shaders for 3D Goldfish & Human Interaction Scene
 * Provides crisp 2.5D volumetric depth for the human portrait and
 * dynamic golden point-light illumination cast by nearby swimming goldfish.
 */

export const subjectVertexShader = `
  varying vec2 vUv;
  varying float vDepth;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  uniform sampler2D uDepthMap;
  uniform float uDisplacement;

  void main() {
    vUv = uv;
    
    // Read depth map texture
    vec4 depthColor = texture2D(uDepthMap, uv);
    float depth = depthColor.r;
    vDepth = depth;

    vec3 displacedPosition = position;
    
    // Clean, volumetric displacement along normal/Z based on depth map
    // Prayer hands and forearms pop forward; background aquarium recedes smoothly
    displacedPosition.z += (depth - 0.25) * uDisplacement;

    vec4 worldPos = modelMatrix * vec4(displacedPosition, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const subjectFragmentShader = `
  varying vec2 vUv;
  varying float vDepth;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  uniform sampler2D uTexture;
  uniform vec3 uFishPositions[3];
  uniform float uTime;

  void main() {
    // Render crystal-clear portrait texture without wavy water distortion
    vec4 baseTex = texture2D(uTexture, vUv);
    vec3 color = baseTex.rgb;

    // Dynamic warm golden illumination cast by nearby 3D goldfish onto the human subject
    // Hands, face, and shirt subtly catch the golden light as fish swim close
    vec3 fishLightTotal = vec3(0.0);
    for (int i = 0; i < 3; i++) {
      vec3 fishPos = uFishPositions[i];
      float distToFish = length(vWorldPos - fishPos);
      
      // Smooth radial illumination falloff
      float atten = smoothstep(1.8, 0.2, distToFish);
      // Warm golden/orange glow from goldfish
      fishLightTotal += vec3(1.0, 0.62, 0.2) * (atten * 0.45);
    }
    color += fishLightTotal * (0.6 + vDepth * 0.4);

    // Subtle edge vignette to focus attention on the subject & fish
    vec2 centeredUv = vUv - vec2(0.5);
    float distFromCenter = length(centeredUv);
    float vignette = 1.0 - smoothstep(0.48, 0.95, distFromCenter);
    color *= mix(0.82, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const fishVertexShader = `
  varying vec2 vUv;
  varying vec3 vFishWorldPos;
  uniform float uTime;
  uniform float uSwimSpeed;
  uniform float uWagAmplitude;
  uniform float uTailDirection; // 1.0 if tail is on the left, -1.0 if on the right

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Tail flexing: determine distance from head towards the tail fin
    float tailFactor = clamp((uTailDirection > 0.0 ? (1.0 - uv.x) : uv.x), 0.0, 1.0);
    
    // Dual-harmonic organic swimming flex (main body wag + rapid fin flutter)
    float mainWag = sin(uTime * uSwimSpeed + pos.x * 3.5) * pow(tailFactor, 1.8) * uWagAmplitude;
    float finFlutter = sin(uTime * (uSwimSpeed * 1.6) + pos.y * 5.0) * pow(tailFactor, 2.4) * (uWagAmplitude * 0.35);
    
    pos.y += mainWag + finFlutter;
    pos.z += mainWag * 0.5;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vFishWorldPos = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const fishFragmentShader = `
  varying vec2 vUv;
  varying vec3 vFishWorldPos;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uOpacity;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Discard transparent pixels
    if (texColor.a < 0.05) discard;

    // Vibrant golden scales with subtle living shimmer
    float shimmer = sin(vUv.x * 12.0 + vUv.y * 8.0 + uTime * 3.0) * 0.07;
    vec3 col = texColor.rgb + vec3(shimmer * 0.9, shimmer * 0.45, -shimmer * 0.1);

    // Warm self-glow to make fish feel alive in 3D
    col += vec3(0.08, 0.04, 0.0);

    gl_FragColor = vec4(col, texColor.a * uOpacity);
  }
`;
