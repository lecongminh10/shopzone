import { Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";

export default function ApplyVoucher() {
  const navigate = useNavigate();
  return (
    <button
      className="w-full flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-gray-50"
      onClick={() => navigate("/promotion/voucher")}
    >
      <div className="flex items-center space-x-2">
        <Icon icon="zi-tag" size={20} className="text-blue-500" />
        <span className="text-sm">Mã giảm giá của shop</span>
      </div>
      <Icon icon="zi-chevron-right" size={16} className="text-gray-400" />
    </button>
  );
}
