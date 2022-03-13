import { getUser } from "../services/userService";

export default function usersReducer(state = null, action) {

    switch (action.type) {
        case "GET_USER":
            return state = { ...action.data };
        default:
            return state;
    };
};

async function getUserThunk(userName) {
    return async dispatch => {
        const response = await getUser(userName);
        dispatch({
            type: "GET_USER",
            data: response
        });
    };
};

export { getUserThunk };