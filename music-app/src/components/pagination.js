export function Pagination(props) {
  const { page, setPage } = props;
  const handleClickPrevious = () => {
    setPage(page - 1);
  };
  const handleClickNext = () => {
    setPage(page + 1);
  };
  return (
    <div className="mt-8 flex justify-center">
      <button
        disabled={page === 1 ?? ""}
        onClick={handleClickPrevious}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={handleClickNext}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4"
      >
        Next
      </button>
    </div>
  );
}
