import { useState, useEffect } from "react";

const API_URL = "https://openlibrary.org/api/books";

const useFetch = (filterParams, page, limit) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { title, author } = filterParams;
      const query = `q=${title} ${author}`.trim();
      const fields = "key,title,author_name,first_publish_year,editions";
      const url = `${API_URL}?${
        query ? `q=${query}&` : ""
      }fields=${fields}&limit=${limit}&page=${page}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result.docs);
        setTotalPages(Math.ceil(result.numFound / limit));
        setError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
        setTotalPages(1);
        setError(error.message);
      }
    };

    fetchData();
  }, [filterParams, page, limit]);

  return { data, totalPages, error };
};

export default useFetch;
