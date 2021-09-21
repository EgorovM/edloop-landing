function adaptive() {
  const review__list = document.querySelector('.reviews__reviews_list');
  const windowWidth = window.innerWidth;
  const pLeft = (windowWidth - 874) / 2;

  review__list.style.paddingLeft = pLeft + "px";
}

function collapse(el){
  var id = el.id
  var number = id[id.length - 1];

  $('.question__item__box').attr('class', 'question__item__box');
  $(el).addClass('question__item__box-active');

  $('.question__answer').hide(200);
  $(`#answer-${number}`).show(200);

  $('.question__item__title').css('color', 'rgba(0, 0, 0, 0.4)');
  $(`#question-title-${number}`).css('color', 'white');

  $('.question_item__dropdown').attr('src', 'media/svg/more.svg');
  $(`#question-svg-${number}`).attr('src', 'media/svg/less.svg');
}

function initSliders(count){
  const start = 0;

  var positions = [start];

  for(let i = 1; i <= count; i++){
    var position = positions[positions.length-1];

    $(`#review-${i}`).css('transform',  `translateX(${position}px)`);

    positions.push(position + offset);
  }

  refreshCount();

  return positions;
}

function refreshCount(){
  $('.reviews__paginator-count').text(curr_slide + ' из ' + slide_count)
}

function moveSlides(direction){
  const width  = document.querySelector('.reviews__review')
                                   .offsetWidth;

  sliderPositions.forEach((position, i) => {
    var newPosition = position + (offset + width) * direction;
    $(`#review-${i+1}`).css('transform',  `translateX(${newPosition}px)`);

    sliderPositions[i] = newPosition;
  });

  refreshCount();
}

var curr_slide = 1;
var slide_count = document.querySelectorAll('.reviews__review').length;

const offset = 300;

var sliderPositions = initSliders(slide_count);
adaptive();

(function() {

  const prev_review_btns  = document.querySelectorAll('.prev_review');
  const next_review_btns  = document.querySelectorAll('.next_review');
  const burger_btn       = document.querySelector('.burger');
  const burger_close_btn = document.querySelector('.header__nav-close');
  const menu             = document.querySelector('.header__nav');

  prev_review_btns.forEach((item, i) => {
    item.addEventListener('click', () => {
      if(curr_slide > 1){
        curr_slide -= 1;

        moveSlides(1);
      }
    });
  });

  next_review_btns.forEach((item, i) => {
    item.addEventListener('click', () => {
      if(curr_slide < slide_count){
        curr_slide += 1;

        moveSlides(-1);
      }
    });
  });

  burger_btn.addEventListener('click', () => {
    menu.classList.add('header__nav_active');
  });

  burger_close_btn.addEventListener('click', () => {
    menu.classList.remove('header__nav_active');
  });
}());
