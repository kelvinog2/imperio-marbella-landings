import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { MapPin, Navigation, Power } from "lucide-react";

type NearbyItem = {
  label: string;
  detail: string;
};

type Props = {
  map: {
    light: string;
    lightSmall: string;
    satellite: string;
    satelliteSmall: string;
    embed: string;
  };
  nearby: NearbyItem[];
  address: string;
  apartmentName?: string;
};

type MapSceneProps = {
  sketch: string;
  render: string;
  progress: number;
  apartmentName: string;
  address: string;
  routeUrl: string;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uSketch;
  uniform sampler2D uRender;
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec4 sketch = texture2D(uSketch, vUv);
    vec4 render = texture2D(uRender, vUv);
    float sweep = mix(-0.08, 1.08, uProgress);
    float grain = noise(vUv * 9.5 + vec2(uTime * 0.025, -uTime * 0.018));
    float verticalDrift = sin((vUv.y + uTime * 0.015) * 12.0) * 0.018;
    float edge = sweep + (grain - 0.5) * 0.18 + verticalDrift;
    float renderMask = 1.0 - smoothstep(edge - 0.105, edge + 0.105, vUv.x);
    vec3 color = mix(sketch.rgb, render.rgb, renderMask);
    float paperLift = (1.0 - renderMask) * 0.08;
    gl_FragColor = vec4(color + paperLift, 1.0);
  }
`;

const pins = [
  {
    label: "IMPERIO 1",
    detail: "Calle María Auxiliadora 1",
    href: "#reserva-directa",
    position: [0.5, -0.08, 0.04] as const
  },
  {
    label: "Playa de Venus",
    detail: "3 min a pie",
    href: "https://www.google.com/maps/search/?api=1&query=Playa%20de%20Venus%20Marbella",
    position: [2.1, -1.32, 0.04] as const
  },
  {
    label: "Centro histórico",
    detail: "Paseo llano",
    href: "https://www.google.com/maps/search/?api=1&query=Plaza%20de%20los%20Naranjos%20Marbella",
    position: [2.0, 1.15, 0.04] as const
  }
];

function ShaderPlane({ sketch, render, progress }: MapSceneProps) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sketchTexture = useLoader(THREE.TextureLoader, sketch);
  const renderTexture = useLoader(THREE.TextureLoader, render);
  const { viewport } = useThree();

  useMemo(() => {
    for (const texture of [sketchTexture, renderTexture]) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
    }
  }, [sketchTexture, renderTexture]);

  const uniforms = useMemo(
    () => ({
      uSketch: { value: sketchTexture },
      uRender: { value: renderTexture },
      uProgress: { value: 0 },
      uTime: { value: 0 }
    }),
    [sketchTexture, renderTexture]
  );

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uProgress.value = THREE.MathUtils.lerp(material.uniforms.uProgress.value, progress, 0.085);
    material.uniforms.uTime.value += delta;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
}

function MapPins({
  progress,
  apartmentName,
  address,
  routeUrl
}: {
  progress: number;
  apartmentName: string;
  address: string;
  routeUrl: string;
}) {
  const opacity = Math.max(0, Math.min(1, (progress - 0.56) / 0.24));
  const pins = [
    {
      label: apartmentName,
      detail: address,
      href: routeUrl,
      position: [0.5, -0.08, 0.04] as const
    },
    {
      label: "Playa de Venus",
      detail: "A pocos minutos",
      href: "https://www.google.com/maps/search/?api=1&query=Playa%20de%20Venus%20Marbella",
      position: [2.1, -1.32, 0.04] as const
    },
    {
      label: "Centro historico",
      detail: "Paseo llano",
      href: "https://www.google.com/maps/search/?api=1&query=Plaza%20de%20los%20Naranjos%20Marbella",
      position: [2.0, 1.15, 0.04] as const
    }
  ];

  return (
    <>
      {pins.map((pin, index) => (
        <Html center position={pin.position} zIndexRange={[2, 0]} key={pin.label}>
          <a
            className="map-hotspot"
            href={pin.href}
            target={pin.href.startsWith("http") ? "_blank" : undefined}
            rel={pin.href.startsWith("http") ? "noreferrer" : undefined}
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 14}px) scale(${0.92 + opacity * 0.08})`,
              transitionDelay: `${index * 80}ms`,
              pointerEvents: opacity > 0.72 ? "auto" : "none"
            }}
          >
            <span className="map-hotspot-dot">
              <MapPin size={16} aria-hidden="true" />
            </span>
            <span className="map-hotspot-label">
              <strong>{pin.label}</strong>
              <small>{pin.detail}</small>
            </span>
          </a>
        </Html>
      ))}
    </>
  );
}

function MapShaderScene(props: MapSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      dpr={[1, 1.6]}
    >
      <ShaderPlane {...props} />
      <MapPins progress={props.progress} apartmentName={props.apartmentName} address={props.address} routeUrl={props.routeUrl} />
    </Canvas>
  );
}

export default function MapTransition({ map, nearby, address, apartmentName = "IMPERIO" }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const revealedRef = useRef(0);
  const [assets, setAssets] = useState({ sketch: map.light, render: map.satellite });
  const routeUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");

    const syncAssets = () => {
      setAssets(media.matches ? { sketch: map.lightSmall, render: map.satelliteSmall } : { sketch: map.light, render: map.satellite });
    };

    syncAssets();
    media.addEventListener("change", syncAssets);

    return () => media.removeEventListener("change", syncAssets);
  }, [map.light, map.lightSmall, map.satellite, map.satelliteSmall]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sync = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(rect.height - viewport, 1);
      const next = Math.min(Math.max(-rect.top / travel, 0), 1);
      revealedRef.current = Math.max(revealedRef.current, next);
      setProgress(revealedRef.current);
      section.style.setProperty("--map-progress", revealedRef.current.toFixed(3));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section className="map-section" id="ubicacion" ref={sectionRef}>
      <div className="map-canvas-layer">
        <MapShaderScene sketch={assets.sketch} render={assets.render} progress={progress} apartmentName={apartmentName} address={address} routeUrl={routeUrl} />
      </div>

      <div className="map-content">
        <div className="map-copy">
          <span className="section-kicker">Ubicación 10/10</span>
          <h2>Centro de Marbella con la playa al alcance.</h2>
          <p>{address}. Valorada por huéspedes después de alojarse en {apartmentName}.</p>
          <ul className="nearby-list">
            {nearby.map((item) => (
              <li className="nearby-item" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="map-frame">
          {active ? (
            <iframe title={`Mapa de ${apartmentName}`} src={map.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="map-static">
              <div className="map-marker">
                <span className="pin">
                  <MapPin size={30} aria-hidden="true" />
                </span>
                <strong>{address}</strong>
                <span>Playa de Venus a 3 min a pie. Parking privado a pocos metros.</span>
                <button className="button button-primary" type="button" onClick={() => setActive(true)}>
                  <Power size={17} aria-hidden="true" />
                  Activar Google Maps
                </button>
                <a className="button button-outline" href={routeUrl} target="_blank" rel="noreferrer">
                  <Navigation size={17} aria-hidden="true" />
                  Abrir ruta
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
