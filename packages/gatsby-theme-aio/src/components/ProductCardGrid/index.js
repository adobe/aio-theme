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

import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { AnchorButton } from '../AnchorButton';
import { Checkbox } from '../Checkbox';
import { Picker } from '../Picker';
import { Image } from "../Image";
import classNames from "classnames";
import { MOBILE_SCREEN_WIDTH,TABLET_SCREEN_WIDTH,layoutColumns} from '../../utils';

import {  DESKTOP_SCREEN_WIDTH } from "../../utils";

import PropTypes from "prop-types";
import "@spectrum-css/typography";
import "@spectrum-css/card";
import _orderBy from 'lodash/orderBy'

const filterByClouds = (
  products,
  cloudFilter,
  additionalFilter,
  setFilteredProducts
) => {
  const filteredProducts = products.filter(({ cloud })=>
    cloudFilter.some((selectedCloud) => cloud === selectedCloud)
  );
  // const selectedFilter = additionalFilters.find(
  //   ({ value }) => value === additionalFilter
  // );

 const orderByProducts = _orderBy(filteredProducts, ['id'],['asc']);

  setFilteredProducts(orderByProducts
    // selectedFilter.filter(filteredProducts, selectedFilter.ids)
  );
};

const filterByName = (products) =>
  products.sort(({ name: nameA }, { name: nameB }) =>
    nameA.localeCompare(nameB)
  );

const filterByLastUpdated = (products) =>
  products.sort(
    ({ lastUpdated: lastUpdatedA }, { lastUpdated: lastUpdatedB }) => {
      if (new Date(lastUpdatedB) > new Date(lastUpdatedA)) {
        return 1;
      } else if (new Date(lastUpdatedB) < new Date(lastUpdatedA)) {
        return -1;
      }
      return 0;
    }
  );

const filterById = (products, ids = []) => {
  const filteredProducts = [];
  ids.forEach((productId) => {
    const product = products.find(({ id }) => id === productId);
    if (product) {
      filteredProducts.push(product);
    }
  });
  return filteredProducts;
};

const additionalFilters = [
  {
    title: "Last updated",
    value: "last_updated",
    filter: filterByLastUpdated,
  },
  {
    title: "Name",
    value: "name",
    filter: filterByName,
  },
  {
    title: "Custom",
    value: "id",
    filter: filterById,
  },
];

const ProductCardGrid = ({
  clouds = [],
  products = [],
  interaction = false,
  orderBy = "last_updated",
  filterByCloud = [],
  filterByIds = [],
  buttonName = "Learn more",
  showName = true,
  showDescription = true,
  showBorder = true,
  imgHeight = "1000",
  isCentered = false,
  className,
  containerWidth=DESKTOP_SCREEN_WIDTH,
  theme="light",
  enablePicker=false
}) => {
  if (filterByIds.length) {
    orderBy = "id";
  }

  const defaultFilter = additionalFilters.find(
    ({ value }) => value === orderBy
  );
  defaultFilter.ids = filterByIds;

  const [additionalFilter, setAdditionalFilter] = useState(defaultFilter.value);
  const [filteredProducts, setFilteredProducts] = useState(
    defaultFilter.filter(products, defaultFilter.ids)
  );
  const [cloudFilter, setCloudFilter] = useState(filterByCloud);

  useEffect(() => {
    filterByClouds(
      products,
      cloudFilter.length ? cloudFilter : clouds,
      additionalFilter,
      setFilteredProducts
    );
  }, [cloudFilter, additionalFilter, products, clouds]);

  const height =
    "calc(var(--spectrum-global-dimension-size-5000) - var(--spectrum-global-dimension-size-600))";
  const width =
    "calc(var(--spectrum-global-dimension-size-3600) - var(--spectrum-global-dimension-size-900))";

const updatePadding = !enablePicker ?  "padding-top: var(--spectrum-global-dimension-size-1000)":"";

    return (
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding-bottom: var(--spectrum-global-dimension-size-500);


        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          width: ${layoutColumns(2)}  !important;
          background: var(--spectrum-global-color-gray-100);
          padding-bottom: 0;
        }

        @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) and (min-width: ${MOBILE_SCREEN_WIDTH}) {
          width:100% !important;
          background: var(--spectrum-global-color-gray-100);;
          padding-bottom: 0;
        }
      `}
    >
      <div
      css={css`
      max-width: ${containerWidth};
      margin: auto;

       @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          width: ${layoutColumns(3)} !important;
          background:var(--spectrum-global-color-gray-100);
        }
        ${updatePadding}
      `}>
      {interaction && enablePicker && (
        <div
          css={css`
            display: flex;
            align-items: center;
            height: var(--spectrum-global-dimension-size-800);
            justify-content: flex-end;
            margin-right: var(--spectrum-global-dimension-size-400);
          `}
        >
          <Picker
            isQuiet
            items={additionalFilters.slice(0, 2).map((filter) => {
              return filter.value === orderBy
                ? {
                    selected: true,
                    ...filter,
                  }
                : filter;
            })}
            aria-label="Filter by name or last updated product"
            onChange={(index) => {
              setAdditionalFilter(additionalFilters[index].value);
            }}
          />
        </div>
      )}
      <div
        css={css`
          display: flex;

          @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
            align-items: flex-start;
            flex-wrap: wrap;
          }
        `}
      >
        {interaction && (
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              width: var(--spectrum-global-dimension-size-3000);
              flex-direction: column;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              `}
            >
              <h4
                className="spectrum-Heading spectrum-Heading--sizeXS"
                css={css`
                  margin-bottom: var(--spectrum-global-dimension-size-100);
                `}
              >
                Filter by
              </h4>

              <div
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-100);
                  display: flex;
                  flex-direction: column;
                `}
              >
                {clouds.map((cloud, i) => (
                  <Checkbox
                    key={i}
                    value={cloud}
                    onChange={(checked) => {
                      if (checked) {
                        setCloudFilter([...cloudFilter, cloud]);
                      } else {
                        setCloudFilter(
                          cloudFilter.filter((filter) => filter !== cloud)
                        );
                      }
                    }}
                    css={css`
                      margin-bottom: var(--spectrum-global-dimension-size-100);
                    `}
                  >
                    {cloud}
                  </Checkbox>
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          css={css`
            flex: 1;
          `}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, ${width});
              grid-auto-rows: ${height};
              justify-content: center;
              gap: var(--spectrum-global-dimension-size-400);

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                margin-top: var(--spectrum-global-dimension-size-400);
                display: flex;
                flex-wrap: wrap;
              }

              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                overflow: hidden;
                width: ${layoutColumns(3)};
                background: var(--spectrum-global-color-gray-100);
             }
            `}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                role="figure"
                className="spectrum-Card spectrum-Card--sizeM"
                css={css`
                  width: ${width};
                  height: ${height};
                  border: ${showBorder
                    ? "none"
                    : "var(--spectrum-global-color-gray-200)"};
                    background: var(--spectrum-global-color-gray-100);
                  align-items: center;
                  &:hover {
                    border-color: var(--spectrum-global-color-gray-200);
                  }

                  @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                    width: 0;
                  }
                  
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    height:calc(var(--spectrum-global-dimension-size-5000) - var(--spectrum-global-dimension-size-1700));
                  }
                `}
              >
                <div
                  className="spectrum-Card-body"
                  css={css`
                    height: var(--spectrum-global-dimension-size-4000);
                    overflow: auto;
                    padding-top: 0;
                    padding-bottom: 0;
                    align-items: center;
                    display: flex;
                    flex-direction: column;

                  `}
                >
                  {product.icon && (
                    <div
                      css={css`
                        height: var(
                          --spectrum-global-dimension-size-${imgHeight}
                        );
                        width: 140px;
                        margin-bottom: var(
                          --spectrum-global-dimension-size-200
                        );
                      `}
                    >
                      <Image
                        src={product.icon}
                        aria-hidden="true"
                        alt={""}
                        title={""}
                      />
                    </div>
                  )}
                  {showName && (
                    <div
                      className="spectrum-Card-header spectrum-Heading spectrum-Heading--sizeXS"
                      css={css`
                        height: var(--spectrum-global-dimension-size-600);
                        justify-content: center;
                        align-items: center;
                        margin-top: 0 !important;
                        margin-bottom: var(
                          --spectrum-global-dimension-size-100
                        ) !important;
                      `}
                    >
                      <div
                        className="spectrum-Card-title"
                        css={css`
                          font-size: var(--spectrum-global-dimension-size-200);
                          padding-right: 0;
                        `}
                      >
                        <strong>{product.name}</strong>
                      </div>
                    </div>
                  )}
                  {showDescription && (
                    <div
                      className="spectrum-Card-content spectrum-Body spectrum-Body--sizeS"
                      css={css`
                        height: auto;
                        margin-bottom: 0 !important;
                      `}
                    >
                      {product.description}
                    </div>
                  )}
                </div>
                <div
                  className={showBorder ? "spectrum-Card-footer" : ""}
                  css={css`
                    display: flex;
                    justify-content: ${isCentered ? "center" : "flex-end"};
                    flex-wrap: wrap;

                    @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                      justify-content: center;
                    }

                    padding-top: 0;
                    padding-bottom: 0;
                  `}
                >
                  {product.discover && (
                    <div
                      css={css`
                        margin: var(--gap) 0 0 var(--gap);
                      `}
                    >
                      <AnchorButton
                        isQuiet
                        href={product.discover}
                        variant="primary"
                        css={css`
                          border-color: #4b4b4b !important;
                          border-width: 2px;
                        `}
                      >
                        {buttonName}
                      </AnchorButton>
                    </div>
                  )}

                  {product.docs && (
                    <div
                      css={css`
                        margin: var(--gap) 0 0 var(--gap);
                      `}
                    >
                      <AnchorButton href={product.docs} variant="primary">
                        View docs
                      </AnchorButton>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

ProductCardGrid.propTypes = {
  clouds: PropTypes.array,
  products: PropTypes.array,
  orderBy: PropTypes.string,
  filterBy: PropTypes.array,
  interaction: PropTypes.bool,
  showName: PropTypes.bool,
  showDescription: PropTypes.bool,
  isCentered: PropTypes.bool,
  showBorder: PropTypes.bool,
  imgHeight: PropTypes.string,
  enablePicker:PropTypes.bool,
};

export { ProductCardGrid };