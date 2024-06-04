import type { CMSFilters } from '@finsweet/attributes-cmscore/types/CMSFilters';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';
import { createFilterEl, createJob, fetchJobs } from '$utils/startupJobs';
import { sortArrayByDateProp } from '$utils/startupJobs/sortArrayByDateProp';
import type { Job } from '$utils/startupJobs/types';

window.fsAttributes = window.fsAttributes || [];

window.fsAttributes.push([
  'cmsfilter',
  async (filterInstances: CMSFilters[]) => {
    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;
    const { listInstance } = filterInstance;
    const templateEl = queryElement('[startup-jobs-element="template"]') as HTMLElement;
    if (!filterInstance || !templateEl) return;

    // 1) get Jobylon and existing Webflow CMS jobs
    const jobylonData = await fetchJobs();

    const webflowData: HTMLScriptElement[] = queryElements(
      '[startup-jobs-element="source-list"] script[type="application/json"]'
    );

    const webflowJobs: Job[] = webflowData.map((script) => {
      if (!script.textContent) return;
      const data = JSON.parse(script.textContent);

      return { ...data, locations: [data.locations] };
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobylonJobs = jobylonData.map((job: any) => {
      return {
        companyName: job.company.name,
        companyLogo: job.company.logo,
        experience: job.experience,
        function: job.function,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        locations: job.locations.map((location: any) => {
          if (!location) return;

          return location.location.city;
        }),
        publishDate: job.from_date,
        title: job.title,
        url: job.urls.ad,
      } as Job;
    });

    const jobs: Job[] = [...webflowJobs, ...jobylonJobs];

    // 2) sort jobs by publish date
    sortArrayByDateProp(jobs, 'publishDate', 'desc');

    // 3) create elements from template element
    const elements = jobs.map((job) => createJob(job, templateEl));

    // 4) clear CMSFilter list and add new items/elements
    listInstance.items = [];
    listInstance.addItems(elements);

    // 5) get needed filter elements
    const checkboxTemplate = queryElement('[startup-jobs-element="checkbox-template"]');
    if (!checkboxTemplate) return;

    const filterExperienceList = queryElement('[startup-jobs-element="filter-list-experience"]');
    const filterFunctionList = queryElement('[startup-jobs-element="filter-list-function"]');
    const filterLocationList = queryElement('[startup-jobs-element="filter-list-location"]');

    // 6) unique values for each filter category
    const uniqueExperiences = new Set<string>();
    const uniqueFunctions = new Set<string>();
    const uniqueLocations = new Set<string>();

    jobs.forEach((job) => {
      if (job.experience) uniqueExperiences.add(job.experience);
      if (job.function) uniqueFunctions.add(job.function);

      job.locations.forEach(
        (location: string | null) => location !== null && uniqueLocations.add(location)
      );
    });

    // 7) create filter elements from template element
    if (filterExperienceList)
      uniqueExperiences.forEach((item) => {
        const element = createFilterEl(item, checkboxTemplate, 'experience');
        if (!element) return;

        filterExperienceList.appendChild(element);
      });

    if (filterLocationList)
      uniqueLocations.forEach((item) => {
        const element = createFilterEl(item, checkboxTemplate, 'location');
        if (!element) return;

        filterLocationList.appendChild(element);
      });

    if (filterFunctionList)
      uniqueFunctions.forEach((item) => {
        const element = createFilterEl(item, checkboxTemplate, 'job-function');
        if (!element) return;

        filterFunctionList.appendChild(element);
      });

    // 8) initialize CMSFilter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (filterInstance as any).init();
  },
]);
