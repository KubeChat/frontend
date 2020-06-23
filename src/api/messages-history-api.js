import Axios from 'axios';
import { apiEndpoint } from '../config'

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
        return [];
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

export async function getSignedUrl(fileName) {
    try {
        const response = await Axios.get(`${apiEndpoint}/messages-history/signed-url/${fileName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
        return response.data.url;
    } catch(e) {
        return null;
    }
}

export async function uploadAttachment(url, file) {
    try {
        await Axios.put(url, file, { headers: { 'Content-Type': file.type } });
    } catch(e) {
        return true;
    }
}

export async function getAttachmentUrl(fileName) {
    try {
        const response = await Axios.get(`${apiEndpoint}/messages-history/attachments/${fileName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
        return response.data.attachmentUrl;
    } catch(e) {
        return null;
    }
}