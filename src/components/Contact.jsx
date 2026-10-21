import { useState, useEffect, useMemo, useRef } from 'react';
import emailjs from 'emailjs-com';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    AlertCircle,
    Sparkles,
    Send,
    ArrowUpRight,
    Mail,
    Clock,
    FileText
} from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/servicesData';
import '../styles/contact.css';

const SERVICE_OPTIONS_MAP = {
    'paginas-web': {
        es: [
            'Diseño profesional',
            'Adaptado a celular y PC',
            'Identidad de mi marca',
            'Botón a WhatsApp',
            'Sección de servicios',
            'Dominio propio'
        ],
        en: [
            'Professional design',
            'Mobile & PC responsive',
            'Custom brand identity',
            'Direct WhatsApp button',
            'Services section',
            'Custom domain'
        ]
    },
    'sistemas-gestion': {
        es: [
            'Agenda de turnos',
            'Control de stock',
            'Finanzas al día',
            'Uso en celular y PC',
            'Grilla Turnos de hoy',
            'Múltiples usuarios'
        ],
        en: [
            'Appointment booking',
            'Stock control',
            'Daily finances',
            'Mobile & PC access',
            "Today's bookings grid",
            'Multi-user roles'
        ]
    },
    'tienda-online': {
        es: [
            'Carrito y pagos',
            'Panel simple',
            'Catálogo a medida',
            'Ventas desde celular',
            'Alertas de venta',
            'WhatsApp integrado'
        ],
        en: [
            'Cart & payments',
            'Simple admin panel',
            'Custom catalog',
            'Mobile sales ready',
            'Sale notifications',
            'WhatsApp integrated'
        ]
    },
    'invitaciones-digitales': {
        es: [
            'Cumple Infantil',
            '15 Años / Boda',
            'Botón ¡CONFIRMAR!',
            'Ubicación en Maps',
            'Música de fondo',
            'Regalos / Cards'
        ],
        en: [
            'Kids Birthday',
            'Sweet 15 / Wedding',
            'CONFIRM RSVP Button',
            'Google Maps Link',
            'Background Music',
            'Virtual Gifts / Cards'
        ]
    },
    'mejora-web': {
        es: [
            'Más velocidad',
            'Diseño actualizado',
            'Nuevas funciones',
            'Revisión previa',
            'Adaptar a celular',
            'Mejora SEO'
        ],
        en: [
            'Faster speed',
            'Updated design',
            'New features',
            'Prior site audit',
            'Mobile fix',
            'SEO upgrade'
        ]
    },
    'revision-presupuesto': {
        es: [
            'Qué incluye y falta',
            'Comparar opciones',
            'Ajustar presupuesto',
            'Diseño y Desarrollo',
            'Soporte y Extras',
            'Sin compromiso'
        ],
        en: [
            'Included & missing',
            'Compare options',
            'Fit my budget',
            'Design & Dev check',
            'Support & Extras',
            'No obligation'
        ]
    }
};

const TIMELINE_OPTIONS = {
    es: ['Urgente', 'Este mes', 'Sin apuro'],
    en: ['Urgent', 'This month', 'No rush']
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = ({ services = [], preselectedServiceId }) => {
    const { language } = useLanguage();
    const isEs = language === 'es';
    const emailFormRef = useRef(null);

    const [selectedServiceId, setSelectedServiceId] = useState(
        preselectedServiceId || 'paginas-web'
    );
    const [selectedExtras, setSelectedExtras] = useState([
        'Diseño profesional',
        'Botón a WhatsApp'
    ]);
    const [timeline, setTimeline] = useState(isEs ? 'Este mes' : 'This month');
    const [clientName, setClientName] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [isSending, setIsSending] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        if (preselectedServiceId) {
            setSelectedServiceId(preselectedServiceId);
            const opts =
                SERVICE_OPTIONS_MAP[preselectedServiceId]?.[isEs ? 'es' : 'en'] || [];
            setSelectedExtras(opts.slice(0, 2));
            setErrors((prev) => ({ ...prev, extras: null }));
        }
    }, [preselectedServiceId, isEs]);

    const currentService = useMemo(
        () => services.find((s) => s.id === selectedServiceId) || services[0],
        [services, selectedServiceId]
    );

    const availableExtras = useMemo(() => {
        return SERVICE_OPTIONS_MAP[selectedServiceId]?.[isEs ? 'es' : 'en'] || [];
    }, [selectedServiceId, isEs]);

    const handleServicePick = (id) => {
        setSelectedServiceId(id);
        const defaultOpts = SERVICE_OPTIONS_MAP[id]?.[isEs ? 'es' : 'en'] || [];
        setSelectedExtras(defaultOpts.slice(0, 2));
        setErrors((prev) => ({ ...prev, extras: null }));
    };

    const toggleExtra = (item) => {
        setSelectedExtras((prev) => {
            const next = prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item];
            if (next.length > 0) {
                setErrors((err) => ({ ...err, extras: null }));
            }
            return next;
        });
    };

    const generatedBrief = useMemo(() => {
        const srvName = currentService?.shortTitle || 'Proyecto Web';
        const extrasList =
            selectedExtras.length > 0
                ? selectedExtras.map((e) => `• ${e}`).join('\n')
                : isEs
                    ? '• A definir'
                    : '• To be defined';

        if (isEs) {
            return (
                `¡Hola Lautaro! Quiero cotizar:\n` +
                `📌 *Servicio:* ${srvName}\n` +
                `✨ *Incluye:*\n${extrasList}\n` +
                `⏱️ *Plazo:* ${timeline}` +
                (clientName.trim() ? `\n👤 *Nombre:* ${clientName.trim()}` : '') +
                (clientContact.trim() ? `\n✉️ *Email:* ${clientContact.trim()}` : '') +
                (notes.trim() ? `\n💬 *Idea:* ${notes.trim()}` : '')
            );
        }

        return (
            `Hi Lautaro! I want to quote:\n` +
            `📌 *Service:* ${srvName}\n` +
            `✨ *Includes:*\n${extrasList}\n` +
            `⏱️ *Timeline:* ${timeline}` +
            (clientName.trim() ? `\n👤 *Name:* ${clientName.trim()}` : '') +
            (clientContact.trim() ? `\n✉️ *Email:* ${clientContact.trim()}` : '') +
            (notes.trim() ? `\n💬 *Notes:* ${notes.trim()}` : '')
        );
    }, [currentService, selectedExtras, timeline, clientName, clientContact, notes, isEs]);

    const showToast = (text, type = 'success') => {
        setToastMessage({ text, type });
        setTimeout(() => setToastMessage(null), 4500);
    };

    // WhatsApp: Datos personales opcionales (se redirecciona directo a WhatsApp)
    const handleSendWhatsApp = () => {
        setErrors({});
        const url = buildWhatsAppUrl(generatedBrief);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Validación estricta para envío por EmailJS
    const validateForEmail = () => {
        const newErrors = {};

        if (selectedExtras.length === 0) {
            newErrors.extras = isEs
                ? 'Marcá al menos 1 opción en el paso 02.'
                : 'Select at least 1 option in step 02.';
        }

        if (!clientName.trim() || clientName.trim().length < 2) {
            newErrors.name = isEs
                ? 'Ingresá tu nombre completo.'
                : 'Please enter your name.';
        }

        if (!clientContact.trim()) {
            newErrors.email = isEs
                ? 'Ingresá tu correo electrónico.'
                : 'Please enter your email address.';
        } else if (!EMAIL_REGEX.test(clientContact.trim())) {
            newErrors.email = isEs
                ? 'Ingresá un correo válido (ej: nombre@mail.com).'
                : 'Enter a valid email (e.g. name@mail.com).';
        }

        if (!notes.trim() || notes.trim().length < 3) {
            newErrors.notes = isEs
                ? 'Contanos brevemente tu idea o proyecto.'
                : 'Briefly describe your project idea.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (isSending) return;

        if (!validateForEmail()) {
            showToast(
                isEs
                    ? 'Completá Nombre, Email válido y Comentario para enviar por correo.'
                    : 'Please fill in Name, valid Email, and Note to send via email.',
                'error'
            );
            return;
        }

        setIsSending(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE,
                emailFormRef.current,
                import.meta.env.VITE_EMAILJS_USER_ID
            );
            showToast(
                isEs
                    ? '¡Presupuesto enviado por correo! Te responderé a la brevedad.'
                    : 'Quote sent via email! I will reply shortly.',
                'success'
            );
            setClientName('');
            setClientContact('');
            setNotes('');
            setErrors({});
        } catch (err) {
            console.error('Error al enviar por EmailJS:', err);
            showToast(
                isEs
                    ? 'Hubo un error al enviar el correo. Intentá nuevamente.'
                    : 'Error sending email. Please try again.',
                'error'
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="studio-contact-section container py-5">
            {/* Section Header */}
            <div className="studio-section-header">
                <h2 className="studio-section-title">
                    {isEs ? (
                        <>
                            Armá tu presupuesto{' '}
                            <span className="studio-gradient-text">en 3 pasos</span>
                        </>
                    ) : (
                        <>
                            Build your quote{' '}
                            <span className="studio-gradient-text">in 3 steps</span>
                        </>
                    )}
                </h2>
                <p className="studio-section-subtitle">
                    {isEs
                        ? 'Elegí el servicio, marcá qué necesitás y enviame el resumen por WhatsApp.'
                        : 'Select a service, check what you need, and send the brief via WhatsApp.'}
                </p>
            </div>

            <div className="studio-quote-layout">
                {/* LEFT COLUMN: 3-STEP INTERACTIVE WIZARD */}
                <div className="spotlight-card studio-wizard-card">
                    {/* STEP 1: CHOOSE SERVICE (Compact Single-Line Buttons) */}
                    <div className="wizard-step-block">
                        <div className="wizard-step-header">
                            <span className="wizard-step-num">01</span>
                            <h3 className="wizard-step-title">
                                {isEs ? 'Elegí el servicio' : 'Pick a service'}
                            </h3>
                        </div>

                        <div className="wizard-service-grid">
                            {services.map((srv) => {
                                const active = srv.id === selectedServiceId;
                                return (
                                    <button
                                        key={srv.id}
                                        type="button"
                                        className={`wizard-srv-option ${active ? 'active' : ''}`}
                                        style={{ '--opt-accent': srv.accentColor }}
                                        onClick={() => handleServicePick(srv.id)}
                                    >
                                        <span className="opt-num">{srv.number}</span>
                                        <span className="opt-name">{srv.shortTitle}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* STEP 2: CUSTOMIZE FEATURES & TIMELINE (Single-Line Chips) */}
                    <div className="wizard-step-block">
                        <div className="wizard-step-header">
                            <span className="wizard-step-num">02</span>
                            <h3 className="wizard-step-title">
                                {isEs ? '¿Qué querés incluir?' : 'What to include?'}
                            </h3>
                        </div>

                        <div className="wizard-extras-chips">
                            {availableExtras.map((item) => {
                                const isChecked = selectedExtras.includes(item);
                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        className={`wizard-extra-chip ${isChecked ? 'checked' : ''}`}
                                        onClick={() => toggleExtra(item)}
                                    >
                                        <CheckCircle2 size={14} className="extra-chip-icon" />
                                        <span>{item}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {errors.extras && (
                            <span className="wizard-field-error mt-2">{errors.extras}</span>
                        )}

                        {/* Compact Timeline Selector */}
                        <div className="wizard-timeline-row mt-3">
                            <span className="timeline-label">
                                <Clock size={13} />
                                <span>{isEs ? 'Plazo:' : 'Timeline:'}</span>
                            </span>
                            <div className="timeline-pills">
                                {(TIMELINE_OPTIONS[isEs ? 'es' : 'en'] || []).map((tOpt) => (
                                    <button
                                        key={tOpt}
                                        type="button"
                                        className={`timeline-pill-btn ${timeline === tOpt ? 'active' : ''}`}
                                        onClick={() => setTimeline(tOpt)}
                                    >
                                        {tOpt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: DETAILS & SUBMIT (Optional for WhatsApp • Required for Email) */}
                    <div className="wizard-step-block border-0 pb-0 mb-0">
                        <div className="wizard-step-header">
                            <span className="wizard-step-num">03</span>
                            <h3 className="wizard-step-title">
                                {isEs ? 'Tus datos y envío' : 'Your info & send'}
                            </h3>
                            <span className="wizard-step-note-pill">
                                {isEs
                                    ? 'Opcional WhatsApp • Obligatorio Email'
                                    : 'Optional WA • Required Email'}
                            </span>
                        </div>

                        {/* Hidden Form for EmailJS sendForm */}
                        <form ref={emailFormRef} className="d-none" aria-hidden="true">
                            <input
                                type="hidden"
                                name="user_name"
                                value={clientName.trim()}
                                readOnly
                            />
                            <input
                                type="hidden"
                                name="user_email"
                                value={clientContact.trim()}
                                readOnly
                            />
                            <textarea name="message" value={generatedBrief} readOnly />
                        </form>

                        <div className="wizard-inputs-row">
                            <div className="wizard-input-group">
                                <label>
                                    {isEs ? 'Nombre' : 'Name'}{' '}
                                    <span className="req-hint">
                                        {isEs ? '(req. Email)' : '(Email req.)'}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className={errors.name ? 'has-error' : ''}
                                    value={clientName}
                                    onChange={(e) => {
                                        setClientName(e.target.value);
                                        if (errors.name) {
                                            setErrors((prev) => ({ ...prev, name: null }));
                                        }
                                    }}
                                    placeholder={isEs ? 'Tu nombre o marca' : 'Your name'}
                                />
                                {errors.name && (
                                    <span className="wizard-field-error">{errors.name}</span>
                                )}
                            </div>
                            <div className="wizard-input-group">
                                <label>
                                    Email{' '}
                                    <span className="req-hint">
                                        {isEs ? '(req. Email)' : '(Email req.)'}
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    className={errors.email ? 'has-error' : ''}
                                    value={clientContact}
                                    onChange={(e) => {
                                        setClientContact(e.target.value);
                                        if (errors.email) {
                                            setErrors((prev) => ({ ...prev, email: null }));
                                        }
                                    }}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && (
                                    <span className="wizard-field-error">{errors.email}</span>
                                )}
                            </div>
                        </div>

                        <div className="wizard-input-group mt-2">
                            <label>
                                {isEs ? 'Comentario breve' : 'Short note'}{' '}
                                <span className="req-hint">
                                    {isEs ? '(req. Email)' : '(Email req.)'}
                                </span>
                            </label>
                            <input
                                type="text"
                                className={errors.notes ? 'has-error' : ''}
                                value={notes}
                                onChange={(e) => {
                                    setNotes(e.target.value);
                                    if (errors.notes) {
                                        setErrors((prev) => ({ ...prev, notes: null }));
                                    }
                                }}
                                placeholder={
                                    isEs
                                        ? 'Contame brevemente tu idea o temática...'
                                        : 'Briefly describe your idea...'
                                }
                            />
                            {errors.notes && (
                                <span className="wizard-field-error">{errors.notes}</span>
                            )}
                        </div>

                        {/* Live Generated Brief Preview */}
                        <div className="wizard-live-preview mt-3">
                            <div className="preview-top">
                                <span className="preview-tag">
                                    <FileText size={12} />
                                    {isEs ? 'RESUMEN DE CONSULTA' : 'QUOTE SUMMARY'}
                                </span>
                                <span className="preview-ready">● Ready</span>
                            </div>
                            <pre className="preview-text">{generatedBrief}</pre>
                        </div>

                        {/* Compact Single-Line Submit Buttons */}
                        <div className="wizard-submit-actions mt-3">
                            <button
                                type="button"
                                className="btn-wizard-whatsapp"
                                onClick={handleSendWhatsApp}
                            >
                                <FaWhatsapp size={19} />
                                <span>{isEs ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}</span>
                                <ArrowUpRight size={16} />
                            </button>

                            <button
                                type="button"
                                className="btn-wizard-email"
                                onClick={handleSendEmail}
                                disabled={isSending}
                                title={
                                    isEs
                                        ? 'Enviar automáticamente por Email'
                                        : 'Send automatically via Email'
                                }
                            >
                                <Send size={15} />
                                <span>
                                    {isSending
                                        ? isEs
                                            ? 'Enviando...'
                                            : 'Sending...'
                                        : isEs
                                            ? 'Enviar Email'
                                            : 'Send Email'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR: DIRECT CONTACT CHANNELS (SIN BOTÓN COPIAR) */}
                <aside className="studio-contact-sidebar">
                    {/* Direct WhatsApp Card */}
                    <a
                        href={buildWhatsAppUrl(
                            isEs
                                ? '¡Hola Lautaro! Quería hacerte una consulta sobre tus servicios web.'
                                : 'Hi Lautaro! I wanted to ask about your web services.'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotlight-card sidebar-channel-card channel-whatsapp"
                    >
                        <div className="channel-icon-wrap wa">
                            <FaWhatsapp size={21} />
                        </div>
                        <div className="channel-info">
                            <span className="channel-kicker">WHATSAPP</span>
                            <h4 className="channel-value">{CONTACT_INFO.whatsappDisplay}</h4>
                            <p className="channel-hint">
                                {isEs ? 'Cotizá sin compromiso' : 'Free quote'}
                            </p>
                        </div>
                        <ArrowUpRight size={17} className="channel-arrow" />
                    </a>

                    {/* Main Portfolio Showcase Card */}
                    <a
                        href={CONTACT_INFO.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotlight-card sidebar-channel-card channel-portfolio"
                    >
                        <div className="channel-icon-wrap portfolio">
                            <Sparkles size={19} />
                        </div>
                        <div className="channel-info">
                            <span className="channel-kicker">
                                {isEs ? 'PORTAFOLIO' : 'PORTFOLIO'}
                            </span>
                            <h4 className="channel-value">{CONTACT_INFO.portfolioDisplay}</h4>
                            <p className="channel-hint">
                                {isEs ? 'Proyectos reales en vivo' : 'Live projects'}
                            </p>
                        </div>
                        <ArrowUpRight size={17} className="channel-arrow" />
                    </a>

                    {/* Direct Email Card (Sin botón copiar) */}
                    <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="spotlight-card sidebar-channel-card channel-email"
                    >
                        <div className="channel-icon-wrap email">
                            <Mail size={19} />
                        </div>
                        <div className="channel-info">
                            <span className="channel-kicker">EMAIL</span>
                            <h4 className="channel-value">{CONTACT_INFO.email}</h4>
                            <p className="channel-hint">
                                {isEs ? 'Consultas por correo' : 'Email inquiries'}
                            </p>
                        </div>
                        <ArrowUpRight size={17} className="channel-arrow" />
                    </a>

                    {/* Social Links Box (Icon + Short Name) */}
                    <div className="spotlight-card sidebar-social-box">
                        <div className="social-box-buttons">
                            <a
                                href={CONTACT_INFO.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-pill-link"
                            >
                                <FaLinkedin size={16} />
                                <span>LinkedIn</span>
                                <ArrowUpRight size={13} />
                            </a>
                            <a
                                href={CONTACT_INFO.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-pill-link"
                            >
                                <FaGithub size={16} />
                                <span>GitHub</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Studio Footer */}
            <footer className="studio-footer mt-5 pt-4">
                <div className="footer-left">
                    <img
                        src="/Logo_LLDP.png"
                        alt="Logo LLDP"
                        className="footer-logo-img"
                        width="20"
                        height="20"
                    />
                    <span className="footer-brand">
                        LAUTARO LEAL DEL PRETE • DESARROLLO WEB
                    </span>
                </div>
                <div className="footer-right">
                    <span>Tucumán, AR</span>
                    <span>•</span>
                    <a
                        href={CONTACT_INFO.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {CONTACT_INFO.portfolioDisplay}
                    </a>
                </div>
            </footer>

            {/* Floating Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        className={`studio-toast-popup ${toastMessage.type === 'error' ? 'is-error' : ''}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        {toastMessage.type === 'error' ? (
                            <AlertCircle size={17} className="toast-icon error" />
                        ) : (
                            <CheckCircle2 size={17} className="toast-icon" />
                        )}
                        <span>{toastMessage.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contact;
