import * as React from "react";
import { useNavigate } from "react-router-dom";
import generateRandomID from "../../utils/generateRandomID";

type ButtonProps = {
	className?: string;
	id?: string;
	text?: string;
	children?: React.ReactNode;
	to?: string;
	replace?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	type?: "button" | "submit";
	variant?: "primary" | "secondary" | "tertiary";
	style?: React.CSSProperties;
	width?: string;
	height?: string;
}

const Button: React.FC<ButtonProps> = ({
	className = '',
	id = generateRandomID(),
	text = '',
	children=null,
	to,
	replace = false,
	onClick = (e) => { },
	type = 'button',
	variant = 'primary',
	width = 'auto',
	height='48px',
	style = {}
}) => {

	const navigate = useNavigate();

	return (
		<button type={type} className={`button ${className} ${variant}`} id={id} style={{ ...style, width, height }} onClick={(e) => {
			if (to) {
				navigate(to, { replace });
			}
			onClick(e);
		}}>
			{text || children}
		</button>
	);
}

export default Button;