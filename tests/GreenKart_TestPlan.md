# GreenKart (rahulshettyacademy.com/seleniumPractise) — Test Plan

## Executive summary

Target page: https://rahulshettyacademy.com/seleniumPractise/#/

This document contains a focused test plan for the GreenKart "veg and fruits kart" single-page application. The plan covers functional flows, UI/UX and accessibility checks, edge cases, and negative tests. All scenarios assume a fresh browser session unless stated otherwise.

Starting state (assumption):
- Fresh browser with no localStorage/sessionStorage data for the site.
- Network available and not throttled (unless scenario specifies offline/slow).
- No user authentication required (public storefront).

Success criteria:
- All happy-path scenarios complete with expected UI updates and correct calculations.
- Form/input validation and error conditions are handled and surfaced to users.
- Keyboard and screen-reader friendly behaviors; focus order logical.

Notes:
- Selector examples are derived from a captured page snapshot. Tests should use stable selectors (data-testid or class/id where available).

---

## Primary user journeys (critical paths)

1. Discover a product via search and add to cart
2. Adjust quantity and verify price updates
3. Use the cart icon to view cart summary and proceed to checkout (if available)
4. Navigate to Top Deals / Offers and verify cross-page navigation

---

## Test scenarios

Each scenario includes: title, assumptions, numbered steps, expected results, and pass/fail criteria.

### Scenario 1 — Search and add a single product (happy path)

Assumptions:
- Page loaded in fresh state.

Steps:
1. Focus the search input labeled "Search for Vegetables and Fruits".
2. Type a partial product name (e.g., "broc" for "Brocolli - 1 Kg").
3. Verify that product cards are filtered to matching items only.
4. Click "ADD TO CART" on the intended product.

Expected results:
- Filter reduces visible product cards to matches.
- The targeted product's "ADD TO CART" button becomes clicked and cart counter (Items) increments from 0 to 1.
- Cart price updates to reflect added product price.

Failure conditions:
- No filter applied, wrong items shown, or cart count does not increment.

### Scenario 2 — Increase quantity and verify price calculation

Assumptions:
- Product is visible on the page.

Steps:
1. For a product card, click the "+" control twice to set quantity to 3 (starting from 1).
2. Click "ADD TO CART".
3. Open the cart (click the Cart link/icon).
4. Verify quantity for the product in the cart is 3 and the line total equals unit price × 3.

Expected results:
- Quantity in cart equals the selected quantity.
- Cart total reflects correct multiplication.

Edge cases:
- Rapid clicks shouldn't desync UI count and actual quantity.

### Scenario 3 — Decrease quantity and prevent negative quantities

Assumptions:
- Start with quantity > 1 in a product card.

Steps:
1. Click the "–" control until quantity reaches 0 (if allowed) or minimum.
2. Try to click "–" again.

Expected results:
- Quantity should not go below 1 (or defined minimum). The UI either disables the "–" control at 1 or keeps it at 1.
- Clicking "ADD TO CART" with quantity 1 adds one unit.

Failure conditions:
- Quantity becomes negative or application crashes.

### Scenario 4 — Search yields no results (negative test)

Assumptions:
- Fresh state.

Steps:
1. Enter an improbable search string e.g., "zzxy123".
2. Observe the product list area.

Expected results:
- A clear empty state appears (no product cards) or a message indicating "No results".
- No products are accidentally added to cart.

### Scenario 5 — Keyboard accessibility: tab order and action activation

Assumptions:
- Fresh browser session, no mouse interactions.

Steps:
1. Press Tab repeatedly from page load to traverse interactive elements (search input, +/-, ADD TO CART, Cart link, Top Deals link, etc.).
2. When focus is on a product's "ADD TO CART", press Space/Enter.

Expected results:
- Focus moves in a logical, readable order consistent with layout.
- Space/Enter activates focused controls (e.g., adds to cart).
- Visual focus indicator is present for each interactive element.

Accessibility checks:
- Use aXe/Playwright accessibility snapshot to ensure role attributes are correct (e.g., spinbutton for quantity, button roles for add-to-cart).
- Verify images have meaningful alt text.

### Scenario 6 — Screen reader semantics and ARIA (basic)

Assumptions:
- Automated accessibility tool (aXe, Playwright accessibility snapshot) available.

Steps:
1. Capture the accessibility tree for the main product grid and search field.
2. Validate that product headings are exposed as headings and that each product card is a distinct accessible region.

Expected results:
- Search input exposes a name "Search for Vegetables and Fruits".
- Product titles are headings (h4 in snapshot).
- Quantity control exposes role spinbutton and value.

### Scenario 7 — Navigation to Top Deals / Offers page

Assumptions:
- Page has a visible "Top Deals" link.

Steps:
1. Click the "Top Deals" link.
2. Verify navigation occurs and that the offers page URL contains "#/offers".
3. Validate at least one offer item is present.

Expected results:
- Navigation succeeds and content loads; title or header indicates offers.

### Scenario 8 — Cart persistence across page reload (optional)

Assumptions:
- Browser supports localStorage/sessionStorage used by the app.

Steps:
1. Add an item to cart.
2. Reload the page.
3. Observe the cart items count and contents.

Expected results:
- Cart contents and counts persist if the app is designed to persist; otherwise document expected behavior.

### Scenario 9 — Add many different items and verify grand total

Assumptions:
- Multiple products available.

Steps:
1. Add 4 different items (mix of fruits and vegetables) with various quantities.
2. Open cart and calculate expected grand total (sum of each line unitPrice × qty).
3. Compare UI grand total with expected value.

Expected results:
- Grand total equals the precise sum of line totals.
- Prices are displayed with currency symbol and consistent decimal formatting.

### Scenario 10 — Top-level visual and content checks

Steps:
1. Verify page title reads "GreenKart - veg and fruits kart".
2. Verify footer contains © text and brand name.
3. Verify the cart icon has an accessible name ("Cart") and an ALT on its image.

Expected results:
- Title and footer text match snapshot.
- Brand and copyright visible.

---

## Accessibility-focused scenarios (detailed)

1. Focus visibility: every interactive element must show focus styles.
2. Keyboard-only checkout: user can complete add-to-cart and navigate to offers/cart using keyboard alone.
3. Screen reader text: product names and prices are programmatically determinable.
4. Semantic roles: quantity control implements spinbutton; product grid is exposed as a list/region.
5. Color contrast (manual/automated): test major UI text and action buttons against WCAG AA contrast ratios.

---

## Test data

- Search terms: "broc", "tomato", "apple", "zzxy123" (no results)
- Quantities: 1 (default), 3, 10 (stress quantity handling)

---

## Test execution notes and automation tips

- Use Playwright test fixtures and page objects for reusable operations: search(term), addToCart(productName, qty), openCart(), getCartLines().
- Prefer stable selectors (data-test-id or data-testid). If missing, use text-based selectors for headings and buttons.
- Accessibility checks: integrate axe-core or use Playwright accessibility snapshot assertions.

Example small contract for `addToCart` helper:
- Input: product name (substring) and quantity (number)
- Output: resolves when cart counter increments and UI shows expected item
- Error modes: product not found, quantity invalid

Edge cases to mock when possible:
- Slow network and images load failures
- Server returns malformed price (simulate via mocking)
- LocalStorage cleared mid-session

---

## Priority checklist (short)
- [ ] Search & add-to-cart (high)
- [ ] Quantity math in cart (high)
- [ ] Keyboard and focus (high)
- [ ] Offers/top-deals navigation (medium)
- [ ] Persistence across reload (medium)
- [ ] Accessibility snapshots / aXe runs (high)

---

## How to use this document

- This file can be used as a blueprint for manual testers and to drive automated tests.
- When automating, create individual Playwright tests per scenario and add small unit tests for helper functions.

---

## Appendix: Suggested Playwright test names
- TC_GK_Search_AddToCart.spec.ts
- TC_GK_Quantity_PriceCalculation.spec.ts
- TC_GK_Keyboard_Accessibility.spec.ts
- TC_GK_Offers_Navigation.spec.ts


*Generated by planner exploration snapshot on the page.*
