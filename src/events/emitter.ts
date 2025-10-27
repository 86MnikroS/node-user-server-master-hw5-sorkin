import {EventEmitter} from "node:events";


export const emitter = new EventEmitter();

emitter.on('user_added', () => {
    console.log('User was successfully added')
})
emitter.on('user_removed', () => {
    console.log('User removed')
})
emitter.on('user_updated', () => {
    console.log('User was successfully updated')
})