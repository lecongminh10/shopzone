# Test Cases - Behavioral Testing - Tất Cả Test Cases

## Mục lục

1. [Phí Vận Chuyển Giỏ Hàng](#phí-vận-chuyển-giỏ-hàng)
   - TC-BHV-001 đến TC-BHV-005: Phí vận chuyển cơ bản
   - TC-BHV-024 đến TC-BHV-026: Hỗ trợ phí ship
2. [Thêm Sản Phẩm Vào Giỏ Hàng](#thêm-sản-phẩm-vào-giỏ-hàng)
3. [Quy Trình Thanh Toán](#quy-trình-thanh-toán)
   - TC-BHV-011 đến TC-BHV-015: Quy trình thanh toán cơ bản
   - TC-BHV-027 đến TC-BHV-029: Phương thức thanh toán (COD, Chuyển khoản)
4. [Tìm Kiếm & Điều Hướng](#tìm-kiếm--điều-hướng)
5. [Flash Sale](#flash-sale)

---

## TC-BHV-001: Kiểm tra phí vận chuyển khi có sản phẩm freeship và không freeship

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-001 |
| **Description Test case** | Kiểm tra logic tính phí vận chuyển khi giỏ hàng có cả sản phẩm freeship và sản phẩm không freeship. Đảm bảo hệ thống tính phí ship đúng theo quy tắc business. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile hoặc avatar<br>   - Nhập số điện thoại và mật khẩu (hoặc OTP)<br>   - Click "Đăng nhập"<br>   - Xác nhận đăng nhập thành công<br>2. **Thêm sản phẩm A có freeship vào giỏ hàng**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm A có freeship<br>   - Click vào sản phẩm A để xem chi tiết<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>3. **Thêm sản phẩm B không có freeship vào giỏ hàng**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm B không có freeship<br>   - Click vào sản phẩm B để xem chi tiết<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>4. **Vào màn hình thanh toán**<br>   - Click vào icon giỏ hàng hoặc floating cart<br>   - Xác nhận cả 2 sản phẩm A và B đều có trong giỏ<br>   - Chọn cả 2 sản phẩm (checkbox)<br>   - Click nút "Thanh toán"<br>   - Điều hướng đến màn hình checkout<br>5. **Kiểm tra phần phí vận chuyển**<br>   - Scroll đến section "Phí vận chuyển" hoặc "Phí ship"<br>   - Quan sát giá trị phí ship hiển thị<br>   - Kiểm tra logic tính phí:<br>     - Nếu có sản phẩm freeship: phí ship = 0 hoặc chỉ tính phí cho sản phẩm không freeship<br>     - Nếu không có sản phẩm freeship: phí ship > 0<br>   - Kiểm tra tổng tiền cuối cùng = (Tổng giá sản phẩm) + (Phí ship) - (Voucher nếu có) |
| **Expected Output** | - [ ] Đăng nhập thành công, hiển thị thông tin user<br>- [ ] Sản phẩm A được thêm vào giỏ hàng thành công<br>- [ ] Sản phẩm B được thêm vào giỏ hàng thành công<br>- [ ] Màn hình thanh toán hiển thị đầy đủ:<br>  - [ ] Danh sách 2 sản phẩm (A và B)<br>  - [ ] Tổng tiền sản phẩm = (Giá A × Số lượng A) + (Giá B × Số lượng B)<br>  - [ ] Phí vận chuyển hiển thị rõ ràng<br>- [ ] **Logic phí vận chuyển:**<br>  - [ ] Nếu sản phẩm A có freeship và B không có freeship:<br>    - [ ] Phí ship = 0 (nếu freeship áp dụng cho toàn bộ đơn)<br>    - [ ] HOẶC Phí ship = phí ship của sản phẩm B (nếu tính riêng)<br>  - [ ] Hiển thị badge "Miễn phí ship" cho sản phẩm A (nếu có)<br>  - [ ] Tổng tiền cuối cùng = Tổng giá sản phẩm + Phí ship (nếu có)<br>- [ ] Có thể thay đổi địa chỉ giao hàng và phí ship cập nhật lại<br>- [ ] Có thể chọn điểm nhận hàng để miễn phí ship |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm A có freeship trong hệ thống<br>- Có sản phẩm B không có freeship trong hệ thống<br>- Có địa chỉ giao hàng đã lưu |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**

[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot màn hình giỏ hàng<br>- [ ] Screenshot màn hình thanh toán với phí ship<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-001 |
| **Description Test case** | Kiểm tra logic tính phí vận chuyển khi giỏ hàng có cả sản phẩm freeship và sản phẩm không freeship. Đảm bảo hệ thống tính phí ship đúng theo quy tắc business. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile hoặc avatar<br>   - Nhập số điện thoại và mật khẩu (hoặc OTP)<br>   - Click "Đăng nhập"<br>   - Xác nhận đăng nhập thành công<br>2. **Thêm sản phẩm A có freeship vào giỏ hàng**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm A có freeship<br>   - Click vào sản phẩm A để xem chi tiết<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>3. **Thêm sản phẩm B không có freeship vào giỏ hàng**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm B không có freeship<br>   - Click vào sản phẩm B để xem chi tiết<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>4. **Vào màn hình thanh toán**<br>   - Click vào icon giỏ hàng hoặc floating cart<br>   - Xác nhận cả 2 sản phẩm A và B đều có trong giỏ<br>   - Chọn cả 2 sản phẩm (checkbox)<br>   - Click nút "Thanh toán"<br>   - Điều hướng đến màn hình checkout<br>5. **Kiểm tra phần phí vận chuyển**<br>   - Scroll đến section "Phí vận chuyển" hoặc "Phí ship"<br>   - Quan sát giá trị phí ship hiển thị<br>   - Kiểm tra logic tính phí:<br>     - Nếu có sản phẩm freeship: phí ship = 0 hoặc chỉ tính phí cho sản phẩm không freeship<br>     - Nếu không có sản phẩm freeship: phí ship > 0<br>   - Kiểm tra tổng tiền cuối cùng = (Tổng giá sản phẩm) + (Phí ship) - (Voucher nếu có) |
| **Expected Output** | - [ ] Đăng nhập thành công, hiển thị thông tin user<br>- [ ] Sản phẩm A được thêm vào giỏ hàng thành công<br>- [ ] Sản phẩm B được thêm vào giỏ hàng thành công<br>- [ ] Màn hình thanh toán hiển thị đầy đủ:<br>  - [ ] Danh sách 2 sản phẩm (A và B)<br>  - [ ] Tổng tiền sản phẩm = (Giá A × Số lượng A) + (Giá B × Số lượng B)<br>  - [ ] Phí vận chuyển hiển thị rõ ràng<br>- [ ] **Logic phí vận chuyển:**<br>  - [ ] Nếu sản phẩm A có freeship và B không có freeship:<br>    - [ ] Phí ship = 0 (nếu freeship áp dụng cho toàn bộ đơn)<br>    - [ ] HOẶC Phí ship = phí ship của sản phẩm B (nếu tính riêng)<br>  - [ ] Hiển thị badge "Miễn phí ship" cho sản phẩm A (nếu có)<br>  - [ ] Tổng tiền cuối cùng = Tổng giá sản phẩm + Phí ship (nếu có)<br>- [ ] Có thể thay đổi địa chỉ giao hàng và phí ship cập nhật lại<br>- [ ] Có thể chọn điểm nhận hàng để miễn phí ship |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm A có freeship trong hệ thống<br>- Có sản phẩm B không có freeship trong hệ thống<br>- Có địa chỉ giao hàng đã lưu |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot màn hình giỏ hàng<br>- [ ] Screenshot màn hình thanh toán với phí ship<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-001 |
| **Description Test case** | Kiểm tra logic tính phí vận chuyển khi giỏ hàng có cả sản phẩm freeship và sản phẩm không freeship. Đảm bảo hệ thống tính phí ship đúng theo quy tắc business. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile hoặc avatar<br>   - Nhập số điện thoại và mật khẩu (hoặc OTP)<br>   - Click "Đăng nhập"<br>   - Xác nhận đăng nhập thành công<br>2. **Thêm sản phẩm A có freeship vào giỏ hàng**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm A có freeship<br>   - Click vào sản phẩm A để xem chi tiết<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>3. **Thêm sản phẩm B không có freeship vào giỏ hàng**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm B không có freeship<br>   - Click vào sản phẩm B để xem chi tiết<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>4. **Vào màn hình thanh toán**<br>   - Click vào icon giỏ hàng hoặc floating cart<br>   - Xác nhận cả 2 sản phẩm A và B đều có trong giỏ<br>   - Chọn cả 2 sản phẩm (checkbox)<br>   - Click nút "Thanh toán"<br>   - Điều hướng đến màn hình checkout<br>5. **Kiểm tra phần phí vận chuyển**<br>   - Scroll đến section "Phí vận chuyển" hoặc "Phí ship"<br>   - Quan sát giá trị phí ship hiển thị<br>   - Kiểm tra logic tính phí:<br>     - Nếu có sản phẩm freeship: phí ship = 0 hoặc chỉ tính phí cho sản phẩm không freeship<br>     - Nếu không có sản phẩm freeship: phí ship > 0<br>   - Kiểm tra tổng tiền cuối cùng = (Tổng giá sản phẩm) + (Phí ship) - (Voucher nếu có) |
| **Expected Output** | - [ ] Đăng nhập thành công, hiển thị thông tin user<br>- [ ] Sản phẩm A được thêm vào giỏ hàng thành công<br>- [ ] Sản phẩm B được thêm vào giỏ hàng thành công<br>- [ ] Màn hình thanh toán hiển thị đầy đủ:<br>  - [ ] Danh sách 2 sản phẩm (A và B)<br>  - [ ] Tổng tiền sản phẩm = (Giá A × Số lượng A) + (Giá B × Số lượng B)<br>  - [ ] Phí vận chuyển hiển thị rõ ràng<br>- [ ] **Logic phí vận chuyển:**<br>  - [ ] Nếu sản phẩm A có freeship và B không có freeship:<br>    - [ ] Phí ship = 0 (nếu freeship áp dụng cho toàn bộ đơn)<br>    - [ ] HOẶC Phí ship = phí ship của sản phẩm B (nếu tính riêng)<br>  - [ ] Hiển thị badge "Miễn phí ship" cho sản phẩm A (nếu có)<br>  - [ ] Tổng tiền cuối cùng = Tổng giá sản phẩm + Phí ship (nếu có)<br>- [ ] Có thể thay đổi địa chỉ giao hàng và phí ship cập nhật lại<br>- [ ] Có thể chọn điểm nhận hàng để miễn phí ship |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm A có freeship trong hệ thống<br>- Có sản phẩm B không có freeship trong hệ thống<br>- Có địa chỉ giao hàng đã lưu |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:**<br>**Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot màn hình giỏ hàng<br>- [ ] Screenshot màn hình thanh toán với phí ship<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details><br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra logic tính phí vận chuyển khi giỏ hàng có cả sản phẩm freeship và sản phẩm không freeship. Đảm bảo hệ thống tính phí ship đúng theo quy tắc business.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có sản phẩm A có freeship trong hệ thống
- Có sản phẩm B không có freeship trong hệ thống
- Có địa chỉ giao hàng đã lưu

### Các bước thực hiện
1. **Đăng nhập vào ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Click vào icon Profile hoặc avatar
   - Nhập số điện thoại và mật khẩu (hoặc OTP)
   - Click "Đăng nhập"
   - Xác nhận đăng nhập thành công

2. **Thêm sản phẩm A có freeship vào giỏ hàng**
   - Tìm kiếm hoặc duyệt đến sản phẩm A có freeship
   - Click vào sản phẩm A để xem chi tiết
   - Chọn variant (nếu có)
   - Chọn số lượng
   - Click nút "Thêm vào giỏ hàng"
   - Xác nhận sản phẩm đã được thêm vào giỏ

3. **Thêm sản phẩm B không có freeship vào giỏ hàng**
   - Tìm kiếm hoặc duyệt đến sản phẩm B không có freeship
   - Click vào sản phẩm B để xem chi tiết
   - Chọn variant (nếu có)
   - Chọn số lượng
   - Click nút "Thêm vào giỏ hàng"
   - Xác nhận sản phẩm đã được thêm vào giỏ

4. **Vào màn hình thanh toán**
   - Click vào icon giỏ hàng hoặc floating cart
   - Xác nhận cả 2 sản phẩm A và B đều có trong giỏ
   - Chọn cả 2 sản phẩm (checkbox)
   - Click nút "Thanh toán"
   - Điều hướng đến màn hình checkout

5. **Kiểm tra phần phí vận chuyển**
   - Scroll đến section "Phí vận chuyển" hoặc "Phí ship"
   - Quan sát giá trị phí ship hiển thị
   - Kiểm tra logic tính phí:
     - Nếu có sản phẩm freeship: phí ship = 0 hoặc chỉ tính phí cho sản phẩm không freeship
     - Nếu không có sản phẩm freeship: phí ship > 0
   - Kiểm tra tổng tiền cuối cùng = (Tổng giá sản phẩm) + (Phí ship) - (Voucher nếu có)

### Kết quả mong đợi
- [ ] Đăng nhập thành công, hiển thị thông tin user
- [ ] Sản phẩm A được thêm vào giỏ hàng thành công
- [ ] Sản phẩm B được thêm vào giỏ hàng thành công
- [ ] Màn hình thanh toán hiển thị đầy đủ:
  - [ ] Danh sách 2 sản phẩm (A và B)
  - [ ] Tổng tiền sản phẩm = (Giá A × Số lượng A) + (Giá B × Số lượng B)
  - [ ] Phí vận chuyển hiển thị rõ ràng
- [ ] **Logic phí vận chuyển:**
  - [ ] Nếu sản phẩm A có freeship và B không có freeship:
    - [ ] Phí ship = 0 (nếu freeship áp dụng cho toàn bộ đơn)
    - [ ] HOẶC Phí ship = phí ship của sản phẩm B (nếu tính riêng)
  - [ ] Hiển thị badge "Miễn phí ship" cho sản phẩm A (nếu có)
  - [ ] Tổng tiền cuối cùng = Tổng giá sản phẩm + Phí ship (nếu có)
- [ ] Có thể thay đổi địa chỉ giao hàng và phí ship cập nhật lại
- [ ] Có thể chọn điểm nhận hàng để miễn phí ship

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Đăng nhập thành công | ⬜ Pass / ⬜ Fail | |
| Thêm sản phẩm A vào giỏ | ⬜ Pass / ⬜ Fail | |
| Thêm sản phẩm B vào giỏ | ⬜ Pass / ⬜ Fail | |
| Vào màn hình thanh toán | ⬜ Pass / ⬜ Fail | |
| Hiển thị phí vận chuyển | ⬜ Pass / ⬜ Fail | |
| Logic tính phí ship đúng | ⬜ Pass / ⬜ Fail | |
| Tổng tiền tính đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:**
**Ghi chú:**
**Ghi chú:**
**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot màn hình giỏ hàng
- [ ] Screenshot màn hình thanh toán với phí ship
- [ ] Screenshot log console (nếu có lỗi)

</details>

</details>

</details>

---

## TC-BHV-002: Kiểm tra phí vận chuyển khi chỉ có sản phẩm freeship

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-002 |
| **Description Test case** | Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm có freeship. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm có freeship vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Kiểm tra phần phí vận chuyển |
| **Expected Output** | - [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)<br>- [ ] Hiển thị badge "Miễn phí ship" rõ ràng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm có freeship trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-003: Kiểm tra phí vận chuyển khi chỉ có sản phẩm không freeship<br>### Mô tả<br>Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm không có freeship.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm không có freeship trong hệ thống<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm không có freeship vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Kiểm tra phần phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Phí vận chuyển > 0<br>- [ ] Phí ship được tính theo địa chỉ giao hàng<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship<br>- [ ] Hiển thị rõ ràng số tiền phí ship<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship > 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-004: Kiểm tra phí vận chuyển khi thay đổi địa chỉ giao hàng<br>### Mô tả<br>Kiểm tra phí vận chuyển cập nhật khi thay đổi địa chỉ giao hàng trong màn hình thanh toán.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đã có sản phẩm trong giỏ hàng<br>- User có nhiều địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship hiện tại<br>5. Click vào section địa chỉ giao hàng<br>6. Chọn địa chỉ khác (ví dụ: từ Hà Nội sang TP.HCM)<br>7. Quan sát phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Modal chọn địa chỉ hiển thị<br>- [ ] Có thể chọn địa chỉ khác<br>- [ ] Phí vận chuyển tự động cập nhật theo địa chỉ mới<br>- [ ] Tổng tiền cuối cùng cập nhật lại<br>- [ ] Hiển thị loading khi đang tính phí ship mới (nếu có)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Chọn địa chỉ mới \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-005: Kiểm tra phí vận chuyển khi chọn điểm nhận hàng<br>### Mô tả<br>Kiểm tra phí vận chuyển khi chọn điểm nhận hàng (pickup station) thay vì giao tận nhà.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đã có sản phẩm trong giỏ hàng<br>- Có điểm nhận hàng trong hệ thống<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship hiện tại (giao tận nhà)<br>5. Click "Chọn điểm nhận hàng" hoặc toggle<br>6. Chọn một điểm nhận hàng<br>7. Quan sát phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Modal danh sách điểm nhận hàng hiển thị<br>- [ ] Có thể chọn điểm nhận hàng<br>- [ ] Phí vận chuyển = 0 hoặc giảm đáng kể<br>- [ ] Địa chỉ giao hàng thay đổi thành địa chỉ điểm nhận hàng<br>- [ ] Tổng tiền cuối cùng giảm (do không có phí ship)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Chọn điểm nhận hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship = 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Địa chỉ cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-024: Kiểm tra hỗ trợ phí ship 100% (Miễn phí ship)<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship 100% (miễn phí ship hoàn toàn) khi đơn hàng đạt điều kiện.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship 100% (ví dụ: đơn hàng trên 500k được miễn phí ship)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ phí ship 100% (ví dụ: > 500k)<br>3. Vào màn hình thanh toán<br>4. Quan sát phần phí vận chuyển<br>5. Kiểm tra thông báo hỗ trợ phí ship<br>### Kết quả mong đợi<br>- [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 100% phí ship" hoặc "Miễn phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ (ví dụ: "Đơn hàng trên 500k được miễn phí ship")<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship = 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều kiện hiển thị rõ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-025: Kiểm tra hỗ trợ phí ship theo số tiền cố định<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship theo số tiền cố định (ví dụ: hỗ trợ 20.000đ phí ship).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship theo số tiền (ví dụ: hỗ trợ 20.000đ phí ship cho đơn hàng trên 300k)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 300k)<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship gốc (ví dụ: 30.000đ)<br>5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ<br>6. Kiểm tra tổng tiền<br>### Kết quả mong đợi<br>- [ ] Phí ship gốc hiển thị (ví dụ: 30.000đ)<br>- [ ] Hiển thị số tiền được hỗ trợ (ví dụ: -20.000đ)<br>- [ ] Phí ship cuối cùng = Phí ship gốc - Số tiền hỗ trợ (ví dụ: 30.000 - 20.000 = 10.000đ)<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 20.000đ phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship gốc hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Số tiền hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cuối cùng tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-026: Kiểm tra hỗ trợ phí ship theo phần trăm (%)<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship theo phần trăm (ví dụ: hỗ trợ 50% phí ship).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship theo % (ví dụ: hỗ trợ 50% phí ship cho đơn hàng trên 400k)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 400k)<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship gốc (ví dụ: 40.000đ)<br>5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ<br>6. Kiểm tra tổng tiền<br>### Kết quả mong đợi<br>- [ ] Phí ship gốc hiển thị (ví dụ: 40.000đ)<br>- [ ] Hiển thị % được hỗ trợ (ví dụ: -50% hoặc -20.000đ)<br>- [ ] Phí ship cuối cùng = Phí ship gốc × (100% - % hỗ trợ) (ví dụ: 40.000 × 50% = 20.000đ)<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 50% phí ship" hoặc "Được hỗ trợ 20.000đ phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship gốc hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| % hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cuối cùng tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Thêm Sản Phẩm Vào Giỏ Hàng<br>## TC-BHV-006: Thêm sản phẩm có variant vào giỏ hàng<br>### Mô tả<br>Kiểm tra quy trình thêm sản phẩm có nhiều variant (màu sắc, kích thước) vào giỏ hàng. Đảm bảo variant được chọn đúng và lưu vào giỏ hàng chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm có nhiều variant (màu sắc và kích thước) trong hệ thống<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Tìm và mở sản phẩm có variant**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm có variant<br>   - Click vào sản phẩm để xem chi tiết<br>   - Xác nhận trang chi tiết sản phẩm hiển thị<br>3. **Click nút "Thêm vào giỏ hàng"**<br>   - Scroll xuống cuối trang<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận modal chọn variant hiển thị<br>4. **Chọn variant sản phẩm**<br>   - Chọn màu sắc (ví dụ: Đỏ)<br>   - Quan sát danh sách kích thước cập nhật theo màu đã chọn<br>   - Chọn kích thước (ví dụ: M)<br>   - Quan sát giá cập nhật theo variant đã chọn<br>   - Chọn số lượng (ví dụ: 2)<br>5. **Xác nhận thêm vào giỏ**<br>   - Click nút "Xác nhận" hoặc "Thêm vào giỏ hàng"<br>   - Quan sát thông báo<br>6. **Kiểm tra sản phẩm trong giỏ hàng**<br>   - Click vào icon giỏ hàng<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>   - Kiểm tra variant đã chọn hiển thị đúng (màu: Đỏ, size: M)<br>   - Kiểm tra số lượng = 2<br>   - Kiểm tra giá = giá của variant đã chọn<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Trang chi tiết sản phẩm hiển thị đầy đủ thông tin<br>- [ ] Modal chọn variant hiển thị khi click "Thêm vào giỏ hàng"<br>- [ ] Modal hiển thị:<br>  - [ ] Hình ảnh sản phẩm<br>  - [ ] Tên sản phẩm<br>  - [ ] Giá sản phẩm<br>  - [ ] Danh sách option màu sắc<br>  - [ ] Danh sách option kích thước<br>  - [ ] Số lượng tồn kho<br>  - [ ] Bộ chọn số lượng<br>- [ ] Khi chọn màu, danh sách kích thước filter theo màu đã chọn<br>- [ ] Giá cập nhật theo variant đã chọn<br>- [ ] Số lượng không vượt quá tồn kho<br>- [ ] Click "Xác nhận" thêm vào giỏ thành công<br>- [ ] Hiển thị toast "Đã thêm vào giỏ hàng"<br>- [ ] Sản phẩm trong giỏ hàng hiển thị đúng variant đã chọn<br>- [ ] Số lượng trong giỏ = số lượng đã chọn<br>- [ ] Giá trong giỏ = giá của variant đã chọn<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Mở trang chi tiết \| ⬜ Pass / ⬜ Fail \| \|<br>\| Modal variant hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn màu sắc \| ⬜ Pass / ⬜ Fail \| \|<br>\| Filter kích thước theo màu \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn kích thước \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn số lượng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thêm vào giỏ thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Variant lưu đúng trong giỏ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal chọn variant<br>- [ ] Screenshot sản phẩm trong giỏ hàng<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-002 |
| **Description Test case** | Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm có freeship. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm có freeship vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Kiểm tra phần phí vận chuyển |
| **Expected Output** | - [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)<br>- [ ] Hiển thị badge "Miễn phí ship" rõ ràng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm có freeship trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-003: Kiểm tra phí vận chuyển khi chỉ có sản phẩm không freeship<br>### Mô tả<br>Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm không có freeship.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm không có freeship trong hệ thống<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm không có freeship vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Kiểm tra phần phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Phí vận chuyển > 0<br>- [ ] Phí ship được tính theo địa chỉ giao hàng<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship<br>- [ ] Hiển thị rõ ràng số tiền phí ship<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship > 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-004: Kiểm tra phí vận chuyển khi thay đổi địa chỉ giao hàng<br>### Mô tả<br>Kiểm tra phí vận chuyển cập nhật khi thay đổi địa chỉ giao hàng trong màn hình thanh toán.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đã có sản phẩm trong giỏ hàng<br>- User có nhiều địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship hiện tại<br>5. Click vào section địa chỉ giao hàng<br>6. Chọn địa chỉ khác (ví dụ: từ Hà Nội sang TP.HCM)<br>7. Quan sát phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Modal chọn địa chỉ hiển thị<br>- [ ] Có thể chọn địa chỉ khác<br>- [ ] Phí vận chuyển tự động cập nhật theo địa chỉ mới<br>- [ ] Tổng tiền cuối cùng cập nhật lại<br>- [ ] Hiển thị loading khi đang tính phí ship mới (nếu có)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Chọn địa chỉ mới \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-005: Kiểm tra phí vận chuyển khi chọn điểm nhận hàng<br>### Mô tả<br>Kiểm tra phí vận chuyển khi chọn điểm nhận hàng (pickup station) thay vì giao tận nhà.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đã có sản phẩm trong giỏ hàng<br>- Có điểm nhận hàng trong hệ thống<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship hiện tại (giao tận nhà)<br>5. Click "Chọn điểm nhận hàng" hoặc toggle<br>6. Chọn một điểm nhận hàng<br>7. Quan sát phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Modal danh sách điểm nhận hàng hiển thị<br>- [ ] Có thể chọn điểm nhận hàng<br>- [ ] Phí vận chuyển = 0 hoặc giảm đáng kể<br>- [ ] Địa chỉ giao hàng thay đổi thành địa chỉ điểm nhận hàng<br>- [ ] Tổng tiền cuối cùng giảm (do không có phí ship)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Chọn điểm nhận hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship = 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Địa chỉ cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-024: Kiểm tra hỗ trợ phí ship 100% (Miễn phí ship)<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship 100% (miễn phí ship hoàn toàn) khi đơn hàng đạt điều kiện.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship 100% (ví dụ: đơn hàng trên 500k được miễn phí ship)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ phí ship 100% (ví dụ: > 500k)<br>3. Vào màn hình thanh toán<br>4. Quan sát phần phí vận chuyển<br>5. Kiểm tra thông báo hỗ trợ phí ship<br>### Kết quả mong đợi<br>- [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 100% phí ship" hoặc "Miễn phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ (ví dụ: "Đơn hàng trên 500k được miễn phí ship")<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship = 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều kiện hiển thị rõ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-025: Kiểm tra hỗ trợ phí ship theo số tiền cố định<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship theo số tiền cố định (ví dụ: hỗ trợ 20.000đ phí ship).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship theo số tiền (ví dụ: hỗ trợ 20.000đ phí ship cho đơn hàng trên 300k)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 300k)<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship gốc (ví dụ: 30.000đ)<br>5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ<br>6. Kiểm tra tổng tiền<br>### Kết quả mong đợi<br>- [ ] Phí ship gốc hiển thị (ví dụ: 30.000đ)<br>- [ ] Hiển thị số tiền được hỗ trợ (ví dụ: -20.000đ)<br>- [ ] Phí ship cuối cùng = Phí ship gốc - Số tiền hỗ trợ (ví dụ: 30.000 - 20.000 = 10.000đ)<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 20.000đ phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship gốc hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Số tiền hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cuối cùng tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-026: Kiểm tra hỗ trợ phí ship theo phần trăm (%)<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship theo phần trăm (ví dụ: hỗ trợ 50% phí ship).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship theo % (ví dụ: hỗ trợ 50% phí ship cho đơn hàng trên 400k)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 400k)<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship gốc (ví dụ: 40.000đ)<br>5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ<br>6. Kiểm tra tổng tiền<br>### Kết quả mong đợi<br>- [ ] Phí ship gốc hiển thị (ví dụ: 40.000đ)<br>- [ ] Hiển thị % được hỗ trợ (ví dụ: -50% hoặc -20.000đ)<br>- [ ] Phí ship cuối cùng = Phí ship gốc × (100% - % hỗ trợ) (ví dụ: 40.000 × 50% = 20.000đ)<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 50% phí ship" hoặc "Được hỗ trợ 20.000đ phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship gốc hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| % hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cuối cùng tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Thêm Sản Phẩm Vào Giỏ Hàng<br>## TC-BHV-006: Thêm sản phẩm có variant vào giỏ hàng<br>### Mô tả<br>Kiểm tra quy trình thêm sản phẩm có nhiều variant (màu sắc, kích thước) vào giỏ hàng. Đảm bảo variant được chọn đúng và lưu vào giỏ hàng chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm có nhiều variant (màu sắc và kích thước) trong hệ thống<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Tìm và mở sản phẩm có variant**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm có variant<br>   - Click vào sản phẩm để xem chi tiết<br>   - Xác nhận trang chi tiết sản phẩm hiển thị<br>3. **Click nút "Thêm vào giỏ hàng"**<br>   - Scroll xuống cuối trang<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận modal chọn variant hiển thị<br>4. **Chọn variant sản phẩm**<br>   - Chọn màu sắc (ví dụ: Đỏ)<br>   - Quan sát danh sách kích thước cập nhật theo màu đã chọn<br>   - Chọn kích thước (ví dụ: M)<br>   - Quan sát giá cập nhật theo variant đã chọn<br>   - Chọn số lượng (ví dụ: 2)<br>5. **Xác nhận thêm vào giỏ**<br>   - Click nút "Xác nhận" hoặc "Thêm vào giỏ hàng"<br>   - Quan sát thông báo<br>6. **Kiểm tra sản phẩm trong giỏ hàng**<br>   - Click vào icon giỏ hàng<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>   - Kiểm tra variant đã chọn hiển thị đúng (màu: Đỏ, size: M)<br>   - Kiểm tra số lượng = 2<br>   - Kiểm tra giá = giá của variant đã chọn<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Trang chi tiết sản phẩm hiển thị đầy đủ thông tin<br>- [ ] Modal chọn variant hiển thị khi click "Thêm vào giỏ hàng"<br>- [ ] Modal hiển thị:<br>  - [ ] Hình ảnh sản phẩm<br>  - [ ] Tên sản phẩm<br>  - [ ] Giá sản phẩm<br>  - [ ] Danh sách option màu sắc<br>  - [ ] Danh sách option kích thước<br>  - [ ] Số lượng tồn kho<br>  - [ ] Bộ chọn số lượng<br>- [ ] Khi chọn màu, danh sách kích thước filter theo màu đã chọn<br>- [ ] Giá cập nhật theo variant đã chọn<br>- [ ] Số lượng không vượt quá tồn kho<br>- [ ] Click "Xác nhận" thêm vào giỏ thành công<br>- [ ] Hiển thị toast "Đã thêm vào giỏ hàng"<br>- [ ] Sản phẩm trong giỏ hàng hiển thị đúng variant đã chọn<br>- [ ] Số lượng trong giỏ = số lượng đã chọn<br>- [ ] Giá trong giỏ = giá của variant đã chọn<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Mở trang chi tiết \| ⬜ Pass / ⬜ Fail \| \|<br>\| Modal variant hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn màu sắc \| ⬜ Pass / ⬜ Fail \| \|<br>\| Filter kích thước theo màu \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn kích thước \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn số lượng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thêm vào giỏ thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Variant lưu đúng trong giỏ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal chọn variant<br>- [ ] Screenshot sản phẩm trong giỏ hàng<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-002 |
| **Description Test case** | Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm có freeship. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm có freeship vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Kiểm tra phần phí vận chuyển |
| **Expected Output** | - [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)<br>- [ ] Hiển thị badge "Miễn phí ship" rõ ràng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm có freeship trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-003: Kiểm tra phí vận chuyển khi chỉ có sản phẩm không freeship<br>### Mô tả<br>Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm không có freeship.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm không có freeship trong hệ thống<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm không có freeship vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Kiểm tra phần phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Phí vận chuyển > 0<br>- [ ] Phí ship được tính theo địa chỉ giao hàng<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship<br>- [ ] Hiển thị rõ ràng số tiền phí ship<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship > 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-004: Kiểm tra phí vận chuyển khi thay đổi địa chỉ giao hàng<br>### Mô tả<br>Kiểm tra phí vận chuyển cập nhật khi thay đổi địa chỉ giao hàng trong màn hình thanh toán.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đã có sản phẩm trong giỏ hàng<br>- User có nhiều địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship hiện tại<br>5. Click vào section địa chỉ giao hàng<br>6. Chọn địa chỉ khác (ví dụ: từ Hà Nội sang TP.HCM)<br>7. Quan sát phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Modal chọn địa chỉ hiển thị<br>- [ ] Có thể chọn địa chỉ khác<br>- [ ] Phí vận chuyển tự động cập nhật theo địa chỉ mới<br>- [ ] Tổng tiền cuối cùng cập nhật lại<br>- [ ] Hiển thị loading khi đang tính phí ship mới (nếu có)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Chọn địa chỉ mới \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-005: Kiểm tra phí vận chuyển khi chọn điểm nhận hàng<br>### Mô tả<br>Kiểm tra phí vận chuyển khi chọn điểm nhận hàng (pickup station) thay vì giao tận nhà.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đã có sản phẩm trong giỏ hàng<br>- Có điểm nhận hàng trong hệ thống<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship hiện tại (giao tận nhà)<br>5. Click "Chọn điểm nhận hàng" hoặc toggle<br>6. Chọn một điểm nhận hàng<br>7. Quan sát phí vận chuyển<br>### Kết quả mong đợi<br>- [ ] Modal danh sách điểm nhận hàng hiển thị<br>- [ ] Có thể chọn điểm nhận hàng<br>- [ ] Phí vận chuyển = 0 hoặc giảm đáng kể<br>- [ ] Địa chỉ giao hàng thay đổi thành địa chỉ điểm nhận hàng<br>- [ ] Tổng tiền cuối cùng giảm (do không có phí ship)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Chọn điểm nhận hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship = 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Địa chỉ cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-024: Kiểm tra hỗ trợ phí ship 100% (Miễn phí ship)<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship 100% (miễn phí ship hoàn toàn) khi đơn hàng đạt điều kiện.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship 100% (ví dụ: đơn hàng trên 500k được miễn phí ship)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ phí ship 100% (ví dụ: > 500k)<br>3. Vào màn hình thanh toán<br>4. Quan sát phần phí vận chuyển<br>5. Kiểm tra thông báo hỗ trợ phí ship<br>### Kết quả mong đợi<br>- [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 100% phí ship" hoặc "Miễn phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ (ví dụ: "Đơn hàng trên 500k được miễn phí ship")<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship = 0 \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều kiện hiển thị rõ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-025: Kiểm tra hỗ trợ phí ship theo số tiền cố định<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship theo số tiền cố định (ví dụ: hỗ trợ 20.000đ phí ship).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship theo số tiền (ví dụ: hỗ trợ 20.000đ phí ship cho đơn hàng trên 300k)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 300k)<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship gốc (ví dụ: 30.000đ)<br>5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ<br>6. Kiểm tra tổng tiền<br>### Kết quả mong đợi<br>- [ ] Phí ship gốc hiển thị (ví dụ: 30.000đ)<br>- [ ] Hiển thị số tiền được hỗ trợ (ví dụ: -20.000đ)<br>- [ ] Phí ship cuối cùng = Phí ship gốc - Số tiền hỗ trợ (ví dụ: 30.000 - 20.000 = 10.000đ)<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 20.000đ phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship gốc hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Số tiền hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cuối cùng tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-026: Kiểm tra hỗ trợ phí ship theo phần trăm (%)<br>### Mô tả<br>Kiểm tra tính năng hỗ trợ phí ship theo phần trăm (ví dụ: hỗ trợ 50% phí ship).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có chương trình hỗ trợ phí ship theo % (ví dụ: hỗ trợ 50% phí ship cho đơn hàng trên 400k)<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 400k)<br>3. Vào màn hình thanh toán<br>4. Ghi nhận phí ship gốc (ví dụ: 40.000đ)<br>5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ<br>6. Kiểm tra tổng tiền<br>### Kết quả mong đợi<br>- [ ] Phí ship gốc hiển thị (ví dụ: 40.000đ)<br>- [ ] Hiển thị % được hỗ trợ (ví dụ: -50% hoặc -20.000đ)<br>- [ ] Phí ship cuối cùng = Phí ship gốc × (100% - % hỗ trợ) (ví dụ: 40.000 × 50% = 20.000đ)<br>- [ ] Hiển thị badge/thông báo "Được hỗ trợ 50% phí ship" hoặc "Được hỗ trợ 20.000đ phí ship"<br>- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng<br>- [ ] Hiển thị rõ điều kiện được hỗ trợ<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phí ship gốc hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| % hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Phí ship cuối cùng tính đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hỗ trợ hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Thêm Sản Phẩm Vào Giỏ Hàng<br>## TC-BHV-006: Thêm sản phẩm có variant vào giỏ hàng<br>### Mô tả<br>Kiểm tra quy trình thêm sản phẩm có nhiều variant (màu sắc, kích thước) vào giỏ hàng. Đảm bảo variant được chọn đúng và lưu vào giỏ hàng chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm có nhiều variant (màu sắc và kích thước) trong hệ thống<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Tìm và mở sản phẩm có variant**<br>   - Tìm kiếm hoặc duyệt đến sản phẩm có variant<br>   - Click vào sản phẩm để xem chi tiết<br>   - Xác nhận trang chi tiết sản phẩm hiển thị<br>3. **Click nút "Thêm vào giỏ hàng"**<br>   - Scroll xuống cuối trang<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận modal chọn variant hiển thị<br>4. **Chọn variant sản phẩm**<br>   - Chọn màu sắc (ví dụ: Đỏ)<br>   - Quan sát danh sách kích thước cập nhật theo màu đã chọn<br>   - Chọn kích thước (ví dụ: M)<br>   - Quan sát giá cập nhật theo variant đã chọn<br>   - Chọn số lượng (ví dụ: 2)<br>5. **Xác nhận thêm vào giỏ**<br>   - Click nút "Xác nhận" hoặc "Thêm vào giỏ hàng"<br>   - Quan sát thông báo<br>6. **Kiểm tra sản phẩm trong giỏ hàng**<br>   - Click vào icon giỏ hàng<br>   - Xác nhận sản phẩm đã được thêm vào giỏ<br>   - Kiểm tra variant đã chọn hiển thị đúng (màu: Đỏ, size: M)<br>   - Kiểm tra số lượng = 2<br>   - Kiểm tra giá = giá của variant đã chọn<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Trang chi tiết sản phẩm hiển thị đầy đủ thông tin<br>- [ ] Modal chọn variant hiển thị khi click "Thêm vào giỏ hàng"<br>- [ ] Modal hiển thị:<br>  - [ ] Hình ảnh sản phẩm<br>  - [ ] Tên sản phẩm<br>  - [ ] Giá sản phẩm<br>  - [ ] Danh sách option màu sắc<br>  - [ ] Danh sách option kích thước<br>  - [ ] Số lượng tồn kho<br>  - [ ] Bộ chọn số lượng<br>- [ ] Khi chọn màu, danh sách kích thước filter theo màu đã chọn<br>- [ ] Giá cập nhật theo variant đã chọn<br>- [ ] Số lượng không vượt quá tồn kho<br>- [ ] Click "Xác nhận" thêm vào giỏ thành công<br>- [ ] Hiển thị toast "Đã thêm vào giỏ hàng"<br>- [ ] Sản phẩm trong giỏ hàng hiển thị đúng variant đã chọn<br>- [ ] Số lượng trong giỏ = số lượng đã chọn<br>- [ ] Giá trong giỏ = giá của variant đã chọn<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Mở trang chi tiết \| ⬜ Pass / ⬜ Fail \| \|<br>\| Modal variant hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn màu sắc \| ⬜ Pass / ⬜ Fail \| \|<br>\| Filter kích thước theo màu \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn kích thước \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn số lượng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thêm vào giỏ thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Variant lưu đúng trong giỏ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal chọn variant<br>- [ ] Screenshot sản phẩm trong giỏ hàng<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details><br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm có freeship.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm có freeship trong hệ thống

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm có freeship vào giỏ hàng
3. Vào màn hình thanh toán
4. Kiểm tra phần phí vận chuyển

### Kết quả mong đợi
- [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"
- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)
- [ ] Hiển thị badge "Miễn phí ship" rõ ràng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phí ship = 0 | ⬜ Pass / ⬜ Fail | |
| Tổng tiền đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:**
**Ghi chú:**
**Ghi chú:**
**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-003: Kiểm tra phí vận chuyển khi chỉ có sản phẩm không freeship

### Mô tả
Kiểm tra phí vận chuyển khi giỏ hàng chỉ chứa sản phẩm không có freeship.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm không có freeship trong hệ thống

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm không có freeship vào giỏ hàng
3. Vào màn hình thanh toán
4. Kiểm tra phần phí vận chuyển

### Kết quả mong đợi

- [ ] Phí vận chuyển > 0
- [ ] Phí ship được tính theo địa chỉ giao hàng
- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship
- [ ] Hiển thị rõ ràng số tiền phí ship

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phí ship > 0 | ⬜ Pass / ⬜ Fail | |
| Phí ship tính đúng | ⬜ Pass / ⬜ Fail | |
| Tổng tiền đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-004: Kiểm tra phí vận chuyển khi thay đổi địa chỉ giao hàng

### Mô tả
Kiểm tra phí vận chuyển cập nhật khi thay đổi địa chỉ giao hàng trong màn hình thanh toán.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Đã có sản phẩm trong giỏ hàng
- User có nhiều địa chỉ giao hàng đã lưu

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng
3. Vào màn hình thanh toán
4. Ghi nhận phí ship hiện tại
5. Click vào section địa chỉ giao hàng
6. Chọn địa chỉ khác (ví dụ: từ Hà Nội sang TP.HCM)
7. Quan sát phí vận chuyển

### Kết quả mong đợi

- [ ] Modal chọn địa chỉ hiển thị
- [ ] Có thể chọn địa chỉ khác
- [ ] Phí vận chuyển tự động cập nhật theo địa chỉ mới
- [ ] Tổng tiền cuối cùng cập nhật lại
- [ ] Hiển thị loading khi đang tính phí ship mới (nếu có)

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Chọn địa chỉ mới | ⬜ Pass / ⬜ Fail | |
| Phí ship cập nhật | ⬜ Pass / ⬜ Fail | |
| Tổng tiền cập nhật | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-005: Kiểm tra phí vận chuyển khi chọn điểm nhận hàng

### Mô tả
Kiểm tra phí vận chuyển khi chọn điểm nhận hàng (pickup station) thay vì giao tận nhà.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Đã có sản phẩm trong giỏ hàng
- Có điểm nhận hàng trong hệ thống

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng
3. Vào màn hình thanh toán
4. Ghi nhận phí ship hiện tại (giao tận nhà)
5. Click "Chọn điểm nhận hàng" hoặc toggle
6. Chọn một điểm nhận hàng
7. Quan sát phí vận chuyển

### Kết quả mong đợi

- [ ] Modal danh sách điểm nhận hàng hiển thị
- [ ] Có thể chọn điểm nhận hàng
- [ ] Phí vận chuyển = 0 hoặc giảm đáng kể
- [ ] Địa chỉ giao hàng thay đổi thành địa chỉ điểm nhận hàng
- [ ] Tổng tiền cuối cùng giảm (do không có phí ship)

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Chọn điểm nhận hàng | ⬜ Pass / ⬜ Fail | |
| Phí ship = 0 | ⬜ Pass / ⬜ Fail | |
| Địa chỉ cập nhật | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-024: Kiểm tra hỗ trợ phí ship 100% (Miễn phí ship)

### Mô tả
Kiểm tra tính năng hỗ trợ phí ship 100% (miễn phí ship hoàn toàn) khi đơn hàng đạt điều kiện.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có chương trình hỗ trợ phí ship 100% (ví dụ: đơn hàng trên 500k được miễn phí ship)

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ phí ship 100% (ví dụ: > 500k)
3. Vào màn hình thanh toán
4. Quan sát phần phí vận chuyển
5. Kiểm tra thông báo hỗ trợ phí ship

### Kết quả mong đợi

- [ ] Phí vận chuyển = 0 hoặc hiển thị "Miễn phí ship"
- [ ] Hiển thị badge/thông báo "Được hỗ trợ 100% phí ship" hoặc "Miễn phí ship"
- [ ] Tổng tiền = Tổng giá sản phẩm (không cộng phí ship)
- [ ] Hiển thị rõ điều kiện được hỗ trợ (ví dụ: "Đơn hàng trên 500k được miễn phí ship")

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phí ship = 0 | ⬜ Pass / ⬜ Fail | |
| Thông báo hỗ trợ hiển thị | ⬜ Pass / ⬜ Fail | |
| Tổng tiền đúng | ⬜ Pass / ⬜ Fail | |
| Điều kiện hiển thị rõ | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-025: Kiểm tra hỗ trợ phí ship theo số tiền cố định

### Mô tả
Kiểm tra tính năng hỗ trợ phí ship theo số tiền cố định (ví dụ: hỗ trợ 20.000đ phí ship).

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có chương trình hỗ trợ phí ship theo số tiền (ví dụ: hỗ trợ 20.000đ phí ship cho đơn hàng trên 300k)

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 300k)
3. Vào màn hình thanh toán
4. Ghi nhận phí ship gốc (ví dụ: 30.000đ)
5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ
6. Kiểm tra tổng tiền

### Kết quả mong đợi

- [ ] Phí ship gốc hiển thị (ví dụ: 30.000đ)
- [ ] Hiển thị số tiền được hỗ trợ (ví dụ: -20.000đ)
- [ ] Phí ship cuối cùng = Phí ship gốc - Số tiền hỗ trợ (ví dụ: 30.000 - 20.000 = 10.000đ)
- [ ] Hiển thị badge/thông báo "Được hỗ trợ 20.000đ phí ship"
- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng
- [ ] Hiển thị rõ điều kiện được hỗ trợ

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phí ship gốc hiển thị | ⬜ Pass / ⬜ Fail | |
| Số tiền hỗ trợ hiển thị | ⬜ Pass / ⬜ Fail | |
| Phí ship cuối cùng tính đúng | ⬜ Pass / ⬜ Fail | |
| Thông báo hỗ trợ hiển thị | ⬜ Pass / ⬜ Fail | |
| Tổng tiền đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-026: Kiểm tra hỗ trợ phí ship theo phần trăm (%)

### Mô tả
Kiểm tra tính năng hỗ trợ phí ship theo phần trăm (ví dụ: hỗ trợ 50% phí ship).

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có chương trình hỗ trợ phí ship theo % (ví dụ: hỗ trợ 50% phí ship cho đơn hàng trên 400k)

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng với tổng tiền đạt điều kiện hỗ trợ (ví dụ: > 400k)
3. Vào màn hình thanh toán
4. Ghi nhận phí ship gốc (ví dụ: 40.000đ)
5. Quan sát phần phí vận chuyển sau khi áp dụng hỗ trợ
6. Kiểm tra tổng tiền

### Kết quả mong đợi

- [ ] Phí ship gốc hiển thị (ví dụ: 40.000đ)
- [ ] Hiển thị % được hỗ trợ (ví dụ: -50% hoặc -20.000đ)
- [ ] Phí ship cuối cùng = Phí ship gốc × (100% - % hỗ trợ) (ví dụ: 40.000 × 50% = 20.000đ)
- [ ] Hiển thị badge/thông báo "Được hỗ trợ 50% phí ship" hoặc "Được hỗ trợ 20.000đ phí ship"
- [ ] Tổng tiền = Tổng giá sản phẩm + Phí ship cuối cùng
- [ ] Hiển thị rõ điều kiện được hỗ trợ

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phí ship gốc hiển thị | ⬜ Pass / ⬜ Fail | |
| % hỗ trợ hiển thị | ⬜ Pass / ⬜ Fail | |
| Phí ship cuối cùng tính đúng | ⬜ Pass / ⬜ Fail | |
| Thông báo hỗ trợ hiển thị | ⬜ Pass / ⬜ Fail | |
| Tổng tiền đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

# Thêm Sản Phẩm Vào Giỏ Hàng

## TC-BHV-006: Thêm sản phẩm có variant vào giỏ hàng

### Mô tả
Kiểm tra quy trình thêm sản phẩm có nhiều variant (màu sắc, kích thước) vào giỏ hàng. Đảm bảo variant được chọn đúng và lưu vào giỏ hàng chính xác.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có sản phẩm có nhiều variant (màu sắc và kích thước) trong hệ thống

### Các bước thực hiện

1. **Đăng nhập vào ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Click vào icon Profile
   - Nhập thông tin đăng nhập
   - Xác nhận đăng nhập thành công

2. **Tìm và mở sản phẩm có variant**
   - Tìm kiếm hoặc duyệt đến sản phẩm có variant
   - Click vào sản phẩm để xem chi tiết
   - Xác nhận trang chi tiết sản phẩm hiển thị

3. **Click nút "Thêm vào giỏ hàng"**
   - Scroll xuống cuối trang
   - Click nút "Thêm vào giỏ hàng"
   - Xác nhận modal chọn variant hiển thị

4. **Chọn variant sản phẩm**
   - Chọn màu sắc (ví dụ: Đỏ)
   - Quan sát danh sách kích thước cập nhật theo màu đã chọn
   - Chọn kích thước (ví dụ: M)
   - Quan sát giá cập nhật theo variant đã chọn
   - Chọn số lượng (ví dụ: 2)

5. **Xác nhận thêm vào giỏ**
   - Click nút "Xác nhận" hoặc "Thêm vào giỏ hàng"
   - Quan sát thông báo

6. **Kiểm tra sản phẩm trong giỏ hàng**
   - Click vào icon giỏ hàng
   - Xác nhận sản phẩm đã được thêm vào giỏ
   - Kiểm tra variant đã chọn hiển thị đúng (màu: Đỏ, size: M)
   - Kiểm tra số lượng = 2
   - Kiểm tra giá = giá của variant đã chọn

### Kết quả mong đợi

- [ ] Đăng nhập thành công
- [ ] Trang chi tiết sản phẩm hiển thị đầy đủ thông tin
- [ ] Modal chọn variant hiển thị khi click "Thêm vào giỏ hàng"
- [ ] Modal hiển thị:
  - [ ] Hình ảnh sản phẩm
  - [ ] Tên sản phẩm
  - [ ] Giá sản phẩm
  - [ ] Danh sách option màu sắc
  - [ ] Danh sách option kích thước
  - [ ] Số lượng tồn kho
  - [ ] Bộ chọn số lượng
- [ ] Khi chọn màu, danh sách kích thước filter theo màu đã chọn
- [ ] Giá cập nhật theo variant đã chọn
- [ ] Số lượng không vượt quá tồn kho
- [ ] Click "Xác nhận" thêm vào giỏ thành công
- [ ] Hiển thị toast "Đã thêm vào giỏ hàng"
- [ ] Sản phẩm trong giỏ hàng hiển thị đúng variant đã chọn
- [ ] Số lượng trong giỏ = số lượng đã chọn
- [ ] Giá trong giỏ = giá của variant đã chọn

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Đăng nhập | ⬜ Pass / ⬜ Fail | |
| Mở trang chi tiết | ⬜ Pass / ⬜ Fail | |
| Modal variant hiển thị | ⬜ Pass / ⬜ Fail | |
| Chọn màu sắc | ⬜ Pass / ⬜ Fail | |
| Filter kích thước theo màu | ⬜ Pass / ⬜ Fail | |
| Chọn kích thước | ⬜ Pass / ⬜ Fail | |
| Giá cập nhật | ⬜ Pass / ⬜ Fail | |
| Chọn số lượng | ⬜ Pass / ⬜ Fail | |
| Thêm vào giỏ thành công | ⬜ Pass / ⬜ Fail | |
| Variant lưu đúng trong giỏ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot modal chọn variant
- [ ] Screenshot sản phẩm trong giỏ hàng
- [ ] Screenshot log console (nếu có lỗi)

</details>

</details>

</details>

---

## TC-BHV-007: Thêm sản phẩm không có variant vào giỏ hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-007 |
| **Description Test case** | Kiểm tra quy trình thêm sản phẩm không có variant vào giỏ hàng. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Tìm và mở sản phẩm không có variant<br>3. Click nút "Thêm vào giỏ hàng"<br>4. Chọn số lượng (nếu modal hiển thị)<br>5. Click "Xác nhận"<br>6. Kiểm tra sản phẩm trong giỏ hàng |
| **Expected Output** | - [ ] Modal variant hiển thị (chỉ có phần số lượng, không có màu/kích thước)<br>- [ ] Có thể chọn số lượng<br>- [ ] Thêm vào giỏ thành công<br>- [ ] Sản phẩm trong giỏ không có thông tin variant |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm không có variant trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-008: Thêm cùng sản phẩm với variant khác nhau vào giỏ<br>### Mô tả<br>Kiểm tra thêm cùng một sản phẩm nhưng với variant khác nhau vào giỏ hàng. Đảm bảo hệ thống coi đây là 2 item riêng biệt.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm có nhiều variant<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm với variant: Màu Đỏ, Size M vào giỏ<br>3. Thêm lại cùng sản phẩm với variant: Màu Xanh, Size L vào giỏ<br>4. Vào giỏ hàng kiểm tra<br>### Kết quả mong đợi<br>- [ ] Giỏ hàng hiển thị 2 item riêng biệt<br>- [ ] Item 1: Màu Đỏ, Size M<br>- [ ] Item 2: Màu Xanh, Size L<br>- [ ] Tổng số lượng = 2<br>- [ ] Tổng tiền = (Giá variant 1) + (Giá variant 2)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Hiển thị 2 item riêng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Variant hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-009: Thêm sản phẩm hết hàng vào giỏ<br>### Mô tả<br>Kiểm tra xử lý khi thử thêm sản phẩm hết hàng vào giỏ hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm với stock = 0<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Mở trang chi tiết sản phẩm hết hàng<br>3. Quan sát UI<br>4. Thử click "Thêm vào giỏ hàng" (nếu có)<br>### Kết quả mong đợi<br>- [ ] Hiển thị badge "Hết hàng" hoặc "Tạm hết hàng"<br>- [ ] Nút "Thêm vào giỏ hàng" bị disable hoặc ẩn<br>- [ ] Nút "Mua ngay" bị disable hoặc ẩn<br>- [ ] Hiển thị thông báo "Sản phẩm tạm thời hết hàng"<br>- [ ] Không thể thêm vào giỏ hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Badge hết hàng hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút bị disable/ẩn \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không thể thêm vào giỏ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-010: Thêm sản phẩm với số lượng vượt tồn kho<br>### Mô tả<br>Kiểm tra xử lý khi thử thêm sản phẩm với số lượng vượt quá tồn kho.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm với tồn kho = 5<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Mở trang chi tiết sản phẩm có tồn kho = 5<br>3. Click "Thêm vào giỏ hàng"<br>4. Thử chọn số lượng = 10 (vượt tồn kho)<br>5. Quan sát hành vi<br>### Kết quả mong đợi<br>- [ ] Số lượng tối đa = 5 (tồn kho)<br>- [ ] Không thể tăng số lượng > 5<br>- [ ] Hiển thị cảnh báo "Chỉ còn 5 sản phẩm"<br>- [ ] Nút "+" bị disable khi đạt số lượng tối đa<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Giới hạn số lượng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Cảnh báo hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút + bị disable \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Quy Trình Thanh Toán<br>## TC-BHV-011: Quy trình thanh toán hoàn chỉnh<br>### Mô tả<br>Kiểm tra quy trình thanh toán hoàn chỉnh từ giỏ hàng đến đặt hàng thành công. Đảm bảo tất cả các bước hoạt động đúng và thông tin được lưu chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br>- **Test end-to-end (E2E Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>- Có voucher có thể sử dụng (nếu test voucher)<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Kiểm tra giỏ hàng**<br>   - Click vào icon giỏ hàng<br>   - Xác nhận có sản phẩm trong giỏ<br>   - Chọn sản phẩm muốn thanh toán (checkbox)<br>   - Kiểm tra tổng tiền<br>3. **Áp dụng voucher (nếu có)**<br>   - Click "Áp dụng voucher" hoặc "Chọn voucher"<br>   - Chọn một voucher hợp lệ<br>   - Xác nhận voucher được áp dụng<br>   - Kiểm tra tổng tiền đã giảm<br>4. **Click "Thanh toán"**<br>   - Click nút "Thanh toán"<br>   - Xác nhận điều hướng đến màn hình checkout<br>5. **Kiểm tra màn hình thanh toán**<br>   - Xác nhận hiển thị đầy đủ các section:<br>     - Địa chỉ giao hàng<br>     - Danh sách sản phẩm<br>     - Phí vận chuyển<br>     - Voucher (nếu đã áp dụng)<br>     - Tổng tiền<br>     - Phương thức thanh toán<br>6. **Chọn/kiểm tra địa chỉ giao hàng**<br>   - Xác nhận địa chỉ hiển thị đúng<br>   - Nếu cần đổi, click vào section địa chỉ<br>   - Chọn địa chỉ khác hoặc tạo mới<br>   - Xác nhận địa chỉ được cập nhật<br>7. **Chọn phương thức thanh toán**<br>   - Scroll đến section phương thức thanh toán<br>   - Chọn một phương thức (ví dụ: COD)<br>   - Xác nhận phương thức được chọn<br>8. **Xem lại thông tin đơn hàng**<br>   - Kiểm tra danh sách sản phẩm đúng<br>   - Kiểm tra tổng tiền sản phẩm đúng<br>   - Kiểm tra phí ship đúng<br>   - Kiểm tra giá trị giảm từ voucher đúng<br>   - Kiểm tra tổng tiền cuối cùng đúng<br>9. **Click "Đặt hàng"**<br>   - Click nút "Đặt hàng" hoặc "Xác nhận đặt hàng"<br>   - Quan sát loading indicator<br>   - Chờ kết quả<br>10. **Kiểm tra kết quả đặt hàng**<br>    - Xác nhận đặt hàng thành công<br>    - Quan sát thông báo<br>    - Kiểm tra điều hướng<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Giỏ hàng hiển thị đúng sản phẩm<br>- [ ] Có thể chọn sản phẩm để thanh toán<br>- [ ] Voucher được áp dụng thành công (nếu có)<br>- [ ] Tổng tiền cập nhật sau khi áp dụng voucher<br>- [ ] Điều hướng đến màn hình checkout thành công<br>- [ ] Màn hình checkout hiển thị đầy đủ:<br>  - [ ] Địa chỉ giao hàng<br>  - [ ] Danh sách sản phẩm với đầy đủ thông tin<br>  - [ ] Phí vận chuyển<br>  - [ ] Voucher đã áp dụng<br>  - [ ] Tổng tiền cuối cùng<br>  - [ ] Phương thức thanh toán<br>- [ ] Có thể chọn/đổi địa chỉ giao hàng<br>- [ ] Phí ship cập nhật khi đổi địa chỉ<br>- [ ] Có thể chọn phương thức thanh toán<br>- [ ] Thông tin đơn hàng hiển thị chính xác:<br>  - [ ] Tổng tiền sản phẩm = tổng (giá × số lượng)<br>  - [ ] Phí ship = phí ship theo địa chỉ<br>  - [ ] Giá trị giảm từ voucher = giá trị voucher<br>  - [ ] Tổng tiền cuối = (Tổng sản phẩm + Phí ship) - Voucher<br>- [ ] Click "Đặt hàng" gửi request thành công<br>- [ ] Hiển thị loading khi đang xử lý<br>- [ ] Đặt hàng thành công<br>- [ ] Hiển thị thông báo "Đặt hàng thành công"<br>- [ ] Điều hướng đến trang chi tiết đơn hàng hoặc trang đơn hàng<br>- [ ] Đơn hàng xuất hiện trong danh sách đơn hàng với trạng thái "Chờ xác nhận"<br>- [ ] Giỏ hàng được cập nhật (xóa sản phẩm đã đặt hoặc giữ lại)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Kiểm tra giỏ hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Áp dụng voucher \| ⬜ Pass / ⬜ Fail \| \|<br>\| Vào màn hình checkout \| ⬜ Pass / ⬜ Fail \| \|<br>\| Hiển thị đầy đủ thông tin \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn địa chỉ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn phương thức thanh toán \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tính toán tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot màn hình giỏ hàng<br>- [ ] Screenshot màn hình checkout<br>- [ ] Screenshot thông báo đặt hàng thành công<br>- [ ] Screenshot đơn hàng trong danh sách<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-007 |
| **Description Test case** | Kiểm tra quy trình thêm sản phẩm không có variant vào giỏ hàng. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Tìm và mở sản phẩm không có variant<br>3. Click nút "Thêm vào giỏ hàng"<br>4. Chọn số lượng (nếu modal hiển thị)<br>5. Click "Xác nhận"<br>6. Kiểm tra sản phẩm trong giỏ hàng |
| **Expected Output** | - [ ] Modal variant hiển thị (chỉ có phần số lượng, không có màu/kích thước)<br>- [ ] Có thể chọn số lượng<br>- [ ] Thêm vào giỏ thành công<br>- [ ] Sản phẩm trong giỏ không có thông tin variant |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm không có variant trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-008: Thêm cùng sản phẩm với variant khác nhau vào giỏ<br>### Mô tả<br>Kiểm tra thêm cùng một sản phẩm nhưng với variant khác nhau vào giỏ hàng. Đảm bảo hệ thống coi đây là 2 item riêng biệt.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm có nhiều variant<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm với variant: Màu Đỏ, Size M vào giỏ<br>3. Thêm lại cùng sản phẩm với variant: Màu Xanh, Size L vào giỏ<br>4. Vào giỏ hàng kiểm tra<br>### Kết quả mong đợi<br>- [ ] Giỏ hàng hiển thị 2 item riêng biệt<br>- [ ] Item 1: Màu Đỏ, Size M<br>- [ ] Item 2: Màu Xanh, Size L<br>- [ ] Tổng số lượng = 2<br>- [ ] Tổng tiền = (Giá variant 1) + (Giá variant 2)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Hiển thị 2 item riêng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Variant hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-009: Thêm sản phẩm hết hàng vào giỏ<br>### Mô tả<br>Kiểm tra xử lý khi thử thêm sản phẩm hết hàng vào giỏ hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm với stock = 0<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Mở trang chi tiết sản phẩm hết hàng<br>3. Quan sát UI<br>4. Thử click "Thêm vào giỏ hàng" (nếu có)<br>### Kết quả mong đợi<br>- [ ] Hiển thị badge "Hết hàng" hoặc "Tạm hết hàng"<br>- [ ] Nút "Thêm vào giỏ hàng" bị disable hoặc ẩn<br>- [ ] Nút "Mua ngay" bị disable hoặc ẩn<br>- [ ] Hiển thị thông báo "Sản phẩm tạm thời hết hàng"<br>- [ ] Không thể thêm vào giỏ hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Badge hết hàng hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút bị disable/ẩn \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không thể thêm vào giỏ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-010: Thêm sản phẩm với số lượng vượt tồn kho<br>### Mô tả<br>Kiểm tra xử lý khi thử thêm sản phẩm với số lượng vượt quá tồn kho.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm với tồn kho = 5<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Mở trang chi tiết sản phẩm có tồn kho = 5<br>3. Click "Thêm vào giỏ hàng"<br>4. Thử chọn số lượng = 10 (vượt tồn kho)<br>5. Quan sát hành vi<br>### Kết quả mong đợi<br>- [ ] Số lượng tối đa = 5 (tồn kho)<br>- [ ] Không thể tăng số lượng > 5<br>- [ ] Hiển thị cảnh báo "Chỉ còn 5 sản phẩm"<br>- [ ] Nút "+" bị disable khi đạt số lượng tối đa<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Giới hạn số lượng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Cảnh báo hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút + bị disable \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Quy Trình Thanh Toán<br>## TC-BHV-011: Quy trình thanh toán hoàn chỉnh<br>### Mô tả<br>Kiểm tra quy trình thanh toán hoàn chỉnh từ giỏ hàng đến đặt hàng thành công. Đảm bảo tất cả các bước hoạt động đúng và thông tin được lưu chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br>- **Test end-to-end (E2E Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>- Có voucher có thể sử dụng (nếu test voucher)<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Kiểm tra giỏ hàng**<br>   - Click vào icon giỏ hàng<br>   - Xác nhận có sản phẩm trong giỏ<br>   - Chọn sản phẩm muốn thanh toán (checkbox)<br>   - Kiểm tra tổng tiền<br>3. **Áp dụng voucher (nếu có)**<br>   - Click "Áp dụng voucher" hoặc "Chọn voucher"<br>   - Chọn một voucher hợp lệ<br>   - Xác nhận voucher được áp dụng<br>   - Kiểm tra tổng tiền đã giảm<br>4. **Click "Thanh toán"**<br>   - Click nút "Thanh toán"<br>   - Xác nhận điều hướng đến màn hình checkout<br>5. **Kiểm tra màn hình thanh toán**<br>   - Xác nhận hiển thị đầy đủ các section:<br>     - Địa chỉ giao hàng<br>     - Danh sách sản phẩm<br>     - Phí vận chuyển<br>     - Voucher (nếu đã áp dụng)<br>     - Tổng tiền<br>     - Phương thức thanh toán<br>6. **Chọn/kiểm tra địa chỉ giao hàng**<br>   - Xác nhận địa chỉ hiển thị đúng<br>   - Nếu cần đổi, click vào section địa chỉ<br>   - Chọn địa chỉ khác hoặc tạo mới<br>   - Xác nhận địa chỉ được cập nhật<br>7. **Chọn phương thức thanh toán**<br>   - Scroll đến section phương thức thanh toán<br>   - Chọn một phương thức (ví dụ: COD)<br>   - Xác nhận phương thức được chọn<br>8. **Xem lại thông tin đơn hàng**<br>   - Kiểm tra danh sách sản phẩm đúng<br>   - Kiểm tra tổng tiền sản phẩm đúng<br>   - Kiểm tra phí ship đúng<br>   - Kiểm tra giá trị giảm từ voucher đúng<br>   - Kiểm tra tổng tiền cuối cùng đúng<br>9. **Click "Đặt hàng"**<br>   - Click nút "Đặt hàng" hoặc "Xác nhận đặt hàng"<br>   - Quan sát loading indicator<br>   - Chờ kết quả<br>10. **Kiểm tra kết quả đặt hàng**<br>    - Xác nhận đặt hàng thành công<br>    - Quan sát thông báo<br>    - Kiểm tra điều hướng<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Giỏ hàng hiển thị đúng sản phẩm<br>- [ ] Có thể chọn sản phẩm để thanh toán<br>- [ ] Voucher được áp dụng thành công (nếu có)<br>- [ ] Tổng tiền cập nhật sau khi áp dụng voucher<br>- [ ] Điều hướng đến màn hình checkout thành công<br>- [ ] Màn hình checkout hiển thị đầy đủ:<br>  - [ ] Địa chỉ giao hàng<br>  - [ ] Danh sách sản phẩm với đầy đủ thông tin<br>  - [ ] Phí vận chuyển<br>  - [ ] Voucher đã áp dụng<br>  - [ ] Tổng tiền cuối cùng<br>  - [ ] Phương thức thanh toán<br>- [ ] Có thể chọn/đổi địa chỉ giao hàng<br>- [ ] Phí ship cập nhật khi đổi địa chỉ<br>- [ ] Có thể chọn phương thức thanh toán<br>- [ ] Thông tin đơn hàng hiển thị chính xác:<br>  - [ ] Tổng tiền sản phẩm = tổng (giá × số lượng)<br>  - [ ] Phí ship = phí ship theo địa chỉ<br>  - [ ] Giá trị giảm từ voucher = giá trị voucher<br>  - [ ] Tổng tiền cuối = (Tổng sản phẩm + Phí ship) - Voucher<br>- [ ] Click "Đặt hàng" gửi request thành công<br>- [ ] Hiển thị loading khi đang xử lý<br>- [ ] Đặt hàng thành công<br>- [ ] Hiển thị thông báo "Đặt hàng thành công"<br>- [ ] Điều hướng đến trang chi tiết đơn hàng hoặc trang đơn hàng<br>- [ ] Đơn hàng xuất hiện trong danh sách đơn hàng với trạng thái "Chờ xác nhận"<br>- [ ] Giỏ hàng được cập nhật (xóa sản phẩm đã đặt hoặc giữ lại)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Kiểm tra giỏ hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Áp dụng voucher \| ⬜ Pass / ⬜ Fail \| \|<br>\| Vào màn hình checkout \| ⬜ Pass / ⬜ Fail \| \|<br>\| Hiển thị đầy đủ thông tin \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn địa chỉ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn phương thức thanh toán \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tính toán tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot màn hình giỏ hàng<br>- [ ] Screenshot màn hình checkout<br>- [ ] Screenshot thông báo đặt hàng thành công<br>- [ ] Screenshot đơn hàng trong danh sách<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-007 |
| **Description Test case** | Kiểm tra quy trình thêm sản phẩm không có variant vào giỏ hàng. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Tìm và mở sản phẩm không có variant<br>3. Click nút "Thêm vào giỏ hàng"<br>4. Chọn số lượng (nếu modal hiển thị)<br>5. Click "Xác nhận"<br>6. Kiểm tra sản phẩm trong giỏ hàng |
| **Expected Output** | - [ ] Modal variant hiển thị (chỉ có phần số lượng, không có màu/kích thước)<br>- [ ] Có thể chọn số lượng<br>- [ ] Thêm vào giỏ thành công<br>- [ ] Sản phẩm trong giỏ không có thông tin variant |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm không có variant trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-008: Thêm cùng sản phẩm với variant khác nhau vào giỏ<br>### Mô tả<br>Kiểm tra thêm cùng một sản phẩm nhưng với variant khác nhau vào giỏ hàng. Đảm bảo hệ thống coi đây là 2 item riêng biệt.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm có nhiều variant<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm với variant: Màu Đỏ, Size M vào giỏ<br>3. Thêm lại cùng sản phẩm với variant: Màu Xanh, Size L vào giỏ<br>4. Vào giỏ hàng kiểm tra<br>### Kết quả mong đợi<br>- [ ] Giỏ hàng hiển thị 2 item riêng biệt<br>- [ ] Item 1: Màu Đỏ, Size M<br>- [ ] Item 2: Màu Xanh, Size L<br>- [ ] Tổng số lượng = 2<br>- [ ] Tổng tiền = (Giá variant 1) + (Giá variant 2)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Hiển thị 2 item riêng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Variant hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-009: Thêm sản phẩm hết hàng vào giỏ<br>### Mô tả<br>Kiểm tra xử lý khi thử thêm sản phẩm hết hàng vào giỏ hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm với stock = 0<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Mở trang chi tiết sản phẩm hết hàng<br>3. Quan sát UI<br>4. Thử click "Thêm vào giỏ hàng" (nếu có)<br>### Kết quả mong đợi<br>- [ ] Hiển thị badge "Hết hàng" hoặc "Tạm hết hàng"<br>- [ ] Nút "Thêm vào giỏ hàng" bị disable hoặc ẩn<br>- [ ] Nút "Mua ngay" bị disable hoặc ẩn<br>- [ ] Hiển thị thông báo "Sản phẩm tạm thời hết hàng"<br>- [ ] Không thể thêm vào giỏ hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Badge hết hàng hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút bị disable/ẩn \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không thể thêm vào giỏ \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-010: Thêm sản phẩm với số lượng vượt tồn kho<br>### Mô tả<br>Kiểm tra xử lý khi thử thêm sản phẩm với số lượng vượt quá tồn kho.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm với tồn kho = 5<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Mở trang chi tiết sản phẩm có tồn kho = 5<br>3. Click "Thêm vào giỏ hàng"<br>4. Thử chọn số lượng = 10 (vượt tồn kho)<br>5. Quan sát hành vi<br>### Kết quả mong đợi<br>- [ ] Số lượng tối đa = 5 (tồn kho)<br>- [ ] Không thể tăng số lượng > 5<br>- [ ] Hiển thị cảnh báo "Chỉ còn 5 sản phẩm"<br>- [ ] Nút "+" bị disable khi đạt số lượng tối đa<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Giới hạn số lượng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Cảnh báo hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút + bị disable \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Quy Trình Thanh Toán<br>## TC-BHV-011: Quy trình thanh toán hoàn chỉnh<br>### Mô tả<br>Kiểm tra quy trình thanh toán hoàn chỉnh từ giỏ hàng đến đặt hàng thành công. Đảm bảo tất cả các bước hoạt động đúng và thông tin được lưu chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br>- **Test end-to-end (E2E Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>- Có voucher có thể sử dụng (nếu test voucher)<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Kiểm tra giỏ hàng**<br>   - Click vào icon giỏ hàng<br>   - Xác nhận có sản phẩm trong giỏ<br>   - Chọn sản phẩm muốn thanh toán (checkbox)<br>   - Kiểm tra tổng tiền<br>3. **Áp dụng voucher (nếu có)**<br>   - Click "Áp dụng voucher" hoặc "Chọn voucher"<br>   - Chọn một voucher hợp lệ<br>   - Xác nhận voucher được áp dụng<br>   - Kiểm tra tổng tiền đã giảm<br>4. **Click "Thanh toán"**<br>   - Click nút "Thanh toán"<br>   - Xác nhận điều hướng đến màn hình checkout<br>5. **Kiểm tra màn hình thanh toán**<br>   - Xác nhận hiển thị đầy đủ các section:<br>     - Địa chỉ giao hàng<br>     - Danh sách sản phẩm<br>     - Phí vận chuyển<br>     - Voucher (nếu đã áp dụng)<br>     - Tổng tiền<br>     - Phương thức thanh toán<br>6. **Chọn/kiểm tra địa chỉ giao hàng**<br>   - Xác nhận địa chỉ hiển thị đúng<br>   - Nếu cần đổi, click vào section địa chỉ<br>   - Chọn địa chỉ khác hoặc tạo mới<br>   - Xác nhận địa chỉ được cập nhật<br>7. **Chọn phương thức thanh toán**<br>   - Scroll đến section phương thức thanh toán<br>   - Chọn một phương thức (ví dụ: COD)<br>   - Xác nhận phương thức được chọn<br>8. **Xem lại thông tin đơn hàng**<br>   - Kiểm tra danh sách sản phẩm đúng<br>   - Kiểm tra tổng tiền sản phẩm đúng<br>   - Kiểm tra phí ship đúng<br>   - Kiểm tra giá trị giảm từ voucher đúng<br>   - Kiểm tra tổng tiền cuối cùng đúng<br>9. **Click "Đặt hàng"**<br>   - Click nút "Đặt hàng" hoặc "Xác nhận đặt hàng"<br>   - Quan sát loading indicator<br>   - Chờ kết quả<br>10. **Kiểm tra kết quả đặt hàng**<br>    - Xác nhận đặt hàng thành công<br>    - Quan sát thông báo<br>    - Kiểm tra điều hướng<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Giỏ hàng hiển thị đúng sản phẩm<br>- [ ] Có thể chọn sản phẩm để thanh toán<br>- [ ] Voucher được áp dụng thành công (nếu có)<br>- [ ] Tổng tiền cập nhật sau khi áp dụng voucher<br>- [ ] Điều hướng đến màn hình checkout thành công<br>- [ ] Màn hình checkout hiển thị đầy đủ:<br>  - [ ] Địa chỉ giao hàng<br>  - [ ] Danh sách sản phẩm với đầy đủ thông tin<br>  - [ ] Phí vận chuyển<br>  - [ ] Voucher đã áp dụng<br>  - [ ] Tổng tiền cuối cùng<br>  - [ ] Phương thức thanh toán<br>- [ ] Có thể chọn/đổi địa chỉ giao hàng<br>- [ ] Phí ship cập nhật khi đổi địa chỉ<br>- [ ] Có thể chọn phương thức thanh toán<br>- [ ] Thông tin đơn hàng hiển thị chính xác:<br>  - [ ] Tổng tiền sản phẩm = tổng (giá × số lượng)<br>  - [ ] Phí ship = phí ship theo địa chỉ<br>  - [ ] Giá trị giảm từ voucher = giá trị voucher<br>  - [ ] Tổng tiền cuối = (Tổng sản phẩm + Phí ship) - Voucher<br>- [ ] Click "Đặt hàng" gửi request thành công<br>- [ ] Hiển thị loading khi đang xử lý<br>- [ ] Đặt hàng thành công<br>- [ ] Hiển thị thông báo "Đặt hàng thành công"<br>- [ ] Điều hướng đến trang chi tiết đơn hàng hoặc trang đơn hàng<br>- [ ] Đơn hàng xuất hiện trong danh sách đơn hàng với trạng thái "Chờ xác nhận"<br>- [ ] Giỏ hàng được cập nhật (xóa sản phẩm đã đặt hoặc giữ lại)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Kiểm tra giỏ hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Áp dụng voucher \| ⬜ Pass / ⬜ Fail \| \|<br>\| Vào màn hình checkout \| ⬜ Pass / ⬜ Fail \| \|<br>\| Hiển thị đầy đủ thông tin \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn địa chỉ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn phương thức thanh toán \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tính toán tổng tiền đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot màn hình giỏ hàng<br>- [ ] Screenshot màn hình checkout<br>- [ ] Screenshot thông báo đặt hàng thành công<br>- [ ] Screenshot đơn hàng trong danh sách<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details><br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra quy trình thêm sản phẩm không có variant vào giỏ hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm không có variant trong hệ thống

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Tìm và mở sản phẩm không có variant
3. Click nút "Thêm vào giỏ hàng"
4. Chọn số lượng (nếu modal hiển thị)
5. Click "Xác nhận"
6. Kiểm tra sản phẩm trong giỏ hàng

### Kết quả mong đợi
- [ ] Modal variant hiển thị (chỉ có phần số lượng, không có màu/kích thước)
- [ ] Có thể chọn số lượng
- [ ] Thêm vào giỏ thành công
- [ ] Sản phẩm trong giỏ không có thông tin variant

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Modal hiển thị | ⬜ Pass / ⬜ Fail | |
| Thêm vào giỏ thành công | ⬜ Pass / ⬜ Fail | |
| Sản phẩm lưu đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:**
**Ghi chú:**
**Ghi chú:**
**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-008: Thêm cùng sản phẩm với variant khác nhau vào giỏ

### Mô tả
Kiểm tra thêm cùng một sản phẩm nhưng với variant khác nhau vào giỏ hàng. Đảm bảo hệ thống coi đây là 2 item riêng biệt.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm có nhiều variant

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm với variant: Màu Đỏ, Size M vào giỏ
3. Thêm lại cùng sản phẩm với variant: Màu Xanh, Size L vào giỏ
4. Vào giỏ hàng kiểm tra

### Kết quả mong đợi

- [ ] Giỏ hàng hiển thị 2 item riêng biệt
- [ ] Item 1: Màu Đỏ, Size M
- [ ] Item 2: Màu Xanh, Size L
- [ ] Tổng số lượng = 2
- [ ] Tổng tiền = (Giá variant 1) + (Giá variant 2)

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị 2 item riêng | ⬜ Pass / ⬜ Fail | |
| Variant hiển thị đúng | ⬜ Pass / ⬜ Fail | |
| Tổng tiền đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-009: Thêm sản phẩm hết hàng vào giỏ

### Mô tả
Kiểm tra xử lý khi thử thêm sản phẩm hết hàng vào giỏ hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm với stock = 0

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Mở trang chi tiết sản phẩm hết hàng
3. Quan sát UI
4. Thử click "Thêm vào giỏ hàng" (nếu có)

### Kết quả mong đợi

- [ ] Hiển thị badge "Hết hàng" hoặc "Tạm hết hàng"
- [ ] Nút "Thêm vào giỏ hàng" bị disable hoặc ẩn
- [ ] Nút "Mua ngay" bị disable hoặc ẩn
- [ ] Hiển thị thông báo "Sản phẩm tạm thời hết hàng"
- [ ] Không thể thêm vào giỏ hàng

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Badge hết hàng hiển thị | ⬜ Pass / ⬜ Fail | |
| Nút bị disable/ẩn | ⬜ Pass / ⬜ Fail | |
| Không thể thêm vào giỏ | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-010: Thêm sản phẩm với số lượng vượt tồn kho

### Mô tả
Kiểm tra xử lý khi thử thêm sản phẩm với số lượng vượt quá tồn kho.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm với tồn kho = 5

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Mở trang chi tiết sản phẩm có tồn kho = 5
3. Click "Thêm vào giỏ hàng"
4. Thử chọn số lượng = 10 (vượt tồn kho)
5. Quan sát hành vi

### Kết quả mong đợi

- [ ] Số lượng tối đa = 5 (tồn kho)
- [ ] Không thể tăng số lượng > 5
- [ ] Hiển thị cảnh báo "Chỉ còn 5 sản phẩm"
- [ ] Nút "+" bị disable khi đạt số lượng tối đa

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Giới hạn số lượng | ⬜ Pass / ⬜ Fail | |
| Cảnh báo hiển thị | ⬜ Pass / ⬜ Fail | |
| Nút + bị disable | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

# Quy Trình Thanh Toán

## TC-BHV-011: Quy trình thanh toán hoàn chỉnh

### Mô tả
Kiểm tra quy trình thanh toán hoàn chỉnh từ giỏ hàng đến đặt hàng thành công. Đảm bảo tất cả các bước hoạt động đúng và thông tin được lưu chính xác.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**
- **Test end-to-end (E2E Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có sản phẩm trong giỏ hàng
- Có địa chỉ giao hàng đã lưu
- Có voucher có thể sử dụng (nếu test voucher)

### Các bước thực hiện

1. **Đăng nhập vào ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Click vào icon Profile
   - Nhập thông tin đăng nhập
   - Xác nhận đăng nhập thành công

2. **Kiểm tra giỏ hàng**
   - Click vào icon giỏ hàng
   - Xác nhận có sản phẩm trong giỏ
   - Chọn sản phẩm muốn thanh toán (checkbox)
   - Kiểm tra tổng tiền

3. **Áp dụng voucher (nếu có)**
   - Click "Áp dụng voucher" hoặc "Chọn voucher"
   - Chọn một voucher hợp lệ
   - Xác nhận voucher được áp dụng
   - Kiểm tra tổng tiền đã giảm

4. **Click "Thanh toán"**
   - Click nút "Thanh toán"
   - Xác nhận điều hướng đến màn hình checkout

5. **Kiểm tra màn hình thanh toán**
   - Xác nhận hiển thị đầy đủ các section:
     - Địa chỉ giao hàng
     - Danh sách sản phẩm
     - Phí vận chuyển
     - Voucher (nếu đã áp dụng)
     - Tổng tiền
     - Phương thức thanh toán

6. **Chọn/kiểm tra địa chỉ giao hàng**
   - Xác nhận địa chỉ hiển thị đúng
   - Nếu cần đổi, click vào section địa chỉ
   - Chọn địa chỉ khác hoặc tạo mới
   - Xác nhận địa chỉ được cập nhật

7. **Chọn phương thức thanh toán**
   - Scroll đến section phương thức thanh toán
   - Chọn một phương thức (ví dụ: COD)
   - Xác nhận phương thức được chọn

8. **Xem lại thông tin đơn hàng**
   - Kiểm tra danh sách sản phẩm đúng
   - Kiểm tra tổng tiền sản phẩm đúng
   - Kiểm tra phí ship đúng
   - Kiểm tra giá trị giảm từ voucher đúng
   - Kiểm tra tổng tiền cuối cùng đúng

9. **Click "Đặt hàng"**
   - Click nút "Đặt hàng" hoặc "Xác nhận đặt hàng"
   - Quan sát loading indicator
   - Chờ kết quả

10. **Kiểm tra kết quả đặt hàng**
    - Xác nhận đặt hàng thành công
    - Quan sát thông báo
    - Kiểm tra điều hướng

### Kết quả mong đợi

- [ ] Đăng nhập thành công
- [ ] Giỏ hàng hiển thị đúng sản phẩm
- [ ] Có thể chọn sản phẩm để thanh toán
- [ ] Voucher được áp dụng thành công (nếu có)
- [ ] Tổng tiền cập nhật sau khi áp dụng voucher
- [ ] Điều hướng đến màn hình checkout thành công
- [ ] Màn hình checkout hiển thị đầy đủ:
  - [ ] Địa chỉ giao hàng
  - [ ] Danh sách sản phẩm với đầy đủ thông tin
  - [ ] Phí vận chuyển
  - [ ] Voucher đã áp dụng
  - [ ] Tổng tiền cuối cùng
  - [ ] Phương thức thanh toán
- [ ] Có thể chọn/đổi địa chỉ giao hàng
- [ ] Phí ship cập nhật khi đổi địa chỉ
- [ ] Có thể chọn phương thức thanh toán
- [ ] Thông tin đơn hàng hiển thị chính xác:
  - [ ] Tổng tiền sản phẩm = tổng (giá × số lượng)
  - [ ] Phí ship = phí ship theo địa chỉ
  - [ ] Giá trị giảm từ voucher = giá trị voucher
  - [ ] Tổng tiền cuối = (Tổng sản phẩm + Phí ship) - Voucher
- [ ] Click "Đặt hàng" gửi request thành công
- [ ] Hiển thị loading khi đang xử lý
- [ ] Đặt hàng thành công
- [ ] Hiển thị thông báo "Đặt hàng thành công"
- [ ] Điều hướng đến trang chi tiết đơn hàng hoặc trang đơn hàng
- [ ] Đơn hàng xuất hiện trong danh sách đơn hàng với trạng thái "Chờ xác nhận"
- [ ] Giỏ hàng được cập nhật (xóa sản phẩm đã đặt hoặc giữ lại)

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Đăng nhập | ⬜ Pass / ⬜ Fail | |
| Kiểm tra giỏ hàng | ⬜ Pass / ⬜ Fail | |
| Áp dụng voucher | ⬜ Pass / ⬜ Fail | |
| Vào màn hình checkout | ⬜ Pass / ⬜ Fail | |
| Hiển thị đầy đủ thông tin | ⬜ Pass / ⬜ Fail | |
| Chọn địa chỉ | ⬜ Pass / ⬜ Fail | |
| Chọn phương thức thanh toán | ⬜ Pass / ⬜ Fail | |
| Tính toán tổng tiền đúng | ⬜ Pass / ⬜ Fail | |
| Đặt hàng thành công | ⬜ Pass / ⬜ Fail | |
| Điều hướng đúng | ⬜ Pass / ⬜ Fail | |
| Đơn hàng lưu đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot màn hình giỏ hàng
- [ ] Screenshot màn hình checkout
- [ ] Screenshot thông báo đặt hàng thành công
- [ ] Screenshot đơn hàng trong danh sách
- [ ] Screenshot log console (nếu có lỗi)

</details>

</details>

</details>

---

## TC-BHV-012: Đặt hàng với validation lỗi

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-012 |
| **Description Test case** | Kiểm tra validation khi thiếu thông tin bắt buộc trong quá trình đặt hàng. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Vào màn hình thanh toán<br>3. Không chọn địa chỉ giao hàng, click "Đặt hàng"<br>4. Chọn địa chỉ, không chọn phương thức thanh toán, click "Đặt hàng"<br>5. Chọn đầy đủ, click "Đặt hàng" |
| **Expected Output** | - [ ] Không cho phép đặt hàng nếu thiếu địa chỉ<br>- [ ] Hiển thị thông báo "Vui lòng chọn địa chỉ giao hàng"<br>- [ ] Không cho phép đặt hàng nếu thiếu phương thức thanh toán<br>- [ ] Hiển thị thông báo "Vui lòng chọn phương thức thanh toán"<br>- [ ] Khi đầy đủ thông tin, cho phép đặt hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-013: Đặt hàng với sản phẩm hết hàng<br>### Mô tả<br>Kiểm tra xử lý khi đặt hàng với sản phẩm đã hết hàng trong quá trình checkout.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Sản phẩm bị hết hàng sau khi thêm vào giỏ<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng (còn hàng)<br>3. Admin/backend đánh dấu sản phẩm hết hàng<br>4. Vào màn hình thanh toán<br>5. Thử đặt hàng<br>### Kết quả mong đợi<br>- [ ] Hiển thị cảnh báo sản phẩm đã hết hàng<br>- [ ] Không cho phép đặt hàng<br>- [ ] Có thể xóa sản phẩm hết hàng khỏi giỏ<br>- [ ] Hoặc tự động loại bỏ sản phẩm hết hàng và tiếp tục với sản phẩm còn lại<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Cảnh báo hết hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không cho đặt hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Xử lý sản phẩm hết hàng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-014: Đặt hàng với voucher hết hạn<br>### Mô tả<br>Kiểm tra xử lý khi voucher đã hết hạn trong quá trình checkout.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có voucher đã hết hạn<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Áp dụng voucher (còn hạn)<br>3. Voucher hết hạn (chờ hoặc simulate)<br>4. Vào màn hình thanh toán<br>5. Thử đặt hàng<br>### Kết quả mong đợi<br>- [ ] Hiển thị cảnh báo voucher đã hết hạn<br>- [ ] Voucher tự động bị gỡ bỏ<br>- [ ] Tổng tiền cập nhật lại (không trừ voucher)<br>- [ ] Có thể tiếp tục đặt hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Cảnh báo voucher hết hạn \| ⬜ Pass / ⬜ Fail \| \|<br>\| Voucher bị gỡ bỏ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-015: Đặt hàng với mạng không ổn định<br>### Mô tả<br>Kiểm tra xử lý khi mạng không ổn định trong quá trình đặt hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test xử lý lỗi (Error Handling Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có thể simulate mạng chậm/ngắt<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Vào màn hình thanh toán<br>3. Điền đầy đủ thông tin<br>4. Simulate mạng chậm/ngắt<br>5. Click "Đặt hàng"<br>6. Quan sát hành vi<br>### Kết quả mong đợi<br>- [ ] Hiển thị loading khi đang gửi request<br>- [ ] Nếu timeout, hiển thị thông báo lỗi<br>- [ ] Có nút "Thử lại"<br>- [ ] Có thể retry đặt hàng<br>- [ ] Không bị duplicate đơn hàng khi retry<br>- [ ] Ứng dụng không bị crash<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Loading hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo lỗi \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút thử lại \| ⬜ Pass / ⬜ Fail \| \|<br>\| Retry thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không duplicate đơn \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-027: Thanh toán bằng COD (Thanh toán khi nhận hàng)<br>### Mô tả<br>Kiểm tra quy trình thanh toán bằng phương thức COD (Cash on Delivery - Thanh toán khi nhận hàng).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Chọn địa chỉ giao hàng<br>5. Scroll đến section phương thức thanh toán<br>6. Chọn phương thức "COD" hoặc "Thanh toán khi nhận hàng"<br>7. Xác nhận phương thức được chọn<br>8. Xem lại thông tin đơn hàng<br>9. Click "Đặt hàng"<br>10. Kiểm tra kết quả đặt hàng<br>### Kết quả mong đợi<br>- [ ] Phương thức COD hiển thị trong danh sách phương thức thanh toán<br>- [ ] Có thể chọn phương thức COD<br>- [ ] Phương thức COD được highlight khi chọn<br>- [ ] Hiển thị thông tin: "Thanh toán khi nhận hàng" hoặc "COD"<br>- [ ] Tổng tiền hiển thị đầy đủ (bao gồm phí ship nếu có)<br>- [ ] Click "Đặt hàng" thành công<br>- [ ] Đặt hàng thành công với phương thức COD<br>- [ ] Hiển thị thông báo "Đặt hàng thành công"<br>- [ ] Đơn hàng được tạo với phương thức thanh toán = COD<br>- [ ] Trong chi tiết đơn hàng hiển thị: "Thanh toán khi nhận hàng" hoặc "COD"<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phương thức COD hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn COD thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông tin hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng phương thức \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-028: Thanh toán bằng chuyển khoản ngân hàng<br>### Mô tả<br>Kiểm tra quy trình thanh toán bằng phương thức chuyển khoản ngân hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Chọn địa chỉ giao hàng<br>5. Scroll đến section phương thức thanh toán<br>6. Chọn phương thức "Chuyển khoản ngân hàng" hoặc "Bank Transfer"<br>7. Xác nhận phương thức được chọn<br>8. Quan sát thông tin tài khoản ngân hàng hiển thị<br>9. Xem lại thông tin đơn hàng<br>10. Click "Đặt hàng"<br>11. Kiểm tra kết quả đặt hàng<br>### Kết quả mong đợi<br>- [ ] Phương thức chuyển khoản hiển thị trong danh sách phương thức thanh toán<br>- [ ] Có thể chọn phương thức chuyển khoản<br>- [ ] Phương thức chuyển khoản được highlight khi chọn<br>- [ ] Khi chọn chuyển khoản, hiển thị thông tin tài khoản ngân hàng:<br>  - [ ] Tên ngân hàng<br>  - [ ] Số tài khoản<br>  - [ ] Tên chủ tài khoản<br>  - [ ] Nội dung chuyển khoản (mã đơn hàng hoặc số điện thoại)<br>- [ ] Có thể copy số tài khoản và nội dung chuyển khoản<br>- [ ] Hiển thị hướng dẫn: "Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý nhanh nhất"<br>- [ ] Tổng tiền hiển thị đầy đủ<br>- [ ] Click "Đặt hàng" thành công<br>- [ ] Đặt hàng thành công với phương thức chuyển khoản<br>- [ ] Hiển thị thông báo "Đặt hàng thành công. Vui lòng chuyển khoản theo thông tin bên dưới"<br>- [ ] Đơn hàng được tạo với phương thức thanh toán = Chuyển khoản<br>- [ ] Trong chi tiết đơn hàng hiển thị:<br>  - [ ] Phương thức thanh toán: "Chuyển khoản ngân hàng"<br>  - [ ] Thông tin tài khoản ngân hàng<br>  - [ ] Trạng thái: "Chờ thanh toán" hoặc "Chờ xác nhận"<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phương thức chuyển khoản hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn chuyển khoản thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông tin tài khoản hiển thị đầy đủ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Có thể copy thông tin \| ⬜ Pass / ⬜ Fail \| \|<br>\| Hướng dẫn hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng phương thức \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-029: Copy thông tin chuyển khoản<br>### Mô tả<br>Kiểm tra chức năng copy thông tin tài khoản và nội dung chuyển khoản.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đang ở màn hình thanh toán<br>- Đã chọn phương thức chuyển khoản ngân hàng<br>- Thông tin tài khoản đã hiển thị<br>### Các bước thực hiện<br>1. Chọn phương thức chuyển khoản ngân hàng<br>2. Quan sát thông tin tài khoản hiển thị<br>3. Click nút "Copy" hoặc icon copy bên cạnh số tài khoản<br>4. Kiểm tra clipboard<br>5. Click nút "Copy" bên cạnh nội dung chuyển khoản<br>6. Kiểm tra clipboard<br>### Kết quả mong đợi<br>- [ ] Có nút/icon "Copy" bên cạnh số tài khoản<br>- [ ] Click copy số tài khoản thành công<br>- [ ] Số tài khoản được copy vào clipboard<br>- [ ] Hiển thị toast "Đã copy số tài khoản" (nếu có)<br>- [ ] Có nút/icon "Copy" bên cạnh nội dung chuyển khoản<br>- [ ] Click copy nội dung chuyển khoản thành công<br>- [ ] Nội dung chuyển khoản được copy vào clipboard<br>- [ ] Hiển thị toast "Đã copy nội dung chuyển khoản" (nếu có)<br>- [ ] Có thể paste vào app ngân hàng để chuyển khoản<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Nút copy số tài khoản \| ⬜ Pass / ⬜ Fail \| \|<br>\| Copy số tài khoản thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút copy nội dung \| ⬜ Pass / ⬜ Fail \| \|<br>\| Copy nội dung thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Toast thông báo hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Tìm Kiếm & Điều Hướng<br>## TC-BHV-016: Tìm kiếm sản phẩm và điều hướng<br>### Mô tả<br>Kiểm tra chức năng tìm kiếm sản phẩm và điều hướng đến kết quả tìm kiếm. Đảm bảo tìm kiếm hoạt động đúng và kết quả hiển thị chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>- Có sản phẩm trong hệ thống<br>### Các bước thực hiện<br>1. **Mở ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Xác nhận trang chủ hiển thị<br>2. **Click vào search bar**<br>   - Tìm search bar ở header<br>   - Click vào search bar<br>   - Xác nhận có thể nhập text<br>3. **Nhập từ khóa tìm kiếm**<br>   - Nhập từ khóa (ví dụ: "áo thun")<br>   - Quan sát dropdown gợi ý (nếu có)<br>   - Đợi kết quả tìm kiếm<br>4. **Chọn sản phẩm từ dropdown (nếu có)**<br>   - Quan sát danh sách gợi ý<br>   - Click vào một sản phẩm trong dropdown<br>   - Quan sát điều hướng<br>5. **Hoặc nhấn Enter/Submit**<br>   - Nhấn Enter hoặc click nút tìm kiếm<br>   - Quan sát điều hướng<br>6. **Kiểm tra trang kết quả tìm kiếm**<br>   - Xác nhận điều hướng đến `/search?query=áo thun`<br>   - Quan sát danh sách kết quả<br>   - Kiểm tra từ khóa hiển thị trong search bar<br>7. **Click vào sản phẩm từ kết quả**<br>   - Click vào một sản phẩm<br>   - Quan sát điều hướng<br>### Kết quả mong đợi<br>- [ ] Trang chủ hiển thị với search bar ở header<br>- [ ] Click vào search bar cho phép nhập text<br>- [ ] Khi nhập từ khóa:<br>  - [ ] Hiển thị dropdown gợi ý (nếu có)<br>  - [ ] Dropdown hiển thị sản phẩm liên quan<br>  - [ ] Có thể chọn sản phẩm từ dropdown<br>- [ ] Khi nhấn Enter hoặc submit:<br>  - [ ] Điều hướng đến `/search?query={từ khóa}`<br>  - [ ] URL chứa query parameter đúng<br>- [ ] Trang kết quả tìm kiếm hiển thị:<br>  - [ ] Từ khóa trong search bar<br>  - [ ] Danh sách sản phẩm phù hợp với từ khóa<br>  - [ ] Số lượng kết quả (nếu có)<br>  - [ ] Có thể scroll để xem thêm<br>- [ ] Click sản phẩm từ kết quả:<br>  - [ ] Điều hướng đến `/product/:id`<br>  - [ ] Trang chi tiết sản phẩm hiển thị đúng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Search bar hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nhập từ khóa \| ⬜ Pass / ⬜ Fail \| \|<br>\| Dropdown gợi ý hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đến trang search \| ⬜ Pass / ⬜ Fail \| \|<br>\| Kết quả tìm kiếm hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Click sản phẩm điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot search bar<br>- [ ] Screenshot dropdown gợi ý<br>- [ ] Screenshot trang kết quả tìm kiếm<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-012 |
| **Description Test case** | Kiểm tra validation khi thiếu thông tin bắt buộc trong quá trình đặt hàng. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Vào màn hình thanh toán<br>3. Không chọn địa chỉ giao hàng, click "Đặt hàng"<br>4. Chọn địa chỉ, không chọn phương thức thanh toán, click "Đặt hàng"<br>5. Chọn đầy đủ, click "Đặt hàng" |
| **Expected Output** | - [ ] Không cho phép đặt hàng nếu thiếu địa chỉ<br>- [ ] Hiển thị thông báo "Vui lòng chọn địa chỉ giao hàng"<br>- [ ] Không cho phép đặt hàng nếu thiếu phương thức thanh toán<br>- [ ] Hiển thị thông báo "Vui lòng chọn phương thức thanh toán"<br>- [ ] Khi đầy đủ thông tin, cho phép đặt hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-013: Đặt hàng với sản phẩm hết hàng<br>### Mô tả<br>Kiểm tra xử lý khi đặt hàng với sản phẩm đã hết hàng trong quá trình checkout.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Sản phẩm bị hết hàng sau khi thêm vào giỏ<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng (còn hàng)<br>3. Admin/backend đánh dấu sản phẩm hết hàng<br>4. Vào màn hình thanh toán<br>5. Thử đặt hàng<br>### Kết quả mong đợi<br>- [ ] Hiển thị cảnh báo sản phẩm đã hết hàng<br>- [ ] Không cho phép đặt hàng<br>- [ ] Có thể xóa sản phẩm hết hàng khỏi giỏ<br>- [ ] Hoặc tự động loại bỏ sản phẩm hết hàng và tiếp tục với sản phẩm còn lại<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Cảnh báo hết hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không cho đặt hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Xử lý sản phẩm hết hàng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-014: Đặt hàng với voucher hết hạn<br>### Mô tả<br>Kiểm tra xử lý khi voucher đã hết hạn trong quá trình checkout.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có voucher đã hết hạn<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Áp dụng voucher (còn hạn)<br>3. Voucher hết hạn (chờ hoặc simulate)<br>4. Vào màn hình thanh toán<br>5. Thử đặt hàng<br>### Kết quả mong đợi<br>- [ ] Hiển thị cảnh báo voucher đã hết hạn<br>- [ ] Voucher tự động bị gỡ bỏ<br>- [ ] Tổng tiền cập nhật lại (không trừ voucher)<br>- [ ] Có thể tiếp tục đặt hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Cảnh báo voucher hết hạn \| ⬜ Pass / ⬜ Fail \| \|<br>\| Voucher bị gỡ bỏ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-015: Đặt hàng với mạng không ổn định<br>### Mô tả<br>Kiểm tra xử lý khi mạng không ổn định trong quá trình đặt hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test xử lý lỗi (Error Handling Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có thể simulate mạng chậm/ngắt<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Vào màn hình thanh toán<br>3. Điền đầy đủ thông tin<br>4. Simulate mạng chậm/ngắt<br>5. Click "Đặt hàng"<br>6. Quan sát hành vi<br>### Kết quả mong đợi<br>- [ ] Hiển thị loading khi đang gửi request<br>- [ ] Nếu timeout, hiển thị thông báo lỗi<br>- [ ] Có nút "Thử lại"<br>- [ ] Có thể retry đặt hàng<br>- [ ] Không bị duplicate đơn hàng khi retry<br>- [ ] Ứng dụng không bị crash<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Loading hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo lỗi \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút thử lại \| ⬜ Pass / ⬜ Fail \| \|<br>\| Retry thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không duplicate đơn \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-027: Thanh toán bằng COD (Thanh toán khi nhận hàng)<br>### Mô tả<br>Kiểm tra quy trình thanh toán bằng phương thức COD (Cash on Delivery - Thanh toán khi nhận hàng).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Chọn địa chỉ giao hàng<br>5. Scroll đến section phương thức thanh toán<br>6. Chọn phương thức "COD" hoặc "Thanh toán khi nhận hàng"<br>7. Xác nhận phương thức được chọn<br>8. Xem lại thông tin đơn hàng<br>9. Click "Đặt hàng"<br>10. Kiểm tra kết quả đặt hàng<br>### Kết quả mong đợi<br>- [ ] Phương thức COD hiển thị trong danh sách phương thức thanh toán<br>- [ ] Có thể chọn phương thức COD<br>- [ ] Phương thức COD được highlight khi chọn<br>- [ ] Hiển thị thông tin: "Thanh toán khi nhận hàng" hoặc "COD"<br>- [ ] Tổng tiền hiển thị đầy đủ (bao gồm phí ship nếu có)<br>- [ ] Click "Đặt hàng" thành công<br>- [ ] Đặt hàng thành công với phương thức COD<br>- [ ] Hiển thị thông báo "Đặt hàng thành công"<br>- [ ] Đơn hàng được tạo với phương thức thanh toán = COD<br>- [ ] Trong chi tiết đơn hàng hiển thị: "Thanh toán khi nhận hàng" hoặc "COD"<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phương thức COD hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn COD thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông tin hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng phương thức \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-028: Thanh toán bằng chuyển khoản ngân hàng<br>### Mô tả<br>Kiểm tra quy trình thanh toán bằng phương thức chuyển khoản ngân hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Chọn địa chỉ giao hàng<br>5. Scroll đến section phương thức thanh toán<br>6. Chọn phương thức "Chuyển khoản ngân hàng" hoặc "Bank Transfer"<br>7. Xác nhận phương thức được chọn<br>8. Quan sát thông tin tài khoản ngân hàng hiển thị<br>9. Xem lại thông tin đơn hàng<br>10. Click "Đặt hàng"<br>11. Kiểm tra kết quả đặt hàng<br>### Kết quả mong đợi<br>- [ ] Phương thức chuyển khoản hiển thị trong danh sách phương thức thanh toán<br>- [ ] Có thể chọn phương thức chuyển khoản<br>- [ ] Phương thức chuyển khoản được highlight khi chọn<br>- [ ] Khi chọn chuyển khoản, hiển thị thông tin tài khoản ngân hàng:<br>  - [ ] Tên ngân hàng<br>  - [ ] Số tài khoản<br>  - [ ] Tên chủ tài khoản<br>  - [ ] Nội dung chuyển khoản (mã đơn hàng hoặc số điện thoại)<br>- [ ] Có thể copy số tài khoản và nội dung chuyển khoản<br>- [ ] Hiển thị hướng dẫn: "Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý nhanh nhất"<br>- [ ] Tổng tiền hiển thị đầy đủ<br>- [ ] Click "Đặt hàng" thành công<br>- [ ] Đặt hàng thành công với phương thức chuyển khoản<br>- [ ] Hiển thị thông báo "Đặt hàng thành công. Vui lòng chuyển khoản theo thông tin bên dưới"<br>- [ ] Đơn hàng được tạo với phương thức thanh toán = Chuyển khoản<br>- [ ] Trong chi tiết đơn hàng hiển thị:<br>  - [ ] Phương thức thanh toán: "Chuyển khoản ngân hàng"<br>  - [ ] Thông tin tài khoản ngân hàng<br>  - [ ] Trạng thái: "Chờ thanh toán" hoặc "Chờ xác nhận"<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phương thức chuyển khoản hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn chuyển khoản thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông tin tài khoản hiển thị đầy đủ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Có thể copy thông tin \| ⬜ Pass / ⬜ Fail \| \|<br>\| Hướng dẫn hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng phương thức \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-029: Copy thông tin chuyển khoản<br>### Mô tả<br>Kiểm tra chức năng copy thông tin tài khoản và nội dung chuyển khoản.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đang ở màn hình thanh toán<br>- Đã chọn phương thức chuyển khoản ngân hàng<br>- Thông tin tài khoản đã hiển thị<br>### Các bước thực hiện<br>1. Chọn phương thức chuyển khoản ngân hàng<br>2. Quan sát thông tin tài khoản hiển thị<br>3. Click nút "Copy" hoặc icon copy bên cạnh số tài khoản<br>4. Kiểm tra clipboard<br>5. Click nút "Copy" bên cạnh nội dung chuyển khoản<br>6. Kiểm tra clipboard<br>### Kết quả mong đợi<br>- [ ] Có nút/icon "Copy" bên cạnh số tài khoản<br>- [ ] Click copy số tài khoản thành công<br>- [ ] Số tài khoản được copy vào clipboard<br>- [ ] Hiển thị toast "Đã copy số tài khoản" (nếu có)<br>- [ ] Có nút/icon "Copy" bên cạnh nội dung chuyển khoản<br>- [ ] Click copy nội dung chuyển khoản thành công<br>- [ ] Nội dung chuyển khoản được copy vào clipboard<br>- [ ] Hiển thị toast "Đã copy nội dung chuyển khoản" (nếu có)<br>- [ ] Có thể paste vào app ngân hàng để chuyển khoản<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Nút copy số tài khoản \| ⬜ Pass / ⬜ Fail \| \|<br>\| Copy số tài khoản thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút copy nội dung \| ⬜ Pass / ⬜ Fail \| \|<br>\| Copy nội dung thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Toast thông báo hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Tìm Kiếm & Điều Hướng<br>## TC-BHV-016: Tìm kiếm sản phẩm và điều hướng<br>### Mô tả<br>Kiểm tra chức năng tìm kiếm sản phẩm và điều hướng đến kết quả tìm kiếm. Đảm bảo tìm kiếm hoạt động đúng và kết quả hiển thị chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>- Có sản phẩm trong hệ thống<br>### Các bước thực hiện<br>1. **Mở ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Xác nhận trang chủ hiển thị<br>2. **Click vào search bar**<br>   - Tìm search bar ở header<br>   - Click vào search bar<br>   - Xác nhận có thể nhập text<br>3. **Nhập từ khóa tìm kiếm**<br>   - Nhập từ khóa (ví dụ: "áo thun")<br>   - Quan sát dropdown gợi ý (nếu có)<br>   - Đợi kết quả tìm kiếm<br>4. **Chọn sản phẩm từ dropdown (nếu có)**<br>   - Quan sát danh sách gợi ý<br>   - Click vào một sản phẩm trong dropdown<br>   - Quan sát điều hướng<br>5. **Hoặc nhấn Enter/Submit**<br>   - Nhấn Enter hoặc click nút tìm kiếm<br>   - Quan sát điều hướng<br>6. **Kiểm tra trang kết quả tìm kiếm**<br>   - Xác nhận điều hướng đến `/search?query=áo thun`<br>   - Quan sát danh sách kết quả<br>   - Kiểm tra từ khóa hiển thị trong search bar<br>7. **Click vào sản phẩm từ kết quả**<br>   - Click vào một sản phẩm<br>   - Quan sát điều hướng<br>### Kết quả mong đợi<br>- [ ] Trang chủ hiển thị với search bar ở header<br>- [ ] Click vào search bar cho phép nhập text<br>- [ ] Khi nhập từ khóa:<br>  - [ ] Hiển thị dropdown gợi ý (nếu có)<br>  - [ ] Dropdown hiển thị sản phẩm liên quan<br>  - [ ] Có thể chọn sản phẩm từ dropdown<br>- [ ] Khi nhấn Enter hoặc submit:<br>  - [ ] Điều hướng đến `/search?query={từ khóa}`<br>  - [ ] URL chứa query parameter đúng<br>- [ ] Trang kết quả tìm kiếm hiển thị:<br>  - [ ] Từ khóa trong search bar<br>  - [ ] Danh sách sản phẩm phù hợp với từ khóa<br>  - [ ] Số lượng kết quả (nếu có)<br>  - [ ] Có thể scroll để xem thêm<br>- [ ] Click sản phẩm từ kết quả:<br>  - [ ] Điều hướng đến `/product/:id`<br>  - [ ] Trang chi tiết sản phẩm hiển thị đúng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Search bar hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nhập từ khóa \| ⬜ Pass / ⬜ Fail \| \|<br>\| Dropdown gợi ý hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đến trang search \| ⬜ Pass / ⬜ Fail \| \|<br>\| Kết quả tìm kiếm hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Click sản phẩm điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot search bar<br>- [ ] Screenshot dropdown gợi ý<br>- [ ] Screenshot trang kết quả tìm kiếm<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-012 |
| **Description Test case** | Kiểm tra validation khi thiếu thông tin bắt buộc trong quá trình đặt hàng. |
| **Test case Procedure** | 1. Đăng nhập vào ứng dụng<br>2. Vào màn hình thanh toán<br>3. Không chọn địa chỉ giao hàng, click "Đặt hàng"<br>4. Chọn địa chỉ, không chọn phương thức thanh toán, click "Đặt hàng"<br>5. Chọn đầy đủ, click "Đặt hàng" |
| **Expected Output** | - [ ] Không cho phép đặt hàng nếu thiếu địa chỉ<br>- [ ] Hiển thị thông báo "Vui lòng chọn địa chỉ giao hàng"<br>- [ ] Không cho phép đặt hàng nếu thiếu phương thức thanh toán<br>- [ ] Hiển thị thông báo "Vui lòng chọn phương thức thanh toán"<br>- [ ] Khi đầy đủ thông tin, cho phép đặt hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-013: Đặt hàng với sản phẩm hết hàng<br>### Mô tả<br>Kiểm tra xử lý khi đặt hàng với sản phẩm đã hết hàng trong quá trình checkout.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Sản phẩm bị hết hàng sau khi thêm vào giỏ<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng (còn hàng)<br>3. Admin/backend đánh dấu sản phẩm hết hàng<br>4. Vào màn hình thanh toán<br>5. Thử đặt hàng<br>### Kết quả mong đợi<br>- [ ] Hiển thị cảnh báo sản phẩm đã hết hàng<br>- [ ] Không cho phép đặt hàng<br>- [ ] Có thể xóa sản phẩm hết hàng khỏi giỏ<br>- [ ] Hoặc tự động loại bỏ sản phẩm hết hàng và tiếp tục với sản phẩm còn lại<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Cảnh báo hết hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không cho đặt hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Xử lý sản phẩm hết hàng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-014: Đặt hàng với voucher hết hạn<br>### Mô tả<br>Kiểm tra xử lý khi voucher đã hết hạn trong quá trình checkout.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có voucher đã hết hạn<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Áp dụng voucher (còn hạn)<br>3. Voucher hết hạn (chờ hoặc simulate)<br>4. Vào màn hình thanh toán<br>5. Thử đặt hàng<br>### Kết quả mong đợi<br>- [ ] Hiển thị cảnh báo voucher đã hết hạn<br>- [ ] Voucher tự động bị gỡ bỏ<br>- [ ] Tổng tiền cập nhật lại (không trừ voucher)<br>- [ ] Có thể tiếp tục đặt hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Cảnh báo voucher hết hạn \| ⬜ Pass / ⬜ Fail \| \|<br>\| Voucher bị gỡ bỏ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền cập nhật \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-015: Đặt hàng với mạng không ổn định<br>### Mô tả<br>Kiểm tra xử lý khi mạng không ổn định trong quá trình đặt hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test xử lý lỗi (Error Handling Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có thể simulate mạng chậm/ngắt<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Vào màn hình thanh toán<br>3. Điền đầy đủ thông tin<br>4. Simulate mạng chậm/ngắt<br>5. Click "Đặt hàng"<br>6. Quan sát hành vi<br>### Kết quả mong đợi<br>- [ ] Hiển thị loading khi đang gửi request<br>- [ ] Nếu timeout, hiển thị thông báo lỗi<br>- [ ] Có nút "Thử lại"<br>- [ ] Có thể retry đặt hàng<br>- [ ] Không bị duplicate đơn hàng khi retry<br>- [ ] Ứng dụng không bị crash<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Loading hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo lỗi \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút thử lại \| ⬜ Pass / ⬜ Fail \| \|<br>\| Retry thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Không duplicate đơn \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-027: Thanh toán bằng COD (Thanh toán khi nhận hàng)<br>### Mô tả<br>Kiểm tra quy trình thanh toán bằng phương thức COD (Cash on Delivery - Thanh toán khi nhận hàng).<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Chọn địa chỉ giao hàng<br>5. Scroll đến section phương thức thanh toán<br>6. Chọn phương thức "COD" hoặc "Thanh toán khi nhận hàng"<br>7. Xác nhận phương thức được chọn<br>8. Xem lại thông tin đơn hàng<br>9. Click "Đặt hàng"<br>10. Kiểm tra kết quả đặt hàng<br>### Kết quả mong đợi<br>- [ ] Phương thức COD hiển thị trong danh sách phương thức thanh toán<br>- [ ] Có thể chọn phương thức COD<br>- [ ] Phương thức COD được highlight khi chọn<br>- [ ] Hiển thị thông tin: "Thanh toán khi nhận hàng" hoặc "COD"<br>- [ ] Tổng tiền hiển thị đầy đủ (bao gồm phí ship nếu có)<br>- [ ] Click "Đặt hàng" thành công<br>- [ ] Đặt hàng thành công với phương thức COD<br>- [ ] Hiển thị thông báo "Đặt hàng thành công"<br>- [ ] Đơn hàng được tạo với phương thức thanh toán = COD<br>- [ ] Trong chi tiết đơn hàng hiển thị: "Thanh toán khi nhận hàng" hoặc "COD"<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phương thức COD hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn COD thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông tin hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng phương thức \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-028: Thanh toán bằng chuyển khoản ngân hàng<br>### Mô tả<br>Kiểm tra quy trình thanh toán bằng phương thức chuyển khoản ngân hàng.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập<br>- Có sản phẩm trong giỏ hàng<br>- Có địa chỉ giao hàng đã lưu<br>### Các bước thực hiện<br>1. Đăng nhập vào ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Vào màn hình thanh toán<br>4. Chọn địa chỉ giao hàng<br>5. Scroll đến section phương thức thanh toán<br>6. Chọn phương thức "Chuyển khoản ngân hàng" hoặc "Bank Transfer"<br>7. Xác nhận phương thức được chọn<br>8. Quan sát thông tin tài khoản ngân hàng hiển thị<br>9. Xem lại thông tin đơn hàng<br>10. Click "Đặt hàng"<br>11. Kiểm tra kết quả đặt hàng<br>### Kết quả mong đợi<br>- [ ] Phương thức chuyển khoản hiển thị trong danh sách phương thức thanh toán<br>- [ ] Có thể chọn phương thức chuyển khoản<br>- [ ] Phương thức chuyển khoản được highlight khi chọn<br>- [ ] Khi chọn chuyển khoản, hiển thị thông tin tài khoản ngân hàng:<br>  - [ ] Tên ngân hàng<br>  - [ ] Số tài khoản<br>  - [ ] Tên chủ tài khoản<br>  - [ ] Nội dung chuyển khoản (mã đơn hàng hoặc số điện thoại)<br>- [ ] Có thể copy số tài khoản và nội dung chuyển khoản<br>- [ ] Hiển thị hướng dẫn: "Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý nhanh nhất"<br>- [ ] Tổng tiền hiển thị đầy đủ<br>- [ ] Click "Đặt hàng" thành công<br>- [ ] Đặt hàng thành công với phương thức chuyển khoản<br>- [ ] Hiển thị thông báo "Đặt hàng thành công. Vui lòng chuyển khoản theo thông tin bên dưới"<br>- [ ] Đơn hàng được tạo với phương thức thanh toán = Chuyển khoản<br>- [ ] Trong chi tiết đơn hàng hiển thị:<br>  - [ ] Phương thức thanh toán: "Chuyển khoản ngân hàng"<br>  - [ ] Thông tin tài khoản ngân hàng<br>  - [ ] Trạng thái: "Chờ thanh toán" hoặc "Chờ xác nhận"<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Phương thức chuyển khoản hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Chọn chuyển khoản thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông tin tài khoản hiển thị đầy đủ \| ⬜ Pass / ⬜ Fail \| \|<br>\| Có thể copy thông tin \| ⬜ Pass / ⬜ Fail \| \|<br>\| Hướng dẫn hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng lưu đúng phương thức \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thông báo hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-029: Copy thông tin chuyển khoản<br>### Mô tả<br>Kiểm tra chức năng copy thông tin tài khoản và nội dung chuyển khoản.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Đang ở màn hình thanh toán<br>- Đã chọn phương thức chuyển khoản ngân hàng<br>- Thông tin tài khoản đã hiển thị<br>### Các bước thực hiện<br>1. Chọn phương thức chuyển khoản ngân hàng<br>2. Quan sát thông tin tài khoản hiển thị<br>3. Click nút "Copy" hoặc icon copy bên cạnh số tài khoản<br>4. Kiểm tra clipboard<br>5. Click nút "Copy" bên cạnh nội dung chuyển khoản<br>6. Kiểm tra clipboard<br>### Kết quả mong đợi<br>- [ ] Có nút/icon "Copy" bên cạnh số tài khoản<br>- [ ] Click copy số tài khoản thành công<br>- [ ] Số tài khoản được copy vào clipboard<br>- [ ] Hiển thị toast "Đã copy số tài khoản" (nếu có)<br>- [ ] Có nút/icon "Copy" bên cạnh nội dung chuyển khoản<br>- [ ] Click copy nội dung chuyển khoản thành công<br>- [ ] Nội dung chuyển khoản được copy vào clipboard<br>- [ ] Hiển thị toast "Đã copy nội dung chuyển khoản" (nếu có)<br>- [ ] Có thể paste vào app ngân hàng để chuyển khoản<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Nút copy số tài khoản \| ⬜ Pass / ⬜ Fail \| \|<br>\| Copy số tài khoản thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nút copy nội dung \| ⬜ Pass / ⬜ Fail \| \|<br>\| Copy nội dung thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Toast thông báo hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Tìm Kiếm & Điều Hướng<br>## TC-BHV-016: Tìm kiếm sản phẩm và điều hướng<br>### Mô tả<br>Kiểm tra chức năng tìm kiếm sản phẩm và điều hướng đến kết quả tìm kiếm. Đảm bảo tìm kiếm hoạt động đúng và kết quả hiển thị chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>- Có sản phẩm trong hệ thống<br>### Các bước thực hiện<br>1. **Mở ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Xác nhận trang chủ hiển thị<br>2. **Click vào search bar**<br>   - Tìm search bar ở header<br>   - Click vào search bar<br>   - Xác nhận có thể nhập text<br>3. **Nhập từ khóa tìm kiếm**<br>   - Nhập từ khóa (ví dụ: "áo thun")<br>   - Quan sát dropdown gợi ý (nếu có)<br>   - Đợi kết quả tìm kiếm<br>4. **Chọn sản phẩm từ dropdown (nếu có)**<br>   - Quan sát danh sách gợi ý<br>   - Click vào một sản phẩm trong dropdown<br>   - Quan sát điều hướng<br>5. **Hoặc nhấn Enter/Submit**<br>   - Nhấn Enter hoặc click nút tìm kiếm<br>   - Quan sát điều hướng<br>6. **Kiểm tra trang kết quả tìm kiếm**<br>   - Xác nhận điều hướng đến `/search?query=áo thun`<br>   - Quan sát danh sách kết quả<br>   - Kiểm tra từ khóa hiển thị trong search bar<br>7. **Click vào sản phẩm từ kết quả**<br>   - Click vào một sản phẩm<br>   - Quan sát điều hướng<br>### Kết quả mong đợi<br>- [ ] Trang chủ hiển thị với search bar ở header<br>- [ ] Click vào search bar cho phép nhập text<br>- [ ] Khi nhập từ khóa:<br>  - [ ] Hiển thị dropdown gợi ý (nếu có)<br>  - [ ] Dropdown hiển thị sản phẩm liên quan<br>  - [ ] Có thể chọn sản phẩm từ dropdown<br>- [ ] Khi nhấn Enter hoặc submit:<br>  - [ ] Điều hướng đến `/search?query={từ khóa}`<br>  - [ ] URL chứa query parameter đúng<br>- [ ] Trang kết quả tìm kiếm hiển thị:<br>  - [ ] Từ khóa trong search bar<br>  - [ ] Danh sách sản phẩm phù hợp với từ khóa<br>  - [ ] Số lượng kết quả (nếu có)<br>  - [ ] Có thể scroll để xem thêm<br>- [ ] Click sản phẩm từ kết quả:<br>  - [ ] Điều hướng đến `/product/:id`<br>  - [ ] Trang chi tiết sản phẩm hiển thị đúng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Search bar hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Nhập từ khóa \| ⬜ Pass / ⬜ Fail \| \|<br>\| Dropdown gợi ý hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đến trang search \| ⬜ Pass / ⬜ Fail \| \|<br>\| Kết quả tìm kiếm hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Click sản phẩm điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot search bar<br>- [ ] Screenshot dropdown gợi ý<br>- [ ] Screenshot trang kết quả tìm kiếm<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details><br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra validation khi thiếu thông tin bắt buộc trong quá trình đặt hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào màn hình thanh toán
3. Không chọn địa chỉ giao hàng, click "Đặt hàng"
4. Chọn địa chỉ, không chọn phương thức thanh toán, click "Đặt hàng"
5. Chọn đầy đủ, click "Đặt hàng"

### Kết quả mong đợi
- [ ] Không cho phép đặt hàng nếu thiếu địa chỉ
- [ ] Hiển thị thông báo "Vui lòng chọn địa chỉ giao hàng"
- [ ] Không cho phép đặt hàng nếu thiếu phương thức thanh toán
- [ ] Hiển thị thông báo "Vui lòng chọn phương thức thanh toán"
- [ ] Khi đầy đủ thông tin, cho phép đặt hàng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Validation địa chỉ | ⬜ Pass / ⬜ Fail | |
| Validation phương thức thanh toán | ⬜ Pass / ⬜ Fail | |
| Thông báo lỗi hiển thị | ⬜ Pass / ⬜ Fail | |

**Ghi chú:**
**Ghi chú:**
**Ghi chú:**
**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-013: Đặt hàng với sản phẩm hết hàng

### Mô tả
Kiểm tra xử lý khi đặt hàng với sản phẩm đã hết hàng trong quá trình checkout.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Sản phẩm bị hết hàng sau khi thêm vào giỏ

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng (còn hàng)
3. Admin/backend đánh dấu sản phẩm hết hàng
4. Vào màn hình thanh toán
5. Thử đặt hàng

### Kết quả mong đợi

- [ ] Hiển thị cảnh báo sản phẩm đã hết hàng
- [ ] Không cho phép đặt hàng
- [ ] Có thể xóa sản phẩm hết hàng khỏi giỏ
- [ ] Hoặc tự động loại bỏ sản phẩm hết hàng và tiếp tục với sản phẩm còn lại

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Cảnh báo hết hàng | ⬜ Pass / ⬜ Fail | |
| Không cho đặt hàng | ⬜ Pass / ⬜ Fail | |
| Xử lý sản phẩm hết hàng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-014: Đặt hàng với voucher hết hạn

### Mô tả
Kiểm tra xử lý khi voucher đã hết hạn trong quá trình checkout.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có voucher đã hết hạn

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Áp dụng voucher (còn hạn)
3. Voucher hết hạn (chờ hoặc simulate)
4. Vào màn hình thanh toán
5. Thử đặt hàng

### Kết quả mong đợi

- [ ] Hiển thị cảnh báo voucher đã hết hạn
- [ ] Voucher tự động bị gỡ bỏ
- [ ] Tổng tiền cập nhật lại (không trừ voucher)
- [ ] Có thể tiếp tục đặt hàng

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Cảnh báo voucher hết hạn | ⬜ Pass / ⬜ Fail | |
| Voucher bị gỡ bỏ | ⬜ Pass / ⬜ Fail | |
| Tổng tiền cập nhật | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-015: Đặt hàng với mạng không ổn định

### Mô tả
Kiểm tra xử lý khi mạng không ổn định trong quá trình đặt hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test xử lý lỗi (Error Handling Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có thể simulate mạng chậm/ngắt

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Vào màn hình thanh toán
3. Điền đầy đủ thông tin
4. Simulate mạng chậm/ngắt
5. Click "Đặt hàng"
6. Quan sát hành vi

### Kết quả mong đợi

- [ ] Hiển thị loading khi đang gửi request
- [ ] Nếu timeout, hiển thị thông báo lỗi
- [ ] Có nút "Thử lại"
- [ ] Có thể retry đặt hàng
- [ ] Không bị duplicate đơn hàng khi retry
- [ ] Ứng dụng không bị crash

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Loading hiển thị | ⬜ Pass / ⬜ Fail | |
| Thông báo lỗi | ⬜ Pass / ⬜ Fail | |
| Nút thử lại | ⬜ Pass / ⬜ Fail | |
| Retry thành công | ⬜ Pass / ⬜ Fail | |
| Không duplicate đơn | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-027: Thanh toán bằng COD (Thanh toán khi nhận hàng)

### Mô tả
Kiểm tra quy trình thanh toán bằng phương thức COD (Cash on Delivery - Thanh toán khi nhận hàng).

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có địa chỉ giao hàng đã lưu

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng
3. Vào màn hình thanh toán
4. Chọn địa chỉ giao hàng
5. Scroll đến section phương thức thanh toán
6. Chọn phương thức "COD" hoặc "Thanh toán khi nhận hàng"
7. Xác nhận phương thức được chọn
8. Xem lại thông tin đơn hàng
9. Click "Đặt hàng"
10. Kiểm tra kết quả đặt hàng

### Kết quả mong đợi

- [ ] Phương thức COD hiển thị trong danh sách phương thức thanh toán
- [ ] Có thể chọn phương thức COD
- [ ] Phương thức COD được highlight khi chọn
- [ ] Hiển thị thông tin: "Thanh toán khi nhận hàng" hoặc "COD"
- [ ] Tổng tiền hiển thị đầy đủ (bao gồm phí ship nếu có)
- [ ] Click "Đặt hàng" thành công
- [ ] Đặt hàng thành công với phương thức COD
- [ ] Hiển thị thông báo "Đặt hàng thành công"
- [ ] Đơn hàng được tạo với phương thức thanh toán = COD
- [ ] Trong chi tiết đơn hàng hiển thị: "Thanh toán khi nhận hàng" hoặc "COD"

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phương thức COD hiển thị | ⬜ Pass / ⬜ Fail | |
| Chọn COD thành công | ⬜ Pass / ⬜ Fail | |
| Thông tin hiển thị đúng | ⬜ Pass / ⬜ Fail | |
| Đặt hàng thành công | ⬜ Pass / ⬜ Fail | |
| Đơn hàng lưu đúng phương thức | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-028: Thanh toán bằng chuyển khoản ngân hàng

### Mô tả
Kiểm tra quy trình thanh toán bằng phương thức chuyển khoản ngân hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập
- Có sản phẩm trong giỏ hàng
- Có địa chỉ giao hàng đã lưu

### Các bước thực hiện

1. Đăng nhập vào ứng dụng
2. Thêm sản phẩm vào giỏ hàng
3. Vào màn hình thanh toán
4. Chọn địa chỉ giao hàng
5. Scroll đến section phương thức thanh toán
6. Chọn phương thức "Chuyển khoản ngân hàng" hoặc "Bank Transfer"
7. Xác nhận phương thức được chọn
8. Quan sát thông tin tài khoản ngân hàng hiển thị
9. Xem lại thông tin đơn hàng
10. Click "Đặt hàng"
11. Kiểm tra kết quả đặt hàng

### Kết quả mong đợi

- [ ] Phương thức chuyển khoản hiển thị trong danh sách phương thức thanh toán
- [ ] Có thể chọn phương thức chuyển khoản
- [ ] Phương thức chuyển khoản được highlight khi chọn
- [ ] Khi chọn chuyển khoản, hiển thị thông tin tài khoản ngân hàng:
  - [ ] Tên ngân hàng
  - [ ] Số tài khoản
  - [ ] Tên chủ tài khoản
  - [ ] Nội dung chuyển khoản (mã đơn hàng hoặc số điện thoại)
- [ ] Có thể copy số tài khoản và nội dung chuyển khoản
- [ ] Hiển thị hướng dẫn: "Vui lòng chuyển khoản đúng số tiền và nội dung để đơn hàng được xử lý nhanh nhất"
- [ ] Tổng tiền hiển thị đầy đủ
- [ ] Click "Đặt hàng" thành công
- [ ] Đặt hàng thành công với phương thức chuyển khoản
- [ ] Hiển thị thông báo "Đặt hàng thành công. Vui lòng chuyển khoản theo thông tin bên dưới"
- [ ] Đơn hàng được tạo với phương thức thanh toán = Chuyển khoản
- [ ] Trong chi tiết đơn hàng hiển thị:
  - [ ] Phương thức thanh toán: "Chuyển khoản ngân hàng"
  - [ ] Thông tin tài khoản ngân hàng
  - [ ] Trạng thái: "Chờ thanh toán" hoặc "Chờ xác nhận"

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Phương thức chuyển khoản hiển thị | ⬜ Pass / ⬜ Fail | |
| Chọn chuyển khoản thành công | ⬜ Pass / ⬜ Fail | |
| Thông tin tài khoản hiển thị đầy đủ | ⬜ Pass / ⬜ Fail | |
| Có thể copy thông tin | ⬜ Pass / ⬜ Fail | |
| Hướng dẫn hiển thị | ⬜ Pass / ⬜ Fail | |
| Đặt hàng thành công | ⬜ Pass / ⬜ Fail | |
| Đơn hàng lưu đúng phương thức | ⬜ Pass / ⬜ Fail | |
| Thông báo hiển thị đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-029: Copy thông tin chuyển khoản

### Mô tả
Kiểm tra chức năng copy thông tin tài khoản và nội dung chuyển khoản.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Đang ở màn hình thanh toán
- Đã chọn phương thức chuyển khoản ngân hàng
- Thông tin tài khoản đã hiển thị

### Các bước thực hiện

1. Chọn phương thức chuyển khoản ngân hàng
2. Quan sát thông tin tài khoản hiển thị
3. Click nút "Copy" hoặc icon copy bên cạnh số tài khoản
4. Kiểm tra clipboard
5. Click nút "Copy" bên cạnh nội dung chuyển khoản
6. Kiểm tra clipboard

### Kết quả mong đợi

- [ ] Có nút/icon "Copy" bên cạnh số tài khoản
- [ ] Click copy số tài khoản thành công
- [ ] Số tài khoản được copy vào clipboard
- [ ] Hiển thị toast "Đã copy số tài khoản" (nếu có)
- [ ] Có nút/icon "Copy" bên cạnh nội dung chuyển khoản
- [ ] Click copy nội dung chuyển khoản thành công
- [ ] Nội dung chuyển khoản được copy vào clipboard
- [ ] Hiển thị toast "Đã copy nội dung chuyển khoản" (nếu có)
- [ ] Có thể paste vào app ngân hàng để chuyển khoản

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Nút copy số tài khoản | ⬜ Pass / ⬜ Fail | |
| Copy số tài khoản thành công | ⬜ Pass / ⬜ Fail | |
| Nút copy nội dung | ⬜ Pass / ⬜ Fail | |
| Copy nội dung thành công | ⬜ Pass / ⬜ Fail | |
| Toast thông báo hiển thị | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

# Tìm Kiếm & Điều Hướng

## TC-BHV-016: Tìm kiếm sản phẩm và điều hướng

### Mô tả
Kiểm tra chức năng tìm kiếm sản phẩm và điều hướng đến kết quả tìm kiếm. Đảm bảo tìm kiếm hoạt động đúng và kết quả hiển thị chính xác.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã mở ứng dụng
- Có sản phẩm trong hệ thống

### Các bước thực hiện

1. **Mở ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Xác nhận trang chủ hiển thị

2. **Click vào search bar**
   - Tìm search bar ở header
   - Click vào search bar
   - Xác nhận có thể nhập text

3. **Nhập từ khóa tìm kiếm**
   - Nhập từ khóa (ví dụ: "áo thun")
   - Quan sát dropdown gợi ý (nếu có)
   - Đợi kết quả tìm kiếm

4. **Chọn sản phẩm từ dropdown (nếu có)**
   - Quan sát danh sách gợi ý
   - Click vào một sản phẩm trong dropdown
   - Quan sát điều hướng

5. **Hoặc nhấn Enter/Submit**
   - Nhấn Enter hoặc click nút tìm kiếm
   - Quan sát điều hướng

6. **Kiểm tra trang kết quả tìm kiếm**
   - Xác nhận điều hướng đến `/search?query=áo thun`
   - Quan sát danh sách kết quả
   - Kiểm tra từ khóa hiển thị trong search bar

7. **Click vào sản phẩm từ kết quả**
   - Click vào một sản phẩm
   - Quan sát điều hướng

### Kết quả mong đợi

- [ ] Trang chủ hiển thị với search bar ở header
- [ ] Click vào search bar cho phép nhập text
- [ ] Khi nhập từ khóa:
  - [ ] Hiển thị dropdown gợi ý (nếu có)
  - [ ] Dropdown hiển thị sản phẩm liên quan
  - [ ] Có thể chọn sản phẩm từ dropdown
- [ ] Khi nhấn Enter hoặc submit:
  - [ ] Điều hướng đến `/search?query={từ khóa}`
  - [ ] URL chứa query parameter đúng
- [ ] Trang kết quả tìm kiếm hiển thị:
  - [ ] Từ khóa trong search bar
  - [ ] Danh sách sản phẩm phù hợp với từ khóa
  - [ ] Số lượng kết quả (nếu có)
  - [ ] Có thể scroll để xem thêm
- [ ] Click sản phẩm từ kết quả:
  - [ ] Điều hướng đến `/product/:id`
  - [ ] Trang chi tiết sản phẩm hiển thị đúng

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Search bar hiển thị | ⬜ Pass / ⬜ Fail | |
| Nhập từ khóa | ⬜ Pass / ⬜ Fail | |
| Dropdown gợi ý hiển thị | ⬜ Pass / ⬜ Fail | |
| Điều hướng đến trang search | ⬜ Pass / ⬜ Fail | |
| Kết quả tìm kiếm hiển thị | ⬜ Pass / ⬜ Fail | |
| Click sản phẩm điều hướng đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot search bar
- [ ] Screenshot dropdown gợi ý
- [ ] Screenshot trang kết quả tìm kiếm
- [ ] Screenshot log console (nếu có lỗi)

</details>

</details>

</details>

---

## TC-BHV-017: Tìm kiếm không có kết quả

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-017 |
| **Description Test case** | Kiểm tra hiển thị khi tìm kiếm không có kết quả. |
| **Test case Procedure** | 1. Mở ứng dụng<br>2. Click vào search bar<br>3. Nhập từ khóa không có trong hệ thống (ví dụ: "xyzabc123")<br>4. Nhấn Enter hoặc submit<br>5. Quan sát trang kết quả |
| **Expected Output** | - [ ] Điều hướng đến trang search<br>- [ ] Hiển thị empty state với message "Không tìm thấy sản phẩm"<br>- [ ] Có gợi ý tìm kiếm khác hoặc nút "Về trang chủ"<br>- [ ] Không hiển thị danh sách sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã mở ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-018: Điều hướng từ header navigation<br>### Mô tả<br>Kiểm tra điều hướng từ các nút trong header và footer navigation.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Click vào logo/tên shop (nếu có)<br>3. Click vào icon Danh mục<br>4. Click vào icon Đơn hàng<br>5. Click vào icon Giỏ hàng<br>6. Click vào icon Profile/Avatar<br>7. Kiểm tra điều hướng<br>### Kết quả mong đợi<br>- [ ] Click logo điều hướng về trang chủ `/`<br>- [ ] Click Danh mục mở modal danh mục hoặc điều hướng đến `/categories`<br>- [ ] Click Đơn hàng mở modal đơn hàng hoặc điều hướng đến `/orders`<br>- [ ] Click Giỏ hàng điều hướng đến `/cart`<br>- [ ] Click Profile điều hướng đến `/profile`<br>- [ ] Badge số lượng hiển thị trên icon giỏ hàng (nếu có sản phẩm)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Logo điều hướng về home \| ⬜ Pass / ⬜ Fail \| \|<br>\| Danh mục hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giỏ hàng điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Profile điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Badge số lượng hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-019: Điều hướng từ footer navigation<br>### Mô tả<br>Kiểm tra điều hướng từ footer navigation.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Scroll xuống cuối trang<br>3. Quan sát footer navigation<br>4. Click vào các nút trong footer:<br>   - Trang chủ<br>   - Danh mục<br>   - Đơn hàng<br>   - Giỏ hàng<br>   - Profile<br>5. Kiểm tra điều hướng và active state<br>### Kết quả mong đợi<br>- [ ] Footer hiển thị các nút navigation<br>- [ ] Mỗi nút có icon và text<br>- [ ] Click nút điều hướng đến trang tương ứng<br>- [ ] Nút của trang hiện tại được highlight/active<br>- [ ] Badge số lượng hiển thị trên icon giỏ hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Footer hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Active state đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-020: Điều hướng từ floating cart<br>### Mô tả<br>Kiểm tra điều hướng từ floating cart preview.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>- Có sản phẩm trong giỏ hàng<br>- Không ở trang cart<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Quay về trang chủ hoặc trang khác (không phải cart)<br>4. Quan sát floating cart ở cuối màn hình<br>5. Click vào floating cart<br>6. Kiểm tra điều hướng và trạng thái giỏ hàng<br>### Kết quả mong đợi<br>- [ ] Floating cart hiển thị ở cuối màn hình<br>- [ ] Hiển thị icon giỏ hàng với badge số lượng<br>- [ ] Hiển thị tổng tiền giỏ hàng<br>- [ ] Hiển thị text "Đặt mua"<br>- [ ] Click vào floating cart điều hướng đến `/cart`<br>- [ ] Tất cả sản phẩm trong giỏ được tự động chọn (checkbox checked)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Floating cart hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Badge số lượng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đến cart \| ⬜ Pass / ⬜ Fail \| \|<br>\| Sản phẩm tự động chọn \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Flash Sale<br>## TC-BHV-021: Mua sản phẩm flash sale<br>### Mô tả<br>Kiểm tra quy trình mua sản phẩm flash sale từ trang chủ đến đặt hàng thành công. Đảm bảo countdown timer hoạt động đúng và giá flash sale được áp dụng chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có flash sale đang diễn ra<br>- Có sản phẩm flash sale trong hệ thống<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Xem flash sale trên trang chủ**<br>   - Quan sát section Flash Sale trên trang chủ<br>   - Kiểm tra countdown timer<br>   - Quan sát danh sách sản phẩm flash sale<br>   - Kiểm tra giá flash sale và giá gốc<br>3. **Click vào sản phẩm flash sale**<br>   - Click vào một sản phẩm flash sale<br>   - Xác nhận điều hướng đến trang chi tiết sản phẩm<br>4. **Kiểm tra trang chi tiết sản phẩm flash sale**<br>   - Xác nhận banner flash sale hiển thị<br>   - Kiểm tra countdown timer trên trang chi tiết<br>   - Kiểm tra giá flash sale và giá gốc<br>   - Kiểm tra % giảm giá<br>5. **Thêm sản phẩm flash sale vào giỏ hàng**<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm được thêm vào giỏ<br>6. **Kiểm tra giá trong giỏ hàng**<br>   - Vào giỏ hàng<br>   - Kiểm tra giá sản phẩm = giá flash sale (không phải giá gốc)<br>   - Kiểm tra tổng tiền tính đúng<br>7. **Vào màn hình thanh toán**<br>   - Click "Thanh toán"<br>   - Kiểm tra giá sản phẩm trong checkout = giá flash sale<br>   - Kiểm tra tổng tiền<br>8. **Đặt hàng**<br>   - Chọn địa chỉ giao hàng<br>   - Chọn phương thức thanh toán<br>   - Click "Đặt hàng"<br>   - Xác nhận đặt hàng thành công<br>9. **Kiểm tra đơn hàng**<br>   - Vào trang đơn hàng<br>   - Mở chi tiết đơn hàng vừa đặt<br>   - Kiểm tra giá sản phẩm = giá flash sale<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Section Flash Sale hiển thị trên trang chủ:<br>  - [ ] Countdown timer hiển thị và đếm ngược chính xác<br>  - [ ] Danh sách sản phẩm flash sale hiển thị<br>  - [ ] Giá flash sale và giá gốc hiển thị rõ ràng<br>  - [ ] % giảm giá hiển thị<br>- [ ] Click sản phẩm điều hướng đến trang chi tiết<br>- [ ] Trang chi tiết sản phẩm flash sale:<br>  - [ ] Banner flash sale hiển thị với timer<br>  - [ ] Countdown timer đếm ngược chính xác (giờ:phút:giây)<br>  - [ ] Giá flash sale hiển thị lớn, nổi bật<br>  - [ ] Giá gốc hiển thị gạch ngang<br>  - [ ] % giảm giá hiển thị<br>- [ ] Thêm vào giỏ hàng thành công<br>- [ ] Trong giỏ hàng:<br>  - [ ] Giá sản phẩm = giá flash sale (không phải giá gốc)<br>  - [ ] Tổng tiền tính đúng<br>- [ ] Trong màn hình thanh toán:<br>  - [ ] Giá sản phẩm = giá flash sale<br>  - [ ] Tổng tiền tính đúng<br>- [ ] Đặt hàng thành công<br>- [ ] Trong đơn hàng:<br>  - [ ] Giá sản phẩm = giá flash sale<br>  - [ ] Thông tin flash sale được lưu đúng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Flash sale hiển thị trên home \| ⬜ Pass / ⬜ Fail \| \|<br>\| Countdown timer hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Trang chi tiết flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá flash sale hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thêm vào giỏ hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong giỏ = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong checkout = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong đơn hàng = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot flash sale trên trang chủ<br>- [ ] Screenshot trang chi tiết flash sale<br>- [ ] Screenshot giỏ hàng với giá flash sale<br>- [ ] Screenshot đơn hàng với giá flash sale<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-017 |
| **Description Test case** | Kiểm tra hiển thị khi tìm kiếm không có kết quả. |
| **Test case Procedure** | 1. Mở ứng dụng<br>2. Click vào search bar<br>3. Nhập từ khóa không có trong hệ thống (ví dụ: "xyzabc123")<br>4. Nhấn Enter hoặc submit<br>5. Quan sát trang kết quả |
| **Expected Output** | - [ ] Điều hướng đến trang search<br>- [ ] Hiển thị empty state với message "Không tìm thấy sản phẩm"<br>- [ ] Có gợi ý tìm kiếm khác hoặc nút "Về trang chủ"<br>- [ ] Không hiển thị danh sách sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã mở ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-018: Điều hướng từ header navigation<br>### Mô tả<br>Kiểm tra điều hướng từ các nút trong header và footer navigation.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Click vào logo/tên shop (nếu có)<br>3. Click vào icon Danh mục<br>4. Click vào icon Đơn hàng<br>5. Click vào icon Giỏ hàng<br>6. Click vào icon Profile/Avatar<br>7. Kiểm tra điều hướng<br>### Kết quả mong đợi<br>- [ ] Click logo điều hướng về trang chủ `/`<br>- [ ] Click Danh mục mở modal danh mục hoặc điều hướng đến `/categories`<br>- [ ] Click Đơn hàng mở modal đơn hàng hoặc điều hướng đến `/orders`<br>- [ ] Click Giỏ hàng điều hướng đến `/cart`<br>- [ ] Click Profile điều hướng đến `/profile`<br>- [ ] Badge số lượng hiển thị trên icon giỏ hàng (nếu có sản phẩm)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Logo điều hướng về home \| ⬜ Pass / ⬜ Fail \| \|<br>\| Danh mục hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giỏ hàng điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Profile điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Badge số lượng hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-019: Điều hướng từ footer navigation<br>### Mô tả<br>Kiểm tra điều hướng từ footer navigation.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Scroll xuống cuối trang<br>3. Quan sát footer navigation<br>4. Click vào các nút trong footer:<br>   - Trang chủ<br>   - Danh mục<br>   - Đơn hàng<br>   - Giỏ hàng<br>   - Profile<br>5. Kiểm tra điều hướng và active state<br>### Kết quả mong đợi<br>- [ ] Footer hiển thị các nút navigation<br>- [ ] Mỗi nút có icon và text<br>- [ ] Click nút điều hướng đến trang tương ứng<br>- [ ] Nút của trang hiện tại được highlight/active<br>- [ ] Badge số lượng hiển thị trên icon giỏ hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Footer hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Active state đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-020: Điều hướng từ floating cart<br>### Mô tả<br>Kiểm tra điều hướng từ floating cart preview.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>- Có sản phẩm trong giỏ hàng<br>- Không ở trang cart<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Quay về trang chủ hoặc trang khác (không phải cart)<br>4. Quan sát floating cart ở cuối màn hình<br>5. Click vào floating cart<br>6. Kiểm tra điều hướng và trạng thái giỏ hàng<br>### Kết quả mong đợi<br>- [ ] Floating cart hiển thị ở cuối màn hình<br>- [ ] Hiển thị icon giỏ hàng với badge số lượng<br>- [ ] Hiển thị tổng tiền giỏ hàng<br>- [ ] Hiển thị text "Đặt mua"<br>- [ ] Click vào floating cart điều hướng đến `/cart`<br>- [ ] Tất cả sản phẩm trong giỏ được tự động chọn (checkbox checked)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Floating cart hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Badge số lượng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đến cart \| ⬜ Pass / ⬜ Fail \| \|<br>\| Sản phẩm tự động chọn \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Flash Sale<br>## TC-BHV-021: Mua sản phẩm flash sale<br>### Mô tả<br>Kiểm tra quy trình mua sản phẩm flash sale từ trang chủ đến đặt hàng thành công. Đảm bảo countdown timer hoạt động đúng và giá flash sale được áp dụng chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có flash sale đang diễn ra<br>- Có sản phẩm flash sale trong hệ thống<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Xem flash sale trên trang chủ**<br>   - Quan sát section Flash Sale trên trang chủ<br>   - Kiểm tra countdown timer<br>   - Quan sát danh sách sản phẩm flash sale<br>   - Kiểm tra giá flash sale và giá gốc<br>3. **Click vào sản phẩm flash sale**<br>   - Click vào một sản phẩm flash sale<br>   - Xác nhận điều hướng đến trang chi tiết sản phẩm<br>4. **Kiểm tra trang chi tiết sản phẩm flash sale**<br>   - Xác nhận banner flash sale hiển thị<br>   - Kiểm tra countdown timer trên trang chi tiết<br>   - Kiểm tra giá flash sale và giá gốc<br>   - Kiểm tra % giảm giá<br>5. **Thêm sản phẩm flash sale vào giỏ hàng**<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm được thêm vào giỏ<br>6. **Kiểm tra giá trong giỏ hàng**<br>   - Vào giỏ hàng<br>   - Kiểm tra giá sản phẩm = giá flash sale (không phải giá gốc)<br>   - Kiểm tra tổng tiền tính đúng<br>7. **Vào màn hình thanh toán**<br>   - Click "Thanh toán"<br>   - Kiểm tra giá sản phẩm trong checkout = giá flash sale<br>   - Kiểm tra tổng tiền<br>8. **Đặt hàng**<br>   - Chọn địa chỉ giao hàng<br>   - Chọn phương thức thanh toán<br>   - Click "Đặt hàng"<br>   - Xác nhận đặt hàng thành công<br>9. **Kiểm tra đơn hàng**<br>   - Vào trang đơn hàng<br>   - Mở chi tiết đơn hàng vừa đặt<br>   - Kiểm tra giá sản phẩm = giá flash sale<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Section Flash Sale hiển thị trên trang chủ:<br>  - [ ] Countdown timer hiển thị và đếm ngược chính xác<br>  - [ ] Danh sách sản phẩm flash sale hiển thị<br>  - [ ] Giá flash sale và giá gốc hiển thị rõ ràng<br>  - [ ] % giảm giá hiển thị<br>- [ ] Click sản phẩm điều hướng đến trang chi tiết<br>- [ ] Trang chi tiết sản phẩm flash sale:<br>  - [ ] Banner flash sale hiển thị với timer<br>  - [ ] Countdown timer đếm ngược chính xác (giờ:phút:giây)<br>  - [ ] Giá flash sale hiển thị lớn, nổi bật<br>  - [ ] Giá gốc hiển thị gạch ngang<br>  - [ ] % giảm giá hiển thị<br>- [ ] Thêm vào giỏ hàng thành công<br>- [ ] Trong giỏ hàng:<br>  - [ ] Giá sản phẩm = giá flash sale (không phải giá gốc)<br>  - [ ] Tổng tiền tính đúng<br>- [ ] Trong màn hình thanh toán:<br>  - [ ] Giá sản phẩm = giá flash sale<br>  - [ ] Tổng tiền tính đúng<br>- [ ] Đặt hàng thành công<br>- [ ] Trong đơn hàng:<br>  - [ ] Giá sản phẩm = giá flash sale<br>  - [ ] Thông tin flash sale được lưu đúng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Flash sale hiển thị trên home \| ⬜ Pass / ⬜ Fail \| \|<br>\| Countdown timer hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Trang chi tiết flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá flash sale hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thêm vào giỏ hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong giỏ = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong checkout = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong đơn hàng = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot flash sale trên trang chủ<br>- [ ] Screenshot trang chi tiết flash sale<br>- [ ] Screenshot giỏ hàng với giá flash sale<br>- [ ] Screenshot đơn hàng với giá flash sale<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-017 |
| **Description Test case** | Kiểm tra hiển thị khi tìm kiếm không có kết quả. |
| **Test case Procedure** | 1. Mở ứng dụng<br>2. Click vào search bar<br>3. Nhập từ khóa không có trong hệ thống (ví dụ: "xyzabc123")<br>4. Nhấn Enter hoặc submit<br>5. Quan sát trang kết quả |
| **Expected Output** | - [ ] Điều hướng đến trang search<br>- [ ] Hiển thị empty state với message "Không tìm thấy sản phẩm"<br>- [ ] Có gợi ý tìm kiếm khác hoặc nút "Về trang chủ"<br>- [ ] Không hiển thị danh sách sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã mở ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-018: Điều hướng từ header navigation<br>### Mô tả<br>Kiểm tra điều hướng từ các nút trong header và footer navigation.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Click vào logo/tên shop (nếu có)<br>3. Click vào icon Danh mục<br>4. Click vào icon Đơn hàng<br>5. Click vào icon Giỏ hàng<br>6. Click vào icon Profile/Avatar<br>7. Kiểm tra điều hướng<br>### Kết quả mong đợi<br>- [ ] Click logo điều hướng về trang chủ `/`<br>- [ ] Click Danh mục mở modal danh mục hoặc điều hướng đến `/categories`<br>- [ ] Click Đơn hàng mở modal đơn hàng hoặc điều hướng đến `/orders`<br>- [ ] Click Giỏ hàng điều hướng đến `/cart`<br>- [ ] Click Profile điều hướng đến `/profile`<br>- [ ] Badge số lượng hiển thị trên icon giỏ hàng (nếu có sản phẩm)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Logo điều hướng về home \| ⬜ Pass / ⬜ Fail \| \|<br>\| Danh mục hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đơn hàng hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giỏ hàng điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Profile điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Badge số lượng hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-019: Điều hướng từ footer navigation<br>### Mô tả<br>Kiểm tra điều hướng từ footer navigation.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Scroll xuống cuối trang<br>3. Quan sát footer navigation<br>4. Click vào các nút trong footer:<br>   - Trang chủ<br>   - Danh mục<br>   - Đơn hàng<br>   - Giỏ hàng<br>   - Profile<br>5. Kiểm tra điều hướng và active state<br>### Kết quả mong đợi<br>- [ ] Footer hiển thị các nút navigation<br>- [ ] Mỗi nút có icon và text<br>- [ ] Click nút điều hướng đến trang tương ứng<br>- [ ] Nút của trang hiện tại được highlight/active<br>- [ ] Badge số lượng hiển thị trên icon giỏ hàng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Footer hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Active state đúng \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br>## TC-BHV-020: Điều hướng từ floating cart<br>### Mô tả<br>Kiểm tra điều hướng từ floating cart preview.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>### Tiền điều kiện<br>- Người dùng đã mở ứng dụng<br>- Có sản phẩm trong giỏ hàng<br>- Không ở trang cart<br>### Các bước thực hiện<br>1. Mở ứng dụng<br>2. Thêm sản phẩm vào giỏ hàng<br>3. Quay về trang chủ hoặc trang khác (không phải cart)<br>4. Quan sát floating cart ở cuối màn hình<br>5. Click vào floating cart<br>6. Kiểm tra điều hướng và trạng thái giỏ hàng<br>### Kết quả mong đợi<br>- [ ] Floating cart hiển thị ở cuối màn hình<br>- [ ] Hiển thị icon giỏ hàng với badge số lượng<br>- [ ] Hiển thị tổng tiền giỏ hàng<br>- [ ] Hiển thị text "Đặt mua"<br>- [ ] Click vào floating cart điều hướng đến `/cart`<br>- [ ] Tất cả sản phẩm trong giỏ được tự động chọn (checkbox checked)<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Floating cart hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Badge số lượng đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Tổng tiền hiển thị \| ⬜ Pass / ⬜ Fail \| \|<br>\| Điều hướng đến cart \| ⬜ Pass / ⬜ Fail \| \|<br>\| Sản phẩm tự động chọn \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú:** _________________<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production<br>---<br># Flash Sale<br>## TC-BHV-021: Mua sản phẩm flash sale<br>### Mô tả<br>Kiểm tra quy trình mua sản phẩm flash sale từ trang chủ đến đặt hàng thành công. Đảm bảo countdown timer hoạt động đúng và giá flash sale được áp dụng chính xác.<br>### Loại test<br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br>### Tiền điều kiện<br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có flash sale đang diễn ra<br>- Có sản phẩm flash sale trong hệ thống<br>### Các bước thực hiện<br>1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile<br>   - Nhập thông tin đăng nhập<br>   - Xác nhận đăng nhập thành công<br>2. **Xem flash sale trên trang chủ**<br>   - Quan sát section Flash Sale trên trang chủ<br>   - Kiểm tra countdown timer<br>   - Quan sát danh sách sản phẩm flash sale<br>   - Kiểm tra giá flash sale và giá gốc<br>3. **Click vào sản phẩm flash sale**<br>   - Click vào một sản phẩm flash sale<br>   - Xác nhận điều hướng đến trang chi tiết sản phẩm<br>4. **Kiểm tra trang chi tiết sản phẩm flash sale**<br>   - Xác nhận banner flash sale hiển thị<br>   - Kiểm tra countdown timer trên trang chi tiết<br>   - Kiểm tra giá flash sale và giá gốc<br>   - Kiểm tra % giảm giá<br>5. **Thêm sản phẩm flash sale vào giỏ hàng**<br>   - Chọn variant (nếu có)<br>   - Chọn số lượng<br>   - Click "Thêm vào giỏ hàng"<br>   - Xác nhận sản phẩm được thêm vào giỏ<br>6. **Kiểm tra giá trong giỏ hàng**<br>   - Vào giỏ hàng<br>   - Kiểm tra giá sản phẩm = giá flash sale (không phải giá gốc)<br>   - Kiểm tra tổng tiền tính đúng<br>7. **Vào màn hình thanh toán**<br>   - Click "Thanh toán"<br>   - Kiểm tra giá sản phẩm trong checkout = giá flash sale<br>   - Kiểm tra tổng tiền<br>8. **Đặt hàng**<br>   - Chọn địa chỉ giao hàng<br>   - Chọn phương thức thanh toán<br>   - Click "Đặt hàng"<br>   - Xác nhận đặt hàng thành công<br>9. **Kiểm tra đơn hàng**<br>   - Vào trang đơn hàng<br>   - Mở chi tiết đơn hàng vừa đặt<br>   - Kiểm tra giá sản phẩm = giá flash sale<br>### Kết quả mong đợi<br>- [ ] Đăng nhập thành công<br>- [ ] Section Flash Sale hiển thị trên trang chủ:<br>  - [ ] Countdown timer hiển thị và đếm ngược chính xác<br>  - [ ] Danh sách sản phẩm flash sale hiển thị<br>  - [ ] Giá flash sale và giá gốc hiển thị rõ ràng<br>  - [ ] % giảm giá hiển thị<br>- [ ] Click sản phẩm điều hướng đến trang chi tiết<br>- [ ] Trang chi tiết sản phẩm flash sale:<br>  - [ ] Banner flash sale hiển thị với timer<br>  - [ ] Countdown timer đếm ngược chính xác (giờ:phút:giây)<br>  - [ ] Giá flash sale hiển thị lớn, nổi bật<br>  - [ ] Giá gốc hiển thị gạch ngang<br>  - [ ] % giảm giá hiển thị<br>- [ ] Thêm vào giỏ hàng thành công<br>- [ ] Trong giỏ hàng:<br>  - [ ] Giá sản phẩm = giá flash sale (không phải giá gốc)<br>  - [ ] Tổng tiền tính đúng<br>- [ ] Trong màn hình thanh toán:<br>  - [ ] Giá sản phẩm = giá flash sale<br>  - [ ] Tổng tiền tính đúng<br>- [ ] Đặt hàng thành công<br>- [ ] Trong đơn hàng:<br>  - [ ] Giá sản phẩm = giá flash sale<br>  - [ ] Thông tin flash sale được lưu đúng<br>### Kết quả thực tế<br>\| Mục kiểm tra \| Kết quả \| Ghi chú \|<br>\|-------------\|---------\|---------\|<br>\| Đăng nhập \| ⬜ Pass / ⬜ Fail \| \|<br>\| Flash sale hiển thị trên home \| ⬜ Pass / ⬜ Fail \| \|<br>\| Countdown timer hoạt động \| ⬜ Pass / ⬜ Fail \| \|<br>\| Trang chi tiết flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá flash sale hiển thị đúng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Thêm vào giỏ hàng \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong giỏ = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong checkout = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>\| Đặt hàng thành công \| ⬜ Pass / ⬜ Fail \| \|<br>\| Giá trong đơn hàng = giá flash sale \| ⬜ Pass / ⬜ Fail \| \|<br>**Ghi chú kết quả thực tế:**<br>```<br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]<br>```<br>### Ngày test<br>**Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú:**<br>**Ghi chú:**<br>**Ghi chú:** _________________<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot flash sale trên trang chủ<br>- [ ] Screenshot trang chi tiết flash sale<br>- [ ] Screenshot giỏ hàng với giá flash sale<br>- [ ] Screenshot đơn hàng với giá flash sale<br>- [ ] Screenshot log console (nếu có lỗi)<br><br></details><br><br></details> |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị khi tìm kiếm không có kết quả.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã mở ứng dụng

### Các bước thực hiện
1. Mở ứng dụng
2. Click vào search bar
3. Nhập từ khóa không có trong hệ thống (ví dụ: "xyzabc123")
4. Nhấn Enter hoặc submit
5. Quan sát trang kết quả

### Kết quả mong đợi
- [ ] Điều hướng đến trang search
- [ ] Hiển thị empty state với message "Không tìm thấy sản phẩm"
- [ ] Có gợi ý tìm kiếm khác hoặc nút "Về trang chủ"
- [ ] Không hiển thị danh sách sản phẩm

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Empty state hiển thị | ⬜ Pass / ⬜ Fail | |
| Message rõ ràng | ⬜ Pass / ⬜ Fail | |
| Có nút điều hướng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:**
**Ghi chú:**
**Ghi chú:**
**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-018: Điều hướng từ header navigation

### Mô tả
Kiểm tra điều hướng từ các nút trong header và footer navigation.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã mở ứng dụng

### Các bước thực hiện

1. Mở ứng dụng
2. Click vào logo/tên shop (nếu có)
3. Click vào icon Danh mục
4. Click vào icon Đơn hàng
5. Click vào icon Giỏ hàng
6. Click vào icon Profile/Avatar
7. Kiểm tra điều hướng

### Kết quả mong đợi

- [ ] Click logo điều hướng về trang chủ `/`
- [ ] Click Danh mục mở modal danh mục hoặc điều hướng đến `/categories`
- [ ] Click Đơn hàng mở modal đơn hàng hoặc điều hướng đến `/orders`
- [ ] Click Giỏ hàng điều hướng đến `/cart`
- [ ] Click Profile điều hướng đến `/profile`
- [ ] Badge số lượng hiển thị trên icon giỏ hàng (nếu có sản phẩm)

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Logo điều hướng về home | ⬜ Pass / ⬜ Fail | |
| Danh mục hoạt động | ⬜ Pass / ⬜ Fail | |
| Đơn hàng hoạt động | ⬜ Pass / ⬜ Fail | |
| Giỏ hàng điều hướng đúng | ⬜ Pass / ⬜ Fail | |
| Profile điều hướng đúng | ⬜ Pass / ⬜ Fail | |
| Badge số lượng hiển thị | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-019: Điều hướng từ footer navigation

### Mô tả
Kiểm tra điều hướng từ footer navigation.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã mở ứng dụng

### Các bước thực hiện

1. Mở ứng dụng
2. Scroll xuống cuối trang
3. Quan sát footer navigation
4. Click vào các nút trong footer:
   - Trang chủ
   - Danh mục
   - Đơn hàng
   - Giỏ hàng
   - Profile
5. Kiểm tra điều hướng và active state

### Kết quả mong đợi

- [ ] Footer hiển thị các nút navigation
- [ ] Mỗi nút có icon và text
- [ ] Click nút điều hướng đến trang tương ứng
- [ ] Nút của trang hiện tại được highlight/active
- [ ] Badge số lượng hiển thị trên icon giỏ hàng

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Footer hiển thị | ⬜ Pass / ⬜ Fail | |
| Điều hướng đúng | ⬜ Pass / ⬜ Fail | |
| Active state đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

## TC-BHV-020: Điều hướng từ floating cart

### Mô tả
Kiểm tra điều hướng từ floating cart preview.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**

### Tiền điều kiện
- Người dùng đã mở ứng dụng
- Có sản phẩm trong giỏ hàng
- Không ở trang cart

### Các bước thực hiện

1. Mở ứng dụng
2. Thêm sản phẩm vào giỏ hàng
3. Quay về trang chủ hoặc trang khác (không phải cart)
4. Quan sát floating cart ở cuối màn hình
5. Click vào floating cart
6. Kiểm tra điều hướng và trạng thái giỏ hàng

### Kết quả mong đợi

- [ ] Floating cart hiển thị ở cuối màn hình
- [ ] Hiển thị icon giỏ hàng với badge số lượng
- [ ] Hiển thị tổng tiền giỏ hàng
- [ ] Hiển thị text "Đặt mua"
- [ ] Click vào floating cart điều hướng đến `/cart`
- [ ] Tất cả sản phẩm trong giỏ được tự động chọn (checkbox checked)

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Floating cart hiển thị | ⬜ Pass / ⬜ Fail | |
| Badge số lượng đúng | ⬜ Pass / ⬜ Fail | |
| Tổng tiền hiển thị | ⬜ Pass / ⬜ Fail | |
| Điều hướng đến cart | ⬜ Pass / ⬜ Fail | |
| Sản phẩm tự động chọn | ⬜ Pass / ⬜ Fail | |

**Ghi chú:** _________________

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Dev / ⬜ Staging / ⬜ Production  

---

# Flash Sale

## TC-BHV-021: Mua sản phẩm flash sale

### Mô tả
Kiểm tra quy trình mua sản phẩm flash sale từ trang chủ đến đặt hàng thành công. Đảm bảo countdown timer hoạt động đúng và giá flash sale được áp dụng chính xác.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có flash sale đang diễn ra
- Có sản phẩm flash sale trong hệ thống

### Các bước thực hiện

1. **Đăng nhập vào ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Click vào icon Profile
   - Nhập thông tin đăng nhập
   - Xác nhận đăng nhập thành công

2. **Xem flash sale trên trang chủ**
   - Quan sát section Flash Sale trên trang chủ
   - Kiểm tra countdown timer
   - Quan sát danh sách sản phẩm flash sale
   - Kiểm tra giá flash sale và giá gốc

3. **Click vào sản phẩm flash sale**
   - Click vào một sản phẩm flash sale
   - Xác nhận điều hướng đến trang chi tiết sản phẩm

4. **Kiểm tra trang chi tiết sản phẩm flash sale**
   - Xác nhận banner flash sale hiển thị
   - Kiểm tra countdown timer trên trang chi tiết
   - Kiểm tra giá flash sale và giá gốc
   - Kiểm tra % giảm giá

5. **Thêm sản phẩm flash sale vào giỏ hàng**
   - Chọn variant (nếu có)
   - Chọn số lượng
   - Click "Thêm vào giỏ hàng"
   - Xác nhận sản phẩm được thêm vào giỏ

6. **Kiểm tra giá trong giỏ hàng**
   - Vào giỏ hàng
   - Kiểm tra giá sản phẩm = giá flash sale (không phải giá gốc)
   - Kiểm tra tổng tiền tính đúng

7. **Vào màn hình thanh toán**
   - Click "Thanh toán"
   - Kiểm tra giá sản phẩm trong checkout = giá flash sale
   - Kiểm tra tổng tiền

8. **Đặt hàng**
   - Chọn địa chỉ giao hàng
   - Chọn phương thức thanh toán
   - Click "Đặt hàng"
   - Xác nhận đặt hàng thành công

9. **Kiểm tra đơn hàng**
   - Vào trang đơn hàng
   - Mở chi tiết đơn hàng vừa đặt
   - Kiểm tra giá sản phẩm = giá flash sale

### Kết quả mong đợi

- [ ] Đăng nhập thành công
- [ ] Section Flash Sale hiển thị trên trang chủ:
  - [ ] Countdown timer hiển thị và đếm ngược chính xác
  - [ ] Danh sách sản phẩm flash sale hiển thị
  - [ ] Giá flash sale và giá gốc hiển thị rõ ràng
  - [ ] % giảm giá hiển thị
- [ ] Click sản phẩm điều hướng đến trang chi tiết
- [ ] Trang chi tiết sản phẩm flash sale:
  - [ ] Banner flash sale hiển thị với timer
  - [ ] Countdown timer đếm ngược chính xác (giờ:phút:giây)
  - [ ] Giá flash sale hiển thị lớn, nổi bật
  - [ ] Giá gốc hiển thị gạch ngang
  - [ ] % giảm giá hiển thị
- [ ] Thêm vào giỏ hàng thành công
- [ ] Trong giỏ hàng:
  - [ ] Giá sản phẩm = giá flash sale (không phải giá gốc)
  - [ ] Tổng tiền tính đúng
- [ ] Trong màn hình thanh toán:
  - [ ] Giá sản phẩm = giá flash sale
  - [ ] Tổng tiền tính đúng
- [ ] Đặt hàng thành công
- [ ] Trong đơn hàng:
  - [ ] Giá sản phẩm = giá flash sale
  - [ ] Thông tin flash sale được lưu đúng

### Kết quả thực tế

| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Đăng nhập | ⬜ Pass / ⬜ Fail | |
| Flash sale hiển thị trên home | ⬜ Pass / ⬜ Fail | |
| Countdown timer hoạt động | ⬜ Pass / ⬜ Fail | |
| Trang chi tiết flash sale | ⬜ Pass / ⬜ Fail | |
| Giá flash sale hiển thị đúng | ⬜ Pass / ⬜ Fail | |
| Thêm vào giỏ hàng | ⬜ Pass / ⬜ Fail | |
| Giá trong giỏ = giá flash sale | ⬜ Pass / ⬜ Fail | |
| Giá trong checkout = giá flash sale | ⬜ Pass / ⬜ Fail | |
| Đặt hàng thành công | ⬜ Pass / ⬜ Fail | |
| Giá trong đơn hàng = giá flash sale | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot flash sale trên trang chủ
- [ ] Screenshot trang chi tiết flash sale
- [ ] Screenshot giỏ hàng với giá flash sale
- [ ] Screenshot đơn hàng với giá flash sale
- [ ] Screenshot log console (nếu có lỗi)

</details>

</details>

</details>

---

## TC-BHV-030: Xem danh sách đơn hàng theo trạng thái

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-030 |
| **Description Test case** | Kiểm tra chức năng xem danh sách đơn hàng và filter theo các trạng thái khác nhau (Tất cả, Chờ xử lý, Đã tiếp nhận, Đang giao, Đã nhận, Đã hủy). |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile hoặc avatar<br>   - Nhập số điện thoại và mật khẩu (hoặc OTP)<br>   - Click "Đăng nhập"<br>   - Xác nhận đăng nhập thành công<br>2. **Vào trang đơn hàng**<br>   - Click vào nút "Đơn hàng" ở footer hoặc header<br>   - Xác nhận điều hướng đến trang `/orders`<br>3. **Kiểm tra danh sách đơn hàng**<br>   - Quan sát danh sách đơn hàng hiển thị<br>   - Kiểm tra các tab trạng thái: Tất cả, Chờ xử lý, Đã tiếp nhận, Đang giao, Đã nhận, Đã hủy<br>   - Kiểm tra tab "Tất cả" được chọn mặc định<br>4. **Filter theo trạng thái "Chờ xử lý"**<br>   - Click vào tab "Chờ xử lý"<br>   - Quan sát danh sách đơn hàng được filter<br>   - Kiểm tra chỉ hiển thị đơn hàng có trạng thái "Chờ xử lý"<br>5. **Filter theo các trạng thái khác**<br>   - Click vào tab "Đã tiếp nhận"<br>   - Kiểm tra danh sách filter đúng<br>   - Click vào tab "Đang giao"<br>   - Kiểm tra danh sách filter đúng<br>   - Click vào tab "Đã nhận"<br>   - Kiểm tra danh sách filter đúng<br>   - Click vào tab "Đã hủy"<br>   - Kiểm tra danh sách filter đúng<br>6. **Kiểm tra thông tin đơn hàng trong danh sách**<br>   - Quan sát mỗi đơn hàng hiển thị:<br>     - Mã đơn hàng<br>     - Trạng thái đơn hàng<br>     - Tổng tiền<br>     - Số lượng sản phẩm<br>     - Ngày đặt hàng<br>     - Hình ảnh sản phẩm (nếu có) |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Điều hướng đến trang đơn hàng thành công<br>- [ ] Danh sách đơn hàng hiển thị đầy đủ<br>- [ ] Các tab trạng thái hiển thị:<br>  - [ ] Tab "Tất cả"<br>  - [ ] Tab "Chờ xử lý"<br>  - [ ] Tab "Đã tiếp nhận"<br>  - [ ] Tab "Đang giao"<br>  - [ ] Tab "Đã nhận"<br>  - [ ] Tab "Đã hủy"<br>- [ ] Tab "Tất cả" được chọn mặc định và hiển thị tất cả đơn hàng<br>- [ ] Khi click vào tab "Chờ xử lý":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị đơn hàng có trạng thái "Chờ xử lý"<br>  - [ ] URL cập nhật thành `/orders?status=0`<br>- [ ] Khi click vào các tab khác:<br>  - [ ] Tab được highlight đúng<br>  - [ ] Danh sách filter đúng theo trạng thái<br>  - [ ] URL cập nhật đúng<br>- [ ] Mỗi đơn hàng trong danh sách hiển thị đầy đủ thông tin:<br>  - [ ] Mã đơn hàng<br>  - [ ] Trạng thái đơn hàng với màu sắc phù hợp<br>  - [ ] Tổng tiền được format đúng<br>  - [ ] Số lượng sản phẩm<br>  - [ ] Ngày đặt hàng<br>  - [ ] Hình ảnh sản phẩm (nếu có)<br>- [ ] Có thể click vào đơn hàng để xem chi tiết |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng trong hệ thống<br>- Có đơn hàng ở các trạng thái khác nhau |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách đơn hàng<br>- [ ] Screenshot filter theo từng trạng thái<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem danh sách đơn hàng và filter theo các trạng thái khác nhau. Đảm bảo người dùng có thể dễ dàng tìm và xem đơn hàng theo trạng thái mong muốn.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng trong hệ thống
- Có đơn hàng ở các trạng thái khác nhau

### Các bước thực hiện
1. **Đăng nhập vào ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Click vào icon Profile hoặc avatar
   - Nhập số điện thoại và mật khẩu (hoặc OTP)
   - Click "Đăng nhập"
   - Xác nhận đăng nhập thành công

2. **Vào trang đơn hàng**
   - Click vào nút "Đơn hàng" ở footer hoặc header
   - Xác nhận điều hướng đến trang `/orders`

3. **Kiểm tra danh sách đơn hàng**
   - Quan sát danh sách đơn hàng hiển thị
   - Kiểm tra các tab trạng thái: Tất cả, Chờ xử lý, Đã tiếp nhận, Đang giao, Đã nhận, Đã hủy
   - Kiểm tra tab "Tất cả" được chọn mặc định

4. **Filter theo trạng thái "Chờ xử lý"**
   - Click vào tab "Chờ xử lý"
   - Quan sát danh sách đơn hàng được filter
   - Kiểm tra chỉ hiển thị đơn hàng có trạng thái "Chờ xử lý"

5. **Filter theo các trạng thái khác**
   - Click vào tab "Đã tiếp nhận"
   - Kiểm tra danh sách filter đúng
   - Click vào tab "Đang giao"
   - Kiểm tra danh sách filter đúng
   - Click vào tab "Đã nhận"
   - Kiểm tra danh sách filter đúng
   - Click vào tab "Đã hủy"
   - Kiểm tra danh sách filter đúng

6. **Kiểm tra thông tin đơn hàng trong danh sách**
   - Quan sát mỗi đơn hàng hiển thị:
     - Mã đơn hàng
     - Trạng thái đơn hàng
     - Tổng tiền
     - Số lượng sản phẩm
     - Ngày đặt hàng
     - Hình ảnh sản phẩm (nếu có)

### Kết quả mong đợi
- [ ] Đăng nhập thành công
- [ ] Điều hướng đến trang đơn hàng thành công
- [ ] Danh sách đơn hàng hiển thị đầy đủ
- [ ] Các tab trạng thái hiển thị đầy đủ
- [ ] Tab "Tất cả" được chọn mặc định
- [ ] Filter theo từng trạng thái hoạt động đúng
- [ ] URL cập nhật đúng khi chuyển tab
- [ ] Thông tin đơn hàng hiển thị đầy đủ và chính xác
- [ ] Có thể click vào đơn hàng để xem chi tiết

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Đăng nhập | ⬜ Pass / ⬜ Fail | |
| Vào trang đơn hàng | ⬜ Pass / ⬜ Fail | |
| Hiển thị danh sách | ⬜ Pass / ⬜ Fail | |
| Filter theo trạng thái | ⬜ Pass / ⬜ Fail | |
| Thông tin đơn hàng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot danh sách đơn hàng
- [ ] Screenshot filter theo từng trạng thái
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-031: Xem chi tiết đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-031 |
| **Description Test case** | Kiểm tra chức năng xem chi tiết đơn hàng bao gồm thông tin sản phẩm, địa chỉ giao hàng, phương thức thanh toán, tổng tiền và các thông tin khác. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang đơn hàng**<br>   - Click vào nút "Đơn hàng"<br>   - Xác nhận vào trang danh sách đơn hàng<br>3. **Click vào một đơn hàng**<br>   - Chọn một đơn hàng bất kỳ từ danh sách<br>   - Click vào đơn hàng<br>   - Xác nhận điều hướng đến trang chi tiết đơn hàng<br>4. **Kiểm tra thông tin địa chỉ giao hàng**<br>   - Scroll đến section "Địa chỉ nhận hàng"<br>   - Kiểm tra hiển thị:<br>     - Họ tên người nhận<br>     - Số điện thoại<br>     - Email (nếu có)<br>     - Địa chỉ đầy đủ<br>5. **Kiểm tra thông tin sản phẩm**<br>   - Scroll đến section "Sản phẩm"<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Variant (màu sắc, kích thước nếu có)<br>     - Giá sản phẩm<br>     - Số lượng<br>     - Thành tiền<br>6. **Kiểm tra thông tin thanh toán**<br>   - Scroll đến section "Thông tin thanh toán"<br>   - Kiểm tra hiển thị:<br>     - Mã đơn hàng<br>     - Trạng thái đơn hàng<br>     - Trạng thái thanh toán<br>     - Phương thức thanh toán<br>     - Phí vận chuyển<br>     - Hỗ trợ phí ship (nếu có)<br>     - Voucher (nếu có)<br>     - Điểm đã sử dụng (nếu có)<br>     - Tổng thanh toán<br>7. **Kiểm tra điểm thưởng (nếu có)**<br>   - Kiểm tra hiển thị điểm thưởng<br>   - Kiểm tra trạng thái điểm thưởng (đã được cộng, tạm giữ)<br>8. **Kiểm tra ghi chú đơn hàng (nếu có)**<br>   - Kiểm tra section "Ghi chú đơn hàng" hiển thị (nếu có ghi chú) |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang đơn hàng thành công<br>- [ ] Click vào đơn hàng điều hướng đến trang chi tiết<br>- [ ] Trang chi tiết đơn hàng hiển thị đầy đủ các section:<br>  - [ ] Địa chỉ nhận hàng<br>  - [ ] Danh sách sản phẩm<br>  - [ ] Thông tin thanh toán<br>  - [ ] Điểm thưởng (nếu có)<br>  - [ ] Ghi chú đơn hàng (nếu có)<br>- [ ] Section "Địa chỉ nhận hàng" hiển thị đầy đủ:<br>  - [ ] Họ tên người nhận<br>  - [ ] Số điện thoại<br>  - [ ] Email (nếu có)<br>  - [ ] Địa chỉ đầy đủ (số nhà, phường/xã, quận/huyện, tỉnh/thành phố)<br>- [ ] Section "Sản phẩm" hiển thị đầy đủ cho mỗi sản phẩm:<br>  - [ ] Hình ảnh sản phẩm load đúng<br>  - [ ] Tên sản phẩm<br>  - [ ] Variant (màu sắc, kích thước)<br>  - [ ] Giá sản phẩm được format đúng<br>  - [ ] Số lượng<br>  - [ ] Thành tiền = Giá × Số lượng<br>- [ ] Section "Thông tin thanh toán" hiển thị đầy đủ:<br>  - [ ] Mã đơn hàng<br>  - [ ] Trạng thái đơn hàng với màu sắc phù hợp<br>  - [ ] Trạng thái thanh toán<br>  - [ ] Phương thức thanh toán (COD, Chuyển khoản)<br>  - [ ] Phí vận chuyển<br>  - [ ] Hỗ trợ phí ship (nếu có)<br>  - [ ] Voucher và số tiền giảm (nếu có)<br>  - [ ] Điểm đã sử dụng (nếu có)<br>  - [ ] Tổng thanh toán = Tổng giá sản phẩm + Phí ship - Hỗ trợ ship - Voucher - Điểm<br>- [ ] Điểm thưởng hiển thị đúng với trạng thái (nếu có)<br>- [ ] Ghi chú đơn hàng hiển thị (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trang chi tiết đơn hàng<br>- [ ] Screenshot các section khác nhau<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem chi tiết đơn hàng. Đảm bảo tất cả thông tin về đơn hàng được hiển thị đầy đủ và chính xác.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng trong hệ thống

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang đơn hàng
3. Click vào một đơn hàng
4. Kiểm tra thông tin địa chỉ giao hàng
5. Kiểm tra thông tin sản phẩm
6. Kiểm tra thông tin thanh toán
7. Kiểm tra điểm thưởng (nếu có)
8. Kiểm tra ghi chú đơn hàng (nếu có)

### Kết quả mong đợi
- [ ] Tất cả thông tin đơn hàng hiển thị đầy đủ và chính xác
- [ ] Layout và UI dễ đọc, dễ hiểu
- [ ] Các số tiền được format đúng định dạng VNĐ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Điều hướng đến chi tiết | ⬜ Pass / ⬜ Fail | |
| Thông tin địa chỉ | ⬜ Pass / ⬜ Fail | |
| Thông tin sản phẩm | ⬜ Pass / ⬜ Fail | |
| Thông tin thanh toán | ⬜ Pass / ⬜ Fail | |
| Tính toán tổng tiền | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot trang chi tiết đơn hàng
- [ ] Screenshot các section khác nhau
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-032: Hủy đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-032 |
| **Description Test case** | Kiểm tra chức năng hủy đơn hàng. Đảm bảo chỉ có thể hủy đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã tiếp nhận", và có xác nhận trước khi hủy. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang đơn hàng**<br>   - Click vào nút "Đơn hàng"<br>   - Vào tab "Chờ xử lý" hoặc "Đã tiếp nhận"<br>3. **Mở chi tiết đơn hàng có thể hủy**<br>   - Chọn một đơn hàng có trạng thái "Chờ xử lý" (status = 0) hoặc "Đã tiếp nhận" (status = 1)<br>   - Click vào đơn hàng để xem chi tiết<br>4. **Kiểm tra nút hủy đơn hàng**<br>   - Scroll xuống cuối trang<br>   - Kiểm tra nút "Hủy đơn hàng" hiển thị<br>   - Xác nhận nút chỉ hiển thị với đơn hàng có thể hủy<br>5. **Click nút hủy đơn hàng**<br>   - Click vào nút "Hủy đơn hàng"<br>   - Xác nhận modal xác nhận hiển thị<br>6. **Xác nhận hủy đơn hàng**<br>   - Kiểm tra modal hiển thị:<br>     - Tiêu đề "Xác nhận hủy đơn"<br>     - Mã đơn hàng<br>     - Nút "Giữ lại"<br>     - Nút "Xác nhận hủy"<br>   - Click vào nút "Xác nhận hủy"<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra trạng thái đơn hàng cập nhật thành "Đã hủy"<br>   - Kiểm tra nút "Hủy đơn hàng" không còn hiển thị<br>8. **Kiểm tra với đơn hàng không thể hủy**<br>   - Vào đơn hàng có trạng thái "Đang giao" hoặc "Đã nhận"<br>   - Kiểm tra nút "Hủy đơn hàng" không hiển thị |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang đơn hàng thành công<br>- [ ] Nút "Hủy đơn hàng" chỉ hiển thị với đơn hàng có thể hủy (status = 0 hoặc 1)<br>- [ ] Khi click nút "Hủy đơn hàng":<br>  - [ ] Modal xác nhận hiển thị<br>  - [ ] Modal hiển thị đầy đủ thông tin:<br>    - [ ] Tiêu đề "Xác nhận hủy đơn"<br>    - [ ] Mã đơn hàng<br>    - [ ] Nút "Giữ lại"<br>    - [ ] Nút "Xác nhận hủy" (màu đỏ)<br>- [ ] Khi click "Giữ lại":<br>  - [ ] Modal đóng lại<br>  - [ ] Đơn hàng không bị hủy<br>- [ ] Khi click "Xác nhận hủy":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Hiển thị thông báo "Đã gửi yêu cầu hủy đơn hàng thành công"<br>  - [ ] Trạng thái đơn hàng cập nhật thành "Đã hủy"<br>  - [ ] Nút "Hủy đơn hàng" không còn hiển thị<br>  - [ ] Đơn hàng chuyển sang tab "Đã hủy"<br>- [ ] Với đơn hàng không thể hủy (status = 2, 3, 5):<br>  - [ ] Nút "Hủy đơn hàng" không hiển thị |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã tiếp nhận"<br>- Người dùng có đơn hàng ở trạng thái "Đang giao" hoặc "Đã nhận" |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút hủy đơn hàng<br>- [ ] Screenshot modal xác nhận<br>- [ ] Screenshot đơn hàng sau khi hủy<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng hủy đơn hàng. Đảm bảo chỉ có thể hủy đơn hàng ở các trạng thái phù hợp và có xác nhận trước khi hủy.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã tiếp nhận"
- Người dùng có đơn hàng ở trạng thái "Đang giao" hoặc "Đã nhận"

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang đơn hàng
3. Mở chi tiết đơn hàng có thể hủy
4. Kiểm tra nút hủy đơn hàng
5. Click nút hủy đơn hàng
6. Xác nhận hủy đơn hàng
7. Kiểm tra kết quả
8. Kiểm tra với đơn hàng không thể hủy

### Kết quả mong đợi
- [ ] Nút hủy chỉ hiển thị với đơn hàng có thể hủy
- [ ] Modal xác nhận hiển thị đầy đủ thông tin
- [ ] Hủy đơn hàng thành công và cập nhật trạng thái
- [ ] Đơn hàng không thể hủy không hiển thị nút hủy

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút hủy | ⬜ Pass / ⬜ Fail | |
| Modal xác nhận | ⬜ Pass / ⬜ Fail | |
| Hủy đơn thành công | ⬜ Pass / ⬜ Fail | |
| Cập nhật trạng thái | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot nút hủy đơn hàng
- [ ] Screenshot modal xác nhận
- [ ] Screenshot đơn hàng sau khi hủy
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-033: Đánh giá sản phẩm sau khi nhận hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-033 |
| **Description Test case** | Kiểm tra chức năng đánh giá sản phẩm sau khi đơn hàng đã được nhận (status = 5). Đảm bảo có thể đánh giá từng sản phẩm với rating, comment và hình ảnh. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào đơn hàng đã nhận**<br>   - Click vào nút "Đơn hàng"<br>   - Vào tab "Đã nhận"<br>   - Chọn một đơn hàng đã nhận (status = 5)<br>   - Click vào đơn hàng để xem chi tiết<br>3. **Kiểm tra section đánh giá**<br>   - Scroll đến section "Đánh giá sản phẩm"<br>   - Kiểm tra hiển thị form đánh giá cho các sản phẩm chưa đánh giá<br>   - Kiểm tra hiển thị đánh giá đã có cho các sản phẩm đã đánh giá<br>4. **Đánh giá sản phẩm chưa đánh giá**<br>   - Chọn một sản phẩm chưa đánh giá<br>   - Click vào form đánh giá<br>   - Chọn số sao (1-5 sao)<br>   - Nhập comment (tùy chọn)<br>   - Upload hình ảnh (tùy chọn)<br>   - Click nút "Gửi đánh giá"<br>5. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra đánh giá hiển thị trong section "Đánh giá sản phẩm"<br>   - Kiểm tra form đánh giá cho sản phẩm đó không còn hiển thị<br>6. **Xem đánh giá đã có**<br>   - Kiểm tra đánh giá đã có hiển thị:<br>     - Số sao<br>     - Comment<br>     - Hình ảnh (nếu có)<br>     - Ngày đánh giá<br>     - Badge "Đã mua" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào đơn hàng đã nhận thành công<br>- [ ] Section "Đánh giá sản phẩm" hiển thị:<br>  - [ ] Form đánh giá cho sản phẩm chưa đánh giá<br>  - [ ] Đánh giá đã có cho sản phẩm đã đánh giá<br>- [ ] Form đánh giá cho phép:<br>  - [ ] Chọn số sao (1-5 sao) với UI rõ ràng<br>  - [ ] Nhập comment (tùy chọn)<br>  - [ ] Upload hình ảnh (tùy chọn, có thể upload nhiều ảnh)<br>  - [ ] Nút "Gửi đánh giá"<br>- [ ] Khi gửi đánh giá:<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Hiển thị thông báo thành công<br>  - [ ] Đánh giá hiển thị ngay trong section<br>  - [ ] Form đánh giá cho sản phẩm đó không còn hiển thị<br>- [ ] Đánh giá đã có hiển thị đầy đủ:<br>  - [ ] Số sao được highlight đúng<br>  - [ ] Comment hiển thị đầy đủ<br>  - [ ] Hình ảnh hiển thị (nếu có)<br>  - [ ] Ngày đánh giá<br>  - [ ] Badge "Đã mua" (verified purchase)<br>- [ ] Chỉ có thể đánh giá sản phẩm trong đơn hàng đã nhận (status = 5) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng đã nhận (status = 5)<br>- Đơn hàng có ít nhất một sản phẩm chưa đánh giá |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form đánh giá<br>- [ ] Screenshot đánh giá đã gửi<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng đánh giá sản phẩm sau khi nhận hàng. Đảm bảo người dùng có thể đánh giá từng sản phẩm với rating, comment và hình ảnh.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng đã nhận (status = 5)
- Đơn hàng có ít nhất một sản phẩm chưa đánh giá

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào đơn hàng đã nhận
3. Kiểm tra section đánh giá
4. Đánh giá sản phẩm chưa đánh giá
5. Kiểm tra kết quả
6. Xem đánh giá đã có

### Kết quả mong đợi
- [ ] Form đánh giá hiển thị đầy đủ và dễ sử dụng
- [ ] Có thể đánh giá với rating, comment và hình ảnh
- [ ] Đánh giá được lưu và hiển thị đúng
- [ ] Chỉ có thể đánh giá đơn hàng đã nhận

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form đánh giá | ⬜ Pass / ⬜ Fail | |
| Gửi đánh giá thành công | ⬜ Pass / ⬜ Fail | |
| Hiển thị đánh giá đã có | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form đánh giá
- [ ] Screenshot đánh giá đã gửi
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-034: Xem thông tin thanh toán chuyển khoản

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-034 |
| **Description Test case** | Kiểm tra hiển thị thông tin thanh toán chuyển khoản cho đơn hàng có phương thức thanh toán là chuyển khoản và trạng thái thanh toán là "pending". Bao gồm QR code, số tài khoản, người nhận, nội dung chuyển khoản và countdown timer. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào đơn hàng cần thanh toán**<br>   - Click vào nút "Đơn hàng"<br>   - Tìm đơn hàng có phương thức thanh toán là "Chuyển khoản" và trạng thái thanh toán là "pending"<br>   - Click vào đơn hàng để xem chi tiết<br>3. **Kiểm tra section thanh toán chuyển khoản**<br>   - Scroll đến section hiển thị thông tin thanh toán<br>   - Kiểm tra hiển thị:<br>     - Phương thức thanh toán "Chuyển khoản nhanh 24/7"<br>     - Thông báo countdown timer (nếu có)<br>     - QR code thanh toán<br>     - Số tài khoản<br>     - Người nhận<br>     - Nội dung chuyển khoản (mã đơn hàng)<br>     - Số tiền cần chuyển<br>4. **Kiểm tra countdown timer**<br>   - Quan sát countdown timer hiển thị<br>   - Kiểm tra timer đếm ngược từ 15 phút<br>   - Kiểm tra format hiển thị (HH:MM:SS)<br>5. **Kiểm tra QR code**<br>   - Quan sát QR code hiển thị<br>   - Kiểm tra QR code có thể scan được<br>   - Kiểm tra QR code chứa đúng thông tin<br>6. **Kiểm tra nút copy**<br>   - Click vào nút "Sao chép" bên cạnh số tài khoản<br>   - Kiểm tra số tài khoản được copy vào clipboard<br>   - Kiểm tra thông báo "Đã sao chép số tài khoản"<br>   - Click vào nút "Sao chép" bên cạnh nội dung<br>   - Kiểm tra nội dung được copy vào clipboard<br>7. **Kiểm tra thông tin hiển thị**<br>   - Kiểm tra số tài khoản hiển thị đúng<br>   - Kiểm tra người nhận hiển thị đúng<br>   - Kiểm tra nội dung = mã đơn hàng<br>   - Kiểm tra số tiền = tổng thanh toán của đơn hàng<br>   - Kiểm tra tên ngân hàng hiển thị |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào đơn hàng cần thanh toán thành công<br>- [ ] Section thanh toán chuyển khoản hiển thị khi:<br>  - [ ] Phương thức thanh toán = "Chuyển khoản" hoặc "Bank Transfer"<br>  - [ ] Trạng thái thanh toán = "pending"<br>- [ ] Section hiển thị đầy đủ:<br>  - [ ] Phương thức thanh toán "Chuyển khoản nhanh 24/7"<br>  - [ ] Tên ngân hàng (ví dụ: VPBank)<br>  - [ ] Thông báo countdown timer với format "Cần thanh toán sớm trong HH:MM:SS"<br>  - [ ] QR code thanh toán hiển thị rõ ràng, có thể scan<br>  - [ ] Số tài khoản với nút "Sao chép"<br>  - [ ] Người nhận<br>  - [ ] Nội dung chuyển khoản (mã đơn hàng) với nút "Sao chép"<br>  - [ ] Số tiền cần chuyển (format VNĐ)<br>- [ ] Countdown timer:<br>  - [ ] Hiển thị và đếm ngược từ 15 phút<br>  - [ ] Format hiển thị: HH:MM:SS<br>  - [ ] Cập nhật mỗi giây<br>  - [ ] Khi hết thời gian, timer = 00:00:00 hoặc không hiển thị<br>- [ ] QR code:<br>  - [ ] Hiển thị rõ ràng, không bị mờ<br>  - [ ] Có thể scan được bằng app ngân hàng<br>  - [ ] Chứa đúng thông tin: số tài khoản, số tiền, nội dung<br>- [ ] Nút "Sao chép":<br>  - [ ] Copy số tài khoản vào clipboard<br>  - [ ] Copy nội dung (mã đơn hàng) vào clipboard<br>  - [ ] Hiển thị thông báo "Đã sao chép [thông tin] vào bộ nhớ tạm"<br>- [ ] Thông tin hiển thị chính xác:<br>  - [ ] Số tài khoản đúng<br>  - [ ] Người nhận đúng<br>  - [ ] Nội dung = mã đơn hàng<br>  - [ ] Số tiền = tổng thanh toán<br>- [ ] Với đơn hàng không phải chuyển khoản hoặc đã thanh toán:<br>  - [ ] Section này không hiển thị |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có đơn hàng với phương thức thanh toán là "Chuyển khoản"<br>- Trạng thái thanh toán của đơn hàng là "pending"<br>- Đơn hàng được tạo trong vòng 15 phút gần đây |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section thanh toán chuyển khoản<br>- [ ] Screenshot QR code<br>- [ ] Screenshot countdown timer<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị thông tin thanh toán chuyển khoản cho đơn hàng. Đảm bảo người dùng có đầy đủ thông tin để thực hiện chuyển khoản và có thể copy thông tin dễ dàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có đơn hàng với phương thức thanh toán là "Chuyển khoản"
- Trạng thái thanh toán của đơn hàng là "pending"
- Đơn hàng được tạo trong vòng 15 phút gần đây

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào đơn hàng cần thanh toán
3. Kiểm tra section thanh toán chuyển khoản
4. Kiểm tra countdown timer
5. Kiểm tra QR code
6. Kiểm tra nút copy
7. Kiểm tra thông tin hiển thị

### Kết quả mong đợi
- [ ] Section thanh toán hiển thị đầy đủ thông tin
- [ ] QR code có thể scan được
- [ ] Countdown timer hoạt động đúng
- [ ] Nút copy hoạt động đúng
- [ ] Thông tin hiển thị chính xác

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị section | ⬜ Pass / ⬜ Fail | |
| QR code | ⬜ Pass / ⬜ Fail | |
| Countdown timer | ⬜ Pass / ⬜ Fail | |
| Nút copy | ⬜ Pass / ⬜ Fail | |
| Thông tin chính xác | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section thanh toán chuyển khoản
- [ ] Screenshot QR code
- [ ] Screenshot countdown timer
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-035: Liên hệ shop từ đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-035 |
| **Description Test case** | Kiểm tra chức năng liên hệ shop từ trang chi tiết đơn hàng. Đảm bảo có thể mở chat Zalo với shop và tự động điền thông tin đơn hàng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào chi tiết đơn hàng**<br>   - Click vào nút "Đơn hàng"<br>   - Chọn một đơn hàng bất kỳ<br>   - Click vào đơn hàng để xem chi tiết<br>3. **Tìm nút liên hệ shop**<br>   - Scroll đến section "Bạn cần hỗ trợ?"<br>   - Kiểm tra nút "Liên hệ Shop" hiển thị<br>4. **Click nút liên hệ shop**<br>   - Click vào nút "Liên hệ Shop"<br>   - Quan sát hành vi của ứng dụng<br>5. **Kiểm tra chat Zalo mở**<br>   - Kiểm tra ứng dụng Zalo chat mở ra<br>   - Kiểm tra chat mở với Official Account của shop<br>   - Kiểm tra tin nhắn tự động điền:<br>     - "Cho tôi biết tình trạng đơn hàng hiện tại của tôi"<br>     - Mã đơn hàng<br>6. **Kiểm tra với đơn hàng khác**<br>   - Vào đơn hàng khác<br>   - Click "Liên hệ Shop"<br>   - Kiểm tra tin nhắn tự động điền đúng mã đơn hàng mới |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào chi tiết đơn hàng thành công<br>- [ ] Section "Bạn cần hỗ trợ?" hiển thị:<br>  - [ ] Tiêu đề "Bạn cần hỗ trợ?"<br>  - [ ] Nút "Liên hệ Shop" với icon chat<br>  - [ ] Icon mũi tên phải<br>- [ ] Khi click "Liên hệ Shop":<br>  - [ ] Mở Zalo chat với Official Account của shop<br>  - [ ] Tin nhắn tự động điền:<br>    - [ ] "Cho tôi biết tình trạng đơn hàng hiện tại của tôi"<br>    - [ ] Xuống dòng<br>    - [ ] "Mã đơn hàng: [mã đơn hàng]"<br>  - [ ] Mã đơn hàng = mã đơn hàng của đơn hàng hiện tại<br>- [ ] Với mỗi đơn hàng khác nhau:<br>  - [ ] Tin nhắn tự động điền đúng mã đơn hàng tương ứng<br>- [ ] Nếu không có OA ID:<br>  - [ ] Fallback mở link Zalo với số điện thoại shop |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng<br>- Ứng dụng Zalo đã được cài đặt trên thiết bị<br>- Có cấu hình OA ID hoặc số điện thoại shop |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section "Bạn cần hỗ trợ?"<br>- [ ] Screenshot chat Zalo mở ra<br>- [ ] Screenshot tin nhắn tự động điền<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng liên hệ shop từ trang chi tiết đơn hàng. Đảm bảo có thể mở chat Zalo với shop và tự động điền thông tin đơn hàng để hỗ trợ người dùng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng
- Ứng dụng Zalo đã được cài đặt trên thiết bị
- Có cấu hình OA ID hoặc số điện thoại shop

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào chi tiết đơn hàng
3. Tìm nút liên hệ shop
4. Click nút liên hệ shop
5. Kiểm tra chat Zalo mở
6. Kiểm tra với đơn hàng khác

### Kết quả mong đợi
- [ ] Nút liên hệ shop hiển thị rõ ràng
- [ ] Mở chat Zalo thành công
- [ ] Tin nhắn tự động điền đúng thông tin đơn hàng
- [ ] Mã đơn hàng trong tin nhắn đúng với đơn hàng hiện tại

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút liên hệ | ⬜ Pass / ⬜ Fail | |
| Mở chat Zalo | ⬜ Pass / ⬜ Fail | |
| Tin nhắn tự động điền | ⬜ Pass / ⬜ Fail | |
| Mã đơn hàng đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section "Bạn cần hỗ trợ?"
- [ ] Screenshot chat Zalo mở ra
- [ ] Screenshot tin nhắn tự động điền
- [ ] Screenshot log console (nếu có lỗi)

</details>

---


## TC-BHV-036: Cập nhật thông tin cơ bản (tên, email, số điện thoại)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-036 |
| **Description Test case** | Kiểm tra chức năng cập nhật thông tin cơ bản của tài khoản bao gồm họ tên, email và số điện thoại. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile hoặc avatar<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận điều hướng đến trang `/profile/edit`<br>3. **Kiểm tra form chỉnh sửa**<br>   - Quan sát form hiển thị:<br>     - Avatar hiện tại<br>     - Trường "Họ và tên" với giá trị hiện tại<br>     - Trường "Email" với giá trị hiện tại<br>     - Trường "Số điện thoại" (readonly hoặc disabled)<br>4. **Cập nhật họ tên**<br>   - Click vào trường "Họ và tên"<br>   - Xóa giá trị cũ<br>   - Nhập họ tên mới (ví dụ: "Nguyễn Văn A")<br>5. **Cập nhật email**<br>   - Click vào trường "Email"<br>   - Xóa giá trị cũ<br>   - Nhập email mới (ví dụ: "nguyenvana@example.com")<br>6. **Lưu thay đổi**<br>   - Scroll xuống cuối form<br>   - Click nút "Lưu thay đổi"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra điều hướng về trang Profile<br>   - Kiểm tra thông tin đã được cập nhật trên trang Profile<br>   - Vào lại trang chỉnh sửa và kiểm tra giá trị mới đã được lưu |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Điều hướng đến trang chỉnh sửa profile thành công<br>- [ ] Form hiển thị đầy đủ:<br>  - [ ] Avatar hiện tại<br>  - [ ] Trường "Họ và tên" với giá trị hiện tại có thể chỉnh sửa<br>  - [ ] Trường "Email" với giá trị hiện tại có thể chỉnh sửa<br>  - [ ] Trường "Số điện thoại" hiển thị nhưng không thể chỉnh sửa (readonly)<br>- [ ] Có thể nhập và chỉnh sửa họ tên<br>- [ ] Có thể nhập và chỉnh sửa email<br>- [ ] Khi click "Lưu thay đổi":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật profile<br>  - [ ] Hiển thị thông báo "Đã cập nhật thông tin tài khoản"<br>  - [ ] Điều hướng về trang Profile<br>  - [ ] Thông tin mới hiển thị trên trang Profile<br>- [ ] Khi vào lại trang chỉnh sửa:<br>  - [ ] Giá trị mới đã được lưu và hiển thị đúng<br>- [ ] Số điện thoại không thể chỉnh sửa (readonly) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có thông tin profile hiện tại |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form chỉnh sửa<br>- [ ] Screenshot sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng cập nhật thông tin cơ bản của tài khoản. Đảm bảo có thể cập nhật họ tên và email, trong khi số điện thoại không thể chỉnh sửa.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có thông tin profile hiện tại

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra form chỉnh sửa
4. Cập nhật họ tên
5. Cập nhật email
6. Lưu thay đổi
7. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Form hiển thị đầy đủ và có thể chỉnh sửa
- [ ] Cập nhật thành công và thông tin được lưu đúng
- [ ] Số điện thoại không thể chỉnh sửa

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form | ⬜ Pass / ⬜ Fail | |
| Cập nhật họ tên | ⬜ Pass / ⬜ Fail | |
| Cập nhật email | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form chỉnh sửa
- [ ] Screenshot sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-037: Cập nhật ngày sinh và giới tính

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-037 |
| **Description Test case** | Kiểm tra chức năng cập nhật ngày sinh và giới tính của tài khoản. Đảm bảo có thể chọn ngày, tháng, năm và nhập giới tính. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Kiểm tra trường ngày sinh**<br>   - Scroll đến trường "Ngày sinh"<br>   - Kiểm tra hiển thị 3 dropdown:<br>     - Dropdown "Ngày"<br>     - Dropdown "Tháng"<br>     - Dropdown "Năm"<br>   - Kiểm tra giá trị hiện tại được chọn (nếu có)<br>4. **Cập nhật ngày sinh**<br>   - Click vào dropdown "Ngày"<br>   - Chọn ngày mới (ví dụ: 15)<br>   - Click vào dropdown "Tháng"<br>   - Chọn tháng mới (ví dụ: 6)<br>   - Click vào dropdown "Năm"<br>   - Chọn năm mới (ví dụ: 1990)<br>   - Kiểm tra khi chọn tháng/năm, số ngày hợp lệ được cập nhật (ví dụ: tháng 2 có 28/29 ngày)<br>5. **Cập nhật giới tính**<br>   - Scroll đến trường "Giới tính"<br>   - Click vào trường "Giới tính"<br>   - Nhập giới tính mới (ví dụ: "Nam" hoặc "Nữ")<br>6. **Lưu thay đổi**<br>   - Click nút "Lưu thay đổi"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra thông tin đã được cập nhật<br>   - Vào lại trang chỉnh sửa và kiểm tra giá trị mới đã được lưu |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Trường "Ngày sinh" hiển thị 3 dropdown:<br>  - [ ] Dropdown "Ngày" với danh sách ngày (1-31)<br>  - [ ] Dropdown "Tháng" với danh sách tháng (1-12)<br>  - [ ] Dropdown "Năm" với danh sách năm (từ năm hiện tại trở về trước)<br>  - [ ] Giá trị hiện tại được chọn (nếu có)<br>- [ ] Khi chọn tháng/năm:<br>  - [ ] Số ngày hợp lệ được cập nhật (ví dụ: tháng 2 có 28/29 ngày, tháng 4 có 30 ngày)<br>  - [ ] Nếu ngày đã chọn > số ngày hợp lệ, tự động điều chỉnh về ngày cuối cùng của tháng<br>- [ ] Trường "Giới tính" có thể nhập text<br>- [ ] Khi click "Lưu thay đổi":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật với format ngày sinh: DD/MM/YYYY<br>  - [ ] Hiển thị thông báo thành công<br>  - [ ] Thông tin được cập nhật<br>- [ ] Khi vào lại trang chỉnh sửa:<br>  - [ ] Ngày sinh mới được hiển thị đúng trong 3 dropdown<br>  - [ ] Giới tính mới được hiển thị đúng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot dropdown ngày sinh<br>- [ ] Screenshot sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng cập nhật ngày sinh và giới tính. Đảm bảo có thể chọn ngày sinh từ dropdown và nhập giới tính.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra trường ngày sinh
4. Cập nhật ngày sinh
5. Cập nhật giới tính
6. Lưu thay đổi
7. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Dropdown ngày sinh hoạt động đúng
- [ ] Số ngày hợp lệ được cập nhật theo tháng/năm
- [ ] Cập nhật thành công và lưu đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Dropdown ngày sinh | ⬜ Pass / ⬜ Fail | |
| Cập nhật số ngày hợp lệ | ⬜ Pass / ⬜ Fail | |
| Cập nhật giới tính | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot dropdown ngày sinh
- [ ] Screenshot sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-038: Cập nhật địa chỉ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-038 |
| **Description Test case** | Kiểm tra chức năng cập nhật địa chỉ trong thông tin tài khoản. Địa chỉ này khác với địa chỉ giao hàng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Kiểm tra trường địa chỉ**<br>   - Scroll đến trường "Địa chỉ"<br>   - Kiểm tra hiển thị textarea với placeholder "Xã/Phường - Huyện/Quận - Tỉnh/Thành phố"<br>   - Kiểm tra giá trị hiện tại (nếu có)<br>4. **Cập nhật địa chỉ**<br>   - Click vào textarea "Địa chỉ"<br>   - Xóa giá trị cũ (nếu có)<br>   - Nhập địa chỉ mới (ví dụ: "Phường 1, Quận 1, TP.HCM")<br>5. **Lưu thay đổi**<br>   - Click nút "Lưu thay đổi"<br>   - Quan sát loading/processing<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra thông tin đã được cập nhật<br>   - Vào lại trang chỉnh sửa và kiểm tra địa chỉ mới đã được lưu |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Trường "Địa chỉ" hiển thị:<br>  - [ ] Textarea có thể nhập nhiều dòng<br>  - [ ] Placeholder "Xã/Phường - Huyện/Quận - Tỉnh/Thành phố"<br>  - [ ] Giá trị hiện tại (nếu có)<br>- [ ] Có thể nhập và chỉnh sửa địa chỉ<br>- [ ] Khi click "Lưu thay đổi":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật với địa chỉ mới<br>  - [ ] Hiển thị thông báo thành công<br>  - [ ] Thông tin được cập nhật<br>- [ ] Khi vào lại trang chỉnh sửa:<br>  - [ ] Địa chỉ mới được hiển thị đúng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trường địa chỉ<br>- [ ] Screenshot sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng cập nhật địa chỉ trong thông tin tài khoản. Địa chỉ này là địa chỉ cá nhân, khác với địa chỉ giao hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra trường địa chỉ
4. Cập nhật địa chỉ
5. Lưu thay đổi
6. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Textarea địa chỉ hoạt động đúng
- [ ] Cập nhật thành công và lưu đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị trường địa chỉ | ⬜ Pass / ⬜ Fail | |
| Cập nhật địa chỉ | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot trường địa chỉ
- [ ] Screenshot sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-039: Upload và thay đổi avatar

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-039 |
| **Description Test case** | Kiểm tra chức năng upload và thay đổi avatar (ảnh đại diện) của tài khoản. Đảm bảo có thể chọn ảnh từ thiết bị, validate kích thước và định dạng, và cập nhật avatar thành công. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Kiểm tra avatar hiện tại**<br>   - Quan sát avatar hiện tại hiển thị ở đầu form<br>   - Kiểm tra nút "Đổi ảnh đại diện" hiển thị<br>4. **Click nút đổi ảnh đại diện**<br>   - Click vào nút "Đổi ảnh đại diện"<br>   - Quan sát file picker mở ra<br>5. **Chọn ảnh hợp lệ**<br>   - Chọn một ảnh từ thiết bị (JPG, PNG, WEBP, GIF)<br>   - Kích thước ảnh < 5MB<br>   - Quan sát loading/processing<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo "Đang tải ảnh lên..."<br>   - Quan sát thông báo "Đã cập nhật ảnh đại diện thành công"<br>   - Kiểm tra avatar mới hiển thị trên form<br>   - Kiểm tra avatar mới hiển thị trên trang Profile<br>7. **Kiểm tra với ảnh không hợp lệ**<br>   - Click "Đổi ảnh đại diện" lại<br>   - Chọn file không phải ảnh (ví dụ: .txt, .pdf)<br>   - Kiểm tra thông báo lỗi "Định dạng file không hợp lệ"<br>8. **Kiểm tra với ảnh quá lớn**<br>   - Click "Đổi ảnh đại diện" lại<br>   - Chọn ảnh có kích thước > 5MB<br>   - Kiểm tra thông báo lỗi "File quá lớn. Kích thước tối đa là 5MB" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Avatar hiện tại hiển thị ở đầu form<br>- [ ] Nút "Đổi ảnh đại diện" hiển thị rõ ràng<br>- [ ] Khi click "Đổi ảnh đại diện":<br>  - [ ] File picker mở ra<br>  - [ ] Chỉ cho phép chọn file ảnh (JPG, PNG, WEBP, GIF)<br>- [ ] Khi chọn ảnh hợp lệ (< 5MB):<br>  - [ ] Hiển thị loading "Đang tải ảnh lên..."<br>  - [ ] Upload ảnh lên server<br>  - [ ] Hiển thị thông báo "Đã cập nhật ảnh đại diện thành công"<br>  - [ ] Avatar mới hiển thị trên form ngay lập tức<br>  - [ ] Avatar mới hiển thị trên trang Profile<br>  - [ ] Avatar mới hiển thị ở header/avatar icon<br>- [ ] Khi chọn file không phải ảnh:<br>  - [ ] Hiển thị thông báo lỗi "Định dạng file không hợp lệ. Chỉ chấp nhận: JPG, PNG, WEBP, GIF"<br>  - [ ] Avatar không thay đổi<br>- [ ] Khi chọn ảnh > 5MB:<br>  - [ ] Hiển thị thông báo lỗi "File quá lớn. Kích thước tối đa là 5MB"<br>  - [ ] Avatar không thay đổi<br>- [ ] Avatar được crop/resize phù hợp với kích thước hiển thị (hình tròn) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Thiết bị có ít nhất một ảnh hợp lệ<br>- Thiết bị có file không phải ảnh (để test validation) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot avatar hiện tại<br>- [ ] Screenshot file picker<br>- [ ] Screenshot avatar mới<br>- [ ] Screenshot thông báo lỗi (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng upload và thay đổi avatar. Đảm bảo có thể upload ảnh hợp lệ và validate các trường hợp không hợp lệ.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Thiết bị có ít nhất một ảnh hợp lệ
- Thiết bị có file không phải ảnh (để test validation)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra avatar hiện tại
4. Click nút đổi ảnh đại diện
5. Chọn ảnh hợp lệ
6. Kiểm tra kết quả
7. Kiểm tra với ảnh không hợp lệ
8. Kiểm tra với ảnh quá lớn

### Kết quả mong đợi
- [ ] Upload ảnh hợp lệ thành công
- [ ] Validate và hiển thị lỗi với file không hợp lệ
- [ ] Avatar được cập nhật và hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút đổi avatar | ⬜ Pass / ⬜ Fail | |
| Upload ảnh hợp lệ | ⬜ Pass / ⬜ Fail | |
| Validate file không hợp lệ | ⬜ Pass / ⬜ Fail | |
| Validate file quá lớn | ⬜ Pass / ⬜ Fail | |
| Hiển thị avatar mới | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot avatar hiện tại
- [ ] Screenshot file picker
- [ ] Screenshot avatar mới
- [ ] Screenshot thông báo lỗi (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-040: Validation khi cập nhật thông tin

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-040 |
| **Description Test case** | Kiểm tra các validation khi cập nhật thông tin tài khoản. Đảm bảo hệ thống validate đúng các trường hợp lỗi và hiển thị thông báo phù hợp. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Test validation email không hợp lệ**<br>   - Click vào trường "Email"<br>   - Nhập email không hợp lệ (ví dụ: "emailkhonghople" hoặc "email@")<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra thông báo lỗi (nếu có validation client-side)<br>4. **Test validation email trống**<br>   - Xóa hết nội dung trường Email<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra có cho phép lưu email trống hay không<br>5. **Test validation họ tên trống**<br>   - Xóa hết nội dung trường "Họ và tên"<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra thông báo lỗi (nếu có validation)<br>6. **Test validation ngày sinh không hợp lệ**<br>   - Chọn ngày sinh trong tương lai (nếu có thể)<br>   - Hoặc để trống ngày sinh<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra validation<br>7. **Test lưu thành công với dữ liệu hợp lệ**<br>   - Nhập lại tất cả thông tin hợp lệ<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra lưu thành công |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Validation email không hợp lệ:<br>  - [ ] Hiển thị thông báo lỗi (nếu có validation client-side)<br>  - [ ] Hoặc server trả về lỗi và hiển thị thông báo<br>- [ ] Validation email trống:<br>  - [ ] Có thể lưu email trống (nếu không bắt buộc)<br>  - [ ] Hoặc hiển thị thông báo bắt buộc (nếu bắt buộc)<br>- [ ] Validation họ tên trống:<br>  - [ ] Hiển thị thông báo lỗi "Họ và tên không được để trống" (nếu bắt buộc)<br>  - [ ] Hoặc cho phép lưu trống (nếu không bắt buộc)<br>- [ ] Validation ngày sinh:<br>  - [ ] Không cho phép chọn ngày trong tương lai<br>  - [ ] Hoặc hiển thị cảnh báo nếu chọn ngày trong tương lai<br>- [ ] Khi nhập dữ liệu hợp lệ:<br>  - [ ] Có thể lưu thành công<br>  - [ ] Hiển thị thông báo thành công<br>- [ ] Thông báo lỗi hiển thị rõ ràng, dễ hiểu<br>- [ ] Các trường lỗi được highlight (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot validation email không hợp lệ<br>- [ ] Screenshot validation các trường khác<br>- [ ] Screenshot thông báo lỗi<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra các validation khi cập nhật thông tin tài khoản. Đảm bảo hệ thống validate đúng và hiển thị thông báo phù hợp.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Test validation email không hợp lệ
4. Test validation email trống
5. Test validation họ tên trống
6. Test validation ngày sinh không hợp lệ
7. Test lưu thành công với dữ liệu hợp lệ

### Kết quả mong đợi
- [ ] Validation hoạt động đúng cho tất cả các trường
- [ ] Thông báo lỗi rõ ràng, dễ hiểu
- [ ] Có thể lưu với dữ liệu hợp lệ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Validation email | ⬜ Pass / ⬜ Fail | |
| Validation họ tên | ⬜ Pass / ⬜ Fail | |
| Validation ngày sinh | ⬜ Pass / ⬜ Fail | |
| Thông báo lỗi | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot validation email không hợp lệ
- [ ] Screenshot validation các trường khác
- [ ] Screenshot thông báo lỗi
- [ ] Screenshot log console (nếu có lỗi)

</details>

---


## TC-BHV-041: Thêm địa chỉ mới

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-041 |
| **Description Test case** | Kiểm tra chức năng thêm địa chỉ giao hàng mới. Đảm bảo có thể thêm địa chỉ với đầy đủ thông tin và lưu thành công. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ" hoặc vào trang `/shipping-address`<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Kiểm tra danh sách địa chỉ hiện tại**<br>   - Quan sát danh sách địa chỉ đã có (nếu có)<br>   - Kiểm tra nút "Thêm mới" hoặc "Thêm địa chỉ mới" hiển thị<br>4. **Click nút thêm địa chỉ mới**<br>   - Click vào nút "Thêm mới" hoặc "Thêm địa chỉ mới"<br>   - Xác nhận modal hoặc form thêm địa chỉ hiển thị<br>5. **Điền thông tin địa chỉ**<br>   - Nhập tên người nhận (ví dụ: "Nguyễn Văn A")<br>   - Nhập số điện thoại (ví dụ: "0901234567")<br>   - Chọn tỉnh/thành phố<br>   - Chọn quận/huyện<br>   - Chọn phường/xã<br>   - Nhập địa chỉ chi tiết (số nhà, tên đường)<br>6. **Lưu địa chỉ**<br>   - Click nút "Lưu" hoặc "Xác nhận"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ mới hiển thị trong danh sách<br>   - Kiểm tra modal/form đóng lại<br>8. **Kiểm tra với số lượng địa chỉ đã đạt giới hạn**<br>   - Nếu đã có 5 địa chỉ, click "Thêm mới"<br>   - Kiểm tra thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị (nếu có)<br>- [ ] Nút "Thêm mới" hiển thị rõ ràng<br>- [ ] Khi click "Thêm mới":<br>  - [ ] Modal hoặc form thêm địa chỉ hiển thị<br>  - [ ] Form có các trường:<br>    - [ ] Tên người nhận<br>    - [ ] Số điện thoại<br>    - [ ] Tỉnh/Thành phố (dropdown hoặc picker)<br>    - [ ] Quận/Huyện (dropdown, filter theo tỉnh đã chọn)<br>    - [ ] Phường/Xã (dropdown, filter theo quận đã chọn)<br>    - [ ] Địa chỉ chi tiết (textarea hoặc input)<br>- [ ] Khi điền đầy đủ thông tin và click "Lưu":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API lưu địa chỉ<br>  - [ ] Hiển thị thông báo "Đã thêm địa chỉ" hoặc tương tự<br>  - [ ] Địa chỉ mới hiển thị trong danh sách<br>  - [ ] Modal/form đóng lại<br>- [ ] Khi đã có 5 địa chỉ:<br>  - [ ] Click "Thêm mới" hiển thị thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ"<br>  - [ ] Modal/form không mở ra<br>- [ ] Địa chỉ mới có thể được chọn làm địa chỉ giao hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít hơn 5 địa chỉ (để test thêm mới)<br>- Người dùng có đủ 5 địa chỉ (để test giới hạn) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form thêm địa chỉ<br>- [ ] Screenshot địa chỉ mới trong danh sách<br>- [ ] Screenshot thông báo giới hạn (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng thêm địa chỉ giao hàng mới. Đảm bảo có thể thêm địa chỉ với đầy đủ thông tin và validate giới hạn số lượng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít hơn 5 địa chỉ (để test thêm mới)
- Người dùng có đủ 5 địa chỉ (để test giới hạn)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Kiểm tra danh sách địa chỉ hiện tại
4. Click nút thêm địa chỉ mới
5. Điền thông tin địa chỉ
6. Lưu địa chỉ
7. Kiểm tra kết quả
8. Kiểm tra với số lượng địa chỉ đã đạt giới hạn

### Kết quả mong đợi
- [ ] Form thêm địa chỉ hiển thị đầy đủ
- [ ] Có thể thêm địa chỉ mới thành công
- [ ] Validate giới hạn 5 địa chỉ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form thêm | ⬜ Pass / ⬜ Fail | |
| Điền thông tin | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |
| Giới hạn 5 địa chỉ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form thêm địa chỉ
- [ ] Screenshot địa chỉ mới trong danh sách
- [ ] Screenshot thông báo giới hạn (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-042: Sửa địa chỉ đã có

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-042 |
| **Description Test case** | Kiểm tra chức năng sửa địa chỉ đã có. Đảm bảo có thể chỉnh sửa thông tin địa chỉ và cập nhật thành công. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Tìm địa chỉ cần sửa**<br>   - Quan sát danh sách địa chỉ<br>   - Chọn một địa chỉ bất kỳ<br>   - Kiểm tra nút "Sửa" hoặc icon edit hiển thị<br>4. **Click nút sửa**<br>   - Click vào nút "Sửa" hoặc icon edit<br>   - Xác nhận modal hoặc form sửa địa chỉ hiển thị<br>   - Kiểm tra các trường đã được điền sẵn với giá trị hiện tại<br>5. **Chỉnh sửa thông tin**<br>   - Sửa tên người nhận (ví dụ: đổi từ "Nguyễn Văn A" thành "Nguyễn Văn B")<br>   - Sửa số điện thoại (nếu cần)<br>   - Sửa địa chỉ chi tiết (nếu cần)<br>   - Hoặc thay đổi tỉnh/quận/phường<br>6. **Lưu thay đổi**<br>   - Click nút "Lưu" hoặc "Cập nhật"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ đã được cập nhật trong danh sách<br>   - Kiểm tra modal/form đóng lại<br>   - Kiểm tra thông tin mới hiển thị đúng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị<br>- [ ] Mỗi địa chỉ có nút "Sửa" hoặc icon edit<br>- [ ] Khi click "Sửa":<br>  - [ ] Modal hoặc form sửa địa chỉ hiển thị<br>  - [ ] Các trường đã được điền sẵn với giá trị hiện tại:<br>    - [ ] Tên người nhận<br>    - [ ] Số điện thoại<br>    - [ ] Tỉnh/Thành phố<br>    - [ ] Quận/Huyện<br>    - [ ] Phường/Xã<br>    - [ ] Địa chỉ chi tiết<br>- [ ] Có thể chỉnh sửa tất cả các trường<br>- [ ] Khi click "Lưu" hoặc "Cập nhật":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật địa chỉ<br>  - [ ] Hiển thị thông báo "Đã cập nhật địa chỉ" hoặc tương tự<br>  - [ ] Địa chỉ được cập nhật trong danh sách<br>  - [ ] Modal/form đóng lại<br>- [ ] Thông tin mới hiển thị đúng trong danh sách<br>- [ ] Nếu địa chỉ đang là mặc định, vẫn giữ nguyên trạng thái mặc định sau khi sửa |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một địa chỉ đã lưu |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form sửa địa chỉ<br>- [ ] Screenshot địa chỉ sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng sửa địa chỉ đã có. Đảm bảo có thể chỉnh sửa thông tin và cập nhật thành công.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một địa chỉ đã lưu

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Tìm địa chỉ cần sửa
4. Click nút sửa
5. Chỉnh sửa thông tin
6. Lưu thay đổi
7. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Form sửa hiển thị với giá trị hiện tại
- [ ] Có thể chỉnh sửa và cập nhật thành công
- [ ] Thông tin được cập nhật đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form sửa | ⬜ Pass / ⬜ Fail | |
| Chỉnh sửa thông tin | ⬜ Pass / ⬜ Fail | |
| Cập nhật thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form sửa địa chỉ
- [ ] Screenshot địa chỉ sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-043: Xóa địa chỉ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-043 |
| **Description Test case** | Kiểm tra chức năng xóa địa chỉ. Đảm bảo có thể xóa địa chỉ và có xác nhận trước khi xóa. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Tìm địa chỉ cần xóa**<br>   - Quan sát danh sách địa chỉ<br>   - Chọn một địa chỉ không phải địa chỉ mặc định (nếu có nhiều địa chỉ)<br>   - Kiểm tra nút "Xóa" hoặc icon delete hiển thị<br>4. **Click nút xóa**<br>   - Click vào nút "Xóa" hoặc icon delete<br>   - Quan sát hành vi của ứng dụng<br>5. **Xác nhận xóa (nếu có modal xác nhận)**<br>   - Kiểm tra modal xác nhận hiển thị (nếu có)<br>   - Click "Xác nhận" hoặc "Xóa"<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ đã bị xóa khỏi danh sách<br>   - Kiểm tra danh sách cập nhật lại<br>7. **Kiểm tra xóa địa chỉ mặc định**<br>   - Chọn địa chỉ mặc định<br>   - Click "Xóa"<br>   - Kiểm tra có thể xóa được hay không (có thể cần chuyển mặc định trước) |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị<br>- [ ] Mỗi địa chỉ có nút "Xóa" hoặc icon delete<br>- [ ] Khi click "Xóa":<br>  - [ ] Hiển thị modal xác nhận (nếu có)<br>  - [ ] Hoặc xóa trực tiếp với thông báo xác nhận<br>- [ ] Khi xác nhận xóa:<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API xóa địa chỉ<br>  - [ ] Hiển thị thông báo "Đã xóa địa chỉ"<br>  - [ ] Địa chỉ bị xóa khỏi danh sách<br>  - [ ] Danh sách cập nhật lại<br>- [ ] Khi hủy xóa (nếu có modal):<br>  - [ ] Modal đóng lại<br>  - [ ] Địa chỉ không bị xóa<br>- [ ] Với địa chỉ mặc định:<br>  - [ ] Có thể xóa được (sau khi chuyển mặc định cho địa chỉ khác)<br>  - [ ] Hoặc không cho phép xóa và hiển thị thông báo<br>- [ ] Nếu chỉ còn 1 địa chỉ:<br>  - [ ] Có thể không cho phép xóa<br>  - [ ] Hoặc cho phép xóa và danh sách trống |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất 2 địa chỉ (để test xóa)<br>- Người dùng có địa chỉ mặc định |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút xóa<br>- [ ] Screenshot modal xác nhận (nếu có)<br>- [ ] Screenshot danh sách sau khi xóa<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xóa địa chỉ. Đảm bảo có thể xóa địa chỉ với xác nhận và xử lý các trường hợp đặc biệt.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất 2 địa chỉ (để test xóa)
- Người dùng có địa chỉ mặc định

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Tìm địa chỉ cần xóa
4. Click nút xóa
5. Xác nhận xóa (nếu có modal xác nhận)
6. Kiểm tra kết quả
7. Kiểm tra xóa địa chỉ mặc định

### Kết quả mong đợi
- [ ] Có thể xóa địa chỉ với xác nhận
- [ ] Xử lý đúng các trường hợp đặc biệt (địa chỉ mặc định, chỉ còn 1 địa chỉ)
- [ ] Danh sách cập nhật đúng sau khi xóa

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút xóa | ⬜ Pass / ⬜ Fail | |
| Xác nhận xóa | ⬜ Pass / ⬜ Fail | |
| Xóa thành công | ⬜ Pass / ⬜ Fail | |
| Xử lý địa chỉ mặc định | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot nút xóa
- [ ] Screenshot modal xác nhận (nếu có)
- [ ] Screenshot danh sách sau khi xóa
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-044: Đặt địa chỉ mặc định

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-044 |
| **Description Test case** | Kiểm tra chức năng đặt địa chỉ mặc định. Đảm bảo có thể chọn một địa chỉ làm mặc định và chỉ có một địa chỉ mặc định tại một thời điểm. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Kiểm tra địa chỉ mặc định hiện tại**<br>   - Quan sát danh sách địa chỉ<br>   - Tìm địa chỉ có badge "Mặc định"<br>   - Ghi nhận địa chỉ mặc định hiện tại<br>4. **Chọn địa chỉ khác làm mặc định**<br>   - Chọn một địa chỉ không phải mặc định<br>   - Tìm nút hoặc option "Đặt làm mặc định"<br>   - Click vào nút/option đó<br>5. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ mới có badge "Mặc định"<br>   - Kiểm tra địa chỉ cũ không còn badge "Mặc định"<br>   - Kiểm tra chỉ có 1 địa chỉ có badge "Mặc định"<br>6. **Kiểm tra địa chỉ mặc định được sử dụng**<br>   - Vào trang checkout hoặc giỏ hàng<br>   - Kiểm tra địa chỉ mặc định được chọn tự động |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị<br>- [ ] Có một địa chỉ có badge "Mặc định" (nếu có địa chỉ)<br>- [ ] Các địa chỉ khác có nút hoặc option "Đặt làm mặc định"<br>- [ ] Khi click "Đặt làm mặc định":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API đặt địa chỉ mặc định<br>  - [ ] Hiển thị thông báo "Đã đặt làm địa chỉ mặc định"<br>  - [ ] Địa chỉ mới có badge "Mặc định"<br>  - [ ] Địa chỉ cũ không còn badge "Mặc định"<br>  - [ ] Chỉ có 1 địa chỉ có badge "Mặc định"<br>- [ ] Địa chỉ mặc định được sử dụng tự động khi:<br>  - [ ] Vào trang checkout<br>  - [ ] Chọn địa chỉ giao hàng<br>- [ ] Nếu không có địa chỉ mặc định:<br>  - [ ] Có thể chọn địa chỉ đầu tiên làm mặc định<br>  - [ ] Hoặc yêu cầu đặt mặc định trước |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất 2 địa chỉ |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot địa chỉ mặc định hiện tại<br>- [ ] Screenshot sau khi đặt mặc định mới<br>- [ ] Screenshot địa chỉ mặc định trong checkout<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng đặt địa chỉ mặc định. Đảm bảo chỉ có một địa chỉ mặc định và được sử dụng tự động.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất 2 địa chỉ

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Kiểm tra địa chỉ mặc định hiện tại
4. Chọn địa chỉ khác làm mặc định
5. Kiểm tra kết quả
6. Kiểm tra địa chỉ mặc định được sử dụng

### Kết quả mong đợi
- [ ] Có thể đặt địa chỉ mặc định
- [ ] Chỉ có 1 địa chỉ mặc định tại một thời điểm
- [ ] Địa chỉ mặc định được sử dụng tự động

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị badge mặc định | ⬜ Pass / ⬜ Fail | |
| Đặt mặc định mới | ⬜ Pass / ⬜ Fail | |
| Chỉ 1 địa chỉ mặc định | ⬜ Pass / ⬜ Fail | |
| Sử dụng tự động | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot địa chỉ mặc định hiện tại
- [ ] Screenshot sau khi đặt mặc định mới
- [ ] Screenshot địa chỉ mặc định trong checkout
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-045: Giới hạn số lượng địa chỉ (tối đa 5)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-045 |
| **Description Test case** | Kiểm tra giới hạn số lượng địa chỉ tối đa là 5. Đảm bảo không thể thêm địa chỉ khi đã đạt giới hạn. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Kiểm tra số lượng địa chỉ hiện tại**<br>   - Đếm số lượng địa chỉ trong danh sách<br>   - Ghi nhận số lượng<br>4. **Thêm địa chỉ cho đến khi đạt 5 địa chỉ**<br>   - Nếu chưa đủ 5 địa chỉ, thêm địa chỉ mới cho đến khi có đủ 5 địa chỉ<br>   - Xác nhận có đúng 5 địa chỉ<br>5. **Thử thêm địa chỉ thứ 6**<br>   - Click vào nút "Thêm mới" hoặc "Thêm địa chỉ mới"<br>   - Quan sát hành vi của ứng dụng<br>6. **Kiểm tra thông báo giới hạn**<br>   - Kiểm tra thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ" hiển thị<br>   - Kiểm tra modal/form không mở ra<br>7. **Kiểm tra sau khi xóa một địa chỉ**<br>   - Xóa một địa chỉ bất kỳ<br>   - Kiểm tra còn 4 địa chỉ<br>   - Thử thêm địa chỉ mới<br>   - Kiểm tra có thể thêm được |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Có thể thêm địa chỉ khi chưa đạt giới hạn<br>- [ ] Khi đã có 5 địa chỉ:<br>  - [ ] Click "Thêm mới" hiển thị thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ"<br>  - [ ] Modal/form thêm địa chỉ không mở ra<br>  - [ ] Nút "Thêm mới" có thể bị disable hoặc vẫn hiển thị nhưng có validation<br>- [ ] Thông báo giới hạn hiển thị rõ ràng, dễ hiểu<br>- [ ] Sau khi xóa một địa chỉ:<br>  - [ ] Có thể thêm địa chỉ mới<br>  - [ ] Không còn thông báo giới hạn<br>- [ ] Giới hạn được kiểm tra cả ở client-side và server-side |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít hơn 5 địa chỉ (để test thêm đến 5)<br>- Hoặc người dùng đã có 5 địa chỉ (để test giới hạn) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách 5 địa chỉ<br>- [ ] Screenshot thông báo giới hạn<br>- [ ] Screenshot sau khi xóa và thêm lại<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra giới hạn số lượng địa chỉ tối đa là 5. Đảm bảo không thể thêm địa chỉ khi đã đạt giới hạn và có thể thêm lại sau khi xóa.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít hơn 5 địa chỉ (để test thêm đến 5)
- Hoặc người dùng đã có 5 địa chỉ (để test giới hạn)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Kiểm tra số lượng địa chỉ hiện tại
4. Thêm địa chỉ cho đến khi đạt 5 địa chỉ
5. Thử thêm địa chỉ thứ 6
6. Kiểm tra thông báo giới hạn
7. Kiểm tra sau khi xóa một địa chỉ

### Kết quả mong đợi
- [ ] Giới hạn 5 địa chỉ được enforce đúng
- [ ] Thông báo giới hạn hiển thị rõ ràng
- [ ] Có thể thêm lại sau khi xóa

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Thêm đến 5 địa chỉ | ⬜ Pass / ⬜ Fail | |
| Thông báo giới hạn | ⬜ Pass / ⬜ Fail | |
| Không thể thêm địa chỉ thứ 6 | ⬜ Pass / ⬜ Fail | |
| Thêm lại sau khi xóa | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot danh sách 5 địa chỉ
- [ ] Screenshot thông báo giới hạn
- [ ] Screenshot sau khi xóa và thêm lại
- [ ] Screenshot log console (nếu có lỗi)

</details>

---


## TC-BHV-046: Xem danh sách thông báo

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-046 |
| **Description Test case** | Kiểm tra chức năng xem danh sách thông báo. Đảm bảo có thể mở modal thông báo và xem tất cả thông báo. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Mở modal thông báo**<br>   - Quan sát icon chuông ở header<br>   - Kiểm tra badge số lượng thông báo chưa đọc (nếu có)<br>   - Click vào icon chuông<br>   - Xác nhận modal thông báo mở ra<br>3. **Kiểm tra cấu trúc modal**<br>   - Quan sát header modal:<br>     - Tiêu đề "Thông báo"<br>     - Nút đóng (back arrow)<br>   - Quan sát các tab:<br>     - Tab "Tất cả"<br>     - Tab "Đơn hàng"<br>     - Tab "Voucher"<br>   - Quan sát danh sách thông báo<br>4. **Kiểm tra danh sách thông báo**<br>   - Quan sát mỗi thông báo hiển thị:<br>     - Tiêu đề thông báo<br>     - Nội dung thông báo<br>     - Hình ảnh (nếu có)<br>     - Thời gian (ví dụ: "5 phút trước", "2 giờ trước")<br>     - Badge "chưa đọc" (nếu có)<br>5. **Kiểm tra empty state**<br>   - Nếu không có thông báo, kiểm tra hiển thị "Không có thông báo nào"<br>6. **Đóng modal**<br>   - Click vào nút đóng hoặc click outside modal<br>   - Kiểm tra modal đóng lại |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Icon chuông hiển thị ở header<br>- [ ] Badge số lượng thông báo chưa đọc hiển thị (nếu có thông báo chưa đọc)<br>- [ ] Khi click icon chuông:<br>  - [ ] Modal thông báo mở ra từ dưới lên (slide up animation)<br>  - [ ] Modal có overlay backdrop<br>- [ ] Modal hiển thị đầy đủ:<br>  - [ ] Header với tiêu đề "Thông báo"<br>  - [ ] Nút đóng (back arrow) ở góc trái<br>  - [ ] Các tab: "Tất cả", "Đơn hàng", "Voucher"<br>  - [ ] Tab "Tất cả" được chọn mặc định<br>- [ ] Danh sách thông báo hiển thị:<br>  - [ ] Mỗi thông báo có:<br>    - [ ] Tiêu đề (title) nổi bật<br>    - [ ] Nội dung (content) đầy đủ hoặc truncated<br>    - [ ] Hình ảnh sản phẩm hoặc voucher (nếu có)<br>    - [ ] Thời gian (format: "Vừa xong", "X phút trước", "X giờ trước", "X ngày trước", hoặc ngày tháng)<br>    - [ ] Badge "chưa đọc" (điểm đỏ hoặc indicator) nếu is_read = 0<br>- [ ] Thông báo chưa đọc có border màu đỏ hoặc highlight<br>- [ ] Nếu không có thông báo:<br>  - [ ] Hiển thị empty state "Không có thông báo nào"<br>- [ ] Khi click đóng:<br>  - [ ] Modal đóng lại với animation slide down<br>  - [ ] Overlay biến mất |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có ít nhất một thông báo trong hệ thống (để test hiển thị)<br>- Có thông báo chưa đọc (để test badge) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot icon chuông với badge<br>- [ ] Screenshot modal thông báo<br>- [ ] Screenshot danh sách thông báo<br>- [ ] Screenshot empty state (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem danh sách thông báo. Đảm bảo có thể mở modal và xem tất cả thông báo với đầy đủ thông tin.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có ít nhất một thông báo trong hệ thống (để test hiển thị)
- Có thông báo chưa đọc (để test badge)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Mở modal thông báo
3. Kiểm tra cấu trúc modal
4. Kiểm tra danh sách thông báo
5. Kiểm tra empty state
6. Đóng modal

### Kết quả mong đợi
- [ ] Modal mở và đóng mượt mà
- [ ] Danh sách thông báo hiển thị đầy đủ thông tin
- [ ] Badge số lượng chưa đọc hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Mở modal | ⬜ Pass / ⬜ Fail | |
| Hiển thị danh sách | ⬜ Pass / ⬜ Fail | |
| Badge số lượng | ⬜ Pass / ⬜ Fail | |
| Empty state | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot icon chuông với badge
- [ ] Screenshot modal thông báo
- [ ] Screenshot danh sách thông báo
- [ ] Screenshot empty state (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-047: Filter thông báo theo tab (Tất cả, Đơn hàng, Voucher)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-047 |
| **Description Test case** | Kiểm tra chức năng filter thông báo theo các tab khác nhau. Đảm bảo có thể xem thông báo theo từng loại (Tất cả, Đơn hàng, Voucher). |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Mở modal thông báo**<br>   - Click vào icon chuông ở header<br>   - Xác nhận modal thông báo mở ra<br>3. **Kiểm tra tab "Tất cả"**<br>   - Quan sát tab "Tất cả" được chọn mặc định<br>   - Kiểm tra danh sách hiển thị tất cả thông báo<br>   - Kiểm tra badge số lượng thông báo chưa đọc (nếu có)<br>4. **Chuyển sang tab "Đơn hàng"**<br>   - Click vào tab "Đơn hàng"<br>   - Quan sát tab được highlight<br>   - Kiểm tra danh sách chỉ hiển thị thông báo về đơn hàng<br>   - Kiểm tra badge số lượng thông báo đơn hàng (nếu có)<br>5. **Chuyển sang tab "Voucher"**<br>   - Click vào tab "Voucher"<br>   - Quan sát tab được highlight<br>   - Kiểm tra danh sách chỉ hiển thị thông báo về voucher<br>6. **Quay lại tab "Tất cả"**<br>   - Click vào tab "Tất cả"<br>   - Kiểm tra danh sách hiển thị lại tất cả thông báo<br>7. **Kiểm tra với tab không có thông báo**<br>   - Chọn tab không có thông báo (ví dụ: tab "Voucher" nếu không có thông báo voucher)<br>   - Kiểm tra hiển thị empty state "Không có thông báo nào" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Mở modal thông báo thành công<br>- [ ] Tab "Tất cả" được chọn mặc định:<br>  - [ ] Tab được highlight (màu xanh, border bottom)<br>  - [ ] Hiển thị tất cả thông báo<br>  - [ ] Badge số lượng thông báo chưa đọc hiển thị (nếu có)<br>- [ ] Khi click tab "Đơn hàng":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị thông báo có type = "order" hoặc title chứa "đơn hàng"<br>  - [ ] Badge số lượng thông báo đơn hàng hiển thị (nếu có)<br>- [ ] Khi click tab "Voucher":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị thông báo có type = "voucher" hoặc title chứa "voucher"<br>- [ ] Khi quay lại tab "Tất cả":<br>  - [ ] Hiển thị lại tất cả thông báo<br>- [ ] Với tab không có thông báo:<br>  - [ ] Hiển thị empty state "Không có thông báo nào"<br>- [ ] Chuyển đổi giữa các tab mượt mà, không bị lag<br>- [ ] Danh sách được filter đúng theo từng tab |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có thông báo về đơn hàng trong hệ thống<br>- Có thông báo về voucher trong hệ thống<br>- Có thông báo loại khác (để test tab "Tất cả") |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot tab "Tất cả"<br>- [ ] Screenshot tab "Đơn hàng"<br>- [ ] Screenshot tab "Voucher"<br>- [ ] Screenshot empty state (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng filter thông báo theo các tab. Đảm bảo có thể xem thông báo theo từng loại một cách dễ dàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có thông báo về đơn hàng trong hệ thống
- Có thông báo về voucher trong hệ thống
- Có thông báo loại khác (để test tab "Tất cả")

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Mở modal thông báo
3. Kiểm tra tab "Tất cả"
4. Chuyển sang tab "Đơn hàng"
5. Chuyển sang tab "Voucher"
6. Quay lại tab "Tất cả"
7. Kiểm tra với tab không có thông báo

### Kết quả mong đợi
- [ ] Filter hoạt động đúng cho từng tab
- [ ] Chuyển đổi tab mượt mà
- [ ] Badge số lượng hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Tab "Tất cả" | ⬜ Pass / ⬜ Fail | |
| Tab "Đơn hàng" | ⬜ Pass / ⬜ Fail | |
| Tab "Voucher" | ⬜ Pass / ⬜ Fail | |
| Filter đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot tab "Tất cả"
- [ ] Screenshot tab "Đơn hàng"
- [ ] Screenshot tab "Voucher"
- [ ] Screenshot empty state (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-048: Xem chi tiết thông báo đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-048 |
| **Description Test case** | Kiểm tra chức năng xem chi tiết thông báo đơn hàng. Đảm bảo có thể click vào thông báo đơn hàng để xem chi tiết đơn hàng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Mở modal thông báo**<br>   - Click vào icon chuông ở header<br>   - Xác nhận modal thông báo mở ra<br>3. **Tìm thông báo đơn hàng**<br>   - Vào tab "Đơn hàng" hoặc "Tất cả"<br>   - Tìm một thông báo về đơn hàng<br>   - Quan sát thông báo hiển thị:<br>     - Tiêu đề (ví dụ: "Đơn hàng #12345 đã được xác nhận")<br>     - Nội dung<br>     - Hình ảnh sản phẩm (nếu có)<br>     - Icon đơn hàng<br>4. **Click vào thông báo đơn hàng**<br>   - Click vào thông báo đơn hàng<br>   - Quan sát hành vi của ứng dụng<br>5. **Kiểm tra điều hướng**<br>   - Kiểm tra modal thông báo đóng lại<br>   - Kiểm tra điều hướng đến trang chi tiết đơn hàng<br>   - Kiểm tra URL = `/order/:id` với id là ID đơn hàng<br>6. **Kiểm tra trang chi tiết đơn hàng**<br>   - Xác nhận trang chi tiết đơn hàng hiển thị<br>   - Kiểm tra thông tin đơn hàng đúng với thông báo |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Mở modal thông báo thành công<br>- [ ] Thông báo đơn hàng hiển thị:<br>  - [ ] Tiêu đề về đơn hàng<br>  - [ ] Nội dung mô tả đơn hàng<br>  - [ ] Hình ảnh sản phẩm (nếu có)<br>  - [ ] Icon đơn hàng (shopping bag icon)<br>  - [ ] Mã đơn hàng hoặc thông tin đơn hàng<br>- [ ] Khi click vào thông báo đơn hàng:<br>  - [ ] Modal thông báo đóng lại<br>  - [ ] Điều hướng đến trang chi tiết đơn hàng<br>  - [ ] URL = `/order/:id` với id đúng<br>- [ ] Trang chi tiết đơn hàng hiển thị:<br>  - [ ] Thông tin đơn hàng đúng với thông báo<br>  - [ ] Mã đơn hàng khớp<br>  - [ ] Trạng thái đơn hàng đúng<br>- [ ] Thông báo được đánh dấu là đã đọc (nếu có logic tự động) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có ít nhất một thông báo về đơn hàng trong hệ thống<br>- Đơn hàng trong thông báo vẫn tồn tại |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot thông báo đơn hàng<br>- [ ] Screenshot trang chi tiết đơn hàng<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem chi tiết thông báo đơn hàng. Đảm bảo có thể click vào thông báo để xem chi tiết đơn hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có ít nhất một thông báo về đơn hàng trong hệ thống
- Đơn hàng trong thông báo vẫn tồn tại

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Mở modal thông báo
3. Tìm thông báo đơn hàng
4. Click vào thông báo đơn hàng
5. Kiểm tra điều hướng
6. Kiểm tra trang chi tiết đơn hàng

### Kết quả mong đợi
- [ ] Click thông báo điều hướng đúng đến đơn hàng
- [ ] Modal đóng lại khi điều hướng
- [ ] Thông tin đơn hàng hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị thông báo đơn hàng | ⬜ Pass / ⬜ Fail | |
| Click điều hướng | ⬜ Pass / ⬜ Fail | |
| Trang chi tiết đơn hàng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot thông báo đơn hàng
- [ ] Screenshot trang chi tiết đơn hàng
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-049: Đánh dấu đã đọc thông báo

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-049 |
| **Description Test case** | Kiểm tra chức năng đánh dấu thông báo là đã đọc. Đảm bảo khi xem thông báo, trạng thái "chưa đọc" được cập nhật thành "đã đọc". |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Kiểm tra badge số lượng chưa đọc**<br>   - Quan sát icon chuông ở header<br>   - Ghi nhận số lượng thông báo chưa đọc (nếu có badge)<br>3. **Mở modal thông báo**<br>   - Click vào icon chuông<br>   - Xác nhận modal mở ra<br>4. **Tìm thông báo chưa đọc**<br>   - Quan sát danh sách thông báo<br>   - Tìm thông báo có badge "chưa đọc" (điểm đỏ hoặc indicator)<br>   - Ghi nhận số lượng thông báo chưa đọc<br>5. **Xem thông báo chưa đọc**<br>   - Click vào một thông báo chưa đọc<br>   - Hoặc scroll qua thông báo chưa đọc<br>   - Quan sát hành vi của ứng dụng<br>6. **Kiểm tra cập nhật trạng thái**<br>   - Đóng modal và mở lại<br>   - Kiểm tra thông báo đã xem không còn badge "chưa đọc"<br>   - Kiểm tra badge số lượng chưa đọc ở icon chuông giảm đi<br>7. **Kiểm tra với nhiều thông báo**<br>   - Xem nhiều thông báo chưa đọc<br>   - Kiểm tra tất cả đều được đánh dấu đã đọc<br>   - Kiểm tra badge số lượng cập nhật đúng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Badge số lượng thông báo chưa đọc hiển thị ở icon chuông (nếu có thông báo chưa đọc)<br>- [ ] Thông báo chưa đọc có indicator:<br>  - [ ] Điểm đỏ (red dot)<br>  - [ ] Hoặc border màu đỏ<br>  - [ ] Hoặc background khác màu<br>- [ ] Khi xem thông báo chưa đọc:<br>  - [ ] Tự động đánh dấu là đã đọc (nếu có logic tự động)<br>  - [ ] Hoặc cần click để đánh dấu đã đọc<br>  - [ ] Indicator "chưa đọc" biến mất<br>  - [ ] Badge số lượng chưa đọc giảm đi<br>- [ ] Khi đóng và mở lại modal:<br>  - [ ] Thông báo đã xem không còn indicator "chưa đọc"<br>  - [ ] Badge số lượng chưa đọc cập nhật đúng<br>- [ ] Khi xem nhiều thông báo:<br>  - [ ] Tất cả đều được đánh dấu đã đọc<br>  - [ ] Badge số lượng = 0 khi không còn thông báo chưa đọc<br>- [ ] Thông báo đã đọc vẫn hiển thị trong danh sách nhưng không có indicator |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có ít nhất 2-3 thông báo chưa đọc trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot badge số lượng chưa đọc<br>- [ ] Screenshot thông báo chưa đọc<br>- [ ] Screenshot thông báo sau khi đánh dấu đã đọc<br>- [ ] Screenshot badge sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng đánh dấu thông báo là đã đọc. Đảm bảo trạng thái được cập nhật đúng và badge số lượng được cập nhật.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có ít nhất 2-3 thông báo chưa đọc trong hệ thống

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Kiểm tra badge số lượng chưa đọc
3. Mở modal thông báo
4. Tìm thông báo chưa đọc
5. Xem thông báo chưa đọc
6. Kiểm tra cập nhật trạng thái
7. Kiểm tra với nhiều thông báo

### Kết quả mong đợi
- [ ] Thông báo được đánh dấu đã đọc khi xem
- [ ] Badge số lượng cập nhật đúng
- [ ] Indicator "chưa đọc" biến mất

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Badge số lượng ban đầu | ⬜ Pass / ⬜ Fail | |
| Đánh dấu đã đọc | ⬜ Pass / ⬜ Fail | |
| Cập nhật badge | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot badge số lượng chưa đọc
- [ ] Screenshot thông báo chưa đọc
- [ ] Screenshot thông báo sau khi đánh dấu đã đọc
- [ ] Screenshot badge sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-050: Hiển thị số lượng thông báo chưa đọc

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-050 |
| **Description Test case** | Kiểm tra hiển thị số lượng thông báo chưa đọc trên icon chuông ở header. Đảm bảo badge hiển thị đúng số lượng và cập nhật real-time. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Kiểm tra badge khi có thông báo chưa đọc**<br>   - Quan sát icon chuông ở header<br>   - Kiểm tra badge số lượng hiển thị (nếu có thông báo chưa đọc)<br>   - Ghi nhận số lượng<br>3. **Mở modal và đếm thông báo chưa đọc**<br>   - Click vào icon chuông<br>   - Đếm số lượng thông báo có indicator "chưa đọc"<br>   - So sánh với số lượng trên badge<br>4. **Kiểm tra badge khi không có thông báo chưa đọc**<br>   - Đánh dấu tất cả thông báo là đã đọc<br>   - Đóng modal<br>   - Kiểm tra badge không còn hiển thị<br>5. **Kiểm tra cập nhật real-time**<br>   - Mở modal thông báo<br>   - Xem một thông báo chưa đọc<br>   - Đóng modal<br>   - Kiểm tra badge số lượng giảm đi ngay lập tức<br>6. **Kiểm tra với số lượng lớn**<br>   - Nếu có > 99 thông báo chưa đọc<br>   - Kiểm tra badge hiển thị "99+" hoặc tương tự |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Khi có thông báo chưa đọc:<br>  - [ ] Badge số lượng hiển thị trên icon chuông<br>  - [ ] Badge có màu nổi bật (thường là đỏ)<br>  - [ ] Số lượng trên badge = số lượng thông báo có is_read = 0<br>  - [ ] Badge hiển thị số (ví dụ: "3", "10")<br>- [ ] Khi không có thông báo chưa đọc:<br>  - [ ] Badge không hiển thị<br>  - [ ] Icon chuông không có badge<br>- [ ] Badge cập nhật real-time:<br>  - [ ] Khi xem thông báo, badge giảm đi ngay lập tức<br>  - [ ] Khi có thông báo mới, badge tăng lên (nếu có logic real-time)<br>- [ ] Với số lượng > 99:<br>  - [ ] Badge hiển thị "99+" hoặc tương tự<br>  - [ ] Hoặc hiển thị số thực tế nếu không có giới hạn<br>- [ ] Badge hiển thị rõ ràng, dễ nhìn<br>- [ ] Badge không che khuất icon chuông |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có thông báo chưa đọc trong hệ thống (để test hiển thị badge)<br>- Có thể tạo thông báo mới (để test cập nhật real-time) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot badge số lượng<br>- [ ] Screenshot khi không có badge<br>- [ ] Screenshot badge sau khi cập nhật<br>- [ ] Screenshot badge với số lượng lớn (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị số lượng thông báo chưa đọc trên icon chuông. Đảm bảo badge hiển thị đúng và cập nhật real-time.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có thông báo chưa đọc trong hệ thống (để test hiển thị badge)
- Có thể tạo thông báo mới (để test cập nhật real-time)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Kiểm tra badge khi có thông báo chưa đọc
3. Mở modal và đếm thông báo chưa đọc
4. Kiểm tra badge khi không có thông báo chưa đọc
5. Kiểm tra cập nhật real-time
6. Kiểm tra với số lượng lớn

### Kết quả mong đợi
- [ ] Badge hiển thị đúng số lượng
- [ ] Badge ẩn khi không có thông báo chưa đọc
- [ ] Badge cập nhật real-time

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị badge | ⬜ Pass / ⬜ Fail | |
| Số lượng đúng | ⬜ Pass / ⬜ Fail | |
| Ẩn khi không có | ⬜ Pass / ⬜ Fail | |
| Cập nhật real-time | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot badge số lượng
- [ ] Screenshot khi không có badge
- [ ] Screenshot badge sau khi cập nhật
- [ ] Screenshot badge với số lượng lớn (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---


## TC-BHV-051: Nhận lượt chơi miễn phí

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-051 |
| **Description Test case** | Kiểm tra chức năng nhận lượt chơi miễn phí trong mini game. Đảm bảo có thể nhận lượt chơi và có giới hạn thời gian (24 giờ). |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Tìm và click vào link/banner mini game "Vòng quay may mắn"<br>   - Hoặc điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Kiểm tra section hướng dẫn**<br>   - Scroll đến section "HƯỚNG DẪN"<br>   - Quan sát "Bước 1: Nhận lượt chơi miễn phí"<br>   - Kiểm tra nút "Nhận" hiển thị<br>4. **Kiểm tra trạng thái nút nhận**<br>   - Quan sát nút "Nhận"<br>   - Kiểm tra nút có enabled hay disabled<br>   - Kiểm tra text hiển thị ("Nhận", "Đã nhận", "Đã hết lượt")<br>5. **Click nút nhận lượt chơi**<br>   - Click vào nút "Nhận"<br>   - Quan sát loading/processing<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra nút chuyển thành "Đã nhận" hoặc disabled<br>   - Kiểm tra số lượt chơi còn lại tăng lên<br>7. **Kiểm tra giới hạn 24 giờ**<br>   - Nhận lượt chơi thành công<br>   - Đợi một chút (hoặc test với thời gian đã qua 24 giờ)<br>   - Click lại nút "Nhận"<br>   - Kiểm tra có thể nhận lại sau 24 giờ hay không |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Section "HƯỚNG DẪN" hiển thị:<br>  - [ ] "Bước 1: Nhận lượt chơi miễn phí"<br>  - [ ] Nút "Nhận" hiển thị<br>- [ ] Trạng thái nút "Nhận":<br>  - [ ] Nếu chưa nhận hôm nay: nút enabled, text "Nhận"<br>  - [ ] Nếu đã nhận hôm nay: nút disabled, text "Đã nhận" hoặc "Đã hết lượt"<br>- [ ] Khi click "Nhận" (nếu enabled):<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API nhận lượt chơi<br>  - [ ] Hiển thị thông báo "Nhận lượt chơi thành công!" hoặc tương tự<br>  - [ ] Nút chuyển thành "Đã nhận" hoặc disabled<br>  - [ ] Số lượt chơi còn lại tăng lên (nếu hiển thị)<br>- [ ] Giới hạn 24 giờ:<br>  - [ ] Sau khi nhận, không thể nhận lại trong 24 giờ<br>  - [ ] Sau 24 giờ, có thể nhận lại<br>  - [ ] Thông báo rõ ràng khi chưa đủ 24 giờ<br>- [ ] Nếu hết lượt chơi:<br>  - [ ] Hiển thị thông báo "Bạn đã dùng hết lượt quay!" hoặc tương tự<br>  - [ ] Nút disabled |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động (chưa hết hạn)<br>- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section hướng dẫn<br>- [ ] Screenshot nút nhận lượt chơi<br>- [ ] Screenshot sau khi nhận thành công<br>- [ ] Screenshot thông báo giới hạn (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng nhận lượt chơi miễn phí. Đảm bảo có thể nhận lượt chơi và có giới hạn thời gian 24 giờ.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động (chưa hết hạn)
- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Kiểm tra section hướng dẫn
4. Kiểm tra trạng thái nút nhận
5. Click nút nhận lượt chơi
6. Kiểm tra kết quả
7. Kiểm tra giới hạn 24 giờ

### Kết quả mong đợi
- [ ] Có thể nhận lượt chơi thành công
- [ ] Giới hạn 24 giờ được enforce đúng
- [ ] Thông báo rõ ràng về trạng thái

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút nhận | ⬜ Pass / ⬜ Fail | |
| Nhận lượt chơi thành công | ⬜ Pass / ⬜ Fail | |
| Giới hạn 24 giờ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section hướng dẫn
- [ ] Screenshot nút nhận lượt chơi
- [ ] Screenshot sau khi nhận thành công
- [ ] Screenshot thông báo giới hạn (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-052: Quay vòng quay may mắn

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-052 |
| **Description Test case** | Kiểm tra chức năng quay vòng quay may mắn. Đảm bảo có thể quay vòng quay, animation mượt mà và kết quả được xử lý đúng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Kiểm tra vòng quay**<br>   - Quan sát vòng quay hiển thị<br>   - Kiểm tra các phần thưởng trên vòng quay (voucher, "Suýt trúng")<br>   - Kiểm tra nút "QUAY" ở giữa vòng quay<br>   - Kiểm tra số lượt chơi còn lại hiển thị<br>4. **Kiểm tra điều kiện quay**<br>   - Kiểm tra nút "QUAY" enabled hay disabled<br>   - Kiểm tra có lượt chơi chưa sử dụng hay không<br>5. **Click nút quay**<br>   - Click vào nút "QUAY"<br>   - Quan sát animation quay<br>6. **Kiểm tra animation quay**<br>   - Quan sát vòng quay quay với animation mượt mà<br>   - Kiểm tra thời gian quay (khoảng 4 giây)<br>   - Kiểm tra vòng quay dừng ở một phần thưởng<br>7. **Kiểm tra kết quả**<br>   - Quan sát modal kết quả hiển thị<br>   - Kiểm tra phần thưởng trúng được hiển thị<br>   - Kiểm tra số lượt chơi còn lại giảm đi 1<br>8. **Kiểm tra với không có lượt chơi**<br>   - Sử dụng hết lượt chơi<br>   - Click nút "QUAY"<br>   - Kiểm tra thông báo "Bạn đã dùng hết lượt quay!" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Vòng quay hiển thị:<br>  - [ ] Vòng quay với các phần thưởng (voucher, "Suýt trúng")<br>  - [ ] Mỗi phần thưởng có màu sắc khác nhau (xanh lá, vàng)<br>  - [ ] Hiển thị giá trị voucher (ví dụ: "Giảm 10.000đ", "Giảm 20%")<br>  - [ ] Nút "QUAY" ở giữa vòng quay<br>  - [ ] Pointer/chỉ báo ở trên cùng<br>- [ ] Nút "QUAY":<br>  - [ ] Enabled khi có lượt chơi chưa sử dụng<br>  - [ ] Disabled khi không có lượt chơi hoặc đang quay<br>  - [ ] Text "QUAY" rõ ràng<br>- [ ] Khi click "QUAY":<br>  - [ ] Nút disabled ngay lập tức<br>  - [ ] Vòng quay bắt đầu quay với animation mượt mà<br>  - [ ] Animation quay khoảng 4 giây<br>  - [ ] Vòng quay dừng ở một phần thưởng<br>- [ ] Sau khi quay xong:<br>  - [ ] Modal kết quả hiển thị<br>  - [ ] Phần thưởng trúng được hiển thị rõ ràng<br>  - [ ] Số lượt chơi còn lại giảm đi 1<br>  - [ ] Nếu trúng voucher: hiển thị thông tin voucher<br>  - [ ] Nếu "Suýt trúng": hiển thị thông báo "Suýt trúng!"<br>- [ ] Khi không có lượt chơi:<br>  - [ ] Nút "QUAY" disabled<br>  - [ ] Click hiển thị thông báo "Bạn đã dùng hết lượt quay!" |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Người dùng có ít nhất 1 lượt chơi chưa sử dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot vòng quay<br>- [ ] Screenshot animation quay<br>- [ ] Screenshot modal kết quả<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng quay vòng quay may mắn. Đảm bảo animation mượt mà và kết quả được xử lý đúng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Người dùng có ít nhất 1 lượt chơi chưa sử dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Kiểm tra vòng quay
4. Kiểm tra điều kiện quay
5. Click nút quay
6. Kiểm tra animation quay
7. Kiểm tra kết quả
8. Kiểm tra với không có lượt chơi

### Kết quả mong đợi
- [ ] Animation quay mượt mà
- [ ] Kết quả được xử lý và hiển thị đúng
- [ ] Số lượt chơi cập nhật đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị vòng quay | ⬜ Pass / ⬜ Fail | |
| Animation quay | ⬜ Pass / ⬜ Fail | |
| Hiển thị kết quả | ⬜ Pass / ⬜ Fail | |
| Cập nhật lượt chơi | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot vòng quay
- [ ] Screenshot animation quay
- [ ] Screenshot modal kết quả
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-053: Xem kết quả quay và voucher trúng thưởng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-053 |
| **Description Test case** | Kiểm tra hiển thị kết quả quay và thông tin voucher trúng thưởng. Đảm bảo modal kết quả hiển thị đầy đủ thông tin và có thể sử dụng voucher. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game và quay**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Nhận lượt chơi (nếu cần)<br>   - Click nút "QUAY"<br>   - Đợi vòng quay dừng lại<br>3. **Kiểm tra modal kết quả**<br>   - Quan sát modal kết quả hiển thị<br>   - Kiểm tra modal hiển thị:<br>     - Icon/emoji (🎉 nếu trúng, 😢 nếu suýt trúng)<br>     - Tiêu đề (ví dụ: "Bạn đã trúng voucher!" hoặc "Suýt trúng!")<br>     - Tên phần thưởng hoặc voucher<br>     - Nút "Đóng"<br>4. **Kiểm tra với voucher trúng thưởng**<br>   - Nếu trúng voucher, kiểm tra hiển thị:<br>     - Tên voucher hoặc mã voucher<br>     - Giá trị giảm (ví dụ: "Giảm 10.000đ" hoặc "Giảm 20%")<br>     - Thông tin sử dụng voucher<br>5. **Kiểm tra với "Suýt trúng"**<br>   - Nếu trúng "Suýt trúng", kiểm tra hiển thị:<br>     - Icon 😢<br>     - Tiêu đề "Suýt trúng!"<br>     - Thông báo động viên<br>6. **Đóng modal và kiểm tra voucher**<br>   - Click nút "Đóng"<br>   - Vào trang Vouchers<br>   - Kiểm tra voucher trúng thưởng có trong danh sách<br>   - Kiểm tra voucher có thể sử dụng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Quay vòng quay thành công<br>- [ ] Modal kết quả hiển thị sau khi quay xong:<br>  - [ ] Overlay backdrop<br>  - [ ] Modal ở giữa màn hình<br>  - [ ] Icon/emoji phù hợp (🎉 hoặc 😢)<br>  - [ ] Tiêu đề rõ ràng<br>  - [ ] Nội dung phần thưởng<br>  - [ ] Nút "Đóng"<br>- [ ] Với voucher trúng thưởng:<br>  - [ ] Icon 🎉<br>  - [ ] Tiêu đề "Bạn đã trúng voucher!"<br>  - [ ] Hiển thị tên voucher hoặc mã voucher<br>  - [ ] Hiển thị giá trị giảm (ví dụ: "Giảm 10.000đ" hoặc "Giảm 20%")<br>  - [ ] Voucher được lưu vào tài khoản<br>- [ ] Với "Suýt trúng":<br>  - [ ] Icon 😢<br>  - [ ] Tiêu đề "Suýt trúng!"<br>  - [ ] Thông báo động viên<br>  - [ ] Không có voucher được thêm vào<br>- [ ] Khi click "Đóng":<br>  - [ ] Modal đóng lại<br>  - [ ] Có thể quay tiếp (nếu còn lượt)<br>- [ ] Voucher trúng thưởng:<br>  - [ ] Có trong danh sách vouchers của user<br>  - [ ] Có thể sử dụng khi checkout<br>  - [ ] Hiển thị đúng giá trị giảm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Người dùng có lượt chơi để quay<br>- Có voucher trong danh sách phần thưởng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal kết quả trúng voucher<br>- [ ] Screenshot modal "Suýt trúng"<br>- [ ] Screenshot voucher trong danh sách<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị kết quả quay và thông tin voucher trúng thưởng. Đảm bảo modal hiển thị đầy đủ và voucher được lưu đúng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Người dùng có lượt chơi để quay
- Có voucher trong danh sách phần thưởng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game và quay
3. Kiểm tra modal kết quả
4. Kiểm tra với voucher trúng thưởng
5. Kiểm tra với "Suýt trúng"
6. Đóng modal và kiểm tra voucher

### Kết quả mong đợi
- [ ] Modal kết quả hiển thị đầy đủ thông tin
- [ ] Voucher được lưu và có thể sử dụng
- [ ] "Suýt trúng" hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị modal kết quả | ⬜ Pass / ⬜ Fail | |
| Thông tin voucher | ⬜ Pass / ⬜ Fail | |
| Lưu voucher | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot modal kết quả trúng voucher
- [ ] Screenshot modal "Suýt trúng"
- [ ] Screenshot voucher trong danh sách
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-054: Xem lịch sử lượt chơi

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-054 |
| **Description Test case** | Kiểm tra chức năng xem lịch sử lượt chơi. Đảm bảo có thể xem danh sách các lượt quay đã thực hiện với kết quả và thời gian. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Tìm section lịch sử**<br>   - Scroll đến section "Lịch sử" hoặc "Lịch sử lượt chơi"<br>   - Kiểm tra banner "Lịch sử" có thể click để expand/collapse<br>4. **Mở lịch sử**<br>   - Click vào banner "Lịch sử"<br>   - Quan sát danh sách lịch sử hiển thị<br>5. **Kiểm tra danh sách lịch sử**<br>   - Quan sát mỗi lượt chơi hiển thị:<br>     - Thời gian quay (giờ:phút, ngày/tháng/năm)<br>     - Kết quả (tên voucher trúng hoặc "Suýt trúng")<br>     - Trạng thái (đã sử dụng, chưa sử dụng)<br>6. **Kiểm tra filter/grouping**<br>   - Kiểm tra lịch sử được sắp xếp theo thời gian (mới nhất trước)<br>   - Kiểm tra lượt chơi hôm nay được highlight hoặc phân biệt<br>7. **Kiểm tra với không có lịch sử**<br>   - Nếu chưa có lượt chơi nào, kiểm tra hiển thị "Chưa có lượt chơi nào"<br>8. **Đóng/mở lại lịch sử**<br>   - Click lại banner "Lịch sử"<br>   - Kiểm tra danh sách collapse lại |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Section "Lịch sử" hiển thị:<br>  - [ ] Banner "Lịch sử" có thể click để expand/collapse<br>  - [ ] Icon hoặc indicator cho biết có thể mở/đóng<br>- [ ] Khi click banner "Lịch sử":<br>  - [ ] Danh sách lịch sử expand ra<br>  - [ ] Hiển thị danh sách các lượt chơi<br>- [ ] Mỗi lượt chơi trong lịch sử hiển thị:<br>  - [ ] Thời gian quay (format: "HH:mm DD/MM/YYYY")<br>  - [ ] Kết quả:<br>    - [ ] Tên voucher nếu trúng voucher<br>    - [ ] "Suýt trúng" nếu trúng "Suýt trúng"<br>  - [ ] Trạng thái:<br>    - [ ] Màu xanh hoặc highlight nếu chưa sử dụng (có thể dùng)<br>    - [ ] Màu xám hoặc bình thường nếu đã sử dụng hoặc hôm nay<br>- [ ] Lịch sử được sắp xếp:<br>  - [ ] Mới nhất ở trên<br>  - [ ] Lượt chơi hôm nay được highlight hoặc phân biệt<br>- [ ] Khi không có lịch sử:<br>  - [ ] Hiển thị "Chưa có lượt chơi nào"<br>  - [ ] Hoặc không hiển thị section lịch sử<br>- [ ] Có thể collapse/expand danh sách lịch sử<br>- [ ] Danh sách có thể scroll nếu có nhiều lượt chơi |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Người dùng đã có ít nhất một lượt quay (để test hiển thị lịch sử)<br>- Hoặc chưa có lượt quay nào (để test empty state) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section lịch sử<br>- [ ] Screenshot danh sách lịch sử<br>- [ ] Screenshot empty state (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem lịch sử lượt chơi. Đảm bảo có thể xem danh sách các lượt quay với đầy đủ thông tin.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Người dùng đã có ít nhất một lượt quay (để test hiển thị lịch sử)
- Hoặc chưa có lượt quay nào (để test empty state)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Tìm section lịch sử
4. Mở lịch sử
5. Kiểm tra danh sách lịch sử
6. Kiểm tra filter/grouping
7. Kiểm tra với không có lịch sử
8. Đóng/mở lại lịch sử

### Kết quả mong đợi
- [ ] Lịch sử hiển thị đầy đủ thông tin
- [ ] Có thể expand/collapse
- [ ] Sắp xếp đúng theo thời gian

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị section lịch sử | ⬜ Pass / ⬜ Fail | |
| Expand/collapse | ⬜ Pass / ⬜ Fail | |
| Thông tin lượt chơi | ⬜ Pass / ⬜ Fail | |
| Sắp xếp | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section lịch sử
- [ ] Screenshot danh sách lịch sử
- [ ] Screenshot empty state (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-055: Giới hạn lượt chơi (24 giờ)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-055 |
| **Description Test case** | Kiểm tra giới hạn lượt chơi 24 giờ. Đảm bảo không thể nhận lượt chơi mới trong vòng 24 giờ sau lần nhận trước đó. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Nhận lượt chơi lần đầu**<br>   - Click nút "Nhận" để nhận lượt chơi<br>   - Xác nhận nhận thành công<br>   - Ghi nhận thời gian nhận<br>4. **Thử nhận lại ngay sau đó**<br>   - Click lại nút "Nhận"<br>   - Quan sát hành vi của ứng dụng<br>5. **Kiểm tra trạng thái nút**<br>   - Quan sát nút "Nhận" chuyển thành "Đã nhận" hoặc disabled<br>   - Kiểm tra thông báo (nếu có)<br>6. **Kiểm tra sau 24 giờ (hoặc test với thời gian đã qua)**<br>   - Đợi 24 giờ (hoặc test với account đã nhận cách đây > 24 giờ)<br>   - Vào lại trang mini game<br>   - Kiểm tra nút "Nhận" có enabled lại không<br>   - Thử nhận lại<br>7. **Kiểm tra với localStorage**<br>   - Kiểm tra localStorage có lưu timestamp nhận lượt chơi<br>   - Kiểm tra logic kiểm tra 24 giờ hoạt động đúng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Nhận lượt chơi lần đầu thành công<br>- [ ] Ngay sau khi nhận:<br>  - [ ] Nút "Nhận" chuyển thành "Đã nhận" hoặc disabled<br>  - [ ] Không thể nhận lại<br>  - [ ] Thông báo rõ ràng (nếu có)<br>- [ ] Giới hạn 24 giờ:<br>  - [ ] Không thể nhận lại trong vòng 24 giờ<br>  - [ ] Sau 24 giờ, có thể nhận lại<br>  - [ ] Logic kiểm tra 24 giờ hoạt động đúng<br>- [ ] Timestamp được lưu:<br>  - [ ] Lưu vào localStorage với key `minigame_receive_play_{miniGameId}`<br>  - [ ] Lưu timestamp khi nhận thành công<br>  - [ ] Xóa timestamp khi nhận thành công (nếu logic như vậy)<br>- [ ] Thông báo rõ ràng:<br>  - [ ] "Bạn đã nhận lượt chơi hôm nay" hoặc tương tự<br>  - [ ] Hoặc hiển thị thời gian còn lại (nếu có)<br>- [ ] Nút "Nhận" disabled với style phù hợp (màu xám, không click được) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây)<br>- Hoặc đã nhận trong 24 giờ gần đây (để test giới hạn) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút "Nhận" enabled<br>- [ ] Screenshot nút "Đã nhận" disabled<br>- [ ] Screenshot thông báo giới hạn<br>- [ ] Screenshot localStorage (nếu có thể)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra giới hạn lượt chơi 24 giờ. Đảm bảo không thể nhận lượt chơi mới trong vòng 24 giờ.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây)
- Hoặc đã nhận trong 24 giờ gần đây (để test giới hạn)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Nhận lượt chơi lần đầu
4. Thử nhận lại ngay sau đó
5. Kiểm tra trạng thái nút
6. Kiểm tra sau 24 giờ (hoặc test với thời gian đã qua)
7. Kiểm tra với localStorage

### Kết quả mong đợi
- [ ] Giới hạn 24 giờ được enforce đúng
- [ ] Nút disabled khi chưa đủ 24 giờ
- [ ] Có thể nhận lại sau 24 giờ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Nhận lần đầu | ⬜ Pass / ⬜ Fail | |
| Không thể nhận lại | ⬜ Pass / ⬜ Fail | |
| Giới hạn 24 giờ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot nút "Nhận" enabled
- [ ] Screenshot nút "Đã nhận" disabled
- [ ] Screenshot thông báo giới hạn
- [ ] Screenshot localStorage (nếu có thể)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---



## TC-BHV-030: Xem danh sách đơn hàng theo trạng thái

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-030 |
| **Description Test case** | Kiểm tra chức năng xem danh sách đơn hàng và filter theo các trạng thái khác nhau (Tất cả, Chờ xử lý, Đã tiếp nhận, Đang giao, Đã nhận, Đã hủy). |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Click vào icon Profile hoặc avatar<br>   - Nhập số điện thoại và mật khẩu (hoặc OTP)<br>   - Click "Đăng nhập"<br>   - Xác nhận đăng nhập thành công<br>2. **Vào trang đơn hàng**<br>   - Click vào nút "Đơn hàng" ở footer hoặc header<br>   - Xác nhận điều hướng đến trang `/orders`<br>3. **Kiểm tra danh sách đơn hàng**<br>   - Quan sát danh sách đơn hàng hiển thị<br>   - Kiểm tra các tab trạng thái: Tất cả, Chờ xử lý, Đã tiếp nhận, Đang giao, Đã nhận, Đã hủy<br>   - Kiểm tra tab "Tất cả" được chọn mặc định<br>4. **Filter theo trạng thái "Chờ xử lý"**<br>   - Click vào tab "Chờ xử lý"<br>   - Quan sát danh sách đơn hàng được filter<br>   - Kiểm tra chỉ hiển thị đơn hàng có trạng thái "Chờ xử lý"<br>5. **Filter theo các trạng thái khác**<br>   - Click vào tab "Đã tiếp nhận"<br>   - Kiểm tra danh sách filter đúng<br>   - Click vào tab "Đang giao"<br>   - Kiểm tra danh sách filter đúng<br>   - Click vào tab "Đã nhận"<br>   - Kiểm tra danh sách filter đúng<br>   - Click vào tab "Đã hủy"<br>   - Kiểm tra danh sách filter đúng<br>6. **Kiểm tra thông tin đơn hàng trong danh sách**<br>   - Quan sát mỗi đơn hàng hiển thị:<br>     - Mã đơn hàng<br>     - Trạng thái đơn hàng<br>     - Tổng tiền<br>     - Số lượng sản phẩm<br>     - Ngày đặt hàng<br>     - Hình ảnh sản phẩm (nếu có) |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Điều hướng đến trang đơn hàng thành công<br>- [ ] Danh sách đơn hàng hiển thị đầy đủ<br>- [ ] Các tab trạng thái hiển thị:<br>  - [ ] Tab "Tất cả"<br>  - [ ] Tab "Chờ xử lý"<br>  - [ ] Tab "Đã tiếp nhận"<br>  - [ ] Tab "Đang giao"<br>  - [ ] Tab "Đã nhận"<br>  - [ ] Tab "Đã hủy"<br>- [ ] Tab "Tất cả" được chọn mặc định và hiển thị tất cả đơn hàng<br>- [ ] Khi click vào tab "Chờ xử lý":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị đơn hàng có trạng thái "Chờ xử lý"<br>  - [ ] URL cập nhật thành `/orders?status=0`<br>- [ ] Khi click vào các tab khác:<br>  - [ ] Tab được highlight đúng<br>  - [ ] Danh sách filter đúng theo trạng thái<br>  - [ ] URL cập nhật đúng<br>- [ ] Mỗi đơn hàng trong danh sách hiển thị đầy đủ thông tin:<br>  - [ ] Mã đơn hàng<br>  - [ ] Trạng thái đơn hàng với màu sắc phù hợp<br>  - [ ] Tổng tiền được format đúng<br>  - [ ] Số lượng sản phẩm<br>  - [ ] Ngày đặt hàng<br>  - [ ] Hình ảnh sản phẩm (nếu có)<br>- [ ] Có thể click vào đơn hàng để xem chi tiết |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng trong hệ thống<br>- Có đơn hàng ở các trạng thái khác nhau |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách đơn hàng<br>- [ ] Screenshot filter theo từng trạng thái<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem danh sách đơn hàng và filter theo các trạng thái khác nhau. Đảm bảo người dùng có thể dễ dàng tìm và xem đơn hàng theo trạng thái mong muốn.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng trong hệ thống
- Có đơn hàng ở các trạng thái khác nhau

### Các bước thực hiện
1. **Đăng nhập vào ứng dụng**
   - Mở ứng dụng Zalo Mini App
   - Click vào icon Profile hoặc avatar
   - Nhập số điện thoại và mật khẩu (hoặc OTP)
   - Click "Đăng nhập"
   - Xác nhận đăng nhập thành công

2. **Vào trang đơn hàng**
   - Click vào nút "Đơn hàng" ở footer hoặc header
   - Xác nhận điều hướng đến trang `/orders`

3. **Kiểm tra danh sách đơn hàng**
   - Quan sát danh sách đơn hàng hiển thị
   - Kiểm tra các tab trạng thái: Tất cả, Chờ xử lý, Đã tiếp nhận, Đang giao, Đã nhận, Đã hủy
   - Kiểm tra tab "Tất cả" được chọn mặc định

4. **Filter theo trạng thái "Chờ xử lý"**
   - Click vào tab "Chờ xử lý"
   - Quan sát danh sách đơn hàng được filter
   - Kiểm tra chỉ hiển thị đơn hàng có trạng thái "Chờ xử lý"

5. **Filter theo các trạng thái khác**
   - Click vào tab "Đã tiếp nhận"
   - Kiểm tra danh sách filter đúng
   - Click vào tab "Đang giao"
   - Kiểm tra danh sách filter đúng
   - Click vào tab "Đã nhận"
   - Kiểm tra danh sách filter đúng
   - Click vào tab "Đã hủy"
   - Kiểm tra danh sách filter đúng

6. **Kiểm tra thông tin đơn hàng trong danh sách**
   - Quan sát mỗi đơn hàng hiển thị:
     - Mã đơn hàng
     - Trạng thái đơn hàng
     - Tổng tiền
     - Số lượng sản phẩm
     - Ngày đặt hàng
     - Hình ảnh sản phẩm (nếu có)

### Kết quả mong đợi
- [ ] Đăng nhập thành công
- [ ] Điều hướng đến trang đơn hàng thành công
- [ ] Danh sách đơn hàng hiển thị đầy đủ
- [ ] Các tab trạng thái hiển thị đầy đủ
- [ ] Tab "Tất cả" được chọn mặc định
- [ ] Filter theo từng trạng thái hoạt động đúng
- [ ] URL cập nhật đúng khi chuyển tab
- [ ] Thông tin đơn hàng hiển thị đầy đủ và chính xác
- [ ] Có thể click vào đơn hàng để xem chi tiết

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Đăng nhập | ⬜ Pass / ⬜ Fail | |
| Vào trang đơn hàng | ⬜ Pass / ⬜ Fail | |
| Hiển thị danh sách | ⬜ Pass / ⬜ Fail | |
| Filter theo trạng thái | ⬜ Pass / ⬜ Fail | |
| Thông tin đơn hàng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot danh sách đơn hàng
- [ ] Screenshot filter theo từng trạng thái
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-031: Xem chi tiết đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-031 |
| **Description Test case** | Kiểm tra chức năng xem chi tiết đơn hàng bao gồm thông tin sản phẩm, địa chỉ giao hàng, phương thức thanh toán, tổng tiền và các thông tin khác. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang đơn hàng**<br>   - Click vào nút "Đơn hàng"<br>   - Xác nhận vào trang danh sách đơn hàng<br>3. **Click vào một đơn hàng**<br>   - Chọn một đơn hàng bất kỳ từ danh sách<br>   - Click vào đơn hàng<br>   - Xác nhận điều hướng đến trang chi tiết đơn hàng<br>4. **Kiểm tra thông tin địa chỉ giao hàng**<br>   - Scroll đến section "Địa chỉ nhận hàng"<br>   - Kiểm tra hiển thị:<br>     - Họ tên người nhận<br>     - Số điện thoại<br>     - Email (nếu có)<br>     - Địa chỉ đầy đủ<br>5. **Kiểm tra thông tin sản phẩm**<br>   - Scroll đến section "Sản phẩm"<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Variant (màu sắc, kích thước nếu có)<br>     - Giá sản phẩm<br>     - Số lượng<br>     - Thành tiền<br>6. **Kiểm tra thông tin thanh toán**<br>   - Scroll đến section "Thông tin thanh toán"<br>   - Kiểm tra hiển thị:<br>     - Mã đơn hàng<br>     - Trạng thái đơn hàng<br>     - Trạng thái thanh toán<br>     - Phương thức thanh toán<br>     - Phí vận chuyển<br>     - Hỗ trợ phí ship (nếu có)<br>     - Voucher (nếu có)<br>     - Điểm đã sử dụng (nếu có)<br>     - Tổng thanh toán<br>7. **Kiểm tra điểm thưởng (nếu có)**<br>   - Kiểm tra hiển thị điểm thưởng<br>   - Kiểm tra trạng thái điểm thưởng (đã được cộng, tạm giữ)<br>8. **Kiểm tra ghi chú đơn hàng (nếu có)**<br>   - Kiểm tra section "Ghi chú đơn hàng" hiển thị (nếu có ghi chú) |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang đơn hàng thành công<br>- [ ] Click vào đơn hàng điều hướng đến trang chi tiết<br>- [ ] Trang chi tiết đơn hàng hiển thị đầy đủ các section:<br>  - [ ] Địa chỉ nhận hàng<br>  - [ ] Danh sách sản phẩm<br>  - [ ] Thông tin thanh toán<br>  - [ ] Điểm thưởng (nếu có)<br>  - [ ] Ghi chú đơn hàng (nếu có)<br>- [ ] Section "Địa chỉ nhận hàng" hiển thị đầy đủ:<br>  - [ ] Họ tên người nhận<br>  - [ ] Số điện thoại<br>  - [ ] Email (nếu có)<br>  - [ ] Địa chỉ đầy đủ (số nhà, phường/xã, quận/huyện, tỉnh/thành phố)<br>- [ ] Section "Sản phẩm" hiển thị đầy đủ cho mỗi sản phẩm:<br>  - [ ] Hình ảnh sản phẩm load đúng<br>  - [ ] Tên sản phẩm<br>  - [ ] Variant (màu sắc, kích thước)<br>  - [ ] Giá sản phẩm được format đúng<br>  - [ ] Số lượng<br>  - [ ] Thành tiền = Giá × Số lượng<br>- [ ] Section "Thông tin thanh toán" hiển thị đầy đủ:<br>  - [ ] Mã đơn hàng<br>  - [ ] Trạng thái đơn hàng với màu sắc phù hợp<br>  - [ ] Trạng thái thanh toán<br>  - [ ] Phương thức thanh toán (COD, Chuyển khoản)<br>  - [ ] Phí vận chuyển<br>  - [ ] Hỗ trợ phí ship (nếu có)<br>  - [ ] Voucher và số tiền giảm (nếu có)<br>  - [ ] Điểm đã sử dụng (nếu có)<br>  - [ ] Tổng thanh toán = Tổng giá sản phẩm + Phí ship - Hỗ trợ ship - Voucher - Điểm<br>- [ ] Điểm thưởng hiển thị đúng với trạng thái (nếu có)<br>- [ ] Ghi chú đơn hàng hiển thị (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trang chi tiết đơn hàng<br>- [ ] Screenshot các section khác nhau<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem chi tiết đơn hàng. Đảm bảo tất cả thông tin về đơn hàng được hiển thị đầy đủ và chính xác.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng trong hệ thống

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang đơn hàng
3. Click vào một đơn hàng
4. Kiểm tra thông tin địa chỉ giao hàng
5. Kiểm tra thông tin sản phẩm
6. Kiểm tra thông tin thanh toán
7. Kiểm tra điểm thưởng (nếu có)
8. Kiểm tra ghi chú đơn hàng (nếu có)

### Kết quả mong đợi
- [ ] Tất cả thông tin đơn hàng hiển thị đầy đủ và chính xác
- [ ] Layout và UI dễ đọc, dễ hiểu
- [ ] Các số tiền được format đúng định dạng VNĐ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Điều hướng đến chi tiết | ⬜ Pass / ⬜ Fail | |
| Thông tin địa chỉ | ⬜ Pass / ⬜ Fail | |
| Thông tin sản phẩm | ⬜ Pass / ⬜ Fail | |
| Thông tin thanh toán | ⬜ Pass / ⬜ Fail | |
| Tính toán tổng tiền | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot trang chi tiết đơn hàng
- [ ] Screenshot các section khác nhau
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-032: Hủy đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-032 |
| **Description Test case** | Kiểm tra chức năng hủy đơn hàng. Đảm bảo chỉ có thể hủy đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã tiếp nhận", và có xác nhận trước khi hủy. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang đơn hàng**<br>   - Click vào nút "Đơn hàng"<br>   - Vào tab "Chờ xử lý" hoặc "Đã tiếp nhận"<br>3. **Mở chi tiết đơn hàng có thể hủy**<br>   - Chọn một đơn hàng có trạng thái "Chờ xử lý" (status = 0) hoặc "Đã tiếp nhận" (status = 1)<br>   - Click vào đơn hàng để xem chi tiết<br>4. **Kiểm tra nút hủy đơn hàng**<br>   - Scroll xuống cuối trang<br>   - Kiểm tra nút "Hủy đơn hàng" hiển thị<br>   - Xác nhận nút chỉ hiển thị với đơn hàng có thể hủy<br>5. **Click nút hủy đơn hàng**<br>   - Click vào nút "Hủy đơn hàng"<br>   - Xác nhận modal xác nhận hiển thị<br>6. **Xác nhận hủy đơn hàng**<br>   - Kiểm tra modal hiển thị:<br>     - Tiêu đề "Xác nhận hủy đơn"<br>     - Mã đơn hàng<br>     - Nút "Giữ lại"<br>     - Nút "Xác nhận hủy"<br>   - Click vào nút "Xác nhận hủy"<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra trạng thái đơn hàng cập nhật thành "Đã hủy"<br>   - Kiểm tra nút "Hủy đơn hàng" không còn hiển thị<br>8. **Kiểm tra với đơn hàng không thể hủy**<br>   - Vào đơn hàng có trạng thái "Đang giao" hoặc "Đã nhận"<br>   - Kiểm tra nút "Hủy đơn hàng" không hiển thị |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang đơn hàng thành công<br>- [ ] Nút "Hủy đơn hàng" chỉ hiển thị với đơn hàng có thể hủy (status = 0 hoặc 1)<br>- [ ] Khi click nút "Hủy đơn hàng":<br>  - [ ] Modal xác nhận hiển thị<br>  - [ ] Modal hiển thị đầy đủ thông tin:<br>    - [ ] Tiêu đề "Xác nhận hủy đơn"<br>    - [ ] Mã đơn hàng<br>    - [ ] Nút "Giữ lại"<br>    - [ ] Nút "Xác nhận hủy" (màu đỏ)<br>- [ ] Khi click "Giữ lại":<br>  - [ ] Modal đóng lại<br>  - [ ] Đơn hàng không bị hủy<br>- [ ] Khi click "Xác nhận hủy":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Hiển thị thông báo "Đã gửi yêu cầu hủy đơn hàng thành công"<br>  - [ ] Trạng thái đơn hàng cập nhật thành "Đã hủy"<br>  - [ ] Nút "Hủy đơn hàng" không còn hiển thị<br>  - [ ] Đơn hàng chuyển sang tab "Đã hủy"<br>- [ ] Với đơn hàng không thể hủy (status = 2, 3, 5):<br>  - [ ] Nút "Hủy đơn hàng" không hiển thị |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã tiếp nhận"<br>- Người dùng có đơn hàng ở trạng thái "Đang giao" hoặc "Đã nhận" |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút hủy đơn hàng<br>- [ ] Screenshot modal xác nhận<br>- [ ] Screenshot đơn hàng sau khi hủy<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng hủy đơn hàng. Đảm bảo chỉ có thể hủy đơn hàng ở các trạng thái phù hợp và có xác nhận trước khi hủy.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đã tiếp nhận"
- Người dùng có đơn hàng ở trạng thái "Đang giao" hoặc "Đã nhận"

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang đơn hàng
3. Mở chi tiết đơn hàng có thể hủy
4. Kiểm tra nút hủy đơn hàng
5. Click nút hủy đơn hàng
6. Xác nhận hủy đơn hàng
7. Kiểm tra kết quả
8. Kiểm tra với đơn hàng không thể hủy

### Kết quả mong đợi
- [ ] Nút hủy chỉ hiển thị với đơn hàng có thể hủy
- [ ] Modal xác nhận hiển thị đầy đủ thông tin
- [ ] Hủy đơn hàng thành công và cập nhật trạng thái
- [ ] Đơn hàng không thể hủy không hiển thị nút hủy

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút hủy | ⬜ Pass / ⬜ Fail | |
| Modal xác nhận | ⬜ Pass / ⬜ Fail | |
| Hủy đơn thành công | ⬜ Pass / ⬜ Fail | |
| Cập nhật trạng thái | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot nút hủy đơn hàng
- [ ] Screenshot modal xác nhận
- [ ] Screenshot đơn hàng sau khi hủy
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-033: Đánh giá sản phẩm sau khi nhận hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-033 |
| **Description Test case** | Kiểm tra chức năng đánh giá sản phẩm sau khi đơn hàng đã được nhận (status = 5). Đảm bảo có thể đánh giá từng sản phẩm với rating, comment và hình ảnh. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào đơn hàng đã nhận**<br>   - Click vào nút "Đơn hàng"<br>   - Vào tab "Đã nhận"<br>   - Chọn một đơn hàng đã nhận (status = 5)<br>   - Click vào đơn hàng để xem chi tiết<br>3. **Kiểm tra section đánh giá**<br>   - Scroll đến section "Đánh giá sản phẩm"<br>   - Kiểm tra hiển thị form đánh giá cho các sản phẩm chưa đánh giá<br>   - Kiểm tra hiển thị đánh giá đã có cho các sản phẩm đã đánh giá<br>4. **Đánh giá sản phẩm chưa đánh giá**<br>   - Chọn một sản phẩm chưa đánh giá<br>   - Click vào form đánh giá<br>   - Chọn số sao (1-5 sao)<br>   - Nhập comment (tùy chọn)<br>   - Upload hình ảnh (tùy chọn)<br>   - Click nút "Gửi đánh giá"<br>5. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra đánh giá hiển thị trong section "Đánh giá sản phẩm"<br>   - Kiểm tra form đánh giá cho sản phẩm đó không còn hiển thị<br>6. **Xem đánh giá đã có**<br>   - Kiểm tra đánh giá đã có hiển thị:<br>     - Số sao<br>     - Comment<br>     - Hình ảnh (nếu có)<br>     - Ngày đánh giá<br>     - Badge "Đã mua" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào đơn hàng đã nhận thành công<br>- [ ] Section "Đánh giá sản phẩm" hiển thị:<br>  - [ ] Form đánh giá cho sản phẩm chưa đánh giá<br>  - [ ] Đánh giá đã có cho sản phẩm đã đánh giá<br>- [ ] Form đánh giá cho phép:<br>  - [ ] Chọn số sao (1-5 sao) với UI rõ ràng<br>  - [ ] Nhập comment (tùy chọn)<br>  - [ ] Upload hình ảnh (tùy chọn, có thể upload nhiều ảnh)<br>  - [ ] Nút "Gửi đánh giá"<br>- [ ] Khi gửi đánh giá:<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Hiển thị thông báo thành công<br>  - [ ] Đánh giá hiển thị ngay trong section<br>  - [ ] Form đánh giá cho sản phẩm đó không còn hiển thị<br>- [ ] Đánh giá đã có hiển thị đầy đủ:<br>  - [ ] Số sao được highlight đúng<br>  - [ ] Comment hiển thị đầy đủ<br>  - [ ] Hình ảnh hiển thị (nếu có)<br>  - [ ] Ngày đánh giá<br>  - [ ] Badge "Đã mua" (verified purchase)<br>- [ ] Chỉ có thể đánh giá sản phẩm trong đơn hàng đã nhận (status = 5) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng đã nhận (status = 5)<br>- Đơn hàng có ít nhất một sản phẩm chưa đánh giá |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form đánh giá<br>- [ ] Screenshot đánh giá đã gửi<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng đánh giá sản phẩm sau khi nhận hàng. Đảm bảo người dùng có thể đánh giá từng sản phẩm với rating, comment và hình ảnh.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng đã nhận (status = 5)
- Đơn hàng có ít nhất một sản phẩm chưa đánh giá

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào đơn hàng đã nhận
3. Kiểm tra section đánh giá
4. Đánh giá sản phẩm chưa đánh giá
5. Kiểm tra kết quả
6. Xem đánh giá đã có

### Kết quả mong đợi
- [ ] Form đánh giá hiển thị đầy đủ và dễ sử dụng
- [ ] Có thể đánh giá với rating, comment và hình ảnh
- [ ] Đánh giá được lưu và hiển thị đúng
- [ ] Chỉ có thể đánh giá đơn hàng đã nhận

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form đánh giá | ⬜ Pass / ⬜ Fail | |
| Gửi đánh giá thành công | ⬜ Pass / ⬜ Fail | |
| Hiển thị đánh giá đã có | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form đánh giá
- [ ] Screenshot đánh giá đã gửi
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-034: Xem thông tin thanh toán chuyển khoản

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-034 |
| **Description Test case** | Kiểm tra hiển thị thông tin thanh toán chuyển khoản cho đơn hàng có phương thức thanh toán là chuyển khoản và trạng thái thanh toán là "pending". Bao gồm QR code, số tài khoản, người nhận, nội dung chuyển khoản và countdown timer. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào đơn hàng cần thanh toán**<br>   - Click vào nút "Đơn hàng"<br>   - Tìm đơn hàng có phương thức thanh toán là "Chuyển khoản" và trạng thái thanh toán là "pending"<br>   - Click vào đơn hàng để xem chi tiết<br>3. **Kiểm tra section thanh toán chuyển khoản**<br>   - Scroll đến section hiển thị thông tin thanh toán<br>   - Kiểm tra hiển thị:<br>     - Phương thức thanh toán "Chuyển khoản nhanh 24/7"<br>     - Thông báo countdown timer (nếu có)<br>     - QR code thanh toán<br>     - Số tài khoản<br>     - Người nhận<br>     - Nội dung chuyển khoản (mã đơn hàng)<br>     - Số tiền cần chuyển<br>4. **Kiểm tra countdown timer**<br>   - Quan sát countdown timer hiển thị<br>   - Kiểm tra timer đếm ngược từ 15 phút<br>   - Kiểm tra format hiển thị (HH:MM:SS)<br>5. **Kiểm tra QR code**<br>   - Quan sát QR code hiển thị<br>   - Kiểm tra QR code có thể scan được<br>   - Kiểm tra QR code chứa đúng thông tin<br>6. **Kiểm tra nút copy**<br>   - Click vào nút "Sao chép" bên cạnh số tài khoản<br>   - Kiểm tra số tài khoản được copy vào clipboard<br>   - Kiểm tra thông báo "Đã sao chép số tài khoản"<br>   - Click vào nút "Sao chép" bên cạnh nội dung<br>   - Kiểm tra nội dung được copy vào clipboard<br>7. **Kiểm tra thông tin hiển thị**<br>   - Kiểm tra số tài khoản hiển thị đúng<br>   - Kiểm tra người nhận hiển thị đúng<br>   - Kiểm tra nội dung = mã đơn hàng<br>   - Kiểm tra số tiền = tổng thanh toán của đơn hàng<br>   - Kiểm tra tên ngân hàng hiển thị |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào đơn hàng cần thanh toán thành công<br>- [ ] Section thanh toán chuyển khoản hiển thị khi:<br>  - [ ] Phương thức thanh toán = "Chuyển khoản" hoặc "Bank Transfer"<br>  - [ ] Trạng thái thanh toán = "pending"<br>- [ ] Section hiển thị đầy đủ:<br>  - [ ] Phương thức thanh toán "Chuyển khoản nhanh 24/7"<br>  - [ ] Tên ngân hàng (ví dụ: VPBank)<br>  - [ ] Thông báo countdown timer với format "Cần thanh toán sớm trong HH:MM:SS"<br>  - [ ] QR code thanh toán hiển thị rõ ràng, có thể scan<br>  - [ ] Số tài khoản với nút "Sao chép"<br>  - [ ] Người nhận<br>  - [ ] Nội dung chuyển khoản (mã đơn hàng) với nút "Sao chép"<br>  - [ ] Số tiền cần chuyển (format VNĐ)<br>- [ ] Countdown timer:<br>  - [ ] Hiển thị và đếm ngược từ 15 phút<br>  - [ ] Format hiển thị: HH:MM:SS<br>  - [ ] Cập nhật mỗi giây<br>  - [ ] Khi hết thời gian, timer = 00:00:00 hoặc không hiển thị<br>- [ ] QR code:<br>  - [ ] Hiển thị rõ ràng, không bị mờ<br>  - [ ] Có thể scan được bằng app ngân hàng<br>  - [ ] Chứa đúng thông tin: số tài khoản, số tiền, nội dung<br>- [ ] Nút "Sao chép":<br>  - [ ] Copy số tài khoản vào clipboard<br>  - [ ] Copy nội dung (mã đơn hàng) vào clipboard<br>  - [ ] Hiển thị thông báo "Đã sao chép [thông tin] vào bộ nhớ tạm"<br>- [ ] Thông tin hiển thị chính xác:<br>  - [ ] Số tài khoản đúng<br>  - [ ] Người nhận đúng<br>  - [ ] Nội dung = mã đơn hàng<br>  - [ ] Số tiền = tổng thanh toán<br>- [ ] Với đơn hàng không phải chuyển khoản hoặc đã thanh toán:<br>  - [ ] Section này không hiển thị |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có đơn hàng với phương thức thanh toán là "Chuyển khoản"<br>- Trạng thái thanh toán của đơn hàng là "pending"<br>- Đơn hàng được tạo trong vòng 15 phút gần đây |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section thanh toán chuyển khoản<br>- [ ] Screenshot QR code<br>- [ ] Screenshot countdown timer<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị thông tin thanh toán chuyển khoản cho đơn hàng. Đảm bảo người dùng có đầy đủ thông tin để thực hiện chuyển khoản và có thể copy thông tin dễ dàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có đơn hàng với phương thức thanh toán là "Chuyển khoản"
- Trạng thái thanh toán của đơn hàng là "pending"
- Đơn hàng được tạo trong vòng 15 phút gần đây

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào đơn hàng cần thanh toán
3. Kiểm tra section thanh toán chuyển khoản
4. Kiểm tra countdown timer
5. Kiểm tra QR code
6. Kiểm tra nút copy
7. Kiểm tra thông tin hiển thị

### Kết quả mong đợi
- [ ] Section thanh toán hiển thị đầy đủ thông tin
- [ ] QR code có thể scan được
- [ ] Countdown timer hoạt động đúng
- [ ] Nút copy hoạt động đúng
- [ ] Thông tin hiển thị chính xác

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị section | ⬜ Pass / ⬜ Fail | |
| QR code | ⬜ Pass / ⬜ Fail | |
| Countdown timer | ⬜ Pass / ⬜ Fail | |
| Nút copy | ⬜ Pass / ⬜ Fail | |
| Thông tin chính xác | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section thanh toán chuyển khoản
- [ ] Screenshot QR code
- [ ] Screenshot countdown timer
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-035: Liên hệ shop từ đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-035 |
| **Description Test case** | Kiểm tra chức năng liên hệ shop từ trang chi tiết đơn hàng. Đảm bảo có thể mở chat Zalo với shop và tự động điền thông tin đơn hàng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào chi tiết đơn hàng**<br>   - Click vào nút "Đơn hàng"<br>   - Chọn một đơn hàng bất kỳ<br>   - Click vào đơn hàng để xem chi tiết<br>3. **Tìm nút liên hệ shop**<br>   - Scroll đến section "Bạn cần hỗ trợ?"<br>   - Kiểm tra nút "Liên hệ Shop" hiển thị<br>4. **Click nút liên hệ shop**<br>   - Click vào nút "Liên hệ Shop"<br>   - Quan sát hành vi của ứng dụng<br>5. **Kiểm tra chat Zalo mở**<br>   - Kiểm tra ứng dụng Zalo chat mở ra<br>   - Kiểm tra chat mở với Official Account của shop<br>   - Kiểm tra tin nhắn tự động điền:<br>     - "Cho tôi biết tình trạng đơn hàng hiện tại của tôi"<br>     - Mã đơn hàng<br>6. **Kiểm tra với đơn hàng khác**<br>   - Vào đơn hàng khác<br>   - Click "Liên hệ Shop"<br>   - Kiểm tra tin nhắn tự động điền đúng mã đơn hàng mới |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào chi tiết đơn hàng thành công<br>- [ ] Section "Bạn cần hỗ trợ?" hiển thị:<br>  - [ ] Tiêu đề "Bạn cần hỗ trợ?"<br>  - [ ] Nút "Liên hệ Shop" với icon chat<br>  - [ ] Icon mũi tên phải<br>- [ ] Khi click "Liên hệ Shop":<br>  - [ ] Mở Zalo chat với Official Account của shop<br>  - [ ] Tin nhắn tự động điền:<br>    - [ ] "Cho tôi biết tình trạng đơn hàng hiện tại của tôi"<br>    - [ ] Xuống dòng<br>    - [ ] "Mã đơn hàng: [mã đơn hàng]"<br>  - [ ] Mã đơn hàng = mã đơn hàng của đơn hàng hiện tại<br>- [ ] Với mỗi đơn hàng khác nhau:<br>  - [ ] Tin nhắn tự động điền đúng mã đơn hàng tương ứng<br>- [ ] Nếu không có OA ID:<br>  - [ ] Fallback mở link Zalo với số điện thoại shop |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một đơn hàng<br>- Ứng dụng Zalo đã được cài đặt trên thiết bị<br>- Có cấu hình OA ID hoặc số điện thoại shop |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section "Bạn cần hỗ trợ?"<br>- [ ] Screenshot chat Zalo mở ra<br>- [ ] Screenshot tin nhắn tự động điền<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng liên hệ shop từ trang chi tiết đơn hàng. Đảm bảo có thể mở chat Zalo với shop và tự động điền thông tin đơn hàng để hỗ trợ người dùng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một đơn hàng
- Ứng dụng Zalo đã được cài đặt trên thiết bị
- Có cấu hình OA ID hoặc số điện thoại shop

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào chi tiết đơn hàng
3. Tìm nút liên hệ shop
4. Click nút liên hệ shop
5. Kiểm tra chat Zalo mở
6. Kiểm tra với đơn hàng khác

### Kết quả mong đợi
- [ ] Nút liên hệ shop hiển thị rõ ràng
- [ ] Mở chat Zalo thành công
- [ ] Tin nhắn tự động điền đúng thông tin đơn hàng
- [ ] Mã đơn hàng trong tin nhắn đúng với đơn hàng hiện tại

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút liên hệ | ⬜ Pass / ⬜ Fail | |
| Mở chat Zalo | ⬜ Pass / ⬜ Fail | |
| Tin nhắn tự động điền | ⬜ Pass / ⬜ Fail | |
| Mã đơn hàng đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section "Bạn cần hỗ trợ?"
- [ ] Screenshot chat Zalo mở ra
- [ ] Screenshot tin nhắn tự động điền
- [ ] Screenshot log console (nếu có lỗi)

</details>

---



## TC-BHV-036: Cập nhật thông tin cơ bản (tên, email, số điện thoại)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-036 |
| **Description Test case** | Kiểm tra chức năng cập nhật thông tin cơ bản của tài khoản bao gồm họ tên, email và số điện thoại. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile hoặc avatar<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận điều hướng đến trang `/profile/edit`<br>3. **Kiểm tra form chỉnh sửa**<br>   - Quan sát form hiển thị:<br>     - Avatar hiện tại<br>     - Trường "Họ và tên" với giá trị hiện tại<br>     - Trường "Email" với giá trị hiện tại<br>     - Trường "Số điện thoại" (readonly hoặc disabled)<br>4. **Cập nhật họ tên**<br>   - Click vào trường "Họ và tên"<br>   - Xóa giá trị cũ<br>   - Nhập họ tên mới (ví dụ: "Nguyễn Văn A")<br>5. **Cập nhật email**<br>   - Click vào trường "Email"<br>   - Xóa giá trị cũ<br>   - Nhập email mới (ví dụ: "nguyenvana@example.com")<br>6. **Lưu thay đổi**<br>   - Scroll xuống cuối form<br>   - Click nút "Lưu thay đổi"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra điều hướng về trang Profile<br>   - Kiểm tra thông tin đã được cập nhật trên trang Profile<br>   - Vào lại trang chỉnh sửa và kiểm tra giá trị mới đã được lưu |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Điều hướng đến trang chỉnh sửa profile thành công<br>- [ ] Form hiển thị đầy đủ:<br>  - [ ] Avatar hiện tại<br>  - [ ] Trường "Họ và tên" với giá trị hiện tại có thể chỉnh sửa<br>  - [ ] Trường "Email" với giá trị hiện tại có thể chỉnh sửa<br>  - [ ] Trường "Số điện thoại" hiển thị nhưng không thể chỉnh sửa (readonly)<br>- [ ] Có thể nhập và chỉnh sửa họ tên<br>- [ ] Có thể nhập và chỉnh sửa email<br>- [ ] Khi click "Lưu thay đổi":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật profile<br>  - [ ] Hiển thị thông báo "Đã cập nhật thông tin tài khoản"<br>  - [ ] Điều hướng về trang Profile<br>  - [ ] Thông tin mới hiển thị trên trang Profile<br>- [ ] Khi vào lại trang chỉnh sửa:<br>  - [ ] Giá trị mới đã được lưu và hiển thị đúng<br>- [ ] Số điện thoại không thể chỉnh sửa (readonly) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có thông tin profile hiện tại |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form chỉnh sửa<br>- [ ] Screenshot sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng cập nhật thông tin cơ bản của tài khoản. Đảm bảo có thể cập nhật họ tên và email, trong khi số điện thoại không thể chỉnh sửa.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có thông tin profile hiện tại

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra form chỉnh sửa
4. Cập nhật họ tên
5. Cập nhật email
6. Lưu thay đổi
7. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Form hiển thị đầy đủ và có thể chỉnh sửa
- [ ] Cập nhật thành công và thông tin được lưu đúng
- [ ] Số điện thoại không thể chỉnh sửa

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form | ⬜ Pass / ⬜ Fail | |
| Cập nhật họ tên | ⬜ Pass / ⬜ Fail | |
| Cập nhật email | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form chỉnh sửa
- [ ] Screenshot sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-037: Cập nhật ngày sinh và giới tính

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-037 |
| **Description Test case** | Kiểm tra chức năng cập nhật ngày sinh và giới tính của tài khoản. Đảm bảo có thể chọn ngày, tháng, năm và nhập giới tính. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Kiểm tra trường ngày sinh**<br>   - Scroll đến trường "Ngày sinh"<br>   - Kiểm tra hiển thị 3 dropdown:<br>     - Dropdown "Ngày"<br>     - Dropdown "Tháng"<br>     - Dropdown "Năm"<br>   - Kiểm tra giá trị hiện tại được chọn (nếu có)<br>4. **Cập nhật ngày sinh**<br>   - Click vào dropdown "Ngày"<br>   - Chọn ngày mới (ví dụ: 15)<br>   - Click vào dropdown "Tháng"<br>   - Chọn tháng mới (ví dụ: 6)<br>   - Click vào dropdown "Năm"<br>   - Chọn năm mới (ví dụ: 1990)<br>   - Kiểm tra khi chọn tháng/năm, số ngày hợp lệ được cập nhật (ví dụ: tháng 2 có 28/29 ngày)<br>5. **Cập nhật giới tính**<br>   - Scroll đến trường "Giới tính"<br>   - Click vào trường "Giới tính"<br>   - Nhập giới tính mới (ví dụ: "Nam" hoặc "Nữ")<br>6. **Lưu thay đổi**<br>   - Click nút "Lưu thay đổi"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra thông tin đã được cập nhật<br>   - Vào lại trang chỉnh sửa và kiểm tra giá trị mới đã được lưu |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Trường "Ngày sinh" hiển thị 3 dropdown:<br>  - [ ] Dropdown "Ngày" với danh sách ngày (1-31)<br>  - [ ] Dropdown "Tháng" với danh sách tháng (1-12)<br>  - [ ] Dropdown "Năm" với danh sách năm (từ năm hiện tại trở về trước)<br>  - [ ] Giá trị hiện tại được chọn (nếu có)<br>- [ ] Khi chọn tháng/năm:<br>  - [ ] Số ngày hợp lệ được cập nhật (ví dụ: tháng 2 có 28/29 ngày, tháng 4 có 30 ngày)<br>  - [ ] Nếu ngày đã chọn > số ngày hợp lệ, tự động điều chỉnh về ngày cuối cùng của tháng<br>- [ ] Trường "Giới tính" có thể nhập text<br>- [ ] Khi click "Lưu thay đổi":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật với format ngày sinh: DD/MM/YYYY<br>  - [ ] Hiển thị thông báo thành công<br>  - [ ] Thông tin được cập nhật<br>- [ ] Khi vào lại trang chỉnh sửa:<br>  - [ ] Ngày sinh mới được hiển thị đúng trong 3 dropdown<br>  - [ ] Giới tính mới được hiển thị đúng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot dropdown ngày sinh<br>- [ ] Screenshot sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng cập nhật ngày sinh và giới tính. Đảm bảo có thể chọn ngày sinh từ dropdown và nhập giới tính.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra trường ngày sinh
4. Cập nhật ngày sinh
5. Cập nhật giới tính
6. Lưu thay đổi
7. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Dropdown ngày sinh hoạt động đúng
- [ ] Số ngày hợp lệ được cập nhật theo tháng/năm
- [ ] Cập nhật thành công và lưu đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Dropdown ngày sinh | ⬜ Pass / ⬜ Fail | |
| Cập nhật số ngày hợp lệ | ⬜ Pass / ⬜ Fail | |
| Cập nhật giới tính | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot dropdown ngày sinh
- [ ] Screenshot sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-038: Cập nhật địa chỉ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-038 |
| **Description Test case** | Kiểm tra chức năng cập nhật địa chỉ trong thông tin tài khoản. Địa chỉ này khác với địa chỉ giao hàng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Kiểm tra trường địa chỉ**<br>   - Scroll đến trường "Địa chỉ"<br>   - Kiểm tra hiển thị textarea với placeholder "Xã/Phường - Huyện/Quận - Tỉnh/Thành phố"<br>   - Kiểm tra giá trị hiện tại (nếu có)<br>4. **Cập nhật địa chỉ**<br>   - Click vào textarea "Địa chỉ"<br>   - Xóa giá trị cũ (nếu có)<br>   - Nhập địa chỉ mới (ví dụ: "Phường 1, Quận 1, TP.HCM")<br>5. **Lưu thay đổi**<br>   - Click nút "Lưu thay đổi"<br>   - Quan sát loading/processing<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra thông tin đã được cập nhật<br>   - Vào lại trang chỉnh sửa và kiểm tra địa chỉ mới đã được lưu |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Trường "Địa chỉ" hiển thị:<br>  - [ ] Textarea có thể nhập nhiều dòng<br>  - [ ] Placeholder "Xã/Phường - Huyện/Quận - Tỉnh/Thành phố"<br>  - [ ] Giá trị hiện tại (nếu có)<br>- [ ] Có thể nhập và chỉnh sửa địa chỉ<br>- [ ] Khi click "Lưu thay đổi":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật với địa chỉ mới<br>  - [ ] Hiển thị thông báo thành công<br>  - [ ] Thông tin được cập nhật<br>- [ ] Khi vào lại trang chỉnh sửa:<br>  - [ ] Địa chỉ mới được hiển thị đúng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trường địa chỉ<br>- [ ] Screenshot sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng cập nhật địa chỉ trong thông tin tài khoản. Địa chỉ này là địa chỉ cá nhân, khác với địa chỉ giao hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra trường địa chỉ
4. Cập nhật địa chỉ
5. Lưu thay đổi
6. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Textarea địa chỉ hoạt động đúng
- [ ] Cập nhật thành công và lưu đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị trường địa chỉ | ⬜ Pass / ⬜ Fail | |
| Cập nhật địa chỉ | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot trường địa chỉ
- [ ] Screenshot sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-039: Upload và thay đổi avatar

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-039 |
| **Description Test case** | Kiểm tra chức năng upload và thay đổi avatar (ảnh đại diện) của tài khoản. Đảm bảo có thể chọn ảnh từ thiết bị, validate kích thước và định dạng, và cập nhật avatar thành công. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa" hoặc "Thông tin tài khoản"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Kiểm tra avatar hiện tại**<br>   - Quan sát avatar hiện tại hiển thị ở đầu form<br>   - Kiểm tra nút "Đổi ảnh đại diện" hiển thị<br>4. **Click nút đổi ảnh đại diện**<br>   - Click vào nút "Đổi ảnh đại diện"<br>   - Quan sát file picker mở ra<br>5. **Chọn ảnh hợp lệ**<br>   - Chọn một ảnh từ thiết bị (JPG, PNG, WEBP, GIF)<br>   - Kích thước ảnh < 5MB<br>   - Quan sát loading/processing<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo "Đang tải ảnh lên..."<br>   - Quan sát thông báo "Đã cập nhật ảnh đại diện thành công"<br>   - Kiểm tra avatar mới hiển thị trên form<br>   - Kiểm tra avatar mới hiển thị trên trang Profile<br>7. **Kiểm tra với ảnh không hợp lệ**<br>   - Click "Đổi ảnh đại diện" lại<br>   - Chọn file không phải ảnh (ví dụ: .txt, .pdf)<br>   - Kiểm tra thông báo lỗi "Định dạng file không hợp lệ"<br>8. **Kiểm tra với ảnh quá lớn**<br>   - Click "Đổi ảnh đại diện" lại<br>   - Chọn ảnh có kích thước > 5MB<br>   - Kiểm tra thông báo lỗi "File quá lớn. Kích thước tối đa là 5MB" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Avatar hiện tại hiển thị ở đầu form<br>- [ ] Nút "Đổi ảnh đại diện" hiển thị rõ ràng<br>- [ ] Khi click "Đổi ảnh đại diện":<br>  - [ ] File picker mở ra<br>  - [ ] Chỉ cho phép chọn file ảnh (JPG, PNG, WEBP, GIF)<br>- [ ] Khi chọn ảnh hợp lệ (< 5MB):<br>  - [ ] Hiển thị loading "Đang tải ảnh lên..."<br>  - [ ] Upload ảnh lên server<br>  - [ ] Hiển thị thông báo "Đã cập nhật ảnh đại diện thành công"<br>  - [ ] Avatar mới hiển thị trên form ngay lập tức<br>  - [ ] Avatar mới hiển thị trên trang Profile<br>  - [ ] Avatar mới hiển thị ở header/avatar icon<br>- [ ] Khi chọn file không phải ảnh:<br>  - [ ] Hiển thị thông báo lỗi "Định dạng file không hợp lệ. Chỉ chấp nhận: JPG, PNG, WEBP, GIF"<br>  - [ ] Avatar không thay đổi<br>- [ ] Khi chọn ảnh > 5MB:<br>  - [ ] Hiển thị thông báo lỗi "File quá lớn. Kích thước tối đa là 5MB"<br>  - [ ] Avatar không thay đổi<br>- [ ] Avatar được crop/resize phù hợp với kích thước hiển thị (hình tròn) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Thiết bị có ít nhất một ảnh hợp lệ<br>- Thiết bị có file không phải ảnh (để test validation) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot avatar hiện tại<br>- [ ] Screenshot file picker<br>- [ ] Screenshot avatar mới<br>- [ ] Screenshot thông báo lỗi (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng upload và thay đổi avatar. Đảm bảo có thể upload ảnh hợp lệ và validate các trường hợp không hợp lệ.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Thiết bị có ít nhất một ảnh hợp lệ
- Thiết bị có file không phải ảnh (để test validation)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Kiểm tra avatar hiện tại
4. Click nút đổi ảnh đại diện
5. Chọn ảnh hợp lệ
6. Kiểm tra kết quả
7. Kiểm tra với ảnh không hợp lệ
8. Kiểm tra với ảnh quá lớn

### Kết quả mong đợi
- [ ] Upload ảnh hợp lệ thành công
- [ ] Validate và hiển thị lỗi với file không hợp lệ
- [ ] Avatar được cập nhật và hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút đổi avatar | ⬜ Pass / ⬜ Fail | |
| Upload ảnh hợp lệ | ⬜ Pass / ⬜ Fail | |
| Validate file không hợp lệ | ⬜ Pass / ⬜ Fail | |
| Validate file quá lớn | ⬜ Pass / ⬜ Fail | |
| Hiển thị avatar mới | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot avatar hiện tại
- [ ] Screenshot file picker
- [ ] Screenshot avatar mới
- [ ] Screenshot thông báo lỗi (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-040: Validation khi cập nhật thông tin

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-040 |
| **Description Test case** | Kiểm tra các validation khi cập nhật thông tin tài khoản. Đảm bảo hệ thống validate đúng các trường hợp lỗi và hiển thị thông báo phù hợp. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang chỉnh sửa profile**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Chỉnh sửa"<br>   - Xác nhận vào trang `/profile/edit`<br>3. **Test validation email không hợp lệ**<br>   - Click vào trường "Email"<br>   - Nhập email không hợp lệ (ví dụ: "emailkhonghople" hoặc "email@")<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra thông báo lỗi (nếu có validation client-side)<br>4. **Test validation email trống**<br>   - Xóa hết nội dung trường Email<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra có cho phép lưu email trống hay không<br>5. **Test validation họ tên trống**<br>   - Xóa hết nội dung trường "Họ và tên"<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra thông báo lỗi (nếu có validation)<br>6. **Test validation ngày sinh không hợp lệ**<br>   - Chọn ngày sinh trong tương lai (nếu có thể)<br>   - Hoặc để trống ngày sinh<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra validation<br>7. **Test lưu thành công với dữ liệu hợp lệ**<br>   - Nhập lại tất cả thông tin hợp lệ<br>   - Click "Lưu thay đổi"<br>   - Kiểm tra lưu thành công |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang chỉnh sửa profile thành công<br>- [ ] Validation email không hợp lệ:<br>  - [ ] Hiển thị thông báo lỗi (nếu có validation client-side)<br>  - [ ] Hoặc server trả về lỗi và hiển thị thông báo<br>- [ ] Validation email trống:<br>  - [ ] Có thể lưu email trống (nếu không bắt buộc)<br>  - [ ] Hoặc hiển thị thông báo bắt buộc (nếu bắt buộc)<br>- [ ] Validation họ tên trống:<br>  - [ ] Hiển thị thông báo lỗi "Họ và tên không được để trống" (nếu bắt buộc)<br>  - [ ] Hoặc cho phép lưu trống (nếu không bắt buộc)<br>- [ ] Validation ngày sinh:<br>  - [ ] Không cho phép chọn ngày trong tương lai<br>  - [ ] Hoặc hiển thị cảnh báo nếu chọn ngày trong tương lai<br>- [ ] Khi nhập dữ liệu hợp lệ:<br>  - [ ] Có thể lưu thành công<br>  - [ ] Hiển thị thông báo thành công<br>- [ ] Thông báo lỗi hiển thị rõ ràng, dễ hiểu<br>- [ ] Các trường lỗi được highlight (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot validation email không hợp lệ<br>- [ ] Screenshot validation các trường khác<br>- [ ] Screenshot thông báo lỗi<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra các validation khi cập nhật thông tin tài khoản. Đảm bảo hệ thống validate đúng và hiển thị thông báo phù hợp.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang chỉnh sửa profile
3. Test validation email không hợp lệ
4. Test validation email trống
5. Test validation họ tên trống
6. Test validation ngày sinh không hợp lệ
7. Test lưu thành công với dữ liệu hợp lệ

### Kết quả mong đợi
- [ ] Validation hoạt động đúng cho tất cả các trường
- [ ] Thông báo lỗi rõ ràng, dễ hiểu
- [ ] Có thể lưu với dữ liệu hợp lệ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Validation email | ⬜ Pass / ⬜ Fail | |
| Validation họ tên | ⬜ Pass / ⬜ Fail | |
| Validation ngày sinh | ⬜ Pass / ⬜ Fail | |
| Thông báo lỗi | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot validation email không hợp lệ
- [ ] Screenshot validation các trường khác
- [ ] Screenshot thông báo lỗi
- [ ] Screenshot log console (nếu có lỗi)

</details>

---



## TC-BHV-041: Thêm địa chỉ mới

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-041 |
| **Description Test case** | Kiểm tra chức năng thêm địa chỉ giao hàng mới. Đảm bảo có thể thêm địa chỉ với đầy đủ thông tin và lưu thành công. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ" hoặc vào trang `/shipping-address`<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Kiểm tra danh sách địa chỉ hiện tại**<br>   - Quan sát danh sách địa chỉ đã có (nếu có)<br>   - Kiểm tra nút "Thêm mới" hoặc "Thêm địa chỉ mới" hiển thị<br>4. **Click nút thêm địa chỉ mới**<br>   - Click vào nút "Thêm mới" hoặc "Thêm địa chỉ mới"<br>   - Xác nhận modal hoặc form thêm địa chỉ hiển thị<br>5. **Điền thông tin địa chỉ**<br>   - Nhập tên người nhận (ví dụ: "Nguyễn Văn A")<br>   - Nhập số điện thoại (ví dụ: "0901234567")<br>   - Chọn tỉnh/thành phố<br>   - Chọn quận/huyện<br>   - Chọn phường/xã<br>   - Nhập địa chỉ chi tiết (số nhà, tên đường)<br>6. **Lưu địa chỉ**<br>   - Click nút "Lưu" hoặc "Xác nhận"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ mới hiển thị trong danh sách<br>   - Kiểm tra modal/form đóng lại<br>8. **Kiểm tra với số lượng địa chỉ đã đạt giới hạn**<br>   - Nếu đã có 5 địa chỉ, click "Thêm mới"<br>   - Kiểm tra thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị (nếu có)<br>- [ ] Nút "Thêm mới" hiển thị rõ ràng<br>- [ ] Khi click "Thêm mới":<br>  - [ ] Modal hoặc form thêm địa chỉ hiển thị<br>  - [ ] Form có các trường:<br>    - [ ] Tên người nhận<br>    - [ ] Số điện thoại<br>    - [ ] Tỉnh/Thành phố (dropdown hoặc picker)<br>    - [ ] Quận/Huyện (dropdown, filter theo tỉnh đã chọn)<br>    - [ ] Phường/Xã (dropdown, filter theo quận đã chọn)<br>    - [ ] Địa chỉ chi tiết (textarea hoặc input)<br>- [ ] Khi điền đầy đủ thông tin và click "Lưu":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API lưu địa chỉ<br>  - [ ] Hiển thị thông báo "Đã thêm địa chỉ" hoặc tương tự<br>  - [ ] Địa chỉ mới hiển thị trong danh sách<br>  - [ ] Modal/form đóng lại<br>- [ ] Khi đã có 5 địa chỉ:<br>  - [ ] Click "Thêm mới" hiển thị thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ"<br>  - [ ] Modal/form không mở ra<br>- [ ] Địa chỉ mới có thể được chọn làm địa chỉ giao hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít hơn 5 địa chỉ (để test thêm mới)<br>- Người dùng có đủ 5 địa chỉ (để test giới hạn) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form thêm địa chỉ<br>- [ ] Screenshot địa chỉ mới trong danh sách<br>- [ ] Screenshot thông báo giới hạn (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng thêm địa chỉ giao hàng mới. Đảm bảo có thể thêm địa chỉ với đầy đủ thông tin và validate giới hạn số lượng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít hơn 5 địa chỉ (để test thêm mới)
- Người dùng có đủ 5 địa chỉ (để test giới hạn)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Kiểm tra danh sách địa chỉ hiện tại
4. Click nút thêm địa chỉ mới
5. Điền thông tin địa chỉ
6. Lưu địa chỉ
7. Kiểm tra kết quả
8. Kiểm tra với số lượng địa chỉ đã đạt giới hạn

### Kết quả mong đợi
- [ ] Form thêm địa chỉ hiển thị đầy đủ
- [ ] Có thể thêm địa chỉ mới thành công
- [ ] Validate giới hạn 5 địa chỉ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form thêm | ⬜ Pass / ⬜ Fail | |
| Điền thông tin | ⬜ Pass / ⬜ Fail | |
| Lưu thành công | ⬜ Pass / ⬜ Fail | |
| Giới hạn 5 địa chỉ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form thêm địa chỉ
- [ ] Screenshot địa chỉ mới trong danh sách
- [ ] Screenshot thông báo giới hạn (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-042: Sửa địa chỉ đã có

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-042 |
| **Description Test case** | Kiểm tra chức năng sửa địa chỉ đã có. Đảm bảo có thể chỉnh sửa thông tin địa chỉ và cập nhật thành công. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Tìm địa chỉ cần sửa**<br>   - Quan sát danh sách địa chỉ<br>   - Chọn một địa chỉ bất kỳ<br>   - Kiểm tra nút "Sửa" hoặc icon edit hiển thị<br>4. **Click nút sửa**<br>   - Click vào nút "Sửa" hoặc icon edit<br>   - Xác nhận modal hoặc form sửa địa chỉ hiển thị<br>   - Kiểm tra các trường đã được điền sẵn với giá trị hiện tại<br>5. **Chỉnh sửa thông tin**<br>   - Sửa tên người nhận (ví dụ: đổi từ "Nguyễn Văn A" thành "Nguyễn Văn B")<br>   - Sửa số điện thoại (nếu cần)<br>   - Sửa địa chỉ chi tiết (nếu cần)<br>   - Hoặc thay đổi tỉnh/quận/phường<br>6. **Lưu thay đổi**<br>   - Click nút "Lưu" hoặc "Cập nhật"<br>   - Quan sát loading/processing<br>7. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ đã được cập nhật trong danh sách<br>   - Kiểm tra modal/form đóng lại<br>   - Kiểm tra thông tin mới hiển thị đúng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị<br>- [ ] Mỗi địa chỉ có nút "Sửa" hoặc icon edit<br>- [ ] Khi click "Sửa":<br>  - [ ] Modal hoặc form sửa địa chỉ hiển thị<br>  - [ ] Các trường đã được điền sẵn với giá trị hiện tại:<br>    - [ ] Tên người nhận<br>    - [ ] Số điện thoại<br>    - [ ] Tỉnh/Thành phố<br>    - [ ] Quận/Huyện<br>    - [ ] Phường/Xã<br>    - [ ] Địa chỉ chi tiết<br>- [ ] Có thể chỉnh sửa tất cả các trường<br>- [ ] Khi click "Lưu" hoặc "Cập nhật":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API cập nhật địa chỉ<br>  - [ ] Hiển thị thông báo "Đã cập nhật địa chỉ" hoặc tương tự<br>  - [ ] Địa chỉ được cập nhật trong danh sách<br>  - [ ] Modal/form đóng lại<br>- [ ] Thông tin mới hiển thị đúng trong danh sách<br>- [ ] Nếu địa chỉ đang là mặc định, vẫn giữ nguyên trạng thái mặc định sau khi sửa |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất một địa chỉ đã lưu |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot form sửa địa chỉ<br>- [ ] Screenshot địa chỉ sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng sửa địa chỉ đã có. Đảm bảo có thể chỉnh sửa thông tin và cập nhật thành công.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất một địa chỉ đã lưu

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Tìm địa chỉ cần sửa
4. Click nút sửa
5. Chỉnh sửa thông tin
6. Lưu thay đổi
7. Kiểm tra kết quả

### Kết quả mong đợi
- [ ] Form sửa hiển thị với giá trị hiện tại
- [ ] Có thể chỉnh sửa và cập nhật thành công
- [ ] Thông tin được cập nhật đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị form sửa | ⬜ Pass / ⬜ Fail | |
| Chỉnh sửa thông tin | ⬜ Pass / ⬜ Fail | |
| Cập nhật thành công | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot form sửa địa chỉ
- [ ] Screenshot địa chỉ sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-043: Xóa địa chỉ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-043 |
| **Description Test case** | Kiểm tra chức năng xóa địa chỉ. Đảm bảo có thể xóa địa chỉ và có xác nhận trước khi xóa. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Tìm địa chỉ cần xóa**<br>   - Quan sát danh sách địa chỉ<br>   - Chọn một địa chỉ không phải địa chỉ mặc định (nếu có nhiều địa chỉ)<br>   - Kiểm tra nút "Xóa" hoặc icon delete hiển thị<br>4. **Click nút xóa**<br>   - Click vào nút "Xóa" hoặc icon delete<br>   - Quan sát hành vi của ứng dụng<br>5. **Xác nhận xóa (nếu có modal xác nhận)**<br>   - Kiểm tra modal xác nhận hiển thị (nếu có)<br>   - Click "Xác nhận" hoặc "Xóa"<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ đã bị xóa khỏi danh sách<br>   - Kiểm tra danh sách cập nhật lại<br>7. **Kiểm tra xóa địa chỉ mặc định**<br>   - Chọn địa chỉ mặc định<br>   - Click "Xóa"<br>   - Kiểm tra có thể xóa được hay không (có thể cần chuyển mặc định trước) |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị<br>- [ ] Mỗi địa chỉ có nút "Xóa" hoặc icon delete<br>- [ ] Khi click "Xóa":<br>  - [ ] Hiển thị modal xác nhận (nếu có)<br>  - [ ] Hoặc xóa trực tiếp với thông báo xác nhận<br>- [ ] Khi xác nhận xóa:<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API xóa địa chỉ<br>  - [ ] Hiển thị thông báo "Đã xóa địa chỉ"<br>  - [ ] Địa chỉ bị xóa khỏi danh sách<br>  - [ ] Danh sách cập nhật lại<br>- [ ] Khi hủy xóa (nếu có modal):<br>  - [ ] Modal đóng lại<br>  - [ ] Địa chỉ không bị xóa<br>- [ ] Với địa chỉ mặc định:<br>  - [ ] Có thể xóa được (sau khi chuyển mặc định cho địa chỉ khác)<br>  - [ ] Hoặc không cho phép xóa và hiển thị thông báo<br>- [ ] Nếu chỉ còn 1 địa chỉ:<br>  - [ ] Có thể không cho phép xóa<br>  - [ ] Hoặc cho phép xóa và danh sách trống |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất 2 địa chỉ (để test xóa)<br>- Người dùng có địa chỉ mặc định |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút xóa<br>- [ ] Screenshot modal xác nhận (nếu có)<br>- [ ] Screenshot danh sách sau khi xóa<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xóa địa chỉ. Đảm bảo có thể xóa địa chỉ với xác nhận và xử lý các trường hợp đặc biệt.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất 2 địa chỉ (để test xóa)
- Người dùng có địa chỉ mặc định

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Tìm địa chỉ cần xóa
4. Click nút xóa
5. Xác nhận xóa (nếu có modal xác nhận)
6. Kiểm tra kết quả
7. Kiểm tra xóa địa chỉ mặc định

### Kết quả mong đợi
- [ ] Có thể xóa địa chỉ với xác nhận
- [ ] Xử lý đúng các trường hợp đặc biệt (địa chỉ mặc định, chỉ còn 1 địa chỉ)
- [ ] Danh sách cập nhật đúng sau khi xóa

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút xóa | ⬜ Pass / ⬜ Fail | |
| Xác nhận xóa | ⬜ Pass / ⬜ Fail | |
| Xóa thành công | ⬜ Pass / ⬜ Fail | |
| Xử lý địa chỉ mặc định | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot nút xóa
- [ ] Screenshot modal xác nhận (nếu có)
- [ ] Screenshot danh sách sau khi xóa
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-044: Đặt địa chỉ mặc định

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-044 |
| **Description Test case** | Kiểm tra chức năng đặt địa chỉ mặc định. Đảm bảo có thể chọn một địa chỉ làm mặc định và chỉ có một địa chỉ mặc định tại một thời điểm. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Kiểm tra địa chỉ mặc định hiện tại**<br>   - Quan sát danh sách địa chỉ<br>   - Tìm địa chỉ có badge "Mặc định"<br>   - Ghi nhận địa chỉ mặc định hiện tại<br>4. **Chọn địa chỉ khác làm mặc định**<br>   - Chọn một địa chỉ không phải mặc định<br>   - Tìm nút hoặc option "Đặt làm mặc định"<br>   - Click vào nút/option đó<br>5. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra địa chỉ mới có badge "Mặc định"<br>   - Kiểm tra địa chỉ cũ không còn badge "Mặc định"<br>   - Kiểm tra chỉ có 1 địa chỉ có badge "Mặc định"<br>6. **Kiểm tra địa chỉ mặc định được sử dụng**<br>   - Vào trang checkout hoặc giỏ hàng<br>   - Kiểm tra địa chỉ mặc định được chọn tự động |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Danh sách địa chỉ hiển thị<br>- [ ] Có một địa chỉ có badge "Mặc định" (nếu có địa chỉ)<br>- [ ] Các địa chỉ khác có nút hoặc option "Đặt làm mặc định"<br>- [ ] Khi click "Đặt làm mặc định":<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API đặt địa chỉ mặc định<br>  - [ ] Hiển thị thông báo "Đã đặt làm địa chỉ mặc định"<br>  - [ ] Địa chỉ mới có badge "Mặc định"<br>  - [ ] Địa chỉ cũ không còn badge "Mặc định"<br>  - [ ] Chỉ có 1 địa chỉ có badge "Mặc định"<br>- [ ] Địa chỉ mặc định được sử dụng tự động khi:<br>  - [ ] Vào trang checkout<br>  - [ ] Chọn địa chỉ giao hàng<br>- [ ] Nếu không có địa chỉ mặc định:<br>  - [ ] Có thể chọn địa chỉ đầu tiên làm mặc định<br>  - [ ] Hoặc yêu cầu đặt mặc định trước |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít nhất 2 địa chỉ |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot địa chỉ mặc định hiện tại<br>- [ ] Screenshot sau khi đặt mặc định mới<br>- [ ] Screenshot địa chỉ mặc định trong checkout<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng đặt địa chỉ mặc định. Đảm bảo chỉ có một địa chỉ mặc định và được sử dụng tự động.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít nhất 2 địa chỉ

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Kiểm tra địa chỉ mặc định hiện tại
4. Chọn địa chỉ khác làm mặc định
5. Kiểm tra kết quả
6. Kiểm tra địa chỉ mặc định được sử dụng

### Kết quả mong đợi
- [ ] Có thể đặt địa chỉ mặc định
- [ ] Chỉ có 1 địa chỉ mặc định tại một thời điểm
- [ ] Địa chỉ mặc định được sử dụng tự động

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị badge mặc định | ⬜ Pass / ⬜ Fail | |
| Đặt mặc định mới | ⬜ Pass / ⬜ Fail | |
| Chỉ 1 địa chỉ mặc định | ⬜ Pass / ⬜ Fail | |
| Sử dụng tự động | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot địa chỉ mặc định hiện tại
- [ ] Screenshot sau khi đặt mặc định mới
- [ ] Screenshot địa chỉ mặc định trong checkout
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-045: Giới hạn số lượng địa chỉ (tối đa 5)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-045 |
| **Description Test case** | Kiểm tra giới hạn số lượng địa chỉ tối đa là 5. Đảm bảo không thể thêm địa chỉ khi đã đạt giới hạn. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang quản lý địa chỉ**<br>   - Click vào icon Profile<br>   - Vào trang Profile<br>   - Click vào nút "Quản lý số địa chỉ"<br>   - Xác nhận vào trang quản lý địa chỉ<br>3. **Kiểm tra số lượng địa chỉ hiện tại**<br>   - Đếm số lượng địa chỉ trong danh sách<br>   - Ghi nhận số lượng<br>4. **Thêm địa chỉ cho đến khi đạt 5 địa chỉ**<br>   - Nếu chưa đủ 5 địa chỉ, thêm địa chỉ mới cho đến khi có đủ 5 địa chỉ<br>   - Xác nhận có đúng 5 địa chỉ<br>5. **Thử thêm địa chỉ thứ 6**<br>   - Click vào nút "Thêm mới" hoặc "Thêm địa chỉ mới"<br>   - Quan sát hành vi của ứng dụng<br>6. **Kiểm tra thông báo giới hạn**<br>   - Kiểm tra thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ" hiển thị<br>   - Kiểm tra modal/form không mở ra<br>7. **Kiểm tra sau khi xóa một địa chỉ**<br>   - Xóa một địa chỉ bất kỳ<br>   - Kiểm tra còn 4 địa chỉ<br>   - Thử thêm địa chỉ mới<br>   - Kiểm tra có thể thêm được |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang quản lý địa chỉ thành công<br>- [ ] Có thể thêm địa chỉ khi chưa đạt giới hạn<br>- [ ] Khi đã có 5 địa chỉ:<br>  - [ ] Click "Thêm mới" hiển thị thông báo "Bạn chỉ có thể thêm tối đa 5 địa chỉ"<br>  - [ ] Modal/form thêm địa chỉ không mở ra<br>  - [ ] Nút "Thêm mới" có thể bị disable hoặc vẫn hiển thị nhưng có validation<br>- [ ] Thông báo giới hạn hiển thị rõ ràng, dễ hiểu<br>- [ ] Sau khi xóa một địa chỉ:<br>  - [ ] Có thể thêm địa chỉ mới<br>  - [ ] Không còn thông báo giới hạn<br>- [ ] Giới hạn được kiểm tra cả ở client-side và server-side |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Người dùng có ít hơn 5 địa chỉ (để test thêm đến 5)<br>- Hoặc người dùng đã có 5 địa chỉ (để test giới hạn) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách 5 địa chỉ<br>- [ ] Screenshot thông báo giới hạn<br>- [ ] Screenshot sau khi xóa và thêm lại<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra giới hạn số lượng địa chỉ tối đa là 5. Đảm bảo không thể thêm địa chỉ khi đã đạt giới hạn và có thể thêm lại sau khi xóa.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Người dùng có ít hơn 5 địa chỉ (để test thêm đến 5)
- Hoặc người dùng đã có 5 địa chỉ (để test giới hạn)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang quản lý địa chỉ
3. Kiểm tra số lượng địa chỉ hiện tại
4. Thêm địa chỉ cho đến khi đạt 5 địa chỉ
5. Thử thêm địa chỉ thứ 6
6. Kiểm tra thông báo giới hạn
7. Kiểm tra sau khi xóa một địa chỉ

### Kết quả mong đợi
- [ ] Giới hạn 5 địa chỉ được enforce đúng
- [ ] Thông báo giới hạn hiển thị rõ ràng
- [ ] Có thể thêm lại sau khi xóa

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Thêm đến 5 địa chỉ | ⬜ Pass / ⬜ Fail | |
| Thông báo giới hạn | ⬜ Pass / ⬜ Fail | |
| Không thể thêm địa chỉ thứ 6 | ⬜ Pass / ⬜ Fail | |
| Thêm lại sau khi xóa | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot danh sách 5 địa chỉ
- [ ] Screenshot thông báo giới hạn
- [ ] Screenshot sau khi xóa và thêm lại
- [ ] Screenshot log console (nếu có lỗi)

</details>

---



## TC-BHV-046: Xem danh sách thông báo

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-046 |
| **Description Test case** | Kiểm tra chức năng xem danh sách thông báo. Đảm bảo có thể mở modal thông báo và xem tất cả thông báo. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Mở modal thông báo**<br>   - Quan sát icon chuông ở header<br>   - Kiểm tra badge số lượng thông báo chưa đọc (nếu có)<br>   - Click vào icon chuông<br>   - Xác nhận modal thông báo mở ra<br>3. **Kiểm tra cấu trúc modal**<br>   - Quan sát header modal:<br>     - Tiêu đề "Thông báo"<br>     - Nút đóng (back arrow)<br>   - Quan sát các tab:<br>     - Tab "Tất cả"<br>     - Tab "Đơn hàng"<br>     - Tab "Voucher"<br>   - Quan sát danh sách thông báo<br>4. **Kiểm tra danh sách thông báo**<br>   - Quan sát mỗi thông báo hiển thị:<br>     - Tiêu đề thông báo<br>     - Nội dung thông báo<br>     - Hình ảnh (nếu có)<br>     - Thời gian (ví dụ: "5 phút trước", "2 giờ trước")<br>     - Badge "chưa đọc" (nếu có)<br>5. **Kiểm tra empty state**<br>   - Nếu không có thông báo, kiểm tra hiển thị "Không có thông báo nào"<br>6. **Đóng modal**<br>   - Click vào nút đóng hoặc click outside modal<br>   - Kiểm tra modal đóng lại |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Icon chuông hiển thị ở header<br>- [ ] Badge số lượng thông báo chưa đọc hiển thị (nếu có thông báo chưa đọc)<br>- [ ] Khi click icon chuông:<br>  - [ ] Modal thông báo mở ra từ dưới lên (slide up animation)<br>  - [ ] Modal có overlay backdrop<br>- [ ] Modal hiển thị đầy đủ:<br>  - [ ] Header với tiêu đề "Thông báo"<br>  - [ ] Nút đóng (back arrow) ở góc trái<br>  - [ ] Các tab: "Tất cả", "Đơn hàng", "Voucher"<br>  - [ ] Tab "Tất cả" được chọn mặc định<br>- [ ] Danh sách thông báo hiển thị:<br>  - [ ] Mỗi thông báo có:<br>    - [ ] Tiêu đề (title) nổi bật<br>    - [ ] Nội dung (content) đầy đủ hoặc truncated<br>    - [ ] Hình ảnh sản phẩm hoặc voucher (nếu có)<br>    - [ ] Thời gian (format: "Vừa xong", "X phút trước", "X giờ trước", "X ngày trước", hoặc ngày tháng)<br>    - [ ] Badge "chưa đọc" (điểm đỏ hoặc indicator) nếu is_read = 0<br>- [ ] Thông báo chưa đọc có border màu đỏ hoặc highlight<br>- [ ] Nếu không có thông báo:<br>  - [ ] Hiển thị empty state "Không có thông báo nào"<br>- [ ] Khi click đóng:<br>  - [ ] Modal đóng lại với animation slide down<br>  - [ ] Overlay biến mất |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có ít nhất một thông báo trong hệ thống (để test hiển thị)<br>- Có thông báo chưa đọc (để test badge) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot icon chuông với badge<br>- [ ] Screenshot modal thông báo<br>- [ ] Screenshot danh sách thông báo<br>- [ ] Screenshot empty state (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem danh sách thông báo. Đảm bảo có thể mở modal và xem tất cả thông báo với đầy đủ thông tin.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có ít nhất một thông báo trong hệ thống (để test hiển thị)
- Có thông báo chưa đọc (để test badge)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Mở modal thông báo
3. Kiểm tra cấu trúc modal
4. Kiểm tra danh sách thông báo
5. Kiểm tra empty state
6. Đóng modal

### Kết quả mong đợi
- [ ] Modal mở và đóng mượt mà
- [ ] Danh sách thông báo hiển thị đầy đủ thông tin
- [ ] Badge số lượng chưa đọc hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Mở modal | ⬜ Pass / ⬜ Fail | |
| Hiển thị danh sách | ⬜ Pass / ⬜ Fail | |
| Badge số lượng | ⬜ Pass / ⬜ Fail | |
| Empty state | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot icon chuông với badge
- [ ] Screenshot modal thông báo
- [ ] Screenshot danh sách thông báo
- [ ] Screenshot empty state (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-047: Filter thông báo theo tab (Tất cả, Đơn hàng, Voucher)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-047 |
| **Description Test case** | Kiểm tra chức năng filter thông báo theo các tab khác nhau. Đảm bảo có thể xem thông báo theo từng loại (Tất cả, Đơn hàng, Voucher). |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Mở modal thông báo**<br>   - Click vào icon chuông ở header<br>   - Xác nhận modal thông báo mở ra<br>3. **Kiểm tra tab "Tất cả"**<br>   - Quan sát tab "Tất cả" được chọn mặc định<br>   - Kiểm tra danh sách hiển thị tất cả thông báo<br>   - Kiểm tra badge số lượng thông báo chưa đọc (nếu có)<br>4. **Chuyển sang tab "Đơn hàng"**<br>   - Click vào tab "Đơn hàng"<br>   - Quan sát tab được highlight<br>   - Kiểm tra danh sách chỉ hiển thị thông báo về đơn hàng<br>   - Kiểm tra badge số lượng thông báo đơn hàng (nếu có)<br>5. **Chuyển sang tab "Voucher"**<br>   - Click vào tab "Voucher"<br>   - Quan sát tab được highlight<br>   - Kiểm tra danh sách chỉ hiển thị thông báo về voucher<br>6. **Quay lại tab "Tất cả"**<br>   - Click vào tab "Tất cả"<br>   - Kiểm tra danh sách hiển thị lại tất cả thông báo<br>7. **Kiểm tra với tab không có thông báo**<br>   - Chọn tab không có thông báo (ví dụ: tab "Voucher" nếu không có thông báo voucher)<br>   - Kiểm tra hiển thị empty state "Không có thông báo nào" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Mở modal thông báo thành công<br>- [ ] Tab "Tất cả" được chọn mặc định:<br>  - [ ] Tab được highlight (màu xanh, border bottom)<br>  - [ ] Hiển thị tất cả thông báo<br>  - [ ] Badge số lượng thông báo chưa đọc hiển thị (nếu có)<br>- [ ] Khi click tab "Đơn hàng":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị thông báo có type = "order" hoặc title chứa "đơn hàng"<br>  - [ ] Badge số lượng thông báo đơn hàng hiển thị (nếu có)<br>- [ ] Khi click tab "Voucher":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị thông báo có type = "voucher" hoặc title chứa "voucher"<br>- [ ] Khi quay lại tab "Tất cả":<br>  - [ ] Hiển thị lại tất cả thông báo<br>- [ ] Với tab không có thông báo:<br>  - [ ] Hiển thị empty state "Không có thông báo nào"<br>- [ ] Chuyển đổi giữa các tab mượt mà, không bị lag<br>- [ ] Danh sách được filter đúng theo từng tab |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có thông báo về đơn hàng trong hệ thống<br>- Có thông báo về voucher trong hệ thống<br>- Có thông báo loại khác (để test tab "Tất cả") |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot tab "Tất cả"<br>- [ ] Screenshot tab "Đơn hàng"<br>- [ ] Screenshot tab "Voucher"<br>- [ ] Screenshot empty state (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng filter thông báo theo các tab. Đảm bảo có thể xem thông báo theo từng loại một cách dễ dàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có thông báo về đơn hàng trong hệ thống
- Có thông báo về voucher trong hệ thống
- Có thông báo loại khác (để test tab "Tất cả")

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Mở modal thông báo
3. Kiểm tra tab "Tất cả"
4. Chuyển sang tab "Đơn hàng"
5. Chuyển sang tab "Voucher"
6. Quay lại tab "Tất cả"
7. Kiểm tra với tab không có thông báo

### Kết quả mong đợi
- [ ] Filter hoạt động đúng cho từng tab
- [ ] Chuyển đổi tab mượt mà
- [ ] Badge số lượng hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Tab "Tất cả" | ⬜ Pass / ⬜ Fail | |
| Tab "Đơn hàng" | ⬜ Pass / ⬜ Fail | |
| Tab "Voucher" | ⬜ Pass / ⬜ Fail | |
| Filter đúng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot tab "Tất cả"
- [ ] Screenshot tab "Đơn hàng"
- [ ] Screenshot tab "Voucher"
- [ ] Screenshot empty state (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-048: Xem chi tiết thông báo đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-048 |
| **Description Test case** | Kiểm tra chức năng xem chi tiết thông báo đơn hàng. Đảm bảo có thể click vào thông báo đơn hàng để xem chi tiết đơn hàng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Mở modal thông báo**<br>   - Click vào icon chuông ở header<br>   - Xác nhận modal thông báo mở ra<br>3. **Tìm thông báo đơn hàng**<br>   - Vào tab "Đơn hàng" hoặc "Tất cả"<br>   - Tìm một thông báo về đơn hàng<br>   - Quan sát thông báo hiển thị:<br>     - Tiêu đề (ví dụ: "Đơn hàng #12345 đã được xác nhận")<br>     - Nội dung<br>     - Hình ảnh sản phẩm (nếu có)<br>     - Icon đơn hàng<br>4. **Click vào thông báo đơn hàng**<br>   - Click vào thông báo đơn hàng<br>   - Quan sát hành vi của ứng dụng<br>5. **Kiểm tra điều hướng**<br>   - Kiểm tra modal thông báo đóng lại<br>   - Kiểm tra điều hướng đến trang chi tiết đơn hàng<br>   - Kiểm tra URL = `/order/:id` với id là ID đơn hàng<br>6. **Kiểm tra trang chi tiết đơn hàng**<br>   - Xác nhận trang chi tiết đơn hàng hiển thị<br>   - Kiểm tra thông tin đơn hàng đúng với thông báo |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Mở modal thông báo thành công<br>- [ ] Thông báo đơn hàng hiển thị:<br>  - [ ] Tiêu đề về đơn hàng<br>  - [ ] Nội dung mô tả đơn hàng<br>  - [ ] Hình ảnh sản phẩm (nếu có)<br>  - [ ] Icon đơn hàng (shopping bag icon)<br>  - [ ] Mã đơn hàng hoặc thông tin đơn hàng<br>- [ ] Khi click vào thông báo đơn hàng:<br>  - [ ] Modal thông báo đóng lại<br>  - [ ] Điều hướng đến trang chi tiết đơn hàng<br>  - [ ] URL = `/order/:id` với id đúng<br>- [ ] Trang chi tiết đơn hàng hiển thị:<br>  - [ ] Thông tin đơn hàng đúng với thông báo<br>  - [ ] Mã đơn hàng khớp<br>  - [ ] Trạng thái đơn hàng đúng<br>- [ ] Thông báo được đánh dấu là đã đọc (nếu có logic tự động) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có ít nhất một thông báo về đơn hàng trong hệ thống<br>- Đơn hàng trong thông báo vẫn tồn tại |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot thông báo đơn hàng<br>- [ ] Screenshot trang chi tiết đơn hàng<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem chi tiết thông báo đơn hàng. Đảm bảo có thể click vào thông báo để xem chi tiết đơn hàng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có ít nhất một thông báo về đơn hàng trong hệ thống
- Đơn hàng trong thông báo vẫn tồn tại

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Mở modal thông báo
3. Tìm thông báo đơn hàng
4. Click vào thông báo đơn hàng
5. Kiểm tra điều hướng
6. Kiểm tra trang chi tiết đơn hàng

### Kết quả mong đợi
- [ ] Click thông báo điều hướng đúng đến đơn hàng
- [ ] Modal đóng lại khi điều hướng
- [ ] Thông tin đơn hàng hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị thông báo đơn hàng | ⬜ Pass / ⬜ Fail | |
| Click điều hướng | ⬜ Pass / ⬜ Fail | |
| Trang chi tiết đơn hàng | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot thông báo đơn hàng
- [ ] Screenshot trang chi tiết đơn hàng
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-049: Đánh dấu đã đọc thông báo

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-049 |
| **Description Test case** | Kiểm tra chức năng đánh dấu thông báo là đã đọc. Đảm bảo khi xem thông báo, trạng thái "chưa đọc" được cập nhật thành "đã đọc". |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Kiểm tra badge số lượng chưa đọc**<br>   - Quan sát icon chuông ở header<br>   - Ghi nhận số lượng thông báo chưa đọc (nếu có badge)<br>3. **Mở modal thông báo**<br>   - Click vào icon chuông<br>   - Xác nhận modal mở ra<br>4. **Tìm thông báo chưa đọc**<br>   - Quan sát danh sách thông báo<br>   - Tìm thông báo có badge "chưa đọc" (điểm đỏ hoặc indicator)<br>   - Ghi nhận số lượng thông báo chưa đọc<br>5. **Xem thông báo chưa đọc**<br>   - Click vào một thông báo chưa đọc<br>   - Hoặc scroll qua thông báo chưa đọc<br>   - Quan sát hành vi của ứng dụng<br>6. **Kiểm tra cập nhật trạng thái**<br>   - Đóng modal và mở lại<br>   - Kiểm tra thông báo đã xem không còn badge "chưa đọc"<br>   - Kiểm tra badge số lượng chưa đọc ở icon chuông giảm đi<br>7. **Kiểm tra với nhiều thông báo**<br>   - Xem nhiều thông báo chưa đọc<br>   - Kiểm tra tất cả đều được đánh dấu đã đọc<br>   - Kiểm tra badge số lượng cập nhật đúng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Badge số lượng thông báo chưa đọc hiển thị ở icon chuông (nếu có thông báo chưa đọc)<br>- [ ] Thông báo chưa đọc có indicator:<br>  - [ ] Điểm đỏ (red dot)<br>  - [ ] Hoặc border màu đỏ<br>  - [ ] Hoặc background khác màu<br>- [ ] Khi xem thông báo chưa đọc:<br>  - [ ] Tự động đánh dấu là đã đọc (nếu có logic tự động)<br>  - [ ] Hoặc cần click để đánh dấu đã đọc<br>  - [ ] Indicator "chưa đọc" biến mất<br>  - [ ] Badge số lượng chưa đọc giảm đi<br>- [ ] Khi đóng và mở lại modal:<br>  - [ ] Thông báo đã xem không còn indicator "chưa đọc"<br>  - [ ] Badge số lượng chưa đọc cập nhật đúng<br>- [ ] Khi xem nhiều thông báo:<br>  - [ ] Tất cả đều được đánh dấu đã đọc<br>  - [ ] Badge số lượng = 0 khi không còn thông báo chưa đọc<br>- [ ] Thông báo đã đọc vẫn hiển thị trong danh sách nhưng không có indicator |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có ít nhất 2-3 thông báo chưa đọc trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot badge số lượng chưa đọc<br>- [ ] Screenshot thông báo chưa đọc<br>- [ ] Screenshot thông báo sau khi đánh dấu đã đọc<br>- [ ] Screenshot badge sau khi cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng đánh dấu thông báo là đã đọc. Đảm bảo trạng thái được cập nhật đúng và badge số lượng được cập nhật.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có ít nhất 2-3 thông báo chưa đọc trong hệ thống

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Kiểm tra badge số lượng chưa đọc
3. Mở modal thông báo
4. Tìm thông báo chưa đọc
5. Xem thông báo chưa đọc
6. Kiểm tra cập nhật trạng thái
7. Kiểm tra với nhiều thông báo

### Kết quả mong đợi
- [ ] Thông báo được đánh dấu đã đọc khi xem
- [ ] Badge số lượng cập nhật đúng
- [ ] Indicator "chưa đọc" biến mất

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Badge số lượng ban đầu | ⬜ Pass / ⬜ Fail | |
| Đánh dấu đã đọc | ⬜ Pass / ⬜ Fail | |
| Cập nhật badge | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot badge số lượng chưa đọc
- [ ] Screenshot thông báo chưa đọc
- [ ] Screenshot thông báo sau khi đánh dấu đã đọc
- [ ] Screenshot badge sau khi cập nhật
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-050: Hiển thị số lượng thông báo chưa đọc

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-050 |
| **Description Test case** | Kiểm tra hiển thị số lượng thông báo chưa đọc trên icon chuông ở header. Đảm bảo badge hiển thị đúng số lượng và cập nhật real-time. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Kiểm tra badge khi có thông báo chưa đọc**<br>   - Quan sát icon chuông ở header<br>   - Kiểm tra badge số lượng hiển thị (nếu có thông báo chưa đọc)<br>   - Ghi nhận số lượng<br>3. **Mở modal và đếm thông báo chưa đọc**<br>   - Click vào icon chuông<br>   - Đếm số lượng thông báo có indicator "chưa đọc"<br>   - So sánh với số lượng trên badge<br>4. **Kiểm tra badge khi không có thông báo chưa đọc**<br>   - Đánh dấu tất cả thông báo là đã đọc<br>   - Đóng modal<br>   - Kiểm tra badge không còn hiển thị<br>5. **Kiểm tra cập nhật real-time**<br>   - Mở modal thông báo<br>   - Xem một thông báo chưa đọc<br>   - Đóng modal<br>   - Kiểm tra badge số lượng giảm đi ngay lập tức<br>6. **Kiểm tra với số lượng lớn**<br>   - Nếu có > 99 thông báo chưa đọc<br>   - Kiểm tra badge hiển thị "99+" hoặc tương tự |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Khi có thông báo chưa đọc:<br>  - [ ] Badge số lượng hiển thị trên icon chuông<br>  - [ ] Badge có màu nổi bật (thường là đỏ)<br>  - [ ] Số lượng trên badge = số lượng thông báo có is_read = 0<br>  - [ ] Badge hiển thị số (ví dụ: "3", "10")<br>- [ ] Khi không có thông báo chưa đọc:<br>  - [ ] Badge không hiển thị<br>  - [ ] Icon chuông không có badge<br>- [ ] Badge cập nhật real-time:<br>  - [ ] Khi xem thông báo, badge giảm đi ngay lập tức<br>  - [ ] Khi có thông báo mới, badge tăng lên (nếu có logic real-time)<br>- [ ] Với số lượng > 99:<br>  - [ ] Badge hiển thị "99+" hoặc tương tự<br>  - [ ] Hoặc hiển thị số thực tế nếu không có giới hạn<br>- [ ] Badge hiển thị rõ ràng, dễ nhìn<br>- [ ] Badge không che khuất icon chuông |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Có thông báo chưa đọc trong hệ thống (để test hiển thị badge)<br>- Có thể tạo thông báo mới (để test cập nhật real-time) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot badge số lượng<br>- [ ] Screenshot khi không có badge<br>- [ ] Screenshot badge sau khi cập nhật<br>- [ ] Screenshot badge với số lượng lớn (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị số lượng thông báo chưa đọc trên icon chuông. Đảm bảo badge hiển thị đúng và cập nhật real-time.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Có thông báo chưa đọc trong hệ thống (để test hiển thị badge)
- Có thể tạo thông báo mới (để test cập nhật real-time)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Kiểm tra badge khi có thông báo chưa đọc
3. Mở modal và đếm thông báo chưa đọc
4. Kiểm tra badge khi không có thông báo chưa đọc
5. Kiểm tra cập nhật real-time
6. Kiểm tra với số lượng lớn

### Kết quả mong đợi
- [ ] Badge hiển thị đúng số lượng
- [ ] Badge ẩn khi không có thông báo chưa đọc
- [ ] Badge cập nhật real-time

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị badge | ⬜ Pass / ⬜ Fail | |
| Số lượng đúng | ⬜ Pass / ⬜ Fail | |
| Ẩn khi không có | ⬜ Pass / ⬜ Fail | |
| Cập nhật real-time | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot badge số lượng
- [ ] Screenshot khi không có badge
- [ ] Screenshot badge sau khi cập nhật
- [ ] Screenshot badge với số lượng lớn (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---



## TC-BHV-051: Nhận lượt chơi miễn phí

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-051 |
| **Description Test case** | Kiểm tra chức năng nhận lượt chơi miễn phí trong mini game. Đảm bảo có thể nhận lượt chơi và có giới hạn thời gian (24 giờ). |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Tìm và click vào link/banner mini game "Vòng quay may mắn"<br>   - Hoặc điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Kiểm tra section hướng dẫn**<br>   - Scroll đến section "HƯỚNG DẪN"<br>   - Quan sát "Bước 1: Nhận lượt chơi miễn phí"<br>   - Kiểm tra nút "Nhận" hiển thị<br>4. **Kiểm tra trạng thái nút nhận**<br>   - Quan sát nút "Nhận"<br>   - Kiểm tra nút có enabled hay disabled<br>   - Kiểm tra text hiển thị ("Nhận", "Đã nhận", "Đã hết lượt")<br>5. **Click nút nhận lượt chơi**<br>   - Click vào nút "Nhận"<br>   - Quan sát loading/processing<br>6. **Kiểm tra kết quả**<br>   - Quan sát thông báo thành công<br>   - Kiểm tra nút chuyển thành "Đã nhận" hoặc disabled<br>   - Kiểm tra số lượt chơi còn lại tăng lên<br>7. **Kiểm tra giới hạn 24 giờ**<br>   - Nhận lượt chơi thành công<br>   - Đợi một chút (hoặc test với thời gian đã qua 24 giờ)<br>   - Click lại nút "Nhận"<br>   - Kiểm tra có thể nhận lại sau 24 giờ hay không |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Section "HƯỚNG DẪN" hiển thị:<br>  - [ ] "Bước 1: Nhận lượt chơi miễn phí"<br>  - [ ] Nút "Nhận" hiển thị<br>- [ ] Trạng thái nút "Nhận":<br>  - [ ] Nếu chưa nhận hôm nay: nút enabled, text "Nhận"<br>  - [ ] Nếu đã nhận hôm nay: nút disabled, text "Đã nhận" hoặc "Đã hết lượt"<br>- [ ] Khi click "Nhận" (nếu enabled):<br>  - [ ] Hiển thị loading/processing<br>  - [ ] Gọi API nhận lượt chơi<br>  - [ ] Hiển thị thông báo "Nhận lượt chơi thành công!" hoặc tương tự<br>  - [ ] Nút chuyển thành "Đã nhận" hoặc disabled<br>  - [ ] Số lượt chơi còn lại tăng lên (nếu hiển thị)<br>- [ ] Giới hạn 24 giờ:<br>  - [ ] Sau khi nhận, không thể nhận lại trong 24 giờ<br>  - [ ] Sau 24 giờ, có thể nhận lại<br>  - [ ] Thông báo rõ ràng khi chưa đủ 24 giờ<br>- [ ] Nếu hết lượt chơi:<br>  - [ ] Hiển thị thông báo "Bạn đã dùng hết lượt quay!" hoặc tương tự<br>  - [ ] Nút disabled |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động (chưa hết hạn)<br>- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section hướng dẫn<br>- [ ] Screenshot nút nhận lượt chơi<br>- [ ] Screenshot sau khi nhận thành công<br>- [ ] Screenshot thông báo giới hạn (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng nhận lượt chơi miễn phí. Đảm bảo có thể nhận lượt chơi và có giới hạn thời gian 24 giờ.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động (chưa hết hạn)
- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Kiểm tra section hướng dẫn
4. Kiểm tra trạng thái nút nhận
5. Click nút nhận lượt chơi
6. Kiểm tra kết quả
7. Kiểm tra giới hạn 24 giờ

### Kết quả mong đợi
- [ ] Có thể nhận lượt chơi thành công
- [ ] Giới hạn 24 giờ được enforce đúng
- [ ] Thông báo rõ ràng về trạng thái

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị nút nhận | ⬜ Pass / ⬜ Fail | |
| Nhận lượt chơi thành công | ⬜ Pass / ⬜ Fail | |
| Giới hạn 24 giờ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section hướng dẫn
- [ ] Screenshot nút nhận lượt chơi
- [ ] Screenshot sau khi nhận thành công
- [ ] Screenshot thông báo giới hạn (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-052: Quay vòng quay may mắn

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-052 |
| **Description Test case** | Kiểm tra chức năng quay vòng quay may mắn. Đảm bảo có thể quay vòng quay, animation mượt mà và kết quả được xử lý đúng. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Kiểm tra vòng quay**<br>   - Quan sát vòng quay hiển thị<br>   - Kiểm tra các phần thưởng trên vòng quay (voucher, "Suýt trúng")<br>   - Kiểm tra nút "QUAY" ở giữa vòng quay<br>   - Kiểm tra số lượt chơi còn lại hiển thị<br>4. **Kiểm tra điều kiện quay**<br>   - Kiểm tra nút "QUAY" enabled hay disabled<br>   - Kiểm tra có lượt chơi chưa sử dụng hay không<br>5. **Click nút quay**<br>   - Click vào nút "QUAY"<br>   - Quan sát animation quay<br>6. **Kiểm tra animation quay**<br>   - Quan sát vòng quay quay với animation mượt mà<br>   - Kiểm tra thời gian quay (khoảng 4 giây)<br>   - Kiểm tra vòng quay dừng ở một phần thưởng<br>7. **Kiểm tra kết quả**<br>   - Quan sát modal kết quả hiển thị<br>   - Kiểm tra phần thưởng trúng được hiển thị<br>   - Kiểm tra số lượt chơi còn lại giảm đi 1<br>8. **Kiểm tra với không có lượt chơi**<br>   - Sử dụng hết lượt chơi<br>   - Click nút "QUAY"<br>   - Kiểm tra thông báo "Bạn đã dùng hết lượt quay!" |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Vòng quay hiển thị:<br>  - [ ] Vòng quay với các phần thưởng (voucher, "Suýt trúng")<br>  - [ ] Mỗi phần thưởng có màu sắc khác nhau (xanh lá, vàng)<br>  - [ ] Hiển thị giá trị voucher (ví dụ: "Giảm 10.000đ", "Giảm 20%")<br>  - [ ] Nút "QUAY" ở giữa vòng quay<br>  - [ ] Pointer/chỉ báo ở trên cùng<br>- [ ] Nút "QUAY":<br>  - [ ] Enabled khi có lượt chơi chưa sử dụng<br>  - [ ] Disabled khi không có lượt chơi hoặc đang quay<br>  - [ ] Text "QUAY" rõ ràng<br>- [ ] Khi click "QUAY":<br>  - [ ] Nút disabled ngay lập tức<br>  - [ ] Vòng quay bắt đầu quay với animation mượt mà<br>  - [ ] Animation quay khoảng 4 giây<br>  - [ ] Vòng quay dừng ở một phần thưởng<br>- [ ] Sau khi quay xong:<br>  - [ ] Modal kết quả hiển thị<br>  - [ ] Phần thưởng trúng được hiển thị rõ ràng<br>  - [ ] Số lượt chơi còn lại giảm đi 1<br>  - [ ] Nếu trúng voucher: hiển thị thông tin voucher<br>  - [ ] Nếu "Suýt trúng": hiển thị thông báo "Suýt trúng!"<br>- [ ] Khi không có lượt chơi:<br>  - [ ] Nút "QUAY" disabled<br>  - [ ] Click hiển thị thông báo "Bạn đã dùng hết lượt quay!" |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Người dùng có ít nhất 1 lượt chơi chưa sử dụng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot vòng quay<br>- [ ] Screenshot animation quay<br>- [ ] Screenshot modal kết quả<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng quay vòng quay may mắn. Đảm bảo animation mượt mà và kết quả được xử lý đúng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Người dùng có ít nhất 1 lượt chơi chưa sử dụng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Kiểm tra vòng quay
4. Kiểm tra điều kiện quay
5. Click nút quay
6. Kiểm tra animation quay
7. Kiểm tra kết quả
8. Kiểm tra với không có lượt chơi

### Kết quả mong đợi
- [ ] Animation quay mượt mà
- [ ] Kết quả được xử lý và hiển thị đúng
- [ ] Số lượt chơi cập nhật đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị vòng quay | ⬜ Pass / ⬜ Fail | |
| Animation quay | ⬜ Pass / ⬜ Fail | |
| Hiển thị kết quả | ⬜ Pass / ⬜ Fail | |
| Cập nhật lượt chơi | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot vòng quay
- [ ] Screenshot animation quay
- [ ] Screenshot modal kết quả
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-053: Xem kết quả quay và voucher trúng thưởng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-053 |
| **Description Test case** | Kiểm tra hiển thị kết quả quay và thông tin voucher trúng thưởng. Đảm bảo modal kết quả hiển thị đầy đủ thông tin và có thể sử dụng voucher. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game và quay**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Nhận lượt chơi (nếu cần)<br>   - Click nút "QUAY"<br>   - Đợi vòng quay dừng lại<br>3. **Kiểm tra modal kết quả**<br>   - Quan sát modal kết quả hiển thị<br>   - Kiểm tra modal hiển thị:<br>     - Icon/emoji (🎉 nếu trúng, 😢 nếu suýt trúng)<br>     - Tiêu đề (ví dụ: "Bạn đã trúng voucher!" hoặc "Suýt trúng!")<br>     - Tên phần thưởng hoặc voucher<br>     - Nút "Đóng"<br>4. **Kiểm tra với voucher trúng thưởng**<br>   - Nếu trúng voucher, kiểm tra hiển thị:<br>     - Tên voucher hoặc mã voucher<br>     - Giá trị giảm (ví dụ: "Giảm 10.000đ" hoặc "Giảm 20%")<br>     - Thông tin sử dụng voucher<br>5. **Kiểm tra với "Suýt trúng"**<br>   - Nếu trúng "Suýt trúng", kiểm tra hiển thị:<br>     - Icon 😢<br>     - Tiêu đề "Suýt trúng!"<br>     - Thông báo động viên<br>6. **Đóng modal và kiểm tra voucher**<br>   - Click nút "Đóng"<br>   - Vào trang Vouchers<br>   - Kiểm tra voucher trúng thưởng có trong danh sách<br>   - Kiểm tra voucher có thể sử dụng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Quay vòng quay thành công<br>- [ ] Modal kết quả hiển thị sau khi quay xong:<br>  - [ ] Overlay backdrop<br>  - [ ] Modal ở giữa màn hình<br>  - [ ] Icon/emoji phù hợp (🎉 hoặc 😢)<br>  - [ ] Tiêu đề rõ ràng<br>  - [ ] Nội dung phần thưởng<br>  - [ ] Nút "Đóng"<br>- [ ] Với voucher trúng thưởng:<br>  - [ ] Icon 🎉<br>  - [ ] Tiêu đề "Bạn đã trúng voucher!"<br>  - [ ] Hiển thị tên voucher hoặc mã voucher<br>  - [ ] Hiển thị giá trị giảm (ví dụ: "Giảm 10.000đ" hoặc "Giảm 20%")<br>  - [ ] Voucher được lưu vào tài khoản<br>- [ ] Với "Suýt trúng":<br>  - [ ] Icon 😢<br>  - [ ] Tiêu đề "Suýt trúng!"<br>  - [ ] Thông báo động viên<br>  - [ ] Không có voucher được thêm vào<br>- [ ] Khi click "Đóng":<br>  - [ ] Modal đóng lại<br>  - [ ] Có thể quay tiếp (nếu còn lượt)<br>- [ ] Voucher trúng thưởng:<br>  - [ ] Có trong danh sách vouchers của user<br>  - [ ] Có thể sử dụng khi checkout<br>  - [ ] Hiển thị đúng giá trị giảm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test tích hợp (Integration Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Người dùng có lượt chơi để quay<br>- Có voucher trong danh sách phần thưởng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal kết quả trúng voucher<br>- [ ] Screenshot modal "Suýt trúng"<br>- [ ] Screenshot voucher trong danh sách<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra hiển thị kết quả quay và thông tin voucher trúng thưởng. Đảm bảo modal hiển thị đầy đủ và voucher được lưu đúng.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test tích hợp (Integration Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Người dùng có lượt chơi để quay
- Có voucher trong danh sách phần thưởng

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game và quay
3. Kiểm tra modal kết quả
4. Kiểm tra với voucher trúng thưởng
5. Kiểm tra với "Suýt trúng"
6. Đóng modal và kiểm tra voucher

### Kết quả mong đợi
- [ ] Modal kết quả hiển thị đầy đủ thông tin
- [ ] Voucher được lưu và có thể sử dụng
- [ ] "Suýt trúng" hiển thị đúng

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị modal kết quả | ⬜ Pass / ⬜ Fail | |
| Thông tin voucher | ⬜ Pass / ⬜ Fail | |
| Lưu voucher | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot modal kết quả trúng voucher
- [ ] Screenshot modal "Suýt trúng"
- [ ] Screenshot voucher trong danh sách
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-054: Xem lịch sử lượt chơi

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-054 |
| **Description Test case** | Kiểm tra chức năng xem lịch sử lượt chơi. Đảm bảo có thể xem danh sách các lượt quay đã thực hiện với kết quả và thời gian. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Tìm section lịch sử**<br>   - Scroll đến section "Lịch sử" hoặc "Lịch sử lượt chơi"<br>   - Kiểm tra banner "Lịch sử" có thể click để expand/collapse<br>4. **Mở lịch sử**<br>   - Click vào banner "Lịch sử"<br>   - Quan sát danh sách lịch sử hiển thị<br>5. **Kiểm tra danh sách lịch sử**<br>   - Quan sát mỗi lượt chơi hiển thị:<br>     - Thời gian quay (giờ:phút, ngày/tháng/năm)<br>     - Kết quả (tên voucher trúng hoặc "Suýt trúng")<br>     - Trạng thái (đã sử dụng, chưa sử dụng)<br>6. **Kiểm tra filter/grouping**<br>   - Kiểm tra lịch sử được sắp xếp theo thời gian (mới nhất trước)<br>   - Kiểm tra lượt chơi hôm nay được highlight hoặc phân biệt<br>7. **Kiểm tra với không có lịch sử**<br>   - Nếu chưa có lượt chơi nào, kiểm tra hiển thị "Chưa có lượt chơi nào"<br>8. **Đóng/mở lại lịch sử**<br>   - Click lại banner "Lịch sử"<br>   - Kiểm tra danh sách collapse lại |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Section "Lịch sử" hiển thị:<br>  - [ ] Banner "Lịch sử" có thể click để expand/collapse<br>  - [ ] Icon hoặc indicator cho biết có thể mở/đóng<br>- [ ] Khi click banner "Lịch sử":<br>  - [ ] Danh sách lịch sử expand ra<br>  - [ ] Hiển thị danh sách các lượt chơi<br>- [ ] Mỗi lượt chơi trong lịch sử hiển thị:<br>  - [ ] Thời gian quay (format: "HH:mm DD/MM/YYYY")<br>  - [ ] Kết quả:<br>    - [ ] Tên voucher nếu trúng voucher<br>    - [ ] "Suýt trúng" nếu trúng "Suýt trúng"<br>  - [ ] Trạng thái:<br>    - [ ] Màu xanh hoặc highlight nếu chưa sử dụng (có thể dùng)<br>    - [ ] Màu xám hoặc bình thường nếu đã sử dụng hoặc hôm nay<br>- [ ] Lịch sử được sắp xếp:<br>  - [ ] Mới nhất ở trên<br>  - [ ] Lượt chơi hôm nay được highlight hoặc phân biệt<br>- [ ] Khi không có lịch sử:<br>  - [ ] Hiển thị "Chưa có lượt chơi nào"<br>  - [ ] Hoặc không hiển thị section lịch sử<br>- [ ] Có thể collapse/expand danh sách lịch sử<br>- [ ] Danh sách có thể scroll nếu có nhiều lượt chơi |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Người dùng đã có ít nhất một lượt quay (để test hiển thị lịch sử)<br>- Hoặc chưa có lượt quay nào (để test empty state) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section lịch sử<br>- [ ] Screenshot danh sách lịch sử<br>- [ ] Screenshot empty state (nếu có)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra chức năng xem lịch sử lượt chơi. Đảm bảo có thể xem danh sách các lượt quay với đầy đủ thông tin.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Người dùng đã có ít nhất một lượt quay (để test hiển thị lịch sử)
- Hoặc chưa có lượt quay nào (để test empty state)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Tìm section lịch sử
4. Mở lịch sử
5. Kiểm tra danh sách lịch sử
6. Kiểm tra filter/grouping
7. Kiểm tra với không có lịch sử
8. Đóng/mở lại lịch sử

### Kết quả mong đợi
- [ ] Lịch sử hiển thị đầy đủ thông tin
- [ ] Có thể expand/collapse
- [ ] Sắp xếp đúng theo thời gian

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Hiển thị section lịch sử | ⬜ Pass / ⬜ Fail | |
| Expand/collapse | ⬜ Pass / ⬜ Fail | |
| Thông tin lượt chơi | ⬜ Pass / ⬜ Fail | |
| Sắp xếp | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot section lịch sử
- [ ] Screenshot danh sách lịch sử
- [ ] Screenshot empty state (nếu có)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---

## TC-BHV-055: Giới hạn lượt chơi (24 giờ)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-055 |
| **Description Test case** | Kiểm tra giới hạn lượt chơi 24 giờ. Đảm bảo không thể nhận lượt chơi mới trong vòng 24 giờ sau lần nhận trước đó. |
| **Test case Procedure** | 1. **Đăng nhập vào ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đăng nhập thành công<br>2. **Vào trang mini game**<br>   - Điều hướng đến `/lucky-wheel`<br>   - Xác nhận vào trang mini game<br>3. **Nhận lượt chơi lần đầu**<br>   - Click nút "Nhận" để nhận lượt chơi<br>   - Xác nhận nhận thành công<br>   - Ghi nhận thời gian nhận<br>4. **Thử nhận lại ngay sau đó**<br>   - Click lại nút "Nhận"<br>   - Quan sát hành vi của ứng dụng<br>5. **Kiểm tra trạng thái nút**<br>   - Quan sát nút "Nhận" chuyển thành "Đã nhận" hoặc disabled<br>   - Kiểm tra thông báo (nếu có)<br>6. **Kiểm tra sau 24 giờ (hoặc test với thời gian đã qua)**<br>   - Đợi 24 giờ (hoặc test với account đã nhận cách đây > 24 giờ)<br>   - Vào lại trang mini game<br>   - Kiểm tra nút "Nhận" có enabled lại không<br>   - Thử nhận lại<br>7. **Kiểm tra với localStorage**<br>   - Kiểm tra localStorage có lưu timestamp nhận lượt chơi<br>   - Kiểm tra logic kiểm tra 24 giờ hoạt động đúng |
| **Expected Output** | - [ ] Đăng nhập thành công<br>- [ ] Vào trang mini game thành công<br>- [ ] Nhận lượt chơi lần đầu thành công<br>- [ ] Ngay sau khi nhận:<br>  - [ ] Nút "Nhận" chuyển thành "Đã nhận" hoặc disabled<br>  - [ ] Không thể nhận lại<br>  - [ ] Thông báo rõ ràng (nếu có)<br>- [ ] Giới hạn 24 giờ:<br>  - [ ] Không thể nhận lại trong vòng 24 giờ<br>  - [ ] Sau 24 giờ, có thể nhận lại<br>  - [ ] Logic kiểm tra 24 giờ hoạt động đúng<br>- [ ] Timestamp được lưu:<br>  - [ ] Lưu vào localStorage với key `minigame_receive_play_{miniGameId}`<br>  - [ ] Lưu timestamp khi nhận thành công<br>  - [ ] Xóa timestamp khi nhận thành công (nếu logic như vậy)<br>- [ ] Thông báo rõ ràng:<br>  - [ ] "Bạn đã nhận lượt chơi hôm nay" hoặc tương tự<br>  - [ ] Hoặc hiển thị thời gian còn lại (nếu có)<br>- [ ] Nút "Nhận" disabled với style phù hợp (màu xám, không click được) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Người dùng đã đăng nhập vào ứng dụng<br>- Mini game đang hoạt động<br>- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây)<br>- Hoặc đã nhận trong 24 giờ gần đây (để test giới hạn) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút "Nhận" enabled<br>- [ ] Screenshot nút "Đã nhận" disabled<br>- [ ] Screenshot thông báo giới hạn<br>- [ ] Screenshot localStorage (nếu có thể)<br>- [ ] Screenshot log console (nếu có lỗi) |

<details>
<summary>Chi tiết đầy đủ</summary>

### Mô tả
Kiểm tra giới hạn lượt chơi 24 giờ. Đảm bảo không thể nhận lượt chơi mới trong vòng 24 giờ.

### Loại test
- **Test hành vi (Behavioral Test)**
- **Test chức năng (Functional Test)**
- **Test UI (UI Test)**

### Tiền điều kiện
- Người dùng đã đăng nhập vào ứng dụng
- Mini game đang hoạt động
- Có thể nhận lượt chơi (chưa nhận trong 24 giờ gần đây)
- Hoặc đã nhận trong 24 giờ gần đây (để test giới hạn)

### Các bước thực hiện
1. Đăng nhập vào ứng dụng
2. Vào trang mini game
3. Nhận lượt chơi lần đầu
4. Thử nhận lại ngay sau đó
5. Kiểm tra trạng thái nút
6. Kiểm tra sau 24 giờ (hoặc test với thời gian đã qua)
7. Kiểm tra với localStorage

### Kết quả mong đợi
- [ ] Giới hạn 24 giờ được enforce đúng
- [ ] Nút disabled khi chưa đủ 24 giờ
- [ ] Có thể nhận lại sau 24 giờ

### Kết quả thực tế
| Mục kiểm tra | Kết quả | Ghi chú |
|-------------|---------|---------|
| Nhận lần đầu | ⬜ Pass / ⬜ Fail | |
| Không thể nhận lại | ⬜ Pass / ⬜ Fail | |
| Giới hạn 24 giờ | ⬜ Pass / ⬜ Fail | |

**Ghi chú kết quả thực tế:**
```
[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có]
```

### Ngày test
**Ngày thực hiện:** _ _ / _ _ / _ _ _ _  
**Người test:** _________________  
**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production  
**Phiên bản:** _________________

### Screenshot/Bằng chứng
- [ ] Screenshot nút "Nhận" enabled
- [ ] Screenshot nút "Đã nhận" disabled
- [ ] Screenshot thông báo giới hạn
- [ ] Screenshot localStorage (nếu có thể)
- [ ] Screenshot log console (nếu có lỗi)

</details>

---


## TC-BHV-056: Xem banners carousel và điều hướng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-056 |
| **Description Test case** | Kiểm tra hiển thị banners carousel trên trang chủ và khả năng điều hướng khi click vào banner. Đảm bảo carousel tự động chuyển slide và có thể swipe thủ công. |
| **Test case Procedure** | 1. **Mở ứng dụng và vào trang chủ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>   - Xác nhận đang ở trang chủ (path: `/`)<br>2. **Quan sát banners carousel**<br>   - Scroll đến phần đầu trang (nếu cần)<br>   - Quan sát banners carousel hiển thị<br>   - Kiểm tra số lượng banners<br>   - Quan sát banner đầu tiên hiển thị<br>3. **Kiểm tra carousel tự động chuyển slide**<br>   - Đợi 3-5 giây<br>   - Quan sát carousel tự động chuyển sang banner tiếp theo<br>   - Xác nhận animation chuyển slide mượt mà<br>4. **Swipe thủ công banners**<br>   - Swipe sang trái để xem banner tiếp theo<br>   - Swipe sang phải để xem banner trước đó<br>   - Xác nhận có thể swipe qua tất cả banners<br>5. **Click vào banner**<br>   - Click vào một banner bất kỳ<br>   - Quan sát hành vi điều hướng<br>   - Kiểm tra có điều hướng đến trang/sản phẩm/danh mục liên quan không |
| **Expected Output** | - [ ] Trang chủ load thành công<br>- [ ] Banners carousel hiển thị ở đầu trang<br>- [ ] Carousel hiển thị:<br>  - [ ] Ít nhất 1 banner<br>  - [ ] Hình ảnh banner rõ ràng, không bị vỡ<br>  - [ ] Banner có kích thước phù hợp (chiều cao khoảng 192px)<br>- [ ] Carousel tự động chuyển slide sau vài giây<br>- [ ] Có thể swipe thủ công sang trái/phải<br>- [ ] Swipe mượt mà, không bị lag<br>- [ ] Có thể xem tất cả banners trong carousel<br>- [ ] Click vào banner điều hướng đến đúng trang/sản phẩm/danh mục (nếu có link)<br>- [ ] Loading state hiển thị khi đang tải banners (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có banners trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot banners carousel<br>- [ ] Screenshot khi click vào banner<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-057: Xem và tương tác với Flash Sale preview

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-057 |
| **Description Test case** | Kiểm tra hiển thị Flash Sale preview trên trang chủ, countdown timer, và khả năng điều hướng đến trang Flash Sale. |
| **Test case Procedure** | 1. **Mở trang chủ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Quan sát Flash Sale preview**<br>   - Scroll đến phần Flash Sale (sau banners)<br>   - Quan sát section Flash Sale hiển thị<br>   - Kiểm tra header "FLASH SALE"<br>   - Quan sát countdown timer (nếu có)<br>3. **Kiểm tra countdown timer**<br>   - Ghi nhận thời gian countdown ban đầu (ví dụ: 2:30:45)<br>   - Đợi 5 giây<br>   - Quan sát countdown timer giảm dần (ví dụ: 2:30:40)<br>   - Xác nhận format hiển thị đúng (giờ:phút:giây hoặc ngày:giờ:phút:giây)<br>4. **Xem sản phẩm Flash Sale**<br>   - Quan sát danh sách sản phẩm Flash Sale hiển thị<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh<br>     - Tên sản phẩm<br>     - Giá gốc (gạch ngang)<br>     - Giá Flash Sale<br>     - Badge "Flash Sale"<br>5. **Click vào nút "Flash Sale"**<br>   - Click vào icon/nút "Flash Sale" ở phần quick actions<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến trang `/flash-sale`<br>6. **Click vào sản phẩm Flash Sale**<br>   - Click vào một sản phẩm Flash Sale trong preview<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến trang chi tiết sản phẩm |
| **Expected Output** | - [ ] Section Flash Sale hiển thị trên trang chủ<br>- [ ] Header "FLASH SALE" hiển thị rõ ràng với icon<br>- [ ] Countdown timer hiển thị (nếu có Flash Sale đang active):<br>  - [ ] Format đúng (ví dụ: "2:30:45" hoặc "1 ngày 2:30:45")<br>  - [ ] Timer tự động giảm dần mỗi giây<br>  - [ ] Hiển thị màu đỏ/cam để thu hút<br>- [ ] Danh sách sản phẩm Flash Sale hiển thị:<br>  - [ ] Ít nhất 1 sản phẩm (nếu có Flash Sale active)<br>  - [ ] Hình ảnh sản phẩm rõ ràng<br>  - [ ] Giá gốc bị gạch ngang<br>  - [ ] Giá Flash Sale hiển thị nổi bật<br>  - [ ] Badge "Flash Sale" hoặc icon tương tự<br>- [ ] Click vào nút "Flash Sale" điều hướng đến `/flash-sale`<br>- [ ] Click vào sản phẩm điều hướng đến `/product/:id`<br>- [ ] Loading state hiển thị khi đang tải Flash Sale (nếu có)<br>- [ ] Hiển thị thông báo "Hiện không có flash sale nào" nếu không có Flash Sale active |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có Flash Sale đang active trong hệ thống (hoặc không có để test empty state) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot Flash Sale preview<br>- [ ] Screenshot countdown timer<br>- [ ] Screenshot sản phẩm Flash Sale<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-058: Xem danh mục sản phẩm trên trang chủ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-058 |
| **Description Test case** | Kiểm tra hiển thị danh mục sản phẩm trên trang chủ và khả năng điều hướng đến trang danh mục chi tiết. |
| **Test case Procedure** | 1. **Mở trang chủ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Quan sát danh mục sản phẩm**<br>   - Scroll đến phần danh mục (sau banners, trước Flash Sale hoặc sau Flash Sale)<br>   - Quan sát danh sách danh mục hiển thị<br>   - Kiểm tra layout grid của danh mục<br>3. **Kiểm tra thông tin mỗi danh mục**<br>   - Quan sát mỗi danh mục hiển thị:<br>     - Icon/hình ảnh danh mục (hình tròn)<br>     - Tên danh mục<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận tên danh mục hiển thị đầy đủ (hoặc có line-clamp nếu quá dài)<br>4. **Scroll ngang danh mục (nếu có)**<br>   - Nếu có nhiều danh mục, thử scroll ngang<br>   - Xác nhận có thể scroll xem tất cả danh mục<br>5. **Click vào một danh mục**<br>   - Click vào một danh mục bất kỳ (ví dụ: "Điện thoại")<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/category/:id`<br>   - Kiểm tra trang danh mục hiển thị đúng sản phẩm của danh mục đã chọn |
| **Expected Output** | - [ ] Danh mục sản phẩm hiển thị trên trang chủ<br>- [ ] Layout grid hiển thị đẹp, không bị lệch<br>- [ ] Mỗi danh mục hiển thị:<br>  - [ ] Icon/hình ảnh hình tròn (kích thước khoảng 48x48px)<br>  - [ ] Tên danh mục bên dưới icon<br>  - [ ] Hình ảnh không bị vỡ, load thành công<br>  - [ ] Tên danh mục rõ ràng, dễ đọc<br>- [ ] Có thể scroll ngang nếu có nhiều danh mục (nếu layout hỗ trợ)<br>- [ ] Click vào danh mục điều hướng đến `/category/:id`<br>- [ ] Trang danh mục hiển thị đúng sản phẩm thuộc danh mục đã chọn<br>- [ ] Loading state hiển thị khi đang tải danh mục (nếu có)<br>- [ ] Hiển thị tất cả danh mục có trong hệ thống |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh mục sản phẩm<br>- [ ] Screenshot khi click vào danh mục<br>- [ ] Screenshot trang danh mục chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-059: Xem sản phẩm gợi ý và điều hướng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-059 |
| **Description Test case** | Kiểm tra hiển thị sản phẩm gợi ý trên trang chủ, infinite scroll, và khả năng điều hướng đến trang chi tiết sản phẩm. |
| **Test case Procedure** | 1. **Mở trang chủ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Quan sát section "Gợi ý hôm nay"**<br>   - Scroll xuống phần sản phẩm gợi ý<br>   - Quan sát header "Gợi ý hôm nay" với icon sao<br>   - Quan sát danh sách sản phẩm hiển thị<br>3. **Kiểm tra thông tin mỗi sản phẩm**<br>   - Quan sát mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>     - Badge giảm giá (nếu có)<br>4. **Scroll xuống để load thêm sản phẩm**<br>   - Scroll xuống cuối danh sách sản phẩm<br>   - Quan sát có nút "Xem thêm sản phẩm" hoặc tự động load thêm<br>   - Click nút "Xem thêm sản phẩm" (nếu có)<br>   - Hoặc đợi infinite scroll tự động load<br>   - Quan sát sản phẩm mới được thêm vào danh sách<br>5. **Click vào một sản phẩm**<br>   - Click vào một sản phẩm bất kỳ<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id`<br>   - Kiểm tra trang chi tiết sản phẩm hiển thị đúng thông tin |
| **Expected Output** | - [ ] Section "Gợi ý hôm nay" hiển thị trên trang chủ<br>- [ ] Header có icon sao và text "Gợi ý hôm nay"<br>- [ ] Danh sách sản phẩm hiển thị dạng grid (2 cột hoặc 3 cột)<br>- [ ] Mỗi sản phẩm hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm (có thể bị cắt nếu quá dài)<br>  - [ ] Giá sản phẩm hiển thị rõ ràng<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>  - [ ] Badge giảm giá (nếu có)<br>- [ ] Có thể scroll xuống để xem thêm sản phẩm<br>- [ ] Nút "Xem thêm sản phẩm" hiển thị khi còn sản phẩm (nếu dùng pagination)<br>- [ ] Hoặc tự động load thêm khi scroll đến cuối (infinite scroll)<br>- [ ] Loading state hiển thị khi đang tải thêm sản phẩm<br>- [ ] Click vào sản phẩm điều hướng đến `/product/:id`<br>- [ ] Trang chi tiết sản phẩm hiển thị đúng thông tin<br>- [ ] Hiển thị thông báo "Hiện không có sản phẩm nào" nếu không có sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section "Gợi ý hôm nay"<br>- [ ] Screenshot danh sách sản phẩm<br>- [ ] Screenshot khi load thêm sản phẩm<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-060: Xem popup banner khi mở app

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-060 |
| **Description Test case** | Kiểm tra popup banner hiển thị khi mở app lần đầu và khả năng đóng popup. |
| **Test case Procedure** | 1. **Xóa session storage để reset popup**<br>   - Mở Developer Tools (nếu có thể)<br>   - Xóa sessionStorage key "popupShown"<br>   - Hoặc đóng và mở lại app/tab mới<br>2. **Mở ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load<br>3. **Quan sát popup banner**<br>   - Quan sát popup banner hiển thị<br>   - Kiểm tra popup có overlay (nền đen mờ)<br>   - Quan sát hình ảnh popup<br>   - Kiểm tra nút đóng (X) ở góc trên bên phải<br>4. **Đóng popup**<br>   - Click vào nút đóng (X)<br>   - Quan sát popup đóng<br>   - Xác nhận có thể tương tác với trang chủ sau khi đóng<br>5. **Kiểm tra popup không hiển thị lại**<br>   - Refresh trang hoặc quay lại trang chủ<br>   - Xác nhận popup không hiển thị lại<br>   - Kiểm tra sessionStorage có key "popupShown" = "true"<br>6. **Test popup với nhiều banners**<br>   - Xóa sessionStorage và mở lại app nhiều lần<br>   - Quan sát popup có thể hiển thị banner khác nhau (random) |
| **Expected Output** | - [ ] Popup banner hiển thị khi mở app lần đầu (nếu có popup trong hệ thống)<br>- [ ] Popup hiển thị:<br>  - [ ] Overlay nền đen mờ (background: rgba(0,0,0,0.5))<br>  - [ ] Hình ảnh popup ở giữa màn hình<br>  - [ ] Kích thước popup phù hợp (ví dụ: 255x385px)<br>  - [ ] Nút đóng (X) ở góc trên bên phải<br>- [ ] Click vào nút đóng (X) đóng popup thành công<br>- [ ] Sau khi đóng, có thể tương tác với trang chủ bình thường<br>- [ ] Popup không hiển thị lại khi refresh hoặc quay lại trang chủ<br>- [ ] SessionStorage lưu "popupShown" = "true"<br>- [ ] Nếu có nhiều popup, hiển thị popup ngẫu nhiên mỗi lần mở app<br>- [ ] Popup không hiển thị nếu không có popup trong hệ thống |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có popup banner trong hệ thống (hoặc không có để test empty state)<br>- SessionStorage chưa có key "popupShown" |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot popup banner<br>- [ ] Screenshot khi đóng popup<br>- [ ] Screenshot sessionStorage<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-061: Scroll to top button

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-061 |
| **Description Test case** | Kiểm tra nút "Scroll to top" hiển thị khi scroll xuống và khả năng cuộn lên đầu trang khi click. |
| **Test case Procedure** | 1. **Mở trang chủ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Kiểm tra nút scroll to top không hiển thị ban đầu**<br>   - Ở đầu trang, quan sát không có nút scroll to top<br>   - Hoặc nút bị ẩn (opacity: 0 hoặc display: none)<br>3. **Scroll xuống trang**<br>   - Scroll xuống khoảng 300px<br>   - Quan sát nút scroll to top xuất hiện<br>4. **Quan sát nút scroll to top**<br>   - Kiểm tra nút hiển thị:<br>     - Icon mũi tên lên (ArrowUp)<br>     - Nền màu primary<br>     - Vị trí fixed ở góc dưới bên phải<br>     - Có shadow<br>5. **Click vào nút scroll to top**<br>   - Click vào nút scroll to top<br>   - Quan sát trang tự động cuộn lên đầu<br>   - Xác nhận animation smooth scroll<br>   - Quan sát nút biến mất sau khi cuộn lên đầu<br>6. **Kiểm tra nút ẩn/hiện theo scroll position**<br>   - Scroll xuống lại > 300px, nút hiện lại<br>   - Scroll lên < 300px, nút ẩn đi |
| **Expected Output** | - [ ] Nút scroll to top không hiển thị khi ở đầu trang (scrollTop < 300px)<br>- [ ] Nút scroll to top hiển thị khi scroll xuống > 300px<br>- [ ] Nút hiển thị:<br>  - [ ] Icon mũi tên lên (ArrowUp)<br>  - [ ] Nền màu primary<br>  - [ ] Vị trí fixed ở góc dưới bên phải (bottom: 190px, right: 16px)<br>  - [ ] Có shadow và border-radius tròn<br>  - [ ] Kích thước phù hợp (khoảng 40-48px)<br>- [ ] Click vào nút cuộn lên đầu trang thành công<br>- [ ] Animation smooth scroll mượt mà<br>- [ ] Nút tự động ẩn khi cuộn lên đầu trang<br>- [ ] Nút tự động hiện lại khi scroll xuống > 300px<br>- [ ] Nút không che khuất nội dung quan trọng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Trang chủ có đủ nội dung để scroll (chiều cao > 300px) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút scroll to top khi hiển thị<br>- [ ] Screenshot khi click nút và cuộn lên đầu<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-062: Tải thêm sản phẩm (infinite scroll)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-062 |
| **Description Test case** | Kiểm tra tính năng tải thêm sản phẩm khi scroll xuống cuối danh sách (infinite scroll) hoặc click nút "Xem thêm sản phẩm". |
| **Test case Procedure** | 1. **Mở trang chủ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Quan sát sản phẩm ban đầu**<br>   - Scroll đến phần "Gợi ý hôm nay"<br>   - Đếm số lượng sản phẩm hiển thị ban đầu (ví dụ: 10 sản phẩm)<br>   - Ghi nhận sản phẩm cuối cùng<br>3. **Scroll xuống cuối danh sách**<br>   - Scroll xuống đến cuối danh sách sản phẩm<br>   - Quan sát có nút "Xem thêm sản phẩm" hoặc tự động load thêm<br>4. **Click nút "Xem thêm sản phẩm" (nếu có)**<br>   - Click vào nút "Xem thêm sản phẩm"<br>   - Quan sát loading state<br>   - Đợi sản phẩm mới load xong<br>   - Đếm số lượng sản phẩm sau khi load thêm<br>5. **Kiểm tra infinite scroll tự động (nếu có)**<br>   - Scroll đến cuối danh sách<br>   - Quan sát tự động load thêm sản phẩm<br>   - Xác nhận không cần click nút<br>6. **Kiểm tra khi hết sản phẩm**<br>   - Tiếp tục load thêm cho đến khi hết sản phẩm<br>   - Quan sát nút "Xem thêm sản phẩm" biến mất<br>   - Hoặc hiển thị thông báo "Đã hiển thị tất cả sản phẩm" |
| **Expected Output** | - [ ] Sản phẩm ban đầu load thành công (ví dụ: 10-20 sản phẩm đầu tiên)<br>- [ ] Khi scroll đến cuối danh sách:<br>  - [ ] Nút "Xem thêm sản phẩm" hiển thị (nếu dùng pagination)<br>  - [ ] Hoặc tự động load thêm sản phẩm (nếu dùng infinite scroll)<br>- [ ] Click nút "Xem thêm sản phẩm" (nếu có):<br>  - [ ] Loading state hiển thị<br>  - [ ] Sản phẩm mới được thêm vào danh sách<br>  - [ ] Số lượng sản phẩm tăng lên<br>  - [ ] Không bị duplicate sản phẩm<br>- [ ] Infinite scroll tự động (nếu có):<br>  - [ ] Tự động load khi scroll đến cuối<br>  - [ ] Loading indicator hiển thị<br>  - [ ] Sản phẩm mới được append vào danh sách<br>- [ ] Khi hết sản phẩm:<br>  - [ ] Nút "Xem thêm sản phẩm" biến mất<br>  - [ ] Hoặc hiển thị thông báo "Đã hiển thị tất cả sản phẩm"<br>  - [ ] Không load thêm nữa<br>- [ ] Scroll position được giữ nguyên sau khi load thêm (không jump về đầu trang)<br>- [ ] Performance tốt, không bị lag khi load nhiều sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Performance (Performance Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có nhiều hơn 10-20 sản phẩm trong hệ thống để test pagination |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách sản phẩm ban đầu<br>- [ ] Screenshot khi load thêm sản phẩm<br>- [ ] Screenshot nút "Xem thêm sản phẩm"<br>- [ ] Screenshot khi hết sản phẩm<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-063: Xem danh sách tất cả danh mục

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-063 |
| **Description Test case** | Kiểm tra hiển thị danh sách tất cả danh mục sản phẩm và khả năng điều hướng đến trang danh mục chi tiết. |
| **Test case Procedure** | 1. **Mở ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Điều hướng đến trang danh mục**<br>   - Click vào nút "Danh mục" ở header hoặc footer<br>   - Hoặc click vào icon danh mục trên trang chủ<br>   - Xác nhận điều hướng đến `/categories`<br>3. **Quan sát danh sách danh mục**<br>   - Quan sát layout grid của danh mục (4 cột)<br>   - Kiểm tra mỗi danh mục hiển thị:<br>     - Icon/hình ảnh danh mục (hình tròn)<br>     - Tên danh mục<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận tên danh mục hiển thị đầy đủ (hoặc có line-clamp nếu quá dài)<br>4. **Scroll xem tất cả danh mục**<br>   - Scroll xuống để xem tất cả danh mục<br>   - Xác nhận có thể xem tất cả danh mục có trong hệ thống<br>5. **Click vào một danh mục**<br>   - Click vào một danh mục bất kỳ (ví dụ: "Điện thoại")<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/category/:id` |
| **Expected Output** | - [ ] Trang danh mục load thành công<br>- [ ] Layout grid 4 cột hiển thị đẹp, không bị lệch<br>- [ ] Mỗi danh mục hiển thị:<br>  - [ ] Icon/hình ảnh hình tròn (aspect-square)<br>  - [ ] Tên danh mục bên dưới icon<br>  - [ ] Hình ảnh không bị vỡ, load thành công<br>  - [ ] Tên danh mục rõ ràng, dễ đọc (text-sm, line-clamp-2)<br>- [ ] Có thể scroll để xem tất cả danh mục<br>- [ ] Hiển thị tất cả danh mục có trong hệ thống<br>- [ ] Click vào danh mục điều hướng đến `/category/:id`<br>- [ ] Loading state hiển thị khi đang tải danh mục (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách danh mục<br>- [ ] Screenshot khi click vào danh mục<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-064: Xem sản phẩm theo danh mục cụ thể

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-064 |
| **Description Test case** | Kiểm tra hiển thị sản phẩm theo danh mục cụ thể khi click vào danh mục. |
| **Test case Procedure** | 1. **Mở trang danh mục**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/categories`<br>2. **Chọn một danh mục**<br>   - Click vào một danh mục bất kỳ (ví dụ: "Điện thoại")<br>   - Xác nhận điều hướng đến `/category/:id`<br>3. **Quan sát trang danh mục chi tiết**<br>   - Quan sát CategorySlider hiển thị ở đầu trang<br>   - Quan sát danh sách sản phẩm hiển thị dạng grid<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>4. **Xác nhận sản phẩm thuộc đúng danh mục**<br>   - Kiểm tra tất cả sản phẩm hiển thị đều thuộc danh mục đã chọn<br>   - Không có sản phẩm thuộc danh mục khác<br>5. **Click vào một sản phẩm**<br>   - Click vào một sản phẩm bất kỳ<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id` |
| **Expected Output** | - [ ] Trang danh mục chi tiết load thành công<br>- [ ] CategorySlider hiển thị ở đầu trang với danh sách danh mục<br>- [ ] Danh sách sản phẩm hiển thị dạng grid (2 cột hoặc 3 cột)<br>- [ ] Mỗi sản phẩm hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm (có thể bị cắt nếu quá dài)<br>  - [ ] Giá sản phẩm hiển thị rõ ràng<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>- [ ] Tất cả sản phẩm hiển thị đều thuộc danh mục đã chọn<br>- [ ] Click vào sản phẩm điều hướng đến `/product/:id`<br>- [ ] Loading state hiển thị khi đang tải sản phẩm (nếu có)<br>- [ ] Hiển thị thông báo "Không có sản phẩm nào" nếu danh mục rỗng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục có sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trang danh mục chi tiết<br>- [ ] Screenshot danh sách sản phẩm<br>- [ ] Screenshot khi click vào sản phẩm<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-065: Filter sản phẩm trong danh mục

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-065 |
| **Description Test case** | Kiểm tra tính năng filter sản phẩm trong danh mục (nếu có). |
| **Test case Procedure** | 1. **Mở trang danh mục chi tiết**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/category/:id` với danh mục có nhiều sản phẩm<br>2. **Quan sát các tùy chọn filter**<br>   - Tìm các nút/tùy chọn filter (nếu có)<br>   - Quan sát các option filter có sẵn<br>3. **Áp dụng filter**<br>   - Click vào một filter option (ví dụ: "Giá dưới 500k")<br>   - Quan sát danh sách sản phẩm cập nhật<br>   - Xác nhận chỉ hiển thị sản phẩm thỏa mãn điều kiện filter<br>4. **Xóa filter**<br>   - Click vào nút "Xóa filter" hoặc chọn "Tất cả"<br>   - Quan sát danh sách sản phẩm trở về ban đầu<br>5. **Kết hợp nhiều filter**<br>   - Áp dụng nhiều filter cùng lúc (nếu có)<br>   - Quan sát danh sách sản phẩm cập nhật theo tất cả điều kiện |
| **Expected Output** | - [ ] Các tùy chọn filter hiển thị rõ ràng (nếu có tính năng filter)<br>- [ ] Click vào filter option cập nhật danh sách sản phẩm<br>- [ ] Chỉ hiển thị sản phẩm thỏa mãn điều kiện filter<br>- [ ] Có thể xóa filter và trở về danh sách ban đầu<br>- [ ] Có thể kết hợp nhiều filter cùng lúc (nếu hỗ trợ)<br>- [ ] Loading state hiển thị khi đang filter (nếu có)<br>- [ ] Hiển thị thông báo "Không có sản phẩm nào" nếu filter không có kết quả |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có danh mục có nhiều sản phẩm trong hệ thống<br>- Có tính năng filter (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng filter, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot các tùy chọn filter<br>- [ ] Screenshot danh sách sau khi filter<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-066: Sort sản phẩm (giá, tên, mới nhất)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-066 |
| **Description Test case** | Kiểm tra tính năng sort sản phẩm trong danh mục theo giá, tên, hoặc mới nhất (nếu có). |
| **Test case Procedure** | 1. **Mở trang danh mục chi tiết**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/category/:id` với danh mục có nhiều sản phẩm<br>2. **Quan sát các tùy chọn sort**<br>   - Tìm nút/tùy chọn sort (nếu có)<br>   - Quan sát các option sort có sẵn<br>3. **Sort theo giá tăng dần**<br>   - Click vào sort "Giá thấp đến cao" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm được sắp xếp theo giá tăng dần<br>4. **Sort theo giá giảm dần**<br>   - Click vào sort "Giá cao đến thấp" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm được sắp xếp theo giá giảm dần<br>5. **Sort theo tên**<br>   - Click vào sort "Tên A-Z" hoặc "Tên Z-A" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm được sắp xếp theo tên<br>6. **Sort theo mới nhất**<br>   - Click vào sort "Mới nhất" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm mới nhất hiển thị đầu tiên |
| **Expected Output** | - [ ] Các tùy chọn sort hiển thị rõ ràng (nếu có tính năng sort)<br>- [ ] Sort theo giá tăng dần: sản phẩm giá thấp nhất hiển thị đầu tiên<br>- [ ] Sort theo giá giảm dần: sản phẩm giá cao nhất hiển thị đầu tiên<br>- [ ] Sort theo tên: sản phẩm được sắp xếp theo thứ tự bảng chữ cái<br>- [ ] Sort theo mới nhất: sản phẩm mới nhất hiển thị đầu tiên<br>- [ ] Danh sách sản phẩm cập nhật ngay sau khi chọn sort<br>- [ ] Loading state hiển thị khi đang sort (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có danh mục có nhiều sản phẩm với giá khác nhau trong hệ thống<br>- Có tính năng sort (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng sort, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot các tùy chọn sort<br>- [ ] Screenshot danh sách sau khi sort theo giá<br>- [ ] Screenshot danh sách sau khi sort theo tên<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-067: Xem danh mục rỗng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-067 |
| **Description Test case** | Kiểm tra hiển thị khi danh mục không có sản phẩm nào (danh mục rỗng). |
| **Test case Procedure** | 1. **Mở trang danh mục chi tiết**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/category/:id` với danh mục không có sản phẩm<br>2. **Quan sát trang danh mục rỗng**<br>   - Quan sát CategorySlider vẫn hiển thị (nếu có)<br>   - Quan sát phần danh sách sản phẩm<br>   - Kiểm tra có hiển thị empty state không<br>3. **Kiểm tra empty state**<br>   - Quan sát component EmptyCategory hiển thị<br>   - Kiểm tra thông báo/phần tử empty state<br>   - Xác nhận không có sản phẩm nào hiển thị<br>4. **Thử chọn danh mục khác**<br>   - Click vào một danh mục khác từ CategorySlider<br>   - Quan sát danh sách sản phẩm cập nhật (nếu danh mục mới có sản phẩm) |
| **Expected Output** | - [ ] Trang danh mục chi tiết load thành công<br>- [ ] CategorySlider vẫn hiển thị bình thường<br>- [ ] EmptyCategory component hiển thị khi không có sản phẩm<br>- [ ] Empty state hiển thị:<br>  - [ ] Icon hoặc hình ảnh empty state<br>  - [ ] Thông báo rõ ràng (ví dụ: "Không có sản phẩm nào")<br>  - [ ] Gợi ý hoặc nút điều hướng (nếu có)<br>- [ ] Không có sản phẩm nào hiển thị trong danh sách<br>- [ ] Có thể chọn danh mục khác từ CategorySlider<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục không có sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trang danh mục rỗng<br>- [ ] Screenshot empty state<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-063: Xem danh sách tất cả danh mục

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-063 |
| **Description Test case** | Kiểm tra hiển thị danh sách tất cả danh mục sản phẩm và khả năng điều hướng đến trang danh mục chi tiết. |
| **Test case Procedure** | 1. **Mở ứng dụng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Đợi trang chủ load xong<br>2. **Điều hướng đến trang danh mục**<br>   - Click vào nút "Danh mục" ở header hoặc footer<br>   - Hoặc click vào icon danh mục trên trang chủ<br>   - Xác nhận điều hướng đến `/categories`<br>3. **Quan sát danh sách danh mục**<br>   - Quan sát layout grid của danh mục (4 cột)<br>   - Kiểm tra mỗi danh mục hiển thị:<br>     - Icon/hình ảnh danh mục (hình tròn)<br>     - Tên danh mục<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận tên danh mục hiển thị đầy đủ (hoặc có line-clamp nếu quá dài)<br>4. **Scroll xem tất cả danh mục**<br>   - Scroll xuống để xem tất cả danh mục<br>   - Xác nhận có thể xem tất cả danh mục có trong hệ thống<br>5. **Click vào một danh mục**<br>   - Click vào một danh mục bất kỳ (ví dụ: "Điện thoại")<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/category/:id` |
| **Expected Output** | - [ ] Trang danh mục load thành công<br>- [ ] Layout grid 4 cột hiển thị đẹp, không bị lệch<br>- [ ] Mỗi danh mục hiển thị:<br>  - [ ] Icon/hình ảnh hình tròn (aspect-square)<br>  - [ ] Tên danh mục bên dưới icon<br>  - [ ] Hình ảnh không bị vỡ, load thành công<br>  - [ ] Tên danh mục rõ ràng, dễ đọc (text-sm, line-clamp-2)<br>- [ ] Có thể scroll để xem tất cả danh mục<br>- [ ] Hiển thị tất cả danh mục có trong hệ thống<br>- [ ] Click vào danh mục điều hướng đến `/category/:id`<br>- [ ] Loading state hiển thị khi đang tải danh mục (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách danh mục<br>- [ ] Screenshot khi click vào danh mục<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-064: Xem sản phẩm theo danh mục cụ thể

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-064 |
| **Description Test case** | Kiểm tra hiển thị sản phẩm theo danh mục cụ thể khi click vào danh mục. |
| **Test case Procedure** | 1. **Mở trang danh mục**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/categories`<br>2. **Chọn một danh mục**<br>   - Click vào một danh mục bất kỳ (ví dụ: "Điện thoại")<br>   - Xác nhận điều hướng đến `/category/:id`<br>3. **Quan sát trang danh mục chi tiết**<br>   - Quan sát CategorySlider hiển thị ở đầu trang<br>   - Quan sát danh sách sản phẩm hiển thị dạng grid<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>4. **Xác nhận sản phẩm thuộc đúng danh mục**<br>   - Kiểm tra tất cả sản phẩm hiển thị đều thuộc danh mục đã chọn<br>   - Không có sản phẩm thuộc danh mục khác<br>5. **Click vào một sản phẩm**<br>   - Click vào một sản phẩm bất kỳ<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id` |
| **Expected Output** | - [ ] Trang danh mục chi tiết load thành công<br>- [ ] CategorySlider hiển thị ở đầu trang với danh sách danh mục<br>- [ ] Danh sách sản phẩm hiển thị dạng grid (2 cột hoặc 3 cột)<br>- [ ] Mỗi sản phẩm hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm (có thể bị cắt nếu quá dài)<br>  - [ ] Giá sản phẩm hiển thị rõ ràng<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>- [ ] Tất cả sản phẩm hiển thị đều thuộc danh mục đã chọn<br>- [ ] Click vào sản phẩm điều hướng đến `/product/:id`<br>- [ ] Loading state hiển thị khi đang tải sản phẩm (nếu có)<br>- [ ] Hiển thị thông báo "Không có sản phẩm nào" nếu danh mục rỗng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục có sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trang danh mục chi tiết<br>- [ ] Screenshot danh sách sản phẩm<br>- [ ] Screenshot khi click vào sản phẩm<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-065: Filter sản phẩm trong danh mục

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-065 |
| **Description Test case** | Kiểm tra tính năng filter sản phẩm trong danh mục (nếu có). |
| **Test case Procedure** | 1. **Mở trang danh mục chi tiết**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/category/:id` với danh mục có nhiều sản phẩm<br>2. **Quan sát các tùy chọn filter**<br>   - Tìm các nút/tùy chọn filter (nếu có)<br>   - Quan sát các option filter có sẵn<br>3. **Áp dụng filter**<br>   - Click vào một filter option (ví dụ: "Giá dưới 500k")<br>   - Quan sát danh sách sản phẩm cập nhật<br>   - Xác nhận chỉ hiển thị sản phẩm thỏa mãn điều kiện filter<br>4. **Xóa filter**<br>   - Click vào nút "Xóa filter" hoặc chọn "Tất cả"<br>   - Quan sát danh sách sản phẩm trở về ban đầu<br>5. **Kết hợp nhiều filter**<br>   - Áp dụng nhiều filter cùng lúc (nếu có)<br>   - Quan sát danh sách sản phẩm cập nhật theo tất cả điều kiện |
| **Expected Output** | - [ ] Các tùy chọn filter hiển thị rõ ràng (nếu có tính năng filter)<br>- [ ] Click vào filter option cập nhật danh sách sản phẩm<br>- [ ] Chỉ hiển thị sản phẩm thỏa mãn điều kiện filter<br>- [ ] Có thể xóa filter và trở về danh sách ban đầu<br>- [ ] Có thể kết hợp nhiều filter cùng lúc (nếu hỗ trợ)<br>- [ ] Loading state hiển thị khi đang filter (nếu có)<br>- [ ] Hiển thị thông báo "Không có sản phẩm nào" nếu filter không có kết quả |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có danh mục có nhiều sản phẩm trong hệ thống<br>- Có tính năng filter (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng filter, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot các tùy chọn filter<br>- [ ] Screenshot danh sách sau khi filter<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-066: Sort sản phẩm (giá, tên, mới nhất)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-066 |
| **Description Test case** | Kiểm tra tính năng sort sản phẩm trong danh mục theo giá, tên, hoặc mới nhất (nếu có). |
| **Test case Procedure** | 1. **Mở trang danh mục chi tiết**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/category/:id` với danh mục có nhiều sản phẩm<br>2. **Quan sát các tùy chọn sort**<br>   - Tìm nút/tùy chọn sort (nếu có)<br>   - Quan sát các option sort có sẵn<br>3. **Sort theo giá tăng dần**<br>   - Click vào sort "Giá thấp đến cao" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm được sắp xếp theo giá tăng dần<br>4. **Sort theo giá giảm dần**<br>   - Click vào sort "Giá cao đến thấp" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm được sắp xếp theo giá giảm dần<br>5. **Sort theo tên**<br>   - Click vào sort "Tên A-Z" hoặc "Tên Z-A" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm được sắp xếp theo tên<br>6. **Sort theo mới nhất**<br>   - Click vào sort "Mới nhất" (nếu có)<br>   - Quan sát danh sách sản phẩm sắp xếp lại<br>   - Xác nhận sản phẩm mới nhất hiển thị đầu tiên |
| **Expected Output** | - [ ] Các tùy chọn sort hiển thị rõ ràng (nếu có tính năng sort)<br>- [ ] Sort theo giá tăng dần: sản phẩm giá thấp nhất hiển thị đầu tiên<br>- [ ] Sort theo giá giảm dần: sản phẩm giá cao nhất hiển thị đầu tiên<br>- [ ] Sort theo tên: sản phẩm được sắp xếp theo thứ tự bảng chữ cái<br>- [ ] Sort theo mới nhất: sản phẩm mới nhất hiển thị đầu tiên<br>- [ ] Danh sách sản phẩm cập nhật ngay sau khi chọn sort<br>- [ ] Loading state hiển thị khi đang sort (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có danh mục có nhiều sản phẩm với giá khác nhau trong hệ thống<br>- Có tính năng sort (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng sort, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot các tùy chọn sort<br>- [ ] Screenshot danh sách sau khi sort theo giá<br>- [ ] Screenshot danh sách sau khi sort theo tên<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-067: Xem danh mục rỗng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-067 |
| **Description Test case** | Kiểm tra hiển thị khi danh mục không có sản phẩm nào (danh mục rỗng). |
| **Test case Procedure** | 1. **Mở trang danh mục chi tiết**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/category/:id` với danh mục không có sản phẩm<br>2. **Quan sát trang danh mục rỗng**<br>   - Quan sát CategorySlider vẫn hiển thị (nếu có)<br>   - Quan sát phần danh sách sản phẩm<br>   - Kiểm tra có hiển thị empty state không<br>3. **Kiểm tra empty state**<br>   - Quan sát component EmptyCategory hiển thị<br>   - Kiểm tra thông báo/phần tử empty state<br>   - Xác nhận không có sản phẩm nào hiển thị<br>4. **Thử chọn danh mục khác**<br>   - Click vào một danh mục khác từ CategorySlider<br>   - Quan sát danh sách sản phẩm cập nhật (nếu danh mục mới có sản phẩm) |
| **Expected Output** | - [ ] Trang danh mục chi tiết load thành công<br>- [ ] CategorySlider vẫn hiển thị bình thường<br>- [ ] EmptyCategory component hiển thị khi không có sản phẩm<br>- [ ] Empty state hiển thị:<br>  - [ ] Icon hoặc hình ảnh empty state<br>  - [ ] Thông báo rõ ràng (ví dụ: "Không có sản phẩm nào")<br>  - [ ] Gợi ý hoặc nút điều hướng (nếu có)<br>- [ ] Không có sản phẩm nào hiển thị trong danh sách<br>- [ ] Có thể chọn danh mục khác từ CategorySlider<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 danh mục không có sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot trang danh mục rỗng<br>- [ ] Screenshot empty state<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-068: Xem thông tin cơ bản sản phẩm

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-068 |
| **Description Test case** | Kiểm tra hiển thị thông tin cơ bản của sản phẩm trên trang chi tiết: tên, giá, giá gốc, đánh giá, mô tả ngắn. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Tìm kiếm hoặc duyệt đến một sản phẩm<br>   - Click vào sản phẩm để xem chi tiết<br>   - Xác nhận điều hướng đến `/product/:id`<br>2. **Quan sát thông tin cơ bản sản phẩm**<br>   - Quan sát tên sản phẩm hiển thị<br>   - Quan sát giá sản phẩm hiển thị<br>   - Quan sát giá gốc (nếu có giảm giá)<br>   - Quan sát phần trăm giảm giá (nếu có)<br>   - Quan sát đánh giá trung bình và số lượng đánh giá (nếu có)<br>3. **Kiểm tra format hiển thị**<br>   - Xác nhận giá được format đúng (ví dụ: 1.000.000đ)<br>   - Xác nhận giá gốc bị gạch ngang (nếu có)<br>   - Xác nhận phần trăm giảm giá hiển thị rõ ràng<br>   - Xác nhận đánh giá hiển thị với icon sao và số điểm |
| **Expected Output** | - [ ] Trang chi tiết sản phẩm load thành công<br>- [ ] Tên sản phẩm hiển thị rõ ràng, đầy đủ<br>- [ ] Giá sản phẩm hiển thị:<br>  - [ ] Format đúng (ví dụ: 1.000.000đ)<br>  - [ ] Màu sắc nổi bật (màu primary hoặc đỏ)<br>  - [ ] Font size phù hợp<br>- [ ] Giá gốc (nếu có giảm giá):<br>  - [ ] Hiển thị bị gạch ngang<br>  - [ ] Màu xám hoặc nhạt hơn<br>- [ ] Phần trăm giảm giá hiển thị (nếu có)<br>- [ ] Đánh giá trung bình hiển thị với icon sao và số điểm (nếu có)<br>- [ ] Số lượng đánh giá hiển thị trong ngoặc (nếu có)<br>- [ ] Loading state hiển thị khi đang tải thông tin sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot thông tin cơ bản sản phẩm<br>- [ ] Screenshot giá và giá gốc<br>- [ ] Screenshot đánh giá<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-069: Xem và swipe ảnh sản phẩm

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-069 |
| **Description Test case** | Kiểm tra hiển thị ảnh sản phẩm, swipe để xem các ảnh khác, và click vào thumbnail để chuyển ảnh. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id` với sản phẩm có nhiều ảnh<br>2. **Quan sát ảnh chính sản phẩm**<br>   - Quan sát ảnh chính hiển thị ở đầu trang<br>   - Kiểm tra ảnh load thành công, không bị vỡ<br>   - Quan sát image indicators (dots) nếu có nhiều ảnh<br>3. **Swipe sang trái để xem ảnh tiếp theo**<br>   - Swipe sang trái trên ảnh chính<br>   - Quan sát ảnh chuyển sang ảnh tiếp theo<br>   - Xác nhận animation mượt mà<br>   - Quan sát image indicator cập nhật<br>4. **Swipe sang phải để xem ảnh trước**<br>   - Swipe sang phải trên ảnh chính<br>   - Quan sát ảnh chuyển về ảnh trước<br>   - Xác nhận có thể swipe qua tất cả ảnh<br>5. **Click vào thumbnail**<br>   - Scroll xuống phần thumbnail gallery (nếu có)<br>   - Click vào một thumbnail bất kỳ<br>   - Quan sát ảnh chính cập nhật theo thumbnail đã chọn<br>   - Xác nhận thumbnail được highlight khi được chọn |
| **Expected Output** | - [ ] Ảnh chính sản phẩm hiển thị ở đầu trang<br>- [ ] Ảnh load thành công, không bị vỡ<br>- [ ] Image indicators (dots) hiển thị khi có nhiều ảnh<br>- [ ] Swipe sang trái chuyển sang ảnh tiếp theo mượt mà<br>- [ ] Swipe sang phải chuyển về ảnh trước mượt mà<br>- [ ] Có thể swipe qua tất cả ảnh (infinite loop)<br>- [ ] Image indicator cập nhật theo ảnh hiện tại<br>- [ ] Thumbnail gallery hiển thị (nếu có nhiều ảnh)<br>- [ ] Click vào thumbnail cập nhật ảnh chính<br>- [ ] Thumbnail được highlight với border-primary khi được chọn<br>- [ ] Có thể scroll ngang thumbnail gallery nếu có nhiều ảnh |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có nhiều ảnh (ít nhất 2-3 ảnh) trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot ảnh chính sản phẩm<br>- [ ] Screenshot khi swipe ảnh<br>- [ ] Screenshot thumbnail gallery<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-070: Chọn variant sản phẩm (màu, size)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-070 |
| **Description Test case** | Kiểm tra chọn variant sản phẩm (màu sắc, kích thước) trong modal và cập nhật giá, ảnh theo variant đã chọn. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm có variant**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id` với sản phẩm có variant (màu, size)<br>2. **Click nút "Thêm vào giỏ hàng" hoặc "Mua ngay"**<br>   - Scroll xuống cuối trang<br>   - Click nút "Thêm vào giỏ hàng" hoặc "Mua ngay"<br>   - Xác nhận modal chọn variant hiển thị<br>3. **Quan sát modal variant**<br>   - Quan sát hình ảnh sản phẩm trong modal<br>   - Quan sát tên sản phẩm<br>   - Quan sát giá sản phẩm<br>   - Quan sát danh sách option màu sắc<br>   - Quan sát danh sách option kích thước<br>   - Quan sát bộ chọn số lượng<br>4. **Chọn màu sắc**<br>   - Click vào một màu sắc (ví dụ: "Đỏ")<br>   - Quan sát màu được highlight (border-danger, bg-danger/5)<br>   - Quan sát danh sách kích thước filter theo màu đã chọn<br>   - Quan sát giá cập nhật theo variant (nếu variant có giá khác)<br>   - Quan sát ảnh sản phẩm cập nhật theo variant (nếu variant có ảnh riêng)<br>5. **Chọn kích thước**<br>   - Click vào một kích thước (ví dụ: "M")<br>   - Quan sát kích thước được highlight<br>   - Quan sát giá cập nhật theo variant đã chọn<br>6. **Chọn số lượng**<br>   - Sử dụng bộ chọn số lượng để chọn số lượng (ví dụ: 2)<br>   - Xác nhận số lượng không vượt quá tồn kho<br>7. **Xác nhận variant**<br>   - Click nút "Xác nhận" hoặc "Thêm vào giỏ hàng"<br>   - Quan sát modal đóng<br>   - Xác nhận sản phẩm được thêm vào giỏ với variant đã chọn |
| **Expected Output** | - [ ] Modal variant hiển thị khi click "Thêm vào giỏ hàng" hoặc "Mua ngay"<br>- [ ] Modal hiển thị:<br>  - [ ] Hình ảnh sản phẩm<br>  - [ ] Tên sản phẩm<br>  - [ ] Giá sản phẩm<br>  - [ ] Danh sách option màu sắc (nếu có)<br>  - [ ] Danh sách option kích thước (nếu có)<br>  - [ ] Số lượng tồn kho<br>  - [ ] Bộ chọn số lượng<br>- [ ] Click vào màu sắc:<br>  - [ ] Màu được highlight (border-danger, bg-danger/5)<br>  - [ ] Danh sách kích thước filter theo màu đã chọn<br>  - [ ] Giá cập nhật theo variant (nếu có)<br>  - [ ] Ảnh sản phẩm cập nhật theo variant (nếu variant có ảnh riêng)<br>- [ ] Click vào kích thước:<br>  - [ ] Kích thước được highlight<br>  - [ ] Giá cập nhật theo variant đã chọn<br>- [ ] Chọn số lượng:<br>  - [ ] Số lượng không vượt quá tồn kho<br>  - [ ] Hiển thị thông báo lỗi nếu số lượng > tồn kho<br>- [ ] Click "Xác nhận" đóng modal và thêm vào giỏ thành công<br>- [ ] Variant được lưu đúng trong giỏ hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có variant (màu sắc và kích thước) trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal variant<br>- [ ] Screenshot khi chọn màu sắc<br>- [ ] Screenshot khi chọn kích thước<br>- [ ] Screenshot sản phẩm trong giỏ hàng với variant<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-071: Thay đổi số lượng sản phẩm

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-071 |
| **Description Test case** | Kiểm tra thay đổi số lượng sản phẩm trong modal variant và validation số lượng không vượt quá tồn kho. |
| **Test case Procedure** | 1. **Mở modal variant**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id`<br>   - Click nút "Thêm vào giỏ hàng"<br>   - Xác nhận modal variant hiển thị<br>2. **Quan sát số lượng ban đầu**<br>   - Quan sát số lượng mặc định = 1<br>   - Quan sát tồn kho hiển thị (nếu có)<br>3. **Tăng số lượng**<br>   - Click nút "+" để tăng số lượng<br>   - Quan sát số lượng tăng lên<br>   - Tiếp tục tăng cho đến khi đạt tồn kho tối đa<br>   - Thử tăng thêm 1 lần nữa<br>   - Quan sát có thông báo lỗi hoặc không cho tăng thêm<br>4. **Giảm số lượng**<br>   - Click nút "-" để giảm số lượng<br>   - Quan sát số lượng giảm xuống<br>   - Thử giảm xuống 0 hoặc số âm<br>   - Quan sát có validation không cho giảm xuống dưới 1<br>5. **Nhập số lượng trực tiếp**<br>   - Click vào ô số lượng và nhập số trực tiếp (ví dụ: 5)<br>   - Quan sát số lượng cập nhật<br>   - Thử nhập số lớn hơn tồn kho<br>   - Quan sát có validation và tự động điều chỉnh về tồn kho tối đa |
| **Expected Output** | - [ ] Số lượng mặc định = 1<br>- [ ] Tồn kho hiển thị rõ ràng (nếu có)<br>- [ ] Click nút "+" tăng số lượng thành công<br>- [ ] Số lượng không thể tăng vượt quá tồn kho<br>- [ ] Hiển thị thông báo lỗi nếu cố tăng vượt tồn kho (ví dụ: "Số lượng tối đa là X")<br>- [ ] Click nút "-" giảm số lượng thành công<br>- [ ] Số lượng không thể giảm xuống dưới 1<br>- [ ] Nhập số lượng trực tiếp cập nhật thành công<br>- [ ] Tự động điều chỉnh về tồn kho tối đa nếu nhập số lớn hơn tồn kho<br>- [ ] Giá tổng cộng cập nhật theo số lượng (nếu hiển thị) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Validation (Validation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có tồn kho trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot bộ chọn số lượng<br>- [ ] Screenshot khi tăng số lượng<br>- [ ] Screenshot thông báo lỗi khi vượt tồn kho<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-072: Thêm/xóa sản phẩm yêu thích

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-072 |
| **Description Test case** | Kiểm tra thêm sản phẩm vào yêu thích và xóa sản phẩm khỏi yêu thích từ trang chi tiết sản phẩm. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id`<br>2. **Quan sát nút yêu thích**<br>   - Tìm nút yêu thích (icon Heart) trên trang<br>   - Quan sát trạng thái ban đầu (filled hoặc outline)<br>3. **Thêm vào yêu thích**<br>   - Click vào nút yêu thích (nếu chưa được thêm)<br>   - Quan sát icon Heart chuyển sang filled (màu đỏ, bg-red-500)<br>   - Quan sát thông báo "Đã thêm vào yêu thích"<br>   - Kiểm tra localStorage có key "favoriteStore" chứa sản phẩm<br>4. **Xóa khỏi yêu thích**<br>   - Click lại vào nút yêu thích (đã được thêm)<br>   - Quan sát icon Heart chuyển về outline (màu xám, bg-gray-200)<br>   - Quan sát thông báo "Đã xóa khỏi yêu thích"<br>   - Kiểm tra localStorage không còn chứa sản phẩm này<br>5. **Kiểm tra đồng bộ với trang yêu thích**<br>   - Điều hướng đến trang `/heart`<br>   - Quan sát sản phẩm có trong danh sách yêu thích (nếu đã thêm)<br>   - Quay lại trang chi tiết sản phẩm<br>   - Xác nhận trạng thái yêu thích đồng bộ |
| **Expected Output** | - [ ] Nút yêu thích hiển thị trên trang chi tiết sản phẩm<br>- [ ] Trạng thái ban đầu đúng (filled nếu đã yêu thích, outline nếu chưa)<br>- [ ] Click thêm vào yêu thích:<br>  - [ ] Icon chuyển sang filled (màu đỏ, bg-red-500)<br>  - [ ] Hiển thị toast "Đã thêm vào yêu thích"<br>  - [ ] localStorage lưu sản phẩm vào "favoriteStore"<br>- [ ] Click xóa khỏi yêu thích:<br>  - [ ] Icon chuyển về outline (màu xám, bg-gray-200)<br>  - [ ] Hiển thị toast "Đã xóa khỏi yêu thích"<br>  - [ ] localStorage xóa sản phẩm khỏi "favoriteStore"<br>- [ ] Trạng thái yêu thích đồng bộ với trang `/heart`<br>- [ ] Có thể toggle yêu thích nhiều lần mà không bị lỗi |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút yêu thích khi chưa thêm<br>- [ ] Screenshot nút yêu thích khi đã thêm<br>- [ ] Screenshot thông báo "Đã thêm vào yêu thích"<br>- [ ] Screenshot localStorage<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-073: Chia sẻ sản phẩm

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-073 |
| **Description Test case** | Kiểm tra tính năng chia sẻ sản phẩm (nếu có) từ trang chi tiết sản phẩm. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id`<br>2. **Tìm nút chia sẻ**<br>   - Tìm nút/icon chia sẻ trên trang (nếu có)<br>   - Quan sát vị trí và cách hiển thị<br>3. **Click nút chia sẻ**<br>   - Click vào nút chia sẻ<br>   - Quan sát modal hoặc menu chia sẻ hiển thị<br>   - Quan sát các tùy chọn chia sẻ (Zalo, Facebook, Copy link, v.v.)<br>4. **Chia sẻ qua Zalo**<br>   - Click vào tùy chọn chia sẻ qua Zalo (nếu có)<br>   - Quan sát hành vi chia sẻ<br>5. **Copy link sản phẩm**<br>   - Click vào tùy chọn "Copy link" (nếu có)<br>   - Quan sát thông báo "Đã copy link"<br>   - Thử paste link vào trình duyệt/ứng dụng khác<br>   - Xác nhận link hợp lệ và điều hướng đến đúng sản phẩm |
| **Expected Output** | - [ ] Nút chia sẻ hiển thị trên trang chi tiết sản phẩm (nếu có tính năng chia sẻ)<br>- [ ] Click nút chia sẻ hiển thị modal/menu chia sẻ<br>- [ ] Các tùy chọn chia sẻ hiển thị:<br>  - [ ] Chia sẻ qua Zalo (nếu có)<br>  - [ ] Chia sẻ qua Facebook (nếu có)<br>  - [ ] Copy link (nếu có)<br>  - [ ] Các tùy chọn khác (nếu có)<br>- [ ] Chia sẻ qua Zalo mở dialog chia sẻ của Zalo<br>- [ ] Copy link:<br>  - [ ] Hiển thị thông báo "Đã copy link"<br>  - [ ] Link được copy vào clipboard<br>  - [ ] Link hợp lệ và điều hướng đến đúng sản phẩm khi mở<br>- [ ] Link chứa đầy đủ thông tin sản phẩm (product_id) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm trong hệ thống<br>- Có tính năng chia sẻ (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng chia sẻ, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút chia sẻ<br>- [ ] Screenshot modal/menu chia sẻ<br>- [ ] Screenshot khi chia sẻ qua Zalo<br>- [ ] Screenshot thông báo "Đã copy link"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-074: Xem mô tả và thông số kỹ thuật

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-074 |
| **Description Test case** | Kiểm tra hiển thị mô tả chi tiết và thông số kỹ thuật sản phẩm, có thể expand/collapse các section. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id` với sản phẩm có mô tả và thông số<br>2. **Quan sát section "Điểm nổi bật"**<br>   - Scroll xuống phần "Điểm nổi bật"<br>   - Quan sát section có thể expand/collapse<br>   - Click vào section để expand<br>   - Quan sát nội dung hiển thị<br>   - Click lại để collapse<br>3. **Quan sát section "Thông số kỹ thuật"**<br>   - Scroll xuống phần "Thông số kỹ thuật"<br>   - Quan sát section có thể expand/collapse<br>   - Click vào section để expand<br>   - Quan sát thông số hiển thị dạng grid (key: value)<br>   - Click lại để collapse<br>4. **Quan sát section "Mô tả chi tiết"**<br>   - Scroll xuống phần "Mô tả chi tiết"<br>   - Quan sát section có thể expand/collapse<br>   - Click vào section để expand<br>   - Quan sát nội dung mô tả (có thể có HTML, ảnh)<br>   - Click lại để collapse<br>5. **Kiểm tra format hiển thị**<br>   - Xác nhận HTML được render đúng<br>   - Xác nhận ảnh trong mô tả hiển thị đúng<br>   - Xác nhận font size và line-height phù hợp |
| **Expected Output** | - [ ] Section "Điểm nổi bật" hiển thị (nếu có)<br>- [ ] Section "Thông số kỹ thuật" hiển thị (nếu có)<br>- [ ] Section "Mô tả chi tiết" hiển thị (nếu có)<br>- [ ] Mỗi section có thể expand/collapse:<br>  - [ ] Icon mũi tên xoay khi expand/collapse<br>  - [ ] Nội dung hiển thị khi expand<br>  - [ ] Nội dung ẩn khi collapse<br>- [ ] Thông số kỹ thuật hiển thị dạng grid (key: value)<br>- [ ] Mô tả chi tiết:<br>  - [ ] HTML được render đúng<br>  - [ ] Ảnh trong mô tả hiển thị đúng (nếu có)<br>  - [ ] Font size và line-height phù hợp (13px)<br>  - [ ] Text alignment đúng (text-left)<br>- [ ] Có thể scroll để xem toàn bộ nội dung |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có mô tả và thông số kỹ thuật trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section "Điểm nổi bật"<br>- [ ] Screenshot section "Thông số kỹ thuật"<br>- [ ] Screenshot section "Mô tả chi tiết"<br>- [ ] Screenshot khi expand/collapse<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-075: Xem sản phẩm liên quan

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-075 |
| **Description Test case** | Kiểm tra hiển thị sản phẩm liên quan ở cuối trang chi tiết sản phẩm và khả năng điều hướng. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id`<br>2. **Scroll xuống phần sản phẩm liên quan**<br>   - Scroll xuống cuối trang<br>   - Quan sát section "Sản phẩm khác" hoặc "Sản phẩm liên quan"<br>3. **Quan sát danh sách sản phẩm liên quan**<br>   - Quan sát danh sách sản phẩm hiển thị dạng grid<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>4. **Xác nhận sản phẩm liên quan**<br>   - Kiểm tra sản phẩm liên quan không trùng với sản phẩm hiện tại<br>   - Kiểm tra sản phẩm liên quan có thể cùng danh mục hoặc có liên quan<br>5. **Click vào sản phẩm liên quan**<br>   - Click vào một sản phẩm liên quan<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id` với ID sản phẩm mới<br>   - Xác nhận trang chi tiết sản phẩm mới load thành công |
| **Expected Output** | - [ ] Section "Sản phẩm khác" hoặc "Sản phẩm liên quan" hiển thị ở cuối trang<br>- [ ] Danh sách sản phẩm liên quan hiển thị dạng grid (2 cột hoặc 3 cột)<br>- [ ] Mỗi sản phẩm liên quan hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm (có thể bị cắt nếu quá dài)<br>  - [ ] Giá sản phẩm hiển thị rõ ràng<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>- [ ] Sản phẩm liên quan không trùng với sản phẩm hiện tại<br>- [ ] Click vào sản phẩm liên quan điều hướng đến `/product/:id` mới<br>- [ ] Trang chi tiết sản phẩm mới load thành công<br>- [ ] Scroll position được reset về đầu trang khi chuyển sản phẩm (nếu có scrollRestoration: 0) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có sản phẩm liên quan trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section "Sản phẩm khác"<br>- [ ] Screenshot danh sách sản phẩm liên quan<br>- [ ] Screenshot khi click vào sản phẩm liên quan<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-076: Điều hướng đến trang đánh giá

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-076 |
| **Description Test case** | Kiểm tra điều hướng đến trang đánh giá sản phẩm từ trang chi tiết sản phẩm. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id` với sản phẩm có đánh giá<br>2. **Quan sát section đánh giá**<br>   - Scroll xuống phần "Đánh giá sản phẩm"<br>   - Quan sát đánh giá trung bình hiển thị<br>   - Quan sát số lượng đánh giá hiển thị<br>   - Quan sát danh sách đánh giá preview (nếu có)<br>   - Quan sát nút "Tất cả" hoặc "Xem tất cả"<br>3. **Click vào nút "Tất cả" hoặc section đánh giá**<br>   - Click vào nút "Tất cả" hoặc click vào section đánh giá<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id/reviews`<br>4. **Kiểm tra trang đánh giá**<br>   - Quan sát trang đánh giá load thành công<br>   - Quan sát danh sách đánh giá đầy đủ<br>   - Xác nhận đánh giá thuộc đúng sản phẩm |
| **Expected Output** | - [ ] Section "Đánh giá sản phẩm" hiển thị trên trang chi tiết (nếu sản phẩm có đánh giá)<br>- [ ] Section hiển thị:<br>  - [ ] Đánh giá trung bình với icon sao<br>  - [ ] Số lượng đánh giá trong ngoặc<br>  - [ ] Danh sách đánh giá preview (nếu có)<br>  - [ ] Nút "Tất cả" với icon mũi tên<br>- [ ] Click vào nút "Tất cả" hoặc section điều hướng đến `/product/:id/reviews`<br>- [ ] Trang đánh giá load thành công<br>- [ ] Danh sách đánh giá đầy đủ hiển thị<br>- [ ] Tất cả đánh giá thuộc đúng sản phẩm<br>- [ ] Có thể quay lại trang chi tiết sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Navigation (Navigation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có đánh giá trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section đánh giá trên trang chi tiết<br>- [ ] Screenshot khi click "Tất cả"<br>- [ ] Screenshot trang đánh giá<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-077: Xem sản phẩm flash sale với countdown

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-077 |
| **Description Test case** | Kiểm tra hiển thị sản phẩm flash sale với countdown timer trên trang chi tiết sản phẩm. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm flash sale**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id` với sản phẩm flash sale đang active<br>2. **Quan sát Flash Sale banner**<br>   - Quan sát banner Flash Sale hiển thị (nếu sản phẩm là flash sale)<br>   - Quan sát countdown timer hiển thị<br>   - Ghi nhận thời gian countdown ban đầu (ví dụ: 2:30:45)<br>3. **Kiểm tra countdown timer**<br>   - Đợi 5 giây<br>   - Quan sát countdown timer giảm dần (ví dụ: 2:30:40)<br>   - Xác nhận format hiển thị đúng (giờ:phút:giây)<br>   - Xác nhận timer tự động cập nhật mỗi giây<br>4. **Quan sát thông tin flash sale**<br>   - Quan sát giá flash sale hiển thị<br>   - Quan sát giá gốc bị gạch ngang<br>   - Quan sát phần trăm giảm giá<br>   - Quan sát badge "FLASH SALE" hoặc icon tương tự<br>5. **Kiểm tra khi flash sale kết thúc**<br>   - Đợi countdown timer về 0 (hoặc test với sản phẩm flash sale đã kết thúc)<br>   - Quan sát banner flash sale biến mất hoặc hiển thị "Đã kết thúc"<br>   - Quan sát giá trở về giá thường |
| **Expected Output** | - [ ] Flash Sale banner hiển thị (nếu sản phẩm là flash sale đang active)<br>- [ ] Banner hiển thị:<br>  - [ ] Icon ⚡ hoặc badge "FLASH SALE"<br>  - [ ] Countdown timer với format giờ:phút:giây<br>  - [ ] Màu sắc nổi bật (cam/đỏ)<br>- [ ] Countdown timer:<br>  - [ ] Format đúng (ví dụ: "02:30:45")<br>  - [ ] Tự động giảm dần mỗi giây<br>  - [ ] Hiển thị màu cam/đỏ để thu hút<br>- [ ] Giá flash sale hiển thị nổi bật<br>- [ ] Giá gốc bị gạch ngang<br>- [ ] Phần trăm giảm giá hiển thị<br>- [ ] Khi flash sale kết thúc:<br>  - [ ] Banner biến mất hoặc hiển thị "Đã kết thúc"<br>  - [ ] Giá trở về giá thường<br>- [ ] ShareButton hiển thị (nếu sản phẩm là flash sale) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm flash sale đang active trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot Flash Sale banner<br>- [ ] Screenshot countdown timer<br>- [ ] Screenshot giá flash sale<br>- [ ] Screenshot khi flash sale kết thúc<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-078: Xem danh sách đánh giá sản phẩm

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-078 |
| **Description Test case** | Kiểm tra hiển thị danh sách đánh giá sản phẩm với thông tin đầy đủ: tên người dùng, avatar, rating, nội dung, ảnh, ngày đánh giá. |
| **Test case Procedure** | 1. **Mở trang đánh giá sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id/reviews` với sản phẩm có đánh giá<br>2. **Quan sát header trang đánh giá**<br>   - Quan sát tiêu đề "Đánh giá X" (X là số lượng đánh giá)<br>   - Quan sát nút back để quay lại<br>3. **Quan sát danh sách đánh giá**<br>   - Scroll xuống để xem danh sách đánh giá<br>   - Quan sát mỗi đánh giá hiển thị:<br>     - Avatar người dùng (hoặc icon mặc định)<br>     - Tên người dùng<br>     - Badge "Đã mua" (nếu là verified purchase)<br>     - Rating (số sao từ 1-5)<br>     - Nội dung đánh giá<br>     - Ảnh đánh giá (nếu có)<br>     - Ngày đánh giá<br>4. **Kiểm tra format hiển thị**<br>   - Xác nhận avatar hiển thị đúng (hoặc fallback icon)<br>   - Xác nhận rating hiển thị với icon sao<br>   - Xác nhận ngày đánh giá format đúng (dd/mm/yyyy hh:mm)<br>   - Xác nhận ảnh đánh giá hiển thị đúng (nếu có) |
| **Expected Output** | - [ ] Trang đánh giá load thành công<br>- [ ] Header hiển thị:<br>  - [ ] Tiêu đề "Đánh giá X" với số lượng đánh giá chính xác<br>  - [ ] Nút back để quay lại<br>- [ ] Danh sách đánh giá hiển thị:<br>  - [ ] Avatar người dùng (hoặc icon mặc định nếu không có)<br>  - [ ] Tên người dùng rõ ràng<br>  - [ ] Badge "Đã mua" hiển thị cho verified purchase<br>  - [ ] Rating hiển thị với icon sao (1-5 sao)<br>  - [ ] Nội dung đánh giá hiển thị đầy đủ<br>  - [ ] Ảnh đánh giá hiển thị đúng (nếu có)<br>  - [ ] Ngày đánh giá format đúng (dd/mm/yyyy hh:mm)<br>- [ ] Loading state hiển thị khi đang tải đánh giá<br>- [ ] Hiển thị "Không có đánh giá nào" nếu sản phẩm không có đánh giá |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có đánh giá trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách đánh giá<br>- [ ] Screenshot một đánh giá chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-079: Filter đánh giá theo rating (1-5 sao)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-079 |
| **Description Test case** | Kiểm tra filter đánh giá theo rating từ 1 đến 5 sao và hiển thị số lượng đánh giá tương ứng. |
| **Test case Procedure** | 1. **Mở trang đánh giá sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id/reviews` với sản phẩm có nhiều đánh giá với rating khác nhau<br>2. **Quan sát rating filters**<br>   - Quan sát phần rating filters ở đầu trang<br>   - Quan sát nút "Tất cả" với số lượng tổng<br>   - Quan sát các nút rating 5⭐, 4⭐, 3⭐, 2⭐, 1⭐ với số lượng tương ứng<br>3. **Filter theo 5 sao**<br>   - Click vào nút "5 ⭐"<br>   - Quan sát danh sách đánh giá cập nhật<br>   - Xác nhận chỉ hiển thị đánh giá 5 sao<br>   - Xác nhận nút "5 ⭐" được highlight (bg-primary, text-white)<br>4. **Filter theo 4 sao**<br>   - Click vào nút "4 ⭐"<br>   - Quan sát danh sách đánh giá cập nhật<br>   - Xác nhận chỉ hiển thị đánh giá 4 sao<br>5. **Filter theo các rating khác**<br>   - Lần lượt click vào 3⭐, 2⭐, 1⭐<br>   - Quan sát danh sách đánh giá cập nhật theo từng rating<br>6. **Quay lại "Tất cả"**<br>   - Click vào nút "Tất cả"<br>   - Quan sát danh sách đánh giá trở về hiển thị tất cả<br>   - Xác nhận nút "Tất cả" được highlight |
| **Expected Output** | - [ ] Rating filters hiển thị ở đầu trang<br>- [ ] Nút "Tất cả" hiển thị với số lượng tổng đánh giá<br>- [ ] Các nút rating (5⭐, 4⭐, 3⭐, 2⭐, 1⭐) hiển thị với số lượng tương ứng<br>- [ ] Click vào rating filter:<br>  - [ ] Nút được highlight (bg-primary, text-white)<br>  - [ ] Danh sách đánh giá cập nhật chỉ hiển thị đánh giá có rating tương ứng<br>  - [ ] Số lượng đánh giá hiển thị đúng<br>- [ ] Click lại vào cùng rating filter để bỏ filter (toggle)<br>- [ ] Click "Tất cả" hiển thị lại tất cả đánh giá<br>- [ ] Loading state hiển thị khi đang filter (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có nhiều đánh giá với rating khác nhau (1-5 sao) trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot rating filters<br>- [ ] Screenshot khi filter theo 5 sao<br>- [ ] Screenshot khi filter theo 4 sao<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-080: Filter đánh giá có ảnh

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-080 |
| **Description Test case** | Kiểm tra filter đánh giá có ảnh để chỉ hiển thị các đánh giá có kèm ảnh. |
| **Test case Procedure** | 1. **Mở trang đánh giá sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id/reviews` với sản phẩm có đánh giá có ảnh và không có ảnh<br>2. **Quan sát filter "Có ảnh"**<br>   - Quan sát nút filter "Có ảnh" với icon Camera<br>   - Xác nhận nút chưa được chọn (bg-gray-100, text-gray-700)<br>3. **Kích hoạt filter "Có ảnh"**<br>   - Click vào nút "Có ảnh"<br>   - Quan sát nút được highlight (bg-primary, text-white)<br>   - Quan sát danh sách đánh giá cập nhật<br>   - Xác nhận chỉ hiển thị đánh giá có ảnh<br>4. **Kiểm tra đánh giá có ảnh**<br>   - Scroll xuống để xem các đánh giá<br>   - Xác nhận tất cả đánh giá hiển thị đều có ảnh<br>   - Xác nhận ảnh hiển thị đúng, không bị vỡ<br>5. **Tắt filter "Có ảnh"**<br>   - Click lại vào nút "Có ảnh"<br>   - Quan sát danh sách đánh giá trở về hiển thị tất cả (có ảnh và không có ảnh)<br>   - Xác nhận nút trở về trạng thái chưa chọn |
| **Expected Output** | - [ ] Nút filter "Có ảnh" hiển thị với icon Camera<br>- [ ] Trạng thái ban đầu: nút chưa được chọn (bg-gray-100, text-gray-700)<br>- [ ] Click vào "Có ảnh":<br>  - [ ] Nút được highlight (bg-primary, text-white)<br>  - [ ] Danh sách đánh giá cập nhật chỉ hiển thị đánh giá có ảnh<br>  - [ ] Tất cả đánh giá hiển thị đều có ít nhất 1 ảnh<br>  - [ ] Ảnh hiển thị đúng, không bị vỡ<br>- [ ] Click lại để tắt filter:<br>  - [ ] Nút trở về trạng thái chưa chọn<br>  - [ ] Danh sách đánh giá hiển thị lại tất cả (có ảnh và không có ảnh)<br>- [ ] Có thể kết hợp filter "Có ảnh" với filter rating (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có đánh giá có ảnh và không có ảnh trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot filter "Có ảnh"<br>- [ ] Screenshot danh sách đánh giá có ảnh<br>- [ ] Screenshot một đánh giá có ảnh<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-081: Sort đánh giá (mới nhất, cũ nhất)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-081 |
| **Description Test case** | Kiểm tra sort đánh giá theo mới nhất hoặc cũ nhất (nếu có tính năng sort). |
| **Test case Procedure** | 1. **Mở trang đánh giá sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id/reviews` với sản phẩm có nhiều đánh giá<br>2. **Tìm tùy chọn sort**<br>   - Tìm nút/tùy chọn sort đánh giá (nếu có)<br>   - Quan sát các option sort có sẵn<br>3. **Sort theo mới nhất**<br>   - Click vào sort "Mới nhất" (nếu có)<br>   - Quan sát danh sách đánh giá sắp xếp lại<br>   - Xác nhận đánh giá mới nhất hiển thị đầu tiên<br>   - Kiểm tra ngày đánh giá giảm dần<br>4. **Sort theo cũ nhất**<br>   - Click vào sort "Cũ nhất" (nếu có)<br>   - Quan sát danh sách đánh giá sắp xếp lại<br>   - Xác nhận đánh giá cũ nhất hiển thị đầu tiên<br>   - Kiểm tra ngày đánh giá tăng dần<br>5. **Kiểm tra sort mặc định**<br>   - Quan sát sort mặc định khi mở trang<br>   - Xác nhận thứ tự hiển thị (thường là mới nhất) |
| **Expected Output** | - [ ] Tùy chọn sort hiển thị rõ ràng (nếu có tính năng sort)<br>- [ ] Sort theo "Mới nhất":<br>  - [ ] Đánh giá mới nhất hiển thị đầu tiên<br>  - [ ] Ngày đánh giá giảm dần (mới → cũ)<br>- [ ] Sort theo "Cũ nhất":<br>  - [ ] Đánh giá cũ nhất hiển thị đầu tiên<br>  - [ ] Ngày đánh giá tăng dần (cũ → mới)<br>- [ ] Sort mặc định thường là "Mới nhất"<br>- [ ] Danh sách đánh giá cập nhật ngay sau khi chọn sort<br>- [ ] Loading state hiển thị khi đang sort (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có nhiều đánh giá với ngày khác nhau trong hệ thống<br>- Có tính năng sort (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng sort, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot tùy chọn sort<br>- [ ] Screenshot khi sort theo mới nhất<br>- [ ] Screenshot khi sort theo cũ nhất<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-082: Xem chi tiết đánh giá (ảnh, thông tin)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-082 |
| **Description Test case** | Kiểm tra xem chi tiết đánh giá: click vào ảnh để xem full size, xem thông tin đầy đủ của đánh giá. |
| **Test case Procedure** | 1. **Mở trang đánh giá sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id/reviews` với sản phẩm có đánh giá có ảnh<br>2. **Tìm đánh giá có ảnh**<br>   - Scroll xuống để tìm đánh giá có ảnh<br>   - Quan sát ảnh thumbnail hiển thị trong đánh giá<br>3. **Click vào ảnh đánh giá**<br>   - Click vào một ảnh trong đánh giá<br>   - Quan sát modal hoặc lightbox hiển thị ảnh full size<br>   - Quan sát có thể swipe để xem các ảnh khác (nếu đánh giá có nhiều ảnh)<br>4. **Xem thông tin đánh giá đầy đủ**<br>   - Quan sát tên người dùng<br>   - Quan sát avatar<br>   - Quan sát rating<br>   - Quan sát nội dung đánh giá đầy đủ (có thể bị cắt nếu quá dài)<br>   - Quan sát ngày đánh giá<br>   - Quan sát badge "Đã mua" (nếu có)<br>5. **Đóng modal ảnh**<br>   - Click vào nút đóng hoặc click ra ngoài modal<br>   - Quan sát modal đóng và trở về danh sách đánh giá |
| **Expected Output** | - [ ] Đánh giá có ảnh hiển thị thumbnail ảnh<br>- [ ] Click vào ảnh:<br>  - [ ] Modal/lightbox hiển thị ảnh full size<br>  - [ ] Ảnh hiển thị rõ ràng, không bị vỡ<br>  - [ ] Có thể swipe để xem các ảnh khác (nếu có nhiều ảnh)<br>  - [ ] Có nút đóng hoặc click ra ngoài để đóng<br>- [ ] Thông tin đánh giá hiển thị đầy đủ:<br>  - [ ] Tên người dùng<br>  - [ ] Avatar (hoặc icon mặc định)<br>  - [ ] Rating với icon sao<br>  - [ ] Nội dung đánh giá (có thể expand nếu quá dài)<br>  - [ ] Ngày đánh giá format đúng<br>  - [ ] Badge "Đã mua" (nếu là verified purchase)<br>- [ ] Có thể đóng modal ảnh và trở về danh sách |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có đánh giá có ảnh trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot đánh giá có ảnh<br>- [ ] Screenshot modal ảnh full size<br>- [ ] Screenshot thông tin đánh giá đầy đủ<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-083: Xem thống kê rating tổng quan

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-083 |
| **Description Test case** | Kiểm tra hiển thị thống kê rating tổng quan: đánh giá trung bình, số lượng đánh giá theo từng rating (1-5 sao), phần trăm từng rating. |
| **Test case Procedure** | 1. **Mở trang đánh giá sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id/reviews` với sản phẩm có nhiều đánh giá<br>2. **Quan sát thống kê rating**<br>   - Tìm phần thống kê rating tổng quan (nếu có)<br>   - Quan sát đánh giá trung bình hiển thị<br>   - Quan sát số lượng đánh giá tổng<br>   - Quan sát số lượng đánh giá theo từng rating (1-5 sao)<br>   - Quan sát phần trăm từng rating (nếu có)<br>3. **Kiểm tra tính chính xác**<br>   - Tính toán đánh giá trung bình từ danh sách đánh giá<br>   - So sánh với số hiển thị<br>   - Đếm số lượng đánh giá theo từng rating<br>   - So sánh với số hiển thị trong rating filters<br>4. **Kiểm tra visual representation**<br>   - Quan sát có progress bar hoặc visual representation cho từng rating không<br>   - Xác nhận visual representation phản ánh đúng phần trăm |
| **Expected Output** | - [ ] Thống kê rating tổng quan hiển thị (nếu có tính năng này)<br>- [ ] Đánh giá trung bình hiển thị:<br>  - [ ] Số điểm trung bình (ví dụ: 4.5)<br>  - [ ] Icon sao hoặc visual representation<br>- [ ] Số lượng đánh giá tổng hiển thị chính xác<br>- [ ] Số lượng đánh giá theo từng rating (1-5 sao) hiển thị:<br>  - [ ] Số lượng chính xác<br>  - [ ] Khớp với số lượng trong rating filters<br>- [ ] Phần trăm từng rating hiển thị (nếu có)<br>- [ ] Visual representation (progress bar, v.v.) phản ánh đúng phần trăm<br>- [ ] Thống kê cập nhật khi filter đánh giá |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có nhiều đánh giá với rating khác nhau trong hệ thống<br>- Có tính năng thống kê rating (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng thống kê rating, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot thống kê rating tổng quan<br>- [ ] Screenshot đánh giá trung bình<br>- [ ] Screenshot số lượng đánh giá theo rating<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-084: Xem danh sách sản phẩm trong giỏ hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-084 |
| **Description Test case** | Kiểm tra hiển thị danh sách sản phẩm trong giỏ hàng với thông tin đầy đủ: hình ảnh, tên, variant, giá, số lượng. |
| **Test case Procedure** | 1. **Thêm sản phẩm vào giỏ hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Thêm ít nhất 2-3 sản phẩm vào giỏ hàng (có variant và không có variant)<br>2. **Mở trang giỏ hàng**<br>   - Click vào icon giỏ hàng ở header hoặc footer<br>   - Xác nhận điều hướng đến `/cart`<br>3. **Quan sát danh sách sản phẩm**<br>   - Quan sát header shop với checkbox "Chọn tất cả"<br>   - Quan sát danh sách sản phẩm trong giỏ<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Checkbox để chọn/bỏ chọn<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Thông tin variant (màu, size) nếu có<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>     - Số lượng<br>     - Nút xóa<br>4. **Kiểm tra layout**<br>   - Xác nhận layout hiển thị đẹp, không bị lệch<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận text không bị cắt quá nhiều |
| **Expected Output** | - [ ] Trang giỏ hàng load thành công<br>- [ ] Header shop hiển thị:<br>  - [ ] Checkbox "Chọn tất cả"<br>  - [ ] Tên shop<br>- [ ] Danh sách sản phẩm hiển thị:<br>  - [ ] Checkbox để chọn/bỏ chọn từng sản phẩm<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm hiển thị đầy đủ (hoặc line-clamp-2)<br>  - [ ] Thông tin variant hiển thị (màu, size) nếu có<br>  - [ ] Giá sản phẩm hiển thị rõ ràng (format đúng)<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>  - [ ] Số lượng hiển thị với bộ chọn số lượng<br>  - [ ] Nút xóa hiển thị<br>- [ ] Layout đẹp, không bị lệch<br>- [ ] Có thể scroll để xem tất cả sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 2-3 sản phẩm trong giỏ hàng (có variant và không có variant) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách sản phẩm trong giỏ hàng<br>- [ ] Screenshot một sản phẩm chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-085: Chọn/bỏ chọn sản phẩm trong giỏ hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-085 |
| **Description Test case** | Kiểm tra chọn/bỏ chọn sản phẩm trong giỏ hàng (từng sản phẩm và chọn tất cả), cập nhật tổng tiền. |
| **Test case Procedure** | 1. **Mở trang giỏ hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/cart` với ít nhất 2-3 sản phẩm<br>2. **Quan sát trạng thái ban đầu**<br>   - Quan sát checkbox "Chọn tất cả" chưa được chọn<br>   - Quan sát các checkbox sản phẩm chưa được chọn<br>   - Quan sát tổng tiền hiển thị (có thể = 0 hoặc tổng tất cả)<br>3. **Chọn từng sản phẩm**<br>   - Click vào checkbox của sản phẩm đầu tiên<br>   - Quan sát checkbox được đánh dấu<br>   - Quan sát tổng tiền cập nhật<br>   - Click vào checkbox của sản phẩm thứ hai<br>   - Quan sát cả hai checkbox được đánh dấu<br>   - Quan sát tổng tiền cập nhật<br>4. **Chọn tất cả**<br>   - Click vào checkbox "Chọn tất cả" ở header shop<br>   - Quan sát tất cả checkbox sản phẩm được đánh dấu<br>   - Quan sát tổng tiền cập nhật = tổng tất cả sản phẩm<br>5. **Bỏ chọn từng sản phẩm**<br>   - Click lại vào checkbox của một sản phẩm<br>   - Quan sát checkbox bỏ đánh dấu<br>   - Quan sát checkbox "Chọn tất cả" tự động bỏ đánh dấu<br>   - Quan sát tổng tiền cập nhật<br>6. **Bỏ chọn tất cả**<br>   - Click lại vào checkbox "Chọn tất cả"<br>   - Quan sát tất cả checkbox sản phẩm bỏ đánh dấu<br>   - Quan sát tổng tiền = 0 hoặc cập nhật đúng |
| **Expected Output** | - [ ] Checkbox "Chọn tất cả" hiển thị ở header shop<br>- [ ] Mỗi sản phẩm có checkbox riêng<br>- [ ] Click checkbox sản phẩm:<br>  - [ ] Checkbox được đánh dấu/bỏ đánh dấu<br>  - [ ] Tổng tiền cập nhật ngay lập tức<br>  - [ ] Checkbox "Chọn tất cả" tự động đánh dấu nếu tất cả sản phẩm được chọn<br>- [ ] Click "Chọn tất cả":<br>  - [ ] Tất cả checkbox sản phẩm được đánh dấu<br>  - [ ] Tổng tiền = tổng tất cả sản phẩm<br>- [ ] Bỏ chọn một sản phẩm:<br>  - [ ] Checkbox "Chọn tất cả" tự động bỏ đánh dấu<br>  - [ ] Tổng tiền cập nhật trừ đi giá sản phẩm đó<br>- [ ] Bỏ chọn tất cả:<br>  - [ ] Tất cả checkbox sản phẩm bỏ đánh dấu<br>  - [ ] Tổng tiền = 0 hoặc cập nhật đúng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 2-3 sản phẩm trong giỏ hàng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot khi chọn từng sản phẩm<br>- [ ] Screenshot khi chọn tất cả<br>- [ ] Screenshot tổng tiền cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-086: Thay đổi số lượng sản phẩm trong giỏ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-086 |
| **Description Test case** | Kiểm tra thay đổi số lượng sản phẩm trong giỏ hàng bằng bộ chọn số lượng, validation không vượt quá tồn kho, cập nhật tổng tiền. |
| **Test case Procedure** | 1. **Mở trang giỏ hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/cart` với sản phẩm có số lượng > 1<br>2. **Quan sát bộ chọn số lượng**<br>   - Quan sát số lượng hiện tại của sản phẩm<br>   - Quan sát nút "-" và "+"<br>   - Quan sát ô hiển thị số lượng<br>3. **Tăng số lượng**<br>   - Click nút "+" để tăng số lượng<br>   - Quan sát số lượng tăng lên<br>   - Quan sát tổng tiền cập nhật<br>   - Tiếp tục tăng cho đến khi đạt tồn kho tối đa<br>   - Thử tăng thêm 1 lần nữa<br>   - Quan sát có thông báo lỗi hoặc không cho tăng thêm<br>4. **Giảm số lượng**<br>   - Click nút "-" để giảm số lượng<br>   - Quan sát số lượng giảm xuống<br>   - Quan sát tổng tiền cập nhật<br>   - Thử giảm xuống 0<br>   - Quan sát có validation không cho giảm xuống dưới 1 hoặc sản phẩm bị xóa<br>5. **Nhập số lượng trực tiếp**<br>   - Click vào ô số lượng và nhập số trực tiếp (ví dụ: 5)<br>   - Quan sát số lượng cập nhật<br>   - Quan sát tổng tiền cập nhật<br>   - Thử nhập số lớn hơn tồn kho<br>   - Quan sát có validation và tự động điều chỉnh |
| **Expected Output** | - [ ] Bộ chọn số lượng hiển thị với nút "-", ô số lượng, nút "+"<br>- [ ] Click nút "+":<br>  - [ ] Số lượng tăng lên<br>  - [ ] Tổng tiền cập nhật ngay lập tức<br>  - [ ] Không thể tăng vượt quá tồn kho<br>  - [ ] Hiển thị thông báo lỗi nếu cố tăng vượt tồn kho<br>- [ ] Click nút "-":<br>  - [ ] Số lượng giảm xuống<br>  - [ ] Tổng tiền cập nhật ngay lập tức<br>  - [ ] Không thể giảm xuống dưới 1 (hoặc sản phẩm bị xóa nếu giảm về 0)<br>- [ ] Nhập số lượng trực tiếp:<br>  - [ ] Số lượng cập nhật<br>  - [ ] Tự động điều chỉnh về tồn kho tối đa nếu nhập số lớn hơn<br>  - [ ] Tổng tiền cập nhật đúng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Validation (Validation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm có tồn kho trong giỏ hàng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot bộ chọn số lượng<br>- [ ] Screenshot khi tăng số lượng<br>- [ ] Screenshot thông báo lỗi khi vượt tồn kho<br>- [ ] Screenshot tổng tiền cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-087: Xóa sản phẩm khỏi giỏ hàng (swipe to delete)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-087 |
| **Description Test case** | Kiểm tra xóa sản phẩm khỏi giỏ hàng bằng nút xóa hoặc swipe to delete (nếu có), cập nhật tổng tiền. |
| **Test case Procedure** | 1. **Mở trang giỏ hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/cart` với ít nhất 2-3 sản phẩm<br>2. **Quan sát nút xóa**<br>   - Quan sát nút xóa (icon delete) hiển thị trên mỗi sản phẩm<br>3. **Xóa sản phẩm bằng nút xóa**<br>   - Click vào nút xóa của một sản phẩm<br>   - Quan sát sản phẩm biến mất khỏi danh sách<br>   - Quan sát tổng tiền cập nhật (trừ đi giá sản phẩm đã xóa)<br>   - Quan sát thông báo "Đã xóa sản phẩm" (nếu có)<br>4. **Xóa sản phẩm bằng swipe to delete**<br>   - Swipe sang trái trên một sản phẩm (nếu có tính năng swipe to delete)<br>   - Quan sát nút xóa hiển thị<br>   - Click vào nút xóa hoặc swipe tiếp để xóa<br>   - Quan sát sản phẩm biến mất<br>5. **Kiểm tra giỏ hàng rỗng**<br>   - Xóa tất cả sản phẩm trong giỏ<br>   - Quan sát empty state hiển thị<br>   - Quan sát thông báo "Giỏ hàng trống" |
| **Expected Output** | - [ ] Nút xóa hiển thị trên mỗi sản phẩm<br>- [ ] Click nút xóa:<br>  - [ ] Sản phẩm biến mất khỏi danh sách ngay lập tức<br>  - [ ] Tổng tiền cập nhật trừ đi giá sản phẩm đã xóa<br>  - [ ] Hiển thị thông báo "Đã xóa sản phẩm" (nếu có)<br>- [ ] Swipe to delete (nếu có):<br>  - [ ] Swipe sang trái hiển thị nút xóa<br>  - [ ] Click nút xóa hoặc swipe tiếp để xóa<br>  - [ ] Animation mượt mà<br>- [ ] Khi giỏ hàng rỗng:<br>  - [ ] Empty state hiển thị<br>  - [ ] Thông báo "Giỏ hàng trống"<br>  - [ ] Nút "Tiếp tục mua sắm" hoặc tương tự (nếu có)<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 2-3 sản phẩm trong giỏ hàng |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút xóa<br>- [ ] Screenshot khi xóa sản phẩm<br>- [ ] Screenshot empty state<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-088: Áp dụng voucher trong giỏ hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-088 |
| **Description Test case** | Kiểm tra áp dụng voucher trong giỏ hàng, hiển thị giảm giá, validation điều kiện voucher, xóa voucher. |
| **Test case Procedure** | 1. **Mở trang giỏ hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/cart` với sản phẩm có tổng tiền đủ điều kiện voucher<br>2. **Quan sát phần voucher**<br>   - Quan sát section "Mã giảm giá" hoặc "Voucher"<br>   - Quan sát nút "Áp dụng" hoặc "Chọn voucher"<br>3. **Chọn voucher**<br>   - Click vào nút "Chọn voucher" hoặc "Áp dụng"<br>   - Quan sát modal hoặc điều hướng đến trang chọn voucher<br>   - Chọn một voucher phù hợp<br>   - Quan sát quay lại trang giỏ hàng<br>4. **Kiểm tra voucher được áp dụng**<br>   - Quan sát voucher hiển thị trong giỏ hàng<br>   - Quan sát số tiền giảm giá hiển thị<br>   - Quan sát tổng tiền cập nhật (trừ đi giảm giá)<br>5. **Xóa voucher**<br>   - Click vào nút xóa voucher hoặc "Bỏ áp dụng"<br>   - Quan sát voucher bị xóa<br>   - Quan sát tổng tiền cập nhật (cộng lại giảm giá)<br>6. **Test validation**<br>   - Thử áp dụng voucher không đủ điều kiện (ví dụ: đơn tối thiểu)<br>   - Quan sát thông báo lỗi hiển thị |
| **Expected Output** | - [ ] Section voucher hiển thị trong giỏ hàng<br>- [ ] Nút "Chọn voucher" hoặc "Áp dụng" hiển thị<br>- [ ] Click chọn voucher:<br>  - [ ] Modal hoặc điều hướng đến trang chọn voucher<br>  - [ ] Có thể chọn voucher phù hợp<br>  - [ ] Quay lại giỏ hàng với voucher đã chọn<br>- [ ] Voucher được áp dụng:<br>  - [ ] Voucher hiển thị trong giỏ hàng<br>  - [ ] Số tiền giảm giá hiển thị rõ ràng<br>  - [ ] Tổng tiền cập nhật trừ đi giảm giá<br>- [ ] Xóa voucher:<br>  - [ ] Voucher bị xóa khỏi giỏ hàng<br>  - [ ] Tổng tiền cập nhật cộng lại giảm giá<br>- [ ] Validation:<br>  - [ ] Hiển thị thông báo lỗi nếu voucher không đủ điều kiện<br>  - [ ] Không cho phép áp dụng voucher không hợp lệ |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Validation (Validation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm trong giỏ hàng với tổng tiền đủ điều kiện voucher<br>- Có voucher khả dụng trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot section voucher<br>- [ ] Screenshot khi chọn voucher<br>- [ ] Screenshot voucher được áp dụng<br>- [ ] Screenshot tổng tiền sau khi áp dụng voucher<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-089: Xem tổng tiền và phí ship trong giỏ

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-089 |
| **Description Test case** | Kiểm tra hiển thị tổng tiền, phí ship, giảm giá voucher, tổng thanh toán trong phần thanh toán của giỏ hàng. |
| **Test case Procedure** | 1. **Mở trang giỏ hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/cart` với sản phẩm đã chọn<br>2. **Quan sát phần thanh toán**<br>   - Scroll xuống phần thanh toán (Pay component)<br>   - Quan sát các thông tin hiển thị:<br>     - Tổng tiền sản phẩm<br>     - Phí ship<br>     - Giảm giá voucher (nếu có)<br>     - Tổng thanh toán<br>3. **Kiểm tra tính toán**<br>   - Tính toán tổng tiền sản phẩm từ các sản phẩm đã chọn<br>   - So sánh với số hiển thị<br>   - Kiểm tra phí ship hiển thị (có thể = 0 nếu freeship)<br>   - Kiểm tra giảm giá voucher (nếu có)<br>   - Tính toán tổng thanh toán = tổng tiền + phí ship - giảm giá<br>   - So sánh với số hiển thị<br>4. **Thay đổi số lượng sản phẩm**<br>   - Thay đổi số lượng một sản phẩm<br>   - Quan sát tổng tiền cập nhật ngay lập tức<br>   - Quan sát tổng thanh toán cập nhật<br>5. **Áp dụng/xóa voucher**<br>   - Áp dụng voucher<br>   - Quan sát giảm giá và tổng thanh toán cập nhật<br>   - Xóa voucher<br>   - Quan sát giảm giá và tổng thanh toán cập nhật |
| **Expected Output** | - [ ] Phần thanh toán hiển thị ở cuối trang giỏ hàng<br>- [ ] Các thông tin hiển thị:<br>  - [ ] Tổng tiền sản phẩm (từ các sản phẩm đã chọn)<br>  - [ ] Phí ship (có thể = 0 nếu freeship)<br>  - [ ] Giảm giá voucher (nếu có, có thể = 0)<br>  - [ ] Tổng thanh toán (tổng tiền + phí ship - giảm giá)<br>- [ ] Tính toán chính xác:<br>  - [ ] Tổng tiền = tổng giá các sản phẩm đã chọn<br>  - [ ] Tổng thanh toán = tổng tiền + phí ship - giảm giá<br>- [ ] Cập nhật ngay lập tức khi:<br>  - [ ] Thay đổi số lượng sản phẩm<br>  - [ ] Chọn/bỏ chọn sản phẩm<br>  - [ ] Áp dụng/xóa voucher<br>- [ ] Format giá đúng (ví dụ: 1.000.000đ)<br>- [ ] Nút "Thanh toán" hiển thị (nếu có sản phẩm đã chọn) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có sản phẩm trong giỏ hàng đã chọn |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot phần thanh toán<br>- [ ] Screenshot tổng tiền và phí ship<br>- [ ] Screenshot khi áp dụng voucher<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-090: Xem giỏ hàng rỗng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-090 |
| **Description Test case** | Kiểm tra hiển thị khi giỏ hàng rỗng: empty state, thông báo, nút điều hướng. |
| **Test case Procedure** | 1. **Xóa tất cả sản phẩm trong giỏ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/cart`<br>   - Xóa tất cả sản phẩm trong giỏ hàng (nếu có)<br>2. **Quan sát empty state**<br>   - Quan sát component EmptyCart hiển thị<br>   - Quan sát icon hoặc hình ảnh empty state<br>   - Quan sát thông báo "Giỏ hàng trống" hoặc tương tự<br>   - Quan sát nút "Tiếp tục mua sắm" hoặc tương tự<br>3. **Click nút điều hướng**<br>   - Click vào nút "Tiếp tục mua sắm" hoặc tương tự<br>   - Quan sát điều hướng đến trang chủ hoặc trang danh mục<br>4. **Thêm sản phẩm vào giỏ**<br>   - Điều hướng đến một sản phẩm<br>   - Thêm sản phẩm vào giỏ hàng<br>   - Quay lại trang giỏ hàng<br>   - Quan sát danh sách sản phẩm hiển thị thay vì empty state |
| **Expected Output** | - [ ] EmptyCart component hiển thị khi giỏ hàng rỗng<br>- [ ] Empty state hiển thị:<br>  - [ ] Icon hoặc hình ảnh empty state<br>  - [ ] Thông báo rõ ràng (ví dụ: "Giỏ hàng trống")<br>  - [ ] Nút "Tiếp tục mua sắm" hoặc tương tự<br>- [ ] Click nút điều hướng:<br>  - [ ] Điều hướng đến trang chủ hoặc trang danh mục<br>- [ ] Khi thêm sản phẩm vào giỏ:<br>  - [ ] Empty state biến mất<br>  - [ ] Danh sách sản phẩm hiển thị<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Giỏ hàng rỗng (không có sản phẩm nào) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot empty state<br>- [ ] Screenshot nút "Tiếp tục mua sắm"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-091: Chọn địa chỉ giao hàng trong checkout

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-091 |
| **Description Test case** | Kiểm tra chọn địa chỉ giao hàng trong checkout, hiển thị thông tin địa chỉ, tính lại phí ship khi thay đổi địa chỉ. |
| **Test case Procedure** | 1. **Mở trang checkout**<br>   - Mở ứng dụng Zalo Mini App<br>   - Thêm sản phẩm vào giỏ hàng<br>   - Click "Thanh toán" từ giỏ hàng<br>   - Xác nhận điều hướng đến `/checkout`<br>2. **Quan sát địa chỉ giao hàng**<br>   - Quan sát ShippingAddressCard hiển thị<br>   - Quan sát địa chỉ mặc định hiển thị (nếu có)<br>   - Quan sát thông tin địa chỉ: tên, số điện thoại, địa chỉ chi tiết<br>3. **Thay đổi địa chỉ**<br>   - Click vào ShippingAddressCard hoặc nút "Thay đổi"<br>   - Quan sát modal hoặc điều hướng đến trang chọn địa chỉ<br>   - Chọn một địa chỉ khác<br>   - Quan sát quay lại trang checkout<br>4. **Kiểm tra phí ship cập nhật**<br>   - Quan sát phí ship được tính lại theo địa chỉ mới<br>   - Quan sát tổng thanh toán cập nhật<br>5. **Thêm địa chỉ mới**<br>   - Click "Thêm địa chỉ mới" (nếu có)<br>   - Điền thông tin địa chỉ mới<br>   - Lưu địa chỉ<br>   - Quan sát địa chỉ mới được chọn |
| **Expected Output** | - [ ] ShippingAddressCard hiển thị trên trang checkout<br>- [ ] Địa chỉ mặc định hiển thị (nếu có):<br>  - [ ] Tên người nhận<br>  - [ ] Số điện thoại<br>  - [ ] Địa chỉ chi tiết (số nhà, phường/xã, quận/huyện, tỉnh/thành phố)<br>- [ ] Click thay đổi địa chỉ:<br>  - [ ] Modal hoặc điều hướng đến trang chọn địa chỉ<br>  - [ ] Có thể chọn địa chỉ khác<br>  - [ ] Địa chỉ mới hiển thị trên checkout<br>- [ ] Phí ship được tính lại khi thay đổi địa chỉ<br>- [ ] Tổng thanh toán cập nhật theo phí ship mới<br>- [ ] Có thể thêm địa chỉ mới từ checkout |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có ít nhất 1 địa chỉ trong hệ thống<br>- Có sản phẩm trong giỏ hàng đã chọn |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot ShippingAddressCard<br>- [ ] Screenshot khi thay đổi địa chỉ<br>- [ ] Screenshot phí ship cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-092: Thay đổi phương thức thanh toán (COD/Bank Transfer)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-092 |
| **Description Test case** | Kiểm tra thay đổi phương thức thanh toán giữa COD (Thanh toán khi nhận hàng) và Bank Transfer (Chuyển khoản ngân hàng). |
| **Test case Procedure** | 1. **Mở trang checkout**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/checkout` với sản phẩm đã chọn<br>2. **Quan sát phương thức thanh toán**<br>   - Quan sát phần chọn phương thức thanh toán<br>   - Quan sát phương thức mặc định (thường là COD)<br>   - Quan sát các tùy chọn: COD và Bank Transfer<br>3. **Chọn COD**<br>   - Click vào phương thức COD (nếu chưa chọn)<br>   - Quan sát phương thức được highlight<br>   - Quan sát không có thông tin chuyển khoản hiển thị<br>4. **Chọn Bank Transfer**<br>   - Click vào phương thức Bank Transfer<br>   - Quan sát phương thức được highlight<br>   - Quan sát thông tin chuyển khoản hiển thị (nếu có preview)<br>5. **Đặt hàng với COD**<br>   - Chọn COD<br>   - Click "Đặt hàng"<br>   - Quan sát quá trình đặt hàng<br>   - Xác nhận không có thông tin chuyển khoản<br>6. **Đặt hàng với Bank Transfer**<br>   - Chọn Bank Transfer<br>   - Click "Đặt hàng"<br>   - Quan sát quá trình đặt hàng<br>   - Quan sát modal thông tin chuyển khoản hiển thị sau khi đặt hàng thành công |
| **Expected Output** | - [ ] Phần chọn phương thức thanh toán hiển thị<br>- [ ] Có 2 tùy chọn:<br>  - [ ] COD (Thanh toán khi nhận hàng)<br>  - [ ] Bank Transfer (Chuyển khoản ngân hàng)<br>- [ ] Phương thức mặc định thường là COD<br>- [ ] Click chọn phương thức:<br>  - [ ] Phương thức được highlight<br>  - [ ] Có thể chuyển đổi giữa các phương thức<br>- [ ] Đặt hàng với COD:<br>  - [ ] Không có thông tin chuyển khoản<br>  - [ ] Đặt hàng thành công<br>- [ ] Đặt hàng với Bank Transfer:<br>  - [ ] Modal thông tin chuyển khoản hiển thị sau khi đặt hàng thành công<br>  - [ ] Thông tin chuyển khoản đầy đủ (số tài khoản, tên ngân hàng, số tiền, mã đơn hàng) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có sản phẩm trong giỏ hàng đã chọn |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot phần chọn phương thức thanh toán<br>- [ ] Screenshot khi chọn COD<br>- [ ] Screenshot khi chọn Bank Transfer<br>- [ ] Screenshot modal thông tin chuyển khoản<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-093: Áp dụng điểm tích lũy trong checkout

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-093 |
| **Description Test case** | Kiểm tra áp dụng điểm tích lũy trong checkout, hiển thị số điểm khả dụng, tính giảm giá, validation không vượt quá số điểm có. |
| **Test case Procedure** | 1. **Mở trang checkout**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/checkout` với sản phẩm đã chọn<br>   - Đảm bảo tài khoản có điểm tích lũy<br>2. **Quan sát phần điểm tích lũy**<br>   - Tìm phần "Điểm tích lũy" hoặc "Dùng điểm"<br>   - Quan sát số điểm khả dụng hiển thị<br>   - Quan sát checkbox "Sử dụng điểm" hoặc toggle<br>3. **Bật sử dụng điểm**<br>   - Click vào checkbox "Sử dụng điểm" hoặc toggle<br>   - Quan sát số điểm được áp dụng (thường = tất cả điểm hoặc tối đa theo quy định)<br>   - Quan sát số tiền giảm giá từ điểm hiển thị<br>   - Quan sát tổng thanh toán cập nhật (trừ đi giảm giá từ điểm)<br>4. **Tắt sử dụng điểm**<br>   - Click lại vào checkbox để tắt<br>   - Quan sát số tiền giảm giá từ điểm = 0<br>   - Quan sát tổng thanh toán cập nhật (cộng lại giảm giá từ điểm)<br>5. **Kiểm tra validation**<br>   - Kiểm tra số điểm được áp dụng không vượt quá số điểm khả dụng<br>   - Kiểm tra số tiền giảm giá từ điểm không vượt quá tổng thanh toán |
| **Expected Output** | - [ ] Phần điểm tích lũy hiển thị trên trang checkout<br>- [ ] Số điểm khả dụng hiển thị rõ ràng<br>- [ ] Checkbox "Sử dụng điểm" hoặc toggle hiển thị<br>- [ ] Bật sử dụng điểm:<br>  - [ ] Số điểm được áp dụng hiển thị (thường = tất cả điểm hoặc tối đa)<br>  - [ ] Số tiền giảm giá từ điểm hiển thị (ví dụ: 1 điểm = 1.000đ)<br>  - [ ] Tổng thanh toán cập nhật trừ đi giảm giá từ điểm<br>- [ ] Tắt sử dụng điểm:<br>  - [ ] Số tiền giảm giá từ điểm = 0<br>  - [ ] Tổng thanh toán cập nhật cộng lại giảm giá từ điểm<br>- [ ] Validation:<br>  - [ ] Số điểm được áp dụng không vượt quá số điểm khả dụng<br>  - [ ] Số tiền giảm giá từ điểm không vượt quá tổng thanh toán |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Validation (Validation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Tài khoản có điểm tích lũy (> 0)<br>- Có sản phẩm trong giỏ hàng đã chọn |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot phần điểm tích lũy<br>- [ ] Screenshot khi bật sử dụng điểm<br>- [ ] Screenshot số tiền giảm giá từ điểm<br>- [ ] Screenshot tổng thanh toán cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-094: Nhập ghi chú đơn hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-094 |
| **Description Test case** | Kiểm tra nhập ghi chú đơn hàng trong checkout, hiển thị trong đơn hàng sau khi đặt. |
| **Test case Procedure** | 1. **Mở trang checkout**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/checkout` với sản phẩm đã chọn<br>2. **Tìm phần ghi chú**<br>   - Tìm ô nhập "Ghi chú đơn hàng" hoặc "Lời nhắn"<br>   - Quan sát placeholder text (ví dụ: "Ghi chú cho shop...")<br>3. **Nhập ghi chú**<br>   - Click vào ô nhập ghi chú<br>   - Nhập một ghi chú (ví dụ: "Giao hàng vào buổi sáng")<br>   - Quan sát text hiển thị đúng<br>4. **Xóa ghi chú**<br>   - Xóa text trong ô nhập<br>   - Quan sát ô nhập trống<br>5. **Đặt hàng với ghi chú**<br>   - Nhập lại ghi chú<br>   - Click "Đặt hàng"<br>   - Quan sát quá trình đặt hàng<br>   - Sau khi đặt hàng thành công, xem chi tiết đơn hàng<br>   - Xác nhận ghi chú hiển thị trong đơn hàng |
| **Expected Output** | - [ ] Ô nhập ghi chú hiển thị trên trang checkout<br>- [ ] Placeholder text hiển thị rõ ràng<br>- [ ] Có thể nhập text vào ô ghi chú<br>- [ ] Text hiển thị đúng khi nhập<br>- [ ] Có thể xóa text trong ô ghi chú<br>- [ ] Đặt hàng với ghi chú:<br>  - [ ] Ghi chú được lưu vào đơn hàng<br>  - [ ] Ghi chú hiển thị trong chi tiết đơn hàng sau khi đặt<br>- [ ] Đặt hàng không có ghi chú:<br>  - [ ] Đơn hàng vẫn được tạo thành công<br>  - [ ] Không có lỗi validation |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có sản phẩm trong giỏ hàng đã chọn |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot ô nhập ghi chú<br>- [ ] Screenshot khi nhập ghi chú<br>- [ ] Screenshot ghi chú trong chi tiết đơn hàng<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-095: Validation form checkout (thiếu địa chỉ, thiếu thông tin)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-095 |
| **Description Test case** | Kiểm tra validation form checkout khi thiếu địa chỉ, thiếu thông tin bắt buộc, hiển thị thông báo lỗi. |
| **Test case Procedure** | 1. **Mở trang checkout không có địa chỉ**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/checkout` với sản phẩm đã chọn<br>   - Xóa tất cả địa chỉ (nếu có thể) hoặc test với tài khoản không có địa chỉ<br>2. **Thử đặt hàng không có địa chỉ**<br>   - Click "Đặt hàng"<br>   - Quan sát thông báo lỗi hiển thị<br>   - Xác nhận không thể đặt hàng<br>3. **Thêm địa chỉ**<br>   - Click "Thêm địa chỉ" hoặc "Chọn địa chỉ"<br>   - Thêm địa chỉ mới hoặc chọn địa chỉ có sẵn<br>   - Quay lại trang checkout<br>4. **Thử đặt hàng với địa chỉ**<br>   - Click "Đặt hàng"<br>   - Quan sát quá trình đặt hàng<br>   - Xác nhận có thể đặt hàng thành công<br>5. **Test các trường hợp validation khác**<br>   - Thử đặt hàng với giỏ hàng rỗng (nếu có thể)<br>   - Quan sát thông báo lỗi<br>   - Thử đặt hàng với sản phẩm hết hàng<br>   - Quan sát thông báo lỗi |
| **Expected Output** | - [ ] Validation khi thiếu địa chỉ:<br>  - [ ] Hiển thị thông báo lỗi "Vui lòng chọn địa chỉ giao hàng" hoặc tương tự<br>  - [ ] Không thể đặt hàng<br>  - [ ] Nút "Đặt hàng" có thể bị disable hoặc hiển thị lỗi<br>- [ ] Sau khi thêm địa chỉ:<br>  - [ ] Có thể đặt hàng thành công<br>- [ ] Validation các trường hợp khác:<br>  - [ ] Thông báo lỗi khi giỏ hàng rỗng<br>  - [ ] Thông báo lỗi khi sản phẩm hết hàng<br>  - [ ] Thông báo lỗi khi voucher không hợp lệ (nếu có)<br>- [ ] Thông báo lỗi hiển thị rõ ràng, dễ hiểu |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Validation (Validation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có sản phẩm trong giỏ hàng đã chọn<br>- Có thể test với tài khoản không có địa chỉ |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot thông báo lỗi khi thiếu địa chỉ<br>- [ ] Screenshot thông báo lỗi các trường hợp khác<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-096: Xem thông tin chuyển khoản sau khi đặt hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-096 |
| **Description Test case** | Kiểm tra hiển thị thông tin chuyển khoản sau khi đặt hàng thành công với phương thức Bank Transfer: số tài khoản, tên ngân hàng, số tiền, mã đơn hàng, QR code. |
| **Test case Procedure** | 1. **Đặt hàng với Bank Transfer**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/checkout` với sản phẩm đã chọn<br>   - Chọn phương thức thanh toán "Bank Transfer"<br>   - Click "Đặt hàng"<br>2. **Quan sát modal thông tin chuyển khoản**<br>   - Quan sát modal BankTransferModal hiển thị sau khi đặt hàng thành công<br>   - Quan sát các thông tin hiển thị:<br>     - Mã đơn hàng<br>     - Số tiền cần chuyển<br>     - Số tài khoản<br>     - Tên ngân hàng<br>     - Tên người nhận<br>     - QR code (nếu có)<br>3. **Copy thông tin chuyển khoản**<br>   - Click vào nút "Copy" hoặc icon copy bên cạnh số tài khoản<br>   - Quan sát thông báo "Đã copy"<br>   - Thử paste vào ứng dụng khác<br>   - Xác nhận số tài khoản được copy đúng<br>4. **Xem QR code**<br>   - Quan sát QR code hiển thị (nếu có)<br>   - Xác nhận QR code có thể scan được<br>5. **Đóng modal**<br>   - Click vào nút "Đóng" hoặc click ra ngoài modal<br>   - Quan sát modal đóng<br>   - Quan sát điều hướng đến trang đơn hàng hoặc trang chủ |
| **Expected Output** | - [ ] Modal BankTransferModal hiển thị sau khi đặt hàng thành công với Bank Transfer<br>- [ ] Thông tin chuyển khoản hiển thị đầy đủ:<br>  - [ ] Mã đơn hàng (order code)<br>  - [ ] Số tiền cần chuyển (format đúng, ví dụ: 1.000.000đ)<br>  - [ ] Số tài khoản<br>  - [ ] Tên ngân hàng (ví dụ: "Vietcombank")<br>  - [ ] Tên người nhận<br>  - [ ] QR code (nếu có, có thể scan được)<br>- [ ] Có thể copy số tài khoản:<br>  - [ ] Nút "Copy" hoặc icon copy hiển thị<br>  - [ ] Click copy hiển thị thông báo "Đã copy"<br>  - [ ] Số tài khoản được copy vào clipboard đúng<br>- [ ] Có thể đóng modal:<br>  - [ ] Nút "Đóng" hiển thị<br>  - [ ] Click đóng hoặc click ra ngoài đóng modal<br>  - [ ] Điều hướng đến trang đơn hàng hoặc trang chủ |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có sản phẩm trong giỏ hàng đã chọn<br>- Hệ thống hỗ trợ thanh toán Bank Transfer |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal thông tin chuyển khoản<br>- [ ] Screenshot QR code<br>- [ ] Screenshot khi copy số tài khoản<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-097: Xem chi tiết đơn hàng sau khi đặt thành công

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-097 |
| **Description Test case** | Kiểm tra điều hướng đến trang chi tiết đơn hàng sau khi đặt hàng thành công, hiển thị thông tin đầy đủ đơn hàng. |
| **Test case Procedure** | 1. **Đặt hàng thành công**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/checkout` với sản phẩm đã chọn<br>   - Chọn địa chỉ, phương thức thanh toán<br>   - Click "Đặt hàng"<br>2. **Quan sát sau khi đặt hàng**<br>   - Quan sát thông báo "Đặt hàng thành công"<br>   - Quan sát điều hướng tự động đến trang chi tiết đơn hàng (nếu có)<br>   - Hoặc click vào nút "Xem đơn hàng"<br>3. **Quan sát chi tiết đơn hàng**<br>   - Quan sát thông tin đơn hàng hiển thị:<br>     - Mã đơn hàng<br>     - Trạng thái đơn hàng (Đang xử lý, Đã xác nhận, v.v.)<br>     - Danh sách sản phẩm đã đặt<br>     - Tổng tiền sản phẩm<br>     - Phí ship<br>     - Giảm giá voucher (nếu có)<br>     - Giảm giá từ điểm (nếu có)<br>     - Tổng thanh toán<br>     - Địa chỉ giao hàng<br>     - Phương thức thanh toán<br>     - Ghi chú đơn hàng (nếu có)<br>4. **Kiểm tra thông tin chính xác**<br>   - So sánh thông tin đơn hàng với thông tin đã nhập trong checkout<br>   - Xác nhận tất cả thông tin khớp |
| **Expected Output** | - [ ] Sau khi đặt hàng thành công:<br>  - [ ] Hiển thị thông báo "Đặt hàng thành công"<br>  - [ ] Điều hướng tự động đến trang chi tiết đơn hàng (nếu có)<br>  - [ ] Hoặc có nút "Xem đơn hàng" để điều hướng<br>- [ ] Trang chi tiết đơn hàng hiển thị đầy đủ thông tin:<br>  - [ ] Mã đơn hàng<br>  - [ ] Trạng thái đơn hàng<br>  - [ ] Danh sách sản phẩm đã đặt (hình ảnh, tên, variant, số lượng, giá)<br>  - [ ] Tổng tiền sản phẩm<br>  - [ ] Phí ship<br>  - [ ] Giảm giá voucher (nếu có)<br>  - [ ] Giảm giá từ điểm (nếu có)<br>  - [ ] Tổng thanh toán<br>  - [ ] Địa chỉ giao hàng (tên, số điện thoại, địa chỉ chi tiết)<br>  - [ ] Phương thức thanh toán<br>  - [ ] Ghi chú đơn hàng (nếu có)<br>- [ ] Tất cả thông tin khớp với thông tin đã nhập trong checkout<br>- [ ] Có thể quay lại trang đơn hàng hoặc trang chủ |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có sản phẩm trong giỏ hàng đã chọn<br>- Có thể đặt hàng thành công |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot thông báo "Đặt hàng thành công"<br>- [ ] Screenshot trang chi tiết đơn hàng<br>- [ ] Screenshot thông tin đơn hàng đầy đủ<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-098: Xem danh sách voucher của tôi

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-098 |
| **Description Test case** | Kiểm tra hiển thị danh sách voucher của tôi với thông tin đầy đủ: mã voucher, giá trị giảm giá, điều kiện, hạn sử dụng. |
| **Test case Procedure** | 1. **Mở trang voucher**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/vouchers` từ giỏ hàng hoặc menu<br>2. **Quan sát danh sách voucher**<br>   - Quan sát header "Chọn Voucher"<br>   - Quan sát danh sách voucher hiển thị<br>   - Kiểm tra mỗi voucher hiển thị:<br>     - Mã voucher<br>     - Giá trị giảm giá (số tiền hoặc phần trăm)<br>     - Điều kiện áp dụng (đơn tối thiểu)<br>     - Hạn sử dụng<br>     - Trạng thái (Có thể dùng/Đã dùng/Hết hạn)<br>3. **Kiểm tra format hiển thị**<br>   - Xác nhận giá trị giảm giá format đúng<br>   - Xác nhận điều kiện áp dụng hiển thị rõ ràng<br>   - Xác nhận hạn sử dụng format đúng (dd/mm/yyyy hoặc readable format) |
| **Expected Output** | - [ ] Trang voucher load thành công<br>- [ ] Header "Chọn Voucher" hiển thị<br>- [ ] Danh sách voucher hiển thị:<br>  - [ ] Mã voucher hiển thị rõ ràng<br>  - [ ] Giá trị giảm giá (số tiền hoặc phần trăm) format đúng<br>  - [ ] Điều kiện áp dụng (ví dụ: "Áp dụng đơn từ 500.000đ")<br>  - [ ] Hạn sử dụng hiển thị (ví dụ: "HSD: 31/12/2024")<br>  - [ ] Trạng thái voucher hiển thị (màu sắc, badge)<br>- [ ] Loading state hiển thị khi đang tải voucher<br>- [ ] Hiển thị "Không có voucher nào" nếu không có voucher |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có ít nhất 1 voucher trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách voucher<br>- [ ] Screenshot một voucher chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-099: Filter voucher theo tab (Có thể dùng/Đã dùng/Hết hạn)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-099 |
| **Description Test case** | Kiểm tra filter voucher theo tab: Có thể dùng, Đã dùng, Hết hạn. |
| **Test case Procedure** | 1. **Mở trang voucher**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/vouchers`<br>2. **Quan sát các tab filter**<br>   - Quan sát các tab filter (nếu có): "Có thể dùng", "Đã dùng", "Hết hạn"<br>   - Quan sát tab mặc định (thường là "Có thể dùng")<br>3. **Filter theo "Có thể dùng"**<br>   - Click vào tab "Có thể dùng"<br>   - Quan sát danh sách voucher cập nhật<br>   - Xác nhận chỉ hiển thị voucher có thể sử dụng<br>4. **Filter theo "Đã dùng"**<br>   - Click vào tab "Đã dùng"<br>   - Quan sát danh sách voucher cập nhật<br>   - Xác nhận chỉ hiển thị voucher đã được sử dụng<br>5. **Filter theo "Hết hạn"**<br>   - Click vào tab "Hết hạn"<br>   - Quan sát danh sách voucher cập nhật<br>   - Xác nhận chỉ hiển thị voucher đã hết hạn |
| **Expected Output** | - [ ] Các tab filter hiển thị (nếu có tính năng filter theo tab)<br>- [ ] Tab mặc định thường là "Có thể dùng"<br>- [ ] Click tab "Có thể dùng":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị voucher có thể sử dụng (chưa dùng, chưa hết hạn)<br>- [ ] Click tab "Đã dùng":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị voucher đã được sử dụng<br>- [ ] Click tab "Hết hạn":<br>  - [ ] Tab được highlight<br>  - [ ] Chỉ hiển thị voucher đã hết hạn<br>- [ ] Danh sách voucher cập nhật ngay sau khi chọn tab<br>- [ ] Hiển thị "Không có voucher nào" nếu tab không có voucher |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có voucher ở các trạng thái khác nhau (có thể dùng, đã dùng, hết hạn) trong hệ thống<br>- Có tính năng filter theo tab (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng filter theo tab, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot các tab filter<br>- [ ] Screenshot khi filter theo "Có thể dùng"<br>- [ ] Screenshot khi filter theo "Đã dùng"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-100: Lưu voucher vào danh sách của tôi

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-100 |
| **Description Test case** | Kiểm tra lưu voucher vào danh sách của tôi, hiển thị trạng thái đã lưu, đồng bộ với localStorage. |
| **Test case Procedure** | 1. **Mở trang voucher**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/vouchers`<br>2. **Tìm voucher chưa lưu**<br>   - Tìm một voucher chưa được lưu<br>   - Quan sát nút "Lưu" hiển thị<br>3. **Lưu voucher**<br>   - Click vào nút "Lưu" của voucher<br>   - Quan sát nút chuyển thành "Đã lưu"<br>   - Quan sát voucher được highlight (border-green-500, bg-green-50)<br>   - Quan sát thông báo "Đã lưu voucher"<br>   - Kiểm tra localStorage có key "savedVouchers" chứa voucher ID<br>4. **Bỏ lưu voucher**<br>   - Click lại vào nút "Đã lưu"<br>   - Quan sát nút chuyển về "Lưu"<br>   - Quan sát voucher trở về trạng thái bình thường<br>   - Quan sát thông báo "Đã bỏ lưu voucher"<br>   - Kiểm tra localStorage không còn chứa voucher ID<br>5. **Kiểm tra đồng bộ**<br>   - Refresh trang<br>   - Quan sát trạng thái lưu voucher được giữ nguyên |
| **Expected Output** | - [ ] Nút "Lưu" hiển thị trên mỗi voucher<br>- [ ] Click "Lưu":<br>  - [ ] Nút chuyển thành "Đã lưu"<br>  - [ ] Voucher được highlight (border-green-500, bg-green-50)<br>  - [ ] Icon checkmark hiển thị (nếu có)<br>  - [ ] Hiển thị toast "Đã lưu voucher"<br>  - [ ] localStorage lưu voucher ID vào "savedVouchers"<br>- [ ] Click "Đã lưu":<br>  - [ ] Nút chuyển về "Lưu"<br>  - [ ] Voucher trở về trạng thái bình thường<br>  - [ ] Hiển thị toast "Đã bỏ lưu voucher"<br>  - [ ] localStorage xóa voucher ID khỏi "savedVouchers"<br>- [ ] Trạng thái lưu voucher được giữ nguyên sau khi refresh trang<br>- [ ] Có thể toggle lưu/bỏ lưu nhiều lần mà không bị lỗi |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có voucher trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút "Lưu"<br>- [ ] Screenshot khi đã lưu voucher<br>- [ ] Screenshot localStorage<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-101: Copy mã voucher

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-101 |
| **Description Test case** | Kiểm tra copy mã voucher vào clipboard, hiển thị thông báo, có thể paste vào nơi khác. |
| **Test case Procedure** | 1. **Mở trang voucher**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/vouchers`<br>2. **Tìm nút copy mã voucher**<br>   - Tìm nút copy hoặc icon copy bên cạnh mã voucher<br>   - Quan sát vị trí và cách hiển thị<br>3. **Copy mã voucher**<br>   - Click vào nút copy hoặc icon copy<br>   - Quan sát thông báo "Đã copy mã voucher" hoặc tương tự<br>   - Thử paste vào ô text hoặc ứng dụng khác<br>   - Xác nhận mã voucher được copy đúng<br>4. **Copy nhiều voucher khác nhau**<br>   - Copy mã voucher khác<br>   - Quan sát thông báo hiển thị<br>   - Thử paste<br>   - Xác nhận mã voucher mới được copy đúng |
| **Expected Output** | - [ ] Nút copy hoặc icon copy hiển thị bên cạnh mã voucher<br>- [ ] Click copy:<br>  - [ ] Hiển thị thông báo "Đã copy mã voucher" hoặc tương tự<br>  - [ ] Mã voucher được copy vào clipboard<br>  - [ ] Có thể paste mã voucher vào ô text hoặc ứng dụng khác<br>  - [ ] Mã voucher được copy đúng, không bị thiếu ký tự<br>- [ ] Có thể copy nhiều voucher khác nhau<br>- [ ] Mã voucher mới được copy đúng khi copy voucher khác |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có voucher trong hệ thống<br>- Có tính năng copy mã voucher (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng copy mã voucher, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút copy<br>- [ ] Screenshot thông báo "Đã copy mã voucher"<br>- [ ] Screenshot khi paste mã voucher<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-102: Xem chi tiết voucher (điều kiện, giá trị)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-102 |
| **Description Test case** | Kiểm tra xem chi tiết voucher: điều kiện áp dụng, giá trị giảm giá, phạm vi áp dụng, hạn sử dụng. |
| **Test case Procedure** | 1. **Mở trang voucher**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/vouchers`<br>2. **Click vào một voucher**<br>   - Click vào một voucher bất kỳ<br>   - Quan sát modal hoặc điều hướng đến trang chi tiết voucher<br>3. **Quan sát chi tiết voucher**<br>   - Quan sát mã voucher<br>   - Quan sát giá trị giảm giá (số tiền hoặc phần trăm)<br>   - Quan sát điều kiện áp dụng:<br>     - Đơn tối thiểu<br>     - Đơn tối đa (nếu có)<br>     - Phạm vi áp dụng (tất cả sản phẩm hoặc sản phẩm cụ thể)<br>   - Quan sát hạn sử dụng<br>   - Quan sát mô tả voucher (nếu có)<br>4. **Kiểm tra thông tin chính xác**<br>   - So sánh thông tin chi tiết với thông tin hiển thị trong danh sách<br>   - Xác nhận tất cả thông tin khớp |
| **Expected Output** | - [ ] Click vào voucher hiển thị modal hoặc điều hướng đến trang chi tiết<br>- [ ] Chi tiết voucher hiển thị đầy đủ:<br>  - [ ] Mã voucher<br>  - [ ] Giá trị giảm giá (số tiền hoặc phần trăm) format đúng<br>  - [ ] Điều kiện áp dụng:<br>    - [ ] Đơn tối thiểu (ví dụ: "Áp dụng đơn từ 500.000đ")<br>    - [ ] Đơn tối đa (nếu có)<br>    - [ ] Phạm vi áp dụng (tất cả sản phẩm hoặc danh sách sản phẩm cụ thể)<br>  - [ ] Hạn sử dụng hiển thị rõ ràng<br>  - [ ] Mô tả voucher (nếu có)<br>- [ ] Tất cả thông tin khớp với thông tin hiển thị trong danh sách<br>- [ ] Có thể đóng modal hoặc quay lại danh sách |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có voucher trong hệ thống<br>- Có tính năng xem chi tiết voucher (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng xem chi tiết voucher, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot modal/trang chi tiết voucher<br>- [ ] Screenshot thông tin chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-103: Xem danh sách voucher rỗng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-103 |
| **Description Test case** | Kiểm tra hiển thị khi không có voucher nào: empty state, thông báo, gợi ý. |
| **Test case Procedure** | 1. **Mở trang voucher không có voucher**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/vouchers` với tài khoản không có voucher<br>2. **Quan sát empty state**<br>   - Quan sát empty state hiển thị<br>   - Quan sát icon hoặc hình ảnh empty state<br>   - Quan sát thông báo "Không có voucher nào" hoặc tương tự<br>   - Quan sát gợi ý hoặc nút điều hướng (nếu có)<br>3. **Kiểm tra layout**<br>   - Xác nhận empty state hiển thị ở giữa trang<br>   - Xác nhận layout đẹp, không bị lệch<br>4. **Thử điều hướng**<br>   - Click vào nút gợi ý hoặc điều hướng (nếu có)<br>   - Quan sát điều hướng đến trang phù hợp (ví dụ: trang chủ, trang khuyến mãi) |
| **Expected Output** | - [ ] Empty state hiển thị khi không có voucher<br>- [ ] Empty state hiển thị:<br>  - [ ] Icon hoặc hình ảnh empty state (ví dụ: icon voucher)<br>  - [ ] Thông báo rõ ràng (ví dụ: "Không có voucher nào")<br>  - [ ] Gợi ý hoặc nút điều hướng (nếu có, ví dụ: "Xem khuyến mãi")<br>- [ ] Layout đẹp, không bị lệch<br>- [ ] Empty state hiển thị ở giữa trang<br>- [ ] Click nút điều hướng (nếu có) điều hướng đến trang phù hợp<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Tài khoản không có voucher nào |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot empty state<br>- [ ] Screenshot thông báo "Không có voucher nào"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-104: Thêm sản phẩm vào yêu thích

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-104 |
| **Description Test case** | Kiểm tra thêm sản phẩm vào yêu thích từ trang chi tiết sản phẩm hoặc trang danh sách, đồng bộ với localStorage. |
| **Test case Procedure** | 1. **Mở trang chi tiết sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/product/:id` với sản phẩm chưa được yêu thích<br>2. **Click nút yêu thích**<br>   - Tìm nút yêu thích (icon Heart) trên trang<br>   - Click vào nút yêu thích<br>   - Quan sát icon Heart chuyển sang filled (màu đỏ, bg-red-500)<br>   - Quan sát thông báo "Đã thêm vào yêu thích"<br>3. **Kiểm tra localStorage**<br>   - Kiểm tra localStorage có key "favoriteStore" chứa sản phẩm<br>   - Xác nhận sản phẩm được lưu đúng với ID và thông tin đầy đủ<br>4. **Kiểm tra đồng bộ với trang yêu thích**<br>   - Điều hướng đến trang `/heart`<br>   - Quan sát sản phẩm có trong danh sách yêu thích |
| **Expected Output** | - [ ] Nút yêu thích hiển thị trên trang chi tiết sản phẩm<br>- [ ] Click thêm vào yêu thích:<br>  - [ ] Icon chuyển sang filled (màu đỏ, bg-red-500)<br>  - [ ] Hiển thị toast "Đã thêm vào yêu thích"<br>  - [ ] localStorage lưu sản phẩm vào "favoriteStore"<br>- [ ] Sản phẩm hiển thị trong trang `/heart`<br>- [ ] Có thể thêm nhiều sản phẩm vào yêu thích |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút yêu thích khi chưa thêm<br>- [ ] Screenshot nút yêu thích khi đã thêm<br>- [ ] Screenshot localStorage<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-105: Xóa sản phẩm khỏi yêu thích

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-105 |
| **Description Test case** | Kiểm tra xóa sản phẩm khỏi yêu thích từ trang yêu thích hoặc trang chi tiết sản phẩm, cập nhật localStorage. |
| **Test case Procedure** | 1. **Mở trang yêu thích**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/heart` với ít nhất 1 sản phẩm yêu thích<br>2. **Xóa sản phẩm từ trang yêu thích**<br>   - Tìm nút xóa hoặc icon xóa trên FavoriteItem<br>   - Click vào nút xóa<br>   - Quan sát sản phẩm biến mất khỏi danh sách<br>   - Quan sát thông báo "Đã xóa khỏi yêu thích"<br>3. **Kiểm tra localStorage**<br>   - Kiểm tra localStorage không còn chứa sản phẩm này<br>4. **Xóa từ trang chi tiết sản phẩm**<br>   - Điều hướng đến trang chi tiết sản phẩm đã yêu thích<br>   - Click vào nút yêu thích (đã filled)<br>   - Quan sát icon chuyển về outline<br>   - Quan sát thông báo "Đã xóa khỏi yêu thích"<br>5. **Kiểm tra đồng bộ**<br>   - Quay lại trang `/heart`<br>   - Quan sát sản phẩm không còn trong danh sách |
| **Expected Output** | - [ ] Có thể xóa sản phẩm từ trang yêu thích:<br>  - [ ] Nút xóa hiển thị trên FavoriteItem<br>  - [ ] Click xóa sản phẩm biến mất<br>  - [ ] Hiển thị toast "Đã xóa khỏi yêu thích"<br>  - [ ] localStorage xóa sản phẩm khỏi "favoriteStore"<br>- [ ] Có thể xóa từ trang chi tiết:<br>  - [ ] Click nút yêu thích (đã filled) chuyển về outline<br>  - [ ] Hiển thị toast "Đã xóa khỏi yêu thích"<br>  - [ ] localStorage xóa sản phẩm<br>- [ ] Trạng thái yêu thích đồng bộ giữa các trang<br>- [ ] Có thể xóa nhiều sản phẩm liên tiếp |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm đã được yêu thích |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút xóa trên FavoriteItem<br>- [ ] Screenshot khi xóa sản phẩm<br>- [ ] Screenshot localStorage sau khi xóa<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-106: Xem danh sách sản phẩm yêu thích

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-106 |
| **Description Test case** | Kiểm tra hiển thị danh sách sản phẩm yêu thích với thông tin đầy đủ, điều hướng đến chi tiết sản phẩm. |
| **Test case Procedure** | 1. **Mở trang yêu thích**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/heart` với ít nhất 2-3 sản phẩm yêu thích<br>2. **Quan sát danh sách sản phẩm yêu thích**<br>   - Quan sát danh sách FavoriteItem hiển thị<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>     - Nút xóa<br>3. **Quan sát phần "Sản phẩm dành cho bạn"**<br>   - Scroll xuống phần "Sản phẩm dành cho bạn"<br>   - Quan sát danh sách sản phẩm khác (không phải yêu thích) hiển thị dạng grid<br>4. **Click vào sản phẩm yêu thích**<br>   - Click vào một sản phẩm yêu thích<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id`<br>5. **Click vào sản phẩm "dành cho bạn"**<br>   - Click vào một sản phẩm trong phần "Sản phẩm dành cho bạn"<br>   - Quan sát điều hướng đến chi tiết sản phẩm |
| **Expected Output** | - [ ] Trang yêu thích load thành công<br>- [ ] Danh sách sản phẩm yêu thích hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm hiển thị đầy đủ<br>  - [ ] Giá sản phẩm format đúng<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>  - [ ] Nút xóa hiển thị<br>- [ ] Phần "Sản phẩm dành cho bạn" hiển thị (nếu có sản phẩm khác):<br>  - [ ] Tiêu đề "Sản phẩm dành cho bạn"<br>  - [ ] Danh sách sản phẩm dạng grid (2 cột)<br>  - [ ] Sản phẩm không trùng với sản phẩm yêu thích<br>- [ ] Click vào sản phẩm điều hướng đến `/product/:id`<br>- [ ] Có thể scroll để xem tất cả sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 2-3 sản phẩm đã được yêu thích |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách sản phẩm yêu thích<br>- [ ] Screenshot phần "Sản phẩm dành cho bạn"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-107: Xem danh sách yêu thích rỗng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-107 |
| **Description Test case** | Kiểm tra hiển thị khi không có sản phẩm yêu thích nào: empty state, thông báo, gợi ý sản phẩm. |
| **Test case Procedure** | 1. **Xóa tất cả sản phẩm yêu thích**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/heart`<br>   - Xóa tất cả sản phẩm yêu thích (nếu có)<br>2. **Quan sát empty state**<br>   - Quan sát empty state hiển thị<br>   - Quan sát icon shop (logo sóc) hiển thị<br>   - Quan sát thông báo "Bạn chưa yêu thích sản phẩm nào !"<br>3. **Quan sát phần "Sản phẩm dành cho bạn"**<br>   - Scroll xuống (nếu có)<br>   - Quan sát phần "Sản phẩm dành cho bạn" hiển thị (nếu có sản phẩm trong hệ thống)<br>4. **Click vào sản phẩm gợi ý**<br>   - Click vào một sản phẩm trong phần "Sản phẩm dành cho bạn"<br>   - Quan sát điều hướng đến chi tiết sản phẩm<br>   - Thêm sản phẩm vào yêu thích<br>   - Quay lại trang `/heart`<br>   - Quan sát sản phẩm hiển thị trong danh sách yêu thích |
| **Expected Output** | - [ ] Empty state hiển thị khi không có sản phẩm yêu thích<br>- [ ] Empty state hiển thị:<br>  - [ ] Icon shop (logo sóc) hiển thị<br>  - [ ] Thông báo "Bạn chưa yêu thích sản phẩm nào !"<br>- [ ] Phần "Sản phẩm dành cho bạn" hiển thị (nếu có sản phẩm trong hệ thống):<br>  - [ ] Tiêu đề "Sản phẩm dành cho bạn"<br>  - [ ] Danh sách sản phẩm dạng grid (2 cột)<br>- [ ] Click vào sản phẩm gợi ý điều hướng đến chi tiết sản phẩm<br>- [ ] Có thể thêm sản phẩm vào yêu thích từ trang chi tiết<br>- [ ] Sau khi thêm, sản phẩm hiển thị trong danh sách yêu thích<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Không có sản phẩm yêu thích nào |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot empty state<br>- [ ] Screenshot phần "Sản phẩm dành cho bạn"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-108: Xem danh sách điểm nhận hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-108 |
| **Description Test case** | Kiểm tra hiển thị danh sách điểm nhận hàng với thông tin đầy đủ: tên điểm, địa chỉ, hình ảnh, khoảng cách. |
| **Test case Procedure** | 1. **Mở trang điểm nhận hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/stations` từ giỏ hàng hoặc checkout<br>2. **Quan sát danh sách điểm nhận hàng**<br>   - Quan sát danh sách stations hiển thị<br>   - Kiểm tra mỗi điểm nhận hàng hiển thị:<br>     - Hình ảnh điểm nhận hàng<br>     - Tên điểm nhận hàng<br>     - Địa chỉ điểm nhận hàng<br>     - Khoảng cách (nếu có)<br>3. **Kiểm tra loading state**<br>   - Quan sát skeleton loading hiển thị khi đang tải (nếu có)<br>   - Quan sát danh sách hiển thị sau khi load xong<br>4. **Kiểm tra layout**<br>   - Xác nhận layout hiển thị đẹp, không bị lệch<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận text không bị cắt quá nhiều |
| **Expected Output** | - [ ] Trang điểm nhận hàng load thành công<br>- [ ] Danh sách điểm nhận hàng hiển thị:<br>  - [ ] Hình ảnh điểm nhận hàng (h-14 w-14, rounded-lg)<br>  - [ ] Tên điểm nhận hàng (text-sm)<br>  - [ ] Địa chỉ điểm nhận hàng (text-xs text-inactive)<br>  - [ ] Khoảng cách hiển thị (text-xs text-primary, nếu có)<br>- [ ] Loading state:<br>  - [ ] StationSkeleton hiển thị khi đang tải<br>  - [ ] Danh sách hiển thị sau khi load xong<br>- [ ] Layout đẹp, không bị lệch<br>- [ ] Có thể scroll để xem tất cả điểm nhận hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 điểm nhận hàng trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách điểm nhận hàng<br>- [ ] Screenshot một điểm nhận hàng chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-109: Chọn điểm nhận hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-109 |
| **Description Test case** | Kiểm tra chọn điểm nhận hàng, cập nhật phí ship, quay lại trang trước. |
| **Test case Procedure** | 1. **Mở trang điểm nhận hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/stations` từ giỏ hàng hoặc checkout<br>2. **Chọn một điểm nhận hàng**<br>   - Click vào một điểm nhận hàng bất kỳ<br>   - Quan sát thông báo "Đã thay đổi điểm nhận hàng"<br>   - Quan sát điều hướng quay lại trang trước (navigate(-1))<br>3. **Kiểm tra điểm nhận hàng được chọn**<br>   - Quan sát điểm nhận hàng được lưu vào state (selectedStationIndexState)<br>   - Quan sát phí ship được tính lại (nếu có)<br>4. **Chọn điểm nhận hàng khác**<br>   - Quay lại trang `/stations`<br>   - Chọn một điểm nhận hàng khác<br>   - Quan sát thông báo và điều hướng<br>   - Quan sát điểm nhận hàng mới được chọn |
| **Expected Output** | - [ ] Click vào điểm nhận hàng:<br>  - [ ] Hiển thị toast "Đã thay đổi điểm nhận hàng"<br>  - [ ] Điều hướng quay lại trang trước (navigate(-1))<br>  - [ ] Điểm nhận hàng được lưu vào selectedStationIndexState<br>- [ ] Phí ship được tính lại theo điểm nhận hàng mới (nếu có)<br>- [ ] Có thể chọn điểm nhận hàng khác:<br>  - [ ] Điểm nhận hàng mới được chọn<br>  - [ ] Phí ship cập nhật theo điểm mới<br>- [ ] Trạng thái điểm nhận hàng được giữ khi quay lại trang checkout/giỏ hàng |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 2 điểm nhận hàng trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot khi chọn điểm nhận hàng<br>- [ ] Screenshot thông báo "Đã thay đổi điểm nhận hàng"<br>- [ ] Screenshot phí ship cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-110: Xem khoảng cách đến điểm nhận hàng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-110 |
| **Description Test case** | Kiểm tra hiển thị khoảng cách từ vị trí hiện tại đến điểm nhận hàng (nếu có tính năng này). |
| **Test case Procedure** | 1. **Mở trang điểm nhận hàng**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/stations`<br>2. **Quan sát khoảng cách**<br>   - Quan sát khoảng cách hiển thị trên mỗi điểm nhận hàng (nếu có)<br>   - Quan sát format hiển thị (ví dụ: "2.5 km", "1.2 km")<br>3. **Kiểm tra tính chính xác**<br>   - So sánh khoảng cách hiển thị với khoảng cách thực tế (nếu có thể)<br>   - Xác nhận khoảng cách được tính từ vị trí hiện tại<br>4. **Kiểm tra khi không có vị trí**<br>   - Tắt quyền truy cập vị trí (nếu có)<br>   - Quan sát khoảng cách không hiển thị hoặc hiển thị "N/A" |
| **Expected Output** | - [ ] Khoảng cách hiển thị trên mỗi điểm nhận hàng (nếu có tính năng này)<br>- [ ] Format khoảng cách đúng (ví dụ: "2.5 km", "1.2 km")<br>- [ ] Khoảng cách được tính từ vị trí hiện tại của người dùng<br>- [ ] Khoảng cách hiển thị màu primary (text-primary)<br>- [ ] Khi không có vị trí:<br>  - [ ] Khoảng cách không hiển thị hoặc hiển thị "N/A"<br>  - [ ] Không có lỗi console<br>- [ ] Khoảng cách cập nhật khi vị trí thay đổi (nếu có) |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 điểm nhận hàng trong hệ thống<br>- Có quyền truy cập vị trí (nếu cần)<br>- Có tính năng hiển thị khoảng cách (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng hiển thị khoảng cách, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot khoảng cách hiển thị<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-111: Kiểm tra phí ship sau khi chọn điểm nhận

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-111 |
| **Description Test case** | Kiểm tra phí ship được tính lại sau khi chọn điểm nhận hàng, cập nhật tổng thanh toán. |
| **Test case Procedure** | 1. **Mở trang checkout với sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Thêm sản phẩm vào giỏ hàng<br>   - Điều hướng đến `/checkout`<br>2. **Quan sát phí ship ban đầu**<br>   - Quan sát phí ship hiển thị (có thể = 0 nếu chưa chọn điểm nhận)<br>   - Quan sát tổng thanh toán<br>3. **Chọn điểm nhận hàng**<br>   - Click vào phần địa chỉ giao hàng hoặc nút "Chọn điểm nhận hàng"<br>   - Điều hướng đến `/stations`<br>   - Chọn một điểm nhận hàng<br>   - Quan sát quay lại trang checkout<br>4. **Kiểm tra phí ship cập nhật**<br>   - Quan sát phí ship được tính lại<br>   - Quan sát tổng thanh toán cập nhật (cộng thêm phí ship)<br>5. **Chọn điểm nhận hàng khác**<br>   - Chọn một điểm nhận hàng khác<br>   - Quan sát phí ship cập nhật lại<br>   - Quan sát tổng thanh toán cập nhật |
| **Expected Output** | - [ ] Phí ship ban đầu hiển thị (có thể = 0)<br>- [ ] Sau khi chọn điểm nhận hàng:<br>  - [ ] Phí ship được tính lại theo điểm nhận hàng<br>  - [ ] Phí ship hiển thị rõ ràng (format đúng, ví dụ: 30.000đ)<br>  - [ ] Tổng thanh toán cập nhật = tổng tiền sản phẩm + phí ship - giảm giá<br>- [ ] Khi chọn điểm nhận hàng khác:<br>  - [ ] Phí ship cập nhật lại theo điểm mới<br>  - [ ] Tổng thanh toán cập nhật đúng<br>- [ ] Phí ship có thể = 0 nếu điểm nhận hàng hỗ trợ freeship |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Đã đăng nhập<br>- Có sản phẩm trong giỏ hàng đã chọn<br>- Có ít nhất 2 điểm nhận hàng trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot phí ship ban đầu<br>- [ ] Screenshot phí ship sau khi chọn điểm nhận hàng<br>- [ ] Screenshot tổng thanh toán cập nhật<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-112: Xem danh sách tất cả sản phẩm flash sale

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-112 |
| **Description Test case** | Kiểm tra hiển thị danh sách tất cả sản phẩm flash sale với thông tin đầy đủ: hình ảnh, tên, giá flash sale, giá gốc, phần trăm giảm giá. |
| **Test case Procedure** | 1. **Mở trang flash sale**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/flash-sale` từ trang chủ hoặc menu<br>2. **Quan sát Flash Sale banner**<br>   - Quan sát banner Flash Sale hiển thị ở đầu trang<br>   - Quan sát countdown timer hiển thị<br>   - Quan sát thông báo "Giảm giá sốc, đừng bỏ lỡ!"<br>3. **Quan sát danh sách sản phẩm flash sale**<br>   - Scroll xuống để xem danh sách sản phẩm<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá flash sale<br>     - Giá gốc bị gạch ngang<br>     - Phần trăm giảm giá<br>     - Badge "FLASH SALE" hoặc icon tương tự<br>4. **Kiểm tra layout**<br>   - Xác nhận layout grid hiển thị đẹp<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận text không bị cắt quá nhiều |
| **Expected Output** | - [ ] Trang flash sale load thành công<br>- [ ] Flash Sale banner hiển thị:<br>  - [ ] Thông báo "Giảm giá sốc, đừng bỏ lỡ!"<br>  - [ ] Countdown timer hiển thị (giờ:phút:giây)<br>  - [ ] Màu sắc nổi bật (cam/đỏ)<br>- [ ] Danh sách sản phẩm flash sale hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm hiển thị đầy đủ<br>  - [ ] Giá flash sale hiển thị nổi bật (màu đỏ)<br>  - [ ] Giá gốc bị gạch ngang<br>  - [ ] Phần trăm giảm giá hiển thị (ví dụ: "-30%")<br>  - [ ] Badge "FLASH SALE" hoặc icon tương tự<br>- [ ] Layout grid đẹp, không bị lệch<br>- [ ] Có thể scroll để xem tất cả sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 flash sale đang active trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot Flash Sale banner<br>- [ ] Screenshot danh sách sản phẩm flash sale<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-113: Xem countdown timer flash sale

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-113 |
| **Description Test case** | Kiểm tra countdown timer flash sale tự động giảm dần, format hiển thị đúng, cập nhật mỗi giây. |
| **Test case Procedure** | 1. **Mở trang flash sale**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/flash-sale` với flash sale đang active<br>2. **Quan sát countdown timer**<br>   - Quan sát countdown timer hiển thị trong banner<br>   - Ghi nhận thời gian ban đầu (ví dụ: 2:30:45)<br>   - Quan sát format hiển thị (ngày:giờ:phút:giây hoặc giờ:phút:giây)<br>3. **Kiểm tra timer tự động giảm**<br>   - Đợi 5 giây<br>   - Quan sát countdown timer giảm dần (ví dụ: 2:30:40)<br>   - Xác nhận timer tự động cập nhật mỗi giây<br>4. **Kiểm tra khi timer về 0**<br>   - Đợi timer về 0 (hoặc test với flash sale đã kết thúc)<br>   - Quan sát timer hiển thị "Đã kết thúc" hoặc tương tự<br>   - Quan sát banner flash sale biến mất hoặc cập nhật |
| **Expected Output** | - [ ] Countdown timer hiển thị trong banner Flash Sale<br>- [ ] Format timer đúng (ví dụ: "02:30:45" hoặc "2 ngày 02:30:45")<br>- [ ] Timer tự động giảm dần mỗi giây<br>- [ ] Timer hiển thị màu cam/đỏ để thu hút<br>- [ ] Khi timer về 0:<br>  - [ ] Timer hiển thị "Đã kết thúc" hoặc tương tự<br>  - [ ] Banner flash sale biến mất hoặc cập nhật<br>  - [ ] Sản phẩm flash sale có thể biến mất hoặc hiển thị giá thường |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có flash sale đang active trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot countdown timer ban đầu<br>- [ ] Screenshot countdown timer sau 5 giây<br>- [ ] Screenshot khi timer về 0<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-114: Mua sản phẩm flash sale từ trang flash sale

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-114 |
| **Description Test case** | Kiểm tra mua sản phẩm flash sale từ trang flash sale, điều hướng đến chi tiết sản phẩm, thêm vào giỏ hàng. |
| **Test case Procedure** | 1. **Mở trang flash sale**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/flash-sale` với flash sale đang active<br>2. **Click vào sản phẩm flash sale**<br>   - Click vào một sản phẩm flash sale bất kỳ<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id`<br>3. **Kiểm tra trang chi tiết sản phẩm**<br>   - Quan sát Flash Sale banner hiển thị trên trang chi tiết<br>   - Quan sát countdown timer hiển thị<br>   - Quan sát giá flash sale hiển thị<br>4. **Thêm vào giỏ hàng**<br>   - Click nút "Thêm vào giỏ hàng" hoặc "Mua ngay"<br>   - Chọn variant (nếu có)<br>   - Xác nhận sản phẩm được thêm vào giỏ hàng với giá flash sale<br>5. **Kiểm tra trong giỏ hàng**<br>   - Điều hướng đến `/cart`<br>   - Quan sát sản phẩm flash sale trong giỏ hàng<br>   - Xác nhận giá flash sale hiển thị đúng |
| **Expected Output** | - [ ] Click vào sản phẩm flash sale điều hướng đến `/product/:id`<br>- [ ] Trang chi tiết sản phẩm hiển thị:<br>  - [ ] Flash Sale banner với countdown timer<br>  - [ ] Giá flash sale hiển thị nổi bật<br>  - [ ] Giá gốc bị gạch ngang<br>- [ ] Thêm vào giỏ hàng:<br>  - [ ] Sản phẩm được thêm vào giỏ hàng với giá flash sale<br>  - [ ] Variant được lưu đúng (nếu có)<br>- [ ] Trong giỏ hàng:<br>  - [ ] Sản phẩm flash sale hiển thị với giá flash sale<br>  - [ ] Giá gốc bị gạch ngang<br>- [ ] Có thể thanh toán với giá flash sale |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có flash sale đang active trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot khi click vào sản phẩm flash sale<br>- [ ] Screenshot trang chi tiết sản phẩm flash sale<br>- [ ] Screenshot sản phẩm trong giỏ hàng<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-115: Xem flash sale đã kết thúc

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-115 |
| **Description Test case** | Kiểm tra hiển thị khi flash sale đã kết thúc: empty state, thông báo, sản phẩm trở về giá thường. |
| **Test case Procedure** | 1. **Mở trang flash sale đã kết thúc**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/flash-sale` với flash sale đã kết thúc<br>2. **Quan sát empty state**<br>   - Quan sát empty state hiển thị<br>   - Quan sát icon hoặc hình ảnh empty state<br>   - Quan sát thông báo "Không có sản phẩm flash sale" hoặc tương tự<br>3. **Kiểm tra banner flash sale**<br>   - Quan sát banner flash sale biến mất hoặc hiển thị "Đã kết thúc"<br>   - Quan sát countdown timer hiển thị "Đã kết thúc" hoặc biến mất<br>4. **Kiểm tra sản phẩm flash sale**<br>   - Nếu có sản phẩm flash sale đã kết thúc:<br>     - Quan sát sản phẩm không hiển thị hoặc hiển thị với giá thường<br>     - Quan sát không còn badge "FLASH SALE" |
| **Expected Output** | - [ ] Empty state hiển thị khi flash sale đã kết thúc:<br>  - [ ] Icon hoặc hình ảnh empty state<br>  - [ ] Thông báo "Không có sản phẩm flash sale" hoặc tương tự<br>- [ ] Banner flash sale:<br>  - [ ] Biến mất hoặc hiển thị "Đã kết thúc"<br>  - [ ] Countdown timer hiển thị "Đã kết thúc" hoặc biến mất<br>- [ ] Sản phẩm flash sale đã kết thúc:<br>  - [ ] Không hiển thị hoặc hiển thị với giá thường<br>  - [ ] Không còn badge "FLASH SALE"<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Flash sale đã kết thúc (hoặc không có flash sale active) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot empty state<br>- [ ] Screenshot banner "Đã kết thúc"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-116: Xem danh sách sản phẩm freeship

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-116 |
| **Description Test case** | Kiểm tra hiển thị danh sách sản phẩm freeship với thông tin đầy đủ: hình ảnh, tên, giá, badge freeship. |
| **Test case Procedure** | 1. **Mở trang freeship**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/freeship` từ trang chủ hoặc menu<br>2. **Quan sát danh sách sản phẩm freeship**<br>   - Quan sát danh sách sản phẩm hiển thị dạng grid<br>   - Kiểm tra mỗi sản phẩm hiển thị:<br>     - Hình ảnh sản phẩm<br>     - Tên sản phẩm<br>     - Giá sản phẩm<br>     - Giá gốc (nếu có giảm giá)<br>     - Badge "FREESHIP" hoặc icon tương tự<br>3. **Kiểm tra layout**<br>   - Xác nhận layout grid hiển thị đẹp (2 cột hoặc 3 cột)<br>   - Xác nhận hình ảnh không bị vỡ<br>   - Xác nhận text không bị cắt quá nhiều<br>4. **Kiểm tra badge freeship**<br>   - Quan sát badge "FREESHIP" hiển thị trên mỗi sản phẩm<br>   - Xác nhận badge nổi bật, dễ nhận biết |
| **Expected Output** | - [ ] Trang freeship load thành công<br>- [ ] Danh sách sản phẩm freeship hiển thị dạng grid<br>- [ ] Mỗi sản phẩm hiển thị:<br>  - [ ] Hình ảnh sản phẩm rõ ràng, không bị vỡ<br>  - [ ] Tên sản phẩm hiển thị đầy đủ (hoặc line-clamp)<br>  - [ ] Giá sản phẩm format đúng<br>  - [ ] Giá gốc bị gạch ngang (nếu có giảm giá)<br>  - [ ] Badge "FREESHIP" hoặc icon tương tự hiển thị nổi bật<br>- [ ] Layout grid đẹp, không bị lệch<br>- [ ] Loading state hiển thị khi đang tải sản phẩm |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm freeship trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách sản phẩm freeship<br>- [ ] Screenshot một sản phẩm freeship<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-117: Tải thêm sản phẩm freeship (pagination)

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-117 |
| **Description Test case** | Kiểm tra tải thêm sản phẩm freeship khi scroll xuống cuối trang (infinite scroll), hiển thị loading state. |
| **Test case Procedure** | 1. **Mở trang freeship**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/freeship` với nhiều sản phẩm freeship (> 20 sản phẩm)<br>2. **Quan sát danh sách ban đầu**<br>   - Quan sát danh sách sản phẩm hiển thị (ví dụ: 20 sản phẩm đầu tiên)<br>   - Quan sát có thể scroll xuống<br>3. **Scroll xuống cuối trang**<br>   - Scroll xuống cuối trang<br>   - Quan sát loading state hiển thị (nếu có)<br>   - Quan sát sản phẩm mới được tải thêm<br>4. **Tiếp tục scroll**<br>   - Tiếp tục scroll xuống<br>   - Quan sát sản phẩm tiếp tục được tải thêm<br>5. **Kiểm tra khi hết sản phẩm**<br>   - Scroll đến khi hết sản phẩm<br>   - Quan sát không còn loading state<br>   - Quan sát không có thông báo "Hết sản phẩm" hoặc tương tự |
| **Expected Output** | - [ ] Danh sách ban đầu hiển thị (ví dụ: 20 sản phẩm đầu tiên)<br>- [ ] Scroll xuống cuối trang:<br>  - [ ] Loading state hiển thị (nếu có)<br>  - [ ] Sản phẩm mới được tải thêm tự động<br>  - [ ] Không có nút "Xem thêm" (infinite scroll)<br>- [ ] Tiếp tục scroll:<br>  - [ ] Sản phẩm tiếp tục được tải thêm<br>  - [ ] Loading state hiển thị khi đang tải<br>- [ ] Khi hết sản phẩm:<br>  - [ ] Không còn loading state<br>  - [ ] Không có thông báo "Hết sản phẩm" (hoặc có nếu cần)<br>- [ ] Tất cả sản phẩm freeship được tải đầy đủ |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Performance (Performance Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có nhiều hơn 20-30 sản phẩm freeship trong hệ thống để test pagination |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách ban đầu<br>- [ ] Screenshot khi load thêm sản phẩm<br>- [ ] Screenshot loading state<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-118: Điều hướng đến chi tiết sản phẩm freeship

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-118 |
| **Description Test case** | Kiểm tra điều hướng đến chi tiết sản phẩm freeship từ trang freeship, hiển thị thông tin freeship trên trang chi tiết. |
| **Test case Procedure** | 1. **Mở trang freeship**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/freeship`<br>2. **Click vào sản phẩm freeship**<br>   - Click vào một sản phẩm freeship bất kỳ<br>   - Quan sát điều hướng<br>   - Xác nhận điều hướng đến `/product/:id`<br>3. **Kiểm tra trang chi tiết sản phẩm**<br>   - Quan sát thông tin sản phẩm hiển thị<br>   - Quan sát giá sản phẩm<br>   - Quan sát có thông tin freeship hiển thị (nếu có)<br>4. **Kiểm tra trong giỏ hàng**<br>   - Thêm sản phẩm vào giỏ hàng<br>   - Điều hướng đến `/cart` hoặc `/checkout`<br>   - Quan sát phí ship = 0 (nếu sản phẩm freeship) |
| **Expected Output** | - [ ] Click vào sản phẩm freeship điều hướng đến `/product/:id`<br>- [ ] Trang chi tiết sản phẩm hiển thị:<br>  - [ ] Thông tin sản phẩm đầy đủ<br>  - [ ] Giá sản phẩm format đúng<br>  - [ ] Có thể thêm vào giỏ hàng<br>- [ ] Trong giỏ hàng/checkout:<br>  - [ ] Sản phẩm freeship hiển thị<br>  - [ ] Phí ship = 0 (nếu chỉ có sản phẩm freeship)<br>- [ ] Có thể thanh toán với phí ship = 0 |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test Navigation (Navigation Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 sản phẩm freeship trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot khi click vào sản phẩm freeship<br>- [ ] Screenshot trang chi tiết sản phẩm<br>- [ ] Screenshot phí ship = 0 trong checkout<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-119: Xem danh sách freeship rỗng

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-119 |
| **Description Test case** | Kiểm tra hiển thị khi không có sản phẩm freeship nào: empty state, thông báo. |
| **Test case Procedure** | 1. **Mở trang freeship không có sản phẩm**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/freeship` với hệ thống không có sản phẩm freeship<br>2. **Quan sát empty state**<br>   - Quan sát empty state hiển thị<br>   - Quan sát icon shop hiển thị<br>   - Quan sát thông báo "Không có sản phẩm freeship" hoặc tương tự<br>3. **Kiểm tra layout**<br>   - Xác nhận empty state hiển thị ở giữa trang<br>   - Xác nhận layout đẹp, không bị lệch<br>4. **Thử điều hướng**<br>   - Click vào nút gợi ý hoặc điều hướng (nếu có)<br>   - Quan sát điều hướng đến trang phù hợp |
| **Expected Output** | - [ ] Empty state hiển thị khi không có sản phẩm freeship<br>- [ ] Empty state hiển thị:<br>  - [ ] Icon shop hiển thị<br>  - [ ] Thông báo rõ ràng (ví dụ: "Không có sản phẩm freeship")<br>  - [ ] Mô tả (ví dụ: "Hiện tại không có sản phẩm freeship nào")<br>- [ ] Layout đẹp, không bị lệch<br>- [ ] Empty state hiển thị ở giữa trang<br>- [ ] Không có lỗi console hoặc crash |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Không có sản phẩm freeship nào trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot empty state<br>- [ ] Screenshot thông báo "Không có sản phẩm freeship"<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-120: Xem danh sách voucher promotion

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-120 |
| **Description Test case** | Kiểm tra hiển thị danh sách voucher promotion với thông tin đầy đủ: mã voucher, giá trị giảm giá, điều kiện, hạn sử dụng. |
| **Test case Procedure** | 1. **Mở trang voucher promotion**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/promotion/voucher` từ trang chủ hoặc menu<br>2. **Quan sát danh sách voucher promotion**<br>   - Quan sát danh sách voucher hiển thị<br>   - Kiểm tra mỗi voucher hiển thị:<br>     - Mã voucher<br>     - Giá trị giảm giá (số tiền hoặc phần trăm)<br>     - Điều kiện áp dụng (đơn tối thiểu)<br>     - Hạn sử dụng<br>     - Mô tả voucher (nếu có)<br>3. **Kiểm tra format hiển thị**<br>   - Xác nhận giá trị giảm giá format đúng<br>   - Xác nhận điều kiện áp dụng hiển thị rõ ràng<br>   - Xác nhận hạn sử dụng format đúng |
| **Expected Output** | - [ ] Trang voucher promotion load thành công<br>- [ ] Danh sách voucher promotion hiển thị:<br>  - [ ] Mã voucher hiển thị rõ ràng<br>  - [ ] Giá trị giảm giá (số tiền hoặc phần trăm) format đúng<br>  - [ ] Điều kiện áp dụng (ví dụ: "Áp dụng đơn từ 500.000đ")<br>  - [ ] Hạn sử dụng hiển thị (ví dụ: "HSD: 31/12/2024")<br>  - [ ] Mô tả voucher (nếu có)<br>- [ ] Loading state hiển thị khi đang tải voucher<br>- [ ] Hiển thị "Không có voucher nào" nếu không có voucher |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có ít nhất 1 voucher promotion trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot danh sách voucher promotion<br>- [ ] Screenshot một voucher promotion chi tiết<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-121: Lưu voucher promotion vào danh sách của tôi

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-121 |
| **Description Test case** | Kiểm tra lưu voucher promotion vào danh sách của tôi, hiển thị trạng thái đã lưu, đồng bộ với localStorage. |
| **Test case Procedure** | 1. **Mở trang voucher promotion**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/promotion/voucher`<br>2. **Tìm voucher chưa lưu**<br>   - Tìm một voucher promotion chưa được lưu<br>   - Quan sát nút "Lưu" hiển thị<br>3. **Lưu voucher**<br>   - Click vào nút "Lưu" của voucher<br>   - Quan sát nút chuyển thành "Đã lưu"<br>   - Quan sát voucher được highlight (nếu có)<br>   - Quan sát thông báo "Đã lưu voucher"<br>   - Kiểm tra localStorage có key "savedVouchers" chứa voucher ID<br>4. **Bỏ lưu voucher**<br>   - Click lại vào nút "Đã lưu"<br>   - Quan sát nút chuyển về "Lưu"<br>   - Quan sát voucher trở về trạng thái bình thường<br>   - Quan sát thông báo "Đã bỏ lưu voucher"<br>   - Kiểm tra localStorage không còn chứa voucher ID |
| **Expected Output** | - [ ] Nút "Lưu" hiển thị trên mỗi voucher promotion<br>- [ ] Click "Lưu":<br>  - [ ] Nút chuyển thành "Đã lưu"<br>  - [ ] Voucher được highlight (nếu có)<br>  - [ ] Hiển thị toast "Đã lưu voucher"<br>  - [ ] localStorage lưu voucher ID vào "savedVouchers"<br>- [ ] Click "Đã lưu":<br>  - [ ] Nút chuyển về "Lưu"<br>  - [ ] Voucher trở về trạng thái bình thường<br>  - [ ] Hiển thị toast "Đã bỏ lưu voucher"<br>  - [ ] localStorage xóa voucher ID khỏi "savedVouchers"<br>- [ ] Có thể toggle lưu/bỏ lưu nhiều lần mà không bị lỗi |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br>- **Test UI (UI Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có voucher promotion trong hệ thống |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút "Lưu"<br>- [ ] Screenshot khi đã lưu voucher<br>- [ ] Screenshot localStorage<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-122: Copy mã voucher promotion

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-122 |
| **Description Test case** | Kiểm tra copy mã voucher promotion vào clipboard, hiển thị thông báo, có thể paste vào nơi khác. |
| **Test case Procedure** | 1. **Mở trang voucher promotion**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/promotion/voucher`<br>2. **Tìm nút copy mã voucher**<br>   - Tìm nút copy hoặc icon copy bên cạnh mã voucher<br>   - Quan sát vị trí và cách hiển thị<br>3. **Copy mã voucher**<br>   - Click vào nút copy hoặc icon copy<br>   - Quan sát thông báo "Đã copy mã voucher" hoặc tương tự<br>   - Thử paste vào ô text hoặc ứng dụng khác<br>   - Xác nhận mã voucher được copy đúng<br>4. **Copy nhiều voucher khác nhau**<br>   - Copy mã voucher khác<br>   - Quan sát thông báo hiển thị<br>   - Thử paste<br>   - Xác nhận mã voucher mới được copy đúng |
| **Expected Output** | - [ ] Nút copy hoặc icon copy hiển thị bên cạnh mã voucher<br>- [ ] Click copy:<br>  - [ ] Hiển thị thông báo "Đã copy mã voucher" hoặc tương tự<br>  - [ ] Mã voucher được copy vào clipboard<br>  - [ ] Có thể paste mã voucher vào ô text hoặc ứng dụng khác<br>  - [ ] Mã voucher được copy đúng, không bị thiếu ký tự<br>- [ ] Có thể copy nhiều voucher khác nhau<br>- [ ] Mã voucher mới được copy đúng khi copy voucher khác |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có voucher promotion trong hệ thống<br>- Có tính năng copy mã voucher (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng copy mã voucher, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot nút copy<br>- [ ] Screenshot thông báo "Đã copy mã voucher"<br>- [ ] Screenshot khi paste mã voucher<br>- [ ] Screenshot log console (nếu có lỗi) |

---

## TC-BHV-123: Filter voucher theo shop/category

| Field | Details |
| --- | --- |
| **ID Test case** | TC-BHV-123 |
| **Description Test case** | Kiểm tra filter voucher promotion theo shop hoặc category (nếu có tính năng này). |
| **Test case Procedure** | 1. **Mở trang voucher promotion**<br>   - Mở ứng dụng Zalo Mini App<br>   - Điều hướng đến `/promotion/voucher`<br>2. **Quan sát các tùy chọn filter**<br>   - Quan sát các tùy chọn filter (nếu có): theo shop, theo category<br>   - Quan sát filter mặc định (thường là "Tất cả")<br>3. **Filter theo shop**<br>   - Click vào filter "Shop X" (nếu có)<br>   - Quan sát danh sách voucher cập nhật<br>   - Xác nhận chỉ hiển thị voucher của shop đó<br>4. **Filter theo category**<br>   - Click vào filter category (nếu có)<br>   - Quan sát danh sách voucher cập nhật<br>   - Xác nhận chỉ hiển thị voucher của category đó<br>5. **Quay lại "Tất cả"**<br>   - Click vào filter "Tất cả"<br>   - Quan sát danh sách voucher trở về hiển thị tất cả |
| **Expected Output** | - [ ] Các tùy chọn filter hiển thị (nếu có tính năng filter)<br>- [ ] Filter mặc định thường là "Tất cả"<br>- [ ] Click filter theo shop:<br>  - [ ] Filter được highlight<br>  - [ ] Chỉ hiển thị voucher của shop đó<br>- [ ] Click filter theo category:<br>  - [ ] Filter được highlight<br>  - [ ] Chỉ hiển thị voucher của category đó<br>- [ ] Click "Tất cả":<br>  - [ ] Hiển thị lại tất cả voucher<br>- [ ] Danh sách voucher cập nhật ngay sau khi chọn filter<br>- [ ] Hiển thị "Không có voucher nào" nếu filter không có kết quả |
| **Test Data** | **Loại test:** <br>- **Test hành vi (Behavioral Test)**<br>- **Test chức năng (Functional Test)**<br><br>**Tiền điều kiện:** <br>- Ứng dụng đã được cài đặt và mở thành công<br>- Có kết nối internet<br>- Có voucher promotion của nhiều shop/category trong hệ thống<br>- Có tính năng filter theo shop/category (nếu không có thì test case này có thể skip) |
| **Date** | **Ngày thực hiện:** _ _ / _ _ / _ _ _ _<br>**Người test:** _________________<br>**Môi trường test:** ⬜ Development / ⬜ Staging / ⬜ Production<br>**Phiên bản:** _________________ |
| **Step Result** | ⬜ Pass / ⬜ Fail |
| **Case Result** | ⬜ Pass / ⬜ Fail |
| **Note** | **Ghi chú kết quả thực tế:**<br><br>[Ghi chú chi tiết về kết quả thực tế, lỗi nếu có, screenshot nếu cần]<br><br>**Lưu ý:** Nếu hệ thống không có tính năng filter theo shop/category, test case này có thể được đánh dấu là "Not Applicable" hoặc skip.<br><br>Screenshot/Bằng chứng:<br>- [ ] Screenshot các tùy chọn filter<br>- [ ] Screenshot khi filter theo shop<br>- [ ] Screenshot khi filter theo category<br>- [ ] Screenshot log console (nếu có lỗi) |

