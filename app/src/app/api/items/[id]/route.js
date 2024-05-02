import {NextResponse } from "next/server";
import db from '../../../../../utils/db'

export async function GET (request, { params }) {
    
    const itemId = params.id;
    try{

        const sqlQuery = `
        SELECT
        Item.itemID,
        Item.item_name,
        Item.item_description,
        Item.username AS listing_username,
        Category.category_name,
        Condition.condition_name,
        Item.returnable,
        Item.get_it_now_price,
        Item.end_datetime,
        Item.status, Item.starting_bid_price
        FROM Item
        INNER JOIN Category ON Item.categoryID = Category.categoryID
        INNER JOIN Condition ON Item.conditionID = Condition.conditionID
        WHERE Item.itemID = ${itemId};
        `
       
        const itemRes = await db.query(sqlQuery);
      
        const item = itemRes.rows[0]
        return NextResponse.json(item, {
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