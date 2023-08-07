import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://parseapi.back4app.com',
    headers: {
        'X-Parse-Application-Id': process.env.REACT_APP_PARSE_APP_ID,
        'X-Parse-REST-API-Key': process.env.REACT_APP_PARSE_API_KEY,
        'Content-Type': 'application/json',
    }
})
class Api {

    // getTasks() {
    //     return instance.get('/classes/Task')
    //          .then(res => {
    //              const {results} = res.data;
    //             //  console.log(results)
    //              return results
    //          })
    // }
    
    createTask(data) {
        console.log(JSON.stringify(data))
        return instance.post('/classes/Task/' , data)

    }

    updateTask(taskId,data) {
       return instance.put(`/classes/Task/${taskId}`, data)
    }

    deleteTask(taskId) {
         return instance.delete(`/classes/Task/${taskId}`)
    }

    getProjectTasks(projectId) {
        const queryParams = {
            where: JSON.stringify({
                project: {
                    __type: 'Pointer',
                    className: 'Project',
                    objectId: projectId,
                },
            }),
            include: 'project',
        };

        return instance
            .get('/classes/Task', { params: queryParams })
            .then((res) => {
                const { results } = res.data;
                // console.log('Received tasks:', results);
                return results;
            });
    }






    // getProjectTasks(taskId) {
    //     return instance.get(`/classes/Task?where={"project":{"__type":"Relational","className":"Project","objectId":"${taskId}"}}`)
    //         .then((res) =>{
    //             const { results } = res.data;
    //             console.log('Received tasks:', results);
    //             return results;
    //         })
    // }

    getProjects() {
        return instance.get('/classes/Project')
            .then(res => {
                const { results } = res.data;
                console.log(results)
                 return results
            })
    }

    createProject(data) {
        return instance.post('/classes/Project', JSON.stringify(data));
    }
    getProjectById(projectId) {
        return instance.get(`/classes/Project/${projectId}`)
            .then((res) => res.data);
    }
   

}

const api = new Api(instance);
export default api;