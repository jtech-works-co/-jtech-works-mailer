const formatDate = (timestamp: number) => {
	const dateObj = new Date(timestamp);
	const today = new Date();

	const isSameYear = dateObj.getFullYear() === today.getFullYear();

	// Format options
	const options: Intl.DateTimeFormatOptions = isSameYear
		? { month: "short", day: "numeric" }
		: { year: "numeric", month: "short", day: "numeric" };

	return dateObj.toLocaleDateString(undefined, options);
};

export default formatDate;