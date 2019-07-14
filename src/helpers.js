export const getTodoItemsById = (id, ref) => {
    // .orderBy('createdAt')
    const todoItemsRef = ref.doc(id).collection('test');
    const todo_items = [];
    return todoItemsRef.get()
        .then(snapshot => {
            // console.log('snapshot', snapshot)

            snapshot.forEach(item => {
                // console.log('item', item)

                const todo_item = {};
                todo_item.id = item.id;
                todo_item.todo_item = item.data(); // will have 'todo_item.title' and 'todo_item.completed'             
                todo_items.push(todo_item);
            })

            return todo_items;
        })
};
