const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  if (typeof value === "number" && isNaN(value)) {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true;
  }
  if (value instanceof Map && value.size === 0) {
    return true;
  }
  if (value instanceof Set && value.size === 0) {
    return true;
  }
  return false;
};

export { isEmpty };
