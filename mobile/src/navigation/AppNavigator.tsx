import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { LoginScreen } from '#screens/Login';
import { RegisterScreen } from '#screens/Register';
import { UserListScreen } from '#screens/UserList';
import { RootState } from '#store/index';

const Stack = createStackNavigator();

export const AppNavigator = React.memo(() => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	return (
		<Stack.Navigator>
			{!isAuthenticated ? (
				<>
					<Stack.Screen name='Login' component={LoginScreen} />
					<Stack.Screen name='Register' component={RegisterScreen} />
				</>
			) : (
				<Stack.Screen name='Users' component={UserListScreen} />
			)}
		</Stack.Navigator>
	);
});
