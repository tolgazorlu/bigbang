import { ContentListProps } from "./JumbotronListProps";

const JumbotronCard = ({ content }: ContentListProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-8 md:p-8 font-poppins">
      <a className="bg-gray-700 text-purple-400 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-2">
        {content.step}
      </a>
      <h2 className="text-white text-2xl font-extrabold mb-2">
        {content.title}
      </h2>
      <p className="text-lg font-normal text-gray-400 mb-4">
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

export default JumbotronCard;
