import { useMemo } from 'react';
import { sortProducts } from '../utils/sortProducts';

export const useSortedProducts = (products, favorites, sortType) => {
    const sortedProducts = useMemo(() => {
        const favoriteProducts = products.filter((product) =>
            favorites.includes(product._id)
        );
        const otherProducts = products.filter(
            (product) => !favorites.includes(product._id)
        );

        return [
            ...sortProducts(favoriteProducts, sortType), 
            ...sortProducts(otherProducts, sortType)
        ];
    }, [products, favorites, sortType]);

    return sortedProducts;
};
