const apiUrl = "https://localhost:5001";

  export const getAllReactions = () => {
    return fetch(`${apiUrl}/api/reaction`)
      .then((r) => r.json());
  };

  export const getReactionById = (reactionId) => {
    return fetch(`${apiUrl}/api/reaction/${reactionId}`)
      .then((r) => r.json());
  };