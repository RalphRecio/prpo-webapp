import { TablePo } from '@/components/table-po';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseOrder, PurchaseOrderDetails } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PoDetailsForm from './component/forms/po-details-form';
import PoApproverTable from './component/po-approver-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Purchase Order',
        href: '/prpo/purchase-request',
    },
    {
        title: 'View Purchase Order',
        href: '/prpo/purchase-request',
    },
];

export default function PurchaseOrderDetailsPage() {
    const { purchaseOrder } = usePage<{
        purchaseOrder: PurchaseOrder;
    }>().props;

    const [items, setItems] = useState<PurchaseOrderDetails[]>(purchaseOrder.purchase_order_details || []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Purchase Order" />

            <div className="mx-auto flex h-full max-w-[900px] flex-1 flex-col gap-4 px-4">
                <PoDetailsForm purchaseOrder={purchaseOrder} />
                <TablePo items={items} setItems={setItems} showAddRow={false} />

                <PoApproverTable
                    PoApproverList={purchaseOrder.po_approvers_list}
                    preparedBy={`${purchaseOrder.prepared_by.fname} ${purchaseOrder.prepared_by.lname}`}
                    datePrepared={purchaseOrder.created_at}
                />
            </div>
        </AppLayout>
    );
}
