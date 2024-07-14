import { getLoggedInAthleteURL, getRegisterClientURL } from './urllib';
import axios from 'axios';

/**
 * STRAVA APIS
 */
export const getLoggedInAthelete = async (code) => {
    if (code == null) {
        return { "errors": "No access code" };
    }
    let response = await axios.get(getLoggedInAthleteURL(code));

    return response.data;
}

/**
 * FITNESS EXPENSE TRACKER APIS
 */
export const registerClient = async (code) => {
    let response = await axios.get(getRegisterClientURL(code));

    return response.data;
}