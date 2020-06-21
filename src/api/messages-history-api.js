import Axios from 'axios';

const apiEndpoint = `http://${window.location.hostname}:${window.location.port}/api/v0`;

export async function getChannelMessages(contactEmail) {
    try {
        const response = await Axios.get(`${apiEndpoint}/messages-history/${contactEmail}`, {
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
        await Axios.post(`${apiEndpoint}/messages-history`, JSON.stringify(message), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
    } catch(e) {
        return true;
    }
}