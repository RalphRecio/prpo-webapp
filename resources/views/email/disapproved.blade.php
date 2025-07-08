                <p style="margin-bottom: 16px">
                    We are notifying you of a Purchase Requisition Form made by {{ $data['submitted_by'] }} that requires your approval.
                </p>

                <a href="{{ $data['approver_link'] }}">Click here to view the full request details!</a>

                @if ($data['approver_history'])
                    <table cellpadding="5" cellspacing="0" style="margin: 15px 0; width: 100%; border-collapse: collapse;">
                        <tbody>
                            @foreach($data['approver_history'] as $item)
                                <tr>
                                    <td style="border-bottom: 1px solid #eee;">{{ $item['is_approve'] == 1 ? 'Approved' : 'Disapproved' }} by</td>
                                    <td style="border-bottom: 1px solid #eee;">{{ $item['approver']['job_title'] }}</td>
                                    <td style="border-bottom: 1px solid #eee;">{{ $item['approver']['approver_name'] }}</td>
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