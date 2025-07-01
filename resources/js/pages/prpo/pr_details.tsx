import { DataTable } from '@/components/app-datatable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Classification, PurchaseRequisition } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ApproverFinanceTable from './component/approver-finance-table';
import ApproverIMTable from './component/approver-im-table';
import ApproverProcurement from './component/approver-procurement';
import ApproverUnbudgeted from './component/approver-unbudgeted';
import ApproverOverbudget from './component/approver_overbudget';
import TotalItem from './component/total-item';

// import { Button } from '@/components/ui/button';
import PrDetailsForm from './component/forms/pr-details-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Requisition',
        href: '/prpo/purchase-request',
    },
];

export default function purchaseRequisition() {
    const { purchaseRequisition, classification } = usePage<{
        purchaseRequisition: PurchaseRequisition;
        classification: Classification[];
    }>().props;

    const [localPurchaseRequisition, setLocalPurchaseRequisition] = useState(purchaseRequisition);

    const [loading, setLoading] = useState<boolean>(false);

    const handlePurchaseRequestFieldChange = (field: string, value: any) => {
        setLocalPurchaseRequisition((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchase Request" />

            <div className="mx-auto flex max-w-[900px] flex-1 flex-col gap-4 px-4">
                {/* <Button>View PO list</Button> */}
                <PrDetailsForm PurchaseRequisition={purchaseRequisition} />
                <DataTable items={purchaseRequisition.purchase_requisition_items} />

                <TotalItem total={purchaseRequisition.purchase_requisition_items.length} />
                <ApproverIMTable purchaseRequisition={purchaseRequisition} loading={loading} setLoading={setLoading} />
                <ApproverFinanceTable
                    purchaseRequisition={localPurchaseRequisition}
                    handlePurchaseRequestFieldChange={handlePurchaseRequestFieldChange}
                />
                <ApproverUnbudgeted purchaseRequisition={purchaseRequisition} />
                <ApproverProcurement
                    purchaseRequisition={localPurchaseRequisition}
                    handlePurchaseRequestFieldChange={handlePurchaseRequestFieldChange}
                />
                <ApproverOverbudget purchaseRequisition={purchaseRequisition} />
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black/50" style={{ backdropFilter: 'blur(2px)' }}>
                    <div className="flex flex-col items-center">
                        <svg className="mb-4 h-12 w-12 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span className="text-lg font-semibold text-white">Loading...</span>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
