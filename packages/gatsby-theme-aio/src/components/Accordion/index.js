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

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronRight } from '../Icons';
import '@spectrum-css/accordion';

const Accordion = ({ children, ...props }) => (
  <div className="spectrum-Accordion" role="region" {...props}>
    {children}
  </div>
);

const AccordionItem = ({ header, slot_id, isOpen = false, children, ...props }) => {
  const [open, setOpen] = useState(isOpen);
  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    setOpen(window.location.href.endsWith(slot_id))
  }, [])

  return (
    <div className={classNames(['spectrum-Accordion-item', { 'is-open': open }])} role="presentation" {...props}>
      <div aria-hidden="true" id={slot_id ? slot_id : null} class="css-vpapan-Anchor"></div>
      <h3 className="spectrum-Accordion-itemHeading">
        <button
          className="spectrum-Accordion-itemHeader"
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
          css={css`
            text-transform: none;
          `}>
          {header}
        </button>
        {/* <ChevronRight className="spectrum-Accordion-itemIndicator" /> */}
        <span className="spectrum-Accordion-itemIndicator" onClick={toggleOpen}>{open ? "-" : "+"}</span>
      </h3>
      <div className="spectrum-Accordion-itemContent" role="region">
        {children}
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isOpen: PropTypes.bool
};

export { Accordion, AccordionItem };
