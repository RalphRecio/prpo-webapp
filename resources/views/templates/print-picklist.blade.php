<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Picklist</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>Picklist</h1>
    <p><strong>Transaction ID:</strong> {{ $data['transaction_id'] }}</p>
    <p><strong>Customer Name:</strong> {{ $data['customer_name'] }}</p>
    <p><strong>PO:</strong> {{ $data['po'] }}</p>
    <p><strong>Status:</strong> {{ $data['status'] }}</p>


    <table>
        <thead>
            <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Location</th>
                <th>Lot Code</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Mfg Date</th>
                <th>Exp Date</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data['items'] as $item)
                <tr>
                    <td>{{ $item['product_code'] }}</td>
                    <td>{{ $item['product_name'] }}</td>
                    <td>{{ $item['location'] }}</td>
                    <td>{{ $item['lot_code'] }}</td>
                    <td>{{ $item['quantity'] }}</td>
                    <td>{{ $item['uom'] }}</td>
                    <td>{{ $item['mfg_date'] }}</td>
                    <td>{{ $item['exp_date'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>