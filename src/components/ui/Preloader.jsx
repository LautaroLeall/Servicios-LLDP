// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
    return (
        <motion.div
            className="preloader-backdrop"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
            aria-label="Cargando experiencia de LLDP Studio"
        >
            {/* 3D Gyroscope Stage */}
            <div className="gyro-stage">
                <div className="gyro-ambient-glow" />
                <div className="gyro-ring ring-cyan" />
                <div className="gyro-ring ring-indigo" />
                <div className="gyro-ring ring-emerald" />

                <div className="gyro-emblem-core">
                    <img
                        src="/Logo_LLDP.png"
                        alt="LLDP Studio"
                        width={40}
                        height={40}
                        className="gyro-emblem-img"
                    />
                </div>
            </div>

            {/* Studio Branding & Professional Specialty */}
            <div className="preloader-meta">
                <span className="preloader-title">LAUTARO LEAL DEL PRETE</span>
                <div className="preloader-subtitle-track">
                    <span>DESARROLLO WEB</span>
                    <span className="preloader-star">✦</span>
                    <span>SISTEMAS A MEDIDA</span>
                </div>

                {/* High-Tech Laser Progress Bar */}
                <div className="gyro-laser-track">
                    <div className="gyro-laser-beam" />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
