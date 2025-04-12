import { Player } from "../models/player.model";

/**
* mapApiPlayerToPlayer
* Maps a raw player object received from the external API to your internal `Player` model.
*
* This function handles:
* - Renaming fields to match your app's data structure
* - Converting height (from feet-inches to meters)
* - Converting weight (from pounds to kilograms)
* - Fallbacks for unknown or missing data
*
* @param apiPlayer - The raw player data object returned by the API
* @returns A fully mapped and formatted Player object
*/
export function mapApiPlayerToPlayer(apiPlayer: any): Player {
    return {
        id: apiPlayer.id,
        name: apiPlayer.first_name,
        surName: apiPlayer.last_name,
        height: apiPlayer.height
        ? convertHeightToMeters(apiPlayer.height)
        : '(Desconocido)', // Fallback if height is missing
        weight: apiPlayer.weight
        ? convertWeightToKg(apiPlayer.weight)
        : '(Desconocido)',  // Fallback if weight is missing
        country: apiPlayer.country,
        number: apiPlayer.jersey_number,
        position: apiPlayer.position,
        team: apiPlayer.team ? apiPlayer.team.full_name : '' // Fallback to empty string if no team
    }
}


/**
* convertHeightToMeters
* Converts a height string from format "feet-inches" (e.g., "6-5") to meters with 2 decimals.
*
* @param height - Height in string format (e.g. "6-3")
* @returns A string with the height in meters, formatted with unit (e.g. "1.91 M")
*/
function convertHeightToMeters(height: string): string {
    const [feet, inches] = height.split('-').map(Number);
    const meters = ((feet*30.48) + (inches * 2.54)) / 100;
    return meters.toFixed(2) + ' M';
}


/**
* convertWightToKg
* Converts weight from pounds (string) to kilograms.
*
* @param pounds - Weight in pounds as string
* @returns A string with the weight in kilograms (e.g. "92.3 Kg")
*/
function convertWeightToKg(pounds: string): string {
    const kg = parseFloat(pounds) * 0.453592;
    return kg.toFixed(1) + ' Kg'
}