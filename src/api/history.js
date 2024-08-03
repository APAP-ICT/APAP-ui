import {HISTORY_API} from "./request.js";

export default {
    fetchDetectResults() {
        return HISTORY_API.get('/api/infos');
    },
    registerPushToken(token) {
        return HISTORY_API.post('/api/notifications/token', {
            token: token
        })
    }
}
