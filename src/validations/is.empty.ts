const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  } else if (typeof value === "string" && value.trim() === "") {
    return true;
  } else if (typeof value === "number" && isNaN(value)) {
    return true;
  } else if (Array.isArray(value) && value.length === 0) {
    return true;
  } else if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true;
  } else if (value instanceof Map && value.size === 0) {
    return true;
  } else if (value instanceof Set && value.size === 0) {
    return true;
  } else if (isNaN(value) && value === "NaN") {
    return true;
  } else {
    return false;
  }
};

export { isEmpty };
