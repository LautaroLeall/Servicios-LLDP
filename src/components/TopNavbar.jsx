import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Layers,
    Sliders,
    GitBranch,
    Calculator,
    Sun,
    Moon,
    ArrowUpRight,
    Briefcase,
    Menu,
    X
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import useScrollSpy from '../hooks/useScrollSpy';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { useModal } from '../hooks/useModal';
import { CONTACT_INFO } from '../data/servicesData';
import '../styles/topNavbar.css';

const sectionIds = ['home', 'services', 'showcase', 'workflow', 'contact'];

const TopNavbar = () => {
    const activeSection = useScrollSpy(sectionIds);
    const { language, toggleLanguage } = useLanguage();
    const { theme, setTheme, toggleTheme } = useTheme();
    const { isModalOpen } = useModal();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isEs = language === 'es';
    const isLight = theme === 'light';

    const handleThemeSwitch = () => {
        if (toggleTheme) {
            toggleTheme();
        } else if (setTheme) {
            setTheme(isLight ? 'dark' : 'light');
        }
    };

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navItems = [
        { id: 'home', label: isEs ? 'Inicio' : 'Home', icon: Sparkles },
        { id: 'services', label: isEs ? 'Servicios' : 'Services', icon: Layers },
        { id: 'showcase', label: isEs ? 'Demos' : 'Demos', icon: Sliders },
        { id: 'workflow', label: isEs ? 'Proceso' : 'Process', icon: GitBranch },
        { id: 'contact', label: isEs ? 'Cotizar' : 'Quote', icon: Calculator }
    ];

    const scrollToSection = (id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            className={`studio-top-navbar ${scrolled ? 'is-scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={
                isModalOpen
                    ? { y: -100, opacity: 0, pointerEvents: 'none' }
                    : { y: 0, opacity: 1, pointerEvents: 'auto' }
            }
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="studio-navbar-container">
                {/* Brand Identity */}
                <button
                    type="button"
                    className="studio-brand-btn"
                    onClick={() => scrollToSection('home')}
                >
                    <img
                        src="/Logo_LLDP.png"
                        alt="Logo LLDP"
                        className="brand-logo-img"
                        width="26"
                        height="26"
                    />
                    <div className="studio-brand-text">
                        <span className="brand-name">LAUTARO LEAL DEL PRETE</span>
                    </div>
                </button>

                {/* Desktop Center Navigation Pills */}
                <nav className="studio-nav-links" aria-label="Main Navigation">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        const NavIcon = item.icon;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`studio-nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="studio-top-nav-pill"
                                        className="studio-nav-active-bg"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <NavIcon size={14} className="nav-item-icon" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Right Utilities & Primary Action */}
                <div className="studio-nav-actions">
                    {/* Portfolio Icon Button */}
                    <a
                        href={CONTACT_INFO.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="studio-util-btn"
                        title={isEs ? 'Ver Portafolio Oficial' : 'View Official Portfolio'}
                        aria-label="Portafolio"
                    >
                        <Briefcase size={15} />
                    </a>

                    {/* Language Switcher */}
                    <button
                        type="button"
                        className="studio-util-btn lang-btn"
                        onClick={toggleLanguage}
                        title={isEs ? 'Switch to English' : 'Cambiar a Español'}
                    >
                        {language.toUpperCase()}
                    </button>

                    {/* Theme Switcher */}
                    <button
                        type="button"
                        className="studio-util-btn theme-btn"
                        onClick={handleThemeSwitch}
                        aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
                        title={isLight ? 'Modo oscuro' : 'Modo claro'}
                    >
                        {isLight ? <Moon size={15} /> : <Sun size={15} />}
                    </button>

                    {/* Primary Quote CTA (Compact 1-word) */}
                    <button
                        type="button"
                        className="studio-cta-quote-btn"
                        onClick={() => scrollToSection('contact')}
                    >
                        <FaWhatsapp size={14} />
                        <span>{isEs ? 'Cotizar' : 'Quote'}</span>
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        className="studio-mobile-toggle"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="studio-mobile-drawer"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.22 }}
                    >
                        <div className="mobile-drawer-links">
                            {navItems.map((item) => {
                                const MobileIcon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`mobile-drawer-item ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        <MobileIcon size={15} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mobile-drawer-footer">
                            <a
                                href={CONTACT_INFO.portfolioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-portfolio-link"
                            >
                                <span>{CONTACT_INFO.portfolioDisplay}</span>
                                <ArrowUpRight size={15} />
                            </a>
                            <button
                                type="button"
                                className="mobile-quote-cta"
                                onClick={() => scrollToSection('contact')}
                            >
                                <FaWhatsapp size={16} />
                                <span>{isEs ? 'Armar presupuesto' : 'Build quote'}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default TopNavbar;
