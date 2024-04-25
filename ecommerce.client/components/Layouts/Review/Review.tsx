type Props = {
  review: any;
};

const Review = ({ review }: Props) => {
  const avatar =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 bg-neutral-800 p-4 ">
        <div className="flex gap-2 items-center">
          <img
            src={review.user.avatar ? review.user.avatar : avatar}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm">{review.user.userName}</span>
        </div>
        <div className="">{review.rating}</div>
        <div className="text-sm text-neutral-300">{review.comment}</div>
      </div>
    </div>
  );
};

export default Review;
