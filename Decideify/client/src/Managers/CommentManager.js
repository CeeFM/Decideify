const apiUrl = "https://localhost:5001";

export const addComment = (comment) => {
    return fetch(`${apiUrl}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  };

  export const deleteComment = (id) => {
    return fetch(`${apiUrl}/api/comment/${id}`, {
      method: "DELETE"
    });
  };

  export const editComment = (comment) => {
    return fetch(`${apiUrl}/api/comment/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  };

  export const getAllComments = () => {
    return fetch(`${apiUrl}/api/comment`)
      .then((r) => r.json());
  };

  export const getCommentsByPostId = (postId) => {
    return fetch(`${apiUrl}/api/comment/${postId}`)
      .then((r) => r.json());
  };

