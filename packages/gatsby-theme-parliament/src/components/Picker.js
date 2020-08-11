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

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import classNames from 'classnames';
import { ChevronDown } from './Icons';
import { Popover } from './Popover';
import '@spectrum-css/icon';
import '@spectrum-css/dropdown';
import '@spectrum-css/menu';

const Picker = ({ label, isQuiet, items, onChange }) => {
  const popover = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [options, setOptions] = useState(items);
  const id = new Date().getTime();

  useEffect(() => {
    const onClick = (event) => {
      if (!popover.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div
      className={classNames('spectrum-Dropdown', {
        'is-open': openMenu,
        'spectrum-Dropdown--quiet': isQuiet
      })}>
      <button
        className={classNames(
          'spectrum-FieldButton',
          'spectrum-Dropdown-trigger',
          { 'is-selected': openMenu },
          { 'spectrum-FieldButton--quiet': isQuiet }
        )}
        aria-haspopup="listbox"
        aria-expanded={openMenu}
        aria-controls={id}
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
          setOpenMenu(!openMenu);
        }}>
        <span className={classNames('spectrum-Dropdown-label', { 'is-placeholder': label })}>
          {label || options.find((option) => option.selected).title}
        </span>
        <ChevronDown className="spectrum-Dropdown-icon" />
      </button>
      <Popover isOpen={openMenu} isQuiet={isQuiet} ref={popover}>
        <ul className="spectrum-Menu" role="listbox">
          {options.map((option, i) => {
            const isSelected = option.selected;

            return (
              <li
                key={i}
                onClick={() => {
                  setOptions(
                    options.map(({ selected, ...option }, k) => ({
                      selected: k === i,
                      ...option
                    }))
                  );

                  setOpenMenu(false);
                  onChange && onChange(i);
                }}
                aria-selected={isSelected}
                className={classNames('spectrum-Menu-item', { 'is-selected': isSelected })}
                role="option"
                tabIndex="0">
                <a
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                  href={option.url}
                  className="spectrum-Menu-itemLabel">
                  {option.title}
                </a>
              </li>
            );
          })}
        </ul>
      </Popover>
    </div>
  );
};

Picker.propTypes = {
  label: PropTypes.string,
  isQuiet: PropTypes.bool,
  items: PropTypes.array,
  width: PropTypes.string,
  onChange: PropTypes.func
};

export { Picker };
