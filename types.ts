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

export type Log = {
  _id: string;
  action:
    | "LOGIN"
    | "LOGOUT"
    | "REGISTER"
    | "FAILED_LOGIN"
    | "EMAIL_VERIFICATION"
    | "VERIFY_EMAIL_REQUEST"
    | "PASSWORD_RESET"
    | "PASSWORD_RESET_REQUEST"
    | "CREATE"
    | "DELETE"
    | "UPDATE";
  message: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  _id: string;
  job_titles: string;
  job_description: string;
  company_name: string;
  company_address: string;
  contact_number: string;
  request_status: "pending" | "rejected" | "approved";
  is_closed: boolean;
  request_status_updated_by?: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  image_url?: string;
  public_id?: string;
};

export type CalendarEvent = {
  _id: string;
  event_name: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type Queue = {
  _id: string;
  person_name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  email: string;
  password?: string;
  email_type: "google" | "credentials";
  is_verified: boolean;
  role: "admin" | "super-admin" | "user";
  firtname: string;
  middlename: string;
  lastname: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
}