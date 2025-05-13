import * as React from "react";
import { useEffect, useRef, useState } from "react";

type SearchQueryProps = {
	onInput?: (value: string) => void;
};

const SearchQuery: React.FC<SearchQueryProps> = ({ onInput }) => {
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		onInput?.(value);
	}, [onInput, value]);

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
