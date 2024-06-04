/**
 * @description closes modal element by removing 'is-active' class
 * @param {HTMLElement} modalElement
 * @param {EventTarget} eventTarget destroy when closing
 * @param {HTMLElement[]} closeButtons removes event listener from all buttons
 * @param {number} index current active modal
 * @returns nothing
 */

export function closeModal(
  modalElement: HTMLElement,
  closeButtons: EventTarget[],
  modalIndex: number
) {
  if (modalIndex === 1) localStorage.setItem('modal-popup-1', 'already-shown');

  modalElement.setAttribute('modal-active', '');
  closeButtons.forEach((btn) => btn.removeEventListener('click', null));
}
