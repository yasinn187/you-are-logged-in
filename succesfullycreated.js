// Function to fetch user information using the access token
const getUserInfo = async (accessToken) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return null;
    }
  };
  
  // Function to handle the page logic after login
  const handleLoginSuccess = async () => {
    // Extract the "access_token" from the URL
    const urlParams = new URLSearchParams(window.location.hash.substring(1)); // Fragment (#) part
    const accessToken = urlParams.get('access_token');
  
    if (accessToken) {
      // Fetch user information
      const userInfo = await getUserInfo(accessToken);
  
      // Display user information in the page
      const userInfoDiv = document.getElementById('user-info');
      if (userInfo) {
        userInfoDiv.innerHTML = `
          <p><strong>Name:</strong> ${userInfo.name}</p>
          <p><strong>Email:</strong> ${userInfo.email}</p>
          <img src="${userInfo.picture}" alt="Profile Picture" style="border-radius: 50%; width: 100px;">
        `;
      } else {
        userInfoDiv.textContent = "Failed to load user profile.";
      }
    } else {
      // If access token is missing, display an error message
      document.getElementById('user-info').textContent = "Access token is missing. Please login again.";
    }
  };
  
  // Call the function to handle login success
  handleLoginSuccess();
  
