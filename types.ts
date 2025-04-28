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
  body: string;
  image_url: string;
  public_id: string;
  is_published: string;
  published_date: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
};

export type Announcement = {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type OfficialPosition = {
  _id: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type Official = {
  _id: string;
  titles: string;
  name: string;
  position: string;
  image_url: string;
  public_id: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentType = {
  _id: string;
  name: string;
  is_disabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VerifiedDocument = {
  _id: string;
  owner_name: string;
  document_type: string;
  remarks: string;
  verified_link: string;
  verified_by: string;
  createdAt: string;
  updatedAt: string;
};
