import {memo} from "react";
import axios from "axios";
import {POSTS_URL} from "constants/index";
import {Container} from "components/ui";
import {Response} from "pages/api/posts/[slug]";
import type {Post, Category} from "types";
import {GetServerSideProps} from "next";
import Image from "next/image";

type PostPageProps = {
  post: Post;
  categories: Category[];
};

const PostPage: React.FC<PostPageProps> = memo(({post, categories}) => {
  return (
    <Container>
      <div className="flex justify-between px-4 py-10 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
              {post.title}
            </h1>
            <span className="text-sm text-blue-600">
              {post.categories.reduce((acc, cat) => {
                acc += " " + categories.find((c) => c.id === cat)?.name;
                return acc;
              }, "")}
            </span>
          </header>
          <div className="relative w-full h-[300px]">
            <Image
              className="my-0 mx-auto object-cover"
              loading="lazy"
              fill
              sizes="100vw"
              alt="image"
              src={post.imageUrl}
            />
          </div>

          <p className="py-5 lead">{post.excerpt}</p>
        </article>
      </div>
    </Container>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props: Partial<PostPageProps> = {
    post: undefined,
    categories: undefined,
  };

  const slug = ctx.query?.slug;

  if (!slug) {
    return {notFound: true};
  }

  try {
    const {data} = await axios.get<Response>(POSTS_URL + slug, {
      baseURL: process.env.BASE_URL,
    });

    props.post = data.post;
    props.categories = data.categories;
  } catch (error) {
    console.error(error);
    return {notFound: true};
  }

  return {props};
};

export default PostPage;
