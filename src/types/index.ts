import React from 'react';

export interface IUserInfo {
  avatarUrl: string;
  fullName: string;
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
  children?: React.ReactElement | React.ReactElement[];
  isLoading: boolean;
}
