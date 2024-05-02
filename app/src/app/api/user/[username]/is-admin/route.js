import {NextResponse } from "next/server";
import db from '../../../../../../utils/db'

export async function GET (request, { params }) {
    
    const username = params.username;
    try{

        const sqlQuery = `
        SELECT EXISTS(
            SELECT 1
            FROM AdminUser
            WHERE username= '${username}'
            ) AS is_admin;;
        `
       
        const isAdminRes = await db.query(sqlQuery);
        
      
        const isAdmin = isAdminRes.rows[0]
        return NextResponse.json(isAdmin, {
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