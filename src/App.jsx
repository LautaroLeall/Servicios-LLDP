import { useEffect, useState, useMemo, lazy, Suspense } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

// Secciones de LLDP Studio — Mis Servicios
import TopNavbar from './components/TopNavbar'
import Home from './components/Home'
import ServicesGrid from './components/ServicesGrid'
import ServicesCarousel from './components/ServicesCarousel'
import Workflow from './components/Workflow'
import Contact from './components/Contact'
import AuroraMeshBackground from './components/ui/AuroraMeshBackground'

const ServiceDetailModal = lazy(() => import('./components/ServiceDetailModal'))

import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useModal } from './hooks/useModal'
import { getServicesData, buildWhatsAppUrl } from './data/servicesData'

function App() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { isModalOpen } = useModal()
  const isLight = theme === 'light'
  const isEs = language === 'es'

  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)
  const [preselectedQuoteServiceId, setPreselectedQuoteServiceId] = useState('paginas-web')

  const services = useMemo(() => getServicesData(language), [language])

  const selectedService = useMemo(
    () => services.find((srv) => srv.id === selectedServiceId) || null,
    [services, selectedServiceId]
  )

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const handleSelectService = (service) => {
    if (!service) return
    const idx = services.findIndex((s) => s.id === service.id)
    if (idx !== -1) {
      setActiveCarouselIndex(idx)
    }
    setSelectedServiceId(service.id)
  }

  const handleStartQuoteWithService = (serviceId) => {
    if (serviceId) {
      setPreselectedQuoteServiceId(serviceId)
    }
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const floatingWaUrl = buildWhatsAppUrl(
    isEs
      ? '¡Hola Lautaro! Vi tu web de Servicios y me gustaría cotizar un proyecto sin compromiso.'
      : 'Hi Lautaro! I saw your Services website and would like to get a free quote.'
  )

  return (
    <div className={`App ${theme}`}>
      {/* Barra superior de progreso */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
        animate={isModalOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Fondo Studio Aurora Mesh + Grilla Arquitectónica Interactiva */}
      <AuroraMeshBackground isLight={isLight} />

      {/* Navbar Superior Flotante estilo Agencia Boutique */}
      <TopNavbar />

      {/* Contenido Principal */}
      <main className="studio-main-content">
        <section id="home">
          <Home
            services={services}
            onSelectService={handleSelectService}
            onStartQuoteWithService={handleStartQuoteWithService}
          />
        </section>

        <section id="services">
          <ServicesGrid
            services={services}
            onSelectService={handleSelectService}
            onStartQuoteWithService={handleStartQuoteWithService}
          />
        </section>

        <section id="showcase">
          <ServicesCarousel
            services={services}
            activeIndex={activeCarouselIndex}
            onChangeIndex={setActiveCarouselIndex}
            onOpenDetail={handleSelectService}
            onStartQuoteWithService={handleStartQuoteWithService}
          />
        </section>

        <section id="workflow">
          <Workflow />
        </section>

        <section id="contact" className="pb-5">
          <Contact
            services={services}
            preselectedServiceId={preselectedQuoteServiceId}
          />
        </section>
      </main>

      {/* Botón Flotante de WhatsApp Directo (Solo Icono) */}
      {!isModalOpen && (
        <a
          href={floatingWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-wa-widget"
          title="WhatsApp Directo: +54 381 339 9463"
          aria-label="WhatsApp Directo"
        >
          <FaWhatsapp size={23} />
        </a>
      )}

      {/* Modal de Ficha Completa del Servicio */}
      <AnimatePresence>
        {selectedService && (
          <Suspense fallback={null}>
            <ServiceDetailModal
              key={selectedService.id}
              service={selectedService}
              onClose={() => setSelectedServiceId(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
