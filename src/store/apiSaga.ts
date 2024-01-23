
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource, } from 'axios';
import { actionChannel, take, fork, call, put } from 'redux-saga/effects';

// Constants for action types
const API_INVOCATION = 'API_INVOCATION';
const ALREADY_EXISTS = 'ALREADY_EXISTS';

// Enum object for API request types
enum apiType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

// Interface defining the default Axios request configuration
interface CreateAxiosDefaults extends AxiosRequestConfig {
    headers: {
        Accept: string;
        'Content-Type': string;
        'Access-Control-Allow-Methods': string;
        'Access-Control-Allow-Headers': string[];
    };
}

// Default configuration for Axios
const configuration: CreateAxiosDefaults = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': [
            'Origin',
            'Accept',
            'X-Requested-With',
            'X-B3-TraceId',
            'Content-Type',
            'X-B3-ParentSpanId',
            'X-B3-SpanId',
            'X-B3-Sampled',
            'Authorization',
        ],
    },
    timeout: 5000,
};

// Create an Axios instance with the specified configuration
const api: AxiosInstance = axios.create(configuration);

// Interface defining the structure of an error object
interface Error {
    cause: string;
}

// Interface defining the structure of an action object
interface Action {
    payload: {
        action: string;
        method: 'POST' | 'GET' | 'PUT' | 'DELETE';
        url: string;
        data?: any;
    };
}


// Record to store pending requests
const pendingRequests: Record<string, any> = {
};

// Function to check if a similar pending request exists
const similarPendingRequestExist = (actionType: string, url: string): boolean =>
    !!pendingRequests[actionType]?.config.url && pendingRequests[actionType]?.config.url === url;


// Generator function to dispatch a pending action
function* dispatchPending(actionType: string, action: Action, payload: any): any {
    yield put({
        type: `${actionType}_PENDING`,
        actualAction: action,
        payload
    });
}

// Generator function to dispatch a fulfilled action
function* dispatchFulfilled(action: Action, response: AxiosResponse): any {
    yield put({
        type: `${action.payload.action}_FULFILLED`,
        actualAction: action,
        payload: { data: response.data, headers: response.headers }
    });
}

// Generator function to dispatch a rejected action
function* dispatchRejected(actionType: string, action: Action, error: Error): any {
    yield put({
        type: `${actionType}_REJECTED`,
        actualAction: action,
        payload: { response: error }
    });
}

// Generator function to handle API invocation
function* invokeAPI(action: Action): any {
    const { payload } = action;
    const { method, url, data, action: actionType } = payload;

    try {
        // Dispatch a pending action
        yield* dispatchPending(payload.action, action, payload);

        let response: AxiosResponse;

        switch (method) {
            case apiType.GET: {

                if (similarPendingRequestExist(actionType, url)) {
                    throw new Error(
                        'Similar axios request detected!'
                        // , { cause: ALREADY_EXISTS }
                    );
                } else {

                    // Create a CancelToken source for cancelling the request
                    const source: CancelTokenSource = axios.CancelToken.source();
                    // Store the pending request information
                    pendingRequests[actionType] = { config: { url, api, source } };

                    // Make a GET request using Axios
                    response = yield call([api, api.get], url, { cancelToken: source.token });
                }
                break;
            }

            case apiType.POST:
                // Make a POST request using Axios
                response = yield call([api, api.post], url, data,);
                break;

            case apiType.DELETE:

                // Make a DELETE request using Axios
                response = yield call([api, api.delete], url);
                break;
            case apiType.PUT:
                // Make a PUT request using Axios
                response = yield call([api, api.put], url, data,);
                break;

            default:
                throw new Error(`API method ${method} is not supported!`);
        }

        // Dispatch a fulfilled action
        yield* dispatchFulfilled(action, response);
        // Remove the pending request information
        delete pendingRequests[actionType];
    } catch (error: any) {
        console.log({ error })
        // If the error is not due to a similar request existing, remove the pending request information
        if (error.cause !== ALREADY_EXISTS) {
            delete pendingRequests[actionType];
        }

        // Dispatch a rejected action
        yield* dispatchRejected(payload.action, action, error);
    }
}


// Generator function to watch for API invocation actions
function* apiSaga(): any {
    // Create an action channel for API_INVOCATION actions
    const actionQueue = yield actionChannel(API_INVOCATION);
    const keepWatching = true;

    // Continue watching for actions in the action channel
    while (keepWatching) {
        // Take the next API_INVOCATION action
        const action: Action = yield take(actionQueue);
        // Fork a new process to handle the API invocation
        yield fork(invokeAPI, action);
    }
}

// Export the invokeAPI function and the apiSaga generator function
export { invokeAPI };
export default apiSaga;
