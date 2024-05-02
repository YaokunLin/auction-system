export default async function getAuctionReport() {
    try{
        const res = await fetch('/api/category-report')
        if(!res.ok) {
            throw new Error("failed to get category report")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}