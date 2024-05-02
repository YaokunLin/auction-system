import { NextResponse } from "next/server";
import db from '../../../../utils/db'
export async function POST(req) {
    try{
      const itemInfo = await req.json();
    
          // Insert into Item table
          const itemInsertRes = await db.query(
            `INSERT INTO Item (item_name, item_description, returnable, username, categoryID, conditionID, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime, end_datetime ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,  Now(), Now() + $11 * INTERVAL '1 day' ) RETURNING *`,
            [itemInfo.itemName, itemInfo.description, itemInfo.returnable, itemInfo.username, itemInfo.category, itemInfo.condition, itemInfo.status, itemInfo.biddingPrice, itemInfo.minSalePrice, itemInfo.getPrice, itemInfo.selectedAuctionLength]
        ); 
     
      return NextResponse.json(
        {message: "item created successfully into database"},
        {status: 201}
      )
    }catch(err) {
        return NextResponse.json({
            error: "an error occured while saving form data in database"
        }, {
            status: 500
        })
    }
}