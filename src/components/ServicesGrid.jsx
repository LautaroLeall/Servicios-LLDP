import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Calculator
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { buildWhatsAppUrl } from '../data/servicesData';
import ServiceMockup from './ServiceMockup';
import '../styles/servicesGrid.css';

const categories = ['all', 'web', 'systems', 'consulting'];

const ServicesGrid = ({ services = [], onSelectService, onStartQuoteWithService }) => {
    const [filter, setFilter] = useState('all');
    const { t, language } = useLanguage();
    const isEs = language === 'es';

    const categoryLabels = {
        all: t('services.categories.all'),
        web: t('services.categories.web'),
        systems: t('services.categories.systems'),
        consulting: t('services.categories.consulting')
    };

    const counts = {
        all: services.length,
        web: services.filter((s) => s.category === 'web').length,
        systems: services.filter((s) => s.category === 'systems').length,
        consulting: services.filter((s) => s.category === 'consulting').length
    };

    const filteredServices = services.filter((srv) =>
        filter === 'all' ? true : srv.category === filter
    );

    const handleCardMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    const getBentoSpanClass = (index) => {
        if (filter !== 'all') return 'bento-span-6';
        const pattern = [
            'bento-span-7', // 01 Páginas Web
            'bento-span-5', // 02 Sistemas de Gestión
            'bento-span-5', // 03 Tienda Online
            'bento-span-7', // 04 Invitaciones Digitales
            'bento-span-6', // 05 Mejora de tu Web
            'bento-span-6'  // 06 Revisión de Presupuesto
        ];
        return pattern[index % pattern.length];
    };

    return (
        <div className="studio-bento-section container py-5">
            {/* Studio Section Header */}
            <div className="bento-header-row">
                <div className="studio-section-header mb-0">
                    <h2 className="studio-section-title">
                        {isEs ? (
                            <>
                                TODOS MIS <span className="studio-gradient-text">SERVICIOS</span>
                            </>
                        ) : (
                            <>
                                ALL MY <span className="studio-gradient-text">SERVICES</span>
                            </>
                        )}
                    </h2>
                    <p className="studio-section-subtitle">{t('services.subtitle')}</p>
                </div>

                {/* Single-Line Filter Tabs */}
                <div className="studio-bento-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            className={`studio-filter-pill ${filter === cat ? 'active' : ''}`}
                        >
                            <span>{categoryLabels[cat]}</span>
                            <span className="filter-pill-count">{counts[cat]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Asymmetric Bento Grid */}
            <motion.div layout className="studio-bento-grid">
                <AnimatePresence mode="popLayout">
                    {filteredServices.map((srv, index) => {
                        const waUrl = buildWhatsAppUrl(srv.whatsappMessage);
                        const spanClass = getBentoSpanClass(index);

                        return (
                            <motion.article
                                layout
                                key={srv.id}
                                className={`spotlight-card studio-bento-card ${spanClass}`}
                                style={{
                                    '--srv-accent': srv.accentColor,
                                    '--spotlight-color': `${srv.accentColor}22`
                                }}
                                onMouseMove={handleCardMouseMove}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                {/* Single-Line Top Meta Strip */}
                                <div className="bento-card-topbar">
                                    <div className="bento-num-group">
                                        <span className="bento-num-badge">{srv.number}</span>
                                        <span className="bento-category-chip">{srv.shortTitle}</span>
                                    </div>
                                    <span className="bento-seal-tag">
                                        <Sparkles size={11} />
                                        <span>{srv.badge}</span>
                                    </span>
                                </div>

                                {/* Concise Single-Line Headline & Subtitle */}
                                <div className="bento-card-head">
                                    <h3
                                        className="bento-main-title"
                                        onClick={() => onSelectService(srv)}
                                    >
                                        {srv.title}
                                    </h3>
                                    <p className="bento-subtitle-text">{srv.subtitle}</p>
                                </div>

                                {/* Interactive Mockup Stage */}
                                <div
                                    className="bento-mockup-container"
                                    onClick={() => onSelectService(srv)}
                                >
                                    <ServiceMockup
                                        serviceId={srv.id}
                                        lang={language}
                                        variant="card"
                                    />
                                </div>

                                {/* Single-Line Features Checklist */}
                                <div className="bento-features-box">
                                    <ul className="bento-features-grid">
                                        {srv.features.map((feat, i) => (
                                            <li key={i} className="bento-feature-item">
                                                <CheckCircle2 size={13} className="bento-feat-icon" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card Bottom Actions: Compact Quote + Icon-Only Expand & WhatsApp */}
                                <div className="bento-card-actions">
                                    <button
                                        type="button"
                                        className="bento-btn-quote"
                                        onClick={() => {
                                            if (onStartQuoteWithService) {
                                                onStartQuoteWithService(srv.id);
                                            }
                                        }}
                                    >
                                        <Calculator size={15} />
                                        <span>{srv.ctaText}</span>
                                        <ArrowRight size={14} />
                                    </button>

                                    <div className="bento-secondary-btns">
                                        <button
                                            type="button"
                                            className="bento-btn-icon"
                                            onClick={() => onSelectService(srv)}
                                            title={t('services.viewDetails')}
                                            aria-label={t('services.viewDetails')}
                                        >
                                            <Eye size={17} />
                                        </button>

                                        <a
                                            href={waUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bento-btn-icon wa"
                                            title="WhatsApp Directo"
                                            aria-label="WhatsApp Directo"
                                        >
                                            <FaWhatsapp size={17} />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ServicesGrid;
