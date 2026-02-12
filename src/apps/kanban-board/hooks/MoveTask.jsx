const useMoveTask = (setColumns) => {
    return (taskId, fromColumnId, toColumnId) => {
        setColumns((prev) => {
            const columns = [...prev];
            const sourceColumnIndex = columns.findIndex((col) => col.id === fromColumnId);
            const destinationColumnIndex = columns.findIndex((col) => col.id === toColumnId);

            if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return prev;

            const sourceColumn = columns[sourceColumnIndex];
            const destinationColumn = columns[destinationColumnIndex];

            const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);

            if (!taskToMove) return prev;

            const newSourceColumn = {
                ...sourceColumn,
                tasks: sourceColumn.tasks.filter((task) => task.id !== taskId),
            };

            const newDestinationColumn = {
                ...destinationColumn,
                tasks: [...destinationColumn.tasks, { ...taskToMove, status: destinationColumn.title }],
            };

            columns[sourceColumnIndex] = newSourceColumn;
            columns[destinationColumnIndex] = newDestinationColumn;

            return columns;
        });
    };
};

export default useMoveTask;
