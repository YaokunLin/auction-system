import { NextResponse } from "next/server";
import db from '../../../../utils/db'
export async function POST(req) {
    try{
    const username = await req.json();
    const userRes = await db.query(`SELECT first_name, last_name FROM PlatformUser WHERE PlatformUser.username = $1`, [username]);
    const adminRes = await db.query(`SELECT position FROM adminuser WHERE username = $1`, [username]);
    let userInfo = {firstName: null, lastName: null, position: null}
    if (userRes.rows.length > 0) {
        const user = userRes.rows[0];
        if(user.first_name) {
            userInfo.firstName = user.first_name
        }
        if(user.last_name) {
            userInfo.lastName = user.last_name
        }
    }

    if (adminRes.rows.length > 0) {
        const admin = adminRes.rows[0];
        if(admin.position) {
            userInfo.position = admin.position;
        }
    }
    
    return NextResponse.json({userInfo}, {
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