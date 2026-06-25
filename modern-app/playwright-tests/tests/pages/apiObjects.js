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

module.exports = { AuthAPI, MenuAPI, OrderAPI };
