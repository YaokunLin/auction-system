export default async function submitRating(newRating) {
  console.log("Submitting new rating.");
  console.log(newRating.itemId);

  try {
    const res = await fetch(`/api/ratings/${newRating.itemId}/submit-ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRating }),
    });



    if (!res.ok) {
    
      if (res.status === 409) {
        return {
          status: res.status,
          message: res.message,
        }
      }
      throw new Error("failed to submit rating.");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
