const setVarHeight = () => {
  const element = document.querySelector('element');
  const elementHeight = element.offsetHeight;
  document.documentElement.style.setProperty('--element-h', `${elementHeight}px`);
};

export { setVarHeight };
