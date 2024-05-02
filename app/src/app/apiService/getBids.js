export default async function getItem(itemId) {
    try{
        const res = await fetch('/api/bids/' + itemId)
        if(!res.ok) {
            throw new Error("failed to get bids")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}