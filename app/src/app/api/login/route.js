import { NextResponse } from "next/server";
import db from '../../../../utils/db'
export async function POST(req) {
    try{
    const credentials = await req.json();
    const passwordRes = await db.query(`SELECT password FROM PlatformUser WHERE username = $1`, [credentials.username]);
    
    if(passwordRes.rows.length === 0) {
        return NextResponse.json(
            {message: "User does not exist on the system"},
            {status: 404} //not found
          )
    }


    const storedPassword = passwordRes.rows[0].password

    if (storedPassword !== credentials.password) {
        return NextResponse.json({
            message: "Password is incorrect"
        }, {
            status: 401 // Unauthorized
        });
    }

    return NextResponse.json({
        message: "Login successful"
    }, {
        status: 200 // OK
    });
   
    }catch(err) {
        return NextResponse.json({
            error: "an error occured while login the app"
        }, {
            status: 500
        })
    }
}