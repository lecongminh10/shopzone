import React, { useState } from 'react';
import { getPhoneNumber } from "zmp-sdk";
import { Button, Modal, Box, Text } from "zmp-ui";

interface RequestPermissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (phoneToken: string) => void;
}

export const RequestPermissionModal: React.FC<RequestPermissionModalProps> = ({ 
  visible, 
  onClose, 
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false);

  const handleRequestPhone = async () => {
    setLoading(true);
    try {
      console.log('🔍 [PERMISSION_MODAL] Calling getPhoneNumber()...');
      const result = await getPhoneNumber({});
      console.log('📱 [PERMISSION_MODAL] getPhoneNumber response:', result);
      console.log('📱 [PERMISSION_MODAL] getPhoneNumber response type:', typeof result);
      console.log('📱 [PERMISSION_MODAL] getPhoneNumber response keys:', result ? Object.keys(result) : 'null');
      
      const phoneToken = result?.token || result?.phone_token || null;
      if (phoneToken) {
        console.log('✅ [PERMISSION_MODAL] Phone token received:', phoneToken.substring(0, 20) + '...');
        onSuccess(phoneToken);
        onClose();
      } else {
        console.warn('⚠️ [PERMISSION_MODAL] getPhoneNumber returned no token');
        onClose();
      }
    } catch (error: any) {
      console.error('❌ [PERMISSION_MODAL] User từ chối hoặc lỗi:', error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Xác thực số điện thoại"
      onClose={onClose}
      verticalActions
    >
      <Box p={4}>
        <Text size="small" className="text-gray-600 mb-4">
          Để sử dụng đầy đủ tính năng, vui lòng cho phép ứng dụng 
          truy cập số điện thoại của bạn
        </Text>
        
        <Button
          fullWidth
          variant="primary"
          loading={loading}
          onClick={handleRequestPhone}
        >
          Cho phép truy cập số điện thoại
        </Button>
        
        <Button
          fullWidth
          variant="tertiary"
          onClick={onClose}
          className="mt-2"
        >
          Bỏ qua
        </Button>
      </Box>
    </Modal>
  );
};
