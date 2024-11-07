# Sử dụng image Rasa
FROM rasa/rasa:latest

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép toàn bộ mã nguồn vào container
COPY . /app

# Cấp quyền truy cập cho các tệp trong thư mục
RUN chmod -R 755 /app

# Cài đặt các package cần thiết (nếu có)
RUN pip install -r requirements.txt

# Huấn luyện mô hình
RUN rasa train

# Lệnh để chạy Rasa server
CMD ["run", "--enable-api", "--cors", "*"]
