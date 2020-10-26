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

// TODO reuse ProductCard

import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { Flex } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';
import { Button } from '@adobe/react-spectrum';
import { ButtonGroup } from '@adobe/react-spectrum';
import { CheckboxGroup } from '@adobe/react-spectrum';
import { Checkbox } from '@adobe/react-spectrum';
import { Picker, Item } from '@adobe/react-spectrum';
import '@spectrum-css/typography';
import '@spectrum-css/card';
import { getExternalLinkProps, LARGE_SCREEN_WIDTH } from '../../utils';
import nextId from 'react-id-generator';
import PropTypes from 'prop-types';

const filterByClouds = (products, cloudFilter, additionalFilter, setFilteredProducts) => {
  let filteredProducts = products;
  if (cloudFilter.length) {
    filteredProducts = products.filter(({ cloud }) => cloudFilter.some((selectedCloud) => cloud === selectedCloud));
  }

  const selectedFilter = additionalFilters.find(({ value }) => value === additionalFilter);

  setFilteredProducts(selectedFilter.filter(filteredProducts, selectedFilter.ids));
};

const filterByName = (products) => products.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB));

const filterByLastUpdated = (products) =>
  products.sort(({ lastUpdated: lastUpdatedA }, { lastUpdated: lastUpdatedB }) => {
    if (new Date(lastUpdatedB) > new Date(lastUpdatedA)) {
      return 1;
    } else if (new Date(lastUpdatedB) < new Date(lastUpdatedA)) {
      return -1;
    }
    return 0;
  });

const filterById = (products, ids = []) => products.filter((product) => ids.includes(product.id));

const additionalFilters = [
  {
    name: 'Last updated',
    value: 'last_updated',
    filter: filterByLastUpdated
  },
  {
    name: 'Name',
    value: 'name',
    filter: filterByName
  },
  {
    value: 'id',
    filter: filterById,
    ids: []
  }
];

const ProductCardGrid = ({ clouds = [], products = [], interaction = false, filterByCloud = [], filterByIds = [] }) => {
  let defaultFilter = additionalFilters[0];

  if (filterByIds.length) {
    defaultFilter = additionalFilters.find(({ value }) => value === 'id');
    defaultFilter.ids = filterByIds;
  }

  const [additionalFilter, setAdditionalFilter] = useState(defaultFilter.value);
  const [filteredProducts, setFilteredProducts] = useState(defaultFilter.filter(products, defaultFilter.ids));
  const [cloudFilter, setCloudFilter] = useState(filterByCloud);

  useEffect(() => {
    filterByClouds(products, cloudFilter, additionalFilter, setFilteredProducts);
  }, [cloudFilter, additionalFilter]);

  const headingId = nextId();
  const height = 'calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-500))';
  const width = 'calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-800))';

  return (
    <section
      className={`spectrum--light`}
      css={css`
        max-width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
        margin: var(--spectrum-global-dimension-size-400) auto;

        @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
          #ProductCardGrid-main {
            flex-direction: column;
            align-items: center !important;
          }
        }
      `}>
      {interaction && (
        <Flex alignItems="right" height="size-800" justifyContent="end" marginEnd="size-400">
          <Flex alignItems="center" justifyContent="center">
            <Picker
              isQuiet
              items={additionalFilters.slice(0, 2)}
              onSelectionChange={(selected) => setAdditionalFilter(selected)}
              defaultSelectedKey="last_updated"
              aria-label="Filter by name or last updated product"
              marginStart="size-100">
              {(item) => <Item key={item.value}>{item.name}</Item>}
            </Picker>
          </Flex>
        </Flex>
      )}
      <Flex id="ProductCardGrid-main">
        {interaction && (
          <Flex alignItems="end" width="size-3000" direction="column">
            <Flex alignItems="start" direction="column">
              <h4
                id={headingId}
                className="spectrum-Heading--XS"
                css={css`
                  margin-bottom: var(--spectrum-global-dimension-size-100);
                `}>
                Filter by
              </h4>
              <CheckboxGroup
                isEmphasized
                aria-labelledby={headingId}
                marginTop="size-100"
                onChange={(values) => {
                  setCloudFilter(values);
                }}>
                {clouds.map((cloud, i) => (
                  <Checkbox key={i} value={cloud} marginBottom="size-100">
                    {cloud}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </Flex>
          </Flex>
        )}
        <View flex="1">
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, ${width});
              grid-auto-rows: ${height};
              justify-content: center;
              gap: var(--spectrum-global-dimension-size-400);

              @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                margin-top: var(--spectrum-global-dimension-size-400);
                display: flex;
                flex-direction: column;
              }
            `}>
            {filteredProducts.map((product) => (
              <div
                key={product.name}
                role="figure"
                tabIndex="0"
                className="spectrum-Card"
                css={css`
                  width: ${width};
                  height: ${height};

                  &:hover {
                    border-color: var(--spectrum-global-color-gray-200);
                  }

                  @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                    width: 0;
                  }
                `}>
                <div
                  className="spectrum-Card-body"
                  css={css`
                    height: var(--spectrum-global-dimension-size-3000);
                    overflow: auto;
                    text-align: left;
                  `}>
                  <div>
                    {product.icon && (
                      <div
                        css={css`
                          height: var(--spectrum-global-dimension-size-600);
                          width: var(--spectrum-global-dimension-size-600);
                          margin-bottom: var(--spectrum-global-dimension-size-200);
                        `}>
                        <img
                          css={css`
                            display: block;
                            height: 100%;
                            object-fit: contain;
                          `}
                          src={product.icon}
                          alt=""
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="spectrum-Card-header spectrum-Heading--XXS"
                    css={css`
                      margin-top: 0 !important;
                      margin-bottom: var(--spectrum-global-dimension-size-100) !important;
                    `}>
                    <div
                      className="spectrum-Card-title"
                      css={css`
                        font-size: var(--spectrum-global-dimension-size-200);
                      `}>
                      <strong>{product.name}</strong>
                    </div>
                  </div>
                  <div
                    className="spectrum-Card-content spectrum-Body--S"
                    css={css`
                      height: auto;
                      margin-bottom: 0 !important;
                    `}>
                    {product.description}
                  </div>
                </div>
                <div
                  className="spectrum-Card-footer"
                  css={css`
                    text-align: right;
                  `}>
                  <ButtonGroup align="end">
                    {product.discover && (
                      <Button
                        elementType="a"
                        isQuiet
                        href={product.discover}
                        {...getExternalLinkProps(product.discover)}
                        variant="secondary">
                        Learn more
                      </Button>
                    )}
                    {product.docs && (
                      <Button
                        elementType="a"
                        href={product.docs}
                        {...getExternalLinkProps(product.docs)}
                        variant="primary">
                        View docs
                      </Button>
                    )}
                  </ButtonGroup>
                </div>
              </div>
            ))}
          </div>
        </View>
      </Flex>
    </section>
  );
};

ProductCardGrid.propTypes = {
  clouds: PropTypes.array,
  products: PropTypes.array,
  orderBy: PropTypes.string,
  filterBy: PropTypes.array,
  interaction: PropTypes.bool
};

export { ProductCardGrid };
