exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS enabled' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.error('Admin credentials not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    if (email === adminEmail && password === adminPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          user: { email: adminEmail }
        })
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'Invalid credentials' 
        })
      };
    }
  } catch (error) {
    console.error('Error in auth-login function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
};
