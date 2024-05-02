import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
        let sql = `
        WITH AuctionResults AS (
            SELECT
            i.itemID,
            i.item_name,
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
            WHERE i.end_datetime IS NOT NULL
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
            ar.item_name,
            ar.end_datetime,
            ar.status,
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
            item_name,
            sold_price,
            winner,
            end_datetime
            FROM WinnerInfo
            ORDER BY end_datetime DESC;
        `
        await updateAuctionStatus();
        const auctionResultstRes = await db.query(sql);
        const auctionResults = auctionResultstRes.rows
        return NextResponse.json(auctionResults, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the category report data from database"
   }, {
    status: 500
   })
    }
}

export async function updateAuctionStatus(){
    const sql = `
    WITH HighestBidInactiveAuction AS (
        SELECT
            i.itemID,
            MAX(b.bid_amount) AS highest_bid_amount,
            i.minimum_sale_price,
            i.end_datetime
        FROM Item i
        INNER JOIN Bid b ON i.itemID = b.itemID
        WHERE i.status = 'active' AND end_datetime < NOW()
        GROUP BY i.itemID
    )
    
    -- Update auctions to "finished" where the highest bid is less than the minimum sale price
    UPDATE Item
    SET status = 'finished'
    WHERE itemID IN (
        SELECT itemID FROM HighestBidInactiveAuction
        WHERE (
            (highest_bid_amount IS NULL) OR
            (highest_bid_amount < minimum_sale_price)
        )
    );

    
    
    -- Update auctions to "won" where the highest bid meets or exceeds the minimum sale price
    WITH HighestBidInactiveAuction AS (
        SELECT
            i.itemID,
            MAX(b.bid_amount) AS highest_bid_amount,
            i.minimum_sale_price,
            i.end_datetime
        FROM Item i
        INNER JOIN Bid b ON i.itemID = b.itemID
        WHERE i.status = 'active' AND end_datetime < NOW()
        GROUP BY i.itemID
    )
    UPDATE Item
    SET status = 'won'
    WHERE itemID IN (
        SELECT itemID FROM HighestBidInactiveAuction
        WHERE (
            highest_bid_amount >= minimum_sale_price
        )
    );
    
    `
    await db.query(sql);
}