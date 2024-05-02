export default async function login(userCredentials) {
 
    try{
        const res= await fetch('api/login', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        })
     
      if(!res.ok) {
        if(res.status === 404 ) {
            return {
                status: res.status,
                message: 'User does not exist'
            }
        } 
        if (res.status === 401) {
            return {
                status: res.status,
                message: "Password is not accurate"
            }
        } 

        throw new Error("Failed to login")
      }
   
      
      return {
        status: res.status, 
        message: 'You have successfully login the platform'
    };
    }catch(error){
        console.error(error)
    }
}