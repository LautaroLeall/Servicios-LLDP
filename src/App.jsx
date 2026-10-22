import { useEffect, useState, useMemo, lazy, Suspense } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

// Secciones Críticas (Above-The-Fold: Carga instantánea en <0.3s)
import TopNavbar from './components/TopNavbar'
import Home from './components/Home'
import AuroraMeshBackground from './components/ui/AuroraMeshBackground'
import Preloader from './components/ui/Preloader'

// Secciones Secundarias (Below-The-Fold: Lazy Loading para eliminar la pantalla negra en móviles)
const ServicesGrid = lazy(() => import('./components/ServicesGrid'))
const ServicesCarousel = lazy(() => import('./components/ServicesCarousel'))
const Workflow = lazy(() => import('./components/Workflow'))
const Contact = lazy(() => import('./components/Contact'))
const ServiceDetailModal = lazy(() => import('./components/ServiceDetailModal'))

const SectionSkeleton = () => (
  <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '260px' }}>
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '2px solid rgba(6, 182, 212, 0.15)',
        borderTopColor: '#06b6d4',
        animation: 'studioInitialSpin 0.8s linear infinite'
      }}
    />
  </div>
)

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mantener el loader activo un breve instante para apreciar el efecto 3D
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1100)
    return () => clearTimeout(timer)
  }, [])

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

  // Precarga inteligente en segundo plano cuando el navegador esté libre (Idle)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const preloadBelowFold = () => {
      import('./components/ServicesGrid')
      import('./components/ServicesCarousel')
      import('./components/Workflow')
      import('./components/Contact')
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadBelowFold, { timeout: 2000 })
    } else {
      setTimeout(preloadBelowFold, 1000)
    }
  }, [])

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
      {/* Preloader 3D Holográfico con Salida Suave */}
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

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
          <Suspense fallback={<SectionSkeleton />}>
            <ServicesGrid
              services={services}
              onSelectService={handleSelectService}
              onStartQuoteWithService={handleStartQuoteWithService}
            />
          </Suspense>
        </section>

        <section id="showcase">
          <Suspense fallback={<SectionSkeleton />}>
            <ServicesCarousel
              services={services}
              activeIndex={activeCarouselIndex}
              onChangeIndex={setActiveCarouselIndex}
              onOpenDetail={handleSelectService}
              onStartQuoteWithService={handleStartQuoteWithService}
            />
          </Suspense>
        </section>

        <section id="workflow">
          <Suspense fallback={<SectionSkeleton />}>
            <Workflow />
          </Suspense>
        </section>

        <section id="contact" className="pb-5">
          <Suspense fallback={<SectionSkeleton />}>
            <Contact
              services={services}
              preselectedServiceId={preselectedQuoteServiceId}
            />
          </Suspense>
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
