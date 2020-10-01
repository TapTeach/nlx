module.exports = () => {
  const cssVarTest = window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
  return cssVarTest;
};
