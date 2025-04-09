export type FeaturedPhoto = {
  _id: string;
  url: string;
  public_id: string;
  uploaded_by: string;
  createdAt: string;
  updatedAt: string;
  hidden: boolean;
  numerical_order: number;
};

export type Hotline = {
  _id: string;
  label: string;
  number: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
};
