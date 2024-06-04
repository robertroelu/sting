export function createFilterEl(
  value: string,
  templateElement: HTMLElement,
  CMSFilterField: string
) {
  // Clone the template element
  const element = templateElement.cloneNode(true) as HTMLElement;
  const elLabel = element.lastChild as HTMLElement;
  if (!elLabel) return;

  elLabel.setAttribute('fs-cmsfilter-field', CMSFilterField);

  // Query the inner elements
  const label = element.querySelector('span');
  const input = element.querySelector('input');

  if (!label || !input) return;

  // Populate the inner elements
  label.textContent = value;
  input.value = value;

  return element;
}
