import React from 'react';
import {css} from '@emotion/core';
import PropTypes from 'prop-types';
import {Flex} from '@react-spectrum/layout';

const Contributors = ({href = '#', contributors = [], date}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer nofollow'
    css={css`
      text-decoration: none;
      color: inherit;
    `}>
    <Flex alignItems="center">
      <div css={css`
        display: inline-flex;
        padding-left: 16px;
      `}>
        {contributors.slice(0, 5).map((contributor, index) => (
          <span
            key={index}
            css={css`
              margin-left: -16px;
              position: relative;
              border: 3px solid white;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: white;
            `}>
          <img
            alt={contributor}
            src={`https://github.com/${contributor}.png`}
            css={css`
              width: 32px;
              height: 32px;
              border-radius: 50%;
            `}
          />
        </span>
        ))}
      </div>
      <span
        css={css`
          padding-left: 16px;
        `}>
      {date && `Last updated ${date}`}
    </span>
    </Flex>
  </a>
);

Contributors.propTypes = {
  href: '',
  contributors: PropTypes.array,
  date: PropTypes.string
};

export default Contributors;