const Rating = (props: { rating: number }) => {
  const { rating } = props;

  return (
    <div className="rating">
      <input
        type="radio"
        className={
          rating > 0.5
            ? "mask mask-star-2 bg-orange-400"
            : "mask mask-star-2 bg-gray-400"
        }
      />
      <input
        type="radio"
        className={
          rating > 1.5
            ? "mask mask-star-2 bg-orange-400"
            : "mask mask-star-2 bg-gray-400"
        }
      />
      <input
        type="radio"
        className={
          rating > 2.5
            ? "mask mask-star-2 bg-orange-400"
            : "mask mask-star-2 bg-gray-400"
        }
      />
      <input
        type="radio"
        className={
          rating > 3.5
            ? "mask mask-star-2 bg-orange-400"
            : "mask mask-star-2 bg-gray-400"
        }
      />
      <input
        type="radio"
        className={
          rating > 4.5
            ? "mask mask-star-2 bg-orange-400"
            : "mask mask-star-2 bg-gray-400"
        }
      />
    </div>
  );
};

export default Rating;
