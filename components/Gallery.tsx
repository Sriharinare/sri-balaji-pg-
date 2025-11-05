
import React from 'react';

const images = [
    'https://picsum.photos/seed/gallery1/800/600',
    'https://picsum.photos/seed/gallery2/800/600',
    'https://picsum.photos/seed/gallery3/800/600',
    'https://picsum.photos/seed/gallery4/800/600',
    'https://picsum.photos/seed/gallery5/800/600',
    'https://picsum.photos/seed/gallery6/800/600',
];

const Gallery: React.FC = () => {
    return (
        <section id="gallery" className="py-20 bg-brand-gray">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Gallery</h2>
                    <p className="mt-4 text-lg text-gray-400">A glimpse into the HostelHopper experience.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                            <img 
                                src={src} 
                                alt={`Gallery image ${index + 1}`} 
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
