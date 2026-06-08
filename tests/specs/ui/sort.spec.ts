import { test, expect } from "settings/fixtures/ui.fixture";
import Env from "settings/env/env.global";
import { InventoryPage } from "page-objects/pages/inventory.page";

// =============================================
// Scenario 1: Default sort state after login
// =============================================
test("Scenario 1: Default sort state after login", async ({ signInPage, page }) => {
    // Step 1: Mo trang login va dang nhap
    await signInPage.login(Env.USERNAME, Env.PASSWORD);

    // Step 2: Khoi tao inventory page
    const inventoryPage = new InventoryPage(page);

    // Step 3: Kiem tra da vao trang inventory chua
    await expect(page).toHaveURL(/inventory/);

    // Step 4: Kiem tra dropdown sort mac dinh la "Name (A to Z)"
    await expect(inventoryPage.elements.sortDropdown()).toHaveValue("az");

    // Step 5: Kiem tra thu tu san pham dung thu tu alphabet
    const names = await inventoryPage.getProductNames();
    expect(names[0]).toBe("Sauce Labs Backpack");
    expect(names[1]).toBe("Sauce Labs Bike Light");
    expect(names[2]).toBe("Sauce Labs Bolt T-Shirt");
    expect(names[3]).toBe("Sauce Labs Fleece Jacket");
    expect(names[4]).toBe("Sauce Labs Onesie");
    expect(names[5]).toBe("Test.allTheThings() T-Shirt (Red)");
});

// =============================================
// Scenario 2: Sort resets after logout and re-login
// =============================================
test("Scenario 2: Sort resets after logout and re-login", async ({ signInPage, page }) => {
    // Step 1: Dang nhap vao trang
    await signInPage.login(Env.USERNAME, Env.PASSWORD);

    // Step 2: Khoi tao inventory page
    const inventoryPage = new InventoryPage(page);

    // Step 3: Doi sort thanh "Name (Z to A)"
    await inventoryPage.sortBy("za");

    // Step 4: Mo hamburger menu va bam logout
    await inventoryPage.logout();

    // Step 5: Kiem tra da ve trang login chua
    await expect(page).toHaveURL(Env.WEB_URL);

    // Step 6: Dang nhap lai
    await signInPage.login(Env.USERNAME, Env.PASSWORD);

    // Step 7: Kiem tra sort da reset ve mac dinh "Name (A to Z)"
    await expect(inventoryPage.elements.sortDropdown()).toHaveValue("az");

    // Step 8: Kiem tra san pham hien thi dung thu tu alphabet
    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
});

// =============================================
// Scenario 3: Sort with items in cart and stable sort
// =============================================
test("Scenario 3: Sort works correctly with items in cart and stable sort", async ({ signInPage, page }) => {
    // Step 1: Dang nhap vao trang
    await signInPage.login(Env.USERNAME, Env.PASSWORD);

    // Step 2: Khoi tao inventory page
    const inventoryPage = new InventoryPage(page);

    // Step 3: Them Sauce Labs Backpack vao gio hang
    await inventoryPage.elements.addToCartBackpack().click();

    // Step 4: Them Sauce Labs Onesie vao gio hang
    await inventoryPage.elements.addToCartOnesie().click();

    // Step 5: Kiem tra gio hang hien thi so 2
    await expect(inventoryPage.elements.cartBadge()).toHaveText("2");

    // Step 6: Sort theo gia cao den thap
    await inventoryPage.sortBy("hilo");

    // Step 7: Kiem tra gio hang van con 2 sau khi sort
    await expect(inventoryPage.elements.cartBadge()).toHaveText("2");

    // Step 8: Kiem tra nut Remove van hien thi cho 2 san pham da them
    await expect(inventoryPage.elements.removeBackpack()).toBeVisible();
    await expect(inventoryPage.elements.removeOnesie()).toBeVisible();

    // Step 9: Sort theo gia thap den cao
    await inventoryPage.sortBy("lohi");

    // Step 10: Kiem tra stable sort - Bolt T-Shirt phai truoc Red T-Shirt (cung gia $15.99)
    const namesLohi = await inventoryPage.getProductNames();
    const boltIndex = namesLohi.indexOf("Sauce Labs Bolt T-Shirt");
    const redIndex = namesLohi.indexOf("Test.allTheThings() T-Shirt (Red)");
    expect(boltIndex).toBeLessThan(redIndex);

    // Step 11: Sort lai theo gia cao den thap, kiem tra stable sort van giu nguyen
    await inventoryPage.sortBy("hilo");
    const namesHilo = await inventoryPage.getProductNames();
    const boltIndex2 = namesHilo.indexOf("Sauce Labs Bolt T-Shirt");
    const redIndex2 = namesHilo.indexOf("Test.allTheThings() T-Shirt (Red)");
    expect(boltIndex2).toBeLessThan(redIndex2);
});