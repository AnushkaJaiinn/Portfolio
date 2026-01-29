'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreHorizontal, Eye, MessageSquare } from 'lucide-react';

const LinkedInNativeCard = ({ profile }) => (
  <Card className="bg-white text-gray-800 overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-neutral-300">
    <div className="relative">
      <div className="relative w-full aspect-[804/201] overflow-hidden">
        <Image src={profile.bannerUrl} alt={`${profile.name}'s Banner`} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute bottom-0 left-6 translate-y-[30%] w-1/5 z-10">
        <Image src={profile.profileUrl} alt={profile.name} width={100} height={100} className="w-full aspect-square rounded-full border-4 border-white object-cover shadow-lg" />
      </div>
    </div>
    <CardHeader className="pt-12">
      <CardTitle className="inline-flex items-center gap-1.5">
        <span>{profile.name}</span>
        {/* LinkedIn Premium Badge */}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block"
        >
          <rect width="16" height="16" rx="2" fill="#E6B800"/>
          <path 
            d="M8 3.5L9.5 6.5H12.5L10 8.5L11 11.5L8 9.5L5 11.5L6 8.5L3.5 6.5H6.5L8 3.5Z" 
            fill="white"
          />
        </svg>
      </CardTitle>
      <CardDescription className="h-[1.875rem]">{profile.bio}</CardDescription>
    </CardHeader>
    <CardContent>
      {/* Location and Connections */}
      <div className="text-sm text-gray-600 mb-4">
        <p>Mumbai, India</p>
        <p className="text-blue-600 font-medium">50,500 followers</p>
        <p className="text-gray-500">
          <a 
            href="https://www.linkedin.com/in/jaibhagwanjindal/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Jaibhagwan Jindal
          </a>
          {' '}and 99+ other mutual connections
        </p>
      </div>
      
        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-4">
          <a
            href="https://www.linkedin.com/in/anushka-jain-408b81211/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
          >
            Follow
          </a>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors">
            Message
          </button>
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </button>
        </div>      {/* Recent Activity */}
      <div className="border border-gray-200 rounded-lg bg-gray-50 p-3">
        <div className="text-sm">
          <p className="font-medium text-gray-900 mb-1">Recent Activity</p>
          <p className="text-gray-700 leading-relaxed text-sm">
            Just helped a startup founder 3x their LinkedIn engagement in 30 days. The secret? Authentic storytelling + strategic consistency...
          </p>
          <div className="flex items-center gap-4 mt-3 text-gray-500 text-xs">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>847 views</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>23 comments</span>
            </div>
            <span>2 days ago</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LinkedInNativeCard;