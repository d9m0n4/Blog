import React, { JSXElementConstructor } from 'react';

type Key = string | number;

interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: Key | null;
}

export interface IUserInfo {
  avatarUrl: string;
  fullName: string;
  rating: string;
}

export interface ISideBlock {
  title: string;
  children: React.ReactElement | React.ReactElement[];
}

export interface ITagsblock {
  items: Object[];
  isLoading: boolean;
}

export interface ICommentsBlock {
  items: Object[];

  isLoading: boolean;
}

export interface IPost {
  id: string;
  title: string;
  tags?: string[] | null;
  text: string;
  user: IUser;
  likes: number;
  views: number;
  comments?: IComments[];
  previewImage: string;
  createdAt: string;
}
export interface IUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  rating: string;
  avatar: string;
}
export interface IComments {
  id?: null;
  text?: null;
  createdAt?: null;
  updatedAt?: null;
  postId?: null;
  userId?: null;
}

export interface IPostData {
  title: string;
  tags: string;
  text: string;
  userId: string;
  previewImage: File;
}
