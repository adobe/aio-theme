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
          max-width: 400px;

          & > div{
            position: relative;
          }
            
          & >div> button{
            width: 100%;
          }

          & >div> div{
            width: 100%;
          }

          & >div> div p{
            margin-top: 2px;
          }
        ` }
      >
        <Picker
          items={previousProjectsDetails?.map((project, k) => {
            return {
              title: project.title,
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
