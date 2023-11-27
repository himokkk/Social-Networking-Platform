export const registerUser = async (username, password) => {
    const registrationEndpoint = 'http://localhost:8000/user/register';
  
    try {
      const response = await fetch(registrationEndpoint, {
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
        console.error('Registration failed:', response.statusText);
        return;
      }
      console.log('Registration successful');
    }
    catch (error) {
      console.error('Error during registration:', error);
    }
  };
  