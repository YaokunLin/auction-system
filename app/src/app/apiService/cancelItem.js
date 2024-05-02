export default async function cancelItem(itemId, cancelReason, cancelBy) {
    console.log("cancelling")
 
    try{
        const res= await fetch(`/api/items/${itemId}/cancel`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cancelReason, cancelBy})
        })

        if(!res.ok) {
            throw new Error("failed to cancel item")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}