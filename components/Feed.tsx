"use client"

import React, { useState, useEffect } from "react";
import Search from "./Search";
import { Post } from "@app/types";
import filterPrompts from "@utils/searchUtility";
import PromptCardList from "./PromptCardList";


const Feed: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // Search States
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data: Post[] = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchText(e.target.value);

    // Debounce Method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value, allPosts);
        setSearchedResults(searchResult);
      }, 400)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName, allPosts);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <Search
          searchText={searchText}
          handleSearchChange={handleSearchChange}
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
