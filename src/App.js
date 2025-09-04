import React, { useState } from "react";
import "./App.css"

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchBooks(e) {
    e && e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a book title before searching.");
      return;
    }
    setLoading(true);
    setError(null);
    setBooks([]);
    console.log(loading)

    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encoded}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log("resoponse",res)
      const data = await res.json();
      console.log("data",data)
      const results = (data.docs || []).map((doc) => ({
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name && doc.author_name.join(", "),
        first_publish_year: doc.first_publish_year,
        cover_i: doc.cover_i,
        edition_count: doc.edition_count,
      }));
      if(results.length===0){
        alert("No books found. Please try another title.")
      }
      setBooks(results.slice(0, 40));
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function coverUrl(cover_i) {
    return cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
      : null;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>&#128218;Find Your <span>Book</span> Of Choice.</h1><br></br>

        <q>Books are uniquely portable magic</q>
      </header>

      <main>
        <form className="search-form" onSubmit={searchBooks}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter book title..."
            aria-label="Search books by title"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && <p className="status">Loading…</p>}
        {error && <p className="status error">Error: {error}</p>}

        <section className="results">
          {books.length === 0 && !loading && !error && (
            <p className="hint">Try searching for a title above.</p>
          )}

          <ul className="book-list">
            {books.map((b) => (
              <li className="book-card" key={b.key}>
                <div className="cover">
                  {b.cover_i ? (
                    <img src={coverUrl(b.cover_i)} alt={`${b.title} cover`} />
                  ) : (
                    <div className="no-cover">No cover</div>
                  )}
                </div>
                <div className="meta">
                  <h2 className="title">{b.title}</h2>
                  <p className="author">{b.author_name || "Unknown author"}</p>
                  <p className="year">
                    First published: {b.first_publish_year || "—"}
                  </p>
                  <p className="editions">
                    Editions: {b.edition_count || 0}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

    </div>
  );
}
