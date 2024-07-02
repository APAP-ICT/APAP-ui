import {HISTORY_API} from "./request.js";

export default {
    fetchDetectResults(){
        return HISTORY_API.get('infos');
    }
}
