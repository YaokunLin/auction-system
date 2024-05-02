export default async function getUserInfo(username) {
 
    try{
        const res= await fetch('api/user', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(username)
        })
     
      if(!res.ok) {

        throw new Error("Failed to get user information")
      }
      const responseData = await res.json();
      return {
        status: res.status, 
        data: responseData,
        message: 'You have successfully get user information'
    };
    }catch(error){
        console.error(error)
    }
}