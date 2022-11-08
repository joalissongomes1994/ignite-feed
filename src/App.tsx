import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from "./App.module.css";
import "./global.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/joalissongomes1994.png",
      name: "Joalisson Gomes",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content: `Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
      no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀`,
      },
      { type: "link", content: "joalisson.design/doctorcare" },
    ],
    publishedAt: new Date("2022-11-05 15:00:39"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content: `Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
      no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀`,
      },
      { type: "link", content: "diego.design/doctorcare" },
    ],
    publishedAt: new Date("2022-05-03 20:00:00"),
  },
  {
    id: 3,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator @Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content: `Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
      no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀`,
      },
      { type: "link", content: "maykbrito.design/doctorcare" },
    ],
    publishedAt: new Date("2022-06-11 20:00:00"),
  },
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
