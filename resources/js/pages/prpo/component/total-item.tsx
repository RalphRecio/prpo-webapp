// Add the following line to ensure TypeScript knows about the module types
// @ts-ignore
import { toWords } from 'number-to-words';
interface TotalItemProps {
    total: number;
}

export default function TotalItem({ total = 0 }: TotalItemProps) {
    return (
        <div className="flex w-full items-center justify-between rounded border bg-white p-4 shadow">
            <span className="mb-2 flex-1 text-sm text-gray-900">This requisition consists of</span>
            <span className="mb-2 flex-1 text-sm font-bold text-gray-900">{toWords(total)} (Words)</span>
            <span className="mb-2 flex-1 text-sm font-bold text-gray-900">{total.toLocaleString()} (Figures)</span>

            <span className="flex-1 text-sm text-gray-700">Items</span>
        </div>
    );
}
