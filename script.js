// Los enlaces de sección funcionan también sin JavaScript.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const mobile = window.matchMedia("(max-width: 768px)");
function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = mobile.matches && !open;
}
function syncMenu() {
  menuButton.hidden = !mobile.matches;
  setMenu(false);
}
menuButton.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && mobile.matches) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuButton.focus();
  }
});
mobile.addEventListener("change", syncMenu);
syncMenu();
// Indica la sección visible sin mover el enfoque del teclado.
const links = [...navigation.querySelectorAll("a")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const active = link.hash === `#${visible.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-5% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}

// Mejora progresiva: no hay estado oculto previo ni listeners de scroll.
// El visor y sus contenedores quedan fuera de las animaciones.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Las imágenes de Experiencia y GAMES solo se mueven cuando están visibles.
const experienceImages = [...document.querySelectorAll('.experience-images .experience-item, .games-track .game-card')];
if ('IntersectionObserver' in window) {
  const visibleExperience = new Set();
  const syncExperienceMotion = () => experienceImages.forEach(card => {
    card.classList.toggle('is-motion-visible', visibleExperience.has(card) && !document.hidden && !reducedMotion.matches);
  });
  const experienceMotionObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) visibleExperience.add(target);
      else visibleExperience.delete(target);
    });
    syncExperienceMotion();
  }, { threshold: 0.15 });
  experienceImages.forEach(card => experienceMotionObserver.observe(card));
  document.addEventListener('visibilitychange', syncExperienceMotion);
  reducedMotion.addEventListener('change', syncExperienceMotion);
}
// Mando Xbox: efectos de la referencia limitados al HUD de la columna izquierda.
const xboxHud = document.querySelector('#xboxHud');
if (xboxHud) {
  const model = xboxHud.querySelector('.xp-model-tilt');
  let activationTimer;
  let pointerFrame;
  let visible = !('IntersectionObserver' in window);
  let entered = false;
  const resetTilt = () => {
    cancelAnimationFrame(pointerFrame);
    model.style.transform = '';
    xboxHud.style.setProperty('--cursorX', '50%');
    xboxHud.style.setProperty('--cursorY', '50%');
  };
  const activate = () => {
    if (reducedMotion.matches || !visible || document.hidden) return;
    clearTimeout(activationTimer);
    xboxHud.classList.remove('xp-activate');
    void xboxHud.offsetWidth;
    xboxHud.classList.add('xp-activate');
    activationTimer = setTimeout(() => xboxHud.classList.remove('xp-activate'), 1700);
  };
  const syncMotion = () => {
    const stopped = !visible || document.hidden || reducedMotion.matches;
    xboxHud.classList.toggle('xp-paused', stopped);
    if (stopped) {
      clearTimeout(activationTimer);
      xboxHud.classList.remove('xp-activate');
      resetTilt();
    } else if (!entered) {
      entered = true;
      activate();
    }
  };
  xboxHud.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !visible || document.hidden ||
        !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
        (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = xboxHud.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      xboxHud.style.setProperty('--cursorX', `${(x * 100).toFixed(1)}%`);
      xboxHud.style.setProperty('--cursorY', `${(y * 100).toFixed(1)}%`);
      model.style.transform = `perspective(850px) rotateX(${((0.5 - y) * 9).toFixed(1)}deg) rotateY(${((x - 0.5) * 12).toFixed(1)}deg)`;
    });
  }, { passive: true });
  xboxHud.addEventListener('pointerleave', resetTilt);
  xboxHud.addEventListener('pointercancel', resetTilt);
  xboxHud.addEventListener('click', activate);
  xboxHud.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!event.repeat) activate();
    }
  });
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    }, { threshold: 0.1 }).observe(xboxHud);
  }
  syncMotion();
}

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealTargets = document.querySelectorAll(
    ".hero-copy, .hero-photo, .offer-strip, .section h2, .section-intro, " +
    ".experience-item, .gallery-photo, .gallery-note, .location-grid",
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      revealObserver.unobserve(target);
      if (reducedMotion.matches || target.contains(document.activeElement)) return;
      target.classList.add("reveal-once");
      target.addEventListener("animationend", () => {
        target.classList.remove("reveal-once");
      }, { once: true });
    });
  }, { threshold: 0.08 });

  revealTargets.forEach((target) => {
    if (target.matches(".experience-item, .gallery-photo")) {
      const index = [...target.parentElement.children].indexOf(target);
      target.style.setProperty("--reveal-delay", `${Math.min(index, 2) * 60}ms`);
    }
    revealObserver.observe(target);
  });
  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    revealObserver.disconnect();
    revealTargets.forEach((target) => target.classList.remove("reveal-once"));
  });
  // El foco y la navegacion por anclas nunca esperan a una entrada decorativa.
  document.addEventListener("focusin", (event) => {
    const target = event.target.closest(".reveal-once");
    if (target) target.classList.remove("reveal-once");
  });
}

// TARGET / LOCK: activación táctil/teclado sin interceptar las acciones reales.
document.querySelectorAll('.target-lock').forEach(button => {
  let releaseTimer;
  let activation;
  button.addEventListener('click', () => {
    clearTimeout(releaseTimer);
    button.classList.add('is-lock-active');
    releaseTimer = setTimeout(() => button.classList.remove('is-lock-active'), 620);
    if (button.classList.contains('target-lock-primary') && !reducedMotion.matches) {
      activation?.cancel();
      // Pulso de brillo original del demo 360°, limitado al botón, no al visor.
      activation = button.animate([
        { filter: 'brightness(1)' },
        { filter: 'brightness(1.8)' },
        { filter: 'brightness(1)' },
      ], { duration: 620, easing: 'ease-out' });
    }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) activation?.cancel();
  });
});

// Street View se solicita únicamente al activar el recorrido.
const tourPanel = document.querySelector('#street-view-panel');
const tourEmbed = document.querySelector('#street-view-embed');
const tourOpen = document.querySelector('#tour-open');
const tourClose = document.querySelector('#tour-close');
const tourStatus = document.querySelector('#tour-status');
if (tourPanel && tourEmbed && tourOpen && tourClose && tourStatus) {
  let closeTimer;
  let loadTimer;
  let ready = false;
  tourOpen.hidden = false;
  tourEmbed.addEventListener('load', () => {
    if (!tourEmbed.hasAttribute('src')) return;
    ready = true;
    clearTimeout(loadTimer);
    tourStatus.textContent = '';
    tourPanel.setAttribute('aria-busy', 'false');
  });
  tourOpen.addEventListener('click', () => {
    clearTimeout(closeTimer);
    tourEmbed.hidden = false;
    tourOpen.hidden = true;
    tourOpen.setAttribute('aria-expanded', 'true');
    tourClose.hidden = false;
    tourClose.focus({ preventScroll: true });
    if (!tourEmbed.hasAttribute('src')) {
      tourEmbed.src = tourEmbed.dataset.src;
    }
    if (!ready) {
      tourStatus.textContent = 'Cargando recorrido…';
      tourPanel.setAttribute('aria-busy', 'true');
      clearTimeout(loadTimer);
      loadTimer = setTimeout(() => {
        tourStatus.textContent = 'El recorrido está tardando. Puedes cerrarlo y volver a intentarlo.';
        tourPanel.setAttribute('aria-busy', 'false');
      }, 15000);
    }
    requestAnimationFrame(() => {
      if (!tourClose.hidden) tourPanel.classList.add('is-open');
    });
  });
  tourClose.addEventListener('click', () => {
    clearTimeout(loadTimer);
    tourPanel.classList.remove('is-open');
    tourPanel.setAttribute('aria-busy', 'false');
    tourEmbed.setAttribute('tabindex', '-1');
    tourClose.hidden = true;
    tourOpen.hidden = false;
    tourOpen.setAttribute('aria-expanded', 'false');
    tourStatus.textContent = '';
    tourOpen.focus({ preventScroll: true });
    closeTimer = setTimeout(() => { tourEmbed.hidden = true; },
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180);
  });
  tourOpen.addEventListener('click', () => tourEmbed.removeAttribute('tabindex'));
}

function loadCarouselImage(slide) {
  if (!slide.hasAttribute('src') && slide.dataset.src) {
    if (slide.dataset.srcset) {
      slide.srcset = slide.dataset.srcset;
    }
    slide.src = slide.dataset.src;
  }
}

// Carrusel del local: controles y gestos independientes de videojuegos.
const localCarousel = document.querySelector('.local-carousel');
if (localCarousel) {
  const slides = [...localCarousel.querySelectorAll('.local-slide')];
  const controls = localCarousel.querySelector('.local-controls');
  const surface = localCarousel.querySelector('.local-slides');
  const counter = localCarousel.querySelector('.local-counter');
  let current = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  const showSlide = (index, immediate = false) => {
    current = (index + slides.length) % slides.length;
    loadCarouselImage(slides[current]);
    counter.textContent = `${current + 1} de ${slides.length}`;
    slides.forEach((slide, slideIndex) => {
      slide.style.transitionDuration = immediate ? '0ms' : '';
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  };
  if (slides.length > 1) {
    showSlide(current, true);
    controls.hidden = false;
    controls.querySelector('.local-prev').addEventListener('click', event => showSlide(current - 1, event.detail === 0));
    controls.querySelector('.local-next').addEventListener('click', event => showSlide(current + 1, event.detail === 0));
    let gesture = null;
    surface.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' || !event.isPrimary) return;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
      surface.setPointerCapture(event.pointerId);
    });
    surface.addEventListener('pointerup', event => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      gesture = null;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        showSlide(current + (dx < 0 ? 1 : -1));
      }
    });
    const cancelGesture = () => { gesture = null; };
    surface.addEventListener('pointercancel', cancelGesture);
    surface.addEventListener('lostpointercapture', cancelGesture);
  }
}

// Pulso TARGET / LOCK compartido por los controles de banners y GAMES.
function bindLockControls(controls) {
  controls.querySelectorAll('.tl-button').forEach(button => {
    let flashTimer;
    button.addEventListener('click', () => {
      clearTimeout(flashTimer);
      button.classList.remove('is-locked');
      void button.offsetWidth;
      button.classList.add('is-locked');
      flashTimer = setTimeout(() => button.classList.remove('is-locked'), 620);
    });
  });
}

// Banners: estado, temporizador y gestos aislados de los carruseles existentes.
const bannerCarousel = document.querySelector('.banner-carousel');
if (bannerCarousel) {
  const slides = [...bannerCarousel.querySelectorAll('.banner-slide')];
  const surface = bannerCarousel.querySelector('.banner-slides');
  const controls = bannerCarousel.querySelector('.banner-controls');
  const counter = bannerCarousel.querySelector('.banner-counter');
  const play = bannerCarousel.querySelector('.banner-play');
  const playLabel = play.querySelector('.label');
  const playIcon = play.querySelector('.banner-play-icon');
  bindLockControls(controls);
  let current = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let inView = !('IntersectionObserver' in window);
  let timer;
  let gesture = null;
  const show = (index, immediate = false) => {
    current = (index + slides.length) % slides.length;
    loadCarouselImage(slides[current]);
    slides.forEach((slide, i) => {
      slide.style.transitionDuration = immediate ? '0ms' : '';
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    counter.textContent = `${current + 1} de ${slides.length}`;
  };
  const schedule = () => {
    clearTimeout(timer);
    const running = !paused && !reducedMotion.matches;
    playLabel.textContent = running ? 'Pausar avance automático' : 'Reanudar avance automático';
    play.setAttribute('aria-pressed', String(!running));
    playIcon.innerHTML = running
      ? '<path d="M9 5v14M15 5v14"/>'
      : '<path d="M8 5v14l11-7-11-7Z"/>';
    play.disabled = reducedMotion.matches;
    counter.setAttribute('aria-live', running ? 'off' : 'polite');
    if (running && inView && slides.length > 1) {
      loadCarouselImage(slides[(current + 1) % slides.length]);
    }
    if (running && !hovered && !focused && inView && !document.hidden) {
      timer = setTimeout(() => { show(current + 1); schedule(); }, 5000);
    }
  };
  const pause = () => { paused = true; schedule(); };
  controls.hidden = false;
  bannerCarousel.querySelector('.banner-prev').addEventListener('click', event => {
    pause(); show(current - 1, event.detail === 0);
  });
  bannerCarousel.querySelector('.banner-next').addEventListener('click', event => {
    pause(); show(current + 1, event.detail === 0);
  });
  play.addEventListener('click', () => { paused = !paused; schedule(); });
  bannerCarousel.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { hovered = true; schedule(); }
  });
  bannerCarousel.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  bannerCarousel.addEventListener('focusin', () => { focused = true; schedule(); });
  bannerCarousel.addEventListener('focusout', event => {
    if (!bannerCarousel.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  surface.addEventListener('pointerdown', event => {
    pause();
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    surface.setPointerCapture(event.pointerId);
  });
  surface.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  });
  surface.addEventListener('pointercancel', () => { gesture = null; });
  surface.addEventListener('lostpointercapture', () => { gesture = null; });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches || paused; schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }, { threshold: 0.1 }).observe(bannerCarousel);
  }
  schedule();
}

// Videojuegos: tarjetas de HTML con rutas verificadas. Una sola tarea de avance.
const gamesCarousel = document.querySelector('.games-carousel');
if (gamesCarousel) {
  const track = gamesCarousel.querySelector('.games-track');
  const cards = [...track.querySelectorAll('.game-card')];
  const controls = gamesCarousel.querySelector('.games-controls');
  const previous = gamesCarousel.querySelector('#games-prev');
  const next = gamesCarousel.querySelector('#games-next');
  const play = gamesCarousel.querySelector('#games-play');
  const playLabel = play.querySelector('.label');
  const playIcon = play.querySelector('.games-play-icon');
  const filters = [...gamesCarousel.querySelectorAll('[data-game-filter]')];
  const filterGroup = gamesCarousel.querySelector('.games-filters');
  const filterStatus = gamesCarousel.querySelector('#games-filter-status');
  bindLockControls(controls);
  if (cards.length) {
    track.hidden = false;
    controls.hidden = false;
    filterGroup.hidden = false;
    let timer;
    let paused = false;
    let hovered = false;
    let focused = false;
    let autoDirection = 1;
    let inView = !('IntersectionObserver' in window);
    const syncPlayControl = () => {
      playLabel.textContent = paused ? 'Reanudar avance automático' : 'Pausar avance automático';
      play.setAttribute('aria-pressed', String(paused));
      playIcon.innerHTML = paused
        ? '<path d="M8 5v14l11-7-11-7Z"/>'
        : '<path d="M9 5v14M15 5v14"/>';
    };
    const canScroll = () => track.scrollWidth > track.clientWidth + 2;
    const stop = () => { clearTimeout(timer); timer = undefined; };
    const move = (direction, instant = false) => {
      const max = track.scrollWidth - track.clientWidth;
      const firstVisibleCard = cards.find(card => !card.hidden);
      if (!firstVisibleCard) return;
      const step = firstVisibleCard.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
      let left = Math.max(0, Math.min(max, track.scrollLeft + direction * step));
      if (direction > 0 && track.scrollLeft >= max - 2) left = 0;
      if (direction < 0 && track.scrollLeft <= 2) left = max;
      track.scrollTo({ left, behavior: instant || reducedMotion.matches ? 'instant' : 'smooth' });
    };
    const applyFilter = (button) => {
      const category = button.dataset.gameFilter;
      paused = true;
      autoDirection = 1;
      syncPlayControl();
      filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      cards.forEach(card => {
        card.hidden = category !== 'todos' && !card.dataset.categories.split(/\s+/).includes(category);
      });
      const visibleCount = cards.filter(card => !card.hidden).length;
      const categoryName = button.textContent.trim();
      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'videojuego' : 'videojuegos'} en la categoría ${categoryName}.`;
      track.scrollTo({ left: 0, behavior: 'instant' });
      schedule();
    };
    const schedule = () => {
      stop();
      const scrollable = canScroll();
      previous.disabled = next.disabled = !scrollable;
      play.hidden = reducedMotion.matches || !scrollable;
      if (!paused && !hovered && !focused && inView && !document.hidden && !reducedMotion.matches && scrollable) {
        timer = setTimeout(() => {
          const max = track.scrollWidth - track.clientWidth;
          if (track.scrollLeft >= max - 2) autoDirection = -1;
          else if (track.scrollLeft <= 2) autoDirection = 1;
          move(autoDirection);
          schedule();
        }, 5000);
      }
    };
    const pause = () => {
      paused = true;
      syncPlayControl();
      stop();
    };
    previous.addEventListener('click', (event) => { pause(); move(-1, event.detail === 0); });
    next.addEventListener('click', (event) => { pause(); move(1, event.detail === 0); });
    filters.forEach(filter => filter.addEventListener('click', () => applyFilter(filter)));
    play.addEventListener('click', () => {
      paused = !paused;
      syncPlayControl();
      schedule();
    });
    track.addEventListener('pointerdown', pause, { passive: true });
    track.addEventListener('wheel', pause, { passive: true });
    track.addEventListener('keydown', (event) => {
      pause();
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1, true);
      }
    });
    gamesCarousel.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = true;
      schedule();
    });
    gamesCarousel.addEventListener('pointerleave', () => { hovered = false; schedule(); });
    gamesCarousel.addEventListener('focusin', () => { focused = true; schedule(); });
    gamesCarousel.addEventListener('focusout', (event) => {
      focused = gamesCarousel.contains(event.relatedTarget);
      schedule();
    });
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', schedule);
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(track);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        schedule();
      }, { threshold: 0.25 }).observe(gamesCarousel);
    }
    schedule();
  }
}
