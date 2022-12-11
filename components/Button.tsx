import Link from "next/link";

interface ButtonProps {
	value: string;
	className?: string;
	href?: string;
	onClick?: () => void;
}

const Button = (props: ButtonProps) => {
	const { className, value, href, onClick = () => {} } = props;

	const ButtonIntractable = () => {
		return (
			<button
				className={`cursor-pointer px-8 py-2 bg-blue-600 text-white rounded-md select-none outline-none border-none ${className}`}
				onClick={onClick}
			>
				{value}
			</button>
		);
	};

	return (
		<>
			{href ? (
				<Link href={href}>
					<ButtonIntractable />
				</Link>
			) : (
				<ButtonIntractable />
			)}
		</>
	);
};

export default Button;
