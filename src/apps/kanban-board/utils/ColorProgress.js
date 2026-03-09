const colorProgress = (progress) => {
    const value = Number(progress);
    if (value >= 75) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-red-500";
};
export default colorProgress;