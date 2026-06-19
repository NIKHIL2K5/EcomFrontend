import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';

const ProductCard = ({ product, inverted = false }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const discount = product.compareAtPrice
        ? calculateDiscount(product.compareAtPrice, product.price)
        : 0;

    const handleMouseEnter = () => {
        if (product.images.length > 1) {
            setCurrentImage(1);
        }
    };

    const handleMouseLeave = () => {
        setCurrentImage(0);
    };

    return (
        <div className="group relative animate-fade-in">
            <Link to={`/product/${product.slug}`} className="block">
                {/* Image Container */}
                <div
                    className="relative aspect-product bg-neutral-100 rounded-lg overflow-hidden mb-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Product Image */}
                    <img
                        src={product.images[currentImage].url}
                        alt={product.images[currentImage].alt}
                        width={400}
                        height={533}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                    {product.badges && product.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.badges.map((badge) => (
                                <span
                                    key={badge}
                                    className={`badge ${badge === 'NEW'
                                            ? 'badge-new'
                                            : badge === 'SALE'
                                                ? 'badge-sale'
                                                : badge === 'LIMITED'
                                                    ? 'badge-limited'
                                                    : 'badge-bestseller'
                                        }`}
                                
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                            {discount}% OFF
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                        aria-label="Add to wishlist"
                    >
                        <Heart
                            size={18}
                            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-700'}
                        />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-end justify-center pb-4">
                        <button className="btn btn-sm btn-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Quick View
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    {/* Category */}
                    <p className={`text-xs uppercase tracking-wide ${inverted ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {product.category}
                    </p>

                    {/* Product Name */}
                    <h3 className={`font-medium line-clamp-2 transition-colors ${inverted ? 'text-white group-hover:text-neutral-200' : 'text-neutral-900 group-hover:text-neutral-600'}`}>
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${inverted ? 'text-white' : 'text-neutral-900'}`}>
                            {formatCurrency(product.price)}
                        </span>
                        {product.compareAtPrice && (
                            <span className={`text-sm line-through ${inverted ? 'text-neutral-300' : 'text-neutral-500'}`}>
                                {formatCurrency(product.compareAtPrice)}
                            </span>
                        )}
                    </div>

                    {/* Available Sizes */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                            {[...new Set(product.variants.map((v) => v.size))].slice(0, 5).map((size) => (
                                <span
                                    key={size}
                                    className={`text-xs px-2 py-1 border rounded ${inverted ? 'border-white/40 text-white' : 'border-neutral-300 text-neutral-600'}`}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
