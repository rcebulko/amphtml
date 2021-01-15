/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {createUseStyles} from 'react-jss';

const truncateTextContainer = {
  'padding': 0,
  'border': 'none',

  '&[i-amphtml-truncate-expanded]': {
    'height': 'auto',

    '& > i-amphtml-sizer': {
      'display': 'none',
    },
  },

  '[i-amphtml-truncate-overflow] [i-amphtml-truncate-child-overflow]': {
    'display': 'none',
  },
};

const truncateTextContent = {
  'top': 0,
  'left': 0,
  'bottom': 0,
  'right': 0,
};
const truncateTextExpandedContent = {
  'position': 'static',
};
const truncateTextCollapsedContent = {
  'position': 'absolute',
};

const truncateTextExpandedSlot = {
  'margin': 0,
  'white-space': 'nowrap',
};

const JSS = {
  truncateTextContainer,
  truncateTextContent,
  truncateTextExpandedContent,
  truncateTextCollapsedContent,
  truncateTextExpandedSlot,
};

// useStyles gets replaced for AMP builds via `babel-plugin-transform-jss`.
// eslint-disable-next-line local/no-export-side-effect
export const useStyles = createUseStyles(JSS);
