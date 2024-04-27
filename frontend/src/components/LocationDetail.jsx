import { Link, useLocation } from "react-router-dom";
import ModalBg from "./ModalBg";
import useStore from "../store/store";
import Input from "./Input";
import axios from "axios";
import { useEffect, useState } from "react";

function LocationDetail() {
  const { state } = useLocation();
  const user = useStore((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = async () => {
    if (comment.trim() == "") {
      alert("Review cannot be blank");
    } else {
      const res = await axios.post(
        "http://localhost:3000/api/review",
        {
          node_id: state.id.toString(),
          rating: 3,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setReviews([res.data, ...reviews]);
      setComment("");
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/review?node_id=${state.id}`
      );
      setReviews(res.data);
    };
    getReviews();
  }, []);

  return (
    <ModalBg>
      <div className="w-[80%] max-w-[500px] bg-bright text-dark rounded-lg p-6">
        <p className="font-bold text-xl">{state.name}</p>
        <p className="text-sm text-gray-600">{state.description}</p>
        <p className="font-semibold text-lg underline text-purple mt-2">
          Reviews
        </p>

        {user.user_id ? (
          <div className="mt-2 mb-6">
            <input
              className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
              placeholder="Write a review"
              value={comment}
              onChange={handleChange}
            />
            <button
              className="bg-purple text-bright py-2 px-8 min-w-20 rounded-lg mt-2"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        ) : (
          <p>
            <Link
              to="/login"
              className="text-purple underline"
            >
              Login
            </Link>{" "}
            to write a review.
          </p>
        )}

        <div className="h-[196px] overflow-auto">
          {reviews.map((review) => (
            <div className="bg-gray-300 py-2 px-4 rounded-xl mt-2">
              <p className="text-lg font-semibold">{review.user_name}</p>
              <p className="mt-[-4px] text-sm text-dark">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </ModalBg>
  );
}
export default LocationDetail;
