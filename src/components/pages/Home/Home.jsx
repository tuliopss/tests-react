import { Component, useCallback, useEffect, useState } from "react";
import "./Home.css";
import { loadPosts } from "../../../utils/load-photos";
import Button from "../../Button/Button";
import Posts from "../../Posts/Posts";
import TextInput from "../../TextInput/TextInput";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  // async componentDidMount() {
  //   await this.loadPosts();
  // }

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className='container'>
      <div className='search-container'>
        {searchValue && (
          <>
            <h1>Buscando por: {searchValue}</h1>
          </>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} />
      ) : (
        <h2>Não existem posts com o título {searchValue}</h2>
      )}

      <div className='button-container'>
        {!searchValue && (
          <Button
            handleClick={loadMorePosts}
            text='Clique aqui'
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
