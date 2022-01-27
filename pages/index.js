const Title = props => {
	/* Functionalities */
	const Tag = props.Tag;

	return (
		<>
			{/* Elements */}
			<Tag>
				{props.children}
			</Tag>

			{/* Style */}
			<style jsx>{`
				${Tag} {
					display: block;
					padding: 5px;
					text-align: center;
					background-color: #222;
					color: #fff;
					border-radius: 5px;
					box-shadow: 2px 2px 5px #333;
				}
			`}</style>
		</>
	)
}

const log = msg => console.log(msg);

export default () => (
	<div>
		<Title Tag="h1">Hello, world! Welcome to React.js + Next.js!</Title>
		<Title Tag="h2">This is a Title.</Title>
		<h2>This isn't a Title (at least, not a Title component)</h2>
		<button onClick={() => log(document.querySelector("button"))}>Click me</button>
	</div>
);