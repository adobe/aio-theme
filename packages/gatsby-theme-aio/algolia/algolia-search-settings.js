// These are the search settings that determine which records are retrieved from the site's index.
// These settings determine the relevance, order, and content of the search results shown on the screen.

module.exports = {
  ALGOLIA_SEARCH_SETTINGS: {
    searchableAttributes: [
      'title',
      'unordered(content)',
      'unordered(headings)',
      'unordered(description)',
      'unordered(excerpt)',
    ],
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    customRanking: ['desc(spotlight)'],
    attributesForFaceting: ['keywords'],
    attributesToSnippet: ['content:20', 'description:20', 'excerpt:20'],
    snippetEllipsisText: '…',
    attributesToRetrieve: ['*'],
    attributesToHighlight: ['title', 'content', 'headings', 'description', 'excerpt'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    hitsPerPage: 20,
    ignorePlurals: true,
    restrictHighlightAndSnippetArrays: false,
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    typoTolerance: true,
    allowTyposOnNumericTokens: true,
    minProximity: 1,
    responseFields: ['*'],
    advancedSyntax: true,
  },
};
