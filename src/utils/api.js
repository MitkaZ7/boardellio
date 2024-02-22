import axios from 'axios';
import { notDeletedProjecTasks } from './firebase'
import { formateDate } from '../utils/formateDate'
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
            // Возвращаем объект задачи с добавленным полем createTime
            return {
                id: res.data.name.split('/').pop(),
                ...task,
                createTime: formateDate(res.data.createTime) // Получаем время создания из ответа API
            };
        });
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
                return res.data; // возвращаем данные созданного проекта
            })
            .catch((error) => {
                console.error('Ошибка при создании проекта:', error);
                throw error; // выбрасываем ошибку для дальнейшей обработки
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
