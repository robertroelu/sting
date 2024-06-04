import 'swiper/css';

import Swiper from 'swiper';
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';

export const globalSwiper = function () {
  // Elements //
  const swiperComponents = document.querySelectorAll('[element="swiper-component"]');
  if (swiperComponents.length === 0) return;

  swiperComponents.forEach((swiperComp, i) => {
    const swiper = swiperComp.querySelector('.swiper.is-main-slider');
    const swiperList = swiper.firstChild;
    const slidersDesktop = swiperList?.dataset.slidersperview;
    const slidersGap = swiperList?.dataset.gappx;
    const section = swiperComp.closest('section');

    section.style.overflow = 'hidden';
    swiper?.classList.add('swiper--' + i);

    const mainSwiperSlider = new Swiper(`.swiper.is-main-slider.swiper--` + i, {
      modules: [Navigation, Pagination, Keyboard, Mousewheel, Autoplay],
      speed: 500,
      // effect: 'fade',
      spaceBetween: 32,
      // slidesPerView: 1,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      // watchOverflow: true,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
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
          spaceBetween: 32,
        },
        // when window width is >= 992px
        992: {
          slidesPerView: slidersDesktop ? slidersDesktop : 3,
          spaceBetween: +slidersGap ? +slidersGap : 32,
        },
      },
      autoplay: {
        disableOnInteraction: true,
        delay: 7000,
      },
      navigation: {
        nextEl: swiperComp.querySelector('.swiper-next'),
        prevEl: swiperComp.querySelector('.swiper-prev'),
      },
      pagination: {
        el: swiperComp.querySelector('.swiper-bullet-wrapper'),
        bulletActiveClass: 'swiper-bullet--active',
        bulletClass: 'swiper-bullet',
        bulletElement: 'button',
        clickable: true,
      },
    });
  });
};
