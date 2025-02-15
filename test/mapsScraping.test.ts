import { expect, test } from "@playwright/test"

let url = `
    https://www.google.com/maps/search/restaurants+near+Hastings+Sunrise/
`

test("it should go to the page and not get blocked", async ({ page, context }) => {
    await page.goto(url)
    await expect(page).toHaveTitle("restaurants near Hastings Sunrise - Google Maps")
})

