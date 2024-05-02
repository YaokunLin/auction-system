export default async function getUserReport() {
    try{
        const res = await fetch('/api/user-report')
        if(!res.ok) {
            throw new Error("failed to get user report")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}