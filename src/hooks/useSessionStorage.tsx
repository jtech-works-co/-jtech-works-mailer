import { useState } from 'react';

function useSessionStorage<T>(key: string, initialValue: T) {
	const getStoredValue = (): T => {
		const item = sessionStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	};

	const [value, setValue] = useState<T>(getStoredValue);

	const setStoredValue = (newValue: T) => {
		setValue(newValue);
		sessionStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setStoredValue] as const;
}

export default useSessionStorage;