{{-- filepath: resources/views/printable/po_print.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <title>Purchase Order</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite('resources/css/app.css') 
    
    <script src="https://cdn.tailwindcss.com"></script>{{-- Make sure Tailwind is included --}}
</head>
<body class="bg-white text-[11px] font-sans">
<div class="max-w-3xl mx-auto p-6 bg-white text-[11px] min-h-[950px] print:min-h-[950px] flex flex-col justify-between">
    <div class="flex items-center mb-2">
        <img src="{{ asset('storage/suhay_logo.png') }}" alt="Suhay Logo" class="h-12 mr-4">
        <div class="flex-1"></div>
    </div>
    <div class="mb-2 text-[10px] leading-tight">
        <div class="font-bold">Unit 18, 2/F Paseo 4B, Paseo de Sta. Rosa, Brgy. Don Jose, Sta. Rosa City, Laguna</div>
        <div class="font-bold">T - 632.809.0155 | F - 632.807.7419</div>
        <div class="font-bold">TIN : 753-162-707 VAT</div>
    </div>
    <table class="w-full mb-2">
        <tr class="border-b border-black border-gray-600">
            <td></td>
            <td class="text-right">
                <h2 class="text-xl font-bold">PURCHASE ORDER</h2>
            </td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right align-middle">
                <span class="font-bold">Date: {{ $purchaseOrder->created_at ?? '___________' }} | </span>
                <span class="font-bold">NO: {{ $purchaseOrder->po_no ?? '___________' }}</span>
            </td>
        </tr>
    </table>

    <table class="w-full border border-black">
        <tr>
            <td class="w-1/2 h-16 align-top border border-black p-2">
                <span class="font-bold">Vendor:</span><br>
                {{ $purchaseOrder->vendor_name }}<br>
                {{ $purchaseOrder->vendor_address }}<br>
            </td>
            <td class="w-1/2 align-top border border-black p-2">
                <span class="font-bold">Ship To:</span><br>
                {{ $purchaseOrder->ship_to ?? '' }}<br>
                {{ $purchaseOrder->ship_to_address ?? '' }}
            </td>
        </tr>
    </table>

    <table class="w-full border border-black mt-1">
        <tr>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Vendor Contact Person:</span>
                <span>{{ $purchaseOrder->vendor_contact_person }}</span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Vendor Fax No.:</span>
                <span></span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Vendor Tel. No.:</span>
                <span>{{ $purchaseOrder->vendor_tel_no }}</span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Ship Via:</span>
                <span>{{ $purchaseOrder->ship_via }}</span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Terms:</span>
                <span>{{ $purchaseOrder->terms }}</span>
            </td>
        </tr>
    </table>

    <table class="w-full border border-black mt-1">
        <tr>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Buyer:</span>
                <span>{{ $purchaseOrder->buyer }}</span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Confirming To:</span>
                <span>{{ $purchaseOrder->confirming_to }}</span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">PR NO.:</span>
                <span>{{ $purchaseOrder->purchaseRequest->pr_no }}</span>
            </td>
            <td class="border border-black p-2 w-1/5 align-top">
                <span class="font-bold block">Freight:</span>
                <span>{{ $purchaseOrder->freight }}</span>
            </td>
        </tr>
        <tr>
            <td colspan="5" class="border border-black p-2 align-top">
                <span class="font-bold block">Remarks:</span>
                <span>{{ $purchaseOrder->remarks }}</span>
            </td>
        </tr>
    </table>

    <table class="w-full border border-black mt-1 flex-grow">
        <thead>
            <tr class="bg-gray-100 text-center">
                <th class="border border-black p-1 font-bold w-10">Line</th>
                <th class="border border-black p-1 font-bold w-16">Qty. Ordered</th>
                <th class="border border-black p-1 font-bold w-24">Unit of Measure</th>
                <th class="border border-black p-1 font-bold w-2/5">Item Description</th>
                <th class="border border-black p-1 font-bold w-24">Unit Price</th>
                <th class="border border-black p-1 font-bold w-24">Extended Price</th>
            </tr>
        </thead>
        <tbody>
            @php
                $subTotal = 0;
                $rowCount = count($purchaseOrder->purchase_order_details ?? []);
                $minRows = 10; // Adjust this number for your desired minimum table height
            @endphp
            @foreach(($purchaseOrder->purchase_order_details ?? []) as $i => $item)
                @php
                    $lineTotal = floatval($item['unit_price']) * floatval($item['qty_ordered']);
                    $subTotal += $lineTotal;
                @endphp
                <tr>
                    <td class="border border-black text-center p-1 w-10">{{ $i + 1 }}</td>
                    <td class="border border-black text-center p-1 w-16">{{ $item['qty_ordered'] }}</td>
                    <td class="border border-black text-center p-1 w-24">{{ $item['unit_of_measure'] }}</td>
                    <td class="border border-black p-1 w-2/5">{{ $item['description'] ?? ($item['description1'] ?? '') }} {{ $item['description2'] ?? '' }}</td>
                    <td class="border border-black text-right p-1 w-24">{{ number_format($item['unit_price'], 2) }}</td>
                    <td class="border border-black text-right p-1 w-24">{{ number_format($lineTotal, 2) }}</td>
                </tr>
            @endforeach

            {{-- Add empty rows to fill the page --}}
            @for($j = $rowCount; $j < $minRows; $j++)
                <tr>
                    <td class="border border-black text-center p-1 w-10">&nbsp;</td>
                    <td class="border border-black text-center p-1 w-16">&nbsp;</td>
                    <td class="border border-black text-center p-1 w-24">&nbsp;</td>
                    <td class="border border-black p-1 w-2/5">&nbsp;</td>
                    <td class="border border-black text-right p-1 w-24">&nbsp;</td>
                    <td class="border border-black text-right p-1 w-24">&nbsp;</td>
                </tr>
            @endfor

            <tr>
                <td colspan="5" class="text-right font-bold text-black border border-black p-1">SUB TOTAL</td>
                <td class="text-right font-bold text-black border border-black p-1 w-24">₱{{ number_format($subTotal, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <table class="w-full border border-black mt-1">
        <tr>
            {{-- Prepared By --}}
            <td class="border border-black p-2 w-1/3 align-bottom">
                <div class="flex flex-col h-full justify-between">
                    <span class="font-bold mb-2">Prepared By:</span>
                    <div class="flex flex-col h-full justify-between">
                        <span class="font-bold text-center">Prepared Date {{ $purchaseOrder->preparedBy->created_at ?? '' }}</span>
                        <span class="italic mb-1 text-center">System Generated</span>
                        <span class="font-bold text-xs text-center">{{ $purchaseOrder->preparedBy->fname ?? '' }} {{ $purchaseOrder->preparedBy->lname ?? '' }}</span>
                        <span class="block text-center">{{ $purchaseOrder->preparedBy->position ?? 'Position/Designation' }}</span>
                    </div>
                </div>
            </td>
            {{-- Reviewed By (First Approver) --}}
            <td class="border border-black p-2 w-1/3 align-bottom">
                <div class="flex flex-col h-full justify-between">
                    <span class="font-bold mb-2">Reviewed By:</span>
                    @php
                        $reviewer = $purchaseOrder->poApproversList[0]['approver'] ?? null;
                        $status = $purchaseOrder->poApproversList[0]['is_approve'] ?? '';
                        if ($status === '1') {
                            $statusText = 'Approved';
                        } elseif ($status === '2') {
                            $statusText = 'Disapproved';
                        } else {
                            $statusText = 'Pending';
                        }
                        $approvalDate = $purchaseOrder->poApproversList[0]['approval_date'] ?? '';
                    @endphp
                    <div class="flex flex-col h-full justify-between">
                        <span class="font-bold text-center 
                            @if($statusText === 'Approved') text-green-600 
                            @elseif($statusText === 'Disapproved') text-red-600 
                            @else text-yellow-500 
                            @endif">
                            {{ $statusText }} {{ $approvalDate }}
                        </span>
                        {{-- System Generated --}}
                        <span class="italic mb-1 text-center">System Generated</span>
                        <span class="font-bold text-xs text-center">{{ $reviewer['fname'] ?? '' }} {{ $reviewer['lname'] ?? '' }}</span>
                        <span class="block text-center">{{ $reviewer['position'] ?? '' }}</span>
                    </div>
                </div>
            </td>
            {{-- Approved By (Second Approver) --}}
            <td class="border border-black p-2 w-1/3 align-bottom">
                <div class="flex flex-col h-full justify-between">
                    <span class="font-bold mb-2">Approved By:</span>
                    @php
                        $approver = $purchaseOrder->poApproversList[1]['approver'] ?? null;
                        $status = $purchaseOrder->poApproversList[1]['is_approve'] ?? '';
                        if ($status === '1') {
                            $statusText = 'Approved';
                        } elseif ($status === '2') {
                            $statusText = 'Disapproved';
                        } else {
                            $statusText = 'Pending';
                        }
                        $approvalDate = $purchaseOrder->poApproversList[1]['approval_date'] ?? '';
                    @endphp
                    <div class="flex flex-col h-full justify-between">
                        <span class="font-bold text-center 
                            @if($statusText === 'Approved') text-green-600 
                            @elseif($statusText === 'Disapproved') text-red-600 
                            @else text-yellow-500 
                            @endif">
                            {{ $statusText }} {{ $approvalDate }}
                        </span>
                        <span class="italic mb-1 text-center">System Generated</span>
                        <span class="font-bold text-xs text-center">
                            {{ $approver['fname'] ?? '' }} {{ $approver['lname'] ?? '' }}
                        </span>
                        <span class="block text-center">{{ $approver['position'] ?? '' }}</span>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>
<script>
    window.onload = function() {
        // Find and remove the timestamp in a specific element (e.g., footer)
        var timestamp = document.querySelector('.timestamp');  // Assuming the timestamp has a class 'timestamp'
        if (timestamp) {
            timestamp.style.display = 'none';  // Hide it
        }
        
        // Trigger the print dialog
        window.print();
    };
</script>
</body>
</html>