import { keywordState } from "@/state";
import { useAtom } from "jotai";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "zmp-ui";
import { InputProps } from "zmp-ui/input";
import { saveSearchHistory } from "@/utils/user-history";

const SearchBar = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [localKeyword, setLocalKeyword] = useState("");
  const [keyword, setKeyword] = useAtom(keywordState);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Cho phép component cha dùng ref
  useImperativeHandle(ref, () => inputRef.current!);

  const handleSearch = () => {
    const trimmed = localKeyword.trim();

    // Cập nhật keyword realtime
    setKeyword(trimmed);
    localStorage.setItem("keyword", trimmed);
    
    // Lưu lịch sử tìm kiếm
    if (trimmed.length > 0) {
      saveSearchHistory(trimmed);
    }

    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  // Đồng bộ input khi keyword thay đổi từ atom
  useEffect(() => {
    setLocalKeyword(keyword || "");
  }, [keyword]);

  return (
    <Input.Search
      ref={inputRef}
      size="small"
      placeholder="Bạn muốn mua gì..."
      className="border-none outline-none m-0 h-full"
      style={{ height: '100%' }}
      value={localKeyword}
      onChange={(e) => {
        setLocalKeyword(e.currentTarget.value);
        setKeyword(e.currentTarget.value); // 🔹 realtime update
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
      clearable
      {...props}
    />
  );
});

export default SearchBar;
