import React from 'react';
import { css } from "@emotion/react";
import { Picker } from "../../Picker";
import { MIN_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MAX_MOBILE_WIDTH, MIN_TABLET_SCREEB_WIDTH } from '../FormFields';

const ProjectsDropdown = ({ projectsDropdown, previousProjectsDetails, selectedIndex, setSelectedIndex }) => {

  return (

    <div
      css={css`
        display : flex;
        flex-direction : column;
        gap:2px;
    `}
    >
      <p className="spectrum-Body spectrum-Body--sizeS" css={css`color: #464646`}>{projectsDropdown?.label} </p>
      <div
        css={css`
                  
          & > div > .spectrum-Picker {
            width: 100% !important;
            height: 20px;
          }

          & > div > div {
            width: 22%;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_MOBILE_WIDTH}){
              width: 82%;
              left: 15%;
            }

            @media screen and (min-width:${MIN_TABLET_SCREEB_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              width: 91%;
              left: 7%;
            }

          }

          & > div > .spectrum-Picker-popover > ul > li > div > div {
            margin-top : 5px ;
          }

          & > div > .spectrum-Picker-popover > ul > li > div > div > svg {
            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              margin: 3px;
              padding: 0;
            }
          }

          & > .spectrum-Picker{
            
          }

            padding: 8px;
            border-radius: 3px;
            border: 1px solid #909090 !important;
            width: 400px;

          ` }
      >
        <Picker
          isQuiet
          items={previousProjectsDetails?.map((project, k) => {
            return {
              title: project.name,
              selected: k === selectedIndex
            }
          })}
          onChange={(index) => {
            setSelectedIndex(index);
          }}
          data-cy="projects-picker"
        />
      </div>
      <p className="spectrum-Body spectrum-Body--sizeS" css={css`color: #464646`}>{projectsDropdown?.subHeading}</p>
    </div>
  )
}

export { ProjectsDropdown }