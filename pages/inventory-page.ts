import { type Page, type Locator } from "@playwright/test";

export default class InventoryPage {
  readonly page: Page;
  readonly productItem: Locator;
  readonly addToCardBtn: Locator;
  readonly shoppingCardBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItem = this.page.locator(".inventory_item");
    this.addToCardBtn = this.page.getByRole("button", {
      name: "Add to cart",
    });
    this.shoppingCardBadge = this.page.locator(".shopping_cart_badge");
  }

  public async countItemsOnInventoryPage() {
    return this.productItem.count();
  }

  public async addItemToCard(itemNumber: number) {
    const addToCardBtns = await this.addToCardBtn.all();
    await addToCardBtns[itemNumber].click();
  }

  public async shoppingCardBadgeCount() {
    const badgeCounter = await this.shoppingCardBadge.textContent();
    return badgeCounter?.trim();
  }
}
