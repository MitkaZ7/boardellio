import axios from 'axios';
const instance = axios.create({
    // baseURL: 'https://firestore.googleapis.com/v1/projects/dashboard-app-2ad06/databases/(default)/documents',
    baseURL: 'https://dashboard-app-2ad06-default-rtdb.europe-west1.firebasedatabase.app/',
    // headers: {
    //     Authorization: 
    // }
})
class Api {
    createTask(data) {
        console.log(JSON.stringify(data))
        return instance.post('/tasks.json' , data)

    }
    updateTask(taskId,data) {
       return instance.put(`/classes/Task/${taskId}`, data)
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
                // console.log(data)
                // const tasksArray = [];
                // for (const taskId in res.data) {
                //     tasksArray.push(res.data[taskId]);
                // }
                // return tasksArray;
                return data
            });
    }
    getProjects() {
        return instance.get('/projects.json')
            .then(res => {
                const { data } = res;
                console.log(data)
                return data
            })
    }
   

    createProject(data) {
        return instance.post('/projects.json', data);
    }

    // createProject(data) {
    //     return instance.post('/classes/Project', JSON.stringify(data));
    // }
    // getProjectById(projectId) {
    //     return instance.get(`/classes/Project/${projectId}`)
    //         .then((res) => res.data);
    // }
   

}

const api = new Api(instance);
export default api;