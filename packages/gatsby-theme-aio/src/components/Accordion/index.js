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
import { ChevronRight, ChevronDown } from '../Icons';
import '@spectrum-css/accordion';

const Accordion = ({ children, ...props }) => (
  <div className="spectrum-Accordion" role="region" {...props}>
    {children}
  </div>
);

const AccordionItem = ({ header, slot_id, isOpen = false, children, isChevronIcon = false, iconColor, position = "left", ...props }) => {
  const [open, setOpen] = useState(isOpen);
  const [hover, setHover] = useState();
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    setOpen(window.location.href.endsWith(slot_id))
  }, [slot_id])

  return (
    <div className={classNames(['spectrum-Accordion-item', { 'is-open': open }])} role="presentation" {...props}>
      <div aria-hidden="true" id={slot_id ? slot_id : null} class="css-vpapan-Anchor"></div>
      <h3 className="spectrum-Accordion-itemHeading"
        css={css`
        display : ${!isChevronIcon && "flex !important "};
        flex-direction:  ${(position === "left" && !isChevronIcon) && "row-reverse !important"};
        background : ${hover ? "#e9eaeb" : "#fff"};
        gap:5px !important;
        `}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <button
          className="spectrum-Accordion-itemHeader"
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
          onKeyDown={toggleOpen}
          css={css`
            text-transform: var(--spectrum-body-m-text-transform, none) !important;
            font-size: var(--spectrum-body-m-text-size, var(--spectrum-global-dimension-font-size-300)) !important;
            color: var(--spectrum-listitem-m-text-color-hover, var(--spectrum-alias-text-color));
            font-weight: var(--spectrum-global-font-weight-bold) !important;
            width: 100% !important;
            justify-content: ${(position === "right" && isChevronIcon) && "space-between !important"};
            flex-direction:  ${(position === "right" && isChevronIcon) && "row-reverse !important"};
            gap: ${(position === "right" && isChevronIcon) && "10px !important"}
          `}>
          {isChevronIcon && <span className={`spectrum-Accordion-ChevronIcon`}
            css={css`color: ${iconColor ? iconColor : "black"}`} aria-hidden="true" >{open ? <ChevronDown /> : <ChevronRight />}</span>}
          {header}
        </button>
        {!isChevronIcon && <div css={css`
          color: ${iconColor ? iconColor : "black"};
          display : flex !important ;
          justify-content:center !important;
          align-items:center !important;
          `}
          aria-hidden="true" onClick={toggleOpen}>{open ? "-" : "+"}</div>}
      </h3>

      <div className="spectrum-Accordion-itemContent" role="region" >
        {children}
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isOpen: PropTypes.bool,
  isChevronIcon: PropTypes.bool,
  position: PropTypes.string,
  iconColor: PropTypes.string
};

export { Accordion, AccordionItem };