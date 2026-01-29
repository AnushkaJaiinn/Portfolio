'use client';
import Image from 'next/image';
import { MoreHorizontal, Bell, Calendar, Link as LinkIcon, MapPin } from 'lucide-react';

export default function TwitterProfileCard({
  username = 'anushkajaiinn',
  handle = '@anushkajaiinn',
  name = 'Anushka Jain',
  bio = 'LinkedIn Marketing Strategist | Personal Branding Expert | Helping professionals build impactful online presence 🚀',
  location = 'Mumbai, India',
  website = { label: 'anushkajain.com', href: '#' },
  joinDate = 'March 2020',
  following = 487,
  followers = '12.8K',
  profilePic = 'https://placehold.co/120x120/111827/ffffff?text=AJ',
  coverImage = 'https://placehold.co/600x200/ec4899/ffffff?text=Cover',
  isVerified = false,
  isFollowing = false,
  className = '',
}) {
  return (
    <div className={`w-[320px] max-w-[92vw] mx-auto rounded-2xl bg-black text-white shadow-2xl ring-1 ring-white/10 overflow-hidden ${className}`}>
      {/* Cover Image */}
      <div className="relative h-24 bg-gradient-to-r from-gray-800 to-gray-900">
        <Image
          src={coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture */}
        <div className="relative -mt-8 mb-3">
          <div className="relative w-16 h-16 rounded-full ring-4 ring-black">
            <Image
              src={profilePic}
              alt={name}
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="absolute top-3 right-4 flex items-center gap-2">
          <button className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <a
            href="https://twitter.com/anushkajaiinn"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-1.5 rounded-full font-bold text-sm transition-colors inline-block ${
              isFollowing 
                ? 'bg-transparent border border-gray-600 text-white hover:bg-red-900/20 hover:border-red-600 hover:text-red-400' 
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </a>
        </div>

        {/* Name and Handle */}
        <div className="mt-2">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-lg">{name}</h2>
            {isVerified && (
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            )}
          </div>
          <p className="text-gray-400 text-sm">{handle}</p>
        </div>

        {/* Bio */}
        <div className="mt-3 text-sm leading-relaxed">
          {bio}
        </div>

        {/* Meta Info */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-gray-400 text-sm">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <a href={website.href} className="text-blue-400 hover:underline">
                {website.label}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {joinDate}</span>
          </div>
        </div>

        {/* Follow Stats */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <div>
            <span className="font-bold text-white">{following}</span>
            <span className="text-gray-400 ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold text-white">{followers}</span>
            <span className="text-gray-400 ml-1">Followers</span>
          </div>
        </div>

        {/* Sample Tweet */}
        <div className="mt-4 p-3 border border-gray-800 rounded-xl bg-gray-900/30">
          <div className="text-sm">
            <p className="text-gray-200 leading-relaxed">
              Just helped a client increase their LinkedIn lead generation by 300%! 🚀 
              <span className="text-blue-400 cursor-pointer hover:underline ml-1">...see more</span>
            </p>
            <div className="flex items-center gap-4 mt-3 text-gray-400 text-xs">
              <span>2:47 PM · Oct 12, 2025</span>
              <span>·</span>
              <span className="text-blue-400">🌐 Everyone can reply</span>
            </div>
            <div className="flex items-center gap-6 mt-3 text-gray-400 text-sm">
              <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                <span>💬</span>
                <span>24</span>
              </div>
              <div className="flex items-center gap-1 hover:text-green-400 cursor-pointer transition-colors">
                <span>🔄</span>
                <span>89</span>
              </div>
              <div className="flex items-center gap-1 hover:text-red-400 cursor-pointer transition-colors">
                <span>❤️</span>
                <span>456</span>
              </div>
              <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                <span>📈</span>
                <span>2.1K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}