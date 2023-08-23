export default class TaskDTO {
    id;
    number;
    title;
    description;
    priority;
    state;
    isCompleted;
    project;
    constructor(taskData) {
        this.id = taskData.id;
        this.number = taskData.number;
        this.title = taskData.title;
        this.description = taskData.description;
        this.priority = taskData.priority;
        this.state = taskData.state;
        this.isCompleted = taskData.isCompleted;
        this.project = taskData.project;
    }
}
