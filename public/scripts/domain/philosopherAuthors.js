import { normalizeKey } from './canonicalThemes.js';

/**
 * @file philosopherAuthors.js
 * @description Identidade dos pensadores curados: slug, nome canónico e apelidos.
 *
 * Existe separado de philosopher-data.js porque a home e a página de detalhes
 * só precisam resolver "nome do autor" → nome exibível e URL do perfil. Importar
 * o módulo completo trazia ~40 KB de biografias que essas páginas nunca leem.
 * philosopher-data.js consome esta lista para montar PHILOSOPHER_DEFINITIONS,
 * então continua havendo uma única fonte de verdade para slugs e apelidos.
 */
export const PHILOSOPHER_AUTHORS = [
  {
    slug: 'socrates',
    name: 'Socrates',
    namePt: 'Sócrates',
    aliases: ['Socrates', 'Sócrates'],
  },
  {
    slug: 'plato',
    name: 'Plato',
    namePt: 'Platão',
    aliases: ['Plato', 'Platão'],
  },
  {
    slug: 'aristotle',
    name: 'Aristotle',
    namePt: 'Aristóteles',
    aliases: ['Aristotle', 'Aristóteles'],
  },
  {
    slug: 'niccolo-machiavelli',
    name: 'Niccolò Machiavelli',
    namePt: 'Nicolau Maquiavel',
    aliases: ['Niccolò Machiavelli', 'Niccolo Machiavelli', 'NiccolÃ² Machiavelli', 'Maquiavel', 'Nicolau Maquiavel'],
  },
  {
    slug: 'john-locke',
    name: 'John Locke',
    namePt: 'John Locke',
    aliases: ['John Locke'],
  },
  {
    slug: 'charles-darwin',
    name: 'Charles Darwin',
    namePt: 'Charles Darwin',
    aliases: ['Charles Darwin', 'Darwin'],
  },
  {
    slug: 'karl-marx',
    name: 'Karl Marx',
    namePt: 'Karl Marx',
    aliases: ['Karl Marx'],
  },
  {
    slug: 'friedrich-nietzsche',
    name: 'Friedrich Nietzsche',
    namePt: 'Friedrich Nietzsche',
    aliases: ['Friedrich Nietzsche', 'Nietzsche'],
  },
  {
    slug: 'simone-de-beauvoir',
    name: 'Simone de Beauvoir',
    namePt: 'Simone de Beauvoir',
    aliases: ['Simone de Beauvoir'],
  },
  {
    slug: 'clovis-de-barros-filho',
    name: 'Clóvis de Barros Filho',
    namePt: 'Clóvis de Barros Filho',
    aliases: ['Clóvis de Barros Filho', 'Clovis de Barros Filho', 'ClÃ³vis de Barros Filho'],
  },
  {
    slug: 'leandro-karnal',
    name: 'Leandro Karnal',
    namePt: 'Leandro Karnal',
    aliases: ['Leandro Karnal'],
  },
  {
    slug: 'mario-sergio-cortella',
    name: 'Mário Sergio Cortella',
    namePt: 'Mário Sérgio Cortella',
    aliases: ['Mário Sergio Cortella', 'Mario Sergio Cortella', 'MÃ¡rio Sergio Cortella', 'Mário Sérgio Cortella'],
  },
  {
    slug: 'lucas-costa-roxo',
    name: 'Lucas Costa Roxo',
    namePt: 'Lucas Costa Roxo',
    aliases: ['Lucas Costa Roxo', 'Lucas C. Roxo'],
  },
  {
    slug: 'immanuel-kant',
    name: 'Immanuel Kant',
    namePt: 'Immanuel Kant',
    aliases: ['Immanuel Kant'],
  },
  {
    slug: 'baruch-spinoza',
    name: 'Baruch Spinoza',
    namePt: 'Baruch Espinosa',
    aliases: ['Baruch Spinoza', 'Baruch Espinosa', 'Espinosa', 'Spinoza'],
  },
  {
    slug: 'david-hume',
    name: 'David Hume',
    namePt: 'David Hume',
    aliases: ['David Hume'],
  },
  {
    slug: 'ludwig-wittgenstein',
    name: 'Ludwig Wittgenstein',
    namePt: 'Ludwig Wittgenstein',
    aliases: ['Ludwig Wittgenstein'],
  },
  {
    slug: 'arthur-schopenhauer',
    name: 'Arthur Schopenhauer',
    namePt: 'Arthur Schopenhauer',
    aliases: ['Arthur Schopenhauer'],
  },
  {
    slug: 'heraclitus',
    name: 'Heraclitus',
    namePt: 'Heráclito',
    aliases: ['Heráclito', 'Heraclitus'],
  },
  {
    slug: 'epicurus',
    name: 'Epicurus',
    namePt: 'Epicuro',
    aliases: ['Epicuro', 'Epicurus'],
  },
  {
    slug: 'blaise-pascal',
    name: 'Blaise Pascal',
    namePt: 'Blaise Pascal',
    aliases: ['Blaise Pascal'],
  },
  {
    slug: 'francis-bacon',
    name: 'Francis Bacon',
    namePt: 'Francis Bacon',
    aliases: ['Francis Bacon'],
  },
  {
    slug: 'voltaire',
    name: 'Voltaire',
    namePt: 'Voltaire',
    aliases: ['Voltaire'],
  },
  {
    slug: 'john-stuart-mill',
    name: 'John Stuart Mill',
    namePt: 'John Stuart Mill',
    aliases: ['John Stuart Mill'],
  },
  {
    slug: 'saint-augustine',
    name: 'Saint Augustine',
    namePt: 'Santo Agostinho',
    aliases: ['Santo Agostinho', 'Saint Augustine', 'Augustine of Hippo', 'Agostinho'],
  },
  {
    slug: 'soren-kierkegaard',
    name: 'Søren Kierkegaard',
    namePt: 'Søren Kierkegaard',
    aliases: ['Søren Kierkegaard', 'Soren Kierkegaard'],
  },
  {
    slug: 'hannah-arendt',
    name: 'Hannah Arendt',
    namePt: 'Hannah Arendt',
    aliases: ['Hannah Arendt'],
  },
  {
    slug: 'augusto-cury',
    name: 'Augusto Cury',
    namePt: 'Augusto Cury',
    aliases: ['Augusto Cury'],
  },
  {
    slug: 'sigmund-freud',
    name: 'Sigmund Freud',
    namePt: 'Sigmund Freud',
    aliases: ['Sigmund Freud'],
  },
  {
    slug: 'plotinus',
    name: 'Plotinus',
    namePt: 'Plotino',
    aliases: ['Plotino', 'Plotinus'],
  },
  {
    slug: 'isaac-newton',
    name: 'Isaac Newton',
    namePt: 'Isaac Newton',
    aliases: ['Isaac Newton'],
  },
];

const BY_SLUG = new Map(PHILOSOPHER_AUTHORS.map((author) => [author.slug, author]));

const BY_ALIAS = new Map();
PHILOSOPHER_AUTHORS.forEach((author) => {
  [author.name, author.namePt, ...(author.aliases || [])].forEach((alias) => {
    const key = normalizeKey(alias);
    if (key) BY_ALIAS.set(key, author.slug);
  });
});

function resolveLocale(locale) {
  return String(locale || 'en').trim().toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function getPhilosopherSlugByAuthor(author) {
  return BY_ALIAS.get(normalizeKey(author)) || null;
}

export function getPhilosopherAuthorBySlug(slug) {
  return BY_SLUG.get(String(slug || '').trim()) || null;
}

export function isCuratedPhilosopherSlug(slug) {
  return BY_SLUG.has(String(slug || '').trim().toLowerCase());
}

function nameForLocale(entry, locale) {
  const loc = resolveLocale(locale);
  if (loc === 'pt' && entry?.namePt) return entry.namePt;
  return entry?.name || '';
}

/** Nome canónico do pensador, ou o nome recebido quando não é um curado. */
export function getDisplayAuthorName(author, locale = 'en') {
  const slug = getPhilosopherSlugByAuthor(author);
  const entry = slug ? BY_SLUG.get(slug) : null;
  if (entry) return nameForLocale(entry, locale);
  return String(author || 'Unknown');
}

/** Nome exibível a partir de um perfil, slug ou string de autor. */
export function getLocalizedThinkerName(entry, locale = 'en') {
  if (!entry) return '';
  if (typeof entry === 'string') return getDisplayAuthorName(entry, locale);

  const bySlug = entry.slug ? BY_SLUG.get(String(entry.slug).trim()) : null;
  if (bySlug) return nameForLocale(bySlug, locale);
  if (entry.namePt || entry.name) {
    return nameForLocale(entry, locale) || String(entry.name || '');
  }
  return getDisplayAuthorName(entry.name, locale);
}

export function getPhilosopherUrl(slug) {
  if (!slug) return null;
  return `/html/philosopher.html?slug=${encodeURIComponent(slug)}`;
}

/** Slug de emergência para autores que não estão entre os curados. */
export function slugifyName(value) {
  return normalizeKey(value).replace(/\s+/g, '-');
}

export function getPhilosopherUrlByAuthor(author) {
  const slug = getPhilosopherSlugByAuthor(author) || slugifyName(author);
  return slug ? getPhilosopherUrl(slug) : null;
}
