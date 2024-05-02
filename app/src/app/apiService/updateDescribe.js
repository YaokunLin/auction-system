export default async function updateDescribe(itemId, itemDescribe) {
 
    try{
        const res= await fetch(`/api/items/${itemId}/update-describe`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemDescribe})
        })

        if(!res.ok) {
            throw new Error("failed to update describe")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}