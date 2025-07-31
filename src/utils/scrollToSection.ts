// src/utils/scrollToSection.ts

type ScrollOpts = {
  /** Desfase manual en píxeles (si no se pasa, se toma la altura del <header>) */
  offset?: number;
  /** Actualiza el hash en la URL sin “brincar” la página */
  updateHash?: boolean;
  /** Usa scroll suave solo si el usuario no prefiere movimiento reducido */
  respectReducedMotion?: boolean;
  /** Alineación vertical del target (start = arriba, center = centrado) */
  align?: 'start' | 'center';
};

/**
 * Desplaza la página a la sección indicada, con soporte para headers fijos,
 * accesibilidad y actualización opcional del hash en la URL.
 */
export const scrollToSection = (id: string, opts: ScrollOpts = {}) => {
  if (!id) return;

  const {
    offset,
    updateHash = false,
    respectReducedMotion = true,
    align = 'start',
  } = opts;

  const sectionId = id.startsWith('#') ? id.slice(1) : id;
  const element = document.getElementById(sectionId);
  if (!element) return;

  // 1) Calcular offset: si no se pasa, usamos la altura real del <header>
  const headerEl = document.querySelector('header') as HTMLElement | null;
  const headerHeight = offset ?? (headerEl?.offsetHeight ?? 0);

  // 2) Calcular posición objetivo con offset
  const rect = element.getBoundingClientRect();
  const pageY = window.scrollY;
  let top = rect.top + pageY;

  if (align === 'start') {
    top = top - headerHeight;
  } else if (align === 'center') {
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.height / 2;
    top = top - (viewportCenter - elementCenter);
  }

  // 3) Respetar preferencia de movimiento reducido (accesibilidad)
  const prefersReduced = respectReducedMotion &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 4) Hacer scroll
  window.scrollTo({
    top,
    behavior: prefersReduced ? 'auto' : 'smooth',
  });

  // 5) Enfocar el elemento (a11y) y actualizar hash sin jump
  //    -> focus visible si es focusable; si no, añadimos tabindex temporal
  if (!prefersReduced) {
    // focus tras el scroll para evitar “salto” visual
    setTimeout(() => {
      const wasTabIndex = element.getAttribute('tabindex');
      if (wasTabIndex === null) element.setAttribute('tabindex', '-1');
      (element as HTMLElement).focus({ preventScroll: true });
      if (wasTabIndex === null) element.removeAttribute('tabindex');
    }, 300);
  }

  if (updateHash) {
    const newHash = `#${sectionId}`;
    if (history.replaceState) {
      history.replaceState(null, '', newHash);
    } else {
      // fallback
      location.hash = newHash;
    }
  }
};

/** Atajo útil para enlaces: previene el enlace por defecto y hace scroll */
export const handleNavClick =
  (id: string, opts?: ScrollOpts) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id, opts);
  };