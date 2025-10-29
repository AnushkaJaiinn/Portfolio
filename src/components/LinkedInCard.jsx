'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Eye, BarChart3, Users, Linkedin } from 'lucide-react';

const LinkedInCard = ({ client }) => (
  <Card className="bg-white text-gray-800 overflow-hidden transform transition-transform duration-300 hover:scale-105 h-full">
    <div className="relative">
      <div className="relative w-full aspect-[804/201] overflow-hidden">
        <Image src={client.bannerUrl} alt="Client Banner" layout="fill" objectFit="cover" />
        {/* LinkedIn Logo at bottom right */}
        <div className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur-sm rounded p-1 shadow-md">
          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
        </div>
      </div>
      <div className="absolute bottom-0 left-4 translate-y-[30%] w-1/5 z-10">
        <Image src={client.profileUrl} alt="Client Profile" width={100} height={100} className="w-full aspect-square rounded-full border-3 border-white object-cover shadow-lg" />
      </div>
    </div>
    <CardHeader className="pt-8 pb-2 px-4">
      <CardTitle className="text-base leading-tight">{client.name}</CardTitle>
      <CardDescription className="text-xs line-clamp-1">{client.bio}</CardDescription>
    </CardHeader>
    <CardContent className="pt-0 px-4 pb-4">
      <p className="text-center text-sm font-semibold text-gray-800 mb-3 line-clamp-2">{client.resultDescription}</p>
        
        {/* Analytics Comparison */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg shadow-inner">
          <div className="grid grid-cols-2 gap-2">
            {/* Before Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between mb-1 pb-0.5 border-b border-red-200">
                <h4 className="text-[9px] font-bold text-gray-600 uppercase tracking-wide">Before</h4>
                <BarChart3 className="w-3 h-3 text-red-500" />
              </div>
              
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <Eye className="w-2.5 h-2.5 text-red-400" />
                  <p className="text-[8px] text-gray-600">Views</p>
                </div>
                <p className="text-sm font-bold text-red-600">{client.beforeProfileViews}</p>
              </div>
              
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <TrendingUp className="w-2.5 h-2.5 text-red-400" />
                  <p className="text-[8px] text-gray-600">Impress.</p>
                </div>
                <p className="text-sm font-bold text-red-600">{client.beforePostImpressions}</p>
              </div>
              
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <Users className="w-2.5 h-2.5 text-red-400" />
                  <p className="text-[8px] text-gray-600">Engage</p>
                </div>
                <p className="text-sm font-bold text-red-600">{client.beforeEngagementRate}</p>
              </div>
            </div>

            {/* After Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between mb-1 pb-0.5 border-b border-green-200">
                <h4 className="text-[9px] font-bold text-gray-600 uppercase tracking-wide">After</h4>
                <BarChart3 className="w-3 h-3 text-green-500" />
              </div>
              
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <Eye className="w-2.5 h-2.5 text-green-400" />
                  <p className="text-[8px] text-gray-600">Views</p>
                </div>
                <p className="text-sm font-bold text-green-600">{client.afterProfileViews}</p>
              </div>
              
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <TrendingUp className="w-2.5 h-2.5 text-green-400" />
                  <p className="text-[8px] text-gray-600">Impress.</p>
                </div>
                <p className="text-sm font-bold text-green-600">{client.afterPostImpressions}</p>
              </div>
              
              <div className="bg-white rounded p-1.5 shadow-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  <Users className="w-2.5 h-2.5 text-green-400" />
                  <p className="text-[8px] text-gray-600">Engage</p>
                </div>
                <p className="text-sm font-bold text-green-600">{client.afterEngagementRate}</p>
              </div>
            </div>
          </div>
          
          {/* Growth Arrow Indicator */}
          <div className="flex items-center justify-center mt-2">
            <div className="text-lg font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              ↗ Growth
            </div>
          </div>
        </div>
    </CardContent>
  </Card>
);

export default LinkedInCard;