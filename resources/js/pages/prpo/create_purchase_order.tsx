import { DialogAlert } from '@/components/dialogAlert';
import { TablePo } from '@/components/table-po';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseOrder, PurchaseOrderDetails, PurchaseRequisition, Vendor } from '@/types';
import { defaultPurchaseOrderDetails } from '@/util/util';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import PoForm from './component/forms/po-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Order',
        href: '/prpo/purchase-request',
    },
];

export default function PurchaseOrderPage() {
    const { vendorList, purchaseRequest } = usePage<{
        purchaseRequest: PurchaseRequisition;
        vendorList: Vendor[];
    }>().props;

    const [items, setItems] = useState<PurchaseOrderDetails[]>([]);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState<PurchaseOrder>(defaultPurchaseOrderDetails);

    const handleSubmit = async () => {
        try {
            const payload = {
                ...purchaseOrderDetails,
                items,
            };

            const response = await axios.post('/prpo/purchase-order', payload);

            Swal.fire('Success!', 'Purchase Order created successfully.', 'success').then(() => {
                Inertia.reload(); // Rerender the component with updated data
            });
        } catch (error: any) {
            Swal.fire('Error!', error.message, 'error');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Purchase Order" />
            <div className="mx-auto flex h-full max-w-[900px] flex-1 flex-col gap-4 px-4">
                <PoForm
                    purchaseRequest={purchaseRequest}
                    vendorList={vendorList}
                    purchaseOrderDetails={purchaseOrderDetails}
                    setPurchaseOrderDetails={setPurchaseOrderDetails}
                />

                <TablePo items={items} setItems={setItems} showAddRow={true} />
                {/* <PoApproverTable /> */}
                <DialogAlert
                    remarkFields={false}
                    handleSubmit={() => {
                        handleSubmit();
                    }}
                />
            </div>
        </AppLayout>
    );
}
