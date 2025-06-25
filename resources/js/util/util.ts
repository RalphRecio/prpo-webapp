export function formatWithCommas(value: string): string {
    const [intPart, decimalPart] = value.replace(/,/g, '').split('.');
    const formattedInt = Number(intPart || '0').toLocaleString('en-US');
    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
}
