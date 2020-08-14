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
import nextId from 'react-id-generator';
import { css } from '@emotion/core';
import classNames from 'classnames';
import { ChevronDown } from './Icons';
import { Popover } from './Popover';
import '@spectrum-css/dropdown';
import '@spectrum-css/menu';

const Picker = ({ label, isQuiet, items, onChange, ...props }) => {
  const popover = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [options, setOptions] = useState(items);
  const id = nextId();

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
      {...props}
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
      <Popover variant="picker" isQuiet={isQuiet} isOpen={openMenu} ref={popover}>
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
                  href={option.path}
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

const PickerButton = ({ children, isOpen, isQuiet, ariaControls, ...props }) => (
  <div
    {...props}
    className={classNames('spectrum-Dropdown', { 'spectrum-Dropdown--quiet': isQuiet }, { 'is-open': isOpen })}>
    <button
      className={classNames(
        'spectrum-FieldButton',
        'spectrum-Dropdown-trigger',
        { 'spectrum-FieldButton--quiet': isQuiet },
        { 'is-selected': isOpen }
      )}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={ariaControls}>
      <span className="spectrum-Dropdown-label">{children}</span>
      <ChevronDown className="spectrum-Dropdown-icon" />
    </button>
  </div>
);

Picker.propTypes = {
  label: PropTypes.string,
  isQuiet: PropTypes.bool,
  items: PropTypes.array,
  width: PropTypes.string,
  onChange: PropTypes.func
};

PickerButton.propTypes = {
  isQuiet: PropTypes.bool,
  isOpen: PropTypes.bool,
  ariaControls: PropTypes.string
};

export { Picker, PickerButton };
