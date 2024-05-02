export default async function getRatings(itemId) {
  try {
    const res = await fetch("/api/ratings/" + itemId);
    if (!res.ok) {
      throw new Error("failed to get item");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
