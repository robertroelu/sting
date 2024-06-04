import { swiper } from "src/swiper2";

import { annualReports } from "./annualReport";
import { jobylon } from "./jobylon";
import { library } from "./library";
import { openCoaching } from "./openCoaching";
import { senja } from "./senja";

window.Webflow ||= [];
window.Webflow.push(() => {
  annualReports();
  jobylon();
  library();
  openCoaching();
  swiper();
  senja();
  // globalSwiper();
});

// <script defer src="https://cdn.jsdelivr.net/gh/niklashansson/sting.co@44373de681743de7aefa88c227d592f207ff5108/dist/index.min.js"></script>
