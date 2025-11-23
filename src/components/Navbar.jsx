import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Catálogo', href: '#catalogo' },
        { name: 'Nosotros', href: '#nosotros' },
        { name: 'FAQ', href: '#faq' },
    ];

    // Dynamic classes based on scroll state
    const navBackgroundClass = isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4';
    const textColorClass = isScrolled ? 'text-primary' : 'text-white';
    const linkHoverClass = isScrolled ? 'hover:text-primary-light' : 'hover:text-secondary';
    const iconColorClass = isScrolled ? 'text-primary' : 'text-white';

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackgroundClass}`}
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    {/* Placeholder for Logo Image if available later */}
                    {/* <img src="/path/to/logo.png" alt="Florería Liz" className="h-10 w-auto" /> */}
                    <div className="flex flex-col">
                        <span className={`font-serif text-2xl font-bold tracking-wide transition-colors duration-300 ${textColorClass}`}>
                            Florería Liz
                        </span>
                        <span className={`text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 ${textColorClass}`}>Artesanía Floral</span>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`font-medium transition-colors text-sm tracking-wide ${textColorClass} ${linkHoverClass}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://wa.me/5491172383806" // Replace with actual number
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hidden md:flex items-center gap-2 transition-colors text-sm font-medium ${textColorClass} ${linkHoverClass}`}
                    >
                        <Phone size={18} />
                        <span>¿Dudas?</span>
                    </a>

                    <button
                        onClick={toggleCart}
                        className={`relative p-2 rounded-full transition-colors hover:bg-white/10 ${iconColorClass}`}
                        aria-label="Abrir carrito"
                    >
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-fade-in-up">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 transition-colors ${iconColorClass}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4 border-t border-gray-100">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-dark hover:text-primary font-medium py-2 border-b border-gray-50 last:border-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="https://wa.me/5491172383806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary font-medium py-2"
                    >
                        <Phone size={18} />
                        <span>Contactar por WhatsApp</span>
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
