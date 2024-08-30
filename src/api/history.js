import {HISTORY_API} from "./request.js";
import {saveAs} from 'file-saver';

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
    },
    async downloadDailyReport() {
        const data = await HISTORY_API.get("/api/report", {
            responseType: 'blob'
        })

        //TODO 추후 하드코딩 수정
        const filename = '2024_08_30_daily_report.pdf'
        const pdfBlob = new Blob([data], {type: 'application/pdf'});

        saveAs(pdfBlob, filename);

    }
}
