import { DataTable } from '@/components/app-datatable';
import { DialogAlert } from '@/components/dialogAlert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Classification, PurchaseRequisition } from '@/types';
import { defaultPurchaseRequisitionDetails } from '@/util/util';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ApproverTable from './component/approver-table';
import PrForm from './component/forms/pr-form';
import TotalItem from './component/total-item';

import { fetchClassification } from '@/hooks/api';

import { useLoading } from '../../../context/LoadingContext';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Requisition',
        href: '/prpo/purchase-request',
    },
    {
        title: 'Create Purchase Requisition',
        href: '/prpo/purchase-request/create_pr',
    },
];

export default function CreatePr() {
    const [purchaseRequestDetails, setPurchaseRequestDetails] = useState<PurchaseRequisition>(defaultPurchaseRequisitionDetails);
    const [classification, setClassification] = useState<Classification[]>([]);
    const [itRelated, setItRelated] = useState<number>(0);
    const [items, setItems] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    function hasEmptyRequiredFields(requiredFields: string[], details: Record<string, any>): boolean {
        return requiredFields.some(
            (field) => details[field] === '' || details[field] === null || details[field] === undefined || details[field] === 0,
        );
    }
    const requiredFields = ['date_needed', 'prod_end_user', 'classification_id', 'remarks'];

    // const isDisabled = hasEmptyRequiredFields(requiredFields, purchaseRequestDetails) || items.length === 0;
    const handlePurchaseRequestFieldChange = (field: string, value: any) => {
        setPurchaseRequestDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const { setLoading } = useLoading();

    const handleSubmit = async () => {
        const payload = {
            ...purchaseRequestDetails,
            items: items,
        };
        if (submitting) return; // Prevent double trigger
        setSubmitting(true);

        try {
            setLoading(true);
            await axios.post('/prpo/purchase-request', payload);
            Swal.fire('Success!', 'Your purchase request has been submitted.', 'success');
            setPurchaseRequestDetails(defaultPurchaseRequisitionDetails);
            setItems([]);
        } catch (error) {
            Swal.fire('Error!', 'There was an error submitting your purchase request.', 'error');
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        // setSubmitting(true);
        setLoading(true);
        const fetchData = async () => {
            const response = await fetchClassification();
            setClassification(response.data.classifications);
            console.log(response.data.classifications);
        };
        fetchData();
    }, []);

    return (
        <div className="flex h-screen flex-col">
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Create PR" />
                <div className="mx-auto flex h-full max-w-[900px] flex-1 flex-col gap-4 px-4">
                    <PrForm
                        classification={classification}
                        purchaseRequestDetails={purchaseRequestDetails}
                        handlePurchaseRequestFieldChange={handlePurchaseRequestFieldChange}
                    />
                    <DataTable items={items} setItems={setItems} showAddRow={true}></DataTable>
                    <TotalItem total={items.length} />
                    <ApproverTable itRelated={purchaseRequestDetails.is_it_related} />
                    <DialogAlert loading={submitting} handleSubmit={handleSubmit} remarkFields={false} />
                </div>
            </AppLayout>
        </div>
    );
}
