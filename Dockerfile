# Sử dụng image Rasa
FROM rasa/rasa:latest

# Sao chép toàn bộ mã nguồn vào container
COPY . /app

# Cài đặt các package cần thiết (nếu có)
RUN pip install -r requirements.txt

# Huấn luyện mô hình (nếu cần thiết)
RUN rasa train

# Lệnh để chạy Rasa server
CMD ["run", "--enable-api", "--cors", "*"]