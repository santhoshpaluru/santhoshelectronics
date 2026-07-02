'use client';

// Stylised, procedurally-built 3D representations for each product
// category. These stand in for real photography / scanned models of
// P Santhosh's actual builds — see README for how to swap in real GLTF
// assets (via drei's useGLTF) once photos/scans of the finished kits
// are available.

function CircuitBoardModel({ color }) {
  return (
    <group>
      {/* PCB base */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.6, 0.08, 1.7]} />
        <meshStandardMaterial color="#0f4c2c" roughness={0.65} metalness={0.1} />
      </mesh>

      {/* ICs */}
      {[
        [-0.7, 0.3],
        [0.1, -0.15],
        [0.75, 0.35],
      ].map(([x, z], i) => (
        <mesh key={`ic-${i}`} position={[x, 0.085, z]} castShadow>
          <boxGeometry args={[0.32, 0.09, 0.22]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.4} />
        </mesh>
      ))}

      {/* capacitors */}
      {[
        [-0.25, -0.45],
        [0.5, -0.5],
      ].map(([x, z], i) => (
        <mesh key={`cap-${i}`} position={[x, 0.14, z]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.2, 16]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.3} metalness={0.4} />
        </mesh>
      ))}

      {/* resistors, lying flat */}
      {[
        [-1.0, -0.1],
        [-1.0, 0.15],
      ].map(([x, z], i) => (
        <mesh key={`res-${i}`} position={[x, 0.075, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.28, 12]} />
          <meshStandardMaterial color="#d8c08a" roughness={0.5} />
        </mesh>
      ))}

      {/* accent LEDs */}
      {[
        [-1.05, 0.45],
        [-0.85, 0.45],
        [-0.65, 0.45],
      ].map(([x, z], i) => (
        <mesh key={`led-${i}`} position={[x, 0.1, z]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function RobotModel({ color }) {
  const wheelPositions = [
    [-0.72, 0.22, 0.42],
    [0.72, 0.22, 0.42],
    [-0.72, 0.22, -0.42],
    [0.72, 0.22, -0.42],
  ];

  return (
    <group>
      {/* chassis base plate */}
      <mesh castShadow receiveShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[1.5, 0.14, 1.0]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.6} />
      </mesh>

      {/* upper body */}
      <mesh castShadow receiveShadow position={[0, 0.5, -0.05]}>
        <boxGeometry args={[1.1, 0.3, 0.75]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} />
      </mesh>

      {/* front sensor eye */}
      <mesh position={[0, 0.5, 0.33]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.15} metalness={0.5} />
      </mesh>

      {/* antenna */}
      <mesh position={[0.32, 0.66, -0.15]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.36, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.32, 0.85, -0.15]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.3} />
      </mesh>

      {/* wheels */}
      {wheelPositions.map(([x, y, z], i) => (
        <mesh key={`wheel-${i}`} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.14, 20]} />
          <meshStandardMaterial color="#141414" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function SolarPanelModel({ color }) {
  const cellRows = 3;
  const cellCols = 2;
  const cellW = 0.42;
  const cellH = 0.42;
  const gap = 0.05;
  const startX = -((cellCols - 1) * (cellW + gap)) / 2;
  const startZ = -((cellRows - 1) * (cellH + gap)) / 2;

  const cells = [];
  for (let r = 0; r < cellRows; r++) {
    for (let c = 0; c < cellCols; c++) {
      cells.push([startX + c * (cellW + gap), startZ + r * (cellH + gap)]);
    }
  }

  return (
    <group>
      {/* backing panel, slightly tilted like a real mounted panel */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.1, 0.05, 1.5]} />
        <meshStandardMaterial color="#0d2e4a" roughness={0.5} metalness={0.3} />
      </mesh>

      <group rotation={[-0.12, 0, 0]} position={[0, 0.085, 0]}>
        {cells.map(([x, z], i) => (
          <mesh key={`cell-${i}`} position={[x, 0, z]} castShadow>
            <boxGeometry args={[cellW, 0.01, cellH]} />
            <meshStandardMaterial color="#173f63" roughness={0.25} metalness={0.6} />
          </mesh>
        ))}
      </group>

      {/* battery / control box */}
      <mesh castShadow receiveShadow position={[0, 0.13, 0.85]}>
        <boxGeometry args={[0.5, 0.22, 0.3]} />
        <meshStandardMaterial color="#e7e4d8" roughness={0.5} />
      </mesh>

      {/* charge indicator LED */}
      <mesh position={[0.16, 0.13, 1.01]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

function HandheldDetectorModel({ color }) {
  return (
    <group>
      {/* search coil, lying flat */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.06, 16, 32]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.6} />
      </mesh>

      {/* shaft */}
      <mesh castShadow position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 1.2, 12]} />
        <meshStandardMaterial color="#8a8f94" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* control box */}
      <mesh castShadow receiveShadow position={[0, 1.28, 0.05]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.34, 0.5, 0.16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* indicator light */}
      <mesh position={[0, 1.45, 0.2]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#ffe37d" emissive="#ffe37d" emissiveIntensity={1.3} />
      </mesh>

      {/* handle grip */}
      <mesh castShadow position={[0, 1.65, -0.1]} rotation={[Math.PI / 2.4, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.42, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
      </mesh>
    </group>
  );
}

function WeatherStationModel({ color }) {
  return (
    <group>
      {/* base enclosure */}
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[0.55, 0.44, 0.35]} />
        <meshStandardMaterial color="#e7e4d8" roughness={0.55} />
      </mesh>

      {/* display panel */}
      <mesh position={[0, 0.28, 0.18]}>
        <boxGeometry args={[0.34, 0.16, 0.01]} />
        <meshStandardMaterial color="#0e1a16" roughness={0.3} />
      </mesh>

      {/* status LED */}
      <mesh position={[0.2, 0.4, 0.18]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.3} />
      </mesh>

      {/* antenna mast */}
      <mesh castShadow position={[0, 0.75, -0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.65, 10]} />
        <meshStandardMaterial color="#8a8f94" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.09, -0.1]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
      </mesh>

      {/* small top-up solar panel */}
      <mesh castShadow receiveShadow position={[0, 0.47, 0.05]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.45, 0.02, 0.28]} />
        <meshStandardMaterial color="#173f63" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* hanging sensor probes */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={`probe-${i}`} castShadow position={[x, -0.05, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function SecurityLockModel({ color }) {
  const keypadButtons = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      keypadButtons.push([-0.12 + col * 0.12, 0.5 - row * 0.12]);
    }
  }

  return (
    <group>
      {/* main body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.7, 1.0, 0.18]} />
        <meshStandardMaterial color="#e7e4d8" roughness={0.5} />
      </mesh>

      {/* fingerprint sensor pad, facing forward */}
      <mesh position={[0, 0.82, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} />
      </mesh>

      {/* keypad buttons, facing forward */}
      {keypadButtons.map(([x, y], i) => (
        <mesh key={`key-${i}`} position={[x, y, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 16]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
        </mesh>
      ))}

      {/* status LED */}
      <mesh position={[0.25, 0.95, 0.1]}>
        <sphereGeometry args={[0.02, 10, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.3} />
      </mesh>

      {/* solenoid strike box */}
      <mesh castShadow receiveShadow position={[0.55, 0.15, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
}

export default function ProjectModel({ type, color = '#1b5e3a' }) {
  switch (type) {
    case 'robot':
      return <RobotModel color={color} />;
    case 'solar-panel':
      return <SolarPanelModel color={color} />;
    case 'handheld-detector':
      return <HandheldDetectorModel color={color} />;
    case 'weather-station':
      return <WeatherStationModel color={color} />;
    case 'security-lock':
      return <SecurityLockModel color={color} />;
    case 'circuit-board':
    default:
      return <CircuitBoardModel color={color} />;
  }
}
