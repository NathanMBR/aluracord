const Title = props => (
	<>
		<h1>
			{props.children}
		</h1>
		<style jsx>{`
			h1 {
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

const log = msg => console.log(msg);

export default () => (
	<div>
		<Title>Hello, world! Welcome to React.js + Next.js!</Title>
		<Title>This is a Title.</Title>
		<h1>This isn't a Title (at least, not a Title component)</h1>
		<button onClick={() => log(document.querySelector("button"))}>Click me</button>
	</div>
);