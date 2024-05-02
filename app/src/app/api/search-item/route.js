import { NextResponse } from "next/server";
import db from '../../../../utils/db'
export async function POST(req) {
    try{
      const searchParams = await req.json();
   
      let sql = `
    SELECT 
      Item.itemID, 
      Item.item_name, 
      Bid.username, 
      MaxBid.max_bid_amount, 
      Item.get_it_now_price, 
      Item.end_datetime 
    FROM 
      Item 
    INNER JOIN
      Condition ON Item.conditionID = Condition.conditionID
    INNER JOIN
      Category ON Item.categoryID = Category.categoryID
    LEFT JOIN (
      SELECT 
        Bid.itemID, 
        MAX(Bid.bid_amount) AS max_bid_amount
      FROM 
        Bid
      GROUP BY 
        Bid.itemID
    ) MaxBid ON Item.itemID = MaxBid.itemID
    LEFT JOIN 
      Bid ON Item.itemID = Bid.itemID AND Bid.bid_amount = MaxBid.max_bid_amount
      
    WHERE Item.status = 'active'
  `;
  
  let conditions = [];
  let params = [];
  let paramCounter = 1;

  if (searchParams.keyword !== null) {
      conditions.push(`(Item.item_name LIKE '%' || $${paramCounter} || '%' OR Item.item_description LIKE '%' || $${paramCounter} || '%')`);
      params.push(searchParams.keyword);
      paramCounter++;
  }

  if (searchParams.category !== null) {
      conditions.push(`Item.categoryID = $${paramCounter}`);
      params.push(searchParams.category);
      paramCounter++;
  }

  if (searchParams.condition !== null) {
      conditions.push(`Item.conditionID <= $${paramCounter}`);
      params.push(searchParams.condition);
      paramCounter++;
  }

  if (searchParams.minPrice !== null) {
      conditions.push(`COALESCE(MaxBid.max_bid_amount, Item.starting_bid_price) >= $${paramCounter}`);
      params.push(searchParams.minPrice);
      paramCounter++;
  }

  if (searchParams.maxPrice !== null) {
      conditions.push(`COALESCE(MaxBid.max_bid_amount, Item.starting_bid_price) <= $${paramCounter}`);
      params.push(searchParams.maxPrice);
      paramCounter++;
  }

  if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(" AND ");
  }

  sql += ' ORDER BY Item.end_datetime ASC';

  const searchRes = await db.query(sql, params);
  const searchItem = searchRes.rows

     
      return NextResponse.json({searchItem},
        {message: "get item successfully according to the search criteria selected"},
        {status: 200}
      )
    }catch(err) {
        return NextResponse.json({
            error: "an error while looking for items from the database"
        }, {
            status: 500
        })
    }
}