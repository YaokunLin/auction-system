import { NextResponse } from "next/server";
import db from "../../../../../../utils/db";

export async function POST(request) {
  const req = await request.json();

  try {
    // check if user has ratings in DB already
    let q = `select * from rating 
    where username = '${req.newRating.username}'
      and itemid = ${req.newRating.itemId};
    `;

    const existRating = await db.query(q);

    if (existRating.rowCount != 0) {
      return NextResponse.json(
        { message: "Rating already exists in database" },
        { status: 409 }
      );
    } else {
      let sqlQuery = `
      Insert into rating 
      (itemId, comment, number_of_stars, rating_datetime, username)
      VALUES ($1, $2, $3, $4, $5)
          `;

      console.log(sqlQuery);
      const cancelRes = await db.query(sqlQuery, [
        Number(req.newRating.itemId),
        req.newRating.comment,
        req.newRating.number_of_stars,
        req.newRating.rating_datetime,
        req.newRating.username,
      ]);

      return NextResponse.json({
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "An error occured while canceling the item from database",
      },
      {
        status: 500,
      }
    );
  }
}
