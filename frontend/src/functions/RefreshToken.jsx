export const refreshToken = async (token) => {
    const refreshEndpoint = 'https://example.com/user/login/refresh';
  
    try {
      const response = await fetch(refreshEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error('Token refresh failed:', response.statusText);
        return;
      }
  
      const { token: newToken } = await response.json();
      console.log('Token refresh successful. New Token:', newToken);
    }
    catch (error) {
      console.error('Error during token refresh:', error);
    }
  };
  