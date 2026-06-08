# Locator Practice - Saucedemo.com

| # | Element | CSS | XPath |
|---|---------|-----|-------|
| 1 | Shopping cart icon | `[data-test="shopping-cart-link"]` | `//a[@data-test='shopping-cart-link']` |
| 2 | All "Add to cart" buttons | `button.btn_inventory` | `//button[contains(@class,'btn_inventory')]` |
| 3 | Sort dropdown | `[data-test="product-sort-container"]` | `//*[@data-test='product-sort-container']` |
| 4 | All product images | `.inventory_item_img img` | `//div[@class='inventory_item_img']//img` |
| 5 | Items with price "$15.99" | `.inventory_item_price` | `//*[@class='inventory_item_price'][text()='$15.99']` |
| 6 | Add to cart - Sauce Labs Backpack | `[data-test="add-to-cart-sauce-labs-backpack"]` | `//*[@data-test='add-to-cart-sauce-labs-backpack']` |
| 7 | Remove - Sauce Labs Onesie | `[data-test="remove-sauce-labs-onesie"]` | `//*[@data-test='remove-sauce-labs-onesie']` |
| 8 | All add-to-cart buttons | `[data-test^="add-to-cart"]` | `//*[starts-with(@data-test,'add-to-cart')]` |
| 9 | Product names not "Sauce Labs" | `.inventory_item_name` | `//*[@class='inventory_item_name'][not(contains(text(),'Sauce Labs'))]` |
| 10 | Product image by alt text | `img[alt*="Sauce Labs Backpack"]` | `//img[contains(@alt,'Sauce Labs Backpack')]` |