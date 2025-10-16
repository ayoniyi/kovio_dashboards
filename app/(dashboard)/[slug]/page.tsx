// /** @format */

// import BlogDetails from "@/components/main/Blog Details";

// export default function BlogPage() {
//   return (
//     <main className="py-12">
//       <BlogDetails
//         publishDate="Jan 23, 2024"
//         title="UX In The Age Of AI/ML"
//         description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
//         mainImage="/images/blog/japan-temple.jpg"
//         content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra aliquet. Sit amet tellus cras adipiscing enim eu. Nec feugiat nisi pretium fusce id velit ut tortor pretium. Lectus proin nibh nisi condimentum id venenatis.

//         Tellus rutrum tellus pellentesque eu. Purus viverra accumsan in nisi. Posuere sollicitudin aliquam ultrices sagittis orci a. Aliquam faucibus purus in massa tempor nec feugiat. Arcu ac tortor dignissim convallis aenean et. Amet mauris commodo quis imperdiet. Duis ut diam quam nulla porttitor massa id. Adipiscing elit pellentesque habitant morbi. Quam vulputate dignissim suspendisse in est ante. Iaculis urna id volutpat lacus laoreet. Pharetra vel turpis nunc eget. Augue mauris augue neque gravida in fermentum et sollicitudin."
//         quote={{
//           text: "Sit amet aliquam id diam maecenas ultricies mi eget mauris. Lacus vestibulum sed arcu non. Ullamcorper malesuada proin libero nunc.",
//           author: {
//             name: "Azunyan U. Wu",
//             title: "CEO, nextHumanity.ai",
//             avatar: "/images/avatars/azunyan.jpg",
//           },
//         }}
//         secondaryImage="/images/blog/modern-building.jpg"
//         conclusion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra aliquet. Sit amet tellus cras adipiscing enim eu. Nec feugiat nisi pretium fusce id velit ut tortor pretium. Lectus proin nibh nisi condimentum id venenatis."
//       />
//     </main>
//   );
// // }
// pages/[slug].js

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SlugPage() {
  const router = useRouter();

  return (
    <div className="text-xl font-kv-semi-black font-gabaritoHeading m-auto text-center h-screen flex flex-col justify-center items-center">
      <p className="">The page doesn't exist</p>
      <button
        className="text-sm rounded-full border py-2 px-4 bg-kv-primary text-white mt-3"
        onClick={() => router.push("/")}
      >
        Go Home
      </button>
    </div>
  );
}
