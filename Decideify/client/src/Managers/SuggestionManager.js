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