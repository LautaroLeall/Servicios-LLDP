import { useState } from 'react';
import {
    Globe,
    Smartphone,
    ShoppingCart,
    CheckCircle2,
    Sparkles,
    MapPin,
    Calendar,
    Clock,
    Music,
    Gift,
    Zap,
    Layout,
    Cpu,
    SearchCheck,
    BellRing,
    TrendingUp,
    Package,
    DollarSign,
    ShieldCheck
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/serviceMockup.css';

const ServiceMockup = ({ serviceId, service, lang, language, variant = 'card' }) => {
    const activeId = serviceId || service?.id || 'paginas-web';
    const isEs = (lang || language || 'es') === 'es';
    const isLarge = variant === 'carousel' || variant === 'modal';

    // Interactive state for Invitaciones Digitales
    const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
    const [activeInviteCard, setActiveInviteCard] = useState('olivia');
    const [musicPlaying, setMusicPlaying] = useState(true);
    const [aliasCopied, setAliasCopied] = useState(false);

    // Interactive state for Revisión de Presupuesto
    const [selectedAuditRow, setSelectedAuditRow] = useState(3);

    // Interactive state for Tienda Online
    const [cartCount, setCartCount] = useState(3);
    const [addedProductIdx, setAddedProductIdx] = useState(null);
    const [salesCount, setSalesCount] = useState(1);

    // Interactive state for Sistemas de Gestión
    const [appointments, setAppointments] = useState([
        { time: '09:30', client: 'Martín G.', service: isEs ? 'Consulta' : 'Consult', status: 'ok' },
        { time: '11:00', client: 'Lucía R.', service: isEs ? 'Control' : 'Follow-up', status: 'ok' },
        { time: '16:30', client: 'Carlos M.', service: isEs ? 'Reserva' : 'Booking', status: 'pending' }
    ]);

    const handleAddToCart = (e, idx) => {
        e.stopPropagation();
        setCartCount((prev) => prev + 1);
        setSalesCount((prev) => prev + 1);
        setAddedProductIdx(idx);
        setTimeout(() => setAddedProductIdx(null), 900);
    };

    const handleToggleAppointment = (e, idx) => {
        e.stopPropagation();
        setAppointments((prev) =>
            prev.map((item, i) =>
                i === idx ? { ...item, status: item.status === 'ok' ? 'pending' : 'ok' } : item
            )
        );
    };

    /* 01. PÁGINAS WEB (PC + Mobile 24/7 + Direct WhatsApp) */
    if (activeId === 'paginas-web') {
        return (
            <div className={`srv-mockup mockup-web ${isLarge ? 'is-large' : ''}`}>
                <div className="mockup-ambient-glow glow-blue" />

                <div className="web-browser-window">
                    <div className="browser-topbar">
                        <div className="browser-dots">
                            <span className="dot red" />
                            <span className="dot yellow" />
                            <span className="dot green" />
                        </div>
                        <div className="browser-url">
                            <Globe size={11} />
                            <span>tunegocio.com.ar</span>
                        </div>
                        <span className="online-24-pill">24/7</span>
                    </div>

                    <div className="browser-body">
                        <div className="web-hero-preview">
                            <div className="web-brand-chip">
                                <span className="brand-dot" />
                                <span>{isEs ? 'TU MARCA ONLINE' : 'YOUR BRAND'}</span>
                            </div>
                            <h5 className="web-preview-title">
                                {isEs
                                    ? 'Tu negocio, abierto las 24 hs.'
                                    : 'Your business, open 24/7.'}
                            </h5>
                            <p className="web-preview-sub">
                                {isEs
                                    ? 'Diseño prolijo • Celular y PC'
                                    : 'Clean design • Mobile & PC'}
                            </p>
                            <div className="web-preview-actions">
                                <span className="web-cta-wa">
                                    <FaWhatsapp size={12} />
                                    <span>WhatsApp</span>
                                </span>
                                <span className="web-cta-secondary">
                                    {isEs ? 'Catálogo' : 'Catalog'}
                                </span>
                            </div>
                        </div>

                        <div className="web-metrics-row">
                            <div className="web-metric-box">
                                <span className="m-val">100%</span>
                                <span className="m-lbl">Responsive</span>
                            </div>
                            <div className="web-metric-box">
                                <span className="m-val">&lt;1.2s</span>
                                <span className="m-lbl">{isEs ? 'Velocidad' : 'Speed'}</span>
                            </div>
                            <div className="web-metric-box">
                                <span className="m-val">SEO</span>
                                <span className="m-lbl">Google</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Mobile Preview */}
                <div className="web-mobile-device">
                    <div className="mobile-notch" />
                    <div className="mobile-screen">
                        <div className="mobile-header-bar">
                            <Smartphone size={11} />
                            <span>Mobile</span>
                        </div>
                        <div className="mobile-card-skeleton" />
                        <div className="mobile-card-skeleton short" />
                        <div className="mobile-wa-floating">
                            <FaWhatsapp size={12} />
                            <span>Chat</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* 02. SISTEMAS DE GESTIÓN (Indicadores Turnos, Stock, Finanzas + Turnos de hoy) */
    if (activeId === 'sistemas-gestion' || activeId === 'sistemas-de-gestion') {
        const confirmedCount = appointments.filter((a) => a.status === 'ok').length + 22;

        return (
            <div className={`srv-mockup mockup-sistema ${isLarge ? 'is-large' : ''}`}>
                <div className="mockup-ambient-glow glow-violet" />

                <div className="sistema-dashboard-window">
                    <div className="sistema-topbar">
                        <div className="sistema-title">
                            <Cpu size={13} />
                            <span>{isEs ? 'PANEL DE GESTIÓN' : 'MANAGEMENT PANEL'}</span>
                        </div>
                        <span className="sistema-sync-badge">● Online</span>
                    </div>

                    {/* 3 KPI Indicators: Turnos, Stock, Finanzas */}
                    <div className="sistema-kpi-grid">
                        <div className="sistema-kpi-card kpi-turnos">
                            <div className="kpi-head">
                                <Calendar size={11} />
                                <span>{isEs ? 'Turnos' : 'Bookings'}</span>
                            </div>
                            <div className="kpi-value">{confirmedCount}</div>
                            <div className="kpi-sub">{isEs ? 'Hoy' : 'Today'}</div>
                        </div>

                        <div className="sistema-kpi-card kpi-stock">
                            <div className="kpi-head">
                                <Package size={11} />
                                <span>Stock</span>
                            </div>
                            <div className="kpi-value">418 u.</div>
                            <div className="kpi-sub">{isEs ? 'Al día' : 'In Stock'}</div>
                        </div>

                        <div className="sistema-kpi-card kpi-finanzas">
                            <div className="kpi-head">
                                <DollarSign size={11} />
                                <span>{isEs ? 'Finanzas' : 'Finance'}</span>
                            </div>
                            <div className="kpi-value">+$840k</div>
                            <div className="kpi-sub">{isEs ? 'Ingresos' : 'Revenue'}</div>
                        </div>
                    </div>

                    {/* Grilla de "Turnos de hoy" */}
                    <div className="sistema-schedule-box">
                        <div className="schedule-header">
                            <span>{isEs ? 'Turnos de hoy' : "Today's Bookings"}</span>
                            <span className="schedule-count">
                                {appointments.length} {isEs ? 'activos' : 'active'}
                            </span>
                        </div>
                        <div className="schedule-rows">
                            {appointments.map((row, idx) => (
                                <div
                                    key={idx}
                                    className="schedule-row is-clickable"
                                    onClick={(e) => handleToggleAppointment(e, idx)}
                                >
                                    <span className="s-time">{row.time}</span>
                                    <span className="s-client">{row.client}</span>
                                    <span className="s-service">{row.service}</span>
                                    <span className={`s-status ${row.status}`}>
                                        {row.status === 'ok' ? '✓ OK' : isEs ? 'Espera' : 'Wait'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* 03. TIENDA ONLINE (Grilla de Productos + Carrito + ¡Nueva venta!) */
    if (activeId === 'tienda-online') {
        const products = [
            { name: isEs ? 'Auriculares' : 'Headphones', price: '$48.900', tag: 'HOT' },
            { name: 'Smartwatch', price: '$64.500', tag: 'NEW' },
            { name: 'Speaker', price: '$32.000', tag: '-15%' }
        ];

        return (
            <div className={`srv-mockup mockup-ecommerce ${isLarge ? 'is-large' : ''}`}>
                <div className="mockup-ambient-glow glow-emerald" />

                {/* Floating "¡Nueva venta!" Notification */}
                <div className="new-sale-toast" key={salesCount}>
                    <div className="sale-icon-box">
                        <BellRing size={12} />
                    </div>
                    <div className="sale-toast-text">
                        <span className="sale-title">
                            {isEs ? '¡Nueva venta!' : 'New sale!'}{' '}
                            {salesCount > 1 ? `(${salesCount})` : ''}
                        </span>
                        <span className="sale-meta">+$64.500</span>
                    </div>
                </div>

                <div className="ecom-store-window">
                    <div className="ecom-header">
                        <div className="ecom-brand">
                            <Package size={13} />
                            <span>{isEs ? 'TIENDA ONLINE' : 'ONLINE STORE'}</span>
                        </div>
                        <div className="ecom-cart-pill">
                            <ShoppingCart size={12} />
                            <span>{cartCount}</span>
                        </div>
                    </div>

                    <div className="ecom-product-grid">
                        {products.map((prod, idx) => (
                            <div key={idx} className="ecom-product-card">
                                <div className="ecom-prod-thumb">
                                    <span className="ecom-prod-tag">{prod.tag}</span>
                                    <ShoppingCart size={15} className="thumb-icon" />
                                </div>
                                <div className="ecom-prod-name">{prod.name}</div>
                                <div className="ecom-prod-price">{prod.price}</div>
                                <button
                                    type="button"
                                    className={`ecom-add-btn ${addedProductIdx === idx ? 'is-added' : ''}`}
                                    onClick={(e) => handleAddToCart(e, idx)}
                                    title={isEs ? 'Sumar al carrito' : 'Add to cart'}
                                >
                                    <ShoppingCart size={10} />
                                    <span>
                                        {addedProductIdx === idx
                                            ? '✓'
                                            : isEs
                                                ? '+ Sumar'
                                                : '+ Add'}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="ecom-admin-footer">
                        <span className="admin-pill">
                            <CheckCircle2 size={11} />
                            {isEs ? 'Panel simple' : 'Admin panel'}
                        </span>
                        <span className="admin-pill">
                            <Smartphone size={11} />
                            {isEs ? 'Ventas en móvil' : 'Mobile sales'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    /* 04. INVITACIONES DIGITALES (Olivia 6 Añitos + Karla 15 Años + Sello) */
    if (activeId === 'invitaciones-digitales') {
        return (
            <div className={`srv-mockup mockup-invitaciones ${isLarge ? 'is-large' : ''}`}>
                <div className="mockup-ambient-glow glow-pink" />

                {/* Top Header + Audio Toggle + Sello CALIDAD PREMIUM */}
                <div className="invitaciones-top-row">
                    <span className="invitaciones-header-tag">
                        {isEs ? 'INVITACIONES 100% DIGITALES' : '100% DIGITAL INVITATIONS'}
                    </span>

                    <div className="invitaciones-top-badges">
                        <button
                            type="button"
                            className={`invite-audio-pill ${musicPlaying ? 'is-playing' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setMusicPlaying((prev) => !prev);
                            }}
                            title={isEs ? 'Música de fondo' : 'Background music'}
                        >
                            <Music size={10} />
                            <span className="eq-bars">
                                <i />
                                <i />
                                <i />
                            </span>
                        </button>
                        <span className="premium-seal-badge">
                            <Sparkles size={10} />
                            <span>{isEs ? 'CALIDAD PREMIUM' : 'PREMIUM'}</span>
                        </span>
                    </div>
                </div>

                {/* Dual Phone Showcase */}
                <div className="invitaciones-phones-stage">
                    {/* Modelo Central (Infantil): Olivia */}
                    <div
                        className={`invite-phone-card model-central ${activeInviteCard === 'olivia' ? 'is-focused' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveInviteCard('olivia');
                        }}
                    >
                        <div className="phone-speaker" />

                        <div className="invite-hero-head">
                            <div className="invite-kicker">
                                {isEs ? 'TE INVITO A MI FIESTA' : 'YOU ARE INVITED'}
                            </div>
                            <div className="invite-main-name">Olivia</div>
                            <div className="invite-age-pill">
                                <Sparkles size={9} />
                                <span>{isEs ? '¡Mis 6 Añitos!' : 'My 6th Birthday!'}</span>
                            </div>
                        </div>

                        {/* Mini Live Countdown Strip */}
                        <div className="invite-countdown-strip">
                            <div className="cd-cell">
                                <span className="cd-num">14</span>
                                <span className="cd-lbl">{isEs ? 'Días' : 'Days'}</span>
                            </div>
                            <span className="cd-sep">:</span>
                            <div className="cd-cell">
                                <span className="cd-num">08</span>
                                <span className="cd-lbl">Hs</span>
                            </div>
                            <span className="cd-sep">:</span>
                            <div className="cd-cell">
                                <span className="cd-num">45</span>
                                <span className="cd-lbl">Min</span>
                            </div>
                        </div>

                        <div className="invite-info-block">
                            <div className="invite-info-title">
                                <Calendar size={10} />
                                <span>{isEs ? '¿Cuándo?' : 'When?'}</span>
                                <span className="invite-inline-val">
                                    {isEs ? 'Vie 2 Oct • 18:30 hs' : 'Fri Oct 2 • 6:30 PM'}
                                </span>
                            </div>
                        </div>

                        <div className="invite-info-block">
                            <div className="invite-info-title">
                                <MapPin size={10} />
                                <span>{isEs ? '¿Dónde?' : 'Where?'}</span>
                                <span className="invite-maps-link">Maps ↗</span>
                            </div>
                            <p className="invite-info-text">
                                &ldquo;Elementos Kids&rdquo; • C. Álvarez 1084
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`invite-confirm-btn ${rsvpConfirmed ? 'confirmed' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setRsvpConfirmed((prev) => !prev);
                            }}
                        >
                            <FaWhatsapp size={10} />
                            <span>{rsvpConfirmed ? '✓ ¡CONFIRMADO!' : '¡CONFIRMAR!'}</span>
                        </button>
                    </div>

                    {/* Modelo Derecho (15 Años): KARLA */}
                    <div
                        className={`invite-phone-card model-right ${activeInviteCard === 'karla' ? 'is-focused' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveInviteCard('karla');
                        }}
                    >
                        <div className="phone-speaker" />

                        <div className="karla-hero-head">
                            <div className="karla-crown">✦ XV AÑOS ✦</div>
                            <div className="karla-name">KARLA</div>
                            <div className="karla-sub">
                                {isEs ? 'MIS 15 AÑOS' : 'SWEET 15'}
                            </div>
                        </div>

                        <div className="karla-details">
                            <div className="karla-row">
                                <Calendar size={10} />
                                <span>{isEs ? 'Sáb 15 de Diciembre' : 'Sat Dec 15'}</span>
                            </div>
                            <div className="karla-row">
                                <Clock size={10} />
                                <span>19:00 Hs</span>
                            </div>
                            <div className="karla-row">
                                <MapPin size={10} />
                                <span>Parroquia San José</span>
                            </div>
                            <div className="karla-address">Av. Central 456</div>
                        </div>

                        <div className="karla-interactive-actions">
                            <button
                                type="button"
                                className={`karla-gift-pill ${aliasCopied ? 'copied' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAliasCopied((prev) => !prev);
                                }}
                            >
                                <Gift size={10} />
                                <span>
                                    {aliasCopied
                                        ? isEs
                                            ? '✓ Alias CBU'
                                            : '✓ Copied'
                                        : isEs
                                            ? 'Regalos / CBU'
                                            : 'Gift / Alias'}
                                </span>
                            </button>

                            <div className="karla-music-bar">
                                <Music size={10} />
                                <span>RSVP • Música</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LO QUE HACEMOS Pill Strip */}
                <div className="invitaciones-bottom-strip">
                    <div className="what-we-do-pills">
                        <span className="wwd-chip">Cumple</span>
                        <span className="wwd-chip">15 Años</span>
                        <span className="wwd-chip">Regalos</span>
                        <span className="wwd-chip">Maps</span>
                        <span className="wwd-chip">RSVP</span>
                        <span className="wwd-chip">Música</span>
                    </div>
                </div>
            </div>
        );
    }

    /* 05. MEJORA DE TU WEB (Esquema ANTES vs DESPUÉS: Velocidad, Diseño, Funciones) */
    if (activeId === 'mejora-web' || activeId === 'mejora-de-tu-web') {
        const pillars = [
            {
                icon: Zap,
                name: isEs ? 'Velocidad' : 'Speed',
                before: isEs ? 'Lenta (6.2s)' : 'Slow (6.2s)',
                after: isEs ? 'Rápida (0.9s)' : 'Fast (0.9s)'
            },
            {
                icon: Layout,
                name: isEs ? 'Diseño' : 'Design',
                before: isEs ? 'Antiguo' : 'Outdated',
                after: isEs ? 'Moderno y claro' : 'Modern & clear'
            },
            {
                icon: TrendingUp,
                name: isEs ? 'Funciones' : 'Features',
                before: isEs ? 'Limitada' : 'Limited',
                after: isEs ? 'Nuevas funciones' : 'New features'
            }
        ];

        return (
            <div className={`srv-mockup mockup-mejora ${isLarge ? 'is-large' : ''}`}>
                <div className="mockup-ambient-glow glow-cyan" />

                <div className="mejora-comparison-board">
                    <div className="mejora-columns-header">
                        <div className="col-badge badge-before">
                            <span>{isEs ? 'ANTES' : 'BEFORE'}</span>
                        </div>
                        <div className="col-badge badge-after">
                            <Sparkles size={11} />
                            <span>{isEs ? 'DESPUÉS' : 'AFTER'}</span>
                        </div>
                    </div>

                    <div className="mejora-pillars-list">
                        {pillars.map((p, idx) => {
                            const IconComp = p.icon;
                            return (
                                <div key={idx} className="mejora-pillar-row">
                                    <div className="pillar-label">
                                        <IconComp size={12} />
                                        <span>{p.name}</span>
                                    </div>
                                    <div className="pillar-comparison-cells">
                                        <div className="cell-before">{p.before}</div>
                                        <div className="cell-arrow">→</div>
                                        <div className="cell-after">{p.after}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mejora-score-footer">
                        <div className="score-meter">
                            <span className="score-old">38/100</span>
                            <div className="score-progress-bar">
                                <div className="score-progress-fill" />
                            </div>
                            <span className="score-new">99/100</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* 06. REVISIÓN DE PRESUPUESTO (Auditoría de Presupuesto de Desarrollo Web) */
    const checklistItems = [
        {
            label: isEs ? 'Diseño UI/UX' : 'UI/UX Design',
            note: isEs ? 'Adaptado a Celular y PC' : 'Mobile & Desktop Ready',
            status: isEs ? '✓ Incluido' : '✓ Included',
            tone: 'ok'
        },
        {
            label: isEs ? 'Desarrollo Web' : 'Web Dev',
            note: isEs ? 'Código rápido (<1.2s) y SEO' : 'Fast code (<1.2s) & SEO',
            status: isEs ? '✓ Optimizado' : '✓ Optimized',
            tone: 'ok'
        },
        {
            label: isEs ? 'Secciones & WA' : 'Sections & WA',
            note: isEs ? 'Catálogo, Mapa y WhatsApp' : 'Catalog, Map & WhatsApp',
            status: isEs ? '+ Sumado' : '+ Added',
            tone: 'plus'
        },
        {
            label: 'Hosting & SSL',
            note: isEs ? 'Detectado cobro extra aparte' : 'Hidden fee detected',
            status: isEs ? '✓ Sin cargo' : '✓ Free',
            tone: 'save'
        },
        {
            label: isEs ? 'Soporte & Panel' : 'Support & Admin',
            note: isEs ? 'Sin abono mensual obligatorio' : 'No mandatory monthly fee',
            status: isEs ? '✓ Ahorro 30%' : '✓ Save 30%',
            tone: 'save'
        }
    ];

    return (
        <div className={`srv-mockup mockup-presupuesto ${isLarge ? 'is-large' : ''}`}>
            <div className="mockup-ambient-glow glow-amber" />

            <div className="presupuesto-card-sheet">
                {/* Sello Destacado "TE LO REVISO" */}
                <div className="te-lo-reviso-stamp">
                    <SearchCheck size={12} />
                    <span>{isEs ? 'TE LO REVISO' : 'I REVIEW IT'}</span>
                </div>

                <div className="presupuesto-card-header">
                    <div className="presupuesto-doc-badge">
                        <ShieldCheck size={14} />
                        <span>{isEs ? 'PRESUPUESTO WEB' : 'WEB QUOTE AUDIT'}</span>
                    </div>
                    <span className="presupuesto-sub-pill">
                        {isEs ? 'Comparativa Real' : 'Full Audit'}
                    </span>
                </div>

                <div className="presupuesto-checklist">
                    {checklistItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`presupuesto-check-row ${selectedAuditRow === idx ? 'is-active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAuditRow(idx);
                            }}
                        >
                            <div className={`check-box-icon tone-${item.tone}`}>
                                <CheckCircle2 size={13} />
                            </div>
                            <div className="check-item-info">
                                <span className="check-item-title">{item.label}</span>
                                <span className="check-item-note">{item.note}</span>
                            </div>
                            <span className={`check-status-tag tone-${item.tone}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="presupuesto-compare-footer">
                    <div className="compare-other">
                        <span className="cmp-lbl">{isEs ? 'Otro proveedor:' : 'Other quote:'}</span>
                        <span className="cmp-bad">{isEs ? 'Costos ocultos' : 'Hidden fees'}</span>
                    </div>
                    <div className="compare-lldp">
                        <Sparkles size={10} />
                        <span>{isEs ? 'Propuesta LLDP: Todo incluido' : 'LLDP: All-in-one'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceMockup;
