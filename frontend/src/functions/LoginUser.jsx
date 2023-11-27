export const loginUser = async (username, password) => {
    const loginEndpoint = 'http://localhost:8000/user/login';
  
    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        console.error('Login failed:', response.statusText);
        return;
      }
  
      const { token } = await response.json();
      console.log('Login successful. Token:', token);
    }
    catch (error) {
      console.error('Error during login:', error);
    }
  };
