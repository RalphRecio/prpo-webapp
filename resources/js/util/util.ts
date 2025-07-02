import { PurchaseOrder, PurchaseRequisition, SharedData, User } from '@/types';
import { usePage } from '@inertiajs/react';

export function formatWithCommas(value: string): string {
    const [intPart, decimalPart] = value.replace(/,/g, '').split('.');
    const formattedInt = Number(intPart || '0').toLocaleString('en-US');
    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
}

export const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Custom hook to get full name
export function useAuthFullname(): string {
    const page = usePage<SharedData & { auth: { user: User } }>();
    const { auth } = page.props;
    return `${auth.user.fname} ${auth.user.lname}`;
}

export function useAuthBusinessUnit(): string {
    const page = usePage<SharedData & { auth: { user: User } }>();
    const { auth } = page.props;
    return auth.user.business_unit.name;
}

export function useAuthDepartment(): string {
    const page = usePage<SharedData & { auth: { user: User } }>();
    const { auth } = page.props;
    return auth.user.department.name;
}

export function useAuthId(): string {
    const page = usePage<SharedData & { auth: { user: User } }>();
    const { auth } = page.props;
    return String(auth.user.id);
}

export const defaultPurchaseOrderDetails: PurchaseOrder = {
    id: 0,
    vendor_id: 0,
    confirming_to: '',
    pr_id: 0,
    ship_via: '',
    terms: '',
    status: '',
    buyer: '',
    freight: '',
    remarks: '',
    prepared_by: 0,
    vendor_contact_person: '',
    vendor_email_address: '',
    vendor_tel_no: '',
    vendor_name: '',
    vendor_address: '',
    is_approve1: 0,
    is_approve2: 0,
};

export const defaultPurchaseRequisitionDetails: PurchaseRequisition = {
    id: 0,
    pr_no: '',
    requestor_id: 0,
    date_issue: '',
    date_needed: '',
    bu_id: 0,
    department_id: 0,
    prod_end_user: '',
    classification_id: 0,
    is_it_related: 0,
    im_supervisor_id: 0,
    remarks: '',
    status: '',
    is_approve_it_manager: 0,
    is_approve_im_supervisor: 0,
    requestor: null,
    bu: null,
};
