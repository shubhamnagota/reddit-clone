import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession();

  const userName = seed || session?.user?.name || 'dummy';

  return (
    <div className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-100 bg-white ${large && 'h-20 w-20'}`}>
      <Image src={`https://avatars.dicebear.com/api/open-peeps/${userName}.svg`} layout="fill" />
    </div>
  );
}

export default Avatar;
