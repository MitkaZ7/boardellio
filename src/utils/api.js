import axios from 'axios';
import { notDeletedProjecTasks } from './firebase'
import { formateDate } from './formateDate';

const createInstance = (token) => {
    return axios.create({
        baseURL: 'https://firestore.googleapis.com/v1/projects/dashboard-app-2ad06/databases/(default)/documents',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

class Api {
    constructor(token) {
        this.instance = createInstance(token);
        this.instance.interceptors.request.use(
            (config) => {
                // Получаем текущий токен доступа
                const currentToken = getCurrentToken();
                console.log('FUCK YOU TOKEN: ', currentToken)
                // Если токен доступа существует, добавляем его в заголовок Authorization
                if (!currentToken) {
                    console.log('!FUCK YOU TOKEN: ', currentToken)

                    this.instance.setToken(currentToken)
                    config.headers.Authorization = `Bearer ${currentToken}`;
                } else {
                    console.log('FUCK YOU TOKEN: ', currentToken)
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    setToken(token) {
        this.instance = createInstance(token);
    }
    getCurrentToken() {
        const { idToken } = JSON.parse(localStorage.getItem('jwt'));
        setToken(idToken)
        return idToken ? idToken : null;
    }
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
                files: { arrayValue: { values: [] } }
            }
        };

        return this.instance.post('/tasks', requestData)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    getTaskById(taskId) {
        return this.instance.get(`/tasks/${taskId}`).then((res) => {
            const task = {
                id: res.data.name.split('/').pop(),
                ...res.data.fields,
                createTime: res.data.createTime
            };
            return task
        });
    }

    increaseTaskQty(projectId, newTaskQty) {
        const requestData = {
            fields: {
                taskQty: { integerValue: newTaskQty },
            }
        };
        // Формирование query string для параметра updateMask
        const updateMaskQuery = Object.keys(requestData.fields).map(field => `updateMask.fieldPaths=${field}`).join('&');
        return this.instance.patch(`/projects/${projectId}?${updateMaskQuery}`, requestData);


    }

    updateTask(taskId, data) {
        const requestData = {
            fields: {}
        };
        Object.keys(data).forEach(field => {
            const fieldValue = data[field];
            if (typeof fieldValue === 'boolean') {
                requestData.fields[field] = { booleanValue: fieldValue };
            } else if (Number.isInteger(fieldValue)) {
                requestData.fields[field] = { integerValue: fieldValue };
            } else {
                requestData.fields[field] = { stringValue: fieldValue };
            }
        });
        const updateMaskQuery = Object.keys(requestData.fields).map(field => `updateMask.fieldPaths=${field}`).join('&');
        return this.instance.patch(`/tasks/${taskId}?${updateMaskQuery}`, requestData);
    }

    deleteTask(taskId) {
        return this.instance.delete(`/tasks/${taskId}`);
    }

    logicDeleteTask(taskId) {
        const requestData = {
            fields: {
                deleted: { booleanValue: true }
            }
        };
        // Формирование query string для параметра updateMask
        const updateMaskQuery = 'updateMask.fieldPaths=deleted';
        return this.instance.patch(`/tasks/${taskId}?${updateMaskQuery}`, requestData);
    }
    getProjectTasks(projectId) {
        return this.instance.post(':runQuery', {
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

    getUserTasks(userEmail) {
        return this.instance.post(':runQuery', {
            structuredQuery: {
                from: [
                    { collectionId: "tasks" }
                ],
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'author' },
                        op: 'EQUAL',
                        value: { stringValue: userEmail }
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

    getUserProjects(userEmail) {
        return this.instance.post(':runQuery', {
            structuredQuery: {
                from: [
                    { collectionId: "projects" }
                ],
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'author' },
                        op: 'EQUAL',
                        value: { stringValue: userEmail }
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
        return this.instance.get('/projects')
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
                author: { stringValue: data.author },
                tag: { stringValue: data.tag },
                description: { stringValue: data.description },
            }
        };

        return this.instance.post('/projects', requestData)
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
        return this.instance.get(`/projects/${id}`).then((res) => {
            const project = res.data.fields;
            return { id: res.data.name.split('/').pop(), ...project };
        });
    }

    // USER DATA:
    createUserInDB(userId, userData) {
        const requestData = {
            fields: {
                name: { stringValue: userData.name },
                avatar: { stringValue: userData.avatar },
                role: { stringValue: userData.role },
                email: { stringValue: userData.email }
            },
        };
        console.log(requestData)
        const params = {
            documentId: userId,
        };
        return this.instance.post(`/users`, requestData, { params })
            .then((res) => {
                console.log('Пользователь успешно создан в Firestore');
                console.log(res.data)
                return res.data;
            })
            .catch((error) => {
                console.error('Ошибка при записи данных пользователя в Firestore:', error);
                throw error;
            });
    }


}


export default new Api();