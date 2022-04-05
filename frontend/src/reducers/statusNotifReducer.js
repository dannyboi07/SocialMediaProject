export default function statusNotifReducer(state = null, action) {
    switch(action.type) {
        case "SET_ERR_NOTIF":
            return { type: "ERR", message: action.data };
        case "SET_NEU_NOTIF":
            return { type: "NEU", message: action.data };
        case "CLR_STATUS_NOTIF":
            return null;
        default:
            return state;
    };
};

let timer = null;

function setStatusNotif(type, data, time) {
    if (timer) clearTimeout(timer);
    return dispatch => {
        dispatch({
            type,
            data,
        });
        setTimeout(() => {
            dispatch(clrStatusNotif());
        }, time * 1000);
    };
};

function clrStatusNotif(){
    return ({
        type: "CLR_STATUS_NOTIF",
        data: null
    });
};

export { setStatusNotif };