'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const LinkedInCard = ({ client }) => (
  <Card className="bg-white text-gray-800 overflow-hidden transform transition-transform duration-300 hover:scale-105">
    <div className="relative">
      <div className="relative w-full aspect-[804/201] overflow-hidden">
        <Image src={client.bannerUrl} alt={`${client.name}'s Banner`} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute bottom-0 left-6 translate-y-[30%] w-1/5 z-10">
        <Image src={client.profileUrl} alt={client.name} width={100} height={100} className="w-full aspect-square rounded-full border-4 border-white object-cover shadow-lg" />
      </div>
    </div>
    <CardHeader className="pt-12">
      <CardTitle>{client.name}</CardTitle>
      <CardDescription className="h-[1.875rem]">{client.bio}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-center text-lg font-semibold text-gray-800 mb-3 h-[3rem] flex items-center justify-center">{client.resultDescription}</p>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg relative">
        <div className="w-[45%] z-20 bg-gray-100 relative">
          <p className="text-sm font-semibold text-gray-600 mb-2">Before</p>
          <Image src={client.analyticsImageLeft} alt="Before Analytics" width={64} height={64} className="w-full aspect-[4/3] rounded-md mb-2" />
          <p className="text-2xl font-bold text-red-500">{client.beforeViews}</p>
        <div className="absolute top-1/4 left-full -translate-x-1/2 -translate-y-1/2 text-4xl bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">→</div>
        </div>
        <div className="w-[45%] z-20 bg-gray-100">
          <p className="text-sm font-semibold text-gray-600 mb-2">After</p>
          <Image src={client.analyticsImageRight} alt="After Analytics" width={64} height={64} className="w-full aspect-[4/3] rounded-md mb-2" />
          <p className="text-2xl font-bold text-green-500">{client.afterViews}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LinkedInCard;