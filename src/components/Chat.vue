<template>
    <div style="height: 100%;">
        <div v-if="contactEmail === null" class="select-contact">
            <h3>Choose a contact from the left!</h3>
        </div>
        <div v-else class="chat-container">
            <div class="bottom-container">
                <div class="attachment-container">
                    <input class="file-input" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                    <label for="file">
                        <font-awesome-icon class="pointer" size="2x" icon="paperclip" />
                    </label>
                    <div v-if="file" class="attached"></div>
                </div>
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
                        <div v-if="message.text">
                            {{message.text}}
                        </div>
                        <div class="image-message" v-if="message.attachmentUrl">
                            <img :src="message.attachmentUrl" width="300" height="300"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getChannelMessages, addMessage, getSignedUrl, uploadAttachment, getAttachmentUrl } from '../api/messages-history-api'

export default {
    name: "Chat",
    props: ['contactEmail'],
    sockets: {
        connect: function() {
            // Fired when the socket connects.
            this.connected = true
        },
        message: function(data) {
            this.messagesList.push({ mine: false, text: data.text, attachmentUrl: data.attachmentUrl })
            this.scrollToBottom();
        }
    },
    data: function() {
        return {
            connected: false,
            text: '',
            messagesList: [],
            file: null
        }
    },
    methods: {
        sendMessage: async function() {
            if (!this.text.length && !this.file) {
                return;
            }
            let fileName = null;
            let attachmentUrl = null;
            if (this.file) {
                fileName = `${this.$auth.user.email}_${new Date().getTime()}`;
                const signedUrl = await getSignedUrl(fileName)
                await uploadAttachment(signedUrl, this.file);
                attachmentUrl = await getAttachmentUrl(fileName);
            }
            this.$socket.emit('message', { to: this.contactEmail, text: this.text, attachmentUrl });
            this.messagesList.push({ mine: true, text: this.text, attachmentUrl })
            this.scrollToBottom()
            await addMessage({ to: this.contactEmail, text: this.text, fileName })
            this.text = '';
            this.file = null
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const scrollable = this.$el.querySelector('#scrollable')
                const scrollHeight = scrollable.scrollHeight;
                scrollable.scrollTop = scrollHeight;
            })
        },
        handleFileUpload(){
            this.$nextTick(() => {
                this.file = this.$refs.file.files[0];
                this.$refs.file.value = ''
            })
        },
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

    .attachment-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0 0 5%;
        padding-right: 1rem;
    }

    .attached {
        background-color: #3371E3;
        width: 1rem;
        height: 0.2rem;
        border-radius: 3px;
    }

    .typing-container {
        flex: 0 0 70%;
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
        display: flex;
        flex-direction: column;
    }

    .image-message {
        padding-top: 0.5rem;
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

    .file-input {
        display: none;
    }

    .pointer {
        cursor: pointer;
    }
</style>