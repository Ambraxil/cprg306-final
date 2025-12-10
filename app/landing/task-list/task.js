const Task = ({
  title,
  startTime,
  endTime,
  completed,
  onSelect,
  onToggleComplete,
  onExport,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 mb-4 w-full rounded flex justify-between items-center bg-blue-950 cursor-pointer hover:bg-blue-900 ${
        completed ? "opacity-60 line-through" : ""
      }`}
    >
      <div>
        <p className="font-bold text-xl">{title}</p>
        <p className="font-semibold text-sm text-white-600">
          {startTime && <>Start: {startTime} </>} {endTime && <>End: {endTime}</>}
        </p>
      </div>

      {onToggleComplete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent onClick
            onToggleComplete(!completed);
          }}
          className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {completed ? "Undo" : "Done"}
        </button>
      )}

      {onExport && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExport();
          }}
          className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Export
        </button>
      )}
    </div>
  );
};

export default Task;
