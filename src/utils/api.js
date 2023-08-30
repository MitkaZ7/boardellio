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
                const tasksArray = [];
                for (const taskId in res.data) {
                    tasksArray.push(res.data[taskId]);
                }
                console.log(tasksArray);
                return tasksArray;
            });
    }
 
    // getProjectTasks(projectId) {
    //     const queryParams = {
    //         where: JSON.stringify({
    //             project: {
    //                 __type: 'Pointer',
    //                 className: 'Project',
    //                 objectId: projectId,
    //             },
    //         }),
    //         include: 'project',
    //     };
    //     return instance
    //         .get('/tasks.json', { params: queryParams })
    //         .then((res) => {
    //             const { results } = res.data;
    //             // console.log('Received tasks:', results);
    //             return results;
    //         });
    // }
    getProjects() {
        return instance.get('/projects.json')
            .then(res => {
                const { data } = res;
                return data
            })
    }
    // getProjects() {
    //     return instance.get('/projects')
    //         .then(res => {
    //             const { documents } = res.data;
    //             console.log(documents)
    //             return documents
    //         })
    // }

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