document.addEventListener('DOMContentLoaded', () => {
  const bgContainer = document.querySelector('[data-bg-container]');
  const positions = document.querySelectorAll('[data-bg-position]');
  const repeats = document.querySelectorAll('[data-bg-repeat]');
  const sizes = document.querySelectorAll('[data-bg-size]');
  const classPositions = [];
  const classRepeats = [];
  const classSizes = [];

  function toggleClasses(element, classesToRemove) {
    element.addEventListener(
      'click',
      () => {
        bgContainer.classList.remove(...classesToRemove);
        bgContainer.classList.add(element.getAttribute('data-class'));
      },
      false
    );
  }

  if (bgContainer) {
    positions.forEach(position => {
      classPositions.push(position.getAttribute('data-class'));
      toggleClasses(position, classPositions);
    });

    repeats.forEach(repeat => {
      classRepeats.push(repeat.getAttribute('data-class'));
      toggleClasses(repeat, classRepeats);
    });

    sizes.forEach(size => {
      classSizes.push(size.getAttribute('data-class'));
      toggleClasses(size, classSizes);
    });
  }
});
