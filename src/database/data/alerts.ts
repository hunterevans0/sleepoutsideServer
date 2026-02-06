import { z } from "zod";

export const AlertSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["warning", "info", "promotion"]),
  scope: z.enum(["brand", "category", "product"]),
  targetIds: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
});

export type Alert = z.infer<typeof AlertSchema>;

export const alerts: Alert[] = [
  {
    id: "1",
    title: "Scheduled Maintenance Tonight",
    type: "warning",
    scope: "brand",
    targetIds: ["1"], // applies to entire brand
    status: "active",
    startsAt: new Date("2026-02-01T22:00:00Z"),
    endsAt: new Date("2026-02-02T02:00:00Z"),
  },
  {
    id: "2",
    title: "Free Shipping on Electronics",
    type: "promotion",
    scope: "category",
    targetIds: ["1"],
    status: "active",
    startsAt: new Date("2026-02-01T00:00:00Z"),
    endsAt: new Date("2026-02-10T23:59:59Z"),
  },
  {
    id: "3",
    title: "Product Back in Stock",
    type: "info",
    scope: "product",
    targetIds: ["16PWY"],
    status: "inactive",
    startsAt: new Date("2026-01-15T00:00:00Z"),
    endsAt: null, // informational, no end date
  },
  {
    id: "4",
    title: "Limited-Time 20% Discount",
    type: "promotion",
    scope: "product",
    targetIds: ["21KMF", "14GVF"],
    status: "active",
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
  },
];

// Optional validation
alerts.forEach(alert => AlertSchema.parse(alert));
