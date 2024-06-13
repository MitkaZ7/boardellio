import axios from 'axios';
import { notDeletedProjecTasks } from './firebase'
import { formateDate } from '../utils/formateDate'
const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGIxNTFiY2Q5MGQ1YjMwMjBlNTNhMzYyZTRiMzA3NTYzMzdhNjEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU21hcnQgRm94IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Rhc2hib2FyZC1hcHAtMmFkMDYiLCJhdWQiOiJkYXNoYm9hcmQtYXBwLTJhZDA2IiwiYXV0aF90aW1lIjoxNzE4MTM4NzMzLCJ1c2VyX2lkIjoiQ3J2WXN1Q2hjak83cTVMNW53Vm1SUWZVYkpHMyIsInN1YiI6IkNydllzdUNoY2pPN3E1TDVud1ZtUlFmVWJKRzMiLCJpYXQiOjE3MTgxMzg3MzMsImV4cCI6MTcxODE0MjMzMywiZW1haWwiOiJpQG1pdGthZGV2LnJ1IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImlAbWl0a2FkZXYucnUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.eoA0h2ok7jz7Z2G2XuX_9kq_uIsfHBNb6Wg6Lojpj2oIKCQyriEtoJIr7S6-2e3x7aVWqCnv60EjHVnyqONqnes8Tnl8IGoQZkCOj5kmklq0sWSVqIu0wtI2kBDUcKDe9HLJTaWWXE_mdjQTvXgmdKDu89gnayvUN3encIfMdyVsLtfesxFo5uymKLbukVXand9e6mE7UiegVyIYME5yzvLF_IeI6EBTRl8R7b-rl-wLNg29BRFzawtjwo0BiVmyC9zMRNCDB4fJp_DH7ig7QukEqTNcHnYWlc1QsxmZ7dRj90MqLJwOaYK8zk3cEl2bCzFQKJj8P-BsBFpl4JfEXQ';
const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/dashboard-app-2ad06/databases/(default)/documents',
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
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
                files: { arrayValue: { values: [] } }
            }
        };

        return instance.post('/tasks', requestData)
           
            .then((res) => {
                console.log(requestData)
                return res.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    getTaskById(taskId) {
        return instance.get(`/tasks/${taskId}`).then((res) => {
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
        return instance.patch(`/projects/${projectId}?${updateMaskQuery}`, requestData);


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

    getUserTasks(userEmail) {
        return instance.post(':runQuery', {
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
        return instance.post(':runQuery', {
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
                author: { stringValue: data.author },
                tag: { stringValue: data.tag },
                description: { stringValue: data.description },
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
        return instance.post(`/users`, requestData, { params })
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

const api = new Api(instance);
export default api;