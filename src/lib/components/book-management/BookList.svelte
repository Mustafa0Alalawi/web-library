<script>
  export let books = [];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
  {#each books as book}
    <div class="card p-4 bg-gray-100 shadow rounded">
      <!-- Display book cover -->
      <img 
        src={book.coverImage} 
        alt={`Cover of ${book.title}`} 
        class="w-full h-48 object-cover rounded mb-4"
      />
      <!-- Book details -->
      <h2 class="text-lg font-bold truncate">{book.title}</h2>
      <p class="text-sm text-gray-700 truncate">by {book.author}</p>
      <p class="text-sm text-gray-500">Published: {book.publishYear}</p>
      {#if book.ia}
        <a 
          href={`https://archive.org/details/${book.ia}`} 
          target="_blank" 
          class="mt-4 inline-block text-white bg-gray-500 border rounded px-4 py-2 hover:bg-blue-500 hover:text-white transition"
        >
          READ
        </a>
      {/if}
    </div>
  {/each}
</div>
