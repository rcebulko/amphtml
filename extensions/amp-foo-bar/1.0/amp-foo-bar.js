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

import {FooBar} from './foo-bar';
import {PreactBaseElement} from '../../../src/preact/base-element';
import {dict} from '../../../src/utils/object';
import {isExperimentOn} from '../../../src/experiments';
import {userAssert} from '../../../src/log';

/** @const {string} */
const TAG = 'amp-foo-bar';

class AmpFooBar extends PreactBaseElement {
  /** @override */
  init() {
    this.registerApiAction('exampleToggle', (api) => api./*OK*/exampleToggle());

    return dict({
      // Extra props passed by wrapper AMP component
      'exampleTagNameProp': this.element.tagName,
    });
  }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-foo-bar'),
      'expected global "bento" or specific "bento-foo-bar" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }
}

/** @override */
AmpFooBar['Component'] = FooBar;

/** @override */
AmpFooBar['props'] = {};

/** @override */
AmpFooBar['passthrough'] = true;
// AmpFooBar['passthroughNonEmpty'] = true;
// AmpFooBar['children'] = {};

/** @override */
AmpFooBar['layoutSizeDefined'] = true;

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpFooBar);
});
