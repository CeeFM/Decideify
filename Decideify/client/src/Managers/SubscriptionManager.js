const apiUrl = "https://localhost:5001";

export const addSubscription = (subscription) => {
    return fetch(`${apiUrl}/api/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
  };
  
  export const deleteSubscription = (subscriberId, providerId) => {
    return fetch(`${apiUrl}/api/subscription/${subscriberId}/${providerId}`, {
      method: "DELETE"
    });
  };

  export const getAllSubscriptions = () => {
    return fetch(`${apiUrl}/api/subscription`)
      .then((r) => r.json());
  };

  export const getSubscriptionsByUserId = (userId) => {
    return fetch(`${apiUrl}/api/subscription/${userId}`)
      .then((r) => r.json());
  };
