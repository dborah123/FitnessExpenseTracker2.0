const stravaBaseUrl = "https://www.strava.com/api/v3";
const expenseBaseUrl = "https://localhost:7241/api/Expenses/"

export function getStravaActivitiesURL() {
    let urlString = stravaBaseUrl + "/athlete/activities/"
    var url = new URL(urlString);

    url.searchParams.append('access_token', 'x');

    return url;
}

export function getExpenseListURL(activity) {

    let urlString = expenseBaseUrl;

    if (activity != null) {
        urlString = urlString + "activity/" + activity;
    }

    var url = new URL(urlString);

    return url;
}