import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { Comment } from "./Comment";

import { Avatar } from "./Avatar";

import styles from "./Post.module.css";

interface Author {
  avatarUrl: string,
  name: string, 
  role: string
}

interface Content {
  type: "paragraph" | "link",
  content: string
}

interface PostProps {
  author: Author,
  content: Content[],
  publishedAt: Date
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const commentWithoutDeleteOne = comments.filter(
      (comment) => commentToDelete !== comment
    );
    setComments(commentWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => (
          <React.Fragment key={item.content}>
            {item.type === "paragraph" ? 
            (
              <p>{item.content}</p>
            ):(
              <p>
                <a href="#">{item.content}</a>
              </p>
            )}
          </React.Fragment>
        ))}

        <p>
          <a href="#">#novoprojeto</a> <a href="#">#nlw</a>{" "}
          <a href="#">#rocketseat</a>
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          placeholder="Deixe seu comentário"
          required
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.length > 0 &&
          comments
            .map((comment) => (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={deleteComment}
              />
            ))
            .reverse()}
      </div>
    </article>
  );
}
