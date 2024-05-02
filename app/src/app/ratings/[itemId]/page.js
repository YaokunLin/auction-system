"use client";
import Heading from "../../UI/Heading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import getItemResults from "../../apiService/getItemResults";
import getRatings from "../../apiService/getRatings";
import Button from "../../UI/Button";
import FlexContainer from "../../UI/FlexContainer";
import { useRouter } from "next/navigation";
import getIsAdmin from "../../apiService/getIsAdmin";
import deleteRating from "../../apiService/deleteRating";
import submitRating from "../../apiService/submitRating";

import FormControl from "../../UI/FormControl";
import Textarea from "../../UI/FormTextArea";
export default function ListItemPage({ params }) {
  const itemId = params.itemId;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [ratingTable, setRatingTable] = useState(null);
  const [averageStars, setAverageStars] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [winner, setWinner] = useState(null);
  const [itemName, setItemName] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [existingRatingErr, setExistingRatingErr] = useState("");

  const colors = {
    orange: "#F2C265",
    grey: "a9a9a9",
  };

  const stars = Array(5).fill(0);

  const handleMouseOverStar = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(undefined);
  };

  const handleClickStar = (value) => {
    setRating(value);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // See if user is admin
        if (localStorage.getItem("username")) {
          const isAdminRes = await getIsAdmin(localStorage.getItem("username"));
          setIsAdmin(isAdminRes.is_admin);
        }
        // Fetch item details
        const itemRes = await getItemResults(itemId);
        const itemResItem = itemRes.item;

        setItemName(itemResItem.item_name);
        setWinner(itemResItem.winner);

        // Fetch ratings
        const resRating = await getRatings(itemId);
        setRatingTable(resRating.ratingList);
        setAverageStars(Number(resRating.averageStars.toFixed(1)));
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    if (winner && localStorage.getItem("username") === winner) {
      console.log("session user is the winner of the item");
      setIsWinner(true);
    }
  });

  const handleDelete = async (rated_by, rating_datetime, event) => {
    event.preventDefault();
    try {
      console.log(
        `Deleting rating for Item ID ${itemId} and Rated By ${rated_by}`
      );
      const res = await deleteRating(itemId, rated_by, rating_datetime);
      console.log("Rating deleted successfully:", res);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting rating:", error);
      window.location.reload();
    }
  };
  function formatDateTime(datetimeStr) {
    if (!datetimeStr) return "";
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const newRating = {
      itemId: itemId,
      comment: comment,
      number_of_stars: rating,
      rating_datetime: formatDateTime(currentDate),
      username: winner,
    };
    try {
      console.log("Sending rating to db...");
      const resNewRating = await submitRating(newRating);

      // window.location.reload();

      if (resNewRating.status === 409) {
        setExistingRatingErr(
          "You already rated this item. Try deleting the rating first before adding another rating."
        );

        console.log(existingRatingErr);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting rating: ", error);
      // window.location.reload();
    }
    // Handle submission of comment, e.g., send to server
    console.log("Submitted comment:", newRating);

    setComment("");
    setRating(0);
    
  };

  if (isLoading) {
    return <div className="flex items-center justify-center">loading...</div>;
  }

  return (
    <main>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="max-w-screen-xl mx-auton shadow flex flex-col flex-1">
          <div className="flex justify-between bg-custom-blue-200 px-3 py-2">
            <Heading>Item Ratings</Heading>
            <RxCrossCircled className="text-white mt-1 hover:text-gray-300" onClick={() => {router.back();}}/>
          </div>

          <form className="mt-3 p-6" onSubmit={handleSubmit}>
            {existingRatingErr.trim().length > 0 && (
              <div className="text-red-600 mb-3 font-bold ml-32 flex justify-center">
                {existingRatingErr}
              </div>
            )}
            <div className="flex space mb-2 -mt-2">
              <div className="w-24">Item ID</div>
              <div className="font-bold ml-11">{itemId}</div>
            </div>

            <div className="flex space mb-2">
              <div className="w-24">Item Name</div>
              <div className="font-bold ml-11">{itemName}</div>
            </div>

            <div className="flex space mb-2">
              <div className="w-25">Average Rating</div>
              <div className="font-bold ml-6">{averageStars} stars</div>
            </div>
            {ratingTable.length === 0 && (
              <div className="flex justify-center border border-grey mb-8 mt-8">
                No ratings yet.
              </div>
            )}

            {ratingTable && (
              <div className="rating-section">
                {ratingTable.map((val, id) => (
                  <div
                    key={id}
                    className="rating-item border border-grey p-4 mb-4"
                  >
                    {(isAdmin ||
                      (val.rated_by === localStorage.getItem("username"))) && (
                        <button
                          onClick={(event) =>
                            handleDelete(
                              val.rated_by,
                              formatDateTime(val.rating_datetime),
                              event
                            )
                          }
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Delete
                        </button>
                      )}
                    <div className="info">
                      <div className="flex space">
                        <div className="w-24">Rated by:</div>
                        <div className="font-bold mr-8">{val.rated_by}</div>

                        <div className="ml-auto w-13">
                          <div className="flex space-x-1">
                            {stars.map((_, index) => (
                              <FaStar
                                key={index}
                                size={24}
                                color={
                                  val.number_of_stars > index
                                    ? colors.orange
                                    : colors.grey
                                }
                                className="star"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-24">Date:</div>
                        <div className="font-bold">
                          {formatDateTime(val.rating_datetime)}
                        </div>
                      </div>
                    </div>
                    <div className="comment">{val.comment}</div>
                  </div>
                ))}
              </div>
            )}

            {isWinner && (
              <FormControl>
                <div className="flex flex-col">
                  <div className="flex mb-10">
                    <div className="mr-8">My Rating</div>
                    <div className="flex space-x-1">
                      {stars.map((_, index) => (
                        <FaStar
                          key={index}
                          size={24}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          color={
                            (hoverValue || rating) > index
                              ? colors.orange
                              : colors.grey
                          }
                          onClick={() => handleClickStar(index + 1)}
                          onMouseOver={() => handleMouseOverStar(index + 1)}
                          onMouseLeave={() => handleMouseLeaveStar()}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-28">Comments</div>
                    <Textarea
                      className="appearance border-2 border-gray-300"
                      type="text"
                      id="comments"
                      value={comment}
                      onChange={handleCommentChange}
                      style={{ width: "300px", height: "100px" }}
                    />
                  </div>
                </div>
              </FormControl>
            )}

            <FlexContainer>
              <Button
                type="button"
                onClick={() => router.push(`/item-results/${itemId}`)}
              >
                Close
              </Button>
              {isWinner && (
                <Button style={{ fontWeight: "bold" }}>Rate This Item</Button>
              )}
            </FlexContainer>
          </form>
        </div>
      </div>
    </main>
  );
}
