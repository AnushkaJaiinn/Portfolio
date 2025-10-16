'use client';
import Image from 'next/image';
import { Bell, MoreVertical } from 'lucide-react';
import profilePic from '../assets/Linkedin_Profile_4.png';

export default function YouTubeProfileCard({
  channelName = 'Realwithjain',
  profileName = 'Anushka Jain',
  handle = '@realwithjain',
  subscribers = '5.14K',
  videos = 64,
  className = '',
}) {
  return (
    <div className={`w-[320px] max-w-[92vw] mx-auto rounded-xl bg-[#0f0f0f] text-white shadow-2xl ring-1 ring-white/10 overflow-hidden ${className}`}>
      {/* Pink Banner */}
      <div className="relative h-20 bg-gradient-to-r from-pink-300 to-pink-400 flex items-center justify-center">
        <h1 className="text-2xl font-bold italic text-black">{channelName}</h1>
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4 pt-4">
        {/* Profile Picture and Info */}
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={profilePic}
              alt={profileName}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Channel Info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg">{profileName}</h2>
            <p className="text-gray-400 text-sm">{handle}</p>
            <p className="text-gray-400 text-sm">{subscribers} subscribers • {videos} videos</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-3 text-sm text-gray-300 leading-relaxed">
          <p>Become your best self. <span className="text-blue-400">...more</span></p>
        </div>

        {/* Links */}
        <div className="mt-2 text-sm text-blue-400">
          linkedin.com/in/anushka-jain-408b81211 and 1 more link
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <a
              href="https://www.youtube.com/@realwithjain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors text-center"
            >
              Subscribe
            </a>
            <button className="px-4 py-2 bg-white/10 text-white rounded-full font-semibold text-sm hover:bg-white/20 transition-colors">
              Join
            </button>
          </div>
          <button className="w-full bg-white/10 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors">
            Visit community
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400 border-b border-gray-700 pb-2">
          <span className="text-white border-b-2 border-white pb-2">Home</span>
          <span>Videos</span>
          <span>Shorts</span>
          <span>Playlists</span>
          <span>Posts</span>
        </div>

        {/* Latest Video Preview */}
        <div className="mt-4 bg-gray-900/50 rounded-lg overflow-hidden">
          <div className="relative h-32 bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20" />
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">STOP</div>
              <div className="text-xl font-bold text-yellow-300">BEING AFRAID</div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              7:34
            </div>
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm text-white line-clamp-2 leading-tight">
              How To Build Confidence & Own Your Power
            </h4>
            <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs">
              <span>Anushka Jain • 1.5K views • 2 months ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}