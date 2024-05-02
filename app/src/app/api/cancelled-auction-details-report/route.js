import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
        let sql = `
        SELECT itemID, username, end_datetime, cancel_reason
        FROM Item a
        WHERE status = 'canceled'
        ORDER BY itemID DESC;
        `
        const cancelledAuctionDetailsRes = await db.query(sql);
        const cancelledAuctionDetailsList = cancelledAuctionDetailsRes.rows
        return NextResponse.json({cancelledAuctionDetailsList}, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the cancelled auction details data from database"
   }, {
    status: 500
   })
    }
}