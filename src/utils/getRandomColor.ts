const getRandomColor = (): string => {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256,
  )},${Math.floor(Math.random() * 256)})`;
};

export default getRandomColor;
