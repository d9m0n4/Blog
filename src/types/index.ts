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
