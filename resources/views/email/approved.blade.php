<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Request Approved</title>
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
                    <h2 style="color: #16a34a; font-size: 24px; font-weight: 600; margin-bottom: 8px">✅ Request Approved</h2>
                    <p style="margin-bottom: 16px">Hello {{ $data['submitted_by'] }},</p>

                    <p style="margin-bottom: 16px">
                        Your request has been reviewed and <strong>approved</strong> by {{ $data['approver_name'] }}.
                    </p>

                    <table cellpadding="5" cellspacing="0" style="margin: 15px 0">
                        <tr>
                            <td style="padding-right: 8px; font-weight: 600; color: #374151">Request Type:</td>
                            <td style="color: #374151">{{ $data['request_type'] }}</td>
                        </tr>
                        <tr>
                            <td style="padding-right: 8px; font-weight: 600; color: #374151">Purchase Request No.:</td>
                            <td style="color: #374151">{{ $data['pr_no'] }}</td>
                        </tr>
                   
                    </table>

                    <p style="margin-bottom: 16px">
                        You may view the request details by clicking the link below:
                    </p>

                    <p>
                        <a
                            href="{{ $data['view_link'] }}"
                            style="
                                display: inline-block;
                                background-color: #16a34a;
                                color: white;
                                padding: 10px 15px;
                                text-decoration: none;
                                border-radius: 5px;
                            "
                            >View Approved Request</a
                        >
                    </p>
                </td>
            </tr>
        </table>
    </body>
</html>
