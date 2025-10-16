import React from 'react';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const socialMediaExamples = [
    {
        platform: "LinkedIn",
        handle: "Anushka Jain",
        followers: "12.5K",
        engagement: "7.2%",
        icon: <Linkedin size={32} />,
        bgColor: "bg-blue-600/80",
        content: "Just helped a startup founder 3x their LinkedIn engagement in 30 days. The secret? Authentic storytelling + strategic consistency. Results speak louder than promises. 💼",
        profilePic: "/favicon.svg"
    },
    {
        platform: "Twitter",
        handle: "@anniejain",
        followers: "15.2K",
        engagement: "5.1%",
        icon: <Twitter size={32} />,
        bgColor: "bg-sky-500/80",
        content: "Just wrapped up a killer LinkedIn strategy that boosted a client's lead gen by 300%. It's not magic, it's method. ✨ #LinkedIn #Marketing",
        profilePic: "https://placehold.co/100x100/e0f2fe/0c4a6e?text=AJ"
    },
    {
        platform: "Instagram",
        handle: "@anushkajaiinn",
        followers: "8.7K",
        engagement: "8.3%",
        icon: <Instagram size={32} />,
        bgColor: "bg-pink-600/80",
        content: "Behind the scenes of a personal branding photoshoot. 📸 Authenticity is your most powerful asset. Let it shine!",
        profilePic: "https://placehold.co/100x100/fce7f3/831843?text=AJ"
    },
    {
        platform: "YouTube",
        handle: "Anushka Jain",
        followers: "3.2K",
        engagement: "12.8%",
        icon: <Youtube size={32} />,
        bgColor: "bg-red-600/80",
        content: "New video: 'How I Built My Personal Brand from Zero to 6-Figure Business' - sharing the real strategies that actually work. Link in bio! 🎥",
        profilePic: "/favicon.svg"
    }
];

export default socialMediaExamples;
