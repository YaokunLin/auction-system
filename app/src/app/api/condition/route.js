import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
       
        const conditionRes = await db.query('SELECT * FROM Condition');
        const conditionList = conditionRes.rows
        return NextResponse.json({conditionList}, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the condition from database"
   }, {
    status: 500
   })
    }
}