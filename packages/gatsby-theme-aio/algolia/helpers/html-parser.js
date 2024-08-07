// Copyright 2018 Chris Manson
// https://github.com/mansona/html-extractor/blob/master/lib/algoliaHtmlExtractor.js

const { JSDOM } = require('jsdom');

// Extract content from an HTML page in the form of items with associated headings data
module.exports = class HtmlParser {
  defaultOptions(options) {
    return {
      cssSelector: 'p',
      headingSelector: 'h1,h2,h3,h4,h5,h6',
      tagsToExclude: 'script',
      ...options,
    };
  }

  // Getting a list of HTML nodes from an input and a CSS selector
  css(input, selector) {
    return new JSDOM(input).window.document.querySelectorAll(selector);
  }

  run(input, options, file = {}) {
    const runOptions = this.defaultOptions(options);
    const { headingSelector, cssSelector, tagsToExclude } = runOptions;
    //
    const items = [];

    // Populated with the text from html headings h1-h6
    const currentHierarchy = {
      lvl0: null,
      lvl1: null,
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
    };
    let currentPosition = 0; // Position of the DOM node in the tree
    let currentLvl = null; // Current closest headings level
    let currentAnchor = ''; // Current closest anchor
    //
    // We select all nodes that match either the headings or the elements to
    // extract. This will allow us to loop over it in order it appears in the DOM
    this.css(input, `${headingSelector},${cssSelector}`).forEach((node, index) => {
      // If it's a heading, we update our current hierarchy
      if (node.matches(headingSelector)) {
        // Which level heading is it?
        currentLvl = parseInt(this.extractTagName(node).replace(/^h/, ''), 10) - 1;
        // Update this level, and set all the following ones to nil
        currentHierarchy[`lvl${currentLvl}`] = this.extractText(node);

        for (let i = currentLvl + 1; i < 6; i += 1) {
          currentHierarchy[`lvl${i}`] = null;
        }

        // Update the anchor, if the new heading has one
        const newAnchor = this.extractAnchor(node);

        if (newAnchor) {
          currentAnchor = newAnchor;
        }
      }

      // Stop if node is not to be extracted
      if (!node.matches(cssSelector)) {
        return;
      }

      // Removing excluded child from the node
      if (tagsToExclude && tagsToExclude.length) {
        node.querySelectorAll(tagsToExclude).forEach(element => {
          element.remove();
        });
      }

      const content = this.extractText(node);

      // Stop if node is empty
      if (content.length === 0) {
        return;
      }

      const item = {
        html: this.extractHtml(node),
        content,
        description: content.substring(0, 200),
        headings: Object.values(currentHierarchy).filter(h => h),
        node,
        customRanking: {
          position: currentPosition,
          heading: this.headingWeight(currentLvl),
        },
      };

      item.objectID = `${file.contentDigest}_${index}`;
      item.words = content.split(' ').length;
      item.title = Object.values(currentHierarchy).filter(h => h)[0];
      item.contentHeading = Object.values(currentHierarchy).filter(h => h)[1];
      item.anchor =
        currentAnchor === ''
          ? this.getFallbackAnchor(Object.values(currentHierarchy).filter(h => h)[1])
          : currentAnchor;
      items.push(item);
      currentPosition += 1;
    });

    return items;
  }

  // TODO: Fix to work accurately and consistently when HTML source doesn't contain heading id's
  getFallbackAnchor(contentHeading) {
    if (contentHeading == null) return '';

    return `#${contentHeading
      .match(/[a-zA-Z0-9]+/g)
      ?.map(s => s.toLowerCase())
      .join('-')}`;
  }

  // Returns the outer HTML of a given node
  //
  // eg.
  // <p>foo</p> => <p>foo</p>
  extractHtml(node) {
    return node.outerHTML.toString().trim();
  }

  // Returns the inner HTML of a given node
  //
  // eg.
  // <p>foo</p> => foo
  extractText(node) {
    return node.textContent;
  }

  // Returns the tag name of a given node
  //
  // eg
  // <p>foo</p> => p
  extractTagName(node) {
    return node.tagName.toLowerCase();
  }

  // Returns the anchor to the node
  //
  // eg.
  // <h1 name="anchor">Foo</h1> => anchor
  // <h1 id="anchor">Foo</h1> => anchor
  // <h1><a name="anchor">Foo</a></h1> => anchor
  extractAnchor(node) {
    const anchor = node.getAttribute('name') || node.getAttribute('id') || null;

    if (anchor) {
      return anchor;
    }

    // No anchor found directly in the header, search on children
    const subelement = node.querySelector('[name],[id]');

    if (subelement) {
      return this.extractAnchor(subelement);
    }

    return null;
  }

  // Get a relative numeric value of the importance of the heading
  // 100 for top level, then -10 per heading
  headingWeight(headingLevel) {
    const maxWeight = 100;

    if (headingLevel === null || headingLevel === undefined) {
      return maxWeight;
    }

    return maxWeight - (headingLevel + 1) * 10;
  }
};
