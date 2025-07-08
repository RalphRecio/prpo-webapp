import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | IconType | null;
    isActive?: boolean;
    permissions?: string[] | null;
    subItems?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface InboundInv extends PageProps {
    id: number;
    product_id: number;
    mfg_date: string;
    exp_date: string;
    image: string;
    supplier_id: number;
    date_received: string;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface PageProps {
    [key: string]: any;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface Transactions {
    id: number;
    supplier_id: number;
    dr_no: string;
    invoice_no: string;
    gr_no: string | null;
    lot_code: string | null;
    date_received: string;
    is_confirmed: number;
    is_putaway: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status: string;
    transaction_item: TransactionItem[];
    supplier: Supplier;
}

export interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
}

export interface TransactionItem {
    id: number;
    transaction_id: number;
    product_id: number;
    location_id: number;
    lot_code: string;
    status: string;
    mfg_date: string;
    shelf_exp_date: string;
    exp_date: string;
    is_putaway: number;
    quantity: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    location: Location;
    products: Product;
    latest_location_movement: LatestLocationMovement;
    remarks: string;
}

export interface Product {
    id: number;
    barcode: string;
    item_code: string;
    item_description: string;
    uom: string;
    stock_type: string;
    origin: string;
    packing: string;
    shelf_life_value: number;
    shelf_life_unit: string;
    quantity: string;
    tl_order_qty: string;
    cnsgmnt_buff_qty: string;
    image: string;
    type_id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface TransactionOut {
    id: number;
    customer_id: number;
    po: string;
    customer: {
        id: number;
        name: string;
    };
    transaction_type: string;

    status: string;
    is_confirm: number;
    is_picked: number;
    is_dispatched: number;
    transaction_out_items: TransctionOutItem[];
    date_dispatched: string;
    created_at: string;
    location: Location;
}

export interface TransctionOutItem {
    id: number;
    product: Product;
    lot_code: string;
    mfg_date: string;
    exp_date: string;
    shelf_exp_date: string;
    truck: Truck;
    quantity: number;
    location: Location;
    status: string;
    is_dispatched: number;
}

export interface Location {
    id: number;
    name: string;
    code: string;
    type: string;
    capacity: string;
    zone: string;
    is_active: boolean;
    description: string;
}

export interface LatestLocationMovement {
    id: number;
    trnsc_item_id: number;
    from_location_id: number | null;
    to_location_id: number;
    quantity: string;
    movement_type: string;
    remarks: string | null;
    created_at: string;
    updated_at: string;
    to_location: Location | null;
    from_location: Location | null;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    created_at: string;
}

export interface ProductInventory {
    id: number;
    product_id: number;
    location_id: number;
    mfg_date: date | null;
    exp_date: date | null;
    quantity: number;
    locarion: string;
    created_at: string;
    lot_code: string;
    shelf_exp_date: string;
    product: {
        id: number;
        barcode: string;
        item_code: string;
        item_description: string;
        uom: string;
        packing: string;
    };
    location?: {
        id: number;
        name: string;
    };
}

export interface Role {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    permissions: [];
}

export interface Truck {
    id: number;
    truck_number: string;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    status: string;
    cargo_description: string;
    created_at: string;
}

export interface PurchaseRequisition {
    id: number;
    pr_no: string;
    requestor_id: number;
    date_issue: string;
    date_needed: string;
    bu_id: number;
    department_id: number;
    prod_end_user: string;
    classification_id: number;
    remarks: string;
    is_it_related: number;
    is_approve_it_manager: number;
    is_approve_im_supervisor: number;
    im_supervisor_id: number;
    currency: string;
    budgeted: number;
    isCapexOpex: string | null;
    budget_amount: number | null;
    finance_remarks: string | null;
    is_finance_verified: number;
    finance_verified_id: number;
    is_approve1_unbudgeted: number;
    approver1_unbgtd_id: number;
    is_approve2_unbudgeted: number;
    approver2_unbgtd_id: number;
    is_overbudget: number;
    is_approve1_overbudgeted: number;
    approver1_bgtd_id: number;
    is_approve2_overbudgeted: number;
    approver2_bgtd_id: number;
    is_procurement_verified: number;
    procurement_verified_id: number;
    supplier_name: string | null;
    actual_amount: number | null;
    procurement_remarks: string | null;
    status: string;

    approvers_list: ApproverList[];
    classification: Classification;
    purchase_requisition_items: PurchaseRequisitionItem[];
    bu: BusinessUnit;
    requestor: Requestor;
    department: Department;
}

export interface PurchaseRequisitionItem {
    id: number;
    pr_id: number;
    qty_in_figures: number;
    uom: string;
    description: string;
    status: string;
}

export interface ApproverList {
    id: number;
    approver_id: string;
    is_approve: string;
    is_send_count: string;
    pr_id: string;
    remarks: string | null;
    approver_level: string;
    approval_date: string;
    created_at: string;
    updated_at: string;
    approver: Approver;

    approve_date_formatted: string | null;
}

export interface PoApproverList {
    id: number;
    approver_id: string;
    is_approve: string;
    is_send_count: string;
    po_id: string;
    remarks: string | null;
    approver_level: string;
    approval_date: string;
    created_at: string;
    updated_at: string;
    approver: Approver;

    approve_date_formatted: string | null;
}

export interface Approver {
    id: number;
    fname: string;
    mname: string | null;
    lname: string;
}

export interface BusinessUnit {
    id: number;
    name: string;
}

export interface Requestor {
    id: number;
    fname: string;
    mname: String;
    lname: string;
}

export interface Classification {
    id: number;
    name: string;
    it_related: number;
}

export interface User {
    id: number;
    fname: string;
    mname: string;
    last_name: string;
    bu_id: number;
    dept_id: number;
    business_unit: BusinessUnit;
    department: Department;
    immediate_head: {
        fname: string;
        mname: string;
        lname: string;
    };
}

export interface Vendor {
    id: number;
    business_type: string;
    supplier_name: string;
    address: string;
    contact_number: string;
    email: string;
    contact_person: string;
    payment_terms: string;
}

export interface PurchaseOrder {
    id: number;
    po_no: string;
    vendor_id: number;
    ship_via: string;
    terms: string;
    status: string;
    buyer: string;
    confirming_to: string;
    pr_id: number;
    freight: string;
    remarks: string;
    is_approve1: number;
    is_approve2: number;
    vendor_contact_person: string;
    vendor_email_address: string;
    vendor_tel_no: string;
    vendor_name: string;
    vendor_address: string;
    confirming_to_address: string;
    ship_to: string;
    ship_to_address: string;
    purchase_request: PurchaseRequest;
    vendors: Vendor;
    purchase_order_details: PurchaseOrderDetails[];
    po_approvers_list: PoApproverList[];
    prepared_by: {
        fname: string;
        lname: string;
    };
    created_at: string | null;
}

export interface PurchaseOrderDetails {
    id: number;
    pr_details_id: number | undefined;
    qty_ordered: number;
    unit_of_measure: string;
    unit_price: number;
    extended_price: number;
    description1: string | undefined;
    description2: string;
    created_at?: string;
    updated_at?: string;

    qty_in_figures: number | undefined;
}
