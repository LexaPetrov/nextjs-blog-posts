import type {NextApiRequest, NextApiResponse} from "next";
import type {Blog, Post} from "types";
import {BLOG_POSTS_LIMIT} from "constants/index";
import blog from "../mocks/_blog.json";

type Params = {
  limit?: number;
  offset?: number;
  search?: string;
  category?: "ALL" | number;
};

export type Response = Blog & {count: number};

const mockApiRequest = ({
  limit = BLOG_POSTS_LIMIT,
  offset = 0,
  search = "",
  category = "ALL",
}: Params): Response => {
  let filteredData: Post[] = blog.posts;

  if (search) {
    filteredData = filteredData.filter((item) => {
      return item.title.toLowerCase().includes(search.trim().toLowerCase());
    });
  }

  if (category !== "ALL") {
    filteredData = filteredData.filter((item) => {
      return item.categories.some((c) => c === +category);
    });
  }

  const startIndex = offset || 0;
  const endIndex = limit ? +startIndex + +limit : filteredData.length;
  const count = filteredData.length;

  filteredData = filteredData.slice(startIndex, endIndex);

  return {
    count,
    posts: filteredData,
    categories: [...blog.categories],
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const {limit, offset, search, category}: Partial<Params> = req.query;
  const response = mockApiRequest({limit, offset, search, category});
  res.status(200).json(response);
}
