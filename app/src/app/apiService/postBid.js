export default async function postBid(itemId, bidAmount, username, isGetItNow) {
 
    try{
        const res= await fetch('/api/bids/' + itemId, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bidAmount, username, isGetItNow})
        })

        if(!res.ok) {
            throw new Error("failed to create bid")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}