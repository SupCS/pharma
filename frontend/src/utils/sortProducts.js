export const sortProducts = (products, sortType) => {
    return products.sort((a, b) => {
        switch (sortType) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'cheapest':
                return a.price - b.price;
            case 'mostExpensive':
                return b.price - a.price;
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });
};
