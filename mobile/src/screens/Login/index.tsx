import { AxiosError } from 'axios';
import * as React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { api } from '#services/api';
import { loginSuccess } from '#store/slices/auth';

export const LoginScreen = React.memo(({ navigation }: any) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const dispatch = useDispatch();

	const handleLogin = React.useCallback(async () => {
		try {
			const res = await api.post('/auth/login', { email, password });
			dispatch(loginSuccess(res.data.token));
		} catch (err) {
			console.error(err);
		}
	}, [email, password]);

	const handleGoToRegister = React.useCallback(() => {
		navigation.navigate('Register');
	}, []);

	return (
		<View style={{ padding: 16 }}>
			<TextInput placeholder='Email' value={email} onChangeText={setEmail} />
			<TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
			<Button title='Login' onPress={handleLogin} />
			<Text style={{ marginTop: 16 }} onPress={handleGoToRegister}>
				Don't have an account? Register
			</Text>
		</View>
	);
});
