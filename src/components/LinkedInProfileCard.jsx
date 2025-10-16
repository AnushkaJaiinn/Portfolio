'use client';
import Image from 'next/image';
import { MoreHorizontal, Users, Eye } from 'lucide-react';
import C3B3 from '../assets/C3B3.jpg';

export default function LinkedInProfileCard({
  name = 'Anushka Jain',
  headline = 'Social Media Marketing Strategist at Rebirth | Personal Branding Expert | Helping professionals build impactful online presence',
  location = 'Mumbai, India',
  connections = '500+',
  profilePic = '/favicon.png',
  coverImage = C3B3,
  mutualConnections = 12,
  className = '',
}) {
  return (
    <div className={`w-[320px] max-w-[92vw] mx-auto rounded-xl bg-white text-gray-900 shadow-2xl ring-1 ring-gray-200 overflow-hidden ${className}`}>
      {/* Cover Image */}
      <div className="relative h-20 bg-gradient-to-r from-blue-600 to-blue-800">
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
          <div className="relative w-16 h-16 rounded-full ring-4 ring-white bg-white">
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
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Name and Headline */}
        <div className="mt-2">
          <h2 className="font-bold text-lg text-gray-900">{name}</h2>
          <p className="text-sm text-gray-700 leading-relaxed mt-1 line-clamp-3">
            {headline}
          </p>
        </div>

        {/* Location and Connections */}
        <div className="mt-3 text-sm text-gray-600">
          <p>{location}</p>
          <p className="text-blue-600 font-medium">{connections} connections</p>
          {mutualConnections > 0 && (
            <p className="text-gray-500">{mutualConnections} mutual connections</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2">
          <a
            href="https://linkedin.com/in/anushka-jain"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
          >
            Connect
          </a>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors">
            Message
          </button>
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <div className="text-sm">
            <p className="font-medium text-gray-900 mb-1">Recent Activity</p>
            <p className="text-gray-700 leading-relaxed">
              Just helped a startup founder 3x their LinkedIn engagement in 30 days. The secret? Authentic storytelling + strategic consistency...
            </p>
            <div className="flex items-center gap-4 mt-3 text-gray-500 text-xs">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>847 views</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>23 comments</span>
              </div>
              <span>2 days ago</span>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-4 flex items-center gap-3 p-2 border border-gray-200 rounded-lg">
          <div className="w-8 h-8 bg-anushka-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">Rebirth</p>
            <p className="text-xs text-gray-600">Digital Marketing Agency</p>
          </div>
        </div>
      </div>
    </div>
  );
}