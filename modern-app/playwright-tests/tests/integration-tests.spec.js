const { test, expect } = require('@playwright/test');

test.describe('Modernized Fast-Food System Integration API Tests [KAN-3]', () => {
  let token;
  const uniqueUsername = `cashier_${Date.now()}`;

  test.beforeAll(async ({ request }) => {
    // Perform standard login to fetch a token for test cases requiring authentication
    const response = await request.post('http://127.0.0.1:5000/api/auth/login', {
      data: {
        username: 'dorry',
        password: 'dorry'
      }
    });
    const body = await response.json();
    token = body.token;
  });

  // --- LOGIN TESTS ---

  test('TC-SEC-01: Successful Cashier Login', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/login', {
      data: {
        username: 'dorry',
        password: 'dorry'
      }
    });
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
    expect(body.cashier.username).toBe('dorry');
  });

  test('TC-SEC-02: Failed Login (Invalid Credentials)', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/login', {
      data: {
        username: 'dorry',
        password: 'wrongpassword'
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toContain('INVALID PASSWORD OR USERNAME, PLEASE TRY AGAIN!!!');
  });

  test('TC-AUTH-03: Failed Login - Missing Username', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/login', {
      data: {
        password: 'somepassword'
      }
    });
    expect(response.status()).toBe(400);
  });

  test('TC-AUTH-04: Failed Login - Missing Password', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/login', {
      data: {
        username: 'dorry'
      }
    });
    expect(response.status()).toBe(400);
  });

  // --- REGISTRATION TESTS ---

  test('TC-REG-01: Successful Cashier Registration', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/register', {
      data: {
        username: uniqueUsername,
        password: 'securepassword123',
        role: 'cashier'
      }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toContain('registered successfully');
  });

  test('TC-REG-02: Failed Registration - Username Already Exists', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/register', {
      data: {
        username: 'dorry',
        password: 'newpassword',
        role: 'cashier'
      }
    });
    expect(response.status()).toBe(400);
  });

  test('TC-REG-03: Failed Registration - Missing Username', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/register', {
      data: {
        password: 'passwordOnly',
        role: 'cashier'
      }
    });
    expect(response.status()).toBe(400);
  });

  test('TC-REG-04: Failed Registration - Missing Password', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/auth/register', {
      data: {
        username: 'nopassworduser',
        role: 'cashier'
      }
    });
    expect(response.status()).toBe(400);
  });

  // --- MENU ITEM FLOW (CRUD & UNAUTHENTICATED) ---

  test('TC-MENU-01: Get All Menu Items (Unauthenticated) - Expect 200', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/api/menu');
    expect(response.status()).toBe(200);
  });

  test('TC-MENU-02: Create Menu Item (Unauthenticated) - Expect 401', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/menu', {
      data: {
        name: 'Veggie Pizza',
        category: 'Pizza',
        price: 12.99,
        sizeOrWeight: 'Large',
        description: 'Fresh vegetables with cheese'
      }
    });
    expect(response.status()).toBe(401);
  });

  test('TC-MENU-CRUD: Complete Menu Item CRUD lifecycle', async ({ request }) => {
    // 1. Create Menu Item (Authenticated)
    const createRes = await request.post('http://127.0.0.1:5000/api/menu', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        name: 'Gourmet Chicken Burger',
        category: 'Burger',
        price: 9.50,
        sizeOrWeight: '200g',
        description: 'Crispy breast fillet with special sauce'
      }
    });
    expect(createRes.status()).toBe(201);
    const createBody = await createRes.json();
    expect(createBody.success).toBe(true);
    const createdId = createBody.data._id;
    expect(createdId).toBeDefined();

    // 2. Get Menu Item by ID
    const getRes = await request.get(`http://127.0.0.1:5000/api/menu/${createdId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(getRes.status()).toBe(200);
    const getBody = await getRes.json();
    expect(getBody.data.name).toBe('Gourmet Chicken Burger');

    // 3. Update Menu Item
    const updateRes = await request.put(`http://127.0.0.1:5000/api/menu/${createdId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        name: 'Updated Chicken Burger',
        price: 10.50
      }
    });
    expect(updateRes.status()).toBe(200);
    const updateBody = await updateRes.json();
    expect(updateBody.data.name).toBe('Updated Chicken Burger');

    // 4. Delete Menu Item
    const deleteRes = await request.delete(`http://127.0.0.1:5000/api/menu/${createdId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(deleteRes.status()).toBe(200);
  });

  test('TC-MENU-ERRORS: Get/Update/Delete Non-Existent Menu Item - Expect 404/500', async ({ request }) => {
    const nonExistentId = '6a35a83a26e44138477ad999';

    const getRes = await request.get(`http://127.0.0.1:5000/api/menu/${nonExistentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(getRes.status() === 404 || getRes.status() === 500).toBe(true);

    const updateRes = await request.put(`http://127.0.0.1:5000/api/menu/${nonExistentId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: { name: 'Ghost Burger', price: 15.00 }
    });
    expect(updateRes.status() === 404 || updateRes.status() === 500).toBe(true);

    const deleteRes = await request.delete(`http://127.0.0.1:5000/api/menu/${nonExistentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(deleteRes.status() === 404 || deleteRes.status() === 500).toBe(true);
  });

  // --- ORDERS FLOW (CRUD & UNAUTHENTICATED) ---

  test('TC-ORD-02: Get All Orders (Unauthenticated) - Expect 401', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/api/orders');
    expect(response.status()).toBe(401);
  });

  test('TC-ORD-03: Get All Orders (Authenticated) - Expect 200', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test('TC-ORD-04: Place Order (Unauthenticated) - Expect 401', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/orders', {
      data: {
        category: 'Pizza',
        items: [{ description: 'Margaritha', quantity: 1, unitPrice: 10.0 }]
      }
    });
    expect(response.status()).toBe(401);
  });

  test('TC-ORD-05: Place Order (Invalid Category) - Expect 400', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        category: 'Sushi',
        items: [{ description: 'California Roll', quantity: 1, unitPrice: 10.0 }]
      }
    });
    expect(response.status()).toBe(400);
  });

  test('TC-ORD-06: Place Order (Negative Quantity) - Expect 400', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        category: 'Pizza',
        items: [{ description: 'Pepperoni Pizza', quantity: -2, unitPrice: 12.5 }]
      }
    });
    expect(response.status()).toBe(400);
  });

  test('TC-ORD-CRUD: Complete Order Creation and Deletion lifecycle', async ({ request }) => {
    // 1. Create order
    const createRes = await request.post('http://127.0.0.1:5000/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        category: 'Chips',
        items: [
          {
            description: 'Large Salted Chips',
            quantity: 3,
            unitPrice: 4.5,
            servedWith: 'Tomato Sauce'
          }
        ]
      }
    });
    expect(createRes.status()).toBe(201);
    const createBody = await createRes.json();
    expect(createBody.success).toBe(true);
    expect(createBody.data.totalAmount).toBe(13.5);
    const orderId = createBody.data._id;

    // 2. Delete order
    const deleteRes = await request.delete(`http://127.0.0.1:5000/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(deleteRes.status()).toBe(200);
  });

  test('TC-ORD-10: Delete Order (Not Found) - Expect 404/500', async ({ request }) => {
    const response = await request.delete('http://127.0.0.1:5000/api/orders/6a35a83a26e44138477ad999', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(response.status() === 404 || response.status() === 500).toBe(true);
  });

  // --- OFFLINE SYNC AND REPORTS ---

  test('TC-ORD-07: Sync Offline Orders (Unauthenticated) - Expect 401', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/orders/sync', {
      data: { orders: [] }
    });
    expect(response.status()).toBe(401);
  });

  test('TC-ORD-08: Sync Offline Orders (Authenticated - Empty Queue)', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:5000/api/orders/sync', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: { orders: [] }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.synchronizedCount).toBe(0);
  });

  test('TC-REP-01: Cashier Sales Summary Retrieval', async ({ request }) => {
    const reportRes = await request.get('http://127.0.0.1:5000/api/orders/reports/sales', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(reportRes.ok()).toBe(true);
    const reportBody = await reportRes.json();
    expect(reportBody.success).toBe(true);
  });

  // --- HEALTH CHECK STATUS ---

  test('TC-STAT-01: Health Check Status - Expect 200', async ({ request }) => {
    const response = await request.get('http://127.0.0.1:5000/api/status');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.status).toBe('running');
  });
});
