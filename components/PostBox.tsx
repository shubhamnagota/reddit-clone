import React from 'react';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Avatar from './Avatar';

type FormData = {
  postTitle: string;
  postBody: string;
  subreddit: string;
  postImage: string;
};

function PostBox() {
  const { data: session } = useSession();

  const { register, watch } = useForm<FormData>();

  return (
    <form className="sticky-16 z-50 rounded-md border border-gray-300 bg-white p-2">
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
        <PhotographIcon className="icon" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input {...register('postBody')} type="text" className="m-2 flex-1 bg-blue-50 outline-none" placeholder="Text (optional)" />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input {...register('subreddit')} type="text" className="m-2 flex-1 bg-blue-50 outline-none" placeholder="i.e. reactjs" />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Image:</p>
            <input {...register('postImage')} type="text" className="m-2 flex-1 bg-blue-50 outline-none" placeholder="optional" />
          </div>
        </div>
      )}
    </form>
  );
}

export default PostBox;
