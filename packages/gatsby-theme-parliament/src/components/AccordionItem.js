/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronRight from '@spectrum-icons/workflow/ChevronRight';

import '@spectrum-css/accordion';
// import './index.css';

const AccordionItem = ({ header, isOpen = false, isDisabled = false, children, ...props }) => {
  const [open, setOpen] = useState(isOpen);
  const onClick = () => {
    if (!isDisabled) {
      setOpen((open) => !open);
    }
  };

  console.log(header);

  return (
    <div
      className={classNames(['spectrum-Accordion-item', { 'is-open': open }, { 'is-disabled': isDisabled }])}
      role="presentation"
      {...props}>
      <h3 className="spectrum-Accordion-itemHeading">
        <button className="spectrum-Accordion-itemHeader" type="button" aria-expanded={open} onClick={onClick}>
          {header}
        </button>
        <ChevronRight size="S" UNSAFE_className="spectrum-Accordion-itemIndicator parliament-Accordion-itemIndicator" />
      </h3>
      <div className="spectrum-Accordion-itemContent" role="region">
        {children}
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  header: PropTypes.string,
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool
};

export { AccordionItem };
