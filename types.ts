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

export type Article = {
  _id: string;
  title: string;
  sub_title: string;
  author: string;
  body: string;
  image_url: string;
  is_published: string;
  published_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;  
};