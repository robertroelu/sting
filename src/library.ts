export const library = function () {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    (listInstances) => {
      listInstances.forEach((instance) => {
        if (instance.items.length === 0) {
          instance.list.closest('section').remove();
          return;
        }

        instance.items.sort((a, b) => {
          const elA = a.element;
          const elB = b.element;

          const dateA = new Date(elA.dataset.sortdate);
          const dateB = new Date(elB.dataset.sortdate);

          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;
        });

        instance.renderItems();
      });
    },
  ]);
};
