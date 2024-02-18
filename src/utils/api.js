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
        return instance
            .delete(`/tasks/${taskId}.json`)
            .then((res) => {
                console.log(`Task with ID ${taskId} deleted successfully.`);
                return res.data;
            })
            .catch((error) => {
                console.error(`Error deleting task with ID ${taskId}:`, error);
                throw error;
            });
    }
    logicDeleteTask(taskId) {
        return instance
            .patch(`/tasks/${taskId}.json`, { deleted: true }) // Устанавливаем значение поля "deleted" в true
            .then((res) => {
                const task = res.data;
                console.log(task);
                return task;
            })
    }
    getProjectTasks(projectId) {
        return instance
            .get('/tasks.json', {
            params: {
                orderBy: '"projectId"',
                equalTo: `"${projectId}"`,
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
    getOneProjectById(id) {
        return instance.get(`/projects/${id}.json`)
            .then((res) => {
                const project = res.data;
                console.log(project);
                return project;
            });
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