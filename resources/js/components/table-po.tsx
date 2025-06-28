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
    const id = segments[segments.length - 1];

    const [itemDescription, setItemDescription] = useState<string>();
    const [itemDescriptionText, setItemDescriptionText] = useState<string>();
    const [newRow, setNewRow] = useState({
        qty_ordered: 0,
        unit_of_measure: '',
        description1: '',
        description2: '',
        unit_price: 0,
        extended_price: 0,
    });

    const handleAddRow = () => {
        if (!newRow.qty_ordered || !newRow.unit_of_measure || !newRow.unit_price) return;
        setItems([
            ...items,
            {
                ...newRow,
                description1: itemDescriptionText,
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
            },
        ]
    >();

    const getPrItems = async () => {
        try {
            const res = await axios.get('/prpo/purchase-order/pr-items/' + id);

            const options = res.data.map((item: any) => ({
                value: item.id,
                label: item.description,

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
            <div className="rounded bg-white shadow">
                <div className="border" {...props}>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Line</th>
                                <th className="w-24 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Quantity</th>
                                <th className="w-32 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">
                                    Unit of Measure
                                </th>
                                <th className="w-64 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">
                                    Item Description
                                </th>
                                <th className="w-24 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">Unit Price</th>
                                <th className="w-32 px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-900 uppercase">
                                    Extended Price
                                </th>
                                {showAddRow && (
                                    <th className="w-24 px-4 py-2 text-center text-xs font-medium tracking-wider text-gray-900 uppercase">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
                            {showAddRow && (
                                <tr className="hover:bg-gray-50">
                                    <td></td>
                                    <td className="px-4 py-2">
                                        <input
                                            name="quantity"
                                            type="number"
                                            value={newRow.qty_ordered}
                                            onChange={(e) => {
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
                                            type="number"
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
                                        <input
                                            name="extended_price"
                                            value={Number(newRow.unit_price) * Number(newRow.qty_ordered) || 0}
                                            readOnly
                                            className="w-full rounded border bg-gray-100 px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Extended Price"
                                        />
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
                                    <td className="px-4 py-2 font-bold">{0}</td>
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
            </div>
        </>
    );
}
