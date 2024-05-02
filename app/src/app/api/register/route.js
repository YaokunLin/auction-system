import { NextResponse } from "next/server";
import db from "../../../../utils/db";
export async function POST(req) {
  try {
    const userInfo = await req.json();

    // check if user already exists
    const existUsers = await db.query(
      `SELECT username FROM PlatformUser WHERE username = $1`,
      [userInfo.username]
    );



    if (existUsers.rowCount != 0) {

      return NextResponse.json(
        {
          message: "User already exist in database",
        },
        { status: 409 }
      );
    } else {

      // Insert into Item table
      const userInfoRes = await db.query(
        `INSERT INTO PlatformUser (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)`,
        [
          userInfo.username,
          userInfo.password,
          userInfo.first_name,
          userInfo.last_name,
        ]
      );

      return NextResponse.json(
        { message: "Registeration Successful." },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "an error occured while saving form data in database",
      },
      {
        status: 500,
      }
    );
  }
}
