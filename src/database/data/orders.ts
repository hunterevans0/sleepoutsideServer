import { z } from "zod";

// --------------- Collection: Address ---------------
const AddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  line1: z.string(),
  line2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});


const paymentStatus = z.enum(["unpaid", "pending", "paid", "refunded"]);
export type PaymentStatus = z.infer<typeof paymentStatus>;
const orderStatus = z.enum(["processing", "shipped", "delivered", "cancelled"]);
export type OrderStatus = z.infer<typeof orderStatus>;

/** Take a snapshot of products at purchase time to caption details of price and/or name changes */
const ProductSnapshotSchema = z.object({
  productId: z.string(),
  nameSnapshot: z.string(),
  priceSnapshot: z.number(),
  quantity: z.number(),
});
export type ProductSnapshot = z.infer<typeof ProductSnapshotSchema>;

export type Order = z.infer<typeof OrderSchema>;
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(ProductSnapshotSchema),
  paymentStatus,
  orderStatus,
  paymentMethodType: z.string().nullable(),
  shippingAddress: AddressSchema,
  createdAt: z.date(),

  // Aggregates
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

// Create orders
async function createOrders(): Promise<Order[]> {
  const orders: Order[] = [
    {
      id: "1",
      userId: "1",
      items: [
        {
          productId: "14GVF",
          nameSnapshot: "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill",
          priceSnapshot: 229.99,
          quantity: 1,
        },
        {
          productId: "21KMF",
          nameSnapshot: "Marmot 30°F Mavericks Double Wide Sleeping Bag",
          priceSnapshot: 149.99,
          quantity: 1,
        },
      ],
      paymentStatus: "paid",
      orderStatus: "delivered",
      paymentMethodType: "credit_card",
      shippingAddress: {
        id: "addr-1",
        name: "Admin Home",
        line1: "123 Main St",
        line2: null,
        city: "Denver",
        state: "CO",
        postalCode: "80211",
        country: "USA",
      },
      createdAt: new Date("2026-01-15"),
      subtotal: 379.98,
      tax: 30.40,
      total: 410.38,
    },
    {
      id: "2",
      userId: "2",
      items: [
        {
          productId: "20CXG",
          nameSnapshot: "The North Face Pivoter 27 L Backpack",
          priceSnapshot: 39.99,
          quantity: 1,
        },
      ],
      paymentStatus: "pending",
      orderStatus: "processing",
      paymentMethodType: "paypal",
      shippingAddress: {
        id: "addr-2",
        name: "User Residence",
        line1: "456 Oak Ave",
        line2: "Apt 2B",
        city: "Boulder",
        state: "CO",
        postalCode: "80302",
        country: "USA",
      },
      createdAt: new Date("2026-02-01"),
      subtotal: 39.99,
      tax: 3.20,
      total: 43.19,
    },
    {
      id: "3",
      userId: "1",
      items: [
        {
          productId: "16PWY",
          nameSnapshot: "Klymit Static V2 Sleeping Pad - Inflatable",
          priceSnapshot: 39.99,
          quantity: 2,
        },
        {
          productId: "861PY",
          nameSnapshot: "Kelty 50°F Rambler Sleeping Bag - Semi-Rectangular",
          priceSnapshot: 34.99,
          quantity: 1,
        },
      ],
      paymentStatus: "paid",
      orderStatus: "shipped",
      paymentMethodType: "debit_card",
      shippingAddress: {
        id: "addr-1",
        name: "Admin Home",
        line1: "123 Main St",
        line2: null,
        city: "Denver",
        state: "CO",
        postalCode: "80211",
        country: "USA",
      },
      createdAt: new Date("2026-02-03"),
      subtotal: 114.97,
      tax: 9.20,
      total: 124.17,
    },
  ];

  // Optional: validate with Zod
  orders.forEach(order => OrderSchema.parse(order));

  return orders;
}
