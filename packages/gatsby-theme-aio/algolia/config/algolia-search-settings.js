// These are the search settings that determine which records are retrieved from the site's index.
// These settings determine the relevance, order, and content of the search results shown on the screen.

module.exports = {
  ALGOLIA_INDEX_SETTINGS: {
    searchableAttributes: ['title', 'unordered(headings)', 'unordered(description)', 'unordered(content)'],
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    customRanking: ['desc(spotlight)', 'desc(size)'],
    attributesForFaceting: ['keywords'],
    attributesToSnippet: ['content:20', 'description:20'],
    snippetEllipsisText: '…',
    attributesToRetrieve: ['*'],
    attributesToHighlight: ['title', 'headings', 'description', 'content'],
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
