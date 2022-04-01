import axios from "axios";
const baseUrl = "http://localhost:3500/api/user/notifs";

async function getNotifs(token) {
    const response = await axios.get(baseUrl, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
};

async function getNotifsCount(token) {
    const response = await axios.get(`${baseUrl}count`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
};

async function removeNotif(notifId, token) {
    await axios.delete(`http://localhost:3500/api/user/notif/${notifId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export { getNotifs, getNotifsCount, removeNotif };