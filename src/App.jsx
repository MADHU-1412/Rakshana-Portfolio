import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Stars, Float, Environment, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import './index.css';

const InteractiveCursor = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const x = (state.pointer.x * state.viewport.width) / 2;
    const y = (state.pointer.y * state.viewport.height) / 2;
    
    if (meshRef.current) {
        meshRef.current.position.x += (x - meshRef.current.position.x) * 0.15;
        meshRef.current.position.y += (y - meshRef.current.position.y) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      <sphereGeometry args={[0.4, 64, 64]} />
      <MeshDistortMaterial 
        color="#FFD700" 
        emissive="#DAA520" 
        emissiveIntensity={0.5} 
        clearcoat={1} 
        clearcoatRoughness={0.1} 
        metalness={1} 
        roughness={0.15}
        distort={1}
        speed={4}
      />
    </mesh>
  );
};

const FinanceModels = () => {
  const scroll = useScroll();
  const groupRef = useRef();

  const coinRef1 = useRef();
  const coinRef2 = useRef();
  const barChartRef = useRef();
  const ledgerRef = useRef();

  useFrame((state) => {
    const offset = scroll.offset; 
    
    // Smoothly rotate and move the entire group based on scroll depth
    groupRef.current.rotation.y = offset * Math.PI * 2;
    groupRef.current.position.y = offset * 12; // Move it up as we scroll down
    groupRef.current.position.z = -offset * 5; // Push it back
    
    // Continuous idle animations
    const time = state.clock.getElapsedTime();
    
    // Coins spinning
    if (coinRef1.current) coinRef1.current.rotation.y = time * 0.8;
    if (coinRef2.current) coinRef2.current.rotation.y = time * 0.6;
    if (coinRef1.current) coinRef1.current.rotation.z = time * 0.2;
    
    // Bar chart rising/pulsing effect
    if (barChartRef.current) barChartRef.current.position.y = Math.sin(time) * 0.2 - 10;
    
    // Ledger floating
    if (ledgerRef.current) {
        ledgerRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + (Math.PI / 6);
        ledgerRef.current.rotation.y = Math.cos(time * 0.3) * 0.2 + (Math.PI / 4);
    }
  });

  return (
    <group ref={groupRef}>
      {/* GOLD COIN 1 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={coinRef1} position={[4, 1, -2]} scale={1.2}>
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
        </mesh>
      </Float>

      {/* GOLD COIN 2 */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh ref={coinRef2} position={[-5, -4, -4]} scale={0.8} rotation={[Math.PI/4, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial color="#FFA500" metalness={1} roughness={0.3} />
        </mesh>
      </Float>

      {/* 3D BAR CHART */}
      <group ref={barChartRef} position={[3, -10, -4]}>
        {/* Base */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[4, 0.2, 2]} />
          <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Bars */}
        <mesh position={[-1.2, 0.5, 0]}>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#ff3366" />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.8, 3, 0.8]} />
          <meshStandardMaterial color="#9b51e0" />
        </mesh>
        <mesh position={[1.2, 1.8, 0]}>
          <boxGeometry args={[0.8, 4.6, 0.8]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* LEDGER / SPREADSHEET */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={ledgerRef} position={[-4, -16, -3]} scale={1.5}>
            {/* Paper */}
            <mesh>
                <boxGeometry args={[3, 4, 0.1]} />
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
            {/* Header Line */}
            <mesh position={[0, 1.5, 0.06]}>
                <boxGeometry args={[2.5, 0.2, 0.05]} />
                <meshStandardMaterial color="#9b51e0" />
            </mesh>
            {/* Data Lines */}
            <mesh position={[0, 0.8, 0.06]}>
                <boxGeometry args={[2.5, 0.1, 0.05]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, 0.4, 0.06]}>
                <boxGeometry args={[2.5, 0.1, 0.05]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, 0.0, 0.06]}>
                <boxGeometry args={[2.5, 0.1, 0.05]} />
                <meshStandardMaterial color="#ff3366" />
            </mesh>
            <mesh position={[0, -0.4, 0.06]}>
                <boxGeometry args={[2.5, 0.1, 0.05]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>
        </group>
      </Float>
    </group>
  );
};

const HtmlContent = () => {
  return (
    <div className="html-scroll-container">
      {/* PAGE 1: HERO */}
      <section style={{ height: '100vh' }}>
        <div className="glass-panel" style={{ maxWidth: '850px' }}>
          <h1 className="title">C. Rakshana</h1>
          <h2 className="subtitle">Finance & Accounting Specialist</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#e0e0e0' }}>
            To obtain a responsible position in a reputable organization where I can contribute to financial accuracy, 
            reporting efficiency, and streamlined operations by leveraging my proficiency in Tally Prime and MS Excel, 
            while continuously enhancing my expertise in accounting systems and financial management.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <span className="tag">Fluent in English & Tamil</span>
          </div>
        </div>
      </section>

      {/* PAGE 2: EDUCATION & SKILLS */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '10vh' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '1000px', marginLeft: 'auto' }}>
          <h2 className="section-heading">Education & Skills</h2>
          <div className="grid-2">
            <div>
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h3>B.Com (Accounting and Finance)</h3>
                <h4>Madras Christian College (MCC) | Present</h4>
              </div>
              <div className="card">
                <h3>Secondary Education</h3>
                <h4>Sri.S.B.C Vivekananda Vidyalaya Hr. Sec School | 06/2021</h4>
              </div>
            </div>
            <div>
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ color: '#00ffff' }}>Technical Arsenal</h3>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap' }}>
                  <span className="tag">Tally Prime (GST & ERP 9)</span>
                  <span className="tag">MS Office & MS Excel</span>
                  <span className="tag">Data Analysis (Beginner)</span>
                  <span className="tag">Power BI (Beginner)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3: EXPERIENCE */}
      <section style={{ height: '100vh', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '1100px' }}>
          <h2 className="section-heading" style={{ color: '#ff3366' }}>Professional Experience</h2>
          <div className="grid-2">
            <div className="card">
              <h3>Bharat Heavy Electricals Pvt Ltd</h3>
              <h4>Finance and Accounts | Pallikaranai, Chennai | 12/2025 – 01/2026</h4>
              <p>Coordinated with senior accountants to ensure accuracy, compliance, PF works and confidentiality of financial records. Gained experience in managing sensitive data with strict precision.</p>
            </div>
            <div className="card">
              <h3>KS Educational Institution Pvt Ltd</h3>
              <h4>Accounting and Finance | West Mambalam, Chennai | 05/2024 – 06/2024</h4>
              <p>Prepared comprehensive financial reports using MS Excel. Handled day-to-day operations and gained practical exposure to core accounting standards and frameworks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4: PROJECT & CONTACT */}
      <section style={{ height: '100vh', alignItems: 'center', textAlign: 'center' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="section-heading" style={{ color: '#9b51e0' }}>Key Project</h2>
          <div className="card" style={{ width: '100%', marginBottom: '3.5rem', textAlign: 'left', background: 'rgba(155, 81, 224, 0.1)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Credit Behaviour Study</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}><strong style={{ color: '#fff' }}>Topic:</strong> A study on credit behaviour difference between EMI users and lumpsum payers.</p>
            <p style={{ fontSize: '1.1rem' }}><strong style={{ color: '#fff' }}>Impact:</strong> Provides deep analytical insights into consumer spending habits, risk assessment profiling, and financial planning patterns.</p>
          </div>

          <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Let's Connect</h2>
          <div className="contact-buttons-container">
            <a href="mailto:booksofjournals2512@gmail.com" className="btn-contact">
                <Mail className="icon" />
                <span>Email Me</span>
            </a>
            <a href="tel:7604828280" className="btn-contact">
                <Phone className="icon" />
                <span>+91 7604828280</span>
            </a>
            <a href="https://linkedin.com/in/rakshana-c-814a51352" target="_blank" rel="noreferrer" className="btn-contact linkedin-btn">
                <Linkedin className="icon" />
                <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, 5, 5]} intensity={1} color="#FFD700" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#9b51e0" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
          <Sparkles count={200} scale={25} size={3} speed={0.5} color="#FFD700" />
          
          <Environment preset="city" />
          <InteractiveCursor />
          
          <ScrollControls pages={4} damping={0.25}>
            <FinanceModels />
            <Scroll html style={{ width: '100%' }}>
              <HtmlContent />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
