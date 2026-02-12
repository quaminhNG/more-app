const validateForm = ({ taskData, setFormError }) => {
    const newErrors = {};
    if (!taskData.title.trim()) {
        newErrors.title = "Title is required";
    }

    if (!taskData.description.trim()) {
        newErrors.description = "Description is required";
    }
    if (!taskData.startDate) {
        newErrors.startDate = "Start date is required";
    }
    if (!taskData.endDate) {
        newErrors.endDate = "End date is required";
    }
    if (taskData.startDate && taskData.endDate) {
        if (new Date(taskData.endDate) < new Date(taskData.startDate)) {
            newErrors.endDate = "End date must be after start date";
        }
    }
    if (taskData.checklistItems.length === 0) {
        newErrors.checklistItems = "At least one checklist item is required";
    } else if (
        taskData.checklistItems.some(item => !item.text.trim())
    ) {
        newErrors.checklistItems = "Checklist items cannot be empty";
    }
    if (taskData.assignees.length === 0) {
        newErrors.assignees = "At least one assignee is required";
    }
    setFormError(newErrors);

    return Object.keys(newErrors).length === 0;
};
export default validateForm;