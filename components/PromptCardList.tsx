import { CSSTransition, TransitionGroup } from "react-transition-group";
import PromptCard from "./PromptCard";
import { Post } from "@app/types";

interface PromptCardListProps {
    data: Post[];
    handleTagClick: (tagName: string) => void;
  }
  
  const PromptCardList: React.FC<PromptCardListProps> = ({
    data,
    handleTagClick,
  }) => {
    return (
      <div className="mt-8 sm:columns-2 sm:gap-6 xl:columns-3 ">
        <TransitionGroup>
          {data.map((post, index) => (
            <CSSTransition key={`${post.creator._id}-${index}`} timeout={400} classNames="fade">
              <div className="mb-6">
                <PromptCard
                  post={post}
                  handleTagClick={handleTagClick}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  };

  export default PromptCardList;