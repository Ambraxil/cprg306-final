const Task = ({
  id,
  title,
  startTime,
  endTime,
  completed,
  onSelect,
  onToggleComplete,
  onDelete,
  onExport,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 mb-4 w-full rounded flex flex-col cursor-pointer border border-blue-900 hover:bg-blue-300 ${
        completed ? "opacity-60 line-through" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-xl">{title}</p>
          <p className="font-semibold text-sm text-gray-600">
            {startTime && <>Start: {startTime} </>} {endTime && <>End: {endTime}</>}
          </p>
        </div>

        <div className="flex space-x-2">
          {onToggleComplete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(id, !completed);
              }}
              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex-shrink-0"
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
              className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex-shrink-0"
            >
              Export
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="ml-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex-shrink-0"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
