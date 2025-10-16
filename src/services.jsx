import Service1 from './assets/Service1.png';
import Service2 from './assets/Service2.png';
import Service3 from './assets/Service3.png';

const services = [
  {
    icon: Service1,
    title: "LinkedIn Management",
    description: "We don't just manage your LinkedIn we turn it into a personal brand that attracts clients, opportunities, and authority. Done-for-you growth that makes you the go-to name in your industry.",
    category: ["Brand Building", "Lead Generation"]
  },
  {
    icon: Service2,
    title: "Ghostwriting",
    description: "Your ideas. Our words. We craft powerful posts that sound like you — only better. Build influence, attract clients, and grow your brand without ever worrying about what to write.",
    reverse: true,
    category: ["Brand Building"]
  },
  {
    icon: Service3,
    title: "Coaching Calls",
    description: "Clarity beats confusion. In our 1:1 coaching calls, I'll show you exactly how to reinvent yourself, grow on LinkedIn, and create a brand that opens doors you didn't even know existed.",
    category: ["Strategy"]
  }
];

export default services;
