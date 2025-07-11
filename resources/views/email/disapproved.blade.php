<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Purchase Requisition Disapproved ({{ $data['pr_no'] }})</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px">
        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
                background-color: #ffffff;
                max-width: 600px;
                margin: auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            "
        >
            <tr>
                <td>
                    <h6 style="color: #dc2626; font-size: 12px; font-weight: 600; margin-bottom: 8px">
                        Purchase Requisition Disapproved ({{ $data['pr_no'] }})
                    </h6>
                    <p style="margin-bottom: 16px">Hello {{ $data['requestor_name'] }},</p>

                    <p style="margin-bottom: 16px">
                        We regret to inform you that your Purchase Requisition has been <strong>disapproved</strong> by {{ $data['approver_name'] }}.
                    </p>

                    <a href="{{ $data['view_link'] }}" style="color: #dc2626; font-weight: bold;">Click here to view the request details and disapproval reason.</a>

                    @if ($data['approver_history'])
                        <table cellpadding="5" cellspacing="0" style="margin: 15px 0; width: 100%; border-collapse: collapse;">
                            <tbody>
                                @foreach($data['approver_history'] as $item)
                                    <tr>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['approver2']['approver_type'] == 'finance' || $item['approver2']['approver_type'] =='procurement' ? 'Reviewed' : ($item['is_approve'] == 1 ? 'Approved' : 'Disapproved')  }} by</td>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['approver2']['job_title'] }}</td>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['approver']['fname'] }} {{ $item['approver']['lname'] }}</td>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['approval_date'] }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @endif

                    <p style="margin-bottom: 16px">Thank you.</p>
                </td>
            </tr>
        </table>
    </body>
</html>
