import Image from 'next/image'
import React from 'react'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'

function Header() {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-4 shadow-sm">
      {/* Logo */}
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="https://links.papareact.com/fqy"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Navigation */}
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 mr-2 flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Searchbox */}

      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex flex-1 bg-transparent outline-none"
        />
        <button type="submit" />
      </form>

      {/* Right Side */}
      <div className="mx-5 hidden space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      {/* Menu */}
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
    </div>
  )
}

export default Header
