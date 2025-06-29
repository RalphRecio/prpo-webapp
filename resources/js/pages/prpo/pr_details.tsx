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
                <ApproverIMTable purchaseRequisition={purchaseRequisition} />
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
        </AppLayout>
    );
}
