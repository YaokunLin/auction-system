import { NextResponse } from "next/server";
import db from "../../../../../utils/db";

export async function GET(request, { params }) {
  const itemID = params.id;

  try {
    const q = `
    select
    ids.item_name,
    r.username as rated_by,
    r.number_of_stars,
    r.comment,
    r.rating_datetime 
    from
    rating as r 
    join
        (
          select
              i.itemid,
              i.item_name 
          from
              item as i 
              join
                (
                    select
                      item_name 
                    from
                      item 
                    where
                      itemID = ${itemID}
                )
                as name 
                on i.item_name = name.item_name
        )
        ids 
        On r.itemid = ids.itemid 
    order by
    r.rating_datetime desc;
    `;

    const res = await db.query(q);
    const ratingList = res.rows;
    
    const totalStars = ratingList.reduce((acc, curr) => acc + curr.number_of_stars, 0);
    const averageStars = totalStars / ratingList.length;

    return NextResponse.json({ratingList, averageStars},{
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occured while fetching the item from database",
      },
      {
        status: 500,
      }
    );
  }
}
