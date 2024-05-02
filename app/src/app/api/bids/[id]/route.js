import {NextResponse } from "next/server";
import db from '../../../../../utils/db'

export async function GET (request, { params }) {
    
    const itemId = params.id;
    try{

        const sqlQuery = `
        SELECT
        bid_amount,
        bid_datetime,
        username
        FROM Bid
        WHERE itemID = ${itemId}
        ORDER BY bid_datetime DESC
        LIMIT 4;
        `
       
        const bidsRes = await db.query(sqlQuery);
        const bids = bidsRes.rows
        return NextResponse.json(bids, {
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

export async function POST (request, { params }) {
    const bidInfo = await request.json();
    const itemId = params.id;
    const {bidAmount, username, isGetItNow} = bidInfo
    try{

        let sqlQuery = ""

        if (isGetItNow){
            sqlQuery = `
            BEGIN;
    
            -- Update the auction status and end_datetime
            UPDATE Item
            SET
            status = 'won',
            end_datetime = NOW()
            WHERE itemID = ${itemId};
    
            INSERT INTO Bid (
            bid_amount,
            bid_datetime,
            itemID,
            username
            )
            VALUES (
            ${bidAmount},
            NOW(),
            ${itemId},
            '${username}'
            );
            COMMIT;`
        } else{
            sqlQuery=`
            INSERT INTO Bid (
                bid_amount,
                bid_datetime,
                itemID,
                username
                )
                VALUES (
                    ${bidAmount},
                    NOW(),
                    ${itemId},
                    '${username}'
                    );
            `
        }

       
       
        const bidsRes = await db.query(sqlQuery);
        const bids = bidsRes.rows
        return NextResponse.json(bids, {
            status: 201
        })

    }catch (error) {
        console.log(error)
   return NextResponse.json({
    error: "An error occured while bidding on the item from database"
   }, {
    status: 500
   })
    }
}