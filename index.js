// const intro = document.querySelector('.introduction');
// const body = document.querySelector('body')

// function disappear () {
//     intro.fadeOut()
// }

// setTimeout(disappear, 4000);

// const btn = document.getElementById("right-header");

// btn.addEventListener('click', myFunction());

// function myFunction() {
//     var x = document.getElementById("right-header");
//     if (!x.classList.contains("responsive")) {
//       x.classList.remove('right-header');
//       x.classList.add("responsive");
//     } else {
//       x.classList.remove('responsive');
//       x.classList.add('right-header')
//     }
//   }

$(function () {
  $(window).on('scroll', function () {
      if ( $(window).scrollTop() > 10 ) {
          $('.navbar').addClass('active');
      } else {
          $('.navbar').removeClass('active');
      }
  });
});

const TypeWriter =  function (txtElement, words, wait) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;

}

TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];

  if(this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length-1);
  }else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = `<span class="text">${this.txt}</span>`

  let typeSpeed = 300;

  if(this.isDeleting) {
    typeSpeed = typeSpeed/2;
  }


  if(!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      
      this.wordIndex++;

      typeSpeed = 3000;
    }

  setTimeout(() => this.type(), 300)
}



function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait); 
}

document.addEventListener('DOMContentLoaded', init);