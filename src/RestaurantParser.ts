import { MLCEngine } from "@mlc-ai/web-llm";
import { Coordinates } from "./Geolocation";
import { chromium } from "rebrowser-playwright";

interface Restaurant {
    name: string
    cuisine: string
    distance: number
    rating: number
    reviews: Array<string>
}

interface Location {
    coordinates: Coordinates | undefined,
    address: string | undefined
}

export async function getRestaurants(location: Location, engine: MLCEngine): Promise<Array<Restaurant>> {
    let url: string

    if (location.coordinates) {
        url = `
            https://www.google.com/maps/search/restaurants+near+me/@${location.coordinates.latitude},${location.coordinates.longitude}/ 
        `
    } else if (location.address) {
        url = `
            https://www.google.com/maps/search/restaurants+near+${location.address}/
        `
    } else {
        throw new Error("No location passed")
    }

    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(url)

    await browser.close()

    return []
}