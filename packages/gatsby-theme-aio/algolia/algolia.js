// algolia.js

const { selectAll } = require('unist-util-select');
const { v4: uuidv4 } = require('uuid');

const MIN_TEXT_LENGTH = 20;

const mdxQuery = `
{
  allMdx(
    filter: {fileAbsolutePath: {regex: "/src/pages/"}, wordCount: {words: {gte: 10}}}
  ) {
    edges {
      node {
        objectID: id
        headings {
          value
        }
        frontmatter {
          title
          description
          contributors
          keywords
        }
        slug
        excerpt
        mdxAST
      }
    }
  }
}

`;

const flattenFrontmatter = (node) => {
  const { frontmatter, ...rest } = node;
  return {
    ...frontmatter,
    ...rest
  };
};

const createRecords = (node) => {
  const { mdxAST, objectID, slug, headings, title, ...rest } = node;

  const paragraphs = selectAll('paragraph text', mdxAST);
  const codeBlocks = selectAll('code', mdxAST);
  const tableCells = selectAll('tableCell text', mdxAST);
  //const headingNodes = selectAll('heading text', mdxAST);
  const nodesForRecords = [...paragraphs, ...codeBlocks, ...tableCells].filter((record) => {
    return record.position.end.column - record.position.start.column > MIN_TEXT_LENGTH;
  });

  const records = nodesForRecords.map((record) => {
    //const headingForNode = headingNodes.filter((heading) => heading.position.start.line < record.position.end.line);
    return {
      objectID: uuidv4(record.value.toString()),
      title: title === '' ? headings[0]?.value : title,
      ...rest,
      headings: headings.map((heading) => heading.value), //headingForNode.pop()?.value,
      content: record.value,
      slug: slug,
      pageID: objectID
    };
  });

  console.log('🚀 ~ createRecords ~ records', records);

  return records;
};

const queries = [
  {
    query: mdxQuery,
    settings: {
      attributeForDistinct: 'id',
      distinct: true
    },
    transformer: ({ data }) => {
      return data.allMdx.edges
        .map((edge) => edge.node)
        .map(flattenFrontmatter)
        .map(createRecords)
        .reduce((acc, cur) => [...acc, ...cur], []);
    }
  }
];

module.exports = queries;
