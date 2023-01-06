import type {NextApiRequest, NextApiResponse} from "next";
import type {Category, Post} from "types";
import blog from "../../mocks/_blog.json";

type Params = {
  slug: string;
};

export type Response = {
  post: Post;
  categories: Category[];
};

const mockApiRequest = ({slug = ""}: Params): Response => {
  const post: Post = blog.posts.filter((post) => post.slug === slug)[0];

  return {
    post,
    categories: [...blog.categories],
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const {slug}: Partial<Params> = req.query;
  if(slug) {
    const response = mockApiRequest({slug});
    res.status(200).json(response);
  }
}
