export const DEFAULT_WHATSAPP_NUMBER = '94740225855';

export function getWhatsAppNumber(): string {
  const envNumber = process.env.WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
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

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Colombo',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const parts = formatter.formatToParts(d);
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';

    const day = getPart('day').padStart(2, '0');
    const month = getPart('month').slice(0, 3);
    const year = getPart('year');
    const hour = getPart('hour');
    const minute = getPart('minute').padStart(2, '0');
    const dayPeriod = getPart('dayPeriod').toUpperCase();

    return `${day} ${month} ${year}, ${hour}:${minute} ${dayPeriod}`;
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

export interface OrderWhatsAppInput {
  orderNumber: string;
  customerDetails?: {
    fullName?: string;
    phone?: string;
    email?: string;
  };
  deliveryAddress?: {
    addressLine?: string;
    city?: string;
    district?: string;
    postalCode?: string;
  };
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    selectedSize?: string;
    selectedColor?: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod?: string;
  createdAt?: string | Date;
}

export function generateWhatsAppOrderMessage(order: OrderWhatsAppInput): { rawMessage: string; whatsappUrl: string } {
  const customerName = order.customerDetails?.fullName?.trim() || '';
  const customerPhone = order.customerDetails?.phone?.trim() || '';

  const addressLine = order.deliveryAddress?.addressLine?.trim() || '';
  const city = order.deliveryAddress?.city?.trim() || '';
  const district = order.deliveryAddress?.district?.trim() || '';

  const addressLines = [addressLine, city, district].filter(Boolean);

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

  const rawMessage = `🦋 BUTTERFLY - NEW ORDER

Order ID: ${order.orderNumber}

👤 CUSTOMER

Name: ${customerName}
Phone: ${customerPhone}

📍 DELIVERY ADDRESS

${addressLines.join('\n')}

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

🦋 BUTTERFLY
care for every mom`;

  const whatsappNumber = getWhatsAppNumber();
  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return { rawMessage, whatsappUrl };
}
