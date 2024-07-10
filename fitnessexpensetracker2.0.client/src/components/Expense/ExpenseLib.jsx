
export const ExpenseTypes = {
    None: "",
    Equipment: 0,
    SeasonPass: 1,
    Ticket: 2,
    Gas: 3,
    Food: 4,
    Donation: 5,
    Other: 6,
}

export function ConvertDate(date) {
    let dateObj = new Date(Date.parse(date));
    let formattedDate = formatDate(dateObj.getFullYear(), dateObj.getMonth, dateObj.getDay);

    return formattedDate;
}

function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
}
