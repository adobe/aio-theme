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
import { getExternalLinkProps } from '../utils';
import nextId from 'react-id-generator';

const flattenProducts = (clouds) => clouds.map(({ products }) => products).flat();

const filterByClouds = (clouds, cloudFilter, additionalFilter, setFilteredProducts) => {
  if (!cloudFilter.length) {
    cloudFilter = clouds.map(({ name }) => name);
  }

  let selectedClouds = clouds.filter(({ name }) => cloudFilter.some((cloud) => name === cloud));
  let selectedProducts = selectedClouds.map(({ products }) => products).flat();
  if (!selectedProducts.length) {
    selectedProducts = flattenProducts(clouds);
  }

  const { filter } = additionalFilters.find(({ value }) => value === additionalFilter);
  setFilteredProducts(filter(selectedProducts));
};

const filterByName = (products) => products.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB));

const filterByLastUpdated = (products) =>
  products.sort(
    ({ lastUpdated: lastUpdatedA }, { lastUpdated: lastUpdatedB }) => new Date(lastUpdatedB) - new Date(lastUpdatedA)
  );

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
  }
];

const ProductCardFilter = ({ products: clouds }) => {
  const [filteredProducts, setFilteredProducts] = useState(filterByLastUpdated(flattenProducts(clouds)));
  const [cloudFilter, setCloudFilter] = useState([]);
  const [additionalFilter, setAdditionalFilter] = useState('last_updated');

  useEffect(() => {
    filterByClouds(clouds, cloudFilter, additionalFilter, setFilteredProducts);
  }, [cloudFilter, additionalFilter]);

  const headingId = nextId();
  const height = 'calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-500))';
  const width = 'calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-800))';

  return (
    <section
      className={`spectrum--lightest`}
      css={css`
        max-width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
        margin: var(--spectrum-global-dimension-size-400) auto;
      `}>
      <Flex alignItems="right" height="size-800" justifyContent="end" marginEnd="size-400">
        <Flex alignItems="center" justifyContent="center">
          <Picker
            isQuiet
            items={additionalFilters}
            onSelectionChange={(selected) => setAdditionalFilter(selected)}
            defaultSelectedKey="last_updated"
            aria-label="Filter by name or last updated product"
            marginStart="size-100">
            {(item) => <Item key={item.value}>{item.name}</Item>}
          </Picker>
        </Flex>
      </Flex>
      <Flex>
        <Flex alignItems="end" width="size-3000" direction="column">
          <Flex alignItems="start" direction="column">
            <h4 id={headingId} className="spectrum-Heading--XXS">
              Filter by Platform
            </h4>
            <CheckboxGroup
              isEmphasized
              aria-labelledby={headingId}
              marginTop="size-100"
              onChange={(values) => {
                setCloudFilter(values);
              }}>
              {clouds.map(({ name }, i) => (
                <Checkbox key={i} value={name}>
                  {name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Flex>
        </Flex>
        <View flex="1">
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, ${width});
              grid-auto-rows: ${height};
              justify-content: center;
              gap: var(--spectrum-global-dimension-size-400);
            `}>
            {filteredProducts.map((product, i) => (
              <div
                key={i}
                role="figure"
                tabIndex="0"
                className="spectrum-Card"
                css={css`
                  width: ${width};
                  height: ${height};
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
                  <div className="spectrum-Card-header">
                    <div className="spectrum-Card-title">
                      <strong>{product.name}</strong>
                    </div>
                  </div>
                  <div className="spectrum-Card-content">{product.description}</div>
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

export { ProductCardFilter };
