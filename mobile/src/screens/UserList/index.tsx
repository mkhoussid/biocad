import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '#services/api';
import { RootState } from '#store/index';
import { setUsers } from '#store/slices/users';

export const UserListScreen = React.memo(() => {
	const dispatch = useDispatch();
	const users = useSelector((state: RootState) => state.users.users);

	const fetchUsers = React.useCallback(async () => {
		try {
			const res = await api.get('/users');
			dispatch(setUsers(res.data));
		} catch (err) {
			console.error(err);
		}
	}, []);

	React.useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<View style={{ padding: 16 }}>
			<FlatList
				data={users}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <Text>{item.email}</Text>}
			/>
		</View>
	);
});
