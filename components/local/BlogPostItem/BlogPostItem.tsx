import Image from "next/image";
import React, {memo} from "react";
import type {Post, Category} from "types";

type BlogPostItemProps = {
  post: Post;
  categories: Category[];
  onClick: (slug: string) => void;
};

export const BlogPostItem: React.FC<BlogPostItemProps> = memo(
  ({post, categories, onClick}) => {
    return (
      <div
        key={post.slug}
        onClick={() => onClick(post.slug)}
        className="box-border group flex-grow m-auto cursor-pointer hover:translate-y-[-10px] ease-in duration-100"
      >
        <div className="flex flex-col justify-between w-320 max-w-[320px] h-[450px] max-h-[450px] shadow-lg box-border rounded-[5px]">
          <div className="relative h-[250px] max-h-[250px] w-full overflow-hidden rounded-t-[5px]">
            <Image
              fill
              sizes="100vw"
              className="object-cover"
              src={post.imageUrl}
              alt="post-image"
            />
          </div>
          <div className="bg-white rounded-b p-4 flex flex-col justify-between leading-normal h-full mb-auto">
            <div className="mb-8">
              <p className="text-sm text-blue-600">
                {post.categories.reduce((acc, cat) => {
                  acc += " " + categories.find((c) => c.id === cat)?.name;
                  return acc;
                }, "")}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {post.title}
              </div>
              <p className="text-gray-700 text-base">{post.excerpt}</p>
            </div>
            <div className="flex items-center">
              <Image
                sizes="100vw"
                width={50}
                height={50}
                loading="lazy"
                className="mr-4 w-10 h-10 rounded-full"
                src={`https://picsum.photos/50?random&t=${post.id}`}
                alt="post-avatar"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none font-bold">John Doe</p>
                <p className="text-gray-600">Aug 18, 2020 • 4 min read</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
