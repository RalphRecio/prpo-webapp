import { DialogAlert } from '@/components/dialogAlert';
import { TablePo } from '@/components/table-po';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PurchaseOrder, PurchaseOrderDetails, PurchaseRequisition, Vendor } from '@/types';
import { defaultPurchaseOrderDetails } from '@/util/util';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PoForm from './component/forms/po-form';
import PoApproverTable from './component/po-approver-table';

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

    const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null);

    const fetchPurchaseOrder = async (id: number) => {
        try {
            const response = await axios.get(`/prpo/purchase-order/details/${id}`);
            setPurchaseOrder(response.data);
        } catch (error) {
            console.error('Error fetching purchase order details:', error);
        }
    };

    useEffect(() => {
        fetchPurchaseOrder;
    }, [purchaseOrder]);

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
        } catch (error) {}
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create PR" />
            <div className="mx-auto flex h-full max-w-[900px] flex-1 flex-col gap-4 px-4">
                <PoForm
                    purchaseRequest={purchaseRequest}
                    vendorList={vendorList}
                    purchaseOrderDetails={purchaseOrderDetails}
                    setPurchaseOrderDetails={setPurchaseOrderDetails}
                />
                <TablePo items={items} setItems={setItems} showAddRow={true} />
                <PoApproverTable />
                <DialogAlert
                    handleSubmit={() => {
                        handleSubmit();
                    }}
                />
            </div>
        </AppLayout>
    );
}
