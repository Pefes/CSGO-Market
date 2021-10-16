export interface UserData {
    username?: string,
    cash?: number,
    userSettings?: UserSettings
}

export interface UserSettings {
    darkTheme?: boolean,
    language?: string
}