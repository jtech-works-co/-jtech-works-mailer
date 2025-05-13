import * as React from "react";
import { useEffect, useRef, useState } from "react";

type SearchQueryProps = {
	onInput?: (value: string) => void;
};

const SearchQuery: React.FC<SearchQueryProps> = ({ onInput }) => {
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Clear previous timer
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		// Set a new debounce timer
		debounceTimeout.current = setTimeout(() => {
			onInput?.(value);
		}, 1000); // 1000ms = 1 second

		// Cleanup on unmount
		return () => {
			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}
		};
	}, [value, onInput]);

	return (
		<div className="query">
			<i className="fas fa-magnifying-glass"></i>
			<input
				ref={inputRef}
				placeholder="Search Project Name"
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button className={`${value && 'active'}`} onClick={() => {
				setValue("");
				inputRef.current?.focus();
			}}>
				<i className="fas fa-times"></i>
			</button>
		</div>
	);
};

export default SearchQuery;
