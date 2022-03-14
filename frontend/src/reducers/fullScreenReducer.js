export default function fullScreenReducer(state = null, action) {
    switch(action.type) {
        case "SET_FS_TRUE":
            return state = { ...action.data }
        case "SET_FS_FALSE":
            return state = null;
        default:
            return state;
    };
};

function setFSData(post) {
    return {
        type: "SET_FS_TRUE",
        data: post
    };
};

function removeFSData() {
    return {
        type: "SET_FS_FALSE",
        data: null
    };
};

export { setFSData, removeFSData };