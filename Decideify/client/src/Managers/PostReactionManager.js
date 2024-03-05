const apiUrl = "https://localhost:5001";

export const addPostReaction = (postReaction) => {
    return fetch(`${apiUrl}/api/postreaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postReaction),
    });
  };

  export const deletePostReaction = (id) => {
    return fetch(`${apiUrl}/api/postreaction/${id}`, {
      method: "DELETE"
    });
  };

  export const getAllPostReactions = () => {
    return fetch(`${apiUrl}/api/postreaction`)
      .then((r) => r.json());
  };

  export const getPostReactionsByPostId = (postId) => {
    return fetch(`${apiUrl}/api/postreaction/${postId}`)
      .then((r) => r.json());
  };