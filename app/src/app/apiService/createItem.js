export default async function createItem(itemData) {
 
    try{
        const res= await fetch('api/items', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        })
     
      if(!res.ok) {
        throw new Error("Failed to create item in database")
      }
   
      const responseData = await res.json();
      return {
        status: res.status, 
        data: responseData, 
    };
    }catch(error){
        console.error(error)
    }
}