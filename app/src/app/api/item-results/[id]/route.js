import {NextResponse } from "next/server";
import db from '../../../../../utils/db'
import {updateAuctionStatus} from "../../auction-results/route"

export async function GET (request, { params }) {
    
    const itemId = params.id;
    try{

        const winnerQuery = `
        WITH AuctionResults AS (

            SELECT
            i.itemID,
            i.item_name, i.item_description, i.username, i.categoryID, i.returnable, i.conditionId, i.cancel_datetime,
            i.end_datetime,
            i.status,
            i.get_it_now_price,
            i.minimum_sale_price,
            MAX(b.bid_amount) AS highest_bid_amount,
            (SELECT
            username
            FROM Bid
            WHERE bid_amount = MAX(b.bid_amount)
            AND itemID = i.itemID LIMIT 1
            ) AS winner_username

            FROM 
            Item i 
            LEFT JOIN Bid b ON i.itemID = b.itemID
            WHERE i.end_datetime IS NOT NULL AND i.itemID=${itemId}
            GROUP BY
            i.itemID,
            i.item_name,
            i.end_datetime,
            i.status,
            i.get_it_now_price,
            i.minimum_sale_price
            ),

        WinnerInfo AS (
            SELECT
            ar.itemID,
            ar.item_name, ar.item_description, ar.username, ar.categoryID, ar.returnable, ar.conditionId, ar.cancel_datetime,
            ar.status,
            ar.end_datetime,
            ar.get_it_now_price,
            ar.minimum_sale_price,
            ar.highest_bid_amount,
            ar.winner_username,
            (CASE
            WHEN ar.status = 'canceled' THEN 'Canceled'
            WHEN ar.highest_bid_amount = ar.get_it_now_price OR
            ar.highest_bid_amount >= ar.minimum_sale_price THEN
            ar.winner_username
            ELSE NULL
            END) AS winner,
            (CASE
            WHEN ar.status = 'canceled' THEN NULL
            WHEN ar.highest_bid_amount = ar.get_it_now_price OR
            ar.highest_bid_amount >= ar.minimum_sale_price THEN
            ar.highest_bid_amount
            ELSE NULL
            END) AS sold_price
            FROM AuctionResults ar
            )

        SELECT
            itemID,
            item_name, item_description, category_name, condition_name, returnable, get_it_now_price, status,
            username AS listing_username,
            sold_price,
            winner,
            end_datetime,
            cancel_datetime
            FROM WinnerInfo
            INNER JOIN Category ON WinnerInfo.categoryID = Category.categoryID
            INNER JOIN Condition ON WinnerInfo.conditionID = Condition.conditionID
            ORDER BY end_datetime DESC;
        `

        const bidsQuery = `
        SELECT
        Bid.bid_amount,
        Bid.bid_datetime,
        Bid.username
        FROM Bid
        WHERE itemID = ${itemId}
        ORDER BY Bid.bid_datetime DESC, Bid.bid_amount DESC;`
       
        await updateAuctionStatus();
        const itemRes = await db.query(winnerQuery);
        const bidsRes = await db.query(bidsQuery);


      
        const item = itemRes.rows[0]
        const bids = bidsRes.rows
        return NextResponse.json({...{item}, ...{bids} }, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the item from database"
   }, {
    status: 500
   })
    }
}