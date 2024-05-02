export default async function deleteRating(itemId, rated_by, rating_datetime) {
  console.log(`deleting rating for ${itemId}, rated at ${rating_datetime}.`);

  try {
    const res = await fetch(`/api/ratings/${itemId}/delete-ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itemId, rated_by, rating_datetime})
    });
    // console.log(res);
    if (!res.ok) {
      throw new Error("failed to delete rating for item");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
