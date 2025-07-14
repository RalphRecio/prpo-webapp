import axios from 'axios';

export function fetchPurchaseRequisition(Payload: any) {
    return axios.get('/prpo/purchase-request/my-purchase-request', { params: Payload });
}

export function fetchAllPurchaseRequisition() {
    return axios.get('/prpo/purchase-request/all-requests');
}

export function fetchPendingPurchaseRequisition() {
    return axios.get('/prpo/pending-approval/list');
}

export function fetchClassification() {
    return axios.get('/prpo/purchase-request/classification');
}

export function fetchPurchaseOrders() {
    return axios.get('/prpo/purchase-order/pending-approval/list');
}

export function fetchAllPurchaseOrders() {
    return axios.get('/prpo/purchase-order/all/list');
}
