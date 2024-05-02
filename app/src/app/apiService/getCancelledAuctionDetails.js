export default async function getCancelledAuctionDetails() {
    try{
        const res = await fetch('/api/cancelled-auction-details-report')
        if(!res.ok) {
            throw new Error("failed to get cancelled auction details report")
        }
        return res.json()
    }catch(error) {
      console.error(error)
    }
}