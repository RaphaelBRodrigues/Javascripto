import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess } from './actions';

function* addToReserve(id) {

    const resp = yield call(fetch, "https://localhost:3333/trips/" + id);
    console.log(resp);
    yield put(addReserveSuccess(resp.data));
}

export default all([
    takeLatest("ADD_RESERVE_REQUEST", addToReserve)
]);