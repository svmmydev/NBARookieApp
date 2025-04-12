/**
* Player
* Defines the structure of a Player object used internally in the application.
* All fields are formatted and ready to display (e.g., height in meters, weight in kg).
*/
export interface Player {
    id: number;
    name: string;
    surName: string;
    height: string;
    weight: string;
    country: string;
    number: number;
    position: string;
    team: string;
}
