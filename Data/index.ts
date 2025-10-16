
interface Step {
  title: string;
  description: string;
  icon: string
}

interface HomeData {
  hero: {
    title: string;
    description: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  howItWorks: {
    steps: Step[];
    vendorBenefits: string[];
    aiFeatures: string[];
    // icon:string;
  };
  blogPosts: BlogPost[];
}
 


interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  readTime: string;
  image: string;
  avatar: string;
}

interface VendorsData {
  venues: {
    id: number,
    title: string,
    organizer: string,
    image: string,
    avatar: string,
    category: string,
    rating:number,
    reviews: number,
  
  }[]  
}


interface BlogPost2 {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  avatar: string;
}



export const homeData: HomeData = {
  hero: {
    title: "PLAN YOUR PERFECT EVENT WITH ",
    description:
      "KOVIO is your one-stop marketplace platform for seamless event planning. Whether it's a wedding, corporate event, birthday, or proposal, we connect you with the best venues and vendors across Nigeria.",
  },
  about: {
    title: "Who We Are",
    paragraphs: [
      "At KOVIO, we believe every event deserves to be extraordinary. Our mission is to simplify event planning by providing a centralized platform where you can discover, compare, and book the perfect venues and vendors for any occasion.",
      "From weddings to corporate events, birthdays to proposals, baby showers to bridal showers, KOVIO transforms event planning with AI-powered recommendations, real-time availability tracking, and secure payments. Our live chat feature lets you connect with vendors instantly for real-time responses, ensuring seamless communication. Plus, with our flexible payment options, you can secure your bookings with a 50% down payment and pay the rest later—making vendor booking and event planning stress-free and convenient.",
      "Join thousands of users and vendors who trust KOVIO to bring their event visions to life.",
    ],
  },
  howItWorks: {
    steps: [
      {
        title: "Step 1: Search & Discover",
        description:
          "Explore a wide range of venues and vendors tailored to your event type, location, and budget.",
         icon:"/newimages/step3.png"
        },
      {
        title: "Step 2: Compare & Choose",
        description:
          "Use advanced filters and AI-powered recommendations to find the perfect match for your needs.",
        icon:"/newimages/step2.png"
        },
      {
        title: "Step 3: Book, Negotiate & Pay Securely",
        description:
          "Book instantly or send inquiries, and complete payments safely through our secure payment gateway.",
        icon:"/newimages/step1.png"
      },
      {
        title: "Step 4: Enjoy Your Event",
        description:
          "Sit back, relax, and let KOVIO handle the details while you focus on creating unforgettable memories.",
      icon:"/newimages/step3.png"
      
        },
    ],
    vendorBenefits: [
      "Create a Professional Profile: Highlight your services, upload photos, and showcase your work.",
      "Increase Visibility: Get discovered by thousands of event planners and individuals.",
      "Manage Bookings Easily: Use our dashboard to track bookings, earnings, and customer reviews.",
      "Avoid Overbooking with Real-Time Calendar Sync: Sync your availability with our calendar to prevent double bookings, ensuring you never take more events than you can handle.",
      "Stay Organized with Booking Reminders: Receive weekly reminders before each event, so you’re always prepared and never miss a detail.",
    ],
    aiFeatures: [
      "Smart Search: Find venues and vendors based on event type, location, and budget.",
      "Budget Estimator: Get a realistic cost estimate for your event.",
      "Real-Time Availability: Avoid scheduling conflicts with up-to-date availability tracking.",
      
    ],
  },

  blogPosts: [
    {
      id: 1,
      title: "Top 10 Wedding Venues in Lagos",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      author: "Azunyan U. Wu",
      readTime: "5min read",
      image: "/newimages/blogpost1.jpeg", 
      avatar:"/newimages/avatar.png"
    },


    {
      id: 2,
      title: "Top 10 Wedding Proposal Venues in...",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      author: "Veronica D. White",
      readTime: "5min read",
      image: "/newimages/blogpost2.jpeg", 
      avatar:"/newimages/avatar2.png"
    },
    {
      id: 3,
      title: "5 Tips for Planning a Stress-Free E...",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      author: "Jesse Pinkman",
      readTime: "5min read",
      image: "/newimages/blogpost3.jpeg",
      avatar:"/newimages/avatar.png"
    },
  ],
};

export const vendorsData: VendorsData = {
  venues: [
    {
      id: 1,
      title: "John Doe Photography",
      category: "Photography",
      rating: 4.7,
      reviews: 384,
      organizer: "John Doe",
      image: "/newimages/vendor/image1.jpeg",
      avatar: "/newimages/avatar.png",
   

    },
    {
      id: 2,
      title: "Taste of Lagos",
      category: "Catering",
      rating: 4.8,
      reviews: 99,
      organizer: "John Doe",
      image: "/newimages/vendor/image2.jpeg",
      avatar: "/newimages/avatar.png",
   
    },
    {
      id: 3,
      title: "Suya Branch",
      category: "Decor",
      rating: 4.9,
      reviews: 80,
      organizer: "John Doe",
      image: "/newimages/vendor/image3.jpeg",
      avatar: "/newimages/avatar.png",
     
    },
    {
      id: 4,
      title: "Kevjay Musical Band",
      category: "Photography",
      rating: 4.8,
      reviews: 120,
      organizer: "John Doe",
      image: "/newimages/vendor/image4.jpeg",
      avatar: "/newimages/avatar.png",
    },
    {
      id: 5,
      title: "Taste of Lagos",
      rating: 4.0,
      reviews: 55,
      organizer: "John Doe",
      image: "/newimages/vendor/image5.jpeg",
      avatar: "/newimages/avatar.png",
      category: "Catering",
    },
    {
      id: 6,
      title: "Elegant Designs by Sarah",
      rating: 4.7,
      reviews: 80,
      organizer: "John Doe",
      image: "/newimages/vendor/image5.jpeg",
      avatar: "/newimages/avatar.png",
      category: "Decor",
    },
  ],
};




 const blogPosts2: BlogPost2[] = [
  {
    id: 1,
    image: "/newimages/blog/1.jpeg",
    title: "Top 10 Wedding Venues in Lagos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Adeyemi U. Wili",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar1.png"
  },
  {
    id: 2,
    image: "/newimages/blog/2.jpeg",
    title: "Top 10 Wedding Proposal Venues in Lagos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Veronica D. White",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar2.png"
  },
  {
    id: 3,
    image: "/newimages/blog/3.jpeg",
    title: "5 Tips for Planning a Stress-Free Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jesse Peterson",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar3.png"
  },
  {
    id: 4,
    image: "/newimages/blog/1.jpeg",
    title: "Top 10 Wedding Venues in Lagos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Adeyemi U. Wili",
    readTime: "5min read", 
    avatar: "/newimages/blog/avatar1.png"
  },
  {
    id: 5,
    image: "/newimages/blog/2.jpeg",
    title: "Top 10 Wedding Proposal Venues in Lagos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Veronica D. White",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar2.png"
  },
  {
    id: 6,
    image: "/newimages/blog/3.jpeg",
    title: "5 Tips for Planning a Stress-Free Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jesse Peterson",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar2.png"
  },
  {
    id: 7,
    image: "/newimages/blog/1.jpeg",
    title: "Top 10 Wedding Venues in Lagos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Adeyemi U. Wili",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar1.png"
  },
  {
    id: 8,
    image: "/newimages/blog/2.jpeg",
    title: "Top 10 Wedding Proposal Venues in Lagos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Veronica D. White",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar2.png"
  },
  {
    id: 9,
    image: "/newimages/blog/3.jpeg",
    title: "5 Tips for Planning a Stress-Free Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jesse Peterson",
    readTime: "5min read",
    avatar: "/newimages/blog/avatar3.png"
  }
];export default blogPosts2;

