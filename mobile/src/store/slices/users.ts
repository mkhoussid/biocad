import { createSlice } from '@reduxjs/toolkit';

interface User {
	id: number;
	email: string;
}

interface UsersState {
	users: User[];
}

const initialState: UsersState = {
	users: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers(state, action) {
			state.users = action.payload;
		},
	},
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
