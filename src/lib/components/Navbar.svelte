<script>
  import Search from "./book-management/Search.svelte";
  import { fetchRandomBooks } from "$lib/http-actions/randomBooks-api";

  let books = [];
  let errorMessage = "";
  let isLoading = false; 

  const handleFetchRandomBooks = async (event) => {
    event.preventDefault(); 
    isLoading = true; 
    errorMessage = ""; 
    try {
      books = await fetchRandomBooks(); 
    } catch (error) {
      errorMessage = "Failed to fetch books"; 
    } finally {
      isLoading = false; 
    }
  };
</script>

<header class="navbar bg-gray-800 drop-shadow">
  <div class="flex justify-between w-full px-9">
    <a
      href="https://archive.org/"
      class="text-l text-white ml-auto"
      target="_blank"
      rel="noopener noreferrer"
    >
      INTERNET ARCHIVE
    </a>
  </div>
  <nav class="flex-none">
    <ul class="menu menu-horizontal bg-gray-200 px-1 flex gap-4 py-4">
      <li class="flex items-center">
        <a
          href="/"
          on:click={(event) => {
            event.preventDefault();
            window.location.href = "/";
          }}>Home</a
        >
      </li>
      <li class="flex items-center">
        <a
          href="#"
          on:click={(event) => {
            event.preventDefault(); 
            handleFetchRandomBooks(event); 
          }}
        >
          Books
        </a>
      </li>

      <li class="flex items-center"><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>
<Search />

<div
  class="book-results grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
>
  {#if isLoading}
    <p class="text-gray-800 text-lg">Loading...</p>
  {:else if books.length > 0}
    {#each books as book}
      <div class="card p-4 bg-gray-100 shadow rounded">
        <h2 class="text-lg font-bold truncate">{book.title}</h2>
        <p class="text-sm text-gray-700 truncate">by {book.author}</p>
        <p class="text-sm text-gray-500">Published: {book.publishYear}</p>
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          class="w-full h-48 object-cover rounded mt-4"
        />
      </div>
    {/each}
  {:else if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}
</div>
