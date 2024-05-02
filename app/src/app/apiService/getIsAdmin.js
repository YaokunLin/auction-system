export default async function getIsAdmin(username) {
    
    try{
        const res = await fetch(`/api/user/${username}/is-admin`)
        if(!res.ok) {
            throw new Error("failed to get item")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}