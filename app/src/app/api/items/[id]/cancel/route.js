import {NextResponse } from "next/server";
import db from '../../../../../../utils/db'

export async function POST (request, { params }) {
    const cancelInfo = await request.json();
    const itemId = params.id;
    const {cancelReason, cancelBy} = cancelInfo
    try{

        let sqlQuery = `
        UPDATE Item
            SET
            status = 'canceled',
            end_datetime = NOW(),
            cancel_datetime = NOW(),
            cancel_reason = '${cancelReason}',
            canceled_by = '${cancelBy}'
            WHERE itemID = '${itemId}';
        `
       
        const cancelRes = await db.query(sqlQuery);
        const cancel = cancelRes.rows
        return NextResponse.json(cancel, {
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