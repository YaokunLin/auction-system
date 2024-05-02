import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
        let sql = `
        SELECT category_name, COUNT(itemID), MIN(get_it_now_price), MAX(get_it_now_price), ROUND(AVG(get_it_now_price),2) as avg
        FROM(
        SELECT a.get_it_now_price, a.itemID, b.category_name
        From Item AS a
        INNER JOIN Category AS b on a.categoryID=b.categoryID
        where a.status != 'canceled'
        )
        GROUP BY category_name
        ORDER BY category_name;
        `
        const categoryReportRes = await db.query(sql);
        const categoryReportList = categoryReportRes.rows
        return NextResponse.json({categoryReportList}, {
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