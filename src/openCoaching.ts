export const openCoaching = function () {
  // ELEMENTS //

  const modalTitle = document.querySelector('[bw-calendly-element="modal-title"]');
  const modalEmbed = document.querySelector('.calendly-inline-widget');
  const list = document.querySelector('[bw-calendly-element="list"]');
  if (!list || !modalTitle || !modalEmbed) return;
  // console.log('Open coaching booking active!');

  list?.addEventListener('click', (e) => {
    const item = e.target.closest('[bw-calendly-element="item"]');
    if (!item) return;

    const { name } = item.dataset;
    const { calendly } = item.dataset;

    const url = `https://calendly.com/${calendly}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=fbfbfb&primary_color=ec1877`;

    https: modalEmbed.querySelector('iframe').src = url;

    modalTitle.textContent = `
       Book Open Coaching with ${name}
      `;
  });
};
