import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    CheckCircle2,
    Zap
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/servicesData';
import ServiceMockup from './ServiceMockup';
import '../styles/home.css';

const SHORT_CHIP_NAMES = {
    'paginas-web': { es: 'Páginas Web', en: 'Websites' },
    'sistemas-gestion': { es: 'Sistemas', en: 'Systems' },
    'tienda-online': { es: 'Tienda Online', en: 'Online Store' },
    'invitaciones-digitales': { es: 'Invitaciones', en: 'Invitations' },
    'mejora-web': { es: 'Mejora Web', en: 'Web Upgrade' },
    'revision-presupuesto': { es: 'Presupuestos', en: 'Quote Audit' }
};

const Home = ({ services = [], onSelectService, onStartQuoteWithService }) => {
    const { language } = useLanguage();
    const isEs = language === 'es';
    const [activeDeckIndex, setActiveDeckIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || !services.length) return;
        const timer = setInterval(() => {
            setActiveDeckIndex((prev) => (prev + 1) % services.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isPaused, services.length]);

    const currentService = services[activeDeckIndex] || services[0];
    const nextService = services[(activeDeckIndex + 1) % (services.length || 1)];
    const thirdService = services[(activeDeckIndex + 2) % (services.length || 1)];

    const handlePrevCard = () => {
        setActiveDeckIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const handleNextCard = () => {
        setActiveDeckIndex((prev) => (prev + 1) % services.length);
    };

    const defaultWaUrl = buildWhatsAppUrl(
        isEs
            ? '¡Hola Lautaro! Vi tu página de Servicios Web y me gustaría cotizar un proyecto.'
            : 'Hi Lautaro! I saw your Web Services page and would like to get a quote.'
    );

    const tickerItems = isEs
        ? [
            '01 PÁGINAS WEB 24/7',
            '02 SISTEMAS DE GESTIÓN',
            '03 TIENDA ONLINE',
            '04 INVITACIONES DIGITALES',
            '05 MEJORA DE TU WEB',
            '06 REVISIÓN DE PRESUPUESTO'
        ]
        : [
            '01 WEBSITES 24/7',
            '02 MANAGEMENT SYSTEMS',
            '03 ONLINE STORES',
            '04 DIGITAL INVITATIONS',
            '05 WEBSITE UPGRADE',
            '06 QUOTE REVIEW'
        ];

    return (
        <div className="studio-hero-wrapper">
            <div className="container studio-hero-container">
                <div className="studio-hero-grid">
                    {/* LEFT COLUMN: VALUE PROPOSITION & SERVICE SELECTOR */}
                    <motion.div
                        className="studio-hero-left"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Single-line Official Eyebrow */}
                        <div className="hero-eyebrow-pill">
                            <span className="eyebrow-live-dot" />
                            <span>
                                LAUTARO LEAL DEL PRETE • {isEs ? 'DESARROLLO WEB' : 'WEB STUDIO'}
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="studio-hero-title">
                            {isEs ? (
                                <>
                                    Tu proyecto web,{' '}
                                    <span className="studio-gradient-text">hecho realidad.</span>
                                </>
                            ) : (
                                <>
                                    Your web project,{' '}
                                    <span className="studio-gradient-text">brought to life.</span>
                                </>
                            )}
                        </h1>

                        {/* Concise Lead Copy */}
                        <p className="studio-hero-lead">
                            {isEs
                                ? 'Soluciones digitales a medida para vender más, ordenar tu negocio o destacar tu evento.'
                                : 'Custom digital solutions built to sell more, organize your business, or highlight your event.'}
                        </p>

                        {/* Interactive 01-06 Service Pills (Single-line labels) */}
                        <div className="hero-service-selector-grid">
                            {services.map((srv, idx) => {
                                const isActive = idx === activeDeckIndex;
                                const shortLabel =
                                    SHORT_CHIP_NAMES[srv.id]?.[isEs ? 'es' : 'en'] ||
                                    srv.shortTitle;
                                return (
                                    <button
                                        key={srv.id}
                                        type="button"
                                        className={`hero-srv-chip ${isActive ? 'active' : ''}`}
                                        style={{ '--chip-accent': srv.accentColor }}
                                        onClick={() => setActiveDeckIndex(idx)}
                                    >
                                        <span className="chip-num">{srv.number}</span>
                                        <span className="chip-label">{shortLabel}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Compact Single-line CTAs */}
                        <div className="studio-hero-cta-group">
                            <button
                                type="button"
                                className="btn-studio-primary"
                                onClick={() => {
                                    if (onStartQuoteWithService && currentService) {
                                        onStartQuoteWithService(currentService.id);
                                    } else {
                                        document
                                            .getElementById('contact')
                                            ?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                <Sparkles size={16} />
                                <span>{isEs ? 'Cotizar ahora' : 'Get a Quote'}</span>
                                <ArrowRight size={16} />
                            </button>

                            <a
                                href={defaultWaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-studio-whatsapp"
                                title={CONTACT_INFO.whatsappDisplay}
                            >
                                <FaWhatsapp size={18} />
                                <span>WhatsApp</span>
                            </a>
                        </div>

                        {/* Concise Single-Line Trust Strip */}
                        <div className="hero-trust-strip">
                            <div className="trust-item">
                                <CheckCircle2 size={14} className="trust-icon" />
                                <span>{isEs ? 'Trato 1 a 1' : '1-on-1 Direct'}</span>
                            </div>
                            <div className="trust-divider" />
                            <div className="trust-item">
                                <Zap size={14} className="trust-icon" />
                                <span>100% Responsive</span>
                            </div>
                            <div className="trust-divider" />
                            <a
                                href={CONTACT_INFO.portfolioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="trust-portfolio-link"
                            >
                                <span>{CONTACT_INFO.portfolioDisplay}</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: 3D INTERACTIVE FLYER DECK */}
                    <motion.div
                        className="studio-hero-right"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {currentService && (
                            <div className="hero-deck-stage">
                                {thirdService && (
                                    <div
                                        className="deck-card-layer layer-back-2"
                                        style={{ '--deck-accent': thirdService.accentColor }}
                                    />
                                )}

                                {nextService && (
                                    <div
                                        className="deck-card-layer layer-back-1"
                                        style={{ '--deck-accent': nextService.accentColor }}
                                    >
                                        <div className="layer-peek-header">
                                            <span className="peek-num">{nextService.number}</span>
                                            <span className="peek-title">{nextService.shortTitle}</span>
                                        </div>
                                    </div>
                                )}

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentService.id}
                                        className="deck-active-card"
                                        style={{ '--deck-accent': currentService.accentColor }}
                                        initial={{ opacity: 0, y: 18, rotateX: 4 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -18, rotateX: -4 }}
                                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {/* Single-Line Top Bar */}
                                        <div className="deck-card-topbar">
                                            <div className="deck-flyer-meta">
                                                <span className="deck-flyer-number">
                                                    {currentService.number}
                                                </span>
                                                <span className="deck-flyer-kicker">
                                                    {currentService.shortTitle}
                                                </span>
                                            </div>
                                            <span className="deck-flyer-seal">
                                                {currentService.badge}
                                            </span>
                                        </div>

                                        {/* Concise Card Headline */}
                                        <div className="deck-card-heading">
                                            <h2 className="deck-service-title">
                                                {currentService.title}
                                            </h2>
                                        </div>

                                        {/* Interactive Mockup Inside Hero Deck */}
                                        <div className="deck-mockup-viewport">
                                            <ServiceMockup
                                                serviceId={currentService.id}
                                                lang={language}
                                                variant="card"
                                            />
                                        </div>

                                        {/* Compact Single-Line Footer Controls (Icon Buttons + Short Quote) */}
                                        <div className="deck-card-footer">
                                            <div className="deck-nav-controls">
                                                <button
                                                    type="button"
                                                    className="deck-arrow-btn"
                                                    onClick={handlePrevCard}
                                                    aria-label="Anterior"
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <span className="deck-counter-badge">
                                                    {currentService.number} / 0{services.length}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="deck-arrow-btn"
                                                    onClick={handleNextCard}
                                                    aria-label="Siguiente"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>

                                            <div className="deck-action-links">
                                                <button
                                                    type="button"
                                                    className="deck-icon-btn"
                                                    onClick={() =>
                                                        onSelectService &&
                                                        onSelectService(currentService)
                                                    }
                                                    title={isEs ? 'Ampliar vista' : 'Expand view'}
                                                    aria-label="Ampliar"
                                                >
                                                    <Maximize2 size={15} />
                                                </button>

                                                <a
                                                    href={buildWhatsAppUrl(
                                                        currentService.whatsappMessage
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="deck-icon-btn wa-icon"
                                                    title="WhatsApp Directo"
                                                    aria-label="WhatsApp"
                                                >
                                                    <FaWhatsapp size={16} />
                                                </a>

                                                <button
                                                    type="button"
                                                    className="deck-quote-this-btn"
                                                    onClick={() =>
                                                        onStartQuoteWithService &&
                                                        onStartQuoteWithService(currentService.id)
                                                    }
                                                >
                                                    <span>{isEs ? 'Cotizar' : 'Quote'}</span>
                                                    <ArrowRight size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* BOTTOM MARQUEE TICKER */}
            <div className="studio-marquee-bar">
                <div className="studio-marquee-track">
                    {[...tickerItems, ...tickerItems].map((item, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-star">✦</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
