import { PurchaseRequisitionItem } from '@/types';

interface PoFormProps extends React.ComponentProps<'div'> {
    purchaseRequestItems: PurchaseRequisitionItem[];
}

export default function PrItems({ purchaseRequestItems }: PoFormProps) {
    return (
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
            {/* {
      "id": 10,
      "pr_id": "10",
      "qty_in_figures": "991",
      "uom": "1",
      "description": "1",
      "status": null,
      "created_at": "2025-07-14T02:31:02.973000Z",
      "updated_at": "2025-07-14T05:37:11.577000Z"
    } */}
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Item No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Qty. Remaining</th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Unit of measure</th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Description/Specification</th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Item Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider uppercase">Forced Closed</th>
                </tr>
            </thead>
            <tbody>
                {purchaseRequestItems.map((item: PurchaseRequisitionItem, index: number) => (
                    <tr className="hover:bg-gray-50" key={item.id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{item.qty_in_figures}</td>
                        <td className="px-4 py-2">{item.uom}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2">{item.status}</td>
                        <td className="px-4 py-2">{item.status ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
