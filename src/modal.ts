import { openModal } from '$utils/modal/openModal';
import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

window.Webflow = window.Webflow || [];

window.Webflow.push(async () => {
  const modalElement = queryElement('[modal-element="component"]');
  const openSearchModalBtns = queryElements('a[href="#modal-popup-1"]').map((el) => {
    return { el, i: 1 };
  });

  const allOpenBtns = [...openSearchModalBtns];

  if (localStorage.getItem('modal-popup-1') !== 'already-shown') {
    if (!modalElement) return;
    openModal(modalElement, 1);
  }

  if (!allOpenBtns.length || !modalElement) return;

  allOpenBtns.forEach(({ el, i }) => {
    el.setAttribute('href', '#');
    el.addEventListener('click', () => {
      openModal(modalElement, i);
    });
  });
});
