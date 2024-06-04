import { queryElements } from '$utils/queryElements';

import { closeModal } from './closeModal';

/**
 * @description opens modal by adding 'is-active' class
 * @param {HTMLElement} modalElement global modal element
 * @param {number} modalIndex content to show in modal
 * @returns nothing
 */

export function openModal(modalElement: HTMLElement, modalIndex: number) {
  // query close buttons inside modal
  const closeButtons = queryElements('[modal-element="close-btn"]', modalElement);
  if (!closeButtons.length) return;

  // adds event listeners to close buttons when opening the modal
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeModal(modalElement, closeButtons, modalIndex);
    });
  });

  modalElement.setAttribute('modal-active', `${modalIndex}`);
}
