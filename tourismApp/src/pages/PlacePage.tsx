import { useEffect, useState } from "react";
import BookingTrip from "../components/BookingTrip";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingWidget from "../components/RatingWidget";
import ReviewItem from "../components/ReviewItem";

export default function PlacePage() {
  const [showPhotos, setshowPhotos] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [placeReady, setPlaceReady] = useState(false);
  const [reviewsReady, setReviewsReady] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/placeData/" + id).then(({ data }) => {
      setPlace(data);
      setPlaceReady(true);
    });

    axios.get("/reviewData/" + id).then(({ reviewData }) => {
      setReviews(reviewData);
      setReviewsReady(true);
    });
  }, [id]);

  if (!placeReady || !reviewsReady) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  // if showphoto is true, display the list of photos
  if (showPhotos) {
    return (
      <div className="absolute top-0 left-0 h-auto min-w-full z-50 flex gap-8 justify-center items-center bg-white">
        <div className="w-full h-auto flex flex-col items-center justify-center gap-2 mt-32 mb-16">
          {place.photos.length > 0 &&
            place.photos.map((photo) => (
              <img
                className="rounded-md w-3/4 max-w-2xl h-[361px] object-cover"
                src={"http://localhost:4000/uploads/" + photo}
                alt={photo}
              />
            ))}
        </div>
        <button
          className="fixed top-6 right-10 btn-primary"
          onClick={() => setshowPhotos(false)}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="mt-32 w-3/4 mx-auto min-h-screen">
      {/* place headline */}
      <h1 className="text-4xl">{place.title}</h1>
      <div>
        <RatingWidget rating={place.rating} />
        <p> {place.location} </p>
      </div>

      {/* image display */}
      <div className="grid grid-cols-[2fr_1fr] gap-2 mt-8 relative">
        <div className="w-full h-[424px] relative">
          <img
            className="rounded-md w-full h-full object-cover"
            src={"http://localhost:4000/uploads/" + place.photos[0]}
            alt=""
          />
        </div>
        <div className="grid gap-2 w-full">
          <img
            className="rounded-md w-full h-52 object-cover"
            src={"http://localhost:4000/uploads/" + place.photos[1]}
            alt=""
          />
          <img
            className="rounded-md w-full h-52 object-cover"
            src={"http://localhost:4000/uploads/" + place.photos[2]}
            alt=""
          />
        </div>
        {place.photos.length > 3 && (
          <button
            className="absolute bottom-2 left-2 bg-white rounded-full px-6 py-2"
            onClick={() => setshowPhotos(true)}
          >
            See more
          </button>
        )}
      </div>

      {/* More info and pricing */}
      <div className="grid grid-cols-[2fr_1fr] gap-2 mt-8">
        <div className="p-2">
          <div>
            <div className="mb-4">
              <h2 className="text-sm">Hosted By</h2>
              <p>Tommy Sylver</p>
            </div>
            <div className="mb-4">
              <h2 className="text-sm flex gap-1 items-center">Last modified</h2>
              <p>{place.lastModified}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-sm">Cancellation Process</h2>
              <p>Within 48 hours</p>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl mb-2">Description</h2>
            <p>{place.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl mb-2">Additional Information</h2>
            <p>{place.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl mb-2">Reviews</h2>
            {/* <div>
              {reviews.length > 0 &&
                reviews.map((review) => <ReviewItem reviewData={review} />)}
            </div> */}
            {reviews ? (
              <div>
                {reviews.length > 0 &&
                  reviews.map((review) => <ReviewItem reviewData={review} />)}
              </div>
            ) : (
              <div>
                <h3>There is no reviews</h3>
              </div>
            )}

            {showReviewForm ? (
              <form className="mt-4">
                <textarea name="reviewText" className="h-16 max-h-48"></textarea>
                <button className="bg-primary px-3 py-2 text-white text-sm rounded-2xl">
                  Submit Review
                </button>
              </form>
            ) : (
              <button
                className="bg-primary px-3 py-2 text-white text-sm mt-4 rounded-2xl"
                onClick={() => setShowReviewForm(true)}
              >
                Add Reviews
              </button>
            )}
          </section>
        </div>

        {/* booking Trip */}
        <BookingTrip placeData={place} />
      </div>
    </div>
  );
}
