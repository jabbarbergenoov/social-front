import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.25:8000/', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for request to add the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor for response to catch 401 errors (expired token)
axiosInstance.interceptors.response.use(
    (response) => response, // Simply return response if successful
    async (error) => {
        const originalRequest = error.config;
        
        // If the error is due to token expiration (401 Unauthorized)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Attempt to refresh the token
                const newAccessToken = await refreshToken();
                
                // Update the Authorization header with the new token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                
                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refreshing token failed, logout the user
                logoutUser();
                return Promise.reject(refreshError);
            }
        }
        
        // Reject the promise if it's a different kind of error
        return Promise.reject(error);
    }
);

// Function to refresh the token
async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
        const response = await axiosInstance.post('/auth/refresh', {
            refreshToken: refreshToken,
        });

        if (response.data && response.data.accessToken) {
            // Save the new access token to localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        } else {
            throw new Error('Refresh token is invalid');
        }
    } catch (error) {
        throw new Error('Unable to refresh token');
    }
}
async function fetchUserData() {
    try {
        const response = await axiosInstance.get('/user/profile');
        console.log('User data:', response.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}