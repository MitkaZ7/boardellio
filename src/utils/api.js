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

    getTasks() {
        return instance.get('/classes/Task')
             .then(res => {
                 const {results} = res.data;
                //  console.log(results)
                 return results
             })
    }
    
    createTask(data) {
        instance.post('/classes/Task' , JSON.stringify(data))

    }

    updateTask(taskId,data) {
        instance.put(`/classes/Task/${taskId}`, data)
    }

    deleteTask(taskId) {
        instance.delete(`/classes/Task/${taskId}`)
    }

    getProjects() {
        return instance.get('/classes/Project')
            .then(res => {
                const { results } = res.data;
                // console.log(results)
                 return results
            })
    }

    createProject(data) {
        return instance.post('/classes/Project', JSON.stringify(data));
    }


}

const api = new Api(instance);
export default api;