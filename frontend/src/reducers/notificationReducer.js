import { getNotifs } from "../services/notifService";
import { setFailure } from "./failureReducer";

// const init = [
//     {
//         primaryKey: 2,
//         title: "Test from FE",
//         body: "Test FE text sdkjs df sdlf jsd fs dfjs jld jsd fsd",
//         icon: "http://localhost:3500/images/profile-pics/profileimg-1645003992638-711595105.jpg",
//         url: "http://localhost:3000/post/42"
//     }
// ]

export default function notificationReducer(state = null, action) {
    switch(action.type) {
        case "INIT_NOTI":

            return [ ...action.data ];
        case "ADD_NOTI":

            if (state) return [ ...action.data, ...state ];
            return [ ...action.data ];
        case "REMOVE_NOTI":
            return state.filter(notif => notif.primaryKey !== action.data);
        case "CLR_NOTI":
            
            return null;
        default:
            return state;
    };
};

function getAllNotifs(token) {
    return async dispatch => {
        try {
            const response = await getNotifs(token);
            console.log(response);
            dispatch({
                type: "INIT_NOTI",
                data: response
            })
        } catch (error) {
            console.error(error);
            dispatch(setFailure("NOTIF", getAllNotifs));
        };
    };
};

function addNotif(data) {
    return({
        type: "ADD_NOTI",
        data
    });
};

function removeNotif(notifId) {
    return({
        type: "REMOVE_NOTI",
        data: notifId
    })
};

function clearNotifs() {
    return({
        type: "CLR_NOTI",
        data: null
    });
};

export { getAllNotifs, addNotif, removeNotif, clearNotifs };