export default async function getTopRatedItemsReport() {
    try{
        const res = await fetch('/api/top-rated-items-report')
        if(!res.ok) {
            throw new Error("failed to get top rated items report")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}