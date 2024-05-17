import React, { useState } from "react";
import { css } from "@emotion/react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { Picker } from "../../Picker";

const ChangeOrganizationContent = ({
  allOrganizations,
  setSelectedIndex,
  selectedIndex,
}) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}>
        <p
          className="spectrum-Body spectrum-Body--sizeM"
          css={css`
            color: #222222;
          `}>
          You are currently in [
          <span className="spectrum-Heading spectrum-Heading--sizeXS">
            {allOrganizations[selectedIndex].name}
          </span>
          ].
        </p>
        <div
          css={css`
            width: 246px;
          `}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}>
            <p
              className="spectrum-Body spectrum-Body--sizeXS"
              css={css`
                color: #464646;
              `}>
              Choose organization
            </p>
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                padding-top: 3px;
                color: #464646;
              `}>
              *
            </p>
          </div>
          <div
            css={css`
              & > div > button {
                width: 100%;
                border-radius: 4px;
              }

              & > div > button > svg {
                width: 10px;
                height: 10px;
              }

              & > div > button {
                path:nth-child(1) {
                  display: none;
                }
              }

              & > div > div {
                width: 246px;
                max-height: 98px;

                ul:nth-child(1) {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                  ::-webkit-scrollbar {
                    display: none;
                  }

                  svg:nth-child(1) {
                    width: 10px;
                    height: 10px;
                    margin-top: 7px;

                    path:nth-child(1) {
                      display: none;
                    }
                  }
                }
              }

              & > div > div > ul > li > div > div {
                height: 20px !important;
              }
            `}>
            <Picker
              isQuiet={false}
              items={allOrganizations.map((organization, k) => {
                return {
                  title: organization.name,
                  selected: k === selectedIndex,
                };
              })}
              onChange={index => {
                setSelectedIndex(index);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { ChangeOrganizationContent };
