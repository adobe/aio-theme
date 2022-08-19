// These are the search settings that determine which records are retrieved from the site's index.
// These settings determine the relevance, order, and content of the search results shown on the screen.

module.exports = {
  ALGOLIA_INDEX_SETTINGS: {
    searchableAttributes: ['title', 'unordered(contentHeading)', 'unordered(description)'],
    attributesForFaceting: ['searchable(keywords)'],
    attributesToSnippet: ['content:20', 'description'],
    snippetEllipsisText: '…',
    attributesToRetrieve: [
      'objectID',
      'title',
      'description',
      'lastUpdated',
      'contentHeading',
      'url',
      'keywords',
      'edition',
      'words'
    ],
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
};
