import { getUser } from "../services/userService";
import { setFailure } from "./failureReducer";

export default function usersReducer(state = null, action) {

    switch (action.type) {
        case "GET_USER":
            return state = { ...action.data };
        case "CLR_USER":
            return state = null;
        default:
            return state;
    };
};

function getUserThunk(userName, token) {
    return async dispatch => {

        let response;
        try {

            response = await getUser(userName, token)
        } catch (error) {

            const tempAssign = token 
                ? { userName, token } 
                : userName ;
            dispatch(setFailure("USER_PROF", {
                func: getUserThunk,
                param: tempAssign
            }))
        };

        // Finally, if all good
        dispatch({
            type: "GET_USER",
            data: response
        });
    };
};

export { getUserThunk };