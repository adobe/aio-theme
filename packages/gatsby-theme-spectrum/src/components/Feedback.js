import React from 'react';
import {css} from '@emotion/core';
import PropTypes from 'prop-types';
import {Flex} from '@react-spectrum/layout';
import {Button} from '@react-spectrum/button';
import {ButtonGroup} from '@react-spectrum/buttongroup';
import Contributors from "./Contributors";

const Feedback = ({onYes, onNo}) => (
  <Flex alignItems="center">
    <span css={css`padding-right: 16px;`}>Was this helpful ?</span>
    <ButtonGroup>
      <Button variant="primary" onPress={() => {onYes && onYes()}}>Yes</Button>
      <Button variant="primary" onPress={() => {onNo && onNo()}}>No</Button>
    </ButtonGroup>
  </Flex>
);

Contributors.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func
};

export default Feedback;