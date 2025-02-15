export interface Coordinates {
    latitude: number
    longitude: number
}

export async function getCoordinates(): Promise<Coordinates | undefined> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            const result: Coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }

            return result
        })
    }

    return undefined
}