import { expect, test } from "@playwright/test"

let url = `
    https://www.google.com/maps/search/restaurants+near+Hastings+Sunrise/
`

test("it should go to the page and not get blocked", async ({ page, context }) => {
    await page.goto(url)
    await expect(page).toHaveTitle("restaurants near Hastings Sunrise - Google Maps")
})

test("it should find Roundel Restaurant", async ({ page }) => {
    await page.goto(url)
    await expect(page.getByText("Roundel Restaurant & Bar")).toBeTruthy()
})

test("it should find the result feed", async ({ page }) => {
    await page.goto(url)
    await expect(page.getByRole("feed")).toBeTruthy()
})

test("it should find restaurants with aria-label", async ({ page }) => {
    await page.goto(url)
    const aWithLabels = await page.getByRole("feed").locator("a[aria-label]").all()
    expect(aWithLabels.length).toBeGreaterThan(1)
})

test("it should scroll down and find more restaurants", async ({ page }) => {
    await page.goto(url)
    const labelsBeforeScrolling = await page.getByRole("feed").locator("a[aria-label]").all()

    await labelsBeforeScrolling[0].hover()
    await page.mouse.wheel(0, 9999999)
    // await labelsBeforeScrolling[labelsBeforeScrolling.length - 1].scrollIntoViewIfNeeded()
    const labelsAfterScrolling = await page.getByRole("feed").locator("a[aria-label]").all()
    expect(labelsAfterScrolling.length > labelsBeforeScrolling.length).toBeTruthy()
})

test("it should scroll down until it finds 50 restaurants", async ({ page }) => {
    await page.goto(url)
    let labels = await page.getByRole("feed").locator("a[aria-label]").all()

    await labels[0].hover()

    while (labels.length < 50) {
        await page.mouse.wheel(0, 9999999)
        // await labels[labels.length - 1].scrollIntoViewIfNeeded()
        labels = await page.getByRole("feed").locator("a[aria-label]").all()
    }

    expect(labels.length).toBeGreaterThanOrEqual(50)
})

test("it should pull ratings", async ({ page }) => {
    await page.goto(url)
    const restaurantLabels = await page.getByRole("feed").locator("a[aria-label]").all()

    for (const restaurantLabel of restaurantLabels) {
        const parent = restaurantLabel.locator("..")
        const spans = await parent.locator("span").all()

        spans.filter(async (span) => {
            const regex = /(\d+\.\d+) stars (\d+) Reviews/
            const ariaLabel = await span.getAttribute("aria-label")
            return ariaLabel?.match(regex)
        })
    }
})
