import appConfig from "../configs.json"

const GlobalStyle = () => {
	return (
		<style global jsx>{`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				list-style: none;
			}

			body {
				font-family: 'Open Sans', sans-serif;
			}

			html, body, #__next {
				min-height: 100vh;
				display: flex;
				flex: 1;
			}

			#__next {
				flex: 1;
			}

			#__next > * {
				flex: 1;
			}
		`}</style>
	);
}

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
					color: ${appConfig.theme.colors.neutrals["000"]};
					border-radius: 5px;
					box-shadow: 2px 2px 5px #333;
				}
			`}</style>
		</>
	)
}

export default () => (
	<div>
		<GlobalStyle />
		<Title Tag="h1">Hello, world! Welcome to React.js + Next.js!</Title>
		<Title Tag="h2">This is a Title.</Title>
		<h2>This isn't a Title (at least, not a Title component)</h2>
	</div>
);