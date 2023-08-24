const ListReducer = (lists, action) => {
    switch (action.type) {
        case 'changedList': {
            return lists.map(tlist => { // change
                if(action.id === tlist.id){
                    return {...tlist, list: action.list, name: action.name};
                }
                    return tlist;
                });
        }

        case 'addedList': {
            return [...lists,{id: action.id, list: action.list,name: action.name}]
        }

        case 'deletedList': {
            return lists.filter(tlist => (tlist.id !== action.id ))
        }

        default:
            throw new Error('Unknown action: ' + action.type);
        
    }
}

export default ListReducer;
