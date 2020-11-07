const pageNum = getParam('page');

function getParam(paramName) {
  return decodeURIComponent(
    location.search
      .substr(1)
      .split('&')
      .reduce(
        (a, elem) =>
          elem.split('=')[0] === paramName ? a + elem.split('=')[1] : a,
        ''
      )
  );
}
