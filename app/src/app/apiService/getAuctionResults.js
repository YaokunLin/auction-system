export default async function getCategoryReport() {
    try{
        const res = await fetch('/api/auction-results')
        if(!res.ok) {
            throw new Error("failed to get Auction Results")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}