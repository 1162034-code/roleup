const pageTop = () => {
  const toTopBtn = document.querySelector('#page-top');

  if(toTopBtn !== null) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    window.addEventListener('scroll', (e) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if(scrollTop >= 30) {
        toTopBtn.classList.add('is-show');
      } else {
        toTopBtn.classList.remove('is-show');
      }
    });
  }
};

export { pageTop };
