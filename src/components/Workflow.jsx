import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    MessageSquare,
    Layout,
    Code2,
    Rocket,
    Zap,
    Smartphone,
    ShieldCheck,
    Sliders,
    ArrowRight
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import '../styles/workflow.css';

const stepIcons = [MessageSquare, Layout, Code2, Rocket];
const stepColors = ['#06b6d4', '#6366f1', '#10b981', '#f59e0b'];
const pillarIcons = [Zap, Smartphone, Sliders, ShieldCheck];

const Workflow = () => {
    const { t, language } = useLanguage();
    const isEs = language === 'es';
    const steps = t('workflow.steps') || [];
    const pillars = t('workflow.pillars') || [];

    return (
        <div className="studio-workflow-section container py-5">
            {/* Studio Section Header */}
            <div className="studio-section-header">
                <h2 className="studio-section-title">
                    {isEs ? (
                        <>
                            Cómo <span className="studio-gradient-text">Trabajo</span>
                        </>
                    ) : (
                        <>
                            How I <span className="studio-gradient-text">Work</span>
                        </>
                    )}
                </h2>
                <p className="studio-section-subtitle">{t('workflow.subtitle')}</p>
            </div>

            {/* 4-Step Connected Studio Process */}
            <div className="studio-process-grid mb-5">
                {steps.map((item, idx) => {
                    const IconComp = stepIcons[idx % stepIcons.length];
                    const accent = stepColors[idx % stepColors.length];
                    return (
                        <motion.div
                            key={idx}
                            className="spotlight-card studio-process-card"
                            style={{ '--step-accent': accent }}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: idx * 0.07 }}
                        >
                            <div className="process-card-top">
                                <div className="process-icon-orb">
                                    <IconComp size={19} />
                                </div>
                                <span className="process-step-tag">{item.step}</span>
                            </div>

                            <h3 className="process-step-title">{item.title}</h3>
                            <p className="process-step-desc">{item.desc}</p>

                            <div className="process-step-footer">
                                <span className="step-bar-fill" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Studio Guarantee & Pillars Banner */}
            <div className="spotlight-card studio-pillars-banner">
                <div className="pillars-banner-left">
                    <span className="pillars-kicker">
                        {isEs ? 'CALIDAD GARANTIZADA' : 'QUALITY STANDARD'}
                    </span>
                    <h3 className="pillars-banner-title">{t('workflow.pillarsTitle')}</h3>
                    <p className="pillars-banner-desc">
                        {isEs
                            ? 'Proyectos llave en mano, rápidos y optimizados para celular y PC.'
                            : 'Turnkey projects, fast and optimized for mobile and desktop.'}
                    </p>
                    <button
                        type="button"
                        className="pillars-cta-btn"
                        onClick={() =>
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        <span>{isEs ? 'Cotizar ahora' : 'Get a Quote'}</span>
                        <ArrowRight size={15} />
                    </button>
                </div>

                <div className="pillars-banner-right">
                    {pillars.map((pillar, idx) => {
                        const IconComp = pillarIcons[idx % pillarIcons.length];
                        return (
                            <div key={idx} className="studio-pillar-item">
                                <div className="pillar-mini-icon">
                                    <IconComp size={17} />
                                </div>
                                <div>
                                    <h4 className="pillar-item-title">{pillar.title}</h4>
                                    <p className="pillar-item-desc">{pillar.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Workflow;
