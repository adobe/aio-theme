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

import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import '@spectrum-css/table';
import { MOBILE_SCREEN_WIDTH, useParentSize } from '../../utils';
import {TableContext} from '../Context';

const Table = ({ children, css: cssOverrides, columnWidths, ...props }) => {
  const tableRef = useRef(null);
  const [width, setWidth] = useState(parseInt(MOBILE_SCREEN_WIDTH, 10));

  useParentSize(tableRef, {
    debounceDelay: 500,
    initialValues: { width: parseInt(MOBILE_SCREEN_WIDTH, 10) },
    callback: size => {
      if (size.width) {
        setWidth(size.width);
      }
    },
  });

  const columnWidthDistribution = columnWidths
    ? columnWidths
        .split(',')
        .map(num => (width * Number(num)) / 100)
        .filter(width => !isNaN(width))
    : [];

  return (
    <table
      ref={tableRef}
      className="spectrum-Table spectrum-Table--sizeM"
      css={css`
        overflow: hidden;
        margin-bottom: var(--spectrum-global-dimension-size-150);
        width: ${width}px;
        ${cssOverrides}
      `}
      {...props}>
      {children.map(child => {
        child.props.tableWidth = width;
        child.props.columnWidthDistribution = columnWidthDistribution;
        return child;
      })}
    </table>
  );
};

const THead = ({ children, ...props }) => {
  return (
    <thead
      className="spectrum-Table-head"
      css={css`
        width: ${props.parentWidth}px;
      `}>
      {[children].map(child => {
        child.props.tableWidth = props.tableWidth;
        child.props.columnWidthDistribution = props.columnWidthDistribution;
        return child;
      })}
    </thead>
  );
};

const Th = ({ children }) => <th className="spectrum-Table-headCell">{children}</th>;

const TBody = ({ children, ...props }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  return (
    <tbody
      className="spectrum-Table-body"
      css={css`
        width: ${props.tableWidth}px;
      `}>
      {childrenArr.map(child => {
        child.props.tableWidth = props.tableWidth;
        child.props.columnWidthDistribution = props.columnWidthDistribution;
        return child;
      })}
    </tbody>
  );
};

const Tr = ({ children, ...props }) => {
  const tableWidth = props.tableWidth;
  const columnCount = isNaN(children.length) ? 1 : parseInt(children.length);
  const columnWidthDistribution = !props.columnWidthDistribution.length
    ? Array(columnCount).fill(Number(tableWidth) / columnCount)
    : props.columnWidthDistribution;

  return (
    <tr
      className="spectrum-Table-row"
      css={css`
        cursor: inherit;
        width: ${props.tableWidth}px;

        &:hover {
          background-color: inherit;
        }
      `}>
      {columnCount === 1
        ? children
        : children.map((child, index) => {
            child.props.cellWidth = columnWidthDistribution[index];
            return child;
          })}
    </tr>
  );
};

const Td = ({ children, ...props }) => {
  const [isTable, setIsTable] = useState(true);

  return (
    <td
      className="spectrum-Table-cell"
      css={css`
        width: ${props.cellWidth}px;
        max-width: ${props.cellWidth}px;

        overflow-x: auto;
      `}>
      <div
        css={css`
          max-width: ${props.cellWidth}px;
        `}>
        <TableContext.Provider value={{ isTable, setIsTable }}>{children}</TableContext.Provider>
      </div>
    </td>
  );
};

Table.propTypes = {
  css: PropTypes.string,
  columnWidths: PropTypes.string,
};

export { Table, THead, Th, TBody, Tr, Td };
