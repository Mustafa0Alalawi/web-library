<script>
  import { onMount } from "svelte";
  import Books from './BookList.svelte'; 

  let searchTerm = "";
  let books = [];
  let isLoading = false;
  let errorMessage = "";

  const fetchBooks = async () => {
    try {
      if (!searchTerm) return; 
      isLoading = true;
      errorMessage = "";

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      books = data.docs.map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        publishYear: book.first_publish_year || "N/A",
        ia: book.ia ? book.ia[Math.floor(Math.random() * book.ia.length)] : null,
        coverImage: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/150?text=No+Cover",
      }));
    } catch (error) {
      errorMessage = error.message || "Something went wrong.";
    } finally {
      isLoading = false;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchBooks(); 
    }
  };

  onMount(() => {
    fetchBooks();
  });
</script>

<div class="search-container">
  <label class="input input-bordered flex items-center gap-2">
    <input
      type="text"
      class="grow text-black p-2"
      placeholder="Search for books"
      bind:value={searchTerm}
      on:keydown={handleKeyDown} 
    />
    <button on:click={fetchBooks}>🔎</button>
  </label>

  {#if isLoading}
    <p>Loading...</p>
  {/if}

  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}


  <Books {books} />
</div>
