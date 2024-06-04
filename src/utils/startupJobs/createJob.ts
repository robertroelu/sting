/**
 *
 * @param job
 * @param templateElement
 * @returns
 */

import type { Job } from './types';

// Create new items from template element
export function createJob(job: Job, templateElement: HTMLElement) {
  const newEl = templateElement.cloneNode(true) as HTMLElement;

  console.log(newEl);

  // Query the internal elements of the Collection item
  const url: HTMLLinkElement | null = newEl.querySelector('[data-element="link"]');

  const logo: HTMLImageElement | null = newEl.querySelector('[data-element="logo"]');
  const title = newEl.querySelector('[data-element="title"]');
  const company = newEl.querySelector('[data-element="company"]');
  const location = newEl.querySelector('[data-element="location"]');
  const experience = newEl.querySelector('[data-element="level"]');
  const jobType = newEl.querySelector('[data-element="type"]');
  const jobFunction = newEl.querySelector('[data-element="job-function"]');

  const locationsFormatted = Array.isArray(job.locations)
    ? job.locations.join(', ')
    : job.locations;

  // Populate the internal items
  if (url) url.href = job.url || '';
  if (logo) logo.src = job.companyLogo || '';
  if (title) title.textContent = job.title;
  if (company) company.textContent = job.companyName;
  if (location) location.textContent = locationsFormatted;
  if (experience) experience.textContent = job.experience;
  if (jobType) jobType.textContent = job.function;
  if (jobFunction) jobFunction.textContent = job.function;

  newEl.classList.remove('hide');
  return newEl;
}
