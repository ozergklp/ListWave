export default function todoReducer(todos, action) {
    switch (action.type) {
        case 'added':{
            return [...todos,{ id: action.id, task: action.task, isEdit: false}]
        }

        case 'deleted': {
            return todos.filter((t) => t.id !== action.id);
        }

        case 'changed' :{
            return todos.map(todo => 
                todo.id === action.id ? {...todo, task: action.event, isEdit: action.isEdit } : todo);
        }
        
        case 'create' :{
            return [];
        }

        case 'set' : {
            return action.list;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

