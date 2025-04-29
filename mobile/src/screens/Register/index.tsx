import * as React from 'react';
import { View, TextInput, Button } from 'react-native';

import { api } from '#services/api';

export const RegisterScreen = React.memo(({ navigation }: any) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleRegister = async () => {
		try {
			await api.post('/auth/register', { email, password });
			navigation.navigate('Login');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<View style={{ padding: 16 }}>
			<TextInput placeholder='Email' value={email} onChangeText={setEmail} />
			<TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
			<Button title='Register' onPress={handleRegister} />
		</View>
	);
});
