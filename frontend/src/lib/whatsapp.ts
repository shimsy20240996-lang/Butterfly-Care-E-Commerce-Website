import { Order } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '94740225855';

export function getWhatsAppNumber(): string {
  const envNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
  return envNumber.replace(/[^0-9]/g, '') || DEFAULT_WHATSAPP_NUMBER;
}

export function formatPrice(amount: number): string {
  const num = Math.round(amount || 0);
  return `Rs. ${num.toLocaleString('en-US')}`;
}

export function formatOrderDate(dateInput?: string | Date): string {
  try {
    const d = dateInput ? new Date(dateInput) : new Date();
    if (isNaN(d.getTime())) return new Date().toLocaleString();

    const day = String(d.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  } catch (e) {
    return String(dateInput || new Date().toLocaleString());
  }
}

export function formatPaymentMethod(method?: string): string {
  switch (method?.toLowerCase()) {
    case 'cash_on_delivery':
      return 'Cash on Delivery';
    case 'bank_transfer':
      return 'Bank Transfer';
    case 'online_gateway':
      return 'Online Payment';
    default:
      return method || 'Cash on Delivery';
  }
}

/**
 * Dynamically formats the complete WhatsApp order message according to specification.
 */
export function formatWhatsAppOrderMessage(order: Order): string {
  const customerName = order.customerDetails?.fullName?.trim() || 'Valued Customer';
  const customerPhone = order.customerDetails?.phone?.trim() || '';

  const addressLine = order.deliveryAddress?.addressLine?.trim() || '';
  const city = order.deliveryAddress?.city?.trim() || '';
  const district = order.deliveryAddress?.district?.trim() || '';

  const productsText = (order.items || [])
    .map((item, index) => {
      const lines = [`${index + 1}. ${item.name}`];
      if (item.selectedSize && item.selectedSize.trim()) {
        lines.push(`   Size: ${item.selectedSize.trim()}`);
      }
      if (item.selectedColor && item.selectedColor.trim()) {
        lines.push(`   Color: ${item.selectedColor.trim()}`);
      }
      lines.push(`   Qty: ${item.quantity}`);
      lines.push(`   Price: ${formatPrice(item.price * item.quantity)}`);
      return lines.join('\n');
    })
    .join('\n\n');

  const subtotalText = formatPrice(order.subtotal || 0);
  const deliveryText = order.deliveryFee === 0 ? 'FREE (Islandwide)' : formatPrice(order.deliveryFee || 0);
  const totalText = formatPrice(order.total || 0);
  const paymentMethodText = formatPaymentMethod(order.paymentMethod);
  const orderDateText = formatOrderDate(order.createdAt);

  return `🦋 BUTTERFLY CARE - NEW ORDER

Order ID: ${order.orderNumber}

👤 CUSTOMER

Name: ${customerName}
Phone: ${customerPhone}

📍 DELIVERY ADDRESS

${addressLine}
${city}
${district}

🛍️ PRODUCTS

${productsText}

────────────────

Subtotal: ${subtotalText}
Delivery: ${deliveryText}

TOTAL: ${totalText}

💳 PAYMENT

${paymentMethodText}

🕐 ORDER DATE

${orderDateText}

🦋 BUTTERFLY CARE
for every mom`;
}

/**
 * Generates the WhatsApp Click-to-Chat URL
 */
export function getWhatsAppOrderUrl(order: Order, customNumber?: string): string {
  const whatsappNumber = customNumber || getWhatsAppNumber();
  const rawMessage = formatWhatsAppOrderMessage(order);
  const encodedMessage = encodeURIComponent(rawMessage);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
