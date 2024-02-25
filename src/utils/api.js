import axios from 'axios';
import { notDeletedProjecTasks } from './firebase'
import { formateDate } from '../utils/formateDate'
const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/dashboard-app-2ad06/databases/(default)/documents',
});

class Api {
    createTask(data) {
        const requestData = {
            fields: {
                title: { stringValue: data.title },
                author: { stringValue: data.author },
                status: { stringValue: data.status },
                description: { stringValue: data.description },
                priority: { stringValue: data.priority },
                projectId: { stringValue: data.projectId },
                isCompleted: { booleanValue: data.isCompleted },
                deleted: { booleanValue: data.deleted },
                number: { integerValue: data.number }, 
                
            }
        };

        return instance.post('/tasks', requestData)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    getTaskById(taskId) {
        return instance.get(`/tasks/${taskId}`).then((res) => {
            const task = res.data.fields;
            return {
                id: res.data.name.split('/').pop(),
                ...task,
                createTime: res.data.createTime
            };
        });
    }
    increaseTaskQty(projectId, newTaskQty) {
        console.log(projectId,newTaskQty)
        const requestData = {
            fields: {
                taskQty: { integerValue: newTaskQty },
            }
        };
        // Формирование query string для параметра updateMask
        const updateMaskQuery = Object.keys(requestData.fields).map(field => `updateMask.fieldPaths=${field}`).join('&');
        return instance.patch(`/projects/${projectId}?${updateMaskQuery}`, requestData);


    }
  

    // getTaskById(taskId) {
    //     return instance.get(`/tasks/${taskId}`)
    //         .then((res) => {
    //             const taskData = res.data;
    //             const taskId = taskData.name.split('/').pop();
    //             const fields = taskData.fields || {}; // Обработка случая, если данных fields нет
    //             const task = { id: taskId, ...fields };
    //             return task;
    //         })
    //         .catch((error) => {
    //             if (error.response && error.response.status === 404) {
    //                 console.warn(`Задача с ID ${taskId} не найдена.`);
    //                 return null; // Возвращаем null, если задача не найдена
    //             } else {
    //                 console.error('Ошибка при получении задачи:', error);
    //                 throw error; // Выбрасываем ошибку для дальнейшей обработки
    //             }
    //         });
    // }


    updateTask(taskId, data) {
        const requestData = {
            fields: {
                status: { stringValue: data.status },
                // title: { stringValue: data.title },
                // description: { stringValue: data.description },
            }
        };
        // Формирование query string для параметра updateMask
        const updateMaskQuery = Object.keys(requestData.fields).map(field => `updateMask.fieldPaths=${field}`).join('&');
        return instance.patch(`/tasks/${taskId}?${updateMaskQuery}`, requestData);
    }

    deleteTask(taskId) {
        return instance.delete(`/tasks/${taskId}`);
    }

    logicDeleteTask(taskId) {
        const requestData = {
            fields: {
                deleted: { booleanValue: true }
            }
        };
        // Формирование query string для параметра updateMask
        const updateMaskQuery = 'updateMask.fieldPaths=deleted';
        return instance.patch(`/tasks/${taskId}?${updateMaskQuery}`, requestData);
    }
    getProjectTasks(projectId) {
        return instance.post(':runQuery', {
            structuredQuery: {
                from: [
                    { collectionId: "tasks" }
                ],
                where: {
                    compositeFilter: {
                        op: 'AND',
                        filters: [
                            {
                                fieldFilter: {
                                    field: { fieldPath: 'projectId' },
                                    op: 'EQUAL',
                                    value: {
                                        stringValue: projectId
                                    }
                                }
                            },
                            {
                                fieldFilter: {
                                    field: { fieldPath: 'deleted' },
                                    op: 'EQUAL',
                                    value: { booleanValue: false }
                                }
                            }
                        ]
                    }

                    
                }
            }
        })
            .then((res) => {
                
                const data = res.data.map((item) => {
                    const id = item.document.name.split('/').pop();
                    const fields = item.document.fields;
                    return { id, ...fields };
                });
                return data;
            });
    }
    //без филтра "удаленных" задач
    // getProjectTasks(projectId) {
    //     return instance.post(':runQuery',{
    //         structuredQuery: {
    //             from: [
    //                { collectionId: "tasks"}
    //             ],
    //             where: {
    //                fieldFilter: {
    //                     field: { fieldPath: 'projectId' },
    //                     op: 'EQUAL',
    //                     value: {
    //                         stringValue: projectId
    //                     }
    //                }
    //             }
    //         }
    //     })
    //         .then((res) => {
    //             const data = res.data.map((item) => {
    //                 const id = item.document.name.split('/').pop();
    //                 const fields = item.document.fields; 
    //                 return { id, ...fields }; 
    //             });
    //             return data;
    //         });
    // }

    getProjects() {
        return instance.get('/projects')
        .then((res) => {
            const data = res.data.documents.map((doc) => ({
                id: doc.name.split('/').pop(),
                ...doc.fields,
            }));
            console.log(data)

            return data;
        });
    }

    createProject(data) {
        const requestData = {
            fields: {
                title: { stringValue: data.title },
                taskQty: { integerValue: data.taskQty },
                author: { stringValue: data.author }
            }
        };

        return instance.post('/projects', requestData)
            .then((res) => {
                console.log('Проект успешно создан:', res.data);
                return res.data; 
            })
            .catch((error) => {
                console.error('Ошибка при создании проекта:', error);
                throw error; 
            });
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
