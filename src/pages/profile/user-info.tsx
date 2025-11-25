import { UserInfoSkeleton } from "@/components/skeleton";
import TransitionLink from "@/components/transition-link";
import { loadableUserInfoState } from "@/state";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Icon } from "zmp-ui";
import Register from "./register";

function UserInfo({ children }: PropsWithChildren) {
  const userInfo = useAtomValue(loadableUserInfoState);

  // Format avatar URL - thêm domain nếu là đường dẫn tương đối
  const formatAvatarUrl = (avatar?: string): string => {
    if (!avatar) return "";
    // Nếu đã có http/https thì giữ nguyên
    if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
      return avatar;
    }
    // Nếu là đường dẫn tương đối (bắt đầu bằng /) thì thêm domain
    if (avatar.startsWith('/')) {
      return `https://socdo.vn${avatar}`;
    }
    // Nếu không có / ở đầu, thêm cả / và domain
    return `https://socdo.vn/${avatar}`;
  };

  if (userInfo.state === "hasData" && userInfo.data) {
    const { name, avatar, phone } = userInfo.data;
    return (
      <>
        <div className="bg-section rounded-lg p-4 flex items-center space-x-4 border-[0.5px] border-black/15">
          <img className="rounded-full h-10 w-10" src={formatAvatarUrl(avatar)} />
          <div className="space-y-0.5 flex-1 overflow-hidden">
            <div className="text-lg truncate">{name}</div>
            <div className="text-sm text-subtitle truncate">{phone}</div>
          </div>
          <TransitionLink to="/profile/edit">
            <Icon icon="zi-edit-text" />
          </TransitionLink>
        </div>
        {children}
      </>
    );
  }

  if (userInfo.state === "loading") {
    return <UserInfoSkeleton />;
  }

  return <Register />;
}

export default UserInfo;
