// These are the search settings that determine which records are retrieved from the site's index.
// These settings determine the relevance, order, and content of the search results shown on the screen.

module.exports = {
  ALGOLIA_INDEX_SETTINGS: {
    searchableAttributes: ['title', 'unordered(headings)', 'unordered(description)', 'unordered(content)'],
    customRanking: ['desc(spotlight)', 'desc(words)', 'desc(size)', 'desc(lastUpdated)'],
    attributesForFaceting: ['keywords'],
    attributesToSnippet: ['content:40', 'description:20'],
    snippetEllipsisText: '…',
    attributesToRetrieve: ['title', 'description', 'content', 'spotlight', 'customRanking', 'url', 'keywords', 'words'],
    attributesToHighlight: ['title', 'description', 'content'],
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
