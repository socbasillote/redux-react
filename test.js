const immutableUpdater = (obj) => {
    return {
        ...obj,
        completed: !obj.completed
    }
}

const task = { text: 'iron clothes', completed: false }


console.log(immutableUpdater(task))
console.log(task)