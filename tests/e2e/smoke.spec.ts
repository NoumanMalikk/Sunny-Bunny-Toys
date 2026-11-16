import { expect, test } from "@playwright/test";

const CART_STORAGE_KEY = "sunny-bunny-cart";

test.describe("Sunny Bunny Toy Co. smoke tests", () => {
  test("homepage loads with hero pause control", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const pauseButton = page.getByRole("button", { name: /pause slideshow/i });
    await expect(pauseButton).toBeVisible();
    await pauseButton.click();
    await expect(page.getByRole("button", { name: /resume slideshow/i })).toBeVisible();
  });

  test("shop lists 26 active products", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByRole("heading", { name: /all products/i })).toBeVisible();
    const productCards = page.locator('ul[role="list"] > li');
    await expect(productCards).toHaveCount(26);
  });

  test("search finds plush bunny results", async ({ page }) => {
    await page.goto("/search?q=plush+bunny");
    await expect(page.getByText(/results for/i)).toBeVisible();
    await expect(page.getByText(/honeyhop/i)).toBeVisible();
  });

  test("product page shows age grade and safety warning", async ({ page }) => {
    await page.goto("/product/colorway-magnetic-building-tiles-64-piece");
    await expect(page.getByLabel(/recommended ages/i).first()).toBeVisible();
    await expect(page.getByRole("note", { name: /safety warning/i })).toBeVisible();
  });

  test("wishlist add works on product page", async ({ page }) => {
    await page.goto("/product/honeyhop-plush-bunny-12-inch");
    const wishlistButton = page.getByRole("button", { name: /^wishlist$/i });
    await wishlistButton.click();
    await expect(page.getByRole("button", { name: /^saved$/i })).toBeVisible();
  });

  test("product page allows add to cart in demo mode", async ({ page }) => {
    await page.goto("/product/honeyhop-plush-bunny-12-inch");
    await expect(page.getByRole("button", { name: /^add to cart$/i }).first()).toBeVisible();
    await page.getByRole("button", { name: /^add to cart$/i }).first().click();
    await expect(page.getByText(/added to cart/i).first()).toBeVisible({ timeout: 5000 });
  });

  test("checkout opens with demo notice when cart is seeded", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(
      ({ cartKey, item }) => {
        const payload = {
          state: {
            items: [item],
            giftNote: "",
            isGift: false,
            hidePrices: true,
            giftWrap: false,
          },
          version: 0,
        };
        localStorage.setItem(cartKey, JSON.stringify(payload));
      },
      {
        cartKey: CART_STORAGE_KEY,
        item: {
          productId: "p01",
          slug: "honeyhop-plush-bunny-12-inch",
          title: "Honeyhop Plush Bunny, 12 Inch, Butter Yellow",
          price: 24,
          quantity: 1,
          image: "/products/honeyhop-plush-bunny-12-inch/main.webp",
          ageMinimum: 3,
          ageMaximum: null,
          warningText: null,
          warningRequired: false,
          pieceCount: 1,
          maxQty: 10,
          incomplete: false,
          complianceVerified: true,
        },
      },
    );

    await page.goto("/checkout");
    await expect(page.getByRole("heading", { name: /^checkout$/i })).toBeVisible();
    await expect(page.getByText(/not active on this site yet/i).first()).toBeVisible();
  });

  test("/admin route returns 404", async ({ page }) => {
    const response = await page.goto("/admin");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /page not found|wandered off/i })).toBeVisible();
  });

  test("mobile navigation opens and shows category links", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("navigation", { name: /shop categories/i })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /shop categories/i }).getByRole("link", { name: "Dolls & Plush" }),
    ).toBeVisible();
  });
});
