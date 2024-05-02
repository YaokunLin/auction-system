import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
        const auctionActiveRes = await db.query(`SELECT COUNT(itemID) FROM Item WHERE status = 'active';`)
        const auctionFinishedRes = await db.query(`SELECT COUNT(itemID) FROM Item WHERE status = 'finished';`)
        const auctionWonRes = await db.query(`SELECT COUNT(itemID) FROM Item WHERE status = 'won';`)
        const auctionCancelledRes = await db.query(`SELECT COUNT(itemID) FROM Item WHERE status = 'canceled';`)
        const itemsRatedRes = await db.query(`
            SELECT SUM(CASE WHEN b.rating_datetime IS NULL then 1 else 0 END) AS items_not_rated, 
            SUM(CASE WHEN b.rating_datetime IS NULL then 0 else 1 END) AS items_rated
            FROM Item a
            LEFT OUTER JOIN Rating b on a.itemID = b.itemID;
            `)
        
        let auctionStats = {
            auctionActive: auctionActiveRes.rows[0].count, 
            auctionFinished: auctionFinishedRes.rows[0].count, 
            auctionWon: auctionWonRes.rows[0].count,
            auctionCancelled: auctionCancelledRes.rows[0].count,
            itemsRated: itemsRatedRes.rows[0].items_rated,
            itemsNotRated: itemsRatedRes.rows[0].items_not_rated,
        }
        return NextResponse.json({auctionStats}, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the auction statistics data from database"
   }, {
    status: 500
   })
    }
}