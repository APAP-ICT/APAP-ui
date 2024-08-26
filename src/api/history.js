import {HISTORY_API} from "./request.js";

export default {
    fetchDetectResults(req) {
        const params = new URLSearchParams();

        if (req.cameraName) {
            params.append("cameraName", req.cameraName);
        }

        if (req.date) {
            params.append("startDate", req.date);
            params.append("endDate", req.date);
        }

        return HISTORY_API.get(`/api/infos?${params.toString()}`);
    },
    fetchDetectResult(incidentId) {
        return HISTORY_API.get(`/api/infos/${incidentId}`);
    },
    registerPushToken(token, email) {
        return HISTORY_API.post('/api/tokens', {
            token: token,
            email: email
        })
    }
}
