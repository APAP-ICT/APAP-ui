import {HISTORY_API} from "./request.js";

export default {
    fetchDetectResults(req) {
        const params = new URLSearchParams();

        if (req.cameraName) {
            params.append("cameraName", req.cameraName);
        }

        if (req.startDate && req.endDate) {
            params.append("startDate", req.startDate);
            params.append("endDate", req.endDate);
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
