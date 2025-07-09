import { TablePo } from '@/components/table-po';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseOrder, PurchaseOrderDetails } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PoDetailsForm from './component/forms/po-details-form';
import PoApproverTable from './component/po-approver-table';

import { FcDownload, FcPrint } from 'react-icons/fc';
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

    const handleDownloadPdf = async () => {
        const resp = await fetch(`/prpo/purchase-order/download/${purchaseOrder.id}`);
        const blob = await resp.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'purchase-order.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const printPo = () => {
        window.open(`/prpo/purchase-order/print-po/${purchaseOrder.id}`, '_blank');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Purchase Order" />

            <div className="mx-auto flex h-full max-w-[900px] flex-1 flex-col gap-4 px-4">
                <PoDetailsForm purchaseOrder={purchaseOrder} />
                <TablePo items={items} setItems={setItems} showAddRow={false} />

                <PoApproverTable
                    PurchaseOrderId={purchaseOrder.id}
                    PoApproverList={purchaseOrder.po_approvers_list}
                    preparedBy={`${purchaseOrder.prepared_by.fname} ${purchaseOrder.prepared_by.lname}`}
                    datePrepared={purchaseOrder.created_at}
                />

                <div className="flex w-full justify-end gap-2 rounded bg-white px-6 py-4">
                    <button
                        className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-center text-xs font-bold text-gray-800 transition-all duration-100 hover:scale-105 hover:bg-gray-200"
                        onClick={() => printPo()}
                    >
                        <FcPrint className="mr-2 h-4 w-4" />
                        <span>Print</span>
                    </button>
                    <button
                        className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-center text-xs font-bold text-gray-800 transition-all duration-100 hover:scale-105 hover:bg-gray-200"
                        onClick={() => handleDownloadPdf()}
                    >
                        <FcDownload className="mr-2 h-4 w-4" />
                        <span>PDF</span>
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
