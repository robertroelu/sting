import { queryElement } from '$utils/queryElement';

import type { Job } from './types';

/**
 *
 * @param element
 * @returns
 */

export function jobFromElement(element: HTMLElement) {
  const url = queryElement('[data-element="link"]', element);
  const title = queryElement('[data-element="title"]', element);
  const companyName = queryElement('[data-element="company"]', element);
  const location = queryElement('[data-element="location"]', element) as HTMLElement;
  const experience = queryElement('[data-element="level"]', element);
  const jobFunction = queryElement('[data-element="job-function"]', element);
  const companyLogo = <HTMLImageElement>queryElement('[data-element="logo"]', element);
  const publishDate = element.dataset.published;

  const job: Job = {
    publishDate: new Date(publishDate ? publishDate : ''),
    companyName: companyName ? companyName.textContent : '',
    companyLogo: companyLogo ? companyLogo.src : '',
    title: title ? title.textContent : '',
    function: jobFunction ? jobFunction.textContent : '',
    experience: experience ? experience.textContent : '',
    url: url ? url.getAttribute('href') : '',
    locations: [location ? location.textContent : ''],
  };

  return job;
}
