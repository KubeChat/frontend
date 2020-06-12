<template>
    <div class="contacts-container">
        <div class="contacts-header">
            <h4 class="white-header">Contacts</h4>
        </div>
        <div class="contacts">
            <div v-if="!loaded" class=loading> <p>Getting contacts...</p></div>
            <template v-else>
                <div v-for="(contact, idx) in contacts" class="contact" :key=idx>
                    <img
                    :src="contact.imageUrl"
                    alt="User's profile picture"
                    class="nav-user-profile rounded-circle contact-image"
                    width="50"
                    />
                    <div class="contact-name">{{contact.name}}</div>
                </div>

                <div class="add-contact">
                    <div class="text-field">
                        <span class="label">Name</span>
                        <input class="input" v-model="contactName"/>
                    </div>
                    <div class="text-field">
                        <span class="label">Email</span>
                        <input class="input" v-model="contactEmail"/>
                    </div>
                    <button class="btn btn-primary btn-margin button" @click.prevent="addContact()">
                        Add Contact
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import {getContacts, addContact} from '../api/contacts-api'

export default {
    name: "Contacts",
    data: function() {
        return {
            loaded: false,
            contacts: [],
            contactName: null,
            contactEmail: null
        }
    },
    created: async function() {
        this.contacts = await getContacts();
        this.loaded = true;
    },
    methods: {
        addContact: async function() {
            const name = this.contactName;
            const email = this.contactEmail;
            await addContact({name, email});
        }
    }
}
</script>

<style lang="scss" scoped>
    .contacts-container {
        width: 100%;
        height: 100%;
        padding-top: 1px;
        border-right: 2px solid lightgray;

    }

    .contacts-header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #3371E3;
    }

    .white-header {
        color: white !important;
    }

    .contacts {
        height: 525px;
        background-color: #F8F9FA;
    }

    .add-contact {
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    .contact {
        height: 80px;
        padding: 1rem;
        border-bottom: 2px solid lightgray;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .contact-image {
        height: 50px;
    }

    .contact-name {
        padding-left: 2rem;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading {
        display: flex;
        height: 50%;
        justify-content: center;
        align-items: center;
    }

    .text-field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
    }

    .label {
        margin-bottom: 0.5rem;
    }

    .input {
    }

    .button {
        width: 100%;
        margin-top: 1rem;
    }
</style>