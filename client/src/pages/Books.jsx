import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    console.log("🔄 Fetching books from API...");
    console.log("🌐 API URL:", import.meta.env.VITE_API_URL);
    console.log("🔗 Full endpoint:", `${import.meta.env.VITE_API_URL}/api/books?populate=*`);
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/books?populate=*`)
      .then((res) => {
        console.log("✅ API Response received:", res);
        console.log("📚 Books API Response data:", res.data);
        console.log("📚 Books data.data:", res.data.data);
        console.log("📊 Total Books Fetched:", res.data.data?.length || 0);
        
        // Log each book's category for debugging
        if (res.data.data && Array.isArray(res.data.data)) {
          res.data.data.forEach((book, index) => {
            console.log(`📖 Book ${index + 1}:`, {
              id: book.id,
              title: book.title,
              category: book.Category,
              categoryWithQuotes: `"${book.Category}"`,
              hasExtraSpaces: book.Category !== book.Category?.trim(),
              allKeys: Object.keys(book)
            });
          });
          setBooks(res.data.data);
        } else {
          console.warn("⚠️ Unexpected data structure:", res.data);
          setBooks([]);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch books:", err);
        console.error("❌ Error message:", err.message);
        console.error("❌ Error response:", err.response);
        console.error("❌ Error status:", err.response?.status);
        console.error("❌ Error data:", err.response?.data);
        
        // Try alternate endpoint if first fails
        console.log("🔄 Trying alternate endpoint: /api/book (singular)");
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/book?populate=*`)
          .then((res) => {
            console.log("✅ Alternate endpoint worked!");
            console.log("📚 Books from /api/book:", res.data);
            setBooks(res.data.data || []);
          })
          .catch((err2) => {
            console.error("❌ Both endpoints failed");
            console.error("Original error:", err.message);
            console.error("Alternate error:", err2.message);
          });
      });
  }, []);

  // ✅ Filter logic with trimming to handle whitespace issues
  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter((book) => {
          const bookCategory = (book.Category || '').trim();
          const selectedCategoryTrimmed = selectedCategory.trim();
          
          console.log(`🔍 Filtering - Book: "${book.title}"`);
          console.log(`   Book Category: "${bookCategory}"`);
          console.log(`   Selected Category: "${selectedCategoryTrimmed}"`);
          console.log(`   Match: ${bookCategory === selectedCategoryTrimmed}`);
          
          return bookCategory === selectedCategoryTrimmed;
        });

  // Log filtering results
  useEffect(() => {
    console.log(`📊 Filter Results:`);
    console.log(`   Total Books: ${books.length}`);
    console.log(`   Filtered Books: ${filteredBooks.length}`);
    console.log(`   Selected Category: "${selectedCategory}"`);
    console.log(`   Filtered Book Titles:`, filteredBooks.map(b => b.title));
  }, [selectedCategory, filteredBooks, books]);

  const handleCategoryClick = (category) => {
    console.log(`🖱️ Category clicked: "${category}"`);
    setSelectedCategory(category);
  };

  return (
    <div className="books-page">
      <h1 className="books-title">إصداراتنا المقروءة</h1>

      {/* ✅ Filter images */}
      <div className="book-filters">
        {/* Kids */}
        <div
          className={`filter-image-container ${
            selectedCategory === "كتب للأطفال" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("كتب للأطفال")}
        >
          <img
            src="/assets/books/bkids.svg"
            alt="كتب للأطفال"
            className="filter-image"
          />
          <p className="filter-label">إصدارات للأطفال</p>
        </div>

        {/* Adults */}
        <div
          className={`filter-image-container ${
            selectedCategory === "كتب للكبار" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("كتب للكبار")}
        >
          <img
            src="/assets/books/elderly.svg"
            alt="كتب للكبار"
            className="filter-image"
          />
          <p className="filter-label">إصدارات للكبار</p>
        </div>

        {/* Youth */}
        <div
          className={`filter-image-container ${
            selectedCategory === "كتب للشباب" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("كتب للشباب")}
        >
          <img
            src="/assets/books/byouth.svg"
            alt="كتب للشباب"
            className="filter-image"
          />
          <p className="filter-label">إصدارات للشباب</p>
        </div>
      </div>

      {/* "All Books" Button */}
      <div className="all-books-container">
        <button
          onClick={() => handleCategoryClick("all")}
          className={`filter-button ${selectedCategory === "all" ? "active" : ""}`}
        >
          جميع الكتب
        </button>
      </div>

      {/* Debug Info Panel (Remove after testing) */}
      <div style={{
        background: '#f3f4f6',
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>🔍 Debug Info:</strong>
        <div>Total Books: {books.length}</div>
        <div>Filtered Books: {filteredBooks.length}</div>
        <div>Selected Category: "{selectedCategory}"</div>
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Available Categories:</strong>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            {Array.from(new Set(books.map(b => b.Category?.trim()).filter(Boolean))).map((cat, i) => (
              <li key={i}>"{cat}"</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ✅ Books grid */}
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="books-card">
              {book.image?.url && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${book.image.url}`}
                  alt={book.title}
                  onError={(e) => {
                    console.error(`❌ Failed to load image for "${book.title}"`);
                    console.error(`   Image URL: ${import.meta.env.VITE_API_URL}${book.image.url}`);
                  }}
                />
              )}
              <div className="books-card-content">
                <h2 className="books-card-title">{book.title}</h2>

                {book.price && (
                  <p className="books-card-price">{book.price} د.ت</p>
                )}

                {book.Category && (
                  <p className="books-card-category">{book.Category}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-books">
            ❌ لا توجد كتب في هذه الفئة
            {selectedCategory !== "all" && (
              <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                الفئة المحددة: "{selectedCategory}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;