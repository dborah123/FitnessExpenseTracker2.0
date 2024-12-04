const stravaBaseUrl = "https://www.strava.com/api/v3";
const expenseBaseUrl = "https://localhost:32771/api/Expenses/"
const registerBaseUrl = "https://localhost:32771/api/Register/"

/**
 * STRAVA AUTH
 */
export function getLoggedInAthleteURL(code) {
    return `https://www.strava.com/api/v3/athlete?access_token=${code}`
}
export function getAuthURL() {
    const clientId = import.meta.env.VITE_APP_CLIENT_ID
    const websiteURL = import.meta.env.VITE_APP_WEBSITE_URL

    return `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${websiteURL}&approval_prompt=force&scope=read,activity:read`;
}

/**
 * EXPENSE TRACKER AUTH 
 */
export function getRegisterClientURL(code) {
    return registerBaseUrl + code;
}

/**
 * STRAVA ACTIVITIES
 */
export function getStravaActivitiesURL(accessToken) {
    let urlString = stravaBaseUrl + "/athlete/activities/";
    var url = new URL(urlString);

    url.searchParams.append('access_token', accessToken);

    return url.toString();
}
/**
 * EXPENSES 
 */
export function getExpenseListURL(activity) {

    let urlString = expenseBaseUrl;

    if (activity !== undefined) {
        urlString = urlString + "activity/" + activity;
    }

    return urlString;
}