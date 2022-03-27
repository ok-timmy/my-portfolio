
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