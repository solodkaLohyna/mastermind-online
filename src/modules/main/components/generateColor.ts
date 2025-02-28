export const generateColor = () => {
  const colors = ["red", "white", "yellow", "blue", "green", "purple", "black"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
