import axios from 'axios';
const instance = axios.create({
    baseURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}`,
});

class storageApi {
    uploadFile(file, taskId) {
        const formData = new FormData();
        formData.append('file', file);
        return instance.post(`/tasks/${taskId}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteFile(fileId) {
        return instance.delete(`/files/${fileId}`);
    }
}