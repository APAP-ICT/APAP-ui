import {HISTORY_API} from "./request.js";

export default {
    fetchDetectResults() {
        return HISTORY_API.get('/api/infos');
    },
    registerPushToken(token, email) {
        return HISTORY_API.post('/api/tokens', {
            token: token,
            email: email
        })
    }
}
