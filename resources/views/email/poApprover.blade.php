<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Purchase Order for Approval ({{ $data['po_no'] }})</title>
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
                    {{-- <h6 style="color: #333333; font-size: 12px; font-weight: 600; margin-bottom: 8px">
                        Purchase Order for Approval ({{ $data['po_no'] }})
                    </h6> --}}
                    <p style="margin-bottom: 16px">Good day {{ $data['approver_name'] }},</p>

                    <p style="margin-bottom: 16px">
                        We are notifying you of a Purchase Order made by {{ $data['submitted_by'] }} that requires your approval.
                    </p>

                    <a href="{{ $data['approver_link'] }}">Click here to view the full request details!</a>

                    @if ($data['approver_history'])
                        <table cellpadding="5" cellspacing="0" style="margin: 15px 0; width: 100%; border-collapse: collapse;">
                            <tbody>
                                @foreach($data['approver_history'] as $item)
                                    <tr>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['is_approve'] == 1 ? 'Approved' : 'Disapproved' }} by</td>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['approver']['job_title'] }}</td>
                                        <td style="border-bottom: 1px solid #eee;">{{ $item['approver']['fname'] }} {{ $item['approver']['lname'] }}</td>
                                         <td style="border-bottom: 1px solid #eee;">{{ $item['approval_date'] }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @endif
                    <p style="margin-bottom: 16px">Thank you!</p>
                </td>
            </tr>
        </table>
    </body>
</html>
