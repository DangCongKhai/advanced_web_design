// Hàm lấy dữ liệu từ API
async function fetchFoodData() {
  try {
    // const response = await fetch('https://api.example.com/foods');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const foodData = await response.json();
    const menuContainer = document.getElementById('food-menu');

    // Duyệt qua từng sản phẩm thực phẩm và destructure dữ liệu
    foodData.forEach(({ id, name, email})=> {
      // Tạo phần tử card
      const card = document.createElement('div');
      card.className = 'card';

      // Tạo nội dung cho card
      card.innerHTML = `
        <h2><strong>Name:</strong> ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
      `;

      // Thêm card vào container
      menuContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching food data:', error);
  }
}

// Gọi hàm để thực hiện yêu cầu API khi tài liệu đã sẵn sàng
document.addEventListener('DOMContentLoaded', fetchFoodData);
