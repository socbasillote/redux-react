/* const store = {
    getState: () => ({ value: 0})
};

function A(store) {
    return function(next) {
        return function(action) {
            console.log('A before');
            const res = next(action);
            console.log('A after');
            return res;
        }
    }
}

function reducer(action) {
    console.log('Reducer got:', action);
    return 'Reducer result'
}

const withMiddleware = A(store); // first function call
const runMiddleware = withMiddleware(reducer);
const result = runMiddleware('Test_action');

console.log(result);

//console.log('Dispatch result:', result);
/* console.log('\n')
console.log(A)
console.log(withMiddleware())  */

/* function outer(outerParam) {
    console.log('outer function runs with: ', outerParam);

    return function inner(innerParam) {
        console.log('inner runs with:', innerParam);

        return function superInner(superInnerParam) {
            console.log('supper inner runs with:', superInnerParam);

            console.log(`All values: ${outerParam}, ${innerParam}, ${superInnerParam}`)
        }
    }
}

const first = outer('A');
const second = first('B'); 
const third = second('C')
*/


/* function createLogger(logLevel) {
    return function fromModule(moduleName) {
        return function logMessage(message) {
            const timeStamp = new Date().toISOString();
            console.log(`[${timeStamp}] [${logLevel}] [${moduleName}] ${message}`);
        }
    }
}


const errorLogger = createLogger('ERROR');
const authErrorLogger = errorLogger('Auth');
authErrorLogger('Invalid login credentials')
 */


/* const LOG_LEVELS = {
    DEBUG: 5,
    INFO: 2,
    WARN: 3,
    ERROR: 4
};

// Globel minimum log level (only message at this lelvel or higher will be shown)
let currentLogLevel = 'INFO';

// Set the minimum log level dynamically (optional)

function setLogLevel(level) {
    if (LOG_LEVELS[level]) {
        currentLogLevel = level;
    } else {
        console.warn('Invalid log level:', level);
    }
}

function createLogger(logLevel) {
    return function fromModule(moduleName) {
        return function logMessage(message) {
            const shouldLog = LOG_LEVELS[logLevel] >= LOG_LEVELS[currentLogLevel];

            if (shouldLog) {
                const timeStamp = new Date().toISOString();
                console.log(`[${timeStamp}] [${logLevel}] [${moduleName}] ${message}`)
            }
        }
    }
}

setLogLevel('WARN');

const debugLogger = createLogger('DEBUG')('System');
const infoLogger = createLogger('INFO')('User');
const warnLogger = createLogger('WARN')('Payments');
const errorLogger = createLogger('ERROR')('Database');

debugLogger('Debugging app...'); */



function reducer(currentState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { counter: currentState.counter + 1 };
        case 'DECREMENT':
            return { counter: currentState.counter - 1 };
        default: 
            return currentState;
    }
}


const loggerMiddleware = store => next => action => {
    console.log('Middleware Before:', action);
    let result = next(action);
    console.log('Middleware after:', store.getState());
    return result;
}

function createStore(reducer, initialState, middleware) {
    let state = initialState;

    const store = {
        getState: () => state,
        dispatch: action => {
            state = reducer(state, action);
            return action;
        }
    };
    if (middleware) {
        store.dispatch = middleware(store)(store.dispatch);
    }
    return store
}

const store = createStore(reducer, {counter: 0}, loggerMiddleware);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });