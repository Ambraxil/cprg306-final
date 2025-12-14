const List = ({
    id,
    title,
    dateCreated,
    onSelect,
    onDelete,
}) => {
    return (
        <div
      className={`p-4 mb-4 w-full rounded flex flex-col border border-blue-900 hover:bg-blue-300`}
      >
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold text-xl">{title}</p>
                <p className="font-semibold text-sm text-gray-600">
                    {dateCreated && <>Created: {dateCreated} </>}
                </p>
            </div>
            <div className="flex space-x-2">
                {onSelect && (
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(id);
                    }}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:cursor-pointer hover:bg-green-700 flex-shrink-0"
                    >
                    Go to List
                    </button>
                )}
                {onDelete && (
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    className="ml-2 px-2 py-1 bg-red-600 text-white rounded hover:cursor-pointer hover:bg-red-700 flex-shrink-0"
                    >
                    Delete
                    </button>
                )}
            </div>
      </div>
    </div>
    );
};

export default List;