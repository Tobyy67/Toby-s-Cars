class IntersectionObserverList {
	mapping;
	observer;
	constructor() {
		this.mapping = new Map();
		this.observer = new IntersectionObserver(
			(entries) => {
				for (var entry of entries) {
					var callback = this.mapping.get(entry.target);

					callback && callback(entry.isIntersecting);
				}
			},
			{
				rootMargin: "300px 0px 300px 0px"
			}
		);
	}
	add(element, callback) {
		this.mapping.set(element, callback);
		this.observer.observe(element);
	}
	ngOnDestroy() {
		this.mapping.clear();
		this.observer.disconnect();
	}
	remove(element) {
		this.mapping.delete(element);
		this.observer.unobserve(element);
	}
}
const observer = new IntersectionObserverList();




let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}