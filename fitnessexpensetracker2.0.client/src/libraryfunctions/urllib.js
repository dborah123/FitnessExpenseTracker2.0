const stravaBaseUrl = "https://www.strava.com/api/v3";

export function getStravaActivitiesURL() {
    let urlString = stravaBaseUrl + "/athlete/activities/"
    var url = new URL(urlString);

    url.searchParams.append('access_token', 'x');

    return url;
}