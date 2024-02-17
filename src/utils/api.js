import axios from 'axios';
const instance = axios.create({

    baseURL: 'https://dashboard-app-2ad06-default-rtdb.europe-west1.firebasedatabase.app',
    // headers: {
    //     Authorization: 
    // }
})
class Api {
    createTask(data) {
        console.log(JSON.stringify(data))
        return instance.post('/tasks.json' , data)
    }
    getTaskById(taskId) {
        return instance
            .get(`/tasks/${taskId}.json`)
            .then((res) => {
                const task = res.data;
                return task;
            });
    }

    updateTask(taskId, data) {
        // console.log(data);
        return instance
            .patch(`/tasks/${taskId}.json`, data)  // Передаем данные в теле запроса
            .then((res) => {
                const task = res.data;
                return task;
            })
            .catch((error) => {
                console.error('Error updating task:', error);
                throw error;  
            });
    }

    deleteTask(taskId) {
         return instance.delete(`/classes/Task/${taskId}`)
    }
    getProjectTasks(projectId) {
        return instance
            .get('/tasks.json', {
            params: {
                orderBy: '"projectId"',
                equalTo: `"${projectId}"`
            }
            })
            .then((res) => {
                const {data} = res;
                return data
            });
    }
    getProjects() {
        return instance.get('/projects.json')
            .then(res => {
                const { data } = res;
                return data
            })
    }
    createProject(data) {
        return instance.post('/projects.json', data);
    }
    // getProjectById(projectId) {
    //     return instance.get('/projects.json', {
    //         params: {
    //             orderBy: '"projectId"',
    //             equalTo: `"${projectId}"`
    //         }
    //     })
    //         .then((res) => {
    //             const { data } = res;
    //             return data
    //         });
    // }

}

const api = new Api(instance);
export default api;