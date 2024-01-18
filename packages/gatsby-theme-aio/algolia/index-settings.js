const indexSettings = () => {
  return {
    searchableAttributes: [
      'title',
      'contentHeading',
      'unordered(content)',
      'unordered(description)',
      'unordered(excerpt)',
    ],
    advancedSyntax: true,
    allowTyposOnNumericTokens: true,
    attributeForDistinct: 'title',
    attributesForFaceting: ['product', 'category', 'keywords'],
    attributesToHighlight: ['title', 'description', 'contentHeading', 'content', 'excerpt'],
    attributesToRetrieve: ['*'],
    attributesToSnippet: ['content:20', 'description:20', 'excerpt:20'],
    camelCaseAttributes: ['contentHeading', 'description', 'excerpt'],
    customRanking: ['desc(featured)', 'desc(isNew)', 'desc(howRecent)', 'desc(size)'],
    distinct: 1,
    hitsPerPage: 20,
    ignorePlurals: true,
    minProximity: 1,
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    removeWordsIfNoResults: 'none',
    responseFields: ['*'],
    restrictHighlightAndSnippetArrays: false,
    snippetEllipsisText: '…',
    typoTolerance: true,
  }
};

export { indexSettings }
