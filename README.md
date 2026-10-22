# 🚀 Mis Servicios Web — Lautaro Leal Del Prete (LLDP)

Landing page profesional y de ultra alto rendimiento para el catálogo de **Servicios de Desarrollo & Diseño Web** de Lautaro Leal Del Prete. Desarrollada con **React 19 + Vite**, arquitectura modular, diseño boutique responsive (Obsidian Carbon & Cyan/Indigo Mesh), soporte bilingüe (**ES / EN**), preloader holográfico 3D y cotizador interactivo directo a **WhatsApp** y **EmailJS**.

🌐 **Sitio Web Oficial (Deploy):** [https://servicios-lldp.vercel.app/](https://servicios-lldp.vercel.app/)  
💼 **Portafolio Principal:** [https://portafolio-lldp.vercel.app/](https://portafolio-lldp.vercel.app/)  
📦 **Repositorio GitHub:** [https://github.com/LautaroLeall/Servicios-LLDP](https://github.com/LautaroLeall/Servicios-LLDP)

[![Deploy with Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://servicios-lldp.vercel.app/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-%2B54%20381%20339%209463-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5493813399463)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lauldp)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LautaroLeall)

---

## 🌟 Estructura de la Plataforma & Funcionamiento

### 1. 🌀 Preloader Holográfico 3D (`Preloader.jsx` + `Preloader.css`)

- **Giroscopio Orbital 3D:** Construido con CSS 3D nativo (`perspective: 900px`, `transform-style: preserve-3d`), con tres anillos concéntricos que giran en ejes cruzados (Cyan Neón en $X:65^\circ$, Índigo en $X:45^\circ$, y órbita punteada Esmeralda).
- **Núcleo Central en Levitación:** Tarjeta acrílica dark glass suspendida en el eje Z (`translate3d(0, -6px, 20px)`) con el emblema oficial (`Logo_LLDP.png`), halo _ambient glow_ y respiración de escala.
- **Firma Editorial Boutique:** Tipografía refinada (`LAUTARO LEAL DEL PRETE • DESARROLLO WEB ✦ SISTEMAS A MEDIDA`) junto a una micro-barra láser animada.
- **Transición Fluida de Salida:** Integrado en `App.jsx` bajo `<AnimatePresence>` de Framer Motion, con desvanecimiento suave (_fade-out_ con escala) tras ~1.1s.

### 2. ⚡ Hero Section & 3D Interactive Flyer Deck (`Home.jsx`)

- **Columna Izquierda:** Insignia oficial con pulso en vivo, título de alto impacto visual, propuesta de valor resumida, selector interactivo de servicios 01–06 (chips compactos de una sola línea), botones de llamada a la acción (CTA) y franja de confianza (_Trato 1 a 1, 100% Responsive, Portafolio_).
- **Columna Derecha (Flyer Deck 3D):** Escenario tridimensional con efecto de cartas apiladas (_peek layers_), rotación automática cada 5.5s (pausable al pasar el cursor), mockup interactivo del servicio activo, paginación visual y acciones rápidas (ampliar ficha, cotizar y WhatsApp directo).
- **Marquee Ticker Continuo:** Cinta inferior infinita con las 6 soluciones destacadas.

### 3. 🍱 Catálogo Asimétrico Bento Grid (`ServicesGrid.jsx`)

- Grilla de 12 columnas inspirada en Bento UI, con distribución de anchos asimétricos (`span-7`, `span-5`, `span-6`) para dinamismo visual.
- Filtros por categoría en tiempo real (_Todos, Web & Tiendas, Sistemas & Eventos, Mejoras & Asesoría_).
- Cada tarjeta incluye topbar con número y categoría, título, descripción concisa, vista previa interactiva, checklist de características clave y botones directos de cotización y WhatsApp.

### 4. 🎡 Carrusel Coverflow 3D (`ServicesCarousel.jsx`)

- Selector central de pestañas con navegación fluida entre los 6 servicios.
- Controles de navegación laterales con flechas flotantes, soporte para gestos táctiles (_swipe_) en móviles y visualizador del mockup a gran escala.

### 5. 🛠️ Metodología Ágil en 4 Pasos (`Workflow.jsx`)

- Proceso claro de trabajo de punta a punta:
  - **Paso 01:** Idea y Diagnóstico _(Sin Cargo)_.
  - **Paso 02:** Propuesta Clara & Alcance _(A Medida)_.
  - **Paso 03:** Diseño y Desarrollo con muestras en tiempo real _(En Vivo)_.
  - **Paso 04:** Lanzamiento, entrega y soporte continuo _(100% Online)_.
- Bloque de pilares de valor: _Trato directo 1 a 1, 100% Responsive, Máxima velocidad y Proyectos reales en producción_.

### 6. 📝 Cotizador Interactivo en 3 Pasos & Contacto (`Contact.jsx`)

- **Paso 01 (Elegir Servicio):** Selección de cualquiera de los 6 servicios con actualización instantánea de opciones.
- **Paso 02 (Personalizar Funcionalidades & Plazo):** Chips interactivos de entregables específicos por servicio y selector de tiempos (_Urgente, Este mes, Sin apuro_).
- **Paso 03 (Datos & Envío Dual):**
  - **WhatsApp Directo:** Genera un brief técnico formateado y abre el chat de WhatsApp con un solo clic. Los datos personales son opcionales ya que el cliente contacta desde su número.
  - **EmailJS Automatizado:** Envío directo al correo electrónico con validación estricta de campos (Nombre completo, Email válido con regex, Comentario de la idea).
- **Barra Lateral de Canales:** Tarjetas directas de WhatsApp, enlace al Portafolio en vivo, Email corporativo y accesos rápidos a LinkedIn y GitHub.

### 7. 🔍 Ficha Técnica Modal con Sandbox (`ServiceDetailModal.jsx`)

- Ventana modal modular renderizada mediante `createPortal` con bloqueo de scroll de fondo y cierre mediante tecla `Escape`.
- **Barra de Progreso de Lectura:** Barra superior reactiva al scroll interno.
- **Sandbox Browser Frame:** Ventana estilo navegador con luces de tráfico interactivas, barra de URL semántica (`/servicios/[id]`) y mockup a escala completa.
- **Dossier Editorial:** Especificaciones técnicas, flujo de características numeradas, etiquetas de tecnologías/entregables, proyectos reales relacionados y barra de acciones inferior.

---

## 🎯 Catálogo Oficial de los 6 Servicios Web

1. **`01` Páginas Web** — _"Tu negocio, abierto las 24 hs."_
   - Sitios rápidos, prolijos y 100% responsive para celulares y computadoras con la identidad de tu marca, posicionamiento SEO y botón directo a tu WhatsApp.
   - _Proyectos reales:_ Levels GYM, MyM Decoraciones, Cesar Aparicio Estilista, BGA Habilitaciones, Krauft Inmobiliaria.

2. **`02` Sistemas de Gestión** — _"Turnos, stock y finanzas ordenados."_
   - Software web a medida que centraliza tu operación diaria: agenda de turnos online, control de productos e inventario, balance financiero y acceso multidispositivo.
   - _Proyectos reales:_ Club Natación y Gimnasia, CONFIA-CAR, NutriOliva.

3. **`03` Tienda Online** — _"Vendé online con tu propia tienda."_
   - E-commerce con catálogo interactivo, carrito de compras, integración de pagos (Mercado Pago), alertas de ventas y panel autoadministrable simple.
   - _Proyectos reales:_ Nova-SetUp, Fleeswap.

4. **`04` Invitaciones Digitales** — _"Invitaciones 100% Digitales (Calidad Premium)"_
   - Tarjetas digitales interactivas para cumpleaños infantiles, 15 años y eventos con música de fondo con ondas animadas, cuenta regresiva en vivo, ubicación interactiva en Google Maps, mesa de regalos (CBU/Alias) y confirmación RSVP directa a WhatsApp.
   - _Modelos reales:_ Cumple 5 de Sofía (K-Pop Rumi), Cumple 18 de Julián (Boca), Cumple 6 de Olivia (Stitch & Angel), XV de Karla (Fiesta), Misa de los 15 de Karla.

5. **`05` Mejora de tu Web** — _"¿Tu web quedó lenta? Mejorémosla."_
   - Auditoría previa y optimización integral bajo 3 pilares: **Velocidad** (carga < 1.2s), **Diseño UI/UX** moderno y adaptado a celulares, y **Nuevas Funcionalidades**.

6. **`06` Revisión de Presupuesto** — _"¿Ya tenés otro presupuesto? Te lo reviso."_
   - Comparativa técnica sin cargo y sin compromiso de presupuestos web de otros proveedores: revisión de alcance, detección de costos ocultos y propuesta optimizada todo incluido.

---

## ⚡ Rendimiento, Carga Inmediata & Optimización Móvil (iOS / Android)

- 🚀 **Reducción del 80% en el JavaScript Inicial:**
  - El bundle principal de arranque pasó de **295 kB** a **58.9 kB** (**18.7 kB comprimido con Gzip**).
  - El CSS principal se optimizó de **67.7 kB** a **47.8 kB** (**9.8 kB Gzip**).
- 📦 **Code Splitting & Precarga en Segundo Plano (`requestIdleCallback`):**
  - Carga inmediata de las secciones críticas (Navbar, Hero y Preloader).
  - División modular con `React.lazy` y `<Suspense>` para `ServicesGrid`, `ServicesCarousel`, `Workflow` y `Contact`.
  - Precarga asíncrona silenciosa de las secciones inferiores cuando el hilo principal del navegador queda libre (_idle_).
- 📱 **Sintonización GPU para Dispositivos Móviles (iOS Safari / WebKit):**
  - Eliminación total de pantallas negras iniciales gracias a la carga ultra-rápida.
  - Aceleración por hardware con `-webkit-transform: translate3d(0,0,0)` y reducción del radio de desenfoque a 48px en móviles para ahorrar un 80% de memoria gráfica en pantallas Retina.
  - Detección inteligente de puntero fino (`pointer: fine`) para desactivar eventos de mouse innecesarios en pantallas táctiles.
  - Soporte de viewport dinámico con `min-height: 100dvh` para evitar saltos de layout cuando Safari oculta la barra de direcciones.
- 🔤 **Fuentes de Google 100% No Bloqueantes:**
  - Carga asíncrona mediante `media="print" onload="this.media='all'"` y fallback `<noscript>`.
- 🔍 **SEO Técnico Completo:**
  - Metadatos Open Graph y Twitter Cards integrados con el logo oficial (`/Logo_LLDP.png`).
  - Datos estructurados **Schema.org** (`ProfessionalService`, `OfferCatalog` con los 6 servicios y `WebSite`).
  - `sitemap.xml` y `robots.txt` autogenerados y optimizados para indexación en Google.
- 🛡️ **Headers de Caché & Seguridad en Vercel (`vercel.json`):**
  - Caché inmutable para assets estáticos empaquetados (`Cache-Control: public, max-age=31536000, immutable`).
  - Cabeceras de seguridad estrictas: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 📁 Arquitectura de Archivos y Módulos CSS

Todos los estilos extensos fueron refactorizados y modularizados en submódulos ordenados de menos de 250 líneas cada uno:

```
src/
├── components/
│   ├── ui/
│   │   ├── AuroraMeshBackground.jsx / .css  # Fondo dinámico y grilla arquitectónica
│   │   └── Preloader.jsx / .css             # Preloader 3D holográfico con salida suave
│   ├── TopNavbar.jsx                        # Barra superior flotante boutique
│   ├── Home.jsx                             # Hero section y flyer deck 3D
│   ├── ServicesGrid.jsx                     # Catálogo Bento Grid 12 columnas
│   ├── ServicesCarousel.jsx                 # Carrusel Coverflow 3D
│   ├── Workflow.jsx                         # Metodología ágil en 4 pasos
│   ├── Contact.jsx                          # Cotizador en 3 pasos con WhatsApp & EmailJS
│   ├── ServiceMockup.jsx                    # Motor de mockups interactivos 01-06
│   └── ServiceDetailModal.jsx               # Ficha modal con sandbox y dossier
├── styles/
│   ├── home/         # heroContent.css, heroDeck.css, heroMarquee.css
│   ├── bento/        # bentoHeader.css, bentoCard.css
│   ├── mockups/      # mockupBase, mockupWeb, mockupSistema, mockupEcommerce, etc.
│   ├── modal/        # modalShell.css, modalSandbox.css, modalDossier.css
│   └── contact/      # contactWizard.css, contactSidebar.css, contactFooter.css
├── context/          # LanguageContext, ThemeContext, ModalContext
├── hooks/            # useLanguage, useTheme, useModal, useScrollSpy
├── data/             # servicesData.js (dataset con especificaciones completas)
└── translations/     # dictionary.js (diccionario bilingüe ES / EN)
```

---

## 🛠️ Stack Tecnológico

- **Frontend & Core:** React 19, Vite 7
- **Animaciones & Gestos:** Framer Motion 12
- **Iconografía:** Lucide React, React Icons
- **Envío de Formularios:** EmailJS SDK (con validación de campos)
- **Despliegue & Hosting:** Vercel (Edge Network)

---

## ⚙️ Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/LautaroLeall/Servicios-LLDP.git

# 2. Entrar a la carpeta
cd Servicios-LLDP

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```

---

> Desarrollado por **Lautaro Leal Del Prete** — _Desarrollo & Diseño Web_.  
> Tucumán, Argentina • WhatsApp: `+54 381 339 9463` • [servicios-lldp.vercel.app](https://servicios-lldp.vercel.app/)
