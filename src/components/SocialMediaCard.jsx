'use client';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

const SocialMediaCard = ({ platform, handle, followers, engagement, icon, bgColor, content, profilePic }) => (
    <Card className={`border-white/20 transform hover:scale-105 transition-transform duration-300 group ${bgColor}`}>
        <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Image src={profilePic} alt={handle} width={48} height={48} className="w-12 h-12 rounded-full border-2 border-white/50" />
                    <div>
                        <p className="font-bold text-white text-lg">{handle}</p>
                        <p className="text-white/80 text-sm">{platform}</p>
                    </div>
                </div>
                <div className="text-white">{icon}</div>
            </div>
            <p className="text-white/90 mb-4">{content}</p>
            <div className="flex justify-around bg-black/20 p-3 rounded-lg text-white text-center">
                <div>
                    <p className="font-bold text-xl">{followers}</p>
                    <p className="text-xs opacity-80">Followers</p>
                </div>
                <div>
                    <p className="font-bold text-xl">{engagement}</p>
                    <p className="text-xs opacity-80">Engagement</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default SocialMediaCard;
