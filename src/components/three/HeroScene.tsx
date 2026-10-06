import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, RoundedBox, Sparkles, useTexture } from '@react-three/drei'
import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { heroScroll } from './heroState'

const SAND = '#E3D4BF'
const TEAL = '#18434A'
const COPPER = '#9F7D69'

type SceneProps = { reduced: boolean; mobile: boolean }

/* ───────────── Frasco de esmalte con el monograma K ───────────── */
function PolishBottle({ mobile }: { mobile: boolean }) {
  const label = useTexture('/brand/mark-512.png', (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
  })

  const glass = useMemo(
    () =>
      mobile
        ? new THREE.MeshPhysicalMaterial({
            color: '#dfeeee',
            roughness: 0.04,
            metalness: 0,
            transparent: true,
            opacity: 0.28,
            clearcoat: 1,
            envMapIntensity: 1.6,
          })
        : new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            roughness: 0.03,
            metalness: 0,
            transmission: 1,
            thickness: 0.55,
            ior: 1.48,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            attenuationColor: new THREE.Color('#cfe3e2'),
            attenuationDistance: 2.5,
            envMapIntensity: 1.4,
          }),
    [mobile],
  )

  return (
    <group>
      {/* Laca interior verde petróleo */}
      <RoundedBox args={[1.0, 0.98, 0.64]} radius={0.12} smoothness={6} position={[0, -0.11, 0]}>
        <meshPhysicalMaterial color={TEAL} roughness={0.18} metalness={0.05} clearcoat={1} clearcoatRoughness={0.08} sheen={0.6} sheenColor={COPPER} envMapIntensity={1.2} />
      </RoundedBox>
      {/* Vidrio */}
      <RoundedBox args={[1.2, 1.3, 0.84]} radius={0.17} smoothness={8} material={glass} />
      {/* Etiqueta: monograma oficial */}
      <mesh position={[0, -0.07, 0.425]}>
        <planeGeometry args={[0.6, 0.64]} />
        <meshStandardMaterial map={label} transparent roughness={0.4} metalness={0.1} toneMapped={false} />
      </mesh>
      {/* Cuello y anillo cobre */}
      <mesh position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.24, 0.26, 0.2, 48]} />
        <meshPhysicalMaterial color={SAND} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.07, 64]} />
        <meshStandardMaterial color={COPPER} roughness={0.22} metalness={0.95} />
      </mesh>
      {/* Tapa lacada arena */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.27, 0.31, 1.18, 64]} />
        <meshPhysicalMaterial color={SAND} roughness={0.22} metalness={0.05} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0, 2.075, 0]}>
        <sphereGeometry args={[0.27, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color={SAND} roughness={0.22} clearcoat={1} />
      </mesh>
    </group>
  )
}

/* ───────────── Cinta de seda (obi) que ondula ───────────── */
const sm = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function SilkRibbon({
  width = 11,
  height = 0.95,
  color = SAND,
  phase = 0,
  speed = 1,
  amp = 0.55,
  metal = 0.05,
  reduced,
}: {
  width?: number
  height?: number
  color?: string
  phase?: number
  speed?: number
  amp?: number
  metal?: number
  reduced: boolean
}) {
  const geo = useMemo(() => new THREE.PlaneGeometry(width, height, 180, 8), [width, height])
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array as Float32Array), [geo])
  const t0 = useRef(phase * 10)

  const deform = (t: number) => {
    const pos = geo.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i]
      const u = x / width + 0.5
      const prof = Math.max(0.015, sm(0, 0.28, u) * sm(1, 0.72, u))
      const y = base[i + 1] * prof
      const a = Math.sin(x * 0.33 + t * 0.35 + phase) * 1.15
      const yy = y * Math.cos(a)
      const zt = y * Math.sin(a)
      arr[i] = x
      arr[i + 1] = yy + Math.sin(x * 0.45 + t * 0.45 + phase) * 0.38
      arr[i + 2] = zt + Math.sin(x * 0.7 + t * 0.8 + phase) * amp + Math.sin(x * 1.6 - t * 0.55) * 0.1
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => deform(t0.current), [geo]) // forma inicial (también para reduced-motion)

  useFrame((_, dt) => {
    if (reduced) return
    t0.current += Math.min(dt, 0.05) * speed
    deform(t0.current)
  })

  return (
    <mesh geometry={geo}>
      <meshPhysicalMaterial
        color={color}
        side={THREE.DoubleSide}
        roughness={0.36}
        metalness={metal}
        sheen={1}
        sheenRoughness={0.3}
        sheenColor={'#fff6ea'}
        clearcoat={0.25}
        envMapIntensity={1.1}
      />
    </mesh>
  )
}

/* ───────────── Pétalos que caen ───────────── */
function usePetalGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.bezierCurveTo(0.42, 0.18, 0.46, 0.66, 0.14, 0.95)
    s.lineTo(0, 0.84)
    s.lineTo(-0.14, 0.95)
    s.bezierCurveTo(-0.46, 0.66, -0.42, 0.18, 0, 0)
    const g = new THREE.ShapeGeometry(s, 10)
    const p = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i)
      const y = p.getY(i)
      p.setZ(i, x * x * 0.9 - y * 0.12)
    }
    g.translate(0, -0.45, 0)
    g.scale(0.15, 0.15, 0.15)
    g.computeVertexNormals()
    return g
  }, [])
}

function Petals({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const geo = usePetalGeometry()
  const { viewport } = useThree()
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 9,
        z: -2.5 + Math.random() * 4,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        vr: 0.2 + Math.random() * 0.7,
        fall: 0.12 + Math.random() * 0.28,
        sway: Math.random() * Math.PI * 2,
        s: 0.6 + Math.random() * 0.9,
      })),
    [count],
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const palette = useMemo(() => ['#E3D4BF', '#DED6C4', '#F4EEE5', '#9F7D69', '#E8CDBE'].map((c) => new THREE.Color(c)), [])

  const write = (t: number) => {
    const m = ref.current
    if (!m) return
    const h = Math.max(viewport.height, 7) * 0.65
    data.forEach((p, i) => {
      dummy.position.set(p.x + Math.sin(t * 0.6 + p.sway) * 0.35, p.y, p.z)
      dummy.rotation.set(p.rx + t * p.vr, p.ry + t * p.vr * 0.7, p.rz)
      dummy.scale.setScalar(p.s)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      if (p.y < -h) p.y = h
    })
    m.instanceMatrix.needsUpdate = true
  }

  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    data.forEach((_, i) => m.setColorAt(i, palette[i % palette.length]))
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    write(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, palette])

  useFrame((state, dt) => {
    if (reduced) return
    const d = Math.min(dt, 0.05)
    data.forEach((p) => (p.y -= p.fall * d))
    write(state.clock.elapsedTime)
  })

  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial side={THREE.DoubleSide} roughness={0.55} metalness={0.05} />
    </instancedMesh>
  )
}

/* ───────────── Composición ───────────── */
function Rig({ reduced, mobile }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const bottle = useRef<THREE.Group>(null)
  const { viewport, pointer } = useThree()
  const narrow = viewport.aspect < 0.9

  useFrame((state, dt) => {
    const g = group.current
    const b = bottle.current
    if (!g || !b) return
    const p = heroScroll.progress
    const k = 1 - Math.pow(0.001, Math.min(dt, 0.05))
    const px = reduced ? 0 : pointer.x
    const py = reduced ? 0 : pointer.y
    const spin = reduced ? 0 : state.clock.elapsedTime * 0.12
    b.rotation.y = THREE.MathUtils.lerp(b.rotation.y, -0.5 + px * 0.45 + p * Math.PI * 1.1 + Math.sin(spin) * 0.25, k)
    b.rotation.x = THREE.MathUtils.lerp(b.rotation.x, 0.08 - py * 0.18 + p * 0.25, k)
    b.rotation.z = THREE.MathUtils.lerp(b.rotation.z, -0.12 + px * 0.06, k)
    g.position.y = THREE.MathUtils.lerp(g.position.y, p * 1.6, k)
  })

  const bx = narrow ? 0 : Math.min(viewport.width * 0.22, 2.4)
  const by = narrow ? 0.96 : -0.25
  const bs = narrow ? 0.5 : 1

  return (
    <group ref={group}>
      <group position={[bx, by, 0]} scale={bs}>
        <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.6}>
          <group ref={bottle} position={[0, -0.6, 0]}>
            <PolishBottle mobile={mobile} />
          </group>
        </Float>
      </group>
      {/* Cintas de seda en diagonal, como los trazos de la K */}
      <group position={narrow ? [0, by + 0.1, -1.1] : [bx + 1.7, by - 0.1, -1.1]} rotation={[0.1, 0, -0.42]}>
        <SilkRibbon reduced={reduced} width={narrow ? 5.5 : 7.5} height={narrow ? 0.6 : 0.95} />
      </group>
      <group position={narrow ? [0, by - 0.5, -1.8] : [bx + 1.5, by - 0.8, -1.8]} rotation={[0.2, 0.1, -0.42]}>
        <SilkRibbon reduced={reduced} width={narrow ? 6 : 9} height={narrow ? 0.14 : 0.22} color={COPPER} phase={1.7} speed={0.8} amp={0.4} metal={0.55} />
      </group>
      <Petals count={mobile ? 18 : 46} reduced={reduced} />
      {!reduced && <Sparkles count={mobile ? 18 : 40} scale={[10, 6, 3]} size={mobile ? 2.5 : 3.5} speed={0.25} opacity={0.7} color={SAND} />}
    </group>
  )
}

export default function HeroScene({ reduced, mobile, active }: SceneProps & { active: boolean }) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.4] : [1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active && !reduced ? 'always' : 'demand'}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff2e0" />
      <pointLight position={[-3, -1, 2]} intensity={8} color={COPPER} />
      <spotLight position={[0, 4, -4]} intensity={20} angle={0.6} penumbra={1} color="#d9f0ee" />
      <Suspense fallback={null}>
        <Rig reduced={reduced} mobile={mobile} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.2} position={[0, 5, -2]} scale={[10, 3, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.4} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#ffe9d6" />
          <Lightformer form="rect" intensity={1.2} position={[5, 0, 0]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color="#cfe8e6" />
          <Lightformer form="ring" intensity={1.5} position={[0, 0, 6]} scale={3} color={SAND} />
        </Environment>
      </Suspense>
    </Canvas>
  )
}
