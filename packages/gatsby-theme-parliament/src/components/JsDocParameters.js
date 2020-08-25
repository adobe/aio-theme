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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Accordion, AccordionItem } from '@adobe/parliament-ui-components';

const ANCHOR = 'a';

const JsDocParameters = ({ items }) => {
  const createAccordionItems = (items) => {
    const acc = [];
    let header = '';
    let body = [];
    let id = '';
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let type = item.props.mdxType;
      if (type === ANCHOR) {
        if (body.length > 0) {
          // create new Item
          acc.push(
            <AccordionItem uppercase={false} header={header} id={id} key={id}>
              {body}
            </AccordionItem>
          );
        }
        id = item.props.id;
      } else if (type.match(/h\d/)) {
        header = item.props.children;
      } else {
        body.push(item);
      }
    }

    acc.push(
      <AccordionItem uppercase={false} header={header} id={id} key={id}>
        {body}
      </AccordionItem>
    );

    return acc;
  };

  useEffect(() => {
    window.addEventListener('popstate', shouldOpenAccordion);
    return () => window.removeEventListener('popstate', shouldOpenAccordion);
  }, []);

  const shouldOpenAccordion = (event) => {
    const hash = event.target.location.hash ? event.target.location.hash.substring(1) : null;
    const el = document.getElementById(hash);
    if (el.classList.contains('spectrum-Accordion-item')) {
      el.classList.add('is-open');
    }
  };

  return <Accordion>{createAccordionItems(items)}</Accordion>;
};

JsDocParameters.propTypes = {
  items: PropTypes.array
};

export { JsDocParameters };
