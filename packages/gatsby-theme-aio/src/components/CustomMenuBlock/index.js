/*
 * Copyright 2022 Adobe. All rights reserved.
*/
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  createRef
} from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import classNames from "classnames";
import nextId from "react-id-generator";
import { GatsbyLink } from "@adobe/gatsby-theme-aio/src/components/GatsbyLink";
import {
  ChevronDown,
  ChevronRight,
} from "@adobe/gatsby-theme-aio/src/components/Icons";
import { Menu } from "@adobe/gatsby-theme-aio/src/components/Menu";
import { graphql, useStaticQuery, withPrefix } from "gatsby";
import Context from "@adobe/gatsby-theme-aio/src/components/Context";
import {
  rootFix,
  findSelectedPages,
  normalizePagePath,
} from "@adobe/gatsby-theme-aio/src/utils";
import {
  TABLET_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
} from "@adobe/gatsby-theme-aio/conf/globals";
import "@spectrum-css/menu";

// Import the svg image dynamically to use in menu item.
const useDynamicSVGImport = (name, options = {}) => {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { onCompleted, onError } = options;

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = await import(
          `../../../../pages/images/${name}.svg`
        );
        if (onCompleted) {
          onCompleted(name, ImportedIconRef.current);
        }
      } catch (err) {
        console.log("error", error);
        if (onError) {
          onError(err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError, error]);

  return { error, loading, SvgIcon: ImportedIconRef.current?.default };
};

//Create the image element to load the svg icon in each menu item.
const Icon = ({ name, onCompleted, onError }) => {
  const { error, SvgIcon } = useDynamicSVGImport(name, {
    onCompleted,
    onError,
  });
  if (error) {
    return error.message;
  }
  if (SvgIcon) {
    return (
      <img
        src={SvgIcon}
        title=""
        alt=""
        style={{ width: 40, height: 40 }}
      ></img>
    );
  }
  return null;
};

const CustomMenuBlock = ( ) => {
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [expandedHederMenus, setExpandedHederMenus] = useState([]);
  const min_mobile_screen_width = "767px";
   //Fetch the sidebar menu item title, icon and path from config file by using the graphql query.
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        site(children: {}) {
          id
          siteMetadata {
            title
            subMenuPages {
              path
              title
              icon
              pages {
                title
                path
              }
            }
          }
        }
      }
    `
  );

  const { subMenuPages } = data.site.siteMetadata;
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

  const handleIconError = useCallback((err) => console.error(err.message), []);
  const pathWithRootFix = rootFix(location.pathname);
  const selectedMenus = findSelectedPages(pathWithRootFix, subMenuPages);

  // Display the submenu items
  const renderSubMenuItem = (menus, level) => {
    return menus
      .filter((menu) => menu.title && menu.path)
      .map((menu, index) => {
        const isSelected = selectedMenus.find(
          (selectedItem) => selectedItem === menu
        );
        const ref = createRef();
        const isExpanded = menu.header || expandedMenus.includes(menu.href) || (expandedHederMenus.includes(index) && level === 1);
        const id = nextId();

        if (isSelected && !expandedMenus.includes(menu.href)) {
          setExpandedMenus((menus) => [...menus, menu.href]);
        }
        const menuHref = withPrefix(menu.href);
        var isMenuSelected = selectedMenus.length === 1 ? index === 0 && menu.path.includes(selectedMenus[0].path) : selectedMenus[selectedMenus.length - 1] === menu && isSelected;
        return (
          <li
            id={id}
            ref={ref}
            key={index}
            css={css`
              display: contents;
              &:not(.is-open) .spectrum-Menu {
                display: none;
              }}
            `}
            className={classNames([
              "spectrum-Menu-item",
              { "is-open": isExpanded },
              { "sub-menu-item": level === 2 },
              {
                "is-selected":
                  selectedMenus[selectedMenus.length - 1] === menu &&
                  isSelected,
              },
            ])}
          >
            <GatsbyLink
              css={css`
                color: var(
                  --spectrum-sidenav-item-text-color,
                  var(--spectrum-alias-text-color)
                );
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: left;
                box-sizing: border-box;
                inline-size: 100%;
                text-decoration: none;
                padding: var(--spectrum-global-dimension-size-100)
                  var(--spectrum-global-dimension-size-100)
                  var(--spectrum-global-dimension-size-100)
                  var(--spectrum-global-dimension-size-200);

                .spectrum-Menu-itemIcon {
                  flex-shrink: 0;
                  margin-inline-end: var(--spectrum-sidenav-icon-gap);
                }
              `}
              onClick={(event) => {
                if (
                  menu?.pages?.length &&
                  !menu.header &&
                  menu.pages.find((subPage) => subPage.href === menu.href)
                ) {
                  event.preventDefault();
                  if (expandedMenus.includes(menu.href)) {
                    setExpandedMenus((menus) =>
                      menus.filter((href) => href !== menu.href)
                    );
                  } else {
                    setExpandedMenus([...expandedMenus, menu.href]);
                  }
                }
              }}
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
                if( level === 1) {
                  const inx = expandedHederMenus.indexOf(index);
                  const temArr = [...expandedHederMenus]
                  if(inx === -1) {
                    temArr.push(index);
                    setExpandedHederMenus(temArr)
                  }
                }
              }}
              to={menuHref}
              className={classNames([
                "spectrum-Menu-item",
                {
                  "is-open":isMenuSelected,
                },
              ])}
            >
              {level === 1 ? (
                <>
                  {
                    <div>
                      {isExpanded ? (
                        <ChevronDown className="spectrum-Menu-itemIcon" />
                      ) : (
                        <ChevronRight className="spectrum-Menu-itemIcon" />
                      )}
                    </div>
                  }
                  <div>
                    {menu.icon && (
                      <>
                        <Icon
                          name={menu.icon}
                          fill="gray"
                          onError={handleIconError}
                        />
                      </>
                    )}
                  </div>
                </>
              ) : null}
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
                {menu.title} {level === 1 ? `(${menu.pages?.length})` : ""}
              </div>
            </GatsbyLink>

            {menu.pages && (
              <ul
                className="spectrum-Menu spectrum-SubMenu"
                css={css`
                  margin-left: var(--spectrum-global-dimension-size-600);
                  ${level > 1
                    ? `
                  & > li > a {
                    padding-left: calc(${
                      level + 1
                    } * var(--spectrum-global-dimension-size-150)) !important;
                  }
                `
                    : ""}
                `}
                {...(menu.heading ? { "aria-labelledby": id } : {})}
              >
                {renderSubMenuItem(menu.pages, level + 1)}
              </ul>
            )}
          </li>
        );
      });
  };

  return (
    <section
      css={css`
        text-align: left;
        width: calc(
          var(--spectrum-global-dimension-size-1000) +
            var(--spectrum-global-dimension-size-3000)
        );
        margin: auto;

        @media only screen and (max-width: ${min_mobile_screen_width}) {
          width: var(--spectrum-global-dimension-size-3000) !important;
          margin-left: 0;
        }

        @media only screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
          margin-left: 0;
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
          &:not(.spectrum-SubMenu) {
            & > li > a {
              background: none;
              font-weight: bold;
            }
          }
        `}
      >
        {renderSubMenuItem(subMenuPages, 1)}
      </Menu>
    </section>
  );
};

CustomMenuBlock.propTypes = {
  className: PropTypes.string,
};

export { CustomMenuBlock };
