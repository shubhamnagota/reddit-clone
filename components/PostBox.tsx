import React, { useState } from 'react';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

import Avatar from './Avatar';
import apolloClient from '../apollo-client';

import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';

type FormData = {
  postTitle: string;
  postBody: string;
  subreddit: string;
  postImage: string;
};

function PostBox() {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Checking subreddit...');

    try {
      let {
        data: { getSubredditListByTopic: subreddit },
      } = await apolloClient.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      if (!subreddit) {
        toast.loading('Creating subreddit first...', {
          id: notification,
        });
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });
        subreddit = newSubreddit;
      }

      toast.loading('Creating new post...', {
        id: notification,
      });

      const {
        data: { addPost: post },
      } = await addPost({
        variables: {
          title: formData.postTitle,
          body: formData.postBody,
          image: formData.postImage || '',
          subreddit_id: subreddit.id,
          username: session?.user?.name,
        },
      });

      console.log(post);

      setValue('postBody', '');
      setValue('postTitle', '');
      setValue('postImage', '');
      setValue('subreddit', '');

      toast.success('New post created!', {
        id: notification,
      });
    } catch (error) {
      console.log(error);
      toast.error('Whoops! Some error occured', {
        id: notification,
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="sticky-16 z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex flex-1 items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          type="text"
          className="flex flex-1 rounded-md bg-gray-50 p-2 outline-none"
          disabled={!session}
          placeholder={session ? 'Create a post by entering a title' : 'Sign in to post'}
        />

        <LinkIcon className="icon" />
        <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`icon ${imageBoxOpen && 'text-blue-100'}`} />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input {...register('postBody')} type="text" className="m-2 flex-1 rounded-md bg-blue-50 p-2 outline-none" placeholder="Text (optional)" />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input {...register('subreddit', { required: true })} type="text" className="m-2 flex-1 rounded-md bg-blue-50 p-2 outline-none" placeholder="i.e. reactjs" />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image Url:</p>
              <input {...register('postImage')} type="text" className="m-2 flex-1 rounded-md bg-blue-50 p-2 outline-none" placeholder="optional" />
            </div>
          )}
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="space-y-2 p-2 text-red-500">
          {errors.postTitle?.type === 'required' && <p>Title is required</p>}
          {errors.subreddit?.type === 'required' && <p>Subreddit is required</p>}
        </div>
      )}

      {!!watch('postTitle') && (
        <button type="submit" className="w-full rounded-lg bg-blue-400 p-2 text-white">
          Create Post
        </button>
      )}
    </form>
  );
}

export default PostBox;
