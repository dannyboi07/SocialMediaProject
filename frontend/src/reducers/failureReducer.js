export default function failureReducer(state = null, action) {
    switch(action.type) {
        case "CLEAR":
            return null;
        case "CONTENT":

            return { 
                type: action.type, 
                func: action.data.func, 
                param: action.data.param 
            };
        case "USER_PROF":

            return { 
                type: action.type, 
                func: action.data.func, 
                param: action.data.param 
            };
        case "POST":

            return { 
                type: action.type, 
                // func: action.data.func, 
                // param: action.data.param 
            };
        case "NOTIF":

            return { 
                type: action.type, 
                func: action.data.func, 
                param: action.data.param 
            };
        case "ONLY_POST":

            return  {
                type: action.type,
            }
        default:
            return state;
    };
};

function setFailure(type, data){
    return {
        type,
        data
    };
};

export { setFailure };