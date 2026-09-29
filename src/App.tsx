import { useEffect, useState } from "react";
import PostList from "./components/Postlist.tsx";
import type { Post } from "./types/post";

// Alamat API
const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  // Menyimpan data posting dari API
  const [posts, setPosts] = useState<Post[]>([]);

  // Menandakan proses pengambilan data sedang berjalan
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Menyimpan pesan error jika request gagal
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const filteredPosts = posts.filter(function (post) {
  const keyword = search.toLowerCase();

  return (
    post.title.toLowerCase().includes(keyword) ||
    post.body.toLowerCase().includes(keyword)
    );
  });


  // Fungsi untuk mengambil data dari API
  async function fetchPosts(): Promise<void> {
    try {
      // Menampilkan status loading
      setIsLoading(true);

      // Menghapus error lama
      setError("");

      // Mengirim HTTP GET request
      const response: Response = await fetch(API_URL);

      // Memeriksa status response
      if (!response.ok) {
        throw new Error(
          `Request gagal dengan status ${response.status}`
        );
      }

      // Mengubah response JSON menjadi array Post
      const data: Post[] = await response.json();

      // Menyimpan data ke state
      setPosts(data);
    } catch (error: unknown) {
      // Memeriksa apakah error berupa object Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      // Selalu dijalankan setelah proses selesai,
      // baik berhasil maupun gagal
      setIsLoading(false);
    }
  }

  /*
    useEffect dijalankan setelah komponen pertama kali
    ditampilkan di browser.

    Array [] berarti efek ini hanya dijalankan sekali.
  */
  useEffect(function () {
    fetchPosts();
  }, []);

  return (
    <main className="container">
      <header className="page-header">
        <h1>Data Posting</h1>
        <p>Contoh React mengambil data dari API</p>
      </header>

      {/* Kondisi loading */}
      {isLoading && <p className="status">Memuat data...</p>}

      {/* Kondisi error */}
      {!isLoading && error !== "" && (
        <section className="error-box">
          <p>Gagal mengambil data: {error}</p>

          <button onClick={fetchPosts}>
            Coba Lagi
          </button>
        </section>
      )}

      {/* Kondisi berhasil */}
      {!isLoading && error === "" && (
        <>
          <input
              className="search-input"
              type="search"
              value={search}
              onChange={function (event) {
                setSearch(event.target.value);
              }}
              placeholder="Cari posting..."
            />
          <button onClick={fetchPosts}>
            Muat Ulang Data
          </button>

          <PostList posts={filteredPosts} />
        </>
      )}
    </main>
  );
}

export default App;
