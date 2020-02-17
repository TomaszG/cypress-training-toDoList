import { generatePath } from 'react-router';

const apiUrl = process.env.REACT_APP_API_URL;

const allTasks = () => `${apiUrl}/tasks`;
const singleTask = param => `${apiUrl}${generatePath(`/tasks/:taskId`, param)}`;

export default {
  tasks: {
    list: allTasks,
    create: allTasks,
    getSingle: singleTask,
    delete: singleTask,
  },
};
