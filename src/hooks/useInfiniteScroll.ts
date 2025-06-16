
import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({ 
  hasMore, 
  onLoadMore, 
  threshold = 200 
}: UseInfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only enable infinite scroll on mobile
    if (!isMobile || !hasMore) return;

    const handleScroll = () => {
      if (isLoading) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        setIsLoading(true);
        onLoadMore();
        // Reset loading state after a short delay
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, onLoadMore, threshold, isMobile, isLoading]);

  return { isLoading };
};
