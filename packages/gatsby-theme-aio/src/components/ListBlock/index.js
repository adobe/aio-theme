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

const ListItem = ({ content, orderCSS, index, data }) => {
	return (
		<li
			key={index}
			css={css` ${orderCSS}`}>
			{content === "right" ? data.right : data.left}
		</li>
	)
}

const List = ({ icon, iconColor, listItem, content, list }) => {

	const bulletIcons = icon ?? (list === "unorder" ? "disc" : list === "order" ? "number" : icon);

	const cssForUnorder = `list-style: ${bulletIcons === "checkmark" ? "none " : bulletIcons};
	font-size: 1.5em;
	position: ${bulletIcons === "checkmark" && "relative"};
	padding-left: ${bulletIcons === "checkmark" && "1.5em"};
	&::marker {
			color: ${iconColor};
	}
	${bulletIcons === "checkmark" &&
		`&:before {
		content: "\u2713";
		position: absolute;
		left:0;
		top: 0;
		color: ${iconColor};
		}`
	}`

	const cssForOrder = `list-style: ${bulletIcons ?? "number"};
		font-size: 1.5em;
		&::marker {
	    color: ${iconColor};
		}`

	const Element = list === "unorder" ? "ul" : "ol";
	const cssForListItem = list === "unorder" ? cssForUnorder : cssForOrder;

	return (
		<Element css={css` ${commonCSS}`}> {listItem.map((data, index) => <ListItem content={content} orderCSS={cssForListItem} index={index} data={data} />)} </Element>
	)
}

const ListBlock = ({
	className,
	list = "unorder",
	icon,
	variant = "haflWidth",
	iconColor = "black",
	...props
}) => {

	const propKeys = Object?.keys(props);
	const listItem = propKeys.filter((key) => key.startsWith("right")).map((data, index) => {
		return {
			right: props[data],
			left: props[`left${index}`]
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
					<List listItem={listItem} iconColor={iconColor} icon={icon} content="left" list={list} />

					<div css={css`border-right: 1px solid`}></div>

					<List listItem={listItem} iconColor={iconColor} icon={icon} content="right" list={list} />

				</div>
			</div>
		</section>
	)
}

ListBlock.propTypes = {
	className: PropTypes.string,
	list: PropTypes.string,
	icon: PropTypes.string,
	iconColor: PropTypes.string,
	variant: PropTypes.string,
};

export { ListBlock }