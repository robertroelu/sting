export interface Job {
  publishDate: Date;
  companyName: string | null;
  companyLogo: string | null;
  title: string | null;
  function: string | null;
  experience: string | null;
  url: string | null;
  locations: (string | null)[];
}

export declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fsAttributes: any[];
  }
}
