import {AI_API} from "./request.js";

export default {
    detectImage(file) {
        const formData = new FormData()
        formData.append('file', file)
        return AI_API.post('detect-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    async fetchLocations() {
        const {items} = await AI_API.get('/api/publishers');
        return items;
    },
}

