export interface Type<T> extends Function { new (...args: any[]): T; }

export type PagedResponse<T> = {
  data: T[],
  count: number,
  total: number,
  page: number,
  pageCount: number,
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthday: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  version: number;
}

export type Image = {
  id: number,
  url: string,
  title: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  version: number,
};

export type PageData ={
  title: string,
  subtitle: string,
  image: string,
}