export default async function getAuctionStatistics() {
    try{
        const res = await fetch('/api/auction-stats-report')
        if(!res.ok) {
            throw new Error("failed to get auction statistics report")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}