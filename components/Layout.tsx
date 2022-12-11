interface PageWrapperProps {
	className?: string;
	children?: React.ReactNode;
}

const Layout = (props: PageWrapperProps) => {
	const { className, children } = props;

	return (
		<div className={`w-full h-screen overflow-hidden ${className}`}>
			{children}
		</div>
	);
};

export default Layout;
