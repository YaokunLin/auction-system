import {NextResponse } from "next/server";
import db from '../../../../../../utils/db'

export async function POST (request, { params }) {
    const itemDescribeInfo = await request.json();
    const itemId = params.id;
    const {itemDescribe} = itemDescribeInfo
    try{

        let sqlQuery = `
        UPDATE Item
        SET
            item_description = '${itemDescribe}'
        WHERE itemID = '${itemId}';
        `
       
        const updateDescribRes = await db.query(sqlQuery);
        const updateDescrib = updateDescribRes.rows
        return NextResponse.json(updateDescrib, {
            status: 201
        })

    }catch (error) {
        console.log(error)
   return NextResponse.json({
    error: "An error occured while canceling the item from database"
   }, {
    status: 500
   })
    }
}