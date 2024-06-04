import 'swiper/css';

import Swiper from 'swiper';
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';

export const swiper = function () {
  const components = [...document.querySelectorAll('[swiper="component"]')];
  if (components.length === 0) return;

  const swiperInstances = components.map((component, i) => {
    const element = component.querySelector('.swiper');
    if (!element) return;
    element.classList.add(`is-swiper-${i + 1}`);

    // Used for selecting which options to apply
    const optionsNmbr = component.getAttribute('swiper-options');

    // Navigation elements
    const prevEl = component.querySelector('[swiper="arrow-prev"]');
    const nextEl = component.querySelector('[swiper="arrow-next"]');

    // Will contain bullets
    const bulletClass = component.querySelector('[swiper="bullet-class"]')?.className;
    const bulletList = component.querySelector('[swiper="bullet-list"]');

    const instance = {
      component: component,
      element: element,
      optionsNmbr: optionsNmbr,
      bulletClass: bulletClass,
      bulletList: bulletList,
      prevEl: prevEl,
      nextEl: nextEl,
    };

    return instance;
  });

  // Create swiper
  swiperInstances.forEach(
    ({ component, element, optionsNmbr, bulletClass, bulletList, prevEl, nextEl }) => {
      if (!element) return;
      if (!optionsNmbr) console.error('Missing options number');

      const list = component.querySelector('.swiper-wrapper');
      if (!list?.childElementCount) {
        removeSection(component);
        return;
      }

      let options;

      if (+optionsNmbr === 1)
        options = optionGroup1(bulletList, bulletClass, 'is-active', prevEl, nextEl);

      const swiper = new Swiper(element, options);

      // if (swiper.passedParams.slidesPerView >= swiper.slides.length) {
      //   swiper.navigation.destroy();
      //   swiper.pagination.destroy();

      //   prevEl.remove();
      //   nextEl.remove();
      //   bulletList.remove();
      // }

      if (swiper.slides.length === 0) removeSection(component);
    }
  );
};

function removeSection(component) {
  const section = component.closest('section');
  if (!section) return;
  section.remove();
}

function optionGroup1(
  bulletList: Element,
  bulletClass: string,
  bulletActiveClass: string,
  prevEl,
  nextEl
) {
  if (!bulletList) return;
  if (!bulletClass) return;
  if (!bulletActiveClass) return;

  return {
    modules: [Pagination, Navigation],
    // crossFade: true,
    // effect: 'fade',
    speed: 800,
    spaceBetween: 24,
    slidesPerView: 3,
    pagination: {
      el: bulletList,
      clickable: true,
      bulletClass: bulletClass,
      bulletActiveClass: bulletActiveClass,
    },
    navigation: {
      prevEl: prevEl,
      nextEl: nextEl,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  };
}
