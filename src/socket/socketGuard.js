import Vue from "vue";
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const socketGuard = (from, to, next) => {
    if (!Vue.prototype.$socket) {
        Vue.use(new VueSocketIO({
            debug: true,
            connection: socketio(`http://${window.location.hostname}:${window.location.port}/api/v0/messages`, {
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