import { Page } from "@playwright/test";

export class InventoryPage {
    constructor(protected page: Page) {}

    elements = {
        // dropdown sort san pham
        sortDropdown: () => this.page.locator('.product_sort_container'),
        // tat ca ten san pham
        productNames: () => this.page.locator('.inventory_item_name'),
        // gio hang badge
        cartBadge: () => this.page.locator('.shopping_cart_badge'),
        // nut add to cart cua tung san pham
        addToCartBackpack: () => this.page.locator('#add-to-cart-sauce-labs-backpack'),
        addToCartOnesie: () => this.page.locator('#add-to-cart-sauce-labs-onesie'),
        // nut remove cua tung san pham
        removeBackpack: () => this.page.locator('#remove-sauce-labs-backpack'),
        removeOnesie: () => this.page.locator('#remove-sauce-labs-onesie'),
        // hamburger menu
        burgerMenu: () => this.page.locator('#react-burger-menu-btn'),
        // nut logout
        logoutButton: () => this.page.locator('#logout_sidebar_link'),
    };

    // ham sort san pham
    async sortBy(option: string) {
        await this.elements.sortDropdown().selectOption(option);
    }

    // ham lay tat ca ten san pham hien thi
    async getProductNames() {
        return await this.elements.productNames().allTextContents();
    }

    // ham logout
    async logout() {
        await this.elements.burgerMenu().click();
        await this.page.waitForTimeout(500);
        await this.elements.logoutButton().click();
    }
}