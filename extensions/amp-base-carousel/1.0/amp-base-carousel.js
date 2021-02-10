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

import {ActionTrust} from '../../../src/action-constants';
import {BaseElement} from './base-element';
import {CSS} from '../../../build/amp-base-carousel-1.0.css';
import {Services} from '../../../src/services';
import {createCustomEvent} from '../../../src/event-helper';
import {isExperimentOn} from '../../../src/experiments';
import {toWin} from '../../../src/types';
import {userAssert} from '../../../src/log';

/** @const {string} */
const TAG = 'amp-base-carousel';

/** @extends {PreactBaseElement<BaseCarouselDef.CarouselApi>} */
class AmpBaseCarousel extends BaseElement {
  /** @param {!AmpElement} element */
  constructor(element) {
    super(element);

    /** @private {?number} */
    this.slide_ = null;
  }

  /** @override */
  init() {
    const props = super.init();

    const {element} = this;
    this.registerApiAction('prev', (api) => api.prev(), ActionTrust.LOW);
    this.registerApiAction('next', (api) => api.next(), ActionTrust.LOW);
    this.registerApiAction(
      'goToSlide',
      (api, invocation) => {
        const {args} = invocation;
        api.goToSlide(args['index'] || -1);
      },
      ActionTrust.LOW
    );

    this.slide_ = parseInt(element.getAttribute('slide'), 10);
    props['defaultSlide'] = this.slide_ || 0;
    return props;
  }

  /** @override */
  triggerEvent(element, eventName, detail) {
    const event = createCustomEvent(
      toWin(element.ownerDocument.defaultView),
      `amp-base-carousel.${eventName}`,
      detail
    );
    Services.actionServiceForDoc(element).trigger(
      element,
      eventName,
      event,
      ActionTrust.HIGH
    );

    super.triggerEvent(element, eventName, detail);
  }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-carousel'),
      'expected global "bento" or specific "bento-carousel" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }

  /** @override */
  mutationObserverCallback() {
    const slide = parseInt(this.element.getAttribute('slide'), 10);
    if (slide === this.slide_) {
      return;
    }
    this.slide_ = slide;
    if (!isNaN(slide)) {
      this.api().goToSlide(slide);
    }
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpBaseCarousel, CSS);
});
