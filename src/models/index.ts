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
  avatarUrl?: string;
  fullName: string;
  rating?: string;
  onlyAvatar?: boolean;
  onClick?: () => void;
  width?: number;
}

export interface ISideBlock {
  title: string;
  children: React.ReactElement | React.ReactElement[];
}

export interface ITagsblock {
  items: Tag[];
  isLoading: boolean;
}

export interface ICommentsBlock {
  items: IComment[];
  isLoading?: boolean;
}

export interface IPost {
  id: string;
  title: string;
  tags?: string[] | null;
  text: string;
  user: IUser;
  likes: number;
  viewsCount: number;
  comments: IComment[];
  previewImage: string;
  createdAt: Date;
}
export interface IUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  rating: number;
  avatar?: string;
  city?: string;
  nickName?: string;
}

export interface AuthResponse {
  userData: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IComment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  postId: string;
  post?: IPost;
  user: IUser;
  files: string[];
}

export interface IPostData {
  title: string;
  tags: string;
  text: string;
  userId: string;
  previewImage: File;
}

export interface IUserPostData {
  fullName: string;
  email: string;
  password: string;
}

export interface IErrorResponse {
  errors: [];
  message: string;
}

export interface IUserContext {
  user: IUser;
}

export type Tag = string;

export interface CurrentUserData extends IUser {
  posts: IPost[];
  comments: IComment[];
}
