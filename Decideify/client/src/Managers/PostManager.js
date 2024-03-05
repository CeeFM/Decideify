const apiUrl = "https://localhost:5001";

export const addPost = (post) => {
    return fetch(`${apiUrl}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  export const deletePost = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`, {
      method: "DELETE"
    });
  };

  export const editPost = (post) => {
    return fetch(`${apiUrl}/api/post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  export const getAllPosts = () => {
    return fetch(`${apiUrl}/api/post`)
      .then((r) => r.json());
  };

  export const getPostByUserId = (userId) => {
    return fetch(`${apiUrl}/api/post/${userId}`)
      .then((r) => r.json());
  };

