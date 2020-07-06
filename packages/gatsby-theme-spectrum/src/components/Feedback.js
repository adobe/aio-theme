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