import * as React from "react";

type TextfieldProps<T = string> = {
	className?: string;
	width?: string;
	label?: string;
	type?: 'text' | 'email' | 'password' | 'number';
	placeholder?: string;
	name?: string;
	value?: T;
	onChange?: (value: T) => void;
	required?: boolean;
};

function Textfield<T = string>({
	className = '',
	width = '100%',
	label = 'Label',
	type = 'text',
	placeholder = '',
	name = '',
	value = '' as T,
	onChange = () => { },
	required=false,
}: TextfieldProps<T>) {

	const [initialValue, setInitialValue] = React.useState<T>(value);

	React.useEffect(() => {
		onChange(initialValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValue]);

	return (
		<div className={`textfield ${className}`} style={{ width }}>
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				value={initialValue as any}
				onChange={(e) => setInitialValue(e.target.value as T)}
				autoComplete='off'
				aria-autocomplete='none'
				required={required}
			/>
			<label>{label}</label>
		</div>
	);
}

export default Textfield;
