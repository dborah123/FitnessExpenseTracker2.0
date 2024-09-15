export const ActivityTypes = {
    Biking: 0,
    Skiing: 1,
}

export const StravaActivityTypes = {
    Ride: "Ride",
    MTBRide: "MountainBikeRide",
    Skiing: "Skiing",
}

export const StravaToInternal = (stravaActivityType) => {
    switch (stravaActivityType) {
        case StravaActivityTypes.Ride:
        case StravaActivityTypes.MTBRide:
            return ActivityTypes.Biking;
        case StravaActivityTypes.Skiing:
            return StravaActivityTypes.Skiing;
        default:
            return -1;
    }
}

export const InternalToStrava = (internalActivityType) => {
    switch (internalActivityType) {
        case ActivityTypes.Biking:
            return StravaActivityTypes.Ride;
        case ActivityTypes.Skiing:
            return StravaActivityTypes.Skiing;
        default:
            return "";
    }
}

export const getActivityTypeName = (activityType) => {
    switch (activityType) {
        case StravaActivityTypes.Ride:
            return "Road Ride";
        case StravaActivityTypes.MTBRide:
            return "Mountain Bike Ride";
        case StravaActivityTypes.Skiing:
            return "Skiing";
        default:
            return "";
    }
}

export const isSupportedActivityType = (activityType) => {

    switch (activityType) {
        case StravaActivityTypes.Ride:
        case StravaActivityTypes.MTBRide:
        case StravaActivityTypes.Skiing:
            return true;
        default:
            return false;

    }
}