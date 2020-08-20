/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

const JsDocParameters = ({ items }) => {
  const createAccordionItems = (items) => {
    const acc = [];
    let header = '';
    let body = [];
    for (let i = 0; i < items.length; i++) {
      let type = items[i].props.mdxType;
      if (type === 'a' && body.length === 0) {
        body.push(items[i]);
      } else if (type === 'a' && body.length > 0) {
        // create new Item
        acc.push(<AccordionItem header={header}>{body}</AccordionItem>);
        body = [items[i]];
      } else if (type.match(/h\d/)) {
        console.log(items[i]);
        header = items[i].props.children;
      } else {
        body.push(items[i]);
      }
    }

    acc.push(<AccordionItem header={header}>{body}</AccordionItem>);

    return acc;
  };
  const accordionItems = createAccordionItems(items);
  return <Accordion>{accordionItems}</Accordion>;
};

JsDocParameters.propTypes = {};

export { JsDocParameters };
