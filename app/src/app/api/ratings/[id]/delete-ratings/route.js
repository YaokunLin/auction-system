import { NextResponse } from "next/server";
import db from "../../../../../../utils/db";

export async function POST(request, { params }) {
  const { itemId, rated_by, rating_datetime } = await request.json();

  try {
    let sqlQuery = `
    delete from rating 
    where
         rating_datetime = '${rating_datetime}'
        and username = '${rated_by}';
    `;

    console.log(sqlQuery);
    const cancelRes = await db.query(sqlQuery);

    return NextResponse.json({
      status: 201,
    });
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
