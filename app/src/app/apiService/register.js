export default async function register(userCredentials) {
 
    try{
        const res= await fetch('api/register', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        })

      if(!res.ok) {
        if (res.status === 409){ 
            return {
                status: res.status,
                message: "User already exists, try loggin in"
            }
        }

        throw new Error("Failed to register")
      }
   
      return {
        status: res.status, 
        message: 'You have successfully registered on the Buzzbid.'
    };
    }catch(error){
        console.error('Error registering user:', error);
        throw error;
    }
}