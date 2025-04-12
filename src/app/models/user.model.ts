/**
* User
* Represents an authenticated user in the application.
* This model is used internally to store and manage essential user information.
*/
export interface User {
    uid: string;
    email: string;
    username: string;
}