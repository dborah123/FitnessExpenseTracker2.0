
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
    return dateObj.toISOString().split('T')[0];
}
