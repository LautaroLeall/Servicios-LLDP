import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Sparkles,
    ArrowUpRight,
    CheckCircle2,
    Briefcase,
    Lock
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { useModal } from '../hooks/useModal';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/servicesData';
import ServiceMockup from './ServiceMockup';
import '../styles/serviceDetailModal.css';

const ServiceDetailModal = ({ service, onClose }) => {
    const { language } = useLanguage();
    const isEs = language === 'es';
    const { openModal, closeModal } = useModal();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        openModal();
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            closeModal();
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [openModal, closeModal, onClose]);

    if (!service || typeof document === 'undefined') return null;

    const handleModalScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const total = scrollHeight - clientHeight;
        if (total > 0) {
            setScrollProgress((scrollTop / total) * 100);
        }
    };

    return createPortal(
        <AnimatePresence>
            <div className="service-detail-backdrop" role="dialog" aria-modal="true">
                <motion.div
                    className="service-detail-modal"
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Synchronized Scroll Progress Bar */}
                    <div
                        className="modal-scroll-progress-bar"
                        style={{ width: `${scrollProgress}%` }}
                    />

                    {/* Top Modal Header Bar — SOLO EL TÍTULO DEL SERVICIO */}
                    <div className="modal-header-bar">
                        <h4 className="modal-service-title m-0">{service.shortTitle}</h4>

                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={onClose}
                            aria-label={isEs ? 'Cerrar' : 'Close'}
                            title={isEs ? 'Cerrar' : 'Close'}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Scrollable Modal Body */}
                    <div className="modal-body-scrollable" onScroll={handleModalScroll}>
                        {/* Interactive Browser Sandbox Mockup Stage */}
                        <div className="modal-mockup-sandbox mb-4">
                            <div className="sandbox-browser-bar">
                                <div className="browser-traffic-lights">
                                    <span className="traffic-dot dot-red" onClick={onClose} />
                                    <span className="traffic-dot dot-yellow" />
                                    <span
                                        className="traffic-dot dot-green"
                                        onClick={() =>
                                            window.open(
                                                buildWhatsAppUrl(service.whatsappMessage),
                                                '_blank'
                                            )
                                        }
                                    />
                                </div>

                                <div className="browser-url-bar">
                                    <Lock size={12} className="text-success shrink-0" />
                                    <span className="browser-url-text">
                                        /servicios/{service.id}
                                    </span>
                                </div>
                            </div>

                            <div className="sandbox-mockup-body">
                                <ServiceMockup
                                    serviceId={service.id}
                                    service={service}
                                    lang={language}
                                    variant="modal"
                                />
                            </div>
                        </div>

                        {/* Unboxed Editorial Dossier */}
                        <div className="service-editorial-dossier">
                            <div className="editorial-overview-header">
                                <div className="detail-editorial-eyebrow mb-2">
                                    <span className="eyebrow-line" />
                                    <span>{service.header}</span>
                                </div>
                                <h3 className="editorial-overview-title mb-2">{service.title}</h3>
                                <p className="editorial-overview-subtitle mb-3">{service.subtitle}</p>
                                <p className="editorial-overview-desc">{service.longDescription}</p>
                            </div>

                            <div className="editorial-content-divider" />

                            <div className="detail-editorial-columns">
                                {/* Left Column: Numbered Features & Deliverables */}
                                <div className="editorial-col-features">
                                    <div className="editorial-col-header mb-3">
                                        <Sparkles size={16} className="text-primary me-2" />
                                        <h5 className="editorial-col-title m-0">{service.featuresTitle}</h5>
                                    </div>

                                    <div className="editorial-features-stream">
                                        {service.features.map((feat, idx) => (
                                            <div key={idx} className="editorial-feature-row">
                                                <span className="feature-number">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <span className="feature-text">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Deliverables Chips */}
                                    {service.deliverables && service.deliverables.length > 0 && (
                                        <div className="mt-4">
                                            <div className="editorial-col-header mb-3">
                                                <CheckCircle2 size={16} className="text-primary me-2" />
                                                <h5 className="editorial-col-title m-0">
                                                    {isEs ? 'Qué Incluye / Entregables' : 'What’s Included'}
                                                </h5>
                                            </div>
                                            <div className="editorial-tech-cluster">
                                                {service.deliverables.map((deliv, i) => (
                                                    <span key={i} className="editorial-tech-tag">
                                                        <CheckCircle2 size={13} className="text-info" />
                                                        <span>{deliv}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Descriptive Live Examples & Service Specs */}
                                <div className="editorial-col-meta">
                                    {service.relatedProjects && service.relatedProjects.length > 0 && (
                                        <div className="mb-4">
                                            <div className="editorial-col-header mb-3">
                                                <Briefcase size={16} className="text-primary me-2" />
                                                <h5 className="editorial-col-title m-0">
                                                    {isEs ? 'Ejemplos Reales en Vivo' : 'Live Real Examples'}
                                                </h5>
                                            </div>
                                            <div className="related-projects-list">
                                                {service.relatedProjects.map((proj, pIdx) => (
                                                    <a
                                                        key={pIdx}
                                                        href={proj.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="related-project-card"
                                                    >
                                                        <div className="rel-proj-top">
                                                            <div className="rel-proj-title-group">
                                                                <span className="rel-proj-name">
                                                                    {proj.name}
                                                                </span>
                                                                {proj.tag && (
                                                                    <span className="rel-proj-tag">
                                                                        {proj.tag}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <ArrowUpRight
                                                                size={15}
                                                                className="rel-proj-arrow"
                                                            />
                                                        </div>
                                                        {proj.desc && (
                                                            <p className="rel-proj-desc">{proj.desc}</p>
                                                        )}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="editorial-specs-list">
                                        <div className="editorial-spec-row">
                                            <span className="spec-label">
                                                {isEs ? 'Desarrollo' : 'Developer'}
                                            </span>
                                            <span className="spec-value">Lautaro Leal Del Prete</span>
                                        </div>
                                        <div className="editorial-spec-row">
                                            <span className="spec-label">WhatsApp</span>
                                            <span className="spec-value live-spec">
                                                <span className="spec-live-dot" />
                                                {CONTACT_INFO.whatsappDisplay}
                                            </span>
                                        </div>
                                        <div className="editorial-spec-row">
                                            <span className="spec-label">
                                                {isEs ? 'Portafolio' : 'Portfolio'}
                                            </span>
                                            <a
                                                href={CONTACT_INFO.portfolioUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="spec-link-value"
                                            >
                                                <span>{CONTACT_INFO.portfolioDisplay}</span>
                                                <ArrowUpRight size={13} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Dock */}
                            <div className="editorial-actions-dock">
                                <a
                                    href={buildWhatsAppUrl(service.whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-editorial-action btn-editorial-demo"
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <FaWhatsapp size={19} />
                                        <span>{service.ctaText}</span>
                                    </div>
                                    <ArrowUpRight size={18} className="btn-arrow-icon" />
                                </a>

                                <a
                                    href={CONTACT_INFO.portfolioUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-editorial-action btn-editorial-code"
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <Briefcase size={17} />
                                        <span>{isEs ? 'Ver Portafolio' : 'View Portfolio'}</span>
                                    </div>
                                    <ArrowUpRight size={18} className="btn-arrow-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default ServiceDetailModal;
