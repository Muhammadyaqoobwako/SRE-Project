const { test, expect } = require('@playwright/test');

// Page/API Object Model Classes defined inline to prevent loader resolution conflicts
class AuthAPI {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'http://127.0.0.1:5000/api/auth';
  }

  async login(username, password) {
    return this.request.post(`${this.baseUrl}/login`, {
      data: { username, password }
    });
  }

  async register(username, password, role = 'cashier') {
    return this.request.post(`${this.baseUrl}/register`, {
      data: { username, password, role }
    });
  }
}

class MenuAPI {
  constructor(request, token) {
    this.request = request;
    this.token = token;
    this.baseUrl = 'http://127.0.0.1:5000/api/menu';
  }

  getHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  async getAll() {
    return this.request.get(this.baseUrl, {
      headers: this.getHeaders()
    });
  }

  async getById(id) {
    return this.request.get(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  async create(itemData) {
    return this.request.post(this.baseUrl, {
      headers: this.getHeaders(),
      data: itemData
    });
  }

  async update(id, itemData) {
    return this.request.put(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
      data: itemData
    });
  }

  async delete(id) {
    return this.request.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

class OrderAPI {
  constructor(request, token) {
    this.request = request;
    this.token = token;
    this.baseUrl = 'http://127.0.0.1:5000/api/orders';
  }

  getHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  async getAll() {
    return this.request.get(this.baseUrl, {
      headers: this.getHeaders()
    });
  }

  async place(orderData) {
    return this.request.post(this.baseUrl, {
      headers: this.getHeaders(),
      data: orderData
    });
  }

  async delete(id) {
    return this.request.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  async sync(ordersArray) {
    return this.request.post(`${this.baseUrl}/sync`, {
      headers: this.getHeaders(),
      data: { orders: ordersArray }
    });
  }

  async getSalesSummary() {
    return this.request.get(`${this.baseUrl}/reports/sales`, {
      headers: this.getHeaders()
    });
  }
}

test.describe('Modernized Fast-Food System POM Integration Tests [KAN-3]', () => {
  let token;
  let createdMenuItemId;
  let createdOrderId;
  const uniqueUsername = `pom_cashier_${Date.now()}`;

  test.beforeAll(async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.login('dorry', 'dorry');
    const body = await response.json();
    token = body.token;
  });

  // --- AUTHENTICATION POM TESTS ---

  test('TC-POM-AUTH-01: Successful Cashier Login', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.login('dorry', 'dorry');
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
  });

  test('TC-POM-AUTH-02: Failed Login (Invalid Credentials)', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.login('dorry', 'wrongpassword');
    expect(response.status()).toBe(401);
  });

  test('TC-POM-AUTH-03: Failed Login (Missing Username)', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.login('', 'dorry');
    expect(response.status()).toBe(400);
  });

  test('TC-POM-AUTH-04: Failed Login (Missing Password)', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.login('dorry', '');
    expect(response.status()).toBe(400);
  });

  // --- REGISTRATION POM TESTS ---

  test('TC-POM-REG-01: Successful Cashier Registration', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.register(uniqueUsername, 'securepassword123');
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('TC-POM-REG-02: Failed Registration (Username Taken)', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.register('dorry', 'newpassword');
    expect(response.status()).toBe(400);
  });

  test('TC-POM-REG-03: Failed Registration (Missing Username)', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.register('', 'passwordOnly');
    expect(response.status()).toBe(400);
  });

  test('TC-POM-REG-04: Failed Registration (Missing Password)', async ({ request }) => {
    const auth = new AuthAPI(request);
    const response = await auth.register('nopassworduser', '');
    expect(response.status()).toBe(400);
  });

  // --- MENU ITEM POM TESTS ---

  test('TC-POM-MENU-01: Get All Menu Items (Unauthenticated) - Expect 200', async ({ request }) => {
    const menu = new MenuAPI(request, null);
    const response = await menu.getAll();
    expect(response.status()).toBe(200);
  });

  test('TC-POM-MENU-02: Create Menu Item (Unauthenticated) - Expect 401', async ({ request }) => {
    const menu = new MenuAPI(request, null);
    const response = await menu.create({
      name: 'Unauth Burger',
      category: 'Burger',
      price: 5.0,
      sizeOrWeight: '100g'
    });
    expect(response.status()).toBe(401);
  });

  test('TC-POM-MENU-03: Create Menu Item (Authenticated)', async ({ request }) => {
    const menu = new MenuAPI(request, token);
    const response = await menu.create({
      name: 'POM Premium Pizza',
      category: 'Pizza',
      price: 14.99,
      sizeOrWeight: 'Large',
      description: 'Cheesy pizza made with POM spec'
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
    createdMenuItemId = body.data._id;
  });

  test('TC-POM-MENU-04: Get Menu Item by ID', async ({ request }) => {
    expect(createdMenuItemId).toBeDefined();
    const menu = new MenuAPI(request, token);
    const response = await menu.getById(createdMenuItemId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.name).toBe('POM Premium Pizza');
  });

  test('TC-POM-MENU-05: Get Menu Item by ID (Not Found) - Expect 404/500', async ({ request }) => {
    const menu = new MenuAPI(request, token);
    const response = await menu.getById('6a35a83a26e44138477ad999');
    expect(response.status() === 404 || response.status() === 500).toBe(true);
  });

  test('TC-POM-MENU-06: Update Menu Item', async ({ request }) => {
    expect(createdMenuItemId).toBeDefined();
    const menu = new MenuAPI(request, token);
    const response = await menu.update(createdMenuItemId, {
      name: 'POM Premium Pizza Updated',
      price: 15.99
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.name).toBe('POM Premium Pizza Updated');
  });

  test('TC-POM-MENU-07: Update Menu Item (Not Found) - Expect 404/500', async ({ request }) => {
    const menu = new MenuAPI(request, token);
    const response = await menu.update('6a35a83a26e44138477ad999', {
      name: 'Nonexistent Pizza',
      price: 15.99
    });
    expect(response.status() === 404 || response.status() === 500).toBe(true);
  });

  test('TC-POM-MENU-08: Delete Menu Item', async ({ request }) => {
    expect(createdMenuItemId).toBeDefined();
    const menu = new MenuAPI(request, token);
    const response = await menu.delete(createdMenuItemId);
    expect(response.status()).toBe(200);
  });

  test('TC-POM-MENU-09: Delete Menu Item (Not Found) - Expect 404/500', async ({ request }) => {
    const menu = new MenuAPI(request, token);
    const response = await menu.delete('6a35a83a26e44138477ad999');
    expect(response.status() === 404 || response.status() === 500).toBe(true);
  });

  // --- ORDER POM TESTS ---

  test('TC-POM-ORD-01: Get All Orders (Unauthenticated) - Expect 401', async ({ request }) => {
    const order = new OrderAPI(request, null);
    const response = await order.getAll();
    expect(response.status()).toBe(401);
  });

  test('TC-POM-ORD-02: Get All Orders (Authenticated) - Expect 200', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.getAll();
    expect(response.status()).toBe(200);
  });

  test('TC-POM-ORD-03: Place Order (Unauthenticated) - Expect 401', async ({ request }) => {
    const order = new OrderAPI(request, null);
    const response = await order.place({
      category: 'Pizza',
      items: [{ description: 'Margaritha', quantity: 1, unitPrice: 10.0 }]
    });
    expect(response.status()).toBe(401);
  });

  test('TC-POM-ORD-04: Place Order (Invalid Category) - Expect 400', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.place({
      category: 'Sushi',
      items: [{ description: 'Margaritha', quantity: 1, unitPrice: 10.0 }]
    });
    expect(response.status()).toBe(400);
  });

  test('TC-POM-ORD-05: Place Order (Negative Quantity) - Expect 400', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.place({
      category: 'Pizza',
      items: [{ description: 'Margaritha', quantity: -5, unitPrice: 10.0 }]
    });
    expect(response.status()).toBe(400);
  });

  test('TC-POM-ORD-06: Place Order (Authenticated)', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.place({
      category: 'Pizza',
      items: [{ description: 'POM Thin Margherita Pizza', quantity: 2, unitPrice: 11.5 }]
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
    createdOrderId = body.data._id;
  });

  test('TC-POM-ORD-07: Delete Order (Authenticated)', async ({ request }) => {
    expect(createdOrderId).toBeDefined();
    const order = new OrderAPI(request, token);
    const response = await order.delete(createdOrderId);
    expect(response.status()).toBe(200);
  });

  test('TC-POM-ORD-08: Delete Order (Not Found) - Expect 404/500', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.delete('6a35a83a26e44138477ad999');
    expect(response.status() === 404 || response.status() === 500).toBe(true);
  });

  // --- OFFLINE SYNC & REPORTS POM TESTS ---

  test('TC-POM-SYNC-01: Sync Offline Orders (Unauthenticated) - Expect 401', async ({ request }) => {
    const order = new OrderAPI(request, null);
    const response = await order.sync([]);
    expect(response.status()).toBe(401);
  });

  test('TC-POM-SYNC-02: Sync Offline Orders (Authenticated)', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.sync([]);
    expect(response.status()).toBe(200);
  });

  test('TC-POM-REP-01: Get Sales Summary (Unauthenticated) - Expect 401', async ({ request }) => {
    const order = new OrderAPI(request, null);
    const response = await order.getSalesSummary();
    expect(response.status()).toBe(401);
  });

  test('TC-POM-REP-02: Get Sales Summary (Authenticated) - Expect 200', async ({ request }) => {
    const order = new OrderAPI(request, token);
    const response = await order.getSalesSummary();
    expect(response.status()).toBe(200);
  });
});
