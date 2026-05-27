# BRIEFING COMPLETO — SITIO WEB CASPAR SCHOLS
## Para Claude Code / Visual Studio Code

---

## CONTEXTO DEL PROYECTO

Construir el sitio web completo de **Caspar Schols** — arquitecto, diseñador y artista holandés — en **vanilla HTML/CSS/JS** (sin frameworks). El sitio replica la estructura de su portfolio actual pero con estilo mejorado: más limpio, mejor mobile, más respirado.

**Estética:** Editorial minimalista. Negro sobre blanco. Tipografía elegante con peso. Espacios generosos. Como una revista de arquitectura de alto nivel.

---

## ESTRUCTURA DE ARCHIVOS

```
caspar-schols/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── pages/
│   ├── cabin-anna.html
│   ├── missing-room.html
│   ├── de-vice.html
│   ├── axis.html
│   ├── vortex.html
│   ├── chamber.html
│   ├── shroud.html
│   ├── lighting.html
│   ├── work-with-us.html
│   └── speaking-opportunities.html
└── assets/
    └── (todas las fotos y videos del usuario van aquí — mezcladas)
```

> **IMPORTANTE:** El usuario dejará TODAS las fotos y videos mezclados en la carpeta `assets/`. Claude Code debe referenciarlas usando los nombres de archivo tal como estén, asignándolas a los proyectos de forma lógica según el nombre o contexto visual. Usar `loading="lazy"` en todas las imágenes.

---

## TIPOGRAFÍA

Usar estas fuentes de Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Suisse+Int%27l:wght@300;400;500&display=swap" rel="stylesheet">
```

Alternativa si Suisse no carga:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

- **Display / títulos:** Cormorant Garamond (elegante, editorial)
- **Body / UI:** DM Sans (limpio, neutro)
- **Captions / datos técnicos:** DM Mono o JetBrains Mono

---

## VARIABLES CSS GLOBALES

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'DM Mono', monospace;

  --text-primary: rgba(0, 0, 0, 0.88);
  --text-secondary: rgba(0, 0, 0, 0.65);
  --text-muted: rgba(0, 0, 0, 0.40);
  --text-faint: rgba(0, 0, 0, 0.22);
  --border: rgba(0, 0, 0, 0.12);
  --border-strong: rgba(0, 0, 0, 0.25);
  --bg: #fafaf8;
  --white: #ffffff;

  --pad: clamp(1rem, 3vw, 2rem);
  --max-width: 1400px;

  --transition: 0.3s ease;
}
```

---

## RESET Y BASE

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  color: var(--text-primary);
  background: var(--bg);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
img, video { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
```

---

## HOMEPAGE — index.html

### Secciones en orden:

1. `#home-page` — Hero: video en loop + logo centrado
2. `#cabin-anna` — Preview proyecto
3. `#the-missing-room` — Preview proyecto
4. `#de-vice` — Preview proyecto
5. `#axis` — Preview proyecto
6. `#vortex` — Preview proyecto
7. `#chamber` — Preview proyecto
8. `#shroud` — Preview proyecto
9. `#lighting` — Preview proyecto
10. `#about-caspar` — Biografía

---

## NAVEGACIÓN FLOTANTE

Overlay fijo, transparente, no bloquea el scroll. Solo los links son clickeables.

```html
<nav class="floating-nav" id="floating-nav">
  <!-- Desktop: columna izquierda -->
  <div class="nav-col nav-left">
    <a href="#about-caspar">STUDIO CASPAR SCHOLS</a>
    <a href="pages/work-with-us.html">WORK WITH US</a>
    <a href="pages/speaking-opportunities.html">INVITE CASPAR TO SPEAK</a>
  </div>

  <!-- Desktop: columna derecha -->
  <div class="nav-col nav-right">
    <a href="#cabin-anna">CABIN ANNA</a>
    <a href="#the-missing-room">MISSING ROOM</a>
    <a href="#de-vice">DE-VICE</a>
    <a href="#axis">AXIS</a>
    <a href="#vortex">VORTEX</a>
    <a href="#chamber">CHAMBER</a>
    <a href="#shroud">SHROUD</a>
    <a href="#lighting">LIGHTING</a>
  </div>

  <!-- Back to top (aparece tras scroll) -->
  <div class="nav-backtop" id="back-to-top">
    <a href="#home-page">↑ BACK TO TOP</a>
  </div>

  <!-- Mobile: botón hamburguesa -->
  <button class="nav-toggle" id="nav-toggle" aria-label="Menu">MENU</button>
</nav>

<!-- Mobile drawer -->
<div class="mobile-nav" id="mobile-nav">
  <button class="mobile-nav-close" id="mobile-nav-close">✕</button>
  <div class="mobile-nav-links">
    <a href="#cabin-anna">CABIN ANNA</a>
    <a href="#the-missing-room">THE MISSING ROOM</a>
    <a href="#de-vice">DE-VICE</a>
    <a href="#axis">AXIS</a>
    <a href="#vortex">VORTEX</a>
    <a href="#chamber">CHAMBER</a>
    <a href="#shroud">SHROUD</a>
    <a href="#lighting">LIGHTING</a>
    <hr>
    <a href="#about-caspar">ABOUT CASPAR</a>
    <a href="pages/work-with-us.html">WORK WITH US</a>
    <a href="pages/speaking-opportunities.html">INVITE CASPAR TO SPEAK</a>
  </div>
</div>
```

```css
.floating-nav {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  padding: var(--pad);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.floating-nav a, .floating-nav button {
  pointer-events: auto;
}
.nav-col { display: flex; flex-direction: column; gap: 0.3rem; }
.nav-col a {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  transition: opacity var(--transition);
}
.nav-col a:hover { opacity: 0.5; }
.nav-backtop {
  position: absolute;
  top: var(--pad);
  right: var(--pad);
  opacity: 0;
  transition: opacity var(--transition);
}
.nav-backtop.visible { opacity: 1; }
.nav-backtop a {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.nav-toggle {
  display: none;
  background: rgba(255,255,255,0.92);
  border: none;
  padding: 0.5rem 0.8rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

/* Mobile nav drawer */
.mobile-nav {
  display: none;
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(300px, 85vw);
  background: var(--white);
  z-index: 1000;
  padding: 2rem 1.5rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
}
.mobile-nav.open { transform: translateX(0); }
.mobile-nav-close {
  background: none; border: none;
  font-size: 1.2rem; cursor: pointer;
  margin-bottom: 2rem; display: block;
}
.mobile-nav-links { display: flex; flex-direction: column; gap: 0.8rem; }
.mobile-nav-links a {
  font-size: 0.85rem; font-weight: 500;
  letter-spacing: 0.06em;
}
.mobile-nav-links hr {
  border: none; border-top: 1px solid var(--border);
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .nav-left, .nav-right, .nav-backtop { display: none; }
  .nav-toggle { display: block; }
  .mobile-nav { display: block; }
}
```

---

## SECCIÓN HERO — #home-page

```html
<section id="home-page" class="section hero">
  <div class="hero-logo">
    <img src="assets/logo.png" alt="Caspar Schols" class="logo">
  </div>
  <div class="hero-video-wrap">
    <video autoplay muted loop playsinline class="hero-video">
      <source src="assets/[video-principal].mp4" type="video/mp4">
    </video>
  </div>
</section>
```

```css
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--pad);
  gap: 2rem;
}
.hero-logo { text-align: center; }
.hero-logo .logo { width: clamp(80px, 12vw, 160px); margin: 0 auto; }
.hero-video-wrap {
  width: min(80vw, 900px);
  aspect-ratio: 16/9;
  overflow: hidden;
}
.hero-video { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 768px) {
  .hero-video-wrap { width: 100%; }
}
```

---

## SECCIONES DE PROYECTOS (homepage previews)

Patrón consistente para cada proyecto:

```html
<section id="cabin-anna" class="section project-preview">
  <div class="project-image-wrap">
    <a href="pages/cabin-anna.html">
      <img src="assets/[foto-cabin-anna].jpg" alt="Cabin ANNA" loading="lazy">
    </a>
  </div>
  <div class="project-meta-row">
    <div class="project-meta-left">
      <p class="project-specs">
        <strong>CABIN ANNA</strong><br>
        Oregon Pine, Stainless steel<br>
        Edition of 365 + 1AP<br>
        ~13m × 4.5m × 4.5m<br>
        <br>
        © Caspar Anne Schols<br>
        Photo: Oliver Parini
      </p>
      <p class="project-desc">
        Cabin ANNA challenges the idea of a fixed enclosure, instead offering a space that shifts with weather, light, and use...
      </p>
    </div>
    <div class="project-meta-right">
      <a href="pages/cabin-anna.html" class="see-more">SEE MORE →</a>
    </div>
  </div>
</section>
```

```css
.project-preview {
  padding: clamp(3rem, 8vw, 6rem) var(--pad);
  border-top: 1px solid var(--border);
}
.project-image-wrap {
  width: min(75%, 1100px);
  margin: 0 auto 2.5rem;
  overflow: hidden;
}
.project-image-wrap img {
  width: 100%;
  transition: transform 0.6s ease;
}
.project-image-wrap:hover img { transform: scale(1.02); }
.project-meta-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  max-width: min(75%, 1100px);
  margin: 0 auto;
}
.project-specs {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}
.project-desc {
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.7;
  max-width: 60ch;
}
.see-more {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: underline;
  white-space: nowrap;
  align-self: start;
  margin-top: 0.25rem;
  transition: opacity var(--transition);
}
.see-more:hover { opacity: 0.5; }

@media (max-width: 768px) {
  .project-image-wrap { width: 100%; }
  .project-meta-row {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}
```

---

## DATOS DE CADA PROYECTO — HOMEPAGE

### #cabin-anna
- **Materiales:** Oregon Pine, Stainless steel
- **Edición:** Limited series of 365 + 1AP
- **Dimensiones:** ~13m × 4.5m × 4.5m (~42 ft × 14.5 ft × 14.5 ft)
- **Foto:** Oliver Parini
- **Descripción:** Cabin ANNA challenges the idea of a fixed enclosure, instead offering a space that shifts with weather, light, and use. ANNA opens and closes in response to its surroundings, inviting a continuous interaction between body, space, and landscape.
- **Link:** pages/cabin-anna.html

### #the-missing-room
- **Materiales:** Stainless steel
- **Edición:** Edition of 1
- **Dimensiones:** ~4m × 4m × 7m (~13 ft × 13 ft × 23 ft)
- **Foto:** Genevieve Lutkin
- **Descripción:** The Missing Room has escaped the rigid confines of a defined house, choosing to exist without walls or a ceiling – a place where nature becomes the main inhabitant and visitors are invited to act as respectful guests.
- **Link:** pages/missing-room.html

### #de-vice
- **Materiales:** Steel, Gold, Stone
- **Edición:** Edition of 3 + 1AP
- **Dimensiones:** ~6m × 4m × 7m (~20 ft × 13 ft × 23 ft)
- **Foto:** Jorrit 't Hoen
- **Descripción:** De-Vice is the first work in the Aperture series. After entering the space, the participant engages a set of pedals that slowly remove the glass enclosure in opposing directions.
- **Link:** pages/de-vice.html

### #axis
- **Materiales:** Wood, Steel, Gold, Stone
- **Edición:** Edition of 3 + 1AP
- **Dimensiones:** ~4m × 4m × 7m (~13 ft × 13 ft × 23 ft)
- **Foto:** Jorrit 't Hoen
- **Descripción:** Axis is a raised meditation space which rotates around its axis. It is a play on the fact that when we are in a disconnected, dark room, we cannot imagine the world outside of that space anymore.
- **Link:** pages/axis.html

### #vortex
- **Materiales:** Wood, Steel, Stone
- **Edición:** Edition of 3 + 1AP
- **Dimensiones:** ~4m × 4m × 7m (~13 ft × 13 ft × 23 ft)
- **Foto:** Jorrit 't Hoen
- **Descripción:** Vortex is a dwelling suspended 5 meters above the ground. Dwelling rituals are exaggerated because of the small space; demanding careful rituals of transforming the layout before eating, making tea, sleeping, cooking, socializing.
- **Link:** pages/vortex.html

### #chamber
- **Materiales:** Wood, Steel
- **Edición:** Edition of 1
- **Dimensiones:** ~5m × 5m × 9m (~16.5 ft × 16.5 ft × 29.5 ft)
- **Foto:** Jorrit 't Hoen
- **Descripción:** The Chamber is a vertically oriented residence. Its walls slide up and down to play with the threshold by turning a wheel, one for each wall, directed North, East, South, and West.
- **Link:** pages/chamber.html

### #shroud
- **Materiales:** Jute
- **Edición:** Edition of 1
- **Dimensiones:** ~7m × 7m × 5m (~23 ft × 23 ft × 16.5 ft)
- **Foto:** Caspar Anne Schols
- **Descripción:** A site-responsive installation in Dorset's Hooke Park, part of the UK's Architectural Association's woodland campus.
- **Link:** pages/shroud.html

### #lighting
- **Descripción:** Select, limited works inspired by the architectural installations.
- **Link:** pages/lighting.html

---

## SECCIÓN ABOUT CASPAR

```html
<section id="about-caspar" class="section about">
  <div class="about-grid">
    <div class="about-image-col">
      <img src="assets/[retrato-caspar].jpg" alt="Caspar Schols" loading="lazy">
      <div class="about-contact">
        <a href="mailto:info@casparschols.com">info@casparschols.com</a>
        <a href="https://www.instagram.com/casparschols/" target="_blank" rel="noopener">
          <img src="assets/instagram-icon.png" alt="Instagram" class="social-icon">
        </a>
      </div>
    </div>
    <div class="about-text-col">
      <h2 class="section-label">ABOUT</h2>
      <!-- Texto completo de la bio — ver más abajo -->
    </div>
  </div>
</section>
```

**Texto completo de la biografía:**

> Caspar Schols is a Dutch designer, architect and artist whose installations explore ritual and presence. He is best known for creating Cabin ANNA, a kinetic wooden structure that has garnered international acclaim for its poetic responsiveness to landscape and human experience. He currently leads Studio Caspar Schols, Cabin ANNA, and is co-founder of the Carroccera Collective. The collective's mission is to radically rethink the way we live within the natural landscape.

> Raised as the youngest of four brothers in a house on the edge of the forest, Caspar spent his youth building shelters—on the ground, in trees, and always deeply embedded in nature. This early connection to the natural world and the act of making continues to inform his spatial sensibility. Initially drawn to the mysteries of black holes and quantum mechanics, he studied physics at the University of Amsterdam, earning both his BSc and MSc degrees.

> In 2015, while conducting research at chip manufacturer ASML during his final year of graduate studies, Caspar was also accepted into the introductory year at the Gerrit Rietveld Academy of Arts. That same year, following the sudden passing of his father—a builder and nature enthusiast—Caspar spent several months alone in the Swedish wilderness. That period of reflection seeded what would later become ANNA.

> In 2016, in response to a request from his mother, Caspar designed and hand-built Garden House, a modest guest pavilion nestled in the forest. This self-initiated project gained widespread attention online and was recognized with nominations for the Radical Innovation Award (New York) and the Dezeen Small Building Longlist (London). De Architect magazine named it one of the three most popular Dutch architectural projects of 2017; Caspar was included on the 2017 Dezeen Hotlist. The momentum from this project led to a scholarship at the Architectural Association in London (2016–2019).

> Caspar sees architecture as a medium not for separation from the natural world, but as a means to connect more deeply with it. His designs invite ritual, slowness, and heightened awareness—qualities that lie at the heart of Cabin ANNA and his broader body of work.

> Selected from 5,000 project entries worldwide, ANNA won the Architizer A+ Project of the Year in 2021 and World Hotel Building of the Year at the World Architecture Festival in 2022. ANNA Collection was selected as one of the top three most innovative architecture projects in the Netherlands by the Arc22 Dutch Architecture Awards and won the FRAME Awards 2023. In November 2023, it was a winner at the AHEAD Awards Europe.

> Caspar's work has been widely featured in international publications including The New York Times, The Guardian, The Architectural Review, a+u, Frame Magazine, Dezeen, ArchDaily, Dwell, Architizer, and Gestalten. ANNA was also selected to be featured in L'Architecture d'Aujourd'hui by guest editor Philippe Starck in 2021.

---

## TEMPLATE BASE — PÁGINAS DE DETALLE

Todas las subpáginas comparten esta estructura:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Proyecto] — Caspar Schols</title>
  <link rel="stylesheet" href="../css/style.css">
  <!-- Google Fonts aquí -->
</head>
<body class="project-detail-page">

  <!-- Header -->
  <header class="detail-header">
    <a href="../index.html" class="back-logo">
      <img src="../assets/logo.png" alt="Caspar Schols">
    </a>
  </header>

  <!-- Galería superior (freeform / grid) -->
  <section class="detail-gallery-top">
    <!-- 3-4 imágenes en layout libre o grid -->
  </section>

  <!-- Contenido principal -->
  <section class="detail-content">
    <div class="detail-text-col">
      <h1 class="project-title">[NOMBRE]</h1>
      <div class="project-specs-block">
        <!-- datos técnicos -->
      </div>
      <div class="project-description">
        <!-- texto -->
      </div>
    </div>
    <div class="detail-sidebar">
      <!-- press, awards, links -->
    </div>
  </section>

  <!-- Galería slideshow principal -->
  <section class="detail-slideshow">
    <div class="slideshow" data-slideshow>
      <!-- imágenes -->
    </div>
    <div class="slideshow-controls">
      <button class="prev" aria-label="Previous">←</button>
      <button class="next" aria-label="Next">→</button>
    </div>
  </section>

  <!-- Footer disclaimer -->
  <footer class="detail-footer">
    <p><em>Information on this website is for general purposes only and may not always be accurate, complete, or up to date.</em></p>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

---

## PÁGINAS DE DETALLE — CONTENIDOS

### pages/cabin-anna.html

**Galería top:** 3 imágenes en grid de 3 columnas

**Texto principal (col izquierda, span 4):**
- Título: CABIN ANNA
- Location: Global, including The Netherlands, USA, Iceland, Turkey, and Belgium.
- Limited series of 365 — email info@casparschols.com for more information

Descripción:
> Cabin ANNA began as a one-off project for Caspar Schols' mother; a structure that could adapt to her changing needs and moods. After the project went viral on Dezeen and received international press attention, it became clear that many people long for the same thing: a living space that flexibly responds to weather, seasons, solitude, and company. Today, cabin ANNA is a highly engineered, site-specific retreat, built all over the world and across climate conditions.
>
> ANNA consists of two shells, designed to slide over one another. Each offers a different kind of access to the natural world and its rhythms; protection from sun and wind when needed, and the ability to be fully immersed in the sounds, smells, and experience of nature. ANNA offers protection without isolation, and comfort without detachment.

Links:
- [www.cabin-anna.com](https://www.cabin-anna.com/)
- [@cabin_anna](https://www.instagram.com/cabin_anna/)

**Sidebar (col derecha):**

PRESS:
- [The New York Times](https://www.nytimes.com/2024/11/01/realestate/small-tiny-house-cabin.html)
- [l'Architecture d'Aujourd'hui Hors 47](https://www.archipress-editions.fr/products/hs-47-cabin-anna)
- [Dezeen](https://www.dezeen.com/tag/caspar-schols/)
- [Forbes](https://www.forbes.com/sites/jimdobson/2023/11/22/the-worlds-100-best-new-hotels-according-to-the-2023-ahead-awards/)
- [Architizer](http://architizer.com/blog/inspiration/stories/caspar-schols-architectural-flexibility/)
- [ELLE](https://www.cabin-anna.com/media/2021-elle-decoration-nl-hutje-op-de-hei.pdf)
- [Cosmopolitan](https://www.cabin-anna.com/media/202310-cosmopolitan-travel-up.pdf)
- [Dwell](https://www.dwell.com/article/cabin-anna-prefab-modular-tiny-home-eco-retreat-1665d9fb)
- [Designboom](https://www.designboom.com/architecture/woods-desert-ten-cabins-blend-nature-08-11-2023/)
- [The Guardian](https://www.theguardian.com/travel/2021/oct/23/10-of-the-best-eco-friendly-places-to-stay-in-europe)
- [l'Architecture d'Aujourd'hui](https://www.cabin-anna.com/media/aa-444-projet-caspar-schols.pdf)
- [Metropolis](https://www.cabin-anna.com/media/201711-metropolis-pdf-not-your-grandfathers-cabin.pdf)

AWARDS:
- AHEAD Awards – Winner
- FRAME Awards – Winner
- World Architecture Festival – World Hotel Building of the Year
- Architizer A+ Awards – Project of the Year
- ARC22 Innovation Awards – Winner
- Radical Innovation Award – Winner

**Sección video:** video centrado (~80% ancho)

**Slideshow:** tantas imágenes de cabin-anna como haya en assets/

---

### pages/missing-room.html

**Galería top:** 3 imágenes freeform (overlapping — usar posicionamiento relativo con offsets)

**Texto (dos columnas):**
- Título: MISSING ROOM
- Location: Piedmont, Italy
- Designed for: [Carroccera Collective](https://carroccera.com/)
- Limited series of 1

Descripción columna izq:
> At the core of the Missing Room stands a seven-meter-tall monolith: a multifunctional chimney. On one side, the fire powers the ovens, while on the other, it heats water for bathing and warms the area at the front of the space. This towering form responds to the scale of the surrounding trees, rising like a beacon above the canopies, marking its presence in the landscape and guiding visitors with its smoke signals. Concealed doors house two cooking ovens integrated with the chimney's extraction system. Together with the water features, these elements form the heart of the room.
>
> Water, like fire, plays a central role in activating the hidden features of the structure. The water flow is released at the entrance of the structure, filling the main collection channel that distributes the flow into various basins throughout the structure. Users are encouraged to interact with the water systems by adding or removing plugs as needed to direct the flow.

Descripción columna der:
> The bath next to the water channel has a built-in natural convection system and fits three to four people. For solo use, the bath's size can be reduced with a partitioning panel to conserve water. Once closed, the bath can be transformed into a heated surface and used as a resting place to sleep.
>
> A sail canopy can be set up to offer shade or protection from rain. By day, the canopy catches dappled shadows cast by the surrounding foliage; by night, it reflects light from built-in recessed lighting, transforming the structure into a glowing lantern.
>
> To protect the land, the modular structure and use of a non-invasive screw-pile foundation ensures that no traces are left behind if the house is required to be removed from the site. The stainless steel refuge is durable, recyclable and resistant to weathering.

PRESS:
- [FRAME](https://frameweb.com/project/the-missing-room)
- [Thisispaper](https://thisispaper.com/mag/missing-room-carroccera-collective)
- [ArchDaily](https://www.archdaily.com/1030385/the-missing-room-carroccera-collective)
- [Dezeen](https://www.dezeen.com/2025/03/14/carroccera-collective-the-missing-room-pavilion/)
- [DesignBoom](https://www.designboom.com/architecture/carroccera-collective-open-air-steel-house-italian-forest-ritualistic-living-missing-room-05-19-2025/)
- [Elle Decor Italy](https://www.elledecor.com/it/architettura/a65611991/architettura-in-monferrato/)

**Sección video:** video autoplay muted loop centrado

---

### pages/de-vice.html

**Texto:**
- Título: DE-VICE
- Location: The Netherlands
- Limited series of 3 — email info@casparschols.com

Descripción:
> De-Vice is the first work in the Aperture series. It returns to the core of being, stripping the idea of 'home' back to its most essential elements. A steel frame and ladder lead to a steel volume elevated six meters above the ground, clad in gold inside.
>
> After entering, the participant engages a set of pedals that gradually open the enclosure in opposing directions. The boundary between inside and outside is not removed at once, but slowly displaced, shifting perception from the finite toward the infinite.
>
> The work draws on principles of embodied cognition, where perception is shaped through physical action. By placing control in the body of the participant, De-Vice treats movement as a cognitive act. Through effort, rhythm, and duration, it becomes a tool to refresh one's sense of the universe, reconnecting the individual to a larger, infinite whole.
>
> At night De-Vice becomes a seven meter tall lantern in the landscape.

**Galerías:** 2 slideshows + galería de 5 imágenes en fila + galería de 3 imágenes

---

### pages/axis.html

**Galería top:** 4 imágenes en grid de 4 columnas

**Texto:**
- Título: AXIS
- Limited series of 3 — email info@casparschols.com

Descripción:
> Axis is a raised meditation space which rotates around its axis. It shares a core with De-Vice, but is slightly larger and invites longer inhabitation. One can make tea, prepare a simple meal, or sleep within it, allowing daily rituals to extend and deepen the experience. Composed of two layers, one of wood and one of glass, it creates a gradual unfolding of experience.
>
> By opening the different layers step by step, one slowly opens up to a new cosmos. From pitch dark, Axis first reveals bright light, then shapes, then sound. Eventually, by opening the glass layer, smells and wind are introduced. The transition is not immediate, but paced through the body.
>
> The work draws on principles of embodied cognition, suggesting that perception is shaped through physical action. By placing control in the hands of the participant, Axis treats movement as a cognitive act, shifting awareness from a closed, finite reality toward a more expansive one.
>
> Axis is a play on the fact that when we are in a disconnected, dark room, we cannot imagine the world outside of that space anymore. Our world becomes defined by the limits of that enclosure, until it opens.

**Galerías:** imagen grande individual + grid 4 imágenes + video pequeño centrado

---

### pages/vortex.html

**Galería top:** 4 imágenes en grid de 4 columnas

**Texto:**
- Título: VORTEX
- Limited series of 3 — email info@casparschols.com

Descripción:
> Vortex is a dwelling suspended 5 meters above the ground that allows you to reveal the sun using a large shading sail mounted above, and open up to the wind by rotating a set of split glass layers. Each is carried by a steel moment frame and moved by hand. Vortex is equipped with everything you need to live comfortably, but dwelling rituals are exaggerated because of the small space; demanding careful rituals of transforming the layout before eating, making tea, sleeping, cooking, socializing. Putting emphasis on each ritual as an opportunity to become a gateway in themselves. The structure is not permanently fixed to the ground but held in place by three, 3000 kilogram rocks dating back to the ice age. In the Netherlands, it is these kind of rocks that were used to build 'Hunebedden', communal graves for farmers around 3000 BC. In this way, Vortex remains not just attached to the ground, but connected to the earth and the primal rituals that are intrinsic to our humanity.

**Galerías:** slideshow + video pequeño

---

### pages/chamber.html

**Galería top:** 3 imágenes en layout freeform

**Texto:**
- Título: CHAMBER
- Limited series of 1

Descripción:
> The Chamber is a vertically oriented home. It's a 'home' which finds its place in the cosmos through the operation of four sliding walls. Its walls slide up and down to play with the threshold by turning a wheel, one for each wall, directed North, East, South, and West. Movement is achieved with human power only. As a morning ritual, one can slowly connect with the cosmos in each geographic direction by moving the walls one by one.

**Galería:** slideshow de imágenes

---

### pages/shroud.html

**Galería top:** 3 imágenes en grid

**Texto:**
- Título: SHROUD
- Limited series of 1

Descripción:
> Spun between trees in AA's Hooke Park, 'Shroud' explores what it means to be at home in the wider universe. Fully embracing life by living connected to our natural environment, while staying aware of our fragile state of existence. Shroud is a portable home that wraps you and your loved ones together during and after life — it grows as part of the forest and according to the needs of its occupants.

**Galería:** slideshow de imágenes

---

### pages/lighting.html

**Galería top:** 4 imágenes freeform

**Intro:** Handmade by Caspar Schols. Purchase inquiries: info@casparschols.com

**5 productos, cada uno con:**
- Galería propia (2-4 fotos en slideshow)
- Nombre, edición, materiales, dimensiones
- "Price available upon request"

| Producto | Edición | Materiales | Dimensiones |
|---|---|---|---|
| Fly By | Limited run of 7 | Brass, paper, rock, LED | 90cm × 25 × 60 H |
| Free Space | Limited run of 7 | Brass, resin, LED | 55cm × 15 × 35 H |
| Panorama 1 | Limited run of 7 | Brass, resin, paper, LED | 22cm × 10 × 245 H |
| Panorama 2 | Limited run of 7 | Brass, resin, paper, LED | 12cm × 12 × 200 H |
| Prelude | Limited run of 7 | Glass, LED, metal (collab. Nacha Palomeque Coll) | 10cm × 20 × 120 H |

---

### pages/work-with-us.html

**Galería top:** 3 imágenes freeform

**Título:** WORK WITH CASPAR SCHOLS
**Ubicación:** Based in The Netherlands

Descripción:
> Based in The Netherlands, Caspar and his team work on site-specific independent art projects, spatial interventions and adaptations of existing structures. He also works on temporary- and permanent shelters and art-installations in collaboration with clients.
>
> His independent sculptures, featured on this site, are available in limited series and can be acquired by commission. Caspar is also interested in developing new concepts for intervening in a landscape or existing structure and in creating new objects for collectors, galleries and museums.

**CTA:** [Get in touch →](mailto:info@casparschols.com)

---

### pages/speaking-opportunities.html

**Media top:** video autoplay + 2 imágenes

**Título:** INVITE CASPAR TO SPEAK
**Ubicación:** Globally

Descripción:
> Caspar has given talks about architecture as a basis for performing rituals and for experiencing a sense of place, especially through reconnecting to nature, to one's own body, and to the cosmos.
>
> His work is not only shaped by his own experiences with life, but also with the home as an active gateway to its natural- and metaphysical surroundings.
>
> Caspar's work has been represented in a wide range of media, including The New York Times, Dezeen, ArchDaily and many others. He has spoken at the Venice Biennale and at The Architectural Association (AA), one of the UK's premier architectural schools, where he also studied.

**CTA:** [Get in touch →](mailto:info@casparschols.com)
**Instagram:** [@casparschols](https://www.instagram.com/casparschols/)

---

## JS — main.js

Implementar estas funcionalidades en vanilla JS:

```javascript
// 1. SLIDESHOW
// Selector: [data-slideshow]
// Controles: botones .prev y .next dentro del mismo contenedor padre
// Comportamiento: fade o slide, loop infinito
// Touch/swipe support en mobile

// 2. MENÚ MOBILE
// Toggle #nav-toggle → abre/cierra .mobile-nav con clase .open
// Cerrar al hacer click en link o en #mobile-nav-close
// Cerrar al hacer click fuera del drawer

// 3. BACK TO TOP
// Mostrar #back-to-top cuando scrollY > window.innerHeight
// Clase .visible en .nav-backtop

// 4. SMOOTH SCROLL a anchors #hash
// Ya cubierto por scroll-behavior: smooth en CSS

// 5. FREEFORM GALLERY en mobile
// Si viewport < 768px, convertir .freeform-gallery a scroll horizontal con snap

// 6. LAZY LOADING
// Todas las imágenes ya tienen loading="lazy" en HTML
// Opcional: IntersectionObserver para fade-in al entrar en viewport

// 7. MENÚ MOBILE — cerrar al navegar
// Al hacer click en cualquier link del .mobile-nav, cerrar el drawer y smooth scroll
```

---

## RESPONSIVE — BREAKPOINTS

```css
/* Mobile: < 480px */
/* Tablet: 480px – 768px */
/* Desktop: > 768px */
/* Wide: > 1200px */

@media (max-width: 768px) {
  /* Nav: mostrar botón MENU, ocultar floating nav */
  /* Hero video: width 100% */
  /* Project previews: imagen full width, meta en columna única */
  /* Galerías grid: 2 columnas → 1 columna */
  /* Freeform galleries: scroll horizontal */
  /* About: columna única */
  /* Lighting products: stackear imagen + specs */
}

@media (max-width: 480px) {
  /* Reducir padding a 1rem */
  /* Títulos más pequeños */
  /* Menú mobile ocupa full width */
}
```

---

## FOOTER (todas las páginas)

```html
<footer class="site-footer">
  <p class="footer-disclaimer">
    <em>Information on this website is for general purposes only and may not always be accurate, complete, or up to date.</em>
  </p>
</footer>
```

```css
.site-footer {
  padding: 3rem var(--pad);
  border-top: 1px solid var(--border);
  text-align: center;
}
.footer-disclaimer {
  font-size: 0.75rem;
  color: var(--text-muted);
}
```

---

## NOTAS FINALES PARA CLAUDE CODE

1. **Las imágenes están TODAS en `assets/` mezcladas** — asígnalas a proyectos de manera lógica por nombre de archivo. Si un archivo se llama `cabin-anna-01.jpg`, va en cabin anna. Si los nombres no son claros, distribuirlas equitativamente.

2. **Un video en la homepage** como loop de fondo/hero — usar el primer `.mp4` que encuentres en assets/.

3. **Videos en páginas de detalle** — Missing Room y Speaking Opportunities tienen video autoplay muted.

4. **Estética:** Minimalista editorial. Sin colores, solo negro/blanco/gris. Tipografía con carácter. Espacios generosos.

5. **Responsivo completo** — debe funcionar perfecto en mobile, tablet y desktop.

6. **Sin dependencias externas** excepto Google Fonts. No usar jQuery, Bootstrap, ni ningún otro framework.

7. **Accesibilidad básica:** alt en imágenes, aria-labels en botones, landmarks HTML semánticos (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`).

8. **Performance:** `loading="lazy"` en todas las imágenes excepto la primera visible (hero logo).

9. **El logo** va en `assets/logo.png` — usarlo en header de homepage (centrado, ~120px) y en header de subpáginas (esquina superior izquierda, ~80px, linkea a index.html).

10. **Hover states** en todas las imágenes: scale(1.02) con transition suave. En links: opacity 0.5.
