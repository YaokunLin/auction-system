export default async function getCategory() {
    try{
        const res = await fetch('/api/category')
        if(!res.ok) {
            throw new Error("failed to get category")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}