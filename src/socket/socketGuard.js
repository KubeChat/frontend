import Vue from "vue";
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import { apiEndpoint } from '../config'

export const socketGuard = (from, to, next) => {
    if (!Vue.prototype.$socket) {
        Vue.use(new VueSocketIO({
            debug: true,
            connection: socketio(apiEndpoint.replace('/api/v0', ''), {
                path: '/api/v0/messages',
                transportOptions: {
                  polling: {
                    extraHeaders: {
                      'authorization': `Bearer ${localStorage.jwt}`
                    }
                  }
                }
            })
        }))
    }
    next()
}