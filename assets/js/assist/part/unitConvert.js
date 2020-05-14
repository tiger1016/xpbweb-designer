const convertToPixel = (x, mode) => {
  if (mode === 0) {
    return x * 96;
  } else if (mode === 1) {
    return x * 96 / 2.54;
  }
}

const convertFromPixel = (x, mode) => {
  if (mode === 0) {
    return x / 96;
  } else if (mode === 1) {
    return x * 2.54 / 96;
  }
}