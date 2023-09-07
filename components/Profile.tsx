import React from "react";
import PromptCard from "./PromptCard";
import { Post } from "@app/types";


interface ProfileProps {
  name: string;
  desc: string;
  data: Post[];
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

const Profile: React.FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="purple_gradient_light">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-2 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post.creator._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
