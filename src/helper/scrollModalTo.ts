export default function scrollModalTo(element: HTMLElement) {
  const { top } = element.getBoundingClientRect();
  const modal = document.getElementById('modal-srcollable-container');

  modal?.scrollTo({ top });
}
