import axios from 'axios';

export function fetchPurchaseRequisition() {
    return axios.get('/prpo/purchase-request/my-purchase-request');
}
export function fetchPendingPurchaseRequisition() {
    return axios.get('/prpo/pending-approval/list');
}

export function fetchClassification() {
    return axios.get('/prpo/purchase-request/classification');
}
