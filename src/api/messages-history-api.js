import Axios from 'axios';

const messagesHistoryApiEndpoint = `http://${window.location.hostname}:${window.location.port}/api/messages-history`;

export async function getChannelMessages(contactEmail) {
    try {
        const response = await Axios.get(`${messagesHistoryApiEndpoint}/messages/${contactEmail}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
        return response.data;
    } catch(e) {
        return null;
    }
}

export async function addMessage(message) {
    try {
        await Axios.post(`${messagesHistoryApiEndpoint}/messages`, JSON.stringify(message), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
    } catch(e) {
        return true;
    }
}