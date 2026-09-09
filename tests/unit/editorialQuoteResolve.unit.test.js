import { jest } from '@jest/globals';

const mockBuildQuoteCatalog = jest.fn();

await jest.unstable_mockModule('../../src/services/quoteCatalog.js', () => ({
  buildQuoteCatalog: mockBuildQuoteCatalog,
}));

const { resolveEditorialQuoteForLocale, clearEditorialQuoteCatalogCache } = await import(
  '../../src/services/editorialQuoteResolve.js'
);

describe('resolveEditorialQuoteForLocale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearEditorialQuoteCatalogCache();
  });

  test('returns English quote unchanged for en locale', async () => {
    const quote = 'Only in English.';
    const result = await resolveEditorialQuoteForLocale(
      { quote, author: 'Socrates' },
      'en',
    );
    expect(result).toBe(quote);
    expect(mockBuildQuoteCatalog).not.toHaveBeenCalled();
  });

  test('resolves Portuguese when author alias matches catalog', async () => {
    const english = 'Heraclitus said that if happiness consisted in bodily pleasures, we should call cattle happy when they find vetch to eat.';

    mockBuildQuoteCatalog.mockResolvedValue([
      {
        author: 'Heraclitus',
        quote_en: english,
        quote_pt: 'Heráclito disse que se a felicidade estivesse nos prazeres do corpo, diríamos felizes os bois.',
        quote_original: english,
        originalLanguage: 'en',
      },
    ]);

    const result = await resolveEditorialQuoteForLocale(
      { quote: english, author: 'Heráclito' },
      'pt',
    );

    expect(result).toContain('Heráclito');
    expect(result).not.toBe(english);
  });

  test('resolves Portuguese when the English line matches quote_en', async () => {
    mockBuildQuoteCatalog.mockResolvedValue([
      {
        author: 'Søren Kierkegaard',
        quote_en: 'Envy is concealed admiration.',
        quote_pt: 'A inveja é admiração escondida.',
        quote_original: 'A inveja é admiração escondida.',
        originalLanguage: 'pt',
      },
    ]);

    const result = await resolveEditorialQuoteForLocale(
      { quote: 'Envy is concealed admiration.', author: 'Søren Kierkegaard' },
      'pt',
    );

    expect(result).toBe('A inveja é admiração escondida.');
  });
});
