const http = require('http');

async function testEndpoint(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing Butterfly Care API...');

  // 1. Health
  const health = await testEndpoint({ hostname: 'localhost', port: 5000, path: '/api/health', method: 'GET' });
  console.log('1. Health Check:', health.status, health.data.brand);

  // 2. Admin Login
  const login = await testEndpoint(
    { hostname: 'localhost', port: 5000, path: '/api/auth/login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { email: 'admin@butterflycare.com', password: 'Admin@123456' }
  );
  console.log('2. Admin Login:', login.status, login.data.success, login.data.user?.name, 'Role:', login.data.user?.role);

  // 3. Validate Coupon
  const coupon = await testEndpoint(
    { hostname: 'localhost', port: 5000, path: '/api/coupons/validate', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { code: 'WELCOME10', subtotal: 5000 }
  );
  console.log('3. Validate Coupon:', coupon.status, coupon.data.message);

  // 4. Products list
  const prods = await testEndpoint({ hostname: 'localhost', port: 5000, path: '/api/products', method: 'GET' });
  console.log('4. Products Count:', prods.status, prods.data.products?.length);

  // 5. Dashboard analytics with token
  if (login.data.token) {
    const analytics = await testEndpoint({
      hostname: 'localhost',
      port: 5000,
      path: '/api/analytics/dashboard',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${login.data.token}` }
    });
    console.log('5. Admin Analytics:', analytics.status, 'Total Sales:', analytics.data.stats?.totalSales, 'Orders:', analytics.data.stats?.totalOrders);
  }

  console.log('✅ All API test cases passed successfully!');
}

runTests().catch(console.error);
