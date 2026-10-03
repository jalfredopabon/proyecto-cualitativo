/**
 * GUÍA INTERACTIVA DEL ENFOQUE CUALITATIVO
 * Lógica pedagógica e interactividad UI/UX
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParadigmComparator();
  initCodingLab();
  initInteractiveQuiz();
  initPresentationMode();
  initNavScrollSpy();
  initReferenceManager();
});

/* ==========================================================================
   1. TEMA CLARO / OSCURO (CON SUPRESIÓN DE DESTELLOS)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('qualitative_guide_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      // Suprimir transiciones instantáneas para evitar smear
      document.body.classList.add('theme-transitioning');
      
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('qualitative_guide_theme', nextTheme);
      updateThemeIcon(nextTheme);

      // Restaurar transiciones en el siguiente frame
      requestAnimationFrame(() => {
        document.body.classList.remove('theme-transitioning');
      });
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    icon.textContent = '🌙';
    icon.setAttribute('title', 'Cambiar a Modo Oscuro');
  } else {
    icon.textContent = '☀️';
    icon.setAttribute('title', 'Cambiar a Modo Lectura');
  }
}

/* ==========================================================================
   2. COMPARADOR DE PARADIGMAS (CUALITATIVO VS CUANTITATIVO)
   ========================================================================== */
const PARADIGM_DATA = {
  cualitativo: {
    logica: {
      titulo: "Inductiva / Espiralada",
      desc: "Parte de lo particular y contextual hacia pautas generales. Es flexible, abierta y se retroalimenta continuamente en el campo.",
      ejemplo: "Ejemplo: Comprender cómo cada víctima significa el trato frío de una institución judicial sin hipótesis prefijadas."
    },
    meta: {
      titulo: "Comprensión del Sentido (Verstehen)",
      desc: "Busca profundidad, significados subjetivos, matices culturales y la vivencia experimentada de las personas.",
      ejemplo: "Ejemplo: ¿Qué representa la justicia o la soledad institucional para una mujer denunciante?"
    },
    instrumento: {
      titulo: "El Investigador como Instrumento",
      desc: "La reflexividad, empatía, escucha activa y notas de campo median la construcción compartida del dato.",
      ejemplo: "Ejemplo: Guías de entrevista semiestructurada abiertas a temas emergentes e historias de vida."
    },
    muestra: {
      titulo: "Muestreo Intencional / Teórico",
      desc: "No busca representatividad estadística, sino riqueza informativa y saturación teórica (hasta que no surjan nuevos códigos).",
      ejemplo: "Ejemplo: 12 informantes clave con trayectorias contrastantes en la ruta penal."
    },
    criterios: {
      titulo: "Rigor Cualitativo (Guba & Lincoln)",
      desc: "Credibilidad, Transferibilidad, Dependencia y Confirmabilidad respaldados por pistas de auditoría y reflexividad.",
      ejemplo: "Ejemplo: Triangulación de relatos de víctimas con testimonios de defensores públicos."
    }
  },
  cuantitativo: {
    logica: {
      titulo: "Deductiva / Lineal",
      desc: "Parte de teorías y marcos preexistentes para contrastar hipótesis prefijadas mediante medición controlada.",
      ejemplo: "Ejemplo: Probar si las horas de espera se correlacionan inversamente con la satisfacción institucional."
    },
    meta: {
      titulo: "Explicación Causal & Generalización",
      desc: "Busca medir magnitudes, establecer frecuencias, distribuciones y leyes generales extrapolables.",
      ejemplo: "Ejemplo: Determinar el porcentaje exacto de desistimiento penal a nivel nacional."
    },
    instrumento: {
      titulo: "Instrumentos Estandarizados",
      desc: "Encuestas cerradas, escalas Likert, censos y mediciones estadísticas que reducen al mínimo la subjetividad del encuestador.",
      ejemplo: "Ejemplo: Cuestionario cerrado de 45 reactivos con opciones múltiples."
    },
    muestra: {
      titulo: "Muestreo Probabilístico / Aleatorio",
      desc: "Calculado matemáticamente con márgenes de error y niveles de confianza estadística para generalizar al universo.",
      ejemplo: "Ejemplo: Muestra de 1,200 personas representativas de la población con error ±3%."
    },
    criterios: {
      titulo: "Validez y Confiabilidad Clásica",
      desc: "Validez interna, validez externa, confiabilidad de consistencia interna (Alfa de Cronbach) y replicabilidad.",
      ejemplo: "Ejemplo: Coeficiente de correlación r de Pearson significativo con p < 0.01."
    }
  }
};

function initParadigmComparator() {
  const tabs = document.querySelectorAll('.paradigm-tab');
  const cards = {
    logica: document.getElementById('dim-logica'),
    meta: document.getElementById('dim-meta'),
    instrumento: document.getElementById('dim-instrumento'),
    muestra: document.getElementById('dim-muestra'),
    criterios: document.getElementById('dim-criterios')
  };

  if (!tabs.length || !cards.logica) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const paradigmKey = tab.dataset.paradigm; // 'cualitativo' o 'cuantitativo'
      const data = PARADIGM_DATA[paradigmKey];

      Object.keys(cards).forEach(key => {
        const card = cards[key];
        if (card && data[key]) {
          const titleEl = card.querySelector('.dimension-main-title');
          const descEl = card.querySelector('.dimension-desc');
          const exEl = card.querySelector('.dimension-example');

          if (titleEl) titleEl.textContent = data[key].titulo;
          if (descEl) descEl.textContent = data[key].desc;
          if (exEl) exEl.textContent = data[key].ejemplo;
        }
      });
    });
  });
}

/* ==========================================================================
   3. LABORATORIO INTERACTIVO DE CODIFICACIÓN (EJEMPLO REAL: BITÁCORA)
   ========================================================================== */
const CODING_DATA = {
  'seg-reiteracion': {
    code: '[REV_REITERACION]',
    badgeClass: 'badge-rev-reiteracion',
    dimension: 'Prácticas Institucionales',
    definition: 'Obligación impuesta a la víctima de relatar el hecho traumático en múltiples instancias sin coordinación ni articulación entre agencias.',
    citation: '"Tuve que relatar lo ocurrido cuatro veces a distintos funcionarios en menos de seis horas..."',
    memo: 'Memo Analítico #02: La reiteración forzada funciona como una violencia burocrática invisible. El sistema exige memoria repetitiva sin garantizar resguardo emocional ni expediente único compartido.'
  },
  'seg-cuestiona': {
    code: '[REV_CUESTIONA]',
    badgeClass: 'badge-rev-cuestiona',
    dimension: 'Discursos y Actitudes Institucionales',
    definition: 'Cuestionamiento abierto o velado de la veracidad del relato de la persona usuaria, emitiendo juicios morales o sospechas de exageración.',
    citation: '"Me miraban de arriba a abajo, con cara de duda, como si fuera mi culpa o estuviera exagerando lo que viví."',
    memo: 'Memo Analítico #03: El escepticismo de entrada de los operadores reproduce estereotipos de género y culpabilización. La víctima debe \'demostrar inocencia\' frente a la institución que debería protegerla.'
  },
  'seg-desamparo': {
    code: '[IMP_DESAMPARO]',
    badgeClass: 'badge-imp-desamparo',
    dimension: 'Impacto Subjetivo y Ruptura de Confianza',
    definition: 'Sensación profunda de impotencia, desprotección e indefensión aprendida ante la respuesta punitiva o indiferente del aparato estatal.',
    citation: '"Sentí una impotencia absoluta, como si el sistema me castigara a mí en lugar de protegerme."',
    memo: 'Memo Analítico #04: Este impacto explica el desistimiento penal temprano. La víctima prefiere renunciar al acceso a la justicia que seguir tolerando el desgaste psicológico institucional.'
  },
  'seg-trato-hum': {
    code: '[FAC_TRATO_HUM]',
    badgeClass: 'badge-fac-humanizado',
    dimension: 'Factores Mitigadores y Humanización',
    definition: 'Prácticas de escucha activa, contacto visual dignificante, empatía sin juzgamiento y explicación clara de cada paso del procedimiento.',
    citation: '"Hasta que llegué con la profesional de atención comunitaria, quien me miró a los ojos, no me juzgó y me explicó cada paso..."',
    memo: 'Memo Analítico #05: La humanización no requiere infraestructura multimillonaria; descansa en la actitud dialógica del funcionario. Actúa como factor de resiliencia y anclaje terapéutico.'
  }
};

function initCodingLab() {
  const segments = document.querySelectorAll('.codeable-segment');
  const codeBadge = document.getElementById('inspector-code-badge');
  const dimVal = document.getElementById('inspector-dim');
  const defVal = document.getElementById('inspector-def');
  const quoteVal = document.getElementById('inspector-quote');
  const memoVal = document.getElementById('inspector-memo');

  if (!segments.length || !codeBadge) return;

  segments.forEach(seg => {
    seg.addEventListener('click', () => {
      segments.forEach(s => s.classList.remove('active-segment'));
      seg.classList.add('active-segment');

      const segKey = seg.dataset.segmentKey;
      const data = CODING_DATA[segKey];

      if (data) {
        codeBadge.textContent = data.code;
        codeBadge.className = `code-pill-badge ${data.badgeClass}`;
        if (dimVal) dimVal.textContent = data.dimension;
        if (defVal) defVal.textContent = data.definition;
        if (quoteVal) quoteVal.textContent = data.citation;
        if (memoVal) memoVal.textContent = data.memo;
      }
    });
  });
}

/* ==========================================================================
   4. MINI-QUIZ INTERACTIVO PARA ESTUDIANTES
   ========================================================================== */
function initInteractiveQuiz() {
  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');

  if (!options.length || !feedback) return;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => {
        o.classList.remove('correct', 'incorrect');
      });

      const isCorrect = opt.dataset.correct === 'true';

      if (isCorrect) {
        opt.classList.add('correct');
        feedback.style.display = 'block';
        feedback.style.borderColor = 'var(--accent-emerald)';
        feedback.style.background = 'var(--accent-emerald-soft)';
        feedback.innerHTML = `
          <strong style="color: #34d399;">¡Respuesta Correcta! 🎯</strong><br>
          En el enfoque cualitativo el muestreo no busca generalización estadística ni azar probabilístico, sino <strong>riqueza de significados y saturación teórica</strong> mediante casos e informantes seleccionados intencionalmente.
        `;
      } else {
        opt.classList.add('incorrect');
        feedback.style.display = 'block';
        feedback.style.borderColor = 'var(--accent-rose)';
        feedback.style.background = 'var(--accent-rose-soft)';
        feedback.innerHTML = `
          <strong style="color: #fb7185;">No exactamente 🤔</strong><br>
          Esa afirmación pertenece a la lógica deductiva/cuantitativa. En investigación cualitativa los informantes se eligen por pertinencia conceptual y vivencial con el fenómeno estudiado.
        `;
      }
    });
  });
}

/* ==========================================================================
   5. MODO PRESENTACIÓN PARA CLASES (PANTALLA COMPLETA & ZOOM)
   ========================================================================== */
function initPresentationMode() {
  const presBtn = document.getElementById('presentation-btn');
  if (!presBtn) return;

  presBtn.addEventListener('click', () => {
    document.body.classList.toggle('presentation-mode');
    const isPres = document.body.classList.contains('presentation-mode');
    presBtn.classList.toggle('active', isPres);
    presBtn.title = isPres ? "Salir del Modo Presentación" : "Modo Presentación para Proyector";
  });
}

/* ==========================================================================
   6. SCROLL SPY PARA MENÚ SUPERIOR
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('.section-block');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   7. GESTOR DE REFERENCIAS BIBLIOGRÁFICAS (ESTILO ZOTERO)
   ========================================================================== */
const DEFAULT_REFERENCES = [
  {
    id: 'ref-braun-2006',
    authors: 'Braun, V., & Clarke, V.',
    year: '2006',
    title: 'Using thematic analysis in psychology',
    source: 'Qualitative Research in Psychology, 3(2), 77-101',
    doi: 'https://doi.org/10.1191/1478088706qp063oa',
    type: 'Artículo',
    tag: 'Metodología Cualitativa',
    notes: 'Texto canónico para las 6 fases del análisis temático reflexivo. Fundamental para justificar la codificación inductiva.'
  },
  {
    id: 'ref-guba-1989',
    authors: 'Guba, E. G., & Lincoln, Y. S.',
    year: '1989',
    title: 'Fourth generation evaluation',
    source: 'SAGE Publications',
    doi: '',
    type: 'Libro',
    tag: 'Rigor Científico',
    notes: 'Establece los 4 criterios de rigor cualitativo: Credibilidad, Transferibilidad, Dependencia y Confirmabilidad.'
  },
  {
    id: 'ref-gutierrez-2018',
    authors: 'Gutiérrez-de-Cabiedes, T.',
    year: '2018',
    title: 'La victimización secundaria en el proceso penal: Diagnóstico y propuestas de superación',
    source: 'Revista de Victimología, (7), 29-61',
    doi: 'https://doi.org/10.12827/RVJV.7.02',
    type: 'Artículo',
    tag: 'Victimización Secundaria',
    notes: 'Analiza los trámites burocráticos y las prácticas forenses que generan desgaste psicológico en las víctimas durante el proceso judicial.'
  },
  {
    id: 'ref-vanmanen-2016',
    authors: 'Van Manen, M.',
    year: '2016',
    title: 'Researching lived experience: Human science for an action sensitive pedagogy',
    source: 'Routledge',
    doi: 'https://doi.org/10.4324/9781315421056',
    type: 'Libro',
    tag: 'Metodología Cualitativa',
    notes: 'Referencia fundamental para el enfoque fenomenológico hermenéutico y la recuperación de la experiencia vivida (Lebenswelt).'
  },
  {
    id: 'ref-beristain-2009',
    authors: 'Beristain, C. M.',
    year: '2009',
    title: 'Diálogos sobre la reparación: Qué reparar en los casos de violaciones de derechos humanos',
    source: 'Instituto Interamericano de Derechos Humanos (IIDH)',
    doi: '',
    type: 'Informe / Libro',
    tag: 'Ética y Derechos Humanos',
    notes: 'Aporta la perspectiva psicosocial sobre el impacto del trato institucional deshumanizado y el principio de no revictimización.'
  }
];

let currentReferences = [];
let currentFilterTag = 'Todos';

function initReferenceManager() {
  const container = document.getElementById('zotero-ref-list');
  if (!container) return;

  // Cargar de localStorage o defaults
  const stored = localStorage.getItem('qualitative_references_library');
  if (stored) {
    try {
      currentReferences = JSON.parse(stored);
    } catch (e) {
      currentReferences = [...DEFAULT_REFERENCES];
    }
  } else {
    currentReferences = [...DEFAULT_REFERENCES];
    saveReferencesToStorage();
  }

  renderReferences();
  setupReferenceEvents();
}

function saveReferencesToStorage() {
  localStorage.setItem('qualitative_references_library', JSON.stringify(currentReferences));
}

function generateAPA7(ref) {
  const authors = ref.authors.trim();
  const year = ref.year ? `(${ref.year.trim()}).` : '(s.f.).';
  const title = ref.type === 'Libro' 
    ? `<em>${ref.title.trim()}</em>.` 
    : `${ref.title.trim()}.`;
  const source = ref.type === 'Artículo' 
    ? `<em>${ref.source.trim()}</em>` 
    : `${ref.source.trim()}`;
  const doi = ref.doi ? ` ${ref.doi.trim()}` : '';

  return `${authors} ${year} ${title} ${source}.${doi}`;
}

function generateInTextCitation(ref) {
  // Extraer el primer autor o par de autores para la cita paréntesis
  let authorClean = ref.authors.split(',')[0].trim();
  if (ref.authors.includes('&')) {
    const parts = ref.authors.split('&');
    const first = parts[0].split(',')[0].trim();
    const second = parts[1].split(',')[0].trim();
    authorClean = `${first} & ${second}`;
  }
  return `(${authorClean}, ${ref.year || 's.f.'})`;
}

function renderReferences() {
  const listContainer = document.getElementById('zotero-ref-list');
  const countBadge = document.getElementById('ref-count-badge');
  const searchInput = document.getElementById('zotero-search');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (!listContainer) return;

  const filtered = currentReferences.filter(ref => {
    const matchesTag = currentFilterTag === 'Todos' || ref.tag === currentFilterTag;
    const matchesSearch = !query || 
      ref.title.toLowerCase().includes(query) ||
      ref.authors.toLowerCase().includes(query) ||
      ref.tag.toLowerCase().includes(query) ||
      (ref.notes && ref.notes.toLowerCase().includes(query));
    return matchesTag && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} referencias`;
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍</p>
        <p style="font-weight: 600;">No se encontraron referencias con estos criterios.</p>
        <p style="font-size: 0.8rem; color: var(--text-dim);">Prueba cambiando el filtro o agrega una nueva referencia en el formulario lateral.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(ref => {
    const apaFormatted = generateAPA7(ref);
    const inTextCitation = generateInTextCitation(ref);

    return `
      <article class="ref-card" data-ref-id="${ref.id}">
        <div class="ref-card-header">
          <span class="ref-type-badge">${ref.type || 'Fuente'}</span>
          <span class="ref-year">${ref.year}</span>
        </div>
        <h4 class="ref-title">${ref.title}</h4>
        <p class="ref-authors">👤 ${ref.authors}</p>
        
        <div class="ref-apa-preview">
          ${apaFormatted}
        </div>

        ${ref.notes ? `<p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.6rem; font-style: italic;">💡 ${ref.notes}</p>` : ''}

        <div class="ref-card-actions">
          <button class="btn-ref-action btn-copy-apa" data-apa="${encodeURIComponent(apaFormatted.replace(/<[^>]*>?/gm, ''))}" title="Copiar referencia completa en formato APA 7">
            📋 Copiar APA 7
          </button>
          <button class="btn-ref-action btn-copy-intext" data-intext="${encodeURIComponent(inTextCitation)}" title="Copiar cita en el texto entre paréntesis">
            💬 Cita: ${inTextCitation}
          </button>
          <span style="font-size: 0.72rem; color: #a5b4fc; background: rgba(99, 102, 241, 0.12); padding: 0.2rem 0.5rem; border-radius: 4px; margin-left: auto;">
            🏷️ ${ref.tag}
          </span>
        </div>
      </article>
    `;
  }).join('');

  // Vincular eventos de copiado
  listContainer.querySelectorAll('.btn-copy-apa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = decodeURIComponent(btn.dataset.apa);
      copyToClipboardWithFeedback(text, btn, '¡APA 7 copiado!');
    });
  });

  listContainer.querySelectorAll('.btn-copy-intext').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = decodeURIComponent(btn.dataset.intext);
      copyToClipboardWithFeedback(text, btn, '¡Cita copiada!');
    });
  });
}

function copyToClipboardWithFeedback(text, button, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.innerHTML;
    button.innerHTML = `✅ ${successMsg}`;
    button.style.borderColor = 'var(--accent-emerald)';
    button.style.color = '#34d399';
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.borderColor = '';
      button.style.color = '';
    }, 2000);
  });
}

function setupReferenceEvents() {
  // Buscador
  const searchInput = document.getElementById('zotero-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderReferences();
    });
  }

  // Filtros por etiqueta
  const tagButtons = document.querySelectorAll('.tag-filter-btn');
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilterTag = btn.dataset.tag;
      renderReferences();
    });
  });

  // Formulario para añadir nueva referencia
  const addForm = document.getElementById('add-reference-form');
  const toast = document.getElementById('ref-success-toast');

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const authors = document.getElementById('form-authors').value.trim();
      const year = document.getElementById('form-year').value.trim();
      const title = document.getElementById('form-title').value.trim();
      const source = document.getElementById('form-source').value.trim();
      const doi = document.getElementById('form-doi').value.trim();
      const type = document.getElementById('form-type').value;
      const tag = document.getElementById('form-tag').value;
      const notes = document.getElementById('form-notes').value.trim();

      if (!authors || !title) {
        alert('Por favor completa al menos los autores y el título.');
        return;
      }

      const newRef = {
        id: 'ref-' + Date.now(),
        authors,
        year: year || '2026',
        title,
        source: source || 'Publicación académica',
        doi,
        type,
        tag,
        notes
      };

      currentReferences.unshift(newRef);
      saveReferencesToStorage();
      renderReferences();
      addForm.reset();

      if (toast) {
        toast.style.display = 'flex';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 3000);
      }
    });
  }

  // Botón Exportar Referencias (Formato Markdown / BibTeX)
  const exportBtn = document.getElementById('export-refs-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const markdownBib = currentReferences.map(ref => {
        const apa = generateAPA7(ref).replace(/<[^>]*>?/gm, '');
        return `- **${generateInTextCitation(ref)}**: ${apa}`;
      }).join('\n\n');

      navigator.clipboard.writeText(markdownBib).then(() => {
        alert('¡Todas las referencias copiadas al portapapeles en formato Markdown con sangría para tu tesis o BITACORA.md!');
      });
    });
  }
}

