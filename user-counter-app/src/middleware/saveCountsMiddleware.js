import { increment } from "../features/counter/counterSlice";


const saveCountsMiddleware = (store) => (next) => (action) => {
    console.log('Middleware: Dispatching', action);
    const result = next(action);

    console.log('Middleware: Next state', store.getState());
    if (increment.match(action)) {
        const state = store.getState();
        const { currentUser } = state.auth;
        const { users } = state.counter;

        if (currentUser) {
            const savedData = JSON.parse(localStorage.getItem('userCounts') || '{}');
            savedData[currentUser] = users[currentUser];
            localStorage.setItem('userCounts', JSON.stringify(savedData));
        }
    }
  return  result;
}

export default saveCountsMiddleware