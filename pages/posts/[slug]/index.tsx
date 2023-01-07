import {memo, useState} from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import Image from "next/image";
import axios from "axios";
import {POSTS_URL} from "constants/index";
import {Container, Loader} from "components/ui";
import {Response} from "pages/api/posts/[slug]";
import type {Post, Category} from "types";

type PostPageProps = unknown;

//this post component is for possibility of static exports for github pages deploy only

const PostPage: React.FC<PostPageProps> = memo(() => {
  const [post, setPost] = useState<Post>();
  const [categories, setCategories] = useState<Category[]>();

  const router = useRouter();
  const {slug} = router.query;

  const {isLoading} = useQuery(
    `post-` + slug,
    () =>
      axios.get<Response>(POSTS_URL + slug, {
        baseURL: "/",
      }),
    {
      onSuccess: ({data}) => {
        setPost(data.post);
        setCategories(data.categories);
      },
      onError: () => {
        router.push('/404')
        console.log("an error occured");
      },
    },
  );

  if (isLoading) {
    return <Loader />;
  }
  

  return (
    <Container>
      <div className="flex justify-between px-4 py-10 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
              {post?.title}
            </h1>
            <span className="text-sm text-blue-600">
              {post?.categories.reduce((acc, cat) => {
                acc += " " + categories?.find((c) => c.id === cat)?.name;
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
              src={post?.imageUrl ?? " "}
            />
          </div>

          <p className="py-5 lead">{post?.excerpt}</p>
        </article>
      </div>
    </Container>
  );
});

export default PostPage;
