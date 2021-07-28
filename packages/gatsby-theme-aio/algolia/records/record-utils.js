const AlgoliaHTMLExtractor = require('algolia-html-extractor');
const htmlExtractor = new AlgoliaHTMLExtractor();
const { selectAll } = require('unist-util-select');
const { v4: uuidv4 } = require('uuid');

const createRawRecords = (node, options, fileContent = null) => {
  if (fileContent != null) {
    return htmlExtractor
      .run(fileContent, { cssSelector: options.tagsToIndex })
      .filter((record) => record.content.length >= options.minCharsLengthPerTag);
  } else {
    // https://mdxjs.com/table-of-components
    return selectAll(options.tagsToIndex, node.mdxAST).filter(
      (record) => record.value.length >= options.minCharsLengthPerTag
    );
  }
};

const createAlgoliaRecords = (node, records) => {
  let { mdxAST, objectID, title, slug, headings, wordCount, ...restNodeFields } = node;

  return records.map((record) => ({
    objectID: record.objectID ?? uuidv4(record.value.toString()),
    title: getTitle(node),
    ...restNodeFields,
    // TODO: Rethinking getHeadings() and use node.headings instead
    previousHeadings: record.html ? record.headings : getHeadings(node, record),
    contentHeading: record.html ? record.headings.slice(-1)[0] : getHeadings(node, record).slice(-1)[0],
    content: record.content ?? record.value,
    slug: slug,
    words: wordCount.words,
    anchor: record.html ? getAnchorLink(record.headings) : getAnchorLink(getHeadings(node, record)),
    customRanking: record.customRanking ?? '',
    pageID: objectID
  }));
};

const getHeadings = (node, record) => {
  let filteredHeadings = selectAll('heading text', node.mdxAST)
    .filter((heading) => heading.position.start.line < record.position.end.line)
    .filter((heading) => heading.value !== 'Request' && heading.value !== 'Response'); // Removes jsdoc code tabs
  return filteredHeadings.map(({ value }) => value);
};

const getAnchorLink = (linkHeadings) =>
  `#${linkHeadings
    .slice(-1)
    .toString()
    ?.match(/[a-zA-Z]\w+/g)
    ?.map((s) => s.toLowerCase())
    .join('-')}`;

const getTitle = (node) => (node.title === '' || node.title == null ? node.headings[0]?.value : node.title);

const removeDuplicateRecords = (records, title) => {
  let uniqueContents = [];

  records = records.filter((record) => {
    let contentExist = true;
    if (!uniqueContents.includes(record.content)) {
      uniqueContents.push(record.content);
      contentExist = false;
    }
    return !contentExist;
  });
  return records;
};

module.exports = { createAlgoliaRecords, createRawRecords, removeDuplicateRecords };
