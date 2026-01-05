export const getProperties = () => {
  const data = localStorage.getItem("properties");
  return data ? JSON.parse(data) : [];
};

export const saveProperties = (properties) => {
  localStorage.setItem("properties", JSON.stringify(properties));
};
