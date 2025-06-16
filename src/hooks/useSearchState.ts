
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchState = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>('nome-asc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [storeFilter, setStoreFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const query = searchParams.get("q") || "";

  // Reset filters and pagination when search query changes
  useEffect(() => {
    setBrandFilter([]);
    setStoreFilter([]);
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
    setAllProducts([]);
  }, [query]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setAllProducts([]);
  }, [brandFilter, storeFilter, priceRange, sortBy]);

  return {
    searchParams,
    sortBy,
    setSortBy,
    displayMode,
    setDisplayMode,
    currentPage,
    setCurrentPage,
    brandFilter,
    setBrandFilter,
    storeFilter,
    setStoreFilter,
    priceRange,
    setPriceRange,
    allProducts,
    setAllProducts,
    isLoadingMore,
    setIsLoadingMore,
    query
  };
};
