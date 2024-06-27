import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import {
	getElementChild,
	TABLET_SCREEN_WIDTH,
	layoutColumns,
	MOBILE_SCREEN_WIDTH,
	DESKTOP_SCREEN_WIDTH
} from "@adobe/gatsby-theme-aio/src/utils";
import { GatsbyLink } from '../GatsbyLink';
import { HeroImage } from "../Hero";
import classNames from "classnames";

const smallMobileView = "375px";
const MIN_MOBILE_SCREEN_WIDTH = "767px"
const href = (link) => link ? getElementChild(link).props.href : null;

const Minicard = ({
	text,
	heading,
	image,
	textColor,
	link,
	buttons,
	variantsType = "accent",
	buttonStyle = "fill",
	isArrow = true
}) => {
	const Element = link ? GatsbyLink : 'div';

	const buttonVal = buttons && buttons?.props.children;
	const buttonchild = buttonVal && getElementChild(buttonVal);

	return (
		<div

			css={css`

						text-decoration: none !important;
						display : flex;
						justify-content : center;
						align-items : center;
						flex-direction : column;
						gap: 10px;

						@media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
						max-width: calc(${layoutColumns(6)}) !important;
						}

						@media screen and (max-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
						max-width: calc(${layoutColumns(3.5)}) !important;
						}

				`}
		>
			{image ? (
				<Element
					to={href(link)}
					css={css`
								width: 100px;
								height: 80px;
								display: flex;
								justify-content: center;
								justify-content: center;
								@media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
								margin: auto;
								}

								@media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
								margin: 0;
								max-width: calc(${layoutColumns(3.5)}) !important;
								}

								@media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
								max-width: calc(${layoutColumns(6)}) !important;
								margin: 0;
								}`}
				>
					<h2
						css={
							css`
									margin:0px !important;
									width: 70px;
								`
						}
					>
						<HeroImage image={image} />
					</h2>
				</Element>
			) : null}

			<div
				css={css`
								padding: var(--spectrum-global-dimension-size-200); !important;
								text-align: left;
								height: 65px;
								flex: 1;
								text-decoration: none !important;
								justify-content: center;
    						align-items: center;
								gap:25px;
								display : flex;
								flex-direction: column;
								justify-content: space-around;

								@media only screen and (min-width: ${smallMobileView}) and(max-width:${MOBILE_SCREEN_WIDTH}) {
								margin: 0;
								background:red;
								text-align: center !important;
								max-width: calc(${layoutColumns(3.5)}) !important;
								padding-left:  var(--spectrum-global-dimension-size-100) !important;
								}
								
								`}
			>

				{heading && (
					<h2
						className="spectrum-Heading--sizeS"
						css={css`
									color:${textColor};

									@media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
									font-size: 18px !important;

									}`
						}>
						{heading?.props?.children}
					</h2>
				)}

				{text ?
					<div
						css={css`
								margin:0 !important;
								&>p{
										color:${textColor} !important;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
										overflow: hidden;
										font-weight: 200 !important;
    								font-size: 16px !important; 
										margin:0;
								}
								@media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
								&>h3{
										font-size: var(--spectrum-alias-heading-xxs-text-size) !important;
								}
								}`
						}
					>
						{text}
					</div>
					: null}

				{buttons &&
					<a
						href={buttonchild?.props.href}
						target="_blank"
						rel="noopener noreferrer nofollow"
						role="button"
						className={`spectrum-Button spectrum-Button--sizeM spectrum-Button--${buttonStyle} spectrum-Button--${variantsType}`}
						css={css`
								width : ${isArrow && "150px"}
							`}
					>
						<span className="spectrum-Button-label" css={css`width : 100%`}>
							<span className="spectrum-Button-label">
								<div css={css`
										display: flex;
										align-items: center;
										justify-content: space-around;
									`}>
									<p
										css={css`
												margin: 0px;
												font-size: 16px;
												font-weight : bolder;
											`}
									>{buttonchild.props.children}</p>
									{isArrow && <span css={css`font-size: 16px;font-weight: bolder;`}> &gt; </span>}
								</div>
							</span>
						</span>
					</a>
				}

			</div>

		</div>
	);
};

const MiniProductCard = ({
	className,
	theme = "dark",
	inRow = 1,
	textColor = "black",
	variantsType,
	buttonStyle,
	isArrow,
	...props
}) => {

	const propKeys = Object.keys(props);
	const miniCards = propKeys.filter((key) => key.startsWith("image")).map((data, index) => {
		return {
			image: props[data],
			heading: props[`heading${index}`],
			link: props[`link${index}`],
			text: props[`text${index}`],
			buttons: props[`buttons${index}`]
		};
	});

	return (
		<section
			className={classNames(className, `spectrum--${theme}`)}
			css={css`
            background: var(--spectrum-global-color-gray-100);
            padding: var(--spectrum-global-dimension-size-1200) 0;
          `}

		>
			<div
				css={css`
                  // max-width: calc(${layoutColumns(12)});
                  margin: auto;
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      max-width: calc(${layoutColumns(3.75)}) !important;
                      grid-template-columns: repeat(1, 1fr);
                  }
                  @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
                      padding-bottom: 0;
                      margin-top: 0;
                      max-width: calc(${layoutColumns(6)}) !important;
                      grid-template-columns: repeat(1, 1fr);
                  }
  
                  display: grid;
                  grid-template-columns: repeat(${Number(inRow)}, 1fr);
                  grid-gap: 25px;
  
                  `}
			>
				{miniCards.map((data, index) => {
					return (
						<div>
							<Minicard
								text={data.text}
								link={data.link}
								heading={data.heading}
								image={data.image}
								props={props}
								index={index}
								textColor={textColor}
								buttonStyle={buttonStyle}
								isArrow={isArrow}
								variantsType={variantsType}
								buttons={data.buttons}
							/>
						</div>
					);
				})}
			</div>
		</section>
	)
}

MiniProductCard.propTypes = {
	className: PropTypes.string,
	theme: PropTypes.string,
	inRow: PropTypes.string,
	textColor: PropTypes.string,
	link: PropTypes.element,
	variantsType: PropTypes.string,
	buttonStyle: PropTypes.string,
	isArrow: PropTypes.bool,
};


export { MiniProductCard };
