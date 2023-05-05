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

import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import '@spectrum-css/table';
import { MOBILE_SCREEN_WIDTH } from '../../utils';

const Table = ({ children, ...props }) => {
  const [width, setWidth] = useState(MOBILE_SCREEN_WIDTH);
  const tableRef = useRef(null);
  const columnWidthDistribution = props.columnWidths
    ? props.columnWidths
        .split(',')
        .map(num => (width * Number(num)) / 100)
        .filter(width => !isNaN(width))
    : [];

  useEffect(() => {
    if (tableRef.current.parentNode) {
      setWidth(Number(tableRef.current.parentNode.offsetWidth));
    }
  }, [width]);

  return (
    <table
      ref={tableRef}
      className="spectrum-Table spectrum-Table--sizeM"
      css={css`
        overflow-x: hidden;
        overflow-y: hidden;
        margin-bottom: var(--spectrum-global-dimension-size-150);
        width: ${width}px;
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
  const childrenArr = children.length > 1 ? children : [children];
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
  const columnCount = parseInt(children.length);
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
      {children.map((child, index) => {
        child.props.cellWidth = columnWidthDistribution[index];
        return child;
      })}
    </tr>
  );
};

const Td = ({ children, ...props }) => {
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
        {children}
      </div>
    </td>
  );
};

export { Table, THead, Th, TBody, Tr, Td };
