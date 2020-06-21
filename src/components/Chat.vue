<template>
    <div style="height: 100%;">
        <div v-if="contactEmail === null" class="select-contact">
            <h3>Choose a contact from the left!</h3>
        </div>
        <div v-else class="chat-container">
            <div class="bottom-container">
                <div class="typing-container">
                    <input
                        v-model="text"
                        placeholder="send a message" 
                        class="typing"
                        @keyup.enter="sendMessage()"
                    />
                </div>
                <button class="btn btn-primary btn-margin send-button" @click.prevent="sendMessage()">
                    Send
                </button>
            </div>
            <div id="scrollable" class="messages-container">
                <div 
                    class="message-container" 
                    v-bind:class="{'message-container-right': message.mine, 'message-container-left': !message.mine}"
                    v-for="(message, index) in messagesList" 
                    :key="index">
                    <div
                        class="message" 
                        v-bind:class="{'message-right': message.mine, 'message-left': !message.mine}">
                        {{message.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getChannelMessages, addMessage } from '../api/messages-history-api'

export default {
    name: "Chat",
    props: ['contactEmail'],
    sockets: {
        connect: function() {
            // Fired when the socket connects.
            this.connected = true
        },
        message: function(data) {
            this.messagesList.push({ mine: false, text: data.text })
            this.scrollToBottom();
        }
    },
    data: function() {
        return {
            connected: false,
            text: '',
            messagesList: []
        }
    },
    methods: {
        sendMessage: async function() {
            if (!this.text) {
                return;
            }
            this.$socket.emit('message', { to: this.contactEmail, text: this.text });
            this.messagesList.push({ mine: true, text: this.text })
            this.scrollToBottom()
            await addMessage({ to: this.contactEmail, text: this.text })
            this.text = '';
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const scrollable = this.$el.querySelector('#scrollable')
                const scrollHeight = scrollable.scrollHeight;
                scrollable.scrollTop = scrollHeight;
            })
        }
    },
    watch: {
        async contactEmail(val) {
            if (!val) return
            this.messagesList = await getChannelMessages(val)
            this.scrollToBottom();
        }
    }
}
</script>

<style lang="scss" scoped>
    .select-contact {
        display:flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .chat-container {
        display: flex;
        flex-direction: column-reverse;
        height: 100%;
    }

    .bottom-container {
        display: flex;
        padding: 1rem;
    }

    .typing-container {
        flex: 0 0 75%;
        padding-right: 1rem;
    }

    .typing {
        padding: 0 1rem;
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }

    *:focus {
        outline: none;
    }

    .send-button {
        flex: 0 0 25%;
        width: 100%;
        background-color: #3371E3;
        border-radius: 10px;
    }

    .messages-container {
        width: 100%;
        height: 517px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        scroll-behavior: smooth;
    }

    .message-container {
        width: 100%;
        margin-bottom: 1rem;
        padding: 1rem;
        display: flex;
    }

    .message-container-right {
        justify-content: flex-end;
    }

    .message-container-r-left {
        justify-content: flex-start;
    }

    .message {
        padding: 0.5rem;
        border-radius: 10px;
        max-width: 60%;
    }

    .message-right {
        float: right;
        background-color: #3371E3;
        color: white;
    }

    .message-left {
        float: left;
        background-color: lightgrey;
        color: black;
    }
</style>