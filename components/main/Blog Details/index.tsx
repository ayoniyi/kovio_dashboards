import Image from 'next/image';
import { FC } from 'react';

interface BlogDetailProps {
  publishDate: string;
  title: string;
  description: string;
  mainImage: string;
  quote: {
    text: string;
    author: {
      name: string;
      title: string;
      avatar: string;
    };
  };
  content: string;
  secondaryImage: string;
  conclusion: string;
}

const BlogDetails: FC<BlogDetailProps> = ({
  publishDate,
  title,
  description,
  mainImage,
  quote,
  content,
  secondaryImage,
  conclusion,
}) => {
  return (
    <article className="max-w-[1200px] mx-auto px-4 md:px-6">
      {/* Published Date */}
      <div className="text-center mb-4">
        <p className="text-blog-date text-gray-600">Published {publishDate}</p>
      </div>

      {/* Title */}
      <h1 className="text-blog-title-mobile md:text-blog-title text-center mb-4">
        {title}
      </h1>

      {/* Description */}
      <p className="text-blog-desc-mobile md:text-blog-desc text-center mb-8 max-w-[800px] mx-auto">
        {description}
      </p>

      {/* Main Image */}
      <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden mb-12">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-blog-intro-mobile md:text-blog-intro mb-6">
          Introduction
        </h2>
        <div className="text-blog-body-mobile md:text-blog-body space-y-6">
          {content}
        </div>
      </section>

      {/* Quote */}
      <blockquote className="border-l-4 border-kv-primary pl-6 mb-12">
        <p className="text-blog-quote mb-4">{quote.text}</p>
        <div className="flex items-center gap-4">
          <Image
            src={quote.author.avatar}
            alt={quote.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{quote.author.name}</p>
            <p className="text-gray-600">{quote.author.title}</p>
          </div>
        </div>
      </blockquote>

      {/* Secondary Image */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
        <Image
          src={secondaryImage}
          alt="Secondary image"
          fill
          className="object-cover"
        />
        <p className="absolute bottom-4 left-4 text-sm text-gray-500">
          This Image is provided by unsplash.com
        </p>
      </div>

      {/* How we do it */}
      <section className="mb-12">
        <h2 className="text-blog-intro-mobile md:text-blog-intro mb-6">
          How we do it
        </h2>
        <ul className="text-blog-body-mobile md:text-blog-body list-decimal pl-6 space-y-2">
          <li>Pellentesque habitant morbi tristique senectus.</li>
          <li>Neque laoreet suspendisse interdum consectetur libero id faucibus nisi.</li>
          <li>Eu turpis egestas pretium aenean pharetra.</li>
          <li>Mattis aliquam faucibus purus in massa tempor. Ultrices integer quis auctor elit.</li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="bg-orange-50 p-8 rounded-lg mb-12">
        <h2 className="text-blog-intro-mobile md:text-blog-intro mb-6 flex items-center gap-2">
          <span className="text-kv-primary">🎯</span>
          Conclusion
        </h2>
        <p className="text-blog-body-mobile md:text-blog-body">
          {conclusion}
        </p>
      </section>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/avatar.png"
          alt="Author"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">X_AE_A-13</p>
          <p className="text-gray-600">Product Designer, startUI</p>
        </div>
      </div>

      {/* Share Links */}
      <div className="flex items-center gap-4 border-t pt-6">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Copy Link
        </button>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Facebook</span>
            {/* Add Facebook Icon */}
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Twitter</span>
            {/* Add Twitter Icon */}
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">LinkedIn</span>
            {/* Add LinkedIn Icon */}
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogDetails; 