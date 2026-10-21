import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Maximize2,
    Calculator,
    CheckCircle2
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { buildWhatsAppUrl } from '../data/servicesData';
import ServiceMockup from './ServiceMockup';
import '../styles/servicesCarousel.css';

const SHORT_TAB_NAMES = {
    'paginas-web': { es: 'Páginas Web', en: 'Websites' },
    'sistemas-gestion': { es: 'Sistemas', en: 'Systems' },
    'tienda-online': { es: 'Tienda Online', en: 'Online Store' },
    'invitaciones-digitales': { es: 'Invitaciones', en: 'Invitations' },
    'mejora-web': { es: 'Mejora Web', en: 'Web Upgrade' },
    'revision-presupuesto': { es: 'Presupuesto', en: 'Quote Audit' }
};

const ServicesCarousel = ({
    services = [],
    activeIndex = 0,
    onChangeIndex,
    onOpenDetail,
    onStartQuoteWithService
}) => {
    const { language } = useLanguage();
    const isEs = language === 'es';
    const [internalIndex, setInternalIndex] = useState(0);

    const currentIndex = onChangeIndex ? activeIndex : internalIndex;
    const setIndex = onChangeIndex || setInternalIndex;

    if (!services.length) return null;

    const currentService = services[currentIndex] || services[0];

    const handlePrev = () => {
        setIndex((currentIndex - 1 + services.length) % services.length);
    };

    const handleNext = () => {
        setIndex((currentIndex + 1) % services.length);
    };

    return (
        <div className="studio-explorer-section container py-5">
            {/* Studio Header */}
            <div className="explorer-header-row mb-4">
                <div className="studio-section-header mb-0">
                    <h2 className="studio-section-title">
                        {isEs ? (
                            <>
                                Deslizá cada <span className="studio-gradient-text">servicio →</span>
                            </>
                        ) : (
                            <>
                                Explore each <span className="studio-gradient-text">service →</span>
                            </>
                        )}
                    </h2>
                    <p className="studio-section-subtitle">
                        {isEs
                            ? 'Probá los mockups en vivo y revisá qué incluye cada propuesta.'
                            : 'Test the live mockups and inspect what each proposal includes.'}
                    </p>
                </div>

                {/* Slide Controls */}
                <div className="explorer-nav-controls">
                    <button
                        type="button"
                        className="explorer-arrow-btn"
                        onClick={handlePrev}
                        aria-label={isEs ? 'Anterior' : 'Previous'}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="explorer-counter-pill">
                        <strong>{currentService.number}</strong> / 0{services.length}
                    </span>
                    <button
                        type="button"
                        className="explorer-arrow-btn"
                        onClick={handleNext}
                        aria-label={isEs ? 'Siguiente' : 'Next'}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Single-Line Numbered Tab Strip */}
            <div className="explorer-thumbs-grid mb-4">
                {services.map((srv, idx) => {
                    const isActive = idx === currentIndex;
                    const shortTab =
                        SHORT_TAB_NAMES[srv.id]?.[isEs ? 'es' : 'en'] || srv.shortTitle;
                    return (
                        <button
                            key={srv.id}
                            type="button"
                            className={`explorer-thumb-card ${isActive ? 'active' : ''}`}
                            onClick={() => setIndex(idx)}
                            style={{ '--thumb-accent': srv.accentColor }}
                        >
                            <span className="thumb-number">{srv.number}</span>
                            <span className="thumb-title">{shortTab}</span>
                        </button>
                    );
                })}
            </div>

            {/* Active Slide Workbench Stage */}
            <div
                className="spotlight-card explorer-stage-frame"
                style={{ '--stage-accent': currentService.accentColor }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentService.id}
                        className="explorer-slide-grid"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Left Column: Live Interactive Mockup + Icon-Only Expand Button */}
                        <div className="explorer-slide-visual">
                            <ServiceMockup
                                serviceId={currentService.id}
                                lang={language}
                                variant="carousel"
                            />
                            <button
                                type="button"
                                className="explorer-expand-icon-btn"
                                onClick={() => onOpenDetail && onOpenDetail(currentService)}
                                title={isEs ? 'Ampliar vista' : 'Expand view'}
                                aria-label={isEs ? 'Ampliar vista' : 'Expand view'}
                            >
                                <Maximize2 size={15} />
                            </button>
                        </div>

                        {/* Right Column: Concise Information */}
                        <div className="explorer-slide-info">
                            <div>
                                <div className="slide-top-badges">
                                    <span className="slide-number-pill">
                                        {currentService.number} • {currentService.shortTitle}
                                    </span>
                                    <span className="slide-seal-pill">
                                        <Sparkles size={11} />
                                        {currentService.badge}
                                    </span>
                                </div>

                                <h3 className="slide-main-title">{currentService.title}</h3>
                                <p className="slide-subtitle">{currentService.subtitle}</p>

                                <div className="slide-features-block">
                                    <div className="slide-features-heading">
                                        {currentService.featuresTitle}
                                    </div>
                                    <div className="slide-features-grid">
                                        {currentService.features.map((feat, i) => (
                                            <div key={i} className="slide-feature-chip">
                                                <CheckCircle2 size={14} className="chip-check-icon" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {currentService.specialties && (
                                    <div className="slide-specialties-row">
                                        {currentService.specialties.map((sp, idx) => (
                                            <span key={idx} className="slide-spec-pill">
                                                {sp}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Compact Single-Line Footer Actions */}
                            <div className="slide-footer-bar">
                                <button
                                    type="button"
                                    className="slide-btn-wizard"
                                    onClick={() =>
                                        onStartQuoteWithService &&
                                        onStartQuoteWithService(currentService.id)
                                    }
                                >
                                    <Calculator size={15} />
                                    <span>{isEs ? 'Cotizar' : 'Quote'}</span>
                                </button>

                                <a
                                    href={buildWhatsAppUrl(currentService.whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="slide-whatsapp-cta"
                                >
                                    <FaWhatsapp size={17} />
                                    <span>WhatsApp</span>
                                </a>

                                <button
                                    type="button"
                                    className="slide-icon-only-btn"
                                    onClick={() => onOpenDetail && onOpenDetail(currentService)}
                                    title={isEs ? 'Ver detalle completo' : 'Full details'}
                                    aria-label="Detalle"
                                >
                                    <Maximize2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ServicesCarousel;
