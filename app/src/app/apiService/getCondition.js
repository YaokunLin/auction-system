export default async function getCondition() {
    try{
        const res = await fetch('/api/condition')
        if(!res.ok) {
            throw new Error("failed to get condition")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}