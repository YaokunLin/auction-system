export default async function getItem(itemId) {
    try{
        const res = await fetch('/api/items/' + itemId)
        if(!res.ok) {
            throw new Error("failed to get item")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}