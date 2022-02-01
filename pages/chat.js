import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../configs.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const client = createClient(SUPABASE_URL, SUPABASE_KEY)

export default () => {
	const router = useRouter();
	const user = router.query.user || "NathanMBR"

	const [message, setMessage] = React.useState("")
	const [messagesList, setMessagesList] = React.useState([])
	React.useEffect(() => {
		client
			.from("messages")
			.select("*")
			.then(({ data }) => {
				setMessagesList(data)

				client
					.from("messages")
					.on("INSERT", payload => setMessagesList([...messagesList, payload.new]))
					.subscribe()
			})
			.catch(console.error)
	}, [])

	const generateNewMessage = newMessageText => ({
		user,
		text: newMessageText
	})

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
					<MessageList messagesList={messagesList} />
					<Box
						as="form"
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<TextField
							placeholder="Insert your message here..."
							type="textarea"
							value={message}
							onChange={({ target: { value }}) => { setMessage(value) }}
							onKeyPress={async event => {
								if (event.key === "Enter") {
									event.preventDefault()

									await client
										.from("messages")
										.insert([generateNewMessage(event.target.value)])

									const allMessagesRequest = await client
										.from("messages")
										.select("*")

									setMessagesList(allMessagesRequest.data)
									setMessage("");
								}
							}}
							styleSheet={{
								width: '100%',
								border: '0',
								resize: 'none',
								borderRadius: '5px',
								padding: '6px 8px',
								backgroundColor: appConfig.theme.colors.neutrals[800],
								marginRight: '12px',
								color: appConfig.theme.colors.neutrals[200],
							}}
						/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const Header = () => {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

const MessageList = props => {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messagesList?.map(message =>
				<Text
					key={message.id}
					tag="li"
					styleSheet={{
						borderRadius: '5px',
						padding: '6px',
						marginBottom: '12px',
						hover: {
							backgroundColor: appConfig.theme.colors.neutrals[700],
						}
					}}
				>
					<Box
						styleSheet={{
							marginBottom: '8px',
						}}
					>
						<Image
							styleSheet={{
								width: '20px',
								height: '20px',
								borderRadius: '50%',
								display: 'inline-block',
								marginRight: '8px',
							}}
							src={`https://github.com/${message.user}.png`}
						/>
						<Text tag="strong">
							{message.user}
						</Text>
						<Text
							styleSheet={{
								fontSize: '10px',
								marginLeft: '8px',
								color: appConfig.theme.colors.neutrals[300],
							}}
							tag="span"
						>
							{(new Date().toLocaleDateString())}
						</Text>
					</Box>
					{message.text}
				</Text>
			)}
        </Box>
    )
}