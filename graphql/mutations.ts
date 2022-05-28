import { gql } from '@apollo/client';

export const ADD_POST = gql`
  mutation addPost($title: String!, $body: String!, $subreddit_id: ID!, $image: String!, $username: String!) {
    insertPost(body: $body, title: $title, subreddit_id: $subreddit_id, image: $image, username: $username) {
      id
      title
      body
      subreddit_id
      image
      username
      created_at
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation addSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
