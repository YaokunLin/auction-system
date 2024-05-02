import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
        let sql = `
        SELECT item_name, ROUND(AVG(number_of_stars), 1) AS avg_rating, COUNT(itemID)
        FROM(
            SELECT a.itemID, a.item_name, b.number_of_stars
            FROM Item a
            INNER JOIN Rating b ON a.itemID = b.itemID
        )
        GROUP BY item_name
        ORDER BY avg_rating DESC, item_name ASC
        LIMIT 10;
        `
        const topRatedItemsReportRes = await db.query(sql);
        const topRatedItemsReportList = topRatedItemsReportRes.rows
        return NextResponse.json({topRatedItemsReportList}, {
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