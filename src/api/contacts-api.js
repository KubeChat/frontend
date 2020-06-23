import Axios from 'axios';

const apiEndpoint = `https://${window.location.hostname}:${window.location.port}/api/v0`;

export async function getContacts() {
    try {
        const response = await Axios.get(`${apiEndpoint}/contacts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
        return response.data;
    } catch(e) {
        return [];
    }
}

export async function addContact(contact) {
    try {
        await Axios.post(`${apiEndpoint}/contacts`, JSON.stringify(contact), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
    } catch(e) {
        return true;
    }
}

export async function updatePicture() {
    try {
        await Axios.put(`${apiEndpoint}/pictures`, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
    } catch(e) {
        return true;
    }
}