import axios from "axios";

// Create Axios instance
export const axiosInstance = axios.create({
    baseURL: 'https://social-backend-kzy5.onrender.com', // O'z URL manzilingizni kiriting
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Authorization header
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

// Response interceptor to catch 401 errors (token expired)
axiosInstance.interceptors.response.use(
    (response) => response, // Agar so'rov muvaffaqiyatli bo'lsa, javobni qaytarish
    async (error) => {
        console.log('Xatolik interceptorda:', error.response);  // Xatolikni loglash
        const originalRequest = error.config;

        // Agar xatolik 401 (Unauthorized) bo'lsa va yangilash amalga oshirilmagan bo'lsa
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log('401 xatolik aniqlangan, tokenni yangilashga urinish...');
            
            // Bir martalik yangilashni amalga oshirish uchun flagni qo'yish
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
                // Make a request to your auth server to refresh the token.
                const response = await axios.get('https://social-backend-kzy5.onrender.com/auth/refresh', {
                    headers:{Authorization:`Bearer ${refreshToken}`}
                });
                const accessToken = response.data.accessToken;
                console.log(accessToken);
                console.log(response.data.accessToken);
                // Store the new access and refresh tokens.
                localStorage.setItem('accessToken', accessToken);
                // Update the authorization header with the new access token.
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                return axiosInstance(originalRequest); // Retry the original request with the new access token.
              } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
              }
        }

        // Boshqa xatoliklar uchun promise-ni rad etish
        return Promise.reject(error);
    }
);

function logoutUser() {
    console.log('Foydalanuvchi tizimdan chiqmoqda...');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.replace('login.html'); // Login sahifasiga yo'naltirish
}
