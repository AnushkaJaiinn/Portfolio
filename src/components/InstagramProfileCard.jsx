'use client';
import Image from 'next/image';
import { Bell, MoreVertical, ChevronLeft, Link as LinkIcon, UserPlus, Grid3X3, Clapperboard, Repeat, UserSquare2 } from 'lucide-react';
import instagramProfile from '../assets/instagram_profile.jpg';

export default function InstagramProfileCard({
  username = 'anushkajaiinn',
  name = 'Anushka',
  posts = 38,
  followers = '11.7K',
  following = 195,
  bio = [
    { type: 'text', value: 'Building ' },
    { type: 'mention', value: '@realwithjain', href: '#' },
  ],
  location = 'Mumbai',
  website = { label: 'opener.one/yt/f8nsl7', href: '#' },
  followedBy = [
    { name: 'realwithjain', url: 'https://www.instagram.com/realwithjain' },
    { name: 'jaibhagwan_jindal', url: 'https://www.instagram.com/jaibhagwan_jindal' }
  ],
  profilePic = instagramProfile,
  highlights = [
    { label: 'Mumbai', src: 'https://placehold.co/100x100/0b1220/ffffff?text=M' },
    { label: 'Jaipur', src: 'https://placehold.co/100x100/0b1220/ffffff?text=J' },
    { label: 'Goa', src: 'https://placehold.co/100x100/0b1220/ffffff?text=G' },
    { label: 'Udaipur', src: 'https://placehold.co/100x100/0b1220/ffffff?text=U' },
  ],
  className = '',
}) {
  return (
    <div className={`w-[320px] max-w-[92vw] mx-auto rounded-3xl bg-[#0a0f1a] text-white shadow-2xl ring-1 ring-white/10 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <ChevronLeft className="h-5 w-5" />
          <span className="font-semibold">{username}</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5" />
          <MoreVertical className="h-5 w-5" />
        </div>
      </div>

      {/* Profile Row */}
      <div className="px-5">
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600 via-pink-400 to-yellow-400" aria-hidden />
            <Image
              src={profilePic}
              alt={name}
              width={96}
              height={96}
              className="relative h-24 w-24 rounded-full object-cover ring-2 ring-[#0a0f1a]"
            />
          </div>

          <div className="flex flex-1 items-center justify-around text-center">
            <div>
              <div className="text-lg font-bold">{posts}</div>
              <div className="text-xs text-gray-400">posts</div>
            </div>
            <div>
              <div className="text-lg font-bold">{followers}</div>
              <div className="text-xs text-gray-400">followers</div>
            </div>
            <div>
              <div className="text-lg font-bold">{following}</div>
              <div className="text-xs text-gray-400">following</div>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mt-3 text-sm font-semibold">{name}</div>

        {/* Bio */}
        <div className="mt-1 text-sm text-gray-200">
          {bio.map((piece, idx) => {
            if (piece.type === 'mention') {
              return (
                <a key={idx} href={piece.href} className="text-sky-400 hover:underline">
                  {piece.value}
                </a>
              )
            }
            if (piece.type === 'link') {
              return (
                <a key={idx} href={piece.href} className="text-sky-400 hover:underline">
                  {piece.value}
                </a>
              )
            }
            return <span key={idx}>{piece.value}</span>
          })}
        </div>
        <div className="text-sm text-gray-300">{location}</div>
        {/* Additional spacing to match other cards */}
        <div className="h-4"></div>

        <div className="mt-1 flex items-center gap-2 text-sm text-sky-400">
          <LinkIcon className="h-4 w-4" />
          <a href={website.href} className="hover:underline break-all">{website.label}</a>
        </div>
        {!!followedBy?.length && (
          <div className="mt-1 text-xs text-gray-400">
            Followed by{' '}
            {followedBy.map((follower, index) => (
              <span key={follower.name}>
                <a 
                  href={follower.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:underline"
                >
                  {follower.name}
                </a>
                {index < followedBy.length - 1 && ' & '}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-3 px-5 flex items-center gap-2">
        <a 
          href="https://instagram.com/anushkajaiinn/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-blue-600 text-white py-2 text-sm font-medium text-center hover:bg-blue-700 transition-colors duration-200"
        >
          Follow
        </a>
        <button className="flex-1 rounded-lg bg-white/10 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-200">Message</button>
        <button className="flex-1 rounded-lg bg-white/10 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-200">Contact</button>
        <button className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors duration-200"><UserPlus className="h-5 w-5" /></button>
      </div>

      {/* Highlights row */}
      <div className="mt-5 px-4 pb-4">
        <div className="grid grid-cols-4 gap-4">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col items-center">
              <div className="relative w-full max-w-16 aspect-square">
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-purple-600 via-pink-400 to-yellow-400" aria-hidden />
                <div className="relative w-full h-full rounded-full p-0.5 bg-[#0a0f1a]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f1a] relative">
                    <Image src={h.src} alt={h.label} fill className="object-cover object-center" />
                  </div>
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-300 max-w-16 w-full text-center truncate">{h.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav (visual only) */}
      <div className="border-t border-white/10 px-8 py-3 flex items-center justify-between text-gray-400">
        <Grid3X3 className="h-5 w-5" />
        <Clapperboard className="h-5 w-5" />
        <Repeat className="h-5 w-5" />
        <UserSquare2 className="h-5 w-5" />
      </div>
    </div>
  )
}
