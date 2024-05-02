import {NextResponse } from "next/server";
import db from '../../../../utils/db'

export async function GET () {
    try{
       
        const categoryRes = await db.query('SELECT * FROM Category');
        const categoryList = categoryRes.rows
        return NextResponse.json({categoryList}, {
            status: 200
        })

    }catch (error) {
   return NextResponse.json({
    error: "An error occured while fetching the category from database"
   }, {
    status: 500
   })
    }
}