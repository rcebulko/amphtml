/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
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

/**
 * @fileoverview This file implements the `gulp test-report-upload` task, which POSTs test result reports
 * to an API endpoint that stores them in the database.
 */

'use strict';

const fetch = require('node-fetch');
const fs = require('fs').promises;
const log = require('fancy-log');
const path = require('path');

const {cyan, green, red, yellow} = require('ansi-colors');

function initBentoComponent() {}

module.exports = {
  initBentoComponent,
};

initBentoComponent.description = 'Creates a new Bento component boilerplate';
