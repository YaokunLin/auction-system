export default async function searchItem(searchParams) {
 
    try{
        const res= await fetch('api/search-item', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams)
        })

      if(!res.ok) {
        throw new Error("Failed to search data in the database")
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