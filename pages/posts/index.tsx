import {useRouter} from "next/router";
import {useEffect, memo, useState, useCallback, useMemo} from "react";
import axios from "axios";
import debounce from "debounce";
import {useMutation} from "react-query";
import {BLOG_POSTS_LIMIT, POSTS_URL} from "constants/index";
import {Container, Input, Loader, Pagination, Select} from "components/ui";
import {BlogPostItem} from "components/local";
import {Response} from "pages/api/posts";
import type {Post, Category} from "types";

type PostsPageProps = unknown;

const PostsPage: React.FC<PostsPageProps> = memo(() => {
  const router = useRouter();
  const [params, setParams] = useState({
    limit: BLOG_POSTS_LIMIT,
    offset: 0,
    search: "",
    category: "ALL",
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(params.search);
  const [page, setPage] = useState(0);

  const selectOptions = useMemo(
    () => [
      {value: "ALL", label: "All categories"},
      ...categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ],
    [categories],
  );

  const getBlogMutation = useMutation(
    () =>
      axios.get<Response>(POSTS_URL, {
        params: {
          ...params,
        },
      }),
    {
      onSuccess: ({data}) => {
        setPosts(data.posts);
        setCategories(data.categories);
        setCount(data.count);
      },
      onError: () => {
        console.log("An error occured");
      },
    },
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  const getSearchResults = useCallback(
    debounce((input: string) => {
      setPage(0);
      setParams((prevParams) => {
        if (prevParams.search === input) {
          return prevParams;
        }
        return {...prevParams, offset: 0, search: input};
      });
    }, 800),
    [],
  );

  const onPageChange = useCallback(({selected}: {selected: number}) => {
    setPage(selected);
    setParams((params) => ({...params, offset: selected * BLOG_POSTS_LIMIT}));
  }, []);

  const onSelect = useCallback((value: string) => {
    setPage(0);
    setParams((params) => ({...params, offset: 0, category: value}));
  }, []);

  const onPostClick = useCallback((slug: string) => {
    router.push("/posts/" + slug);
  }, []);

  useEffect(() => {
    getSearchResults(input);
  }, [input]);

  useEffect(() => {
    getBlogMutation.mutate();
  }, [params]);

  return (
    <Container>
      <p className="text-[40px] font-bold text-center">From the blog</p>
      <p className="text-center text-gray-400 text-md w-50">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, nostrum{" "}
        <br />
        culpa suscipit voluptas mollitia enim accusantium aperiam quo?
      </p>
      <div className="flex my-5">
        <Select
          options={selectOptions}
          value={params.category}
          onChange={onSelect}
        />
        <Input
          value={input}
          onChange={onInputChange}
          placeholder="Search Posts"
        />
      </div>
      {getBlogMutation.isLoading && <Loader />}
      <div className="grid grid-cols-3 gap-5 my-5 place-items-center mb-10  ">
        {posts?.map((post) => (
          <BlogPostItem
            key={post.slug}
            post={post}
            categories={categories}
            onClick={onPostClick}
          />
        ))}
      </div>
      {!posts.length && !getBlogMutation.isLoading && (
        <p className="text-center text-gray-400 text-md w-50">no posts found</p>
      )}
      {Math.ceil((count || 0) / BLOG_POSTS_LIMIT) > 1 && (
        <Pagination
          onPageChange={onPageChange}
          page={page}
          limit={BLOG_POSTS_LIMIT}
          count={count}
        />
      )}
    </Container>
  );
});

export default PostsPage;
