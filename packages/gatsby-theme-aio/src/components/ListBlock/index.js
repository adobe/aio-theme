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

import React from "react"
import { css } from '@emotion/react';
import PropTypes from "prop-types";
import classNames from "classnames";

const commonCSS = `
width: 45%;
margin: 0 !important;

@media screen and (min-width:320px) and (max-width:767px) {
	width : 90% !important;
}`

const List = ({ icon, iconColor, listItem, content }) => {

  const bulletIcons = icon ?? "checkmark";

  return (
    <ul css={css` ${commonCSS}`}>
      {listItem?.map((data, index) => {
        const shouldHideBullet = bulletIcons === "checkmark" || (content === "right" && data?.text1 === undefined) || (content === "left" && data?.text2 === undefined);
        return (
          <li
            key={index}
            css={css`
							list-style: ${shouldHideBullet ? "none " : bulletIcons};
							font-size: 1.5em;
							position: ${bulletIcons === "checkmark" && "relative"};
							padding-left: ${bulletIcons === "checkmark" && "1.5em"};
							&::marker {
								color: ${iconColor};
							}

							& > p{
									margin: var(--spectrum-global-dimension-size-150) 0 !important;
							}

							${bulletIcons === "checkmark" &&
              `&:before {
								content: "\u2713";
								position: absolute;
								left:0;
								top: 0;
								color: ${iconColor};
								}`
              }
							`}>
            {content === "right" ? data?.text1 : data?.text2}
          </li>
        )
      })} </ul>
  )
}

const ListBlock = ({
  className,
  icon,
  variant = "halfWidth",
  iconColor = "black",
  repeat,
  ...props
}) => {

  const propKeys = Object?.keys(props);
  const listItem = propKeys.filter((key) => key.startsWith("text2")).map((data, index) => {
    return {
      text1: props[data],
      text2: repeat === "1" || repeat === undefined ? props["text1"] : props[`text1${index}`],
    };
  });

  return (
    <section
      className={classNames(className)}
      css={css`
					margin:auto;
					padding : 4% 0;
					width : ${variant === "halfWidth" ? "60%" : "100%"};
				`}
    >
      <div>
        <div
          css={css`
						display : flex;
						justify-content: space-between;
						text-align : left;

						@media screen and (min-width:320px) and (max-width:767px) {
							flex-direction:column;
						}

						`}
        >
          <List listItem={listItem} iconColor={iconColor} icon={icon} content="left" />

          <div css={css`border-right: 1px solid var(--spectrum-global-color-gray-300)`}></div>

          <List listItem={listItem} iconColor={iconColor} icon={icon} content="right" />

        </div>
      </div>
    </section>
  )
}

ListBlock.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  variant: PropTypes.string,
};

export { ListBlock }