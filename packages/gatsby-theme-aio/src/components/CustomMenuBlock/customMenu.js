/*
 * Copyright 2022 Adobe. All rights reserved.
*/
import React, { useState, useContext,createRef } from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import classNames from "classnames";
import nextId from "react-id-generator";
import { GatsbyLink } from "@adobe/gatsby-theme-aio/src/components/GatsbyLink";
import { Menu } from "@adobe/gatsby-theme-aio/src/components/Menu";
import { graphql, useStaticQuery, withPrefix } from "gatsby";
import Context from "@adobe/gatsby-theme-aio/src/components/Context";
import { rootFix, normalizePagePath } from "@adobe/gatsby-theme-aio/src/utils";
import { MOBILE_SCREEN_WIDTH } from "@adobe/gatsby-theme-aio/conf/globals";
import "@spectrum-css/menu";
      
const CustomMenu = ({menuItem='salesFAQMenus'}) => {
    const [expandedMenus, setExpandedMenus] = useState([]);
    const [expandedHederMenus, setExpandedHederMenus] = useState([]);
    const MIN_MOBILE_SCREEN_WIDTH = "767px";
    const MIN_TABLET_SCREEN_WIDTH = "1023px";
     //Fetch the sidebar menu item title, icon and path from config file by using the graphql query.
    const data = useStaticQuery(
      graphql`
        query CustomQuery {
          site(children: {}) {
            id
            siteMetadata {
              title
              salesFAQMenus {
                path
                title
              }
              techSupportFAQMenus {
                path
                title              
              }
            }
          }
        }
      `
    );
    const  siteMetadata  = data.site.siteMetadata;
    const subMenuPages = siteMetadata[`${menuItem}`];
    const { location } = useContext(Context);
  
    const normalizeSubPages = (page) => {
      normalizePagePath(page);  
      if (page.pages) {
        page.pages.forEach((subPage) => {
          normalizeSubPages(subPage);
        });
      }
    };
  
    if (subMenuPages) {
      subMenuPages.forEach((subMenu) => {
        normalizeSubPages(subMenu);
      });
    }

    const pathWithRootFix = rootFix(`${location.pathname}${location.hash}`);
    const locationPath = withPrefix(pathWithRootFix);
  
    // Display the submenu items
    const renderSubMenuItem = (menus) => {
      return menus
        .filter((menu) => menu.title && menu.path)
        .map((menu, index) => {            
            const ref = createRef();
            const id = nextId(); 
            const menuHref = withPrefix(menu.href);
            const isSelected = menuHref === locationPath ? true : false;        
            const classNameVal = classNames([
                "spectrum-Menu-item",
                {"is-open": menuHref === locationPath ? true : false},
            ])

        return (
            <li
              id={id}
              ref={ref}
              key={index}
              css={css`display: contents;`}
              className={classNames([
                "spectrum-Menu-item",
                {"is-selected":isSelected},
              ])}
            >
              <GatsbyLink
                css={css`
                  color: var(
                    --spectrum-sidenav-item-text-color,
                    var(--spectrum-alias-text-color)
                  );                  
                  text-decoration: none;
                  padding: var(--spectrum-global-dimension-size-100)
                    var(--spectrum-global-dimension-size-100)
                    var(--spectrum-global-dimension-size-100)
                    var(--spectrum-global-dimension-size-200); 
                `}                
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.currentTarget.parentElement.nextSibling && e.currentTarget.parentElement.nextSibling.childNodes[0].focus();
                  }
                  if (e.key === 'ArrowUp') {
                    e.currentTarget.parentElement.previousSibling &&e.currentTarget.parentElement.previousSibling.childNodes[0].focus();
                  }
                  if( e.key === 'Enter'){
                    e.currentTarget.focus();
                  }
                }}
                onFocus={(e) => {
                    const inx = expandedHederMenus.indexOf(index);
                    const temArr = [...expandedHederMenus]
                    if(inx === -1) {
                        temArr.push(index);
                        setExpandedHederMenus(temArr)
                    }
                }}
                to={menuHref}
                className={classNameVal}
              >
                <div
                  css={css`
                    font-size: var(--spectrum-global-dimension-size-200);
                    padding-left: var(--spectrum-global-dimension-size-100);
                    white-space: nowrap;
                    color: var(--spectrum-listitem-m-text-color-hover, var(--spectrum-alias-text-color));
  
                    @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      font-size: var(--spectrum-global-dimension-size-150); !important;
                    }
                  `}
                  className="spectrum-Menu-itemLabel"
                >
                  {menu.title}
                </div>
              </GatsbyLink>
            </li>
          );
        });
    };
  
    return (
      <section
        css={css`
          text-align: left;
          margin: auto;
          margin-left: 0;
          @media only screen and (max-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
            width: 80vw ;
          }
        `}
      >
        <Menu
          css={css`
            list-style: none;
            margin: var(--spectrum-global-dimension-size-0)
              var(--spectrum-global-dimension-size-450)
              var(--spectrum-global-dimension-size-0)
              var(--spectrum-global-dimension-size-0);
            padding-left: var(--spectrum-global-dimension-size-0);            
            & > li > a {
              font-weight: bold;
            }
            @media only screen and (max-width: ${MIN_TABLET_SCREEN_WIDTH}) {
              margin: 0 !important;
              display: inline-flex !important;
              width: 100vw !important;
              overflow: auto !important;
            }
          `}
        >
          {renderSubMenuItem(subMenuPages)}
        </Menu>
      </section>
    );
  };
  
  CustomMenu.propTypes = {
    className: PropTypes.string,
  };
  
  export default CustomMenu ;
  