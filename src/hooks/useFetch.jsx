import { useState, useEffect } from "react";

const useFetch = (filterParams, page, limit) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const baseURL = "https://openlibrary.org/search.json";
  const fields = "key,title,author_name,first_publish_year,editions";

  useEffect(() => {
    const fetchData = async () => {
      const query = `q=${filterParams.title || ""} ${
        filterParams.author || ""
      }`.trim();
      const url = `${baseURL}?${
        query && `q=${query}&`
      }fields=${fields}&limit=${limit}&page=${page}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        setData(result.docs);
        setTotalPages(Math.ceil(result.numFound / limit));
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setData([]);
        setTotalPages(1);
        setError(err.message);
      }
    };

    fetchData();
  }, [filterParams, page, limit]);

  return { data, totalPages, error };
};

export default useFetch;
