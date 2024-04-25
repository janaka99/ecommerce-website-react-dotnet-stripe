"use client";

import useAddReview from "@/hooks/review/useAddReview";
import useGetOrderReview from "@/hooks/review/useGetOrderReview";
import useReviewRemove from "@/hooks/review/useRemoveReview";
import useUpdateReview from "@/hooks/review/useUpdateReview";
import { Rating } from "primereact/rating";
import { FormEvent, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {
  orderId: number;
  productId: number;
};

const ReviewForm = ({ orderId, productId }: Props) => {
  const {
    error: addReviewError,
    isReqProcessing: isAddReviewProcessing,
    addReview,
  } = useAddReview();

  const {
    error: updateReviewError,
    isReqProcessing: isUpdateReviewProcessing,
    updateReview,
  } = useUpdateReview();

  const { getSingleProduct } = useGetOrderReview();

  const { removeReview } = useReviewRemove();

  const [isReqProcessing, setIsReqProcessing] = useState(true);
  const [isReviewReqProcessing, setisReviewReqProcessing] = useState(false);
  const [isReviewDeleting, setisReviewDeleting] = useState(false);
  const [isReviewExist, setIsReviewExist] = useState(false);

  const [review, setReview] = useState<any>({
    Id: null,
    Rating: 1,
    Comment: "",
    OrderId: orderId,
    ProductId: productId,
  });

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (review.Rating > 5 && review.Rating <= 0) {
      toast.error("Please add rating");
      return;
    }

    if (review.Comment.length <= 0) {
      toast.error("Please add comment");
      return;
    }
    if (review.OrderId == null || review.ProductId == null) {
      toast.error("Invalida data");
      return;
    }
    setisReviewReqProcessing(true);
    const res = await addReview(review);
    if (res) {
      setisReviewReqProcessing(false);
      getReview();
      toast.success("Feedback successfully submitted");
    } else {
      setisReviewReqProcessing(false);
      getReview();
      toast.error("Something went wrong");
    }
    setisReviewReqProcessing(false);
  };

  const handleReviewUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (review.Rating > 5 && review.Rating <= 0) {
      alert("Please add rating");
      return;
    }

    if (review.Comment.length <= 0) {
      alert("Please add comment");
      return;
    }
    if (review.OrderId == null || review.ProductId == null) {
      alert("Invalida data");
      return;
    }
    setisReviewReqProcessing(true);
    const res = await updateReview(review);
    if (res) {
      setisReviewReqProcessing(false);
      getReview();
      toast.success("Feedback successfully updated");
    } else {
      setisReviewReqProcessing(false);
      getReview();
      toast.error("Something went wrong");
    }
    setisReviewReqProcessing(false);
  };

  const handleReviewRemove = async () => {
    console.log(review.Id);
    setisReviewDeleting(true);
    const res = await removeReview(review.Id);

    if (res) {
      setisReviewDeleting(false);
      getReview();
      toast.success("Review removed successfully");
    } else {
      setisReviewDeleting(false);
      getReview();
      toast.error("Something went wrong");
    }
    setisReviewDeleting(false);
  };

  const getReview = async () => {
    const res = await getSingleProduct(productId);
    console.log("result ", res);
    if (res.status == 200) {
      setReview((prev: any) => ({
        ...prev,
        Rating: res.data.rating,
        Comment: res.data.comment,
        Id: res.data.id,
      }));
      setIsReviewExist(true);

      return;
    }
    setReview({
      Id: null,
      Rating: 1,
      Comment: "",
      OrderId: orderId,
      ProductId: productId,
    });
    setIsReviewExist(false);
    return;
  };

  const getReviewAsync = async () => {
    setIsReqProcessing(true);
    await getReview();
    setIsReqProcessing(false);
  };

  useEffect(() => {
    getReviewAsync();
  }, []);

  return isReqProcessing ? (
    <>
      <div className="w-full flex flex-col min-h-[210px]  bg-neutral-100 animate-pulse p-4 gap-2">
        <div className="flex gap-1">
          <div className="bg-neutral-200 w-5 h-5 animate-pulse"></div>
          <div className="bg-neutral-200 w-5 h-5 animate-pulse"></div>
          <div className="bg-neutral-200 w-5 h-5 animate-pulse"></div>
          <div className="bg-neutral-200 w-5 h-5 animate-pulse"></div>
          <div className="bg-neutral-200 w-5 h-5 animate-pulse"></div>
        </div>
        <div className="w-full flex-grow bg-neutral-200"></div>
        <div className="w-28 h-10 bg-neutral-200 animate-pulse self-end "></div>
      </div>
    </>
  ) : (
    <div className="w-full relative">
      <form
        onSubmit={isReviewExist ? handleReviewUpdate : handleReviewSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 bg-neutral-100 text-neutral-800 p-4 ">
          <div className="flex gap-2 items-center">
            <Rating
              value={review.Rating}
              onChange={(e) => {
                setReview((prev: any) => ({
                  ...prev,
                  Rating: e.value,
                }));
              }}
              cancel={false}
              className="gap-2"
            />
          </div>
          <div className="text-sm text-neutral-800">
            <textarea
              rows={4}
              name=""
              id=" "
              className="w-full p-2 outline-none"
              value={review.Comment}
              placeholder="Add a feedback"
              onChange={(e) => {
                setReview((prev: any) => ({
                  ...prev,
                  Comment: e.target.value,
                }));
              }}
            />
          </div>
          {!isReviewReqProcessing ? (
            <button
              className="bg-green-900 w-28 px-4 py-1 uppercase text-sm text-white self-end cursor-pointer"
              type="submit"
            >
              {isReviewExist ? "Update" : "Submit"}
            </button>
          ) : (
            <button
              className="bg-green-900 w-28 px-4 py-1 uppercase text-sm text-white self-end"
              type="submit"
              disabled={true}
            >
              {isReviewExist
                ? isReviewDeleting
                  ? "Deleting..."
                  : "Updating..."
                : "Submiting..."}
            </button>
          )}
        </div>
      </form>
      {isReviewExist && (
        <button
          onClick={handleReviewRemove}
          className="absolute top-4 right-4 z-50 cursor-pointer"
        >
          <MdDelete size={20} className="hover:text-red-400" />
        </button>
      )}
    </div>
  );
};

export default ReviewForm;
