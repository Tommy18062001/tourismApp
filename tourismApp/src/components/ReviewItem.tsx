import axios from "axios";
import { useEffect, useState } from "react";
import RatingWidget from "./RatingWidget";
import { BiTime } from "react-icons/bi";

export default function ReviewItem({ reviewData }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const reviewDate = new Date(reviewData.lastModified);
  const today = new Date();

  const diff = Math.abs(reviewDate - today);
  let timeElapsed;

  if (diff > 1000 * 60 && diff < 1000 * 3600) {
    timeElapsed = Math.ceil(diff / (1000 * 60)) + " min";
  } else if (diff > 1000 * 3600 && diff < 1000 * 60 * 60 * 24) {
    timeElapsed = Math.ceil(diff / (1000 * 60 * 60)) + " hours";
  } else if (diff > 1000 * 60 * 60 * 24) {
    timeElapsed = Math.ceil(diff / (1000 * 60 * 60 * 24)) + " days";
  } else {
    timeElapsed = diff + " seconds";
  }

  useEffect(() => {
    axios.get("/userData/" + reviewData.owner).then(({ data }) => {
      setUser(data);
      setReady(true);
    });
  }, [reviewData.owner]);

  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  return (
    <div className="p-2 my-4 border border-gray-400 rounded-xl cursor-pointer">
      <div className="flex gap-2 items-start mb-2">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={"http://localhost:4000/uploads/" + user.profilePic}
          alt={user.profilePic}
        />
        <div className="flex justify-between w-full">
          <section>
            <h1 className="font-bold">{user.name}</h1>
            <RatingWidget rating={reviewData.rating} isreview={true} />
          </section>
          <p className="text-sm text-gray-500 flex gap-1 items-center h-max">
            <BiTime /> <span>{timeElapsed}</span>
          </p>
        </div>
      </div>
      <p className="text-sm mt-4 mb-2">{reviewData.reviewText}</p>
    </div>
  );
}
