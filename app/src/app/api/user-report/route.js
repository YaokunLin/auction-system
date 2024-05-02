import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
        let sql = `
        WITH table_listed as
        (SELECT username,COUNT(itemID) AS count_listed
        FROM (
            SELECT a.username, b.itemID
            FROM Platformuser a
            LEFT JOIN Item b on a.username=b.username
        )
        GROUP BY username),


        table_sold AS
        (SELECT username, COUNT(itemID) AS count_sold
        From (
        SELECT a.username, b.itemID, b.status
        FROM Platformuser AS a
        INNER JOIN Item AS b on a.username = b.username
        WHERE b.status = 'won'
        )
        GROUP BY username),


        table_won AS(
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
        SELECT winner, COUNT(itemID) AS count_won
        FROM (
        SELECT
        itemID,
        item_name,
        sold_price,
        winner
        FROM WinnerInfo
        WHERE winner != 'Canceled' and winner IS NOT NULL
        )
        GROUP BY winner),


        table_rated AS
        (SELECT username, COUNT(rating_datetime) AS count_rated
        FROM (
        SELECT a.username, e.rating_datetime
        FROM Platformuser AS a
        LEFT JOIN Rating AS e on a.username = e.username
        )
        GROUP BY username),


        table_frequent_condition AS
        (select username, condition_name
        FROM(
        SELECT
        username,
        condition_name,
        count_condition,
        ROW_NUMBER() OVER(PARTITION BY username ORDER BY count_condition DESC, conditionID DESC) AS row_number
        FROM (
            select username, condition_name, conditionID, COUNT(itemID) as count_condition
            FROM
            (SELECT a.username, b.itemID, f.condition_name, f.conditionID
            FROM Platformuser AS a
            INNER JOIN Item AS b ON a.username = b.username
            INNER JOIN Condition AS f ON b.conditionID = f.conditionID
            )
            GROUP BY username, condition_name, conditionID
        ))
        WHERE row_number=1)


        SELECT
        x.username,
        x.count_listed,
        (CASE WHEN y.count_sold IS NULL THEN 0 ELSE y.count_sold END) AS count_sold,
        (CASE WHEN z.count_won IS NULL THEN 0 ELSE z.count_won END) AS count_won,
        v.count_rated,
        (CASE WHEN w.condition_name IS NULL THEN 'N/A' ELSE w.condition_name END) AS frequent_condition
        FROM table_listed AS x
        LEFT JOIN table_sold AS y ON x.username = y.username
        LEFT JOIN table_won AS z ON x.username = z.winner
        LEFT JOIN table_rated AS v ON x.username = v.username
        LEFT JOIN table_frequent_condition as w on x.username=w.username;
        `
        const userReportRes = await db.query(sql);
        const userReportList = userReportRes.rows
        return NextResponse.json({userReportList}, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the user report data from database"
   }, {
    status: 500
   })
    }
}