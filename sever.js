const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware để parse JSON body
app.use(express.json());

// Định nghĩa API POST
app.post('/send-token', async (req, res) => {
  const { token } = req.body; // Nhận token từ body của request

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Gửi POST request tới API
    const response = await axios.post('https://api.hutech.edu.vn/authentication-v2/api/auth/login-science-by-token', {
      token: token
    });

    // Trả về phản hồi từ API
    return res.status(200).json(response.data);
  } catch (error) {
    // Xử lý lỗi nếu request thất bại
    console.error('Error occurred:', error);
    return res.status(500).json({ message: 'Error occurred', error: error.message });
  }
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
