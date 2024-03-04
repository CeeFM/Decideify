const apiUrl = "https://localhost:5001";

export const addSuggestion = (suggestion) => {
    return fetch(`${apiUrl}/api/suggestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestion),
    });
  };
  
  export const deleteSuggestion = (id) => {
    return fetch(`${apiUrl}/api/suggestion/${id}`, {
      method: "DELETE"
    });
  };

export const getSuggestionsByUser = (userId) => {
  return fetch (`${apiUrl}/api/suggestion/${userId}`)
    .then((r) => r.json());
};