import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PurchaseOrderDetails } from '@/types';
import axios from 'axios';
import { Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface DataTableProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar';
    items: PurchaseOrderDetails[];
    setItems: React.Dispatch<React.SetStateAction<PurchaseOrderDetails[]>>;
    showAddRow: boolean;
}

export function TablePo({ variant = 'header', items, setItems, showAddRow, ...props }: DataTableProps) {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 2];

    const [itemDescription, setItemDescription] = useState<string>();
    const [itemDescriptionText, setItemDescriptionText] = useState<string>();
    const [prDetailsId, setPrDetailsId] = useState<number>();
    const [qtyInFigures, setQtyInFigures] = useState<number>();

    const [newRow, setNewRow] = useState({
        qty_ordered: 0,
        unit_of_measure: '',
        description1: '',
        description2: '',
        unit_price: 0,
        extended_price: 0,
        qty_in_figures: 0,
    });

    const handleAddRow = () => {
        if (!newRow.qty_ordered || !newRow.unit_of_measure || !newRow.unit_price) return;
        setItems([
            ...items,
            {
                ...newRow,
                description1: itemDescriptionText,

                qty_in_figures: qtyInFigures,
                pr_details_id: prDetailsId,
                id: Date.now(),
            },
        ]);
        setNewRow({
            qty_ordered: 0,
            unit_of_measure: '',
            description1: '',
            description2: '',
            unit_price: 0,
            extended_price: 0,
            qty_in_figures: 0,
        });
    };

    const handleDeleteRow = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const [prItemsOptions, setPrItemOption] = useState<
        [
            {
                value: string;
                label: string;
                description: string;
                pr_details_id: number;
                qty_in_figures: number;
            },
        ]
    >();

    const getPrItems = async () => {
        try {
            const res = await axios.get('/prpo/purchase-order/pr-items/' + id);

            const options = res.data.map((item: any) => ({
                value: item.id,
                label: item.description,

                qty_in_figures: item.qty_in_figures,
                pr_details_id: item.id,
                uom: item.uom,
            }));

            setPrItemOption(options);
        } catch (error) {
            console.error('Error fetching PR items:', error);
        }
    };

    useEffect(() => {
        getPrItems();
    }, []);

    return (
        <>
            <div className="rounded bg-white">
                <div {...props}>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">#</th>
                                <th className="w-24 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Quantity</th>
                                <th className="w-24 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">
                                    Unit of Measure
                                </th>
                                <th className="w-64 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">
                                    Item Description
                                </th>
                                <th className="w-24 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Unit Price</th>
                                <th className="w-18 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">
                                    Extended Price
                                </th>
                                {showAddRow && (
                                    <th className="w-20 px-4 py-2 text-center text-xs font-medium tracking-wider text-gray-900 uppercase">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
                            {showAddRow && (
                                <tr className="hover:bg-gray-50">
                                    <td></td>
                                    <td className="px-4 py-2">
                                        {/* <span className="text-xs">{qtyInFigures ? `Avail Qty: ${qtyInFigures}` : ''}</span> */}
                                        <input
                                            name="quantity"
                                            type="number"
                                            value={newRow.qty_ordered}
                                            onChange={(e) => {
                                                if (Number(e.target.value) < 0) {
                                                    return;
                                                }
                                                if (Number(e.target.value) > Number(qtyInFigures)) {
                                                    return;
                                                }
                                                setNewRow({
                                                    ...newRow,
                                                    qty_ordered: Number(e.target.value),
                                                });
                                            }}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Quantity"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="unit_of_measure"
                                            value={newRow.unit_of_measure}
                                            onChange={(e) => {
                                                setNewRow({
                                                    ...newRow,
                                                    unit_of_measure: e.target.value,
                                                });
                                            }}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="UOM"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <Select
                                            id="item_description"
                                            placeholder="Select Item"
                                            isClearable
                                            options={prItemsOptions}
                                            value={prItemsOptions?.find((option) => option.value === itemDescription) || null}
                                            onChange={(selectedOption: any) => {
                                                setItemDescription(selectedOption.value);
                                                setItemDescriptionText(selectedOption.label);
                                                setPrDetailsId(selectedOption.pr_details_id);
                                                setQtyInFigures(selectedOption.qty_in_figures);
                                            }}
                                        />
                                        <Textarea
                                            value={newRow.description2}
                                            onChange={(e) => {
                                                setNewRow({
                                                    ...newRow,
                                                    description2: e.target.value,
                                                });
                                            }}
                                            className="mt-1"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="unit_price"
                                            type="text"
                                            value={newRow.unit_price}
                                            onChange={(e) => {
                                                setNewRow({
                                                    ...newRow,
                                                    unit_price: Number(e.target.value),
                                                });
                                            }}
                                            className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Status"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <span>{Number(newRow.unit_price) * Number(newRow.qty_ordered) || 0}</span>
                                        {/* <input
                                            name="extended_price"
                                            value=
                                            readOnly
                                            className="w-full rounded border bg-gray-100 px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Extended Price"
                                        /> */}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <Button onClick={handleAddRow} type="button" variant="outline" size="sm">
                                            <Plus />
                                        </Button>
                                    </td>
                                </tr>
                            )}

                            {items.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 font-bold">{index + 1}</td>
                                    <td className="px-4 py-2">{item.qty_ordered}</td>
                                    <td className="px-4 py-2">{item.unit_of_measure}</td>
                                    <td className="px-4 py-2">{`${item.description1} ${item.description2}`}</td>
                                    <td className="px-4 py-2">{item.unit_price}</td>
                                    <td className="px-4 py-2">{(item.unit_price * item.qty_ordered).toFixed(2)}</td>
                                    {showAddRow && (
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button onClick={() => handleDeleteRow(index)} type="button" size="sm" variant="default">
                                                    <Trash />
                                                </Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end border-t bg-gray-50 px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">
                        Total:&nbsp;
                        {items
                            .reduce((sum, item) => sum + Number(item.unit_price) * Number(item.qty_ordered), 0)
                            .toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}
                    </span>
                </div>
            </div>
        </>
    );
}
