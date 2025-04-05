import { Player } from "../models/player.model";

export function mapApiPlayerToPlayer(apiPlayer: any): Player {
    return {
        id: apiPlayer.id,
        name: apiPlayer.first_name,
        surName: apiPlayer.last_name,
        height: apiPlayer.height ? convertHeightToMeters(apiPlayer.height) : '(Desconocido)',
        weight: apiPlayer.weight ? convertWightToKg(apiPlayer.weight) : '(Desconocido)',
        country: apiPlayer.country,
        number: apiPlayer.jersey_number,
        position: apiPlayer.position,
        team: apiPlayer.team ? apiPlayer.team.full_name : ''
    }
}

function convertHeightToMeters(height: string): string {
    const [feet, inches] = height.split('-').map(Number);
    const meters = ((feet*30.48) + (inches * 2.54)) / 100;
    return meters.toFixed(2) + ' M';
}

function convertWightToKg(pounds: string): string {
    const kg = parseFloat(pounds) * 0.453592;
    return kg.toFixed(1) + ' Kg'
}