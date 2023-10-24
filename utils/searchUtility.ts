import { Post } from "@app/types";

const filterPrompts = (searchText: string, allPosts: Post[]): Post[] => {
  const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
  return allPosts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
};

export default filterPrompts;
