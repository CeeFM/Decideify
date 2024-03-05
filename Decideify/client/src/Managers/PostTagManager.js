const apiUrl = "https://localhost:5001";

export const addPostTag = (postTag) => {
    return fetch(`${apiUrl}/api/posttag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postTag),
    });
  };

  export const getAllPostTags = () => {
    return fetch(`${apiUrl}/api/posttag`)
      .then((r) => r.json());
  };

  export const getPostTagByPostId = (postId) => {
    return fetch(`${apiUrl}/api/posttag/${postId}`)
      .then((r) => r.json());
  };