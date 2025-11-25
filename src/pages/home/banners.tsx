import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import { BannerService } from "@/api/service/banner.service";

export default function Banners() {
  const [banners, setBanners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      // Đợi seller token có sẵn (có thể login chưa hoàn thành)
      let retries = 5;
      while (retries > 0 && !localStorage.getItem('sellerToken')) {
        await new Promise(resolve => setTimeout(resolve, 500));
        retries--;
      }

      try {
        const response = await BannerService.getBanners({
          position: 'banner_doitac',
        });
        
        // Map banners từ API về array URL
        const bannerUrls = response.data.banners.map((banner) => banner.image_url);
        setBanners(bannerUrls);
      } catch (error: any) {
        // Log error with proper message handling
        const errorMessage = error?.message || error?.toString() || 'Unknown error';
        console.error('❌ [BANNERS] Error fetching banners:', errorMessage);
        // Fallback to mock data nếu có lỗi
        setBanners([
          'https://zalo-miniapp.github.io/zaui-market/dummy/banner/ads.jpg',
          'https://zalo-miniapp.github.io/zaui-market/dummy/banner/ads.jpg',
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div className="bg-gray-200 h-48 animate-pulse rounded-xl mx-4"></div>;
  }

  return (
    <Carousel
      slides={banners.map((banner, i) => (
        <div key={i} className="relative w-full h-48 rounded-xl overflow-hidden">
          <img 
            src={banner} 
            alt="Banner" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
      ))}
    />
  );
}
