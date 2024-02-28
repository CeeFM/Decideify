const apiUrl = "https://localhost:5001";

export const getAllCategories = () => {
    return fetch(`${apiUrl}/api/category`)
      .then((r) => r.json());
  };

  export const getCategoryByContentType = (contentType) => {
    return fetch(`${apiUrl}/api/category/getbytype?contentType=${contentType}`)
      .then((r) => r.json());
  };

  export const getCategoryById = (id) => {
    return fetch(`${apiUrl}/api/category/${id}`)
      .then((r) => r.json());
  };