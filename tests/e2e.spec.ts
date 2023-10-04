import { test, expect } from "@playwright/test";

// TODO: i18n
test("has a heading call Sykkelkart", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  const pageHeading = page.getByRole("heading", { name: "Sykkelkart" });
  await expect(pageHeading).toBeVisible();
});

test("should show a map with a marker", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const map = page.getByTestId("bike-map");
  await expect(map).toBeVisible();

  // There should be many markers on the DOM
  const markers = page.locator('div[aria-label="Map marker"]');
  const markerCount = await markers.count();

  expect(markerCount).toBeGreaterThan(0);
});

test("should let user provide device location", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const getPositionButton = page.getByRole("button", {
    name: "Del din lokasjon",
  });
  await expect(getPositionButton).toBeVisible();

  await getPositionButton.click();

  const successMessage = page.getByTestId(
    "position-permission-success-message"
  );

  // Getting location might take time
  await expect(successMessage).toBeVisible();
});
