export interface Product {
  _id: string;
  id: string;
  isClearance: boolean;
  category: string;
  isNew: boolean;
  url: string;
  reviews: {
    reviewsUrl: string;
    reviewCount: number;
    averageRating: number;
  };
  nameWithoutBrand: string;
  name: string;
  images: {
    primarySmall: string;
    primaryMedium: string;
    primaryLarge: string;
    primaryExtraLarge: string;
    extraImages: {
      title: string;
      src: string;
    }[];
  };
  sizesAvailable: {
    zipper: string[];
  };
  colors: Color[];
  descriptionHtmlSimple: string;
  suggestedRetailPrice: number;
  brand: Brand;
  listPrice: number;
  finalPrice: number;
}

export interface Color {
  colorCode: string;
  colorName: string;
  colorChipImageSrc: string;
  colorPreviewImageSrc: string;
}

export interface Brand {
  id: string;
  url: string;
  productsUrl: string;
  logoSrc: string;
  name: string;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  password: string;
  addressIds: string[]; // Option to save address only at checkout
  joinDate: Date;
  role: "user" | "admin";
};

export interface Alert {
  id: string;
  title: string;
  type: "warning" | "info" | "promotion";
  scope: "brand" | "category" | "product";
  targetIds: string[];
  status: "active" | "inactive";
  startsAt: Date;
  endsAt: Date | null;
}

/*
export type Alert = z.infer<typeof AlertSchema>;
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
*/