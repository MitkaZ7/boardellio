import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/dashboard-app-2ad06/databases/(default)/documents',
});

class Api {
    createTask(data) {
        return instance.post('/tasks', { fields: data });
    }

    getTaskById(taskId) {
        return instance.get(`/tasks/${taskId}`).then((res) => {
            const task = res.data.fields;
            return { id: res.data.name.split('/').pop(), ...task };
        });
    }

    updateTask(taskId, data) {
        return instance.patch(`/tasks/${taskId}`, { fields: data });
    }

    deleteTask(taskId) {
        return instance.delete(`/tasks/${taskId}`);
    }

    logicDeleteTask(taskId) {
        return instance.patch(`/tasks/${taskId}`, { fields: { deleted: true } });
    }

    getProjectTasks(projectId) {
        return instance
            .get('/tasks', {
                params: {
                    orderBy: 'projectId',
                    equalTo: projectId,
                },
            })
            .then((res) => {
                const data = res.data.documents.map((doc) => ({
                    id: doc.name.split('/').pop(),
                    ...doc.fields,
                }));
                return data;
            });
    }

    getProjects() {
        return instance.get('/projects').then((res) => {
            const data = res.data.documents.map((doc) => ({
                id: doc.name.split('/').pop(),
                ...doc.fields,
            }));
            return data;
        });
    }

    createProject(data) {
        return instance.post('/projects', { fields: data });
    }

    getOneProjectById(id) {
        return instance.get(`/projects/${id}`).then((res) => {
            const project = res.data.fields;
            return { id: res.data.name.split('/').pop(), ...project };
        });
    }
}

const api = new Api(instance);
export default api;



// import axios from 'axios';
// const instance = axios.create({
//     // baseURL: 'https://firestore.googleapis.com/v1/projects/5gQDAEARpTvSRsch9nN5/databases/(default)/documents',
//     baseURL: 'https://dashboard-app-2ad06-default-rtdb.europe-west1.firebasedatabase.app',
//     // headers: {
//     //     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
//     // }
// })
// class Api {
//     createTask(data) {
//         console.log(JSON.stringify(data))
//         return instance.post('/tasks.json' , data)
//     }
//     getTaskById(taskId) {
//         return instance
//             .get(`/tasks/${taskId}.json`)
//             .then((res) => {
//                 const task = res.data;
//                 return task;
//             });
//     }

//     updateTask(taskId, data) {
//         // console.log(data);
//         return instance
//             .patch(`/tasks/${taskId}.json`, data)  // Передаем данные в теле запроса
//             .then((res) => {
//                 const task = res.data;
//                 return task;
//             })
//             .catch((error) => {
//                 console.error('Error updating task:', error);
//                 throw error;  
//             });
//     }

//     deleteTask(taskId) {
//         return instance
//             .delete(`/tasks/${taskId}.json`)
//             .then((res) => {
//                 console.log(`Task with ID ${taskId} deleted successfully.`);
//                 return res.data;
//             })
//             .catch((error) => {
//                 console.error(`Error deleting task with ID ${taskId}:`, error);
//                 throw error;
//             });
//     }
//     logicDeleteTask(taskId) {
//         return instance
//             .patch(`/tasks/${taskId}.json`, { deleted: true })
//             .then((res) => {
//                 const task = res.data;
//                 console.log(task);
//                 return task;
//             })
//     }
//     getProjectTasks(projectId, deleted = false) {
//         return instance
//             .get('/tasks.json', {
//             params: {
//                 orderBy: '"projectId"',
//                 equalTo: `"${projectId}"`,
         
//             }
//             })
//             .then((res) => {
               
//                 const {data} = res;
//                 console.log(data)
//                 return data
//             });
//     }
//     // getProjectTasks(projectId) {
//     //     return instance
//     //         .get(`/tasks?orderBy=projectId&equalTo=${projectId}`)
//     //         .then((res) => {
//     //             const data = res.data.documents.map(doc => {
//     //                 return {
//     //                     id: doc.name.split('/').pop(),
//     //                     ...doc.fields
//     //                 };
//     //             });
//     //             return data;
//     //         });
//     // }
//     getProjects() {
//         return instance.get('/projects.json')
//             .then(res => {
//                 const { data } = res;
//                 return data
//             })
//     }
//     createProject(data) {
//         return instance.post('/projects.json', data);
//     }
//     getOneProjectById(id) {
//         return instance.get(`/projects/${id}.json`)
//             .then((res) => {
//                 const project = res.data;
//                 console.log(project);
//                 return project;
//             });
//     }
//     // getProjectById(projectId) {
//     //     return instance.get('/projects.json', {
//     //         params: {
//     //             orderBy: '"projectId"',
//     //             equalTo: `"${projectId}"`
//     //         }
//     //     })
//     //         .then((res) => {
//     //             const { data } = res;
//     //             return data
//     //         });
//     // }

// }

// const api = new Api(instance);
// export default api;