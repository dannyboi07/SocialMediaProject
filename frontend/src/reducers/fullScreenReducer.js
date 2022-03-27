export default function fullScreenReducer(state = null, action) {
    // console.log(action.data);
    switch(action.type) {
        case "SET_FS_TRUE":
            return state = { ...action.data };

        case "SET_FS_CREATE_TRUE":
            return state = { ...action.data };

        case "SET_FS_FALSE":
            return state = null;
        default:
            return state;
    };
};

function setFSData(post) {
    return {
        type: "SET_FS_TRUE",
        data: { 
            postData: {
            ...post
            },
            post: true
        }
    };
};

function setCrData() {
    return {
        type: "SET_FS_CREATE_TRUE",
        data: {
            creation: true
        }
    }
}

function removeFSData() {
    return {
        type: "SET_FS_FALSE",
        data: null
    };
};

export { setFSData, setCrData, removeFSData };