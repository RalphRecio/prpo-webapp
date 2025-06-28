<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Request for Approval</title>
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
                    <h2 style="color: #333333; font-size: 24px; font-weight: 600; margin-bottom: 8px">📝 Request for Approval</h2>
                    <p style="margin-bottom: 16px">Hello {{ $data['approver_name'] }},</p>

                    <p style="margin-bottom: 16px">A new request has been submitted and is awaiting your review and approval.</p>

                    <table cellpadding="5" cellspacing="0" style="margin: 15px 0">
                        <tr>
                            <td style="padding-right: 8px; font-weight: 600; color: #374151">Request Type: {{ $data['request_type'] }}</td>
                            <td style="color: #374151"></td>
                        </tr>
                        <tr>
                            <td style="padding-right: 8px; font-weight: 600; color: #374151">Purchase Request No.:</td>
                            <td style="color: #374151">{{ $data['pr_no'] }}</td>
                        </tr>
                        <tr>
                            <td style="padding-right: 8px; font-weight: 600; color: #374151">Submitted By:</td>
                            <td style="color: #374151">{{ $data['submitted_by'] }}</td>
                        </tr>
                        <tr>
                            <td style="padding-right: 8px; font-weight: 600; color: #374151">Date Submitted:</td>
                            <td style="color: #374151">{{ $data['date_submitted'] }}</td>
                        </tr>
                    </table>

                    <p style="margin-bottom: 16px">Please take the appropriate action by clicking the link below:</p>

                    <p>
                        <a
                            href="{{ $data['approver_link'] }}"
                            style="
                                display: inline-block;
                                background-color: #1e40af;
                                color: white;
                                padding: 10px 15px;
                                text-decoration: none;
                                border-radius: 5px;
                            "
                            >View Details</a
                        >
                    </p>
                </td>
            </tr>
        </table>
    </body>
</html>
