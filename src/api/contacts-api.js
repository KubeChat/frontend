import Axios from 'axios';

const contactsApiEndpoint = `http://${window.location.hostname}:${window.location.port}/api/contacts`;

export async function getContacts() {
    try {
        const response = await Axios.get(`${contactsApiEndpoint}/contacts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
        return response.data;
    } catch(e) {
        const url = "https://lh3.googleusercontent.com/a-/AOh14Gg5ieZarUb1JzKFKlWNoTRURVfPLL4KpFRVbbQWhw";
        return [{name: "Smsm", imageUrl: url}, {name: "Nahla El-mahdy", imageUrl: url}, {name: "Aya Radwan", imageUrl: url}];
    }
}

export async function addContact(contact) {
    try {
        await Axios.post(`${contactsApiEndpoint}/contacts`, JSON.stringify(contact), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        });
    } catch(e) {
        return true;
    }
}