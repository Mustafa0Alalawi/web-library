export async function fetchRandomBooks() {
    const randomKeywords = [
      "science",
      "fiction",
      "mystery",
      "history",
      "adventure",
      "romance",
    ];
    const randomKeyword =
      randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
  
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          randomKeyword
        )}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch random books");
      }
  
      const data = await response.json();
      return data.docs.map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        publishYear: book.first_publish_year || "N/A",
        ia: book.ia ? book.ia[Math.floor(Math.random() * book.ia.length)] : null,
        coverImage: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150?text=No+Cover",
      }));
    } catch (error) {
      console.error("Error fetching random books:", error);
      throw error;
    }
  }
  