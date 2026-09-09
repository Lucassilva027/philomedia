import {
  PHILOSOPHER_AUTHORS,
  getDisplayAuthorName,
  getLocalizedThinkerName,
  getPhilosopherSlugByAuthor,
  getPhilosopherUrl,
  getPhilosopherUrlByAuthor,
  isCuratedPhilosopherSlug,
} from '../../public/scripts/domain/philosopherAuthors.js';
import { PHILOSOPHER_DEFINITIONS } from '../../public/scripts/philosopher-data.js';

describe('philosopherAuthors is the single source of thinker identity', () => {
  // A home e a página de detalhes importam este módulo em vez de
  // philosopher-data.js para não baixar ~40 KB de biografias. Se as duas listas
  // divergirem, um autor deixa de resolver para o seu perfil.
  test('every definition is backed by an author entry, in the same order', () => {
    expect(PHILOSOPHER_AUTHORS.map((a) => a.slug))
      .toEqual(PHILOSOPHER_DEFINITIONS.map((d) => d.slug));
  });

  test('names and aliases match the full definitions', () => {
    PHILOSOPHER_DEFINITIONS.forEach((definition) => {
      const author = PHILOSOPHER_AUTHORS.find((a) => a.slug === definition.slug);

      expect(author.name).toBe(definition.name);
      expect(author.aliases).toEqual(definition.aliases);
    });
  });

  test('every curated thinker has a Portuguese display name', () => {
    PHILOSOPHER_AUTHORS.forEach((author) => {
      expect(String(author.namePt || '').trim()).not.toBe('');
    });
  });

  test('flags curated slugs and ignores community names', () => {
    expect(isCuratedPhilosopherSlug('socrates')).toBe(true);
    expect(isCuratedPhilosopherSlug('Socrates')).toBe(true);
    expect(isCuratedPhilosopherSlug('albert-camus')).toBe(false);
  });
});

describe('author lookup', () => {
  test('resolves a canonical name', () => {
    expect(getPhilosopherSlugByAuthor('Socrates')).toBe('socrates');
  });

  test('resolves Portuguese aliases to the curated slug', () => {
    expect(getPhilosopherSlugByAuthor('Aristóteles')).toBe('aristotle');
    expect(getPhilosopherSlugByAuthor('Platão')).toBe('plato');
    expect(getPhilosopherSlugByAuthor('Nicolau Maquiavel')).toBe('niccolo-machiavelli');
  });

  test('is insensitive to case, accents and punctuation', () => {
    expect(getPhilosopherSlugByAuthor('niccolò machiavelli')).toBe('niccolo-machiavelli');
    expect(getPhilosopherSlugByAuthor('NiccolÃ² Machiavelli')).toBe('niccolo-machiavelli');
  });

  test('returns null for an unknown author', () => {
    expect(getPhilosopherSlugByAuthor('Nobody At All')).toBeNull();
    expect(getPhilosopherSlugByAuthor('')).toBeNull();
    expect(getPhilosopherSlugByAuthor(undefined)).toBeNull();
  });
});

describe('getDisplayAuthorName', () => {
  test('returns the canonical name for a curated thinker', () => {
    expect(getDisplayAuthorName('NiccolÃ² Machiavelli')).toBe('Niccolò Machiavelli');
  });

  test('returns the Portuguese display name when locale is pt', () => {
    expect(getDisplayAuthorName('Aristotle', 'pt')).toBe('Aristóteles');
    expect(getDisplayAuthorName('Plato', 'pt')).toBe('Platão');
    expect(getDisplayAuthorName('Socrates', 'pt')).toBe('Sócrates');
    expect(getDisplayAuthorName('Saint Augustine', 'pt')).toBe('Santo Agostinho');
    expect(getDisplayAuthorName('Heraclitus', 'pt')).toBe('Heráclito');
    expect(getDisplayAuthorName('Niccolò Machiavelli', 'pt')).toBe('Nicolau Maquiavel');
  });

  test('keeps English names when locale is en', () => {
    expect(getDisplayAuthorName('Aristotle', 'en')).toBe('Aristotle');
    expect(getDisplayAuthorName('Aristóteles', 'en')).toBe('Aristotle');
  });

  test('passes through an unknown author unchanged', () => {
    expect(getDisplayAuthorName('Some Unlisted Writer')).toBe('Some Unlisted Writer');
    expect(getDisplayAuthorName('Some Unlisted Writer', 'pt')).toBe('Some Unlisted Writer');
  });

  test('falls back to Unknown for empty input', () => {
    expect(getDisplayAuthorName('')).toBe('Unknown');
    expect(getDisplayAuthorName(null)).toBe('Unknown');
  });
});

describe('profile URLs', () => {
  test('builds a slug URL', () => {
    expect(getPhilosopherUrl('socrates')).toBe('/html/philosopher.html?slug=socrates');
  });

  test('returns null without a slug', () => {
    expect(getPhilosopherUrl('')).toBeNull();
    expect(getPhilosopherUrl(null)).toBeNull();
  });

  test('localizes a thinker profile by slug', () => {
    expect(getLocalizedThinkerName({ slug: 'plotinus', name: 'Plotinus' }, 'pt')).toBe('Plotino');
    expect(getLocalizedThinkerName({ slug: 'plotinus', name: 'Plotinus' }, 'en')).toBe('Plotinus');
  });

  test('prefers the curated slug over a derived one', () => {
    expect(getPhilosopherUrlByAuthor('Socrates')).toBe('/html/philosopher.html?slug=socrates');
  });

  test('derives a slug for an author outside the curated set', () => {
    expect(getPhilosopherUrlByAuthor('Some Unlisted Writer'))
      .toBe('/html/philosopher.html?slug=some-unlisted-writer');
  });

  test('returns null when no slug can be derived', () => {
    expect(getPhilosopherUrlByAuthor('')).toBeNull();
    expect(getPhilosopherUrlByAuthor('!!!')).toBeNull();
  });
});
