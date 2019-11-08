import './styles/index.scss';

const slides = document.querySelectorAll('.slider-item');
const count = slides.length;
const control = {
  left: {classCurr:'null-to-left', classNext:'right-to-null', inc: -1},
  right: {classCurr:'null-to-right', classNext:'left-to-null', inc: 1},
};
let currentIndex = 0;
document.addEventListener('click', e=>{
  const t = e.target;
  if(t.dataset.name=="slider-control" || t.name=="slider-control") {
    let nextIndex = t.value || getNextIndex(
      currentIndex+control[t.dataset.direct].inc,
      count
    );

    if(nextIndex == currentIndex) return;
    let controlItem = nextIndex > currentIndex ? control.left : control.right;
    clearSlide(slides[currentIndex]);
    clearSlide(slides[nextIndex]);
    slides[currentIndex].classList.add(controlItem.classCurr);
    slides[nextIndex].classList.add(controlItem.classNext);
    currentIndex = parseInt(nextIndex);
    document.querySelector(`input[name='slider-control'][value='${currentIndex}']`).checked=true;
  }
});
const clearSlide = slide => slide.classList.remove('right-to-null', 'left-to-null', 'null-to-left', 'null-to-right');
const getNextIndex = (index, count) => index < 0 ? count-1 : index%count;
