# Test Cases - Behavioral Testing

## Tổng quan

Thư mục này chứa các test case hành vi (behavioral test cases) cho ứng dụng Zalo Mini App thương mại điện tử. Test cases được tổ chức thành các file riêng biệt theo từng module để dễ quản lý và theo dõi.

## Cấu trúc File

Test cases được chia thành các file markdown riêng biệt theo module:

- `all-test-cases.md` - File tổng hợp tất cả test cases cũ (TC-BHV-001 đến TC-BHV-029)
- `orders-test-cases.md` - Test cases về đơn hàng (TC-BHV-030 đến TC-BHV-035)
- `profile-update-test-cases.md` - Test cases về cập nhật thông tin tài khoản (TC-BHV-036 đến TC-BHV-040)
- `shipping-address-test-cases.md` - Test cases về quản lý địa chỉ (TC-BHV-041 đến TC-BHV-045)
- `notifications-test-cases.md` - Test cases về thông báo (TC-BHV-046 đến TC-BHV-050)
- `minigame-test-cases.md` - Test cases về mini game (TC-BHV-051 đến TC-BHV-055)

**File Excel tổng hợp:** `all-test-cases.xlsx` - Chứa tất cả test cases từ tất cả các file markdown

## Danh Sách Test Cases

### File: all-test-cases.md (TC-BHV-001 đến TC-BHV-029)

#### 1. Phí Vận Chuyển Giỏ Hàng (8 test cases)
- TC-BHV-001: Kiểm tra phí vận chuyển khi có sản phẩm freeship và không freeship
- TC-BHV-002: Kiểm tra phí vận chuyển khi chỉ có sản phẩm freeship
- TC-BHV-003: Kiểm tra phí vận chuyển khi chỉ có sản phẩm không freeship
- TC-BHV-004: Kiểm tra phí vận chuyển khi thay đổi địa chỉ giao hàng
- TC-BHV-005: Kiểm tra phí vận chuyển khi chọn điểm nhận hàng
- TC-BHV-024: Kiểm tra hỗ trợ phí ship 100% (Miễn phí ship)
- TC-BHV-025: Kiểm tra hỗ trợ phí ship theo số tiền cố định
- TC-BHV-026: Kiểm tra hỗ trợ phí ship theo phần trăm (%)

#### 2. Thêm Sản Phẩm Vào Giỏ Hàng (5 test cases)
- TC-BHV-006: Thêm sản phẩm có variant vào giỏ hàng
- TC-BHV-007: Thêm sản phẩm không có variant vào giỏ hàng
- TC-BHV-008: Thêm cùng sản phẩm với variant khác nhau vào giỏ
- TC-BHV-009: Thêm sản phẩm hết hàng vào giỏ
- TC-BHV-010: Thêm sản phẩm với số lượng vượt tồn kho

#### 3. Quy Trình Thanh Toán (8 test cases)
- TC-BHV-011: Quy trình thanh toán hoàn chỉnh
- TC-BHV-012: Đặt hàng với validation lỗi
- TC-BHV-013: Đặt hàng với sản phẩm hết hàng
- TC-BHV-014: Đặt hàng với voucher hết hạn
- TC-BHV-015: Đặt hàng với mạng không ổn định
- TC-BHV-027: Thanh toán bằng COD (Thanh toán khi nhận hàng)
- TC-BHV-028: Thanh toán bằng chuyển khoản ngân hàng
- TC-BHV-029: Copy thông tin chuyển khoản

#### 4. Tìm Kiếm & Điều Hướng (5 test cases)
- TC-BHV-016: Tìm kiếm sản phẩm và điều hướng
- TC-BHV-017: Tìm kiếm không có kết quả
- TC-BHV-018: Điều hướng từ header navigation
- TC-BHV-019: Điều hướng từ footer navigation
- TC-BHV-020: Điều hướng từ floating cart

#### 5. Flash Sale (3 test cases)
- TC-BHV-021: Mua sản phẩm flash sale
- TC-BHV-022: Flash sale hết thời gian
- TC-BHV-023: Xem tất cả flash sale

### File: orders-test-cases.md (TC-BHV-030 đến TC-BHV-035)

#### 6. Đơn Hàng (6 test cases)
- TC-BHV-030: Xem danh sách đơn hàng theo trạng thái
- TC-BHV-031: Xem chi tiết đơn hàng
- TC-BHV-032: Hủy đơn hàng
- TC-BHV-033: Đánh giá sản phẩm sau khi nhận hàng
- TC-BHV-034: Xem thông tin thanh toán chuyển khoản
- TC-BHV-035: Liên hệ shop từ đơn hàng

### File: profile-update-test-cases.md (TC-BHV-036 đến TC-BHV-040)

#### 7. Cập Nhật Thông Tin Tài Khoản (5 test cases)
- TC-BHV-036: Cập nhật thông tin cơ bản (tên, email, số điện thoại)
- TC-BHV-037: Cập nhật ngày sinh và giới tính
- TC-BHV-038: Cập nhật địa chỉ
- TC-BHV-039: Upload và thay đổi avatar
- TC-BHV-040: Validation khi cập nhật thông tin

### File: shipping-address-test-cases.md (TC-BHV-041 đến TC-BHV-045)

#### 8. Quản Lý Địa Chỉ Giao Hàng (5 test cases)
- TC-BHV-041: Thêm địa chỉ mới
- TC-BHV-042: Sửa địa chỉ đã có
- TC-BHV-043: Xóa địa chỉ
- TC-BHV-044: Đặt địa chỉ mặc định
- TC-BHV-045: Giới hạn số lượng địa chỉ (tối đa 5)

### File: notifications-test-cases.md (TC-BHV-046 đến TC-BHV-050)

#### 9. Thông Báo (5 test cases)
- TC-BHV-046: Xem danh sách thông báo
- TC-BHV-047: Filter thông báo theo tab (Tất cả, Đơn hàng, Voucher)
- TC-BHV-048: Xem chi tiết thông báo đơn hàng
- TC-BHV-049: Đánh dấu đã đọc thông báo
- TC-BHV-050: Hiển thị số lượng thông báo chưa đọc

### File: minigame-test-cases.md (TC-BHV-051 đến TC-BHV-055)

#### 10. Mini Game - Vòng Quay May Mắn (5 test cases)
- TC-BHV-051: Nhận lượt chơi miễn phí
- TC-BHV-052: Quay vòng quay may mắn
- TC-BHV-053: Xem kết quả quay và voucher trúng thưởng
- TC-BHV-054: Xem lịch sử lượt chơi
- TC-BHV-055: Giới hạn lượt chơi (24 giờ)

## Format Test Case

Mỗi test case bao gồm:

1. **Mô tả**: Mô tả ngắn gọn về test case
2. **Loại test**: Behavioral Test, Functional Test, Integration Test, UI Test, E2E Test
3. **Tiền điều kiện**: Điều kiện cần thiết trước khi thực hiện test
4. **Các bước thực hiện**: Các bước chi tiết để thực hiện test
5. **Kết quả mong đợi**: Danh sách các kết quả mong đợi (checklist)
6. **Kết quả thực tế**: Bảng kết quả thực tế với checkbox Pass/Fail
7. **Ngày test**: Ngày thực hiện, người test, môi trường, phiên bản
8. **Screenshot/Bằng chứng**: Các screenshot và log nếu có

## Cách sử dụng

### Sử dụng file markdown riêng lẻ
1. **Chọn module cần test** và mở file tương ứng (ví dụ: `orders-test-cases.md`)
2. **Chọn test case cần thực hiện** từ danh sách trong file
3. **Đọc kỹ tiền điều kiện** và chuẩn bị môi trường test
4. **Thực hiện từng bước** theo đúng thứ tự trong "Các bước thực hiện"
5. **Kiểm tra từng mục** trong "Kết quả mong đợi"
6. **Đánh dấu kết quả** trong bảng "Kết quả thực tế"
7. **Ghi chú** các lỗi hoặc vấn đề phát hiện được
8. **Chụp screenshot** nếu có lỗi hoặc cần bằng chứng
9. **Điền thông tin** ngày test, người test, môi trường

### Sử dụng file Excel tổng hợp
1. **Mở file** `all-test-cases.xlsx` trong Excel hoặc Google Sheets
2. **Filter hoặc tìm kiếm** test case cần thực hiện theo ID hoặc mô tả
3. **Thực hiện test** theo các bước trong cột "Test case Procedure"
4. **Đánh dấu kết quả** trong các cột "Step Result" và "Case Result"
5. **Ghi chú** trong cột "Note" nếu có lỗi
6. **Lưu file** sau khi hoàn thành

### Tạo lại file Excel
Nếu đã chỉnh sửa các file markdown, chạy script để cập nhật file Excel:
```bash
python convert_to_excel.py
```
Script sẽ đọc tất cả file `*-test-cases.md` và merge vào một file Excel duy nhất.

## Quy ước đánh dấu

- ⬜ Pass: Test case pass
- ⬜ Fail: Test case fail
- Ghi chú: Mô tả chi tiết lỗi hoặc vấn đề

## Môi trường test

- **Development**: Môi trường phát triển
- **Staging**: Môi trường staging (test trước khi release)
- **Production**: Môi trường production (sau khi release)

## Lưu ý

- Luôn test trên môi trường Staging trước khi test Production
- Chụp screenshot khi phát hiện lỗi
- Ghi chú chi tiết các lỗi để developer có thể reproduce
- Cập nhật ngày test và người test sau mỗi lần thực hiện

## Tổng kết

- **Tổng số test cases**: 55 test cases
- **Số module**: 10 module
- **File markdown**: 6 files (1 file tổng hợp + 5 files theo module)
- **File Excel**: 1 file tổng hợp

## Cập nhật

- **Ngày tạo**: [Ngày tạo file]
- **Người tạo**: [Tên người tạo]
- **Phiên bản**: 2.0.0
- **Cập nhật lần cuối**: Thêm 26 test cases mới (TC-BHV-030 đến TC-BHV-055) và chia thành các file riêng biệt

