import PropTypes from "prop-types";
import { ContentListProps } from "./JumbotronListProps";

const JumbotronCard = ({ content }: ContentListProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-8 md:p-8">
      <a className="bg-white text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
        {content.step}
      </a>
      <h2 className="text-gray-100 dark:text-white text-2xl font-extrabold mb-2">
        {content.title}
      </h2>
      <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
        {content.detail}
      </p>
      <a
        href={content.button.link}
        className="text-yellow-500 dark:text-yellow-500 hover:underline font-medium text-lg inline-flex items-center"
      >
        {content.button.title}
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

JumbotronCard.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      button: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default JumbotronCard;