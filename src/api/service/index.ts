// Import all services
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { BannerService } from './banner.service';
import { FlashSaleService } from './flash-sale.service';
import { AddressService } from './address.service';
import { FeeShipService } from './fee-ship.service';
import { VoucherService } from './voucher.service';
import { CheckoutService } from './checkout.service';
import { ProductReviewService } from './productReview.sevicer';
import { NotificationService } from './notification.sevice';
import { MinigameService } from './minigame.sevice';

// Export all services
export const apiServices = {
  auth: AuthService,
  user: UserService,
  product: ProductService,
  banner: BannerService,
  flashSale: FlashSaleService,
  address: AddressService,
  feeShip: FeeShipService,
  voucher: VoucherService,
  checkout: CheckoutService,
  productReview: ProductReviewService,
  notification: NotificationService,
  minigame: MinigameService,
};

// Export individual services
export {
  AuthService,
  UserService,
  ProductService,
  BannerService,
  FlashSaleService,
  AddressService,
  FeeShipService,
  VoucherService,
  CheckoutService,
  ProductReviewService,
  NotificationService,
  MinigameService,
};
