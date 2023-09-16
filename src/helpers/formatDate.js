export const formatDate = (Date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return Date.toLocaleDateString("en-US", options);
};
