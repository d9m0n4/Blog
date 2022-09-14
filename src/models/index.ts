import React from 'react';

export interface IUserInfo {
  avatarUrl?: string;
  fullName: string;
  rating?: number;
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

export interface IFile {
  id: string;
  url: string;
  thumb: string;
  public_id: string;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  id: string;
  title: string;
  tags: string[] | null;
  text: string;
  user: IUser;
  likes: string[];
  viewsCount: number;
  comments: IComment[];
  previewImage: IFile;
  createdAt: Date;
  count?: string;
}

export interface IPosts {
  posts: IPost[];
  count: number;
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  rating: number;
  avatar?: IFile;
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
  files: IFile[];
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

export type postsQuery = {
  page: number;
  limit: number;
};
