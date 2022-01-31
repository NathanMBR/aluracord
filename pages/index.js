import appConfig from "../configs.json"
import { Box, Button, Text, TextField, Image } from "@skynexui/components"
import { useState } from "react";
import { useRouter } from "next/router";

function Title(props) {
	const Tag = props.tag || 'h1';
	return (
	  <>
		<Tag>{props.children}</Tag>
		<style jsx>{`
			  ${Tag} {
				  color: ${appConfig.theme.colors.neutrals['000']};
				  font-size: 24px;
				  font-weight: 600;
			  }
			  `}</style>
	  </>
	);
  }

export default () => {
	const defaultUser = "NathanMBR";
	const [user, setUser] = useState(defaultUser);
	const router = useRouter();
  
	return (
	  <>
		<Box
		  styleSheet={{
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			backgroundColor: appConfig.theme.colors.primary[500],
			backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
			backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
		  }}
		>
		  <Box
			styleSheet={{
			  display: 'flex',
			  alignItems: 'center',
			  justifyContent: 'space-between',
			  flexDirection: {
				xs: 'column',
				sm: 'row',
			  },
			  width: '100%', maxWidth: '700px',
			  borderRadius: '5px', padding: '32px', margin: '16px',
			  boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
			  backgroundColor: appConfig.theme.colors.neutrals[700],
			}}
		  >
			{/* Formulário */}
			<Box
			  as="form"
			  styleSheet={{
				display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
				width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
			  }}
			  onSubmit={event => {
				event.preventDefault()
				router.push(`/chat?user=${user}`)
			  }}
			>
			  <Title tag="h2">Welcome!</Title>
			  <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
				{appConfig.name}
			  </Text>
  
			  <TextField
				fullWidth
				textFieldColors={{
				  neutral: {
					textColor: appConfig.theme.colors.neutrals[200],
					mainColor: appConfig.theme.colors.neutrals[900],
					mainColorHighlight: appConfig.theme.colors.primary[500],
					backgroundColor: appConfig.theme.colors.neutrals[800],
				  },
				}}
				placeholder={defaultUser}
				onChange={
					event =>
						setUser(event.target.value || defaultUser)
				}
			  />
			  <Button
				type='submit'
				label='Enter'
				fullWidth
				buttonColors={{
				  contrastColor: appConfig.theme.colors.neutrals["000"],
				  mainColor: appConfig.theme.colors.primary[500],
				  mainColorLight: appConfig.theme.colors.primary[400],
				  mainColorStrong: appConfig.theme.colors.primary[600],
				}}
			  />
			</Box>
			{/* Formulário */}
  
			{/* Photo Area */}
			<Box
			  styleSheet={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				maxWidth: '200px',
				padding: '16px',
				backgroundColor: appConfig.theme.colors.neutrals[800],
				border: '1px solid',
				borderColor: appConfig.theme.colors.neutrals[999],
				borderRadius: '10px',
				flex: 1,
				minHeight: '240px',
			  }}
			>
			  <Image
				styleSheet={{
				  borderRadius: '50%',
				  marginBottom: '16px',
				}}
				src={`https://github.com/${user}.png`}
			  />
			  <Text
				variant="body4"
				styleSheet={{
				  color: appConfig.theme.colors.neutrals[200],
				  backgroundColor: appConfig.theme.colors.neutrals[900],
				  padding: '3px 10px',
				  borderRadius: '1000px'
				}}
			  >
				{user}
			  </Text>
			</Box>
			{/* Photo Area */}
		  </Box>
		</Box>
	  </>
	);
  }