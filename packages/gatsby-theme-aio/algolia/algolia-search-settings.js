// These are the search settings that determine which records are retrieved from the site's index.
// These settings determine the relevance, order, and content of the search results shown on the screen.

module.exports = {
<<<<<<< HEAD:packages/gatsby-theme-aio/algolia/search-settings/algolia-search-settings.js
  ALGOLIA_INDEX_SETTINGS: {
=======
  ALGOLIA_SEARCH_SETTINGS: {
>>>>>>> b81f27a (fix: fixed record overwrites and cleaned up duplicate code):packages/gatsby-theme-aio/algolia/algolia-search-settings.js
    searchableAttributes: [
      'title',
      'unordered(content)',
      'unordered(headings)',
      'unordered(description)',
<<<<<<< HEAD:packages/gatsby-theme-aio/algolia/search-settings/algolia-search-settings.js
      'unordered(excerpt)',
=======
      'unordered(excerpt)'
>>>>>>> b81f27a (fix: fixed record overwrites and cleaned up duplicate code):packages/gatsby-theme-aio/algolia/algolia-search-settings.js
    ],
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    customRanking: ['desc(spotlight)', 'desc(words)'],
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
    advancedSyntax: true
  }
}
