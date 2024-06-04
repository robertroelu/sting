/**
 *
 * @returns jobs
 */

export async function fetchJobs() {
  try {
    const response = await fetch(
      'https://feed.jobylon.com/feeds/a23d1a2b-647c-4497-b36b-1555efaba88f/?format=json'
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
