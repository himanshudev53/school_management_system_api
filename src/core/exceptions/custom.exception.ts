// custom.exception.ts

import { HttpException } from "./http.exception";

// Custom exception for product-related errors
export class ProductNotFoundException extends HttpException {
    constructor(productId: string) {
      super(404, `Product with ID ${productId} not found`);
    }
  }
  
  // Custom exception for inventory-related errors
  export class InsufficientStockException extends HttpException {
    constructor(productId: string, required: number, available: number) {
      super(409, `Insufficient stock for product ${productId}. Required: ${required}, Available: ${available}`);
    }
  }
  
  // Custom exception for order processing errors
  export class OrderProcessingException extends HttpException {
    constructor(message: string, data?: any) {
      super(500, message, data);
    }
  }
  
  // Custom exception for invalid payment
  export class PaymentFailedException extends HttpException {
    constructor(message: string) {
      super(402, `Payment failed: ${message}`);
    }
  }
  
  // Custom exception for invalid coupon
  export class InvalidCouponException extends HttpException {
    constructor(couponCode: string) {
      super(422, `Coupon ${couponCode} is invalid or expired`);
    }
  }
  
  // Custom exception for rate-limiting
  export class TooManyRequestsException extends HttpException {
    constructor(message: string = 'Too many requests, please try again later') {
      super(429, message);
    }
  }
  