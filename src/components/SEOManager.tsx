import React, { useEffect } from 'react';
import { Product, CategoryType } from '../types';

interface SEOManagerProps {
  activeTab: string;
  selectedCategory: CategoryType;
  selectedProduct: Product | null;
  cartCount: number;
}

export const SEOManager: React.FC<SEOManagerProps> = ({
  activeTab,
  selectedCategory,
  selectedProduct,
}) => {
  useEffect(() => {
    // 1. Compute dynamic Title & Meta Description
    let title = 'The Lyallpur Store | Authentic Pure Desi Ghee Sweets & Heritage Mithai';
    let description =
      'Explore The Lyallpur Store: pure desi ghee Chana Barfi, Dhoda Barfi, Motichoor Laddu, handmade Gachak, Mathi, and royal gift boxes from Punjab since 1975.';
    let ogType = 'website';
    let ogImage = 'https://the-lyallpur-store.vercel.app/og-lyallpur-sweets.jpg';
    let canonicalUrl = window.location.origin + window.location.pathname;

    if (selectedProduct) {
      title = `${selectedProduct.name} (Pure Desi Ghee) | The Lyallpur Store`;
      description = `Order authentic ${selectedProduct.name} online from The Lyallpur Store. ${selectedProduct.description} Made fresh with 100% pure cow desi ghee. All-India express dispatch.`;
      ogType = 'product';
      ogImage = selectedProduct.image;
      canonicalUrl = `${window.location.origin}?product=${selectedProduct.id}`;
    } else if (activeTab === 'shop') {
      const categoryName =
        selectedCategory === 'all'
          ? 'All Specialities'
          : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      title = `Buy ${categoryName} Online | The Lyallpur Store Mithai & Savouries`;
      description = `Browse freshly made ${categoryName} crafted with 100% pure desi ghee, organic jaggery, and premium nuts. Delivered fresh across India.`;
      canonicalUrl = `${window.location.origin}?tab=shop&category=${selectedCategory}`;
    } else if (activeTab === 'gifting') {
      title = 'Luxury Festive & Wedding Gifting Hampers | The Lyallpur Store';
      description = 'Custom royal sweet boxes and bespoke gifting hampers with velvet touch finish, brass motifs, and premium assortment for weddings and corporate festivals.';
      canonicalUrl = `${window.location.origin}?tab=gifting`;
    } else if (activeTab === 'story') {
      title = 'Our Heritage Story Since 1975 | The Lyallpur Store';
      description = 'Discover five decades of culinary mastery, pure bilona desi ghee craftsmanship, and ancestral brass-kadhai recipes from Model Town, Ludhiana.';
      canonicalUrl = `${window.location.origin}?tab=story`;
    } else if (activeTab === 'stores') {
      title = 'Store Locations & Experience Outlets | The Lyallpur Store';
      description = 'Visit our flagship heritage sweet boutiques and live confectionery counters in Ludhiana, Punjab. Find store hours, directions, and contact details.';
      canonicalUrl = `${window.location.origin}?tab=stores`;
    }

    // 2. Update Document Title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace(/[\[\]"']/g, '').split('=');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // Standard meta tags
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[name="author"]', 'content', 'The Lyallpur Store');
    setMetaTag('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large');

    // OpenGraph meta tags (WhatsApp, Facebook, LinkedIn, iMessage previews)
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', ogType);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:site_name"]', 'content', 'The Lyallpur Store');
    setMetaTag('meta[property="og:image"]', 'content', ogImage);
    setMetaTag('meta[property="og:image:alt"]', 'content', title);
    setMetaTag('meta[property="og:locale"]', 'content', 'en_IN');

    // Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 3. Inject / Update Schema.org JSON-LD structured data
    let structuredData: any[] = [];

    // Organization & Store Schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'SweetShop',
      name: 'The Lyallpur Store',
      alternateName: 'Lyallpur Sweets',
      url: 'https://the-lyallpur-store.vercel.app/',
      logo: 'https://the-lyallpur-store.vercel.app/og-lyallpur-sweets.jpg',
      image: 'https://the-lyallpur-store.vercel.app/og-lyallpur-sweets.jpg',
      description: 'Legendary Indian confectionery and savouries made with 100% pure cow desi ghee since 1975.',
      priceRange: '₹₹',
      telephone: '+91 161 2404175',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Model Town Market, Near Gol Market',
        addressLocality: 'Ludhiana',
        addressRegion: 'Punjab',
        postalCode: '141002',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '30.8986',
        longitude: '75.8364',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:30',
        },
      ],
      sameAs: [
        'https://www.instagram.com/thelyallpurstore',
        'https://www.facebook.com/thelyallpurstore',
      ],
    });

    // WebSite Schema with Sitelinks Searchbox
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'The Lyallpur Store',
      url: 'https://the-lyallpur-store.vercel.app/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://the-lyallpur-store.vercel.app/?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });

    // Product & Offer Schema if product is selected
    if (selectedProduct) {
      // Breadcrumbs: Home > Category > Product
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://the-lyallpur-store.vercel.app/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: selectedProduct.category.toUpperCase(),
            item: `https://the-lyallpur-store.vercel.app/?tab=shop&category=${selectedProduct.category}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: selectedProduct.name,
            item: `https://the-lyallpur-store.vercel.app/?product=${selectedProduct.id}`,
          },
        ],
      });

      // Product Schema
      const offers = selectedProduct.weights.map((w) => ({
        '@type': 'Offer',
        price: w.price,
        priceCurrency: 'INR',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        url: `https://the-lyallpur-store.vercel.app/?product=${selectedProduct.id}`,
        name: `${selectedProduct.name} - ${w.weight}`,
        priceValidUntil: '2027-12-31',
        seller: {
          '@type': 'Organization',
          name: 'The Lyallpur Store',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: 0,
            currency: 'INR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'IN',
          },
        },
      }));

      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: selectedProduct.name,
        image: [selectedProduct.image],
        description: selectedProduct.description,
        sku: `LYALLPUR-${selectedProduct.id.toUpperCase()}`,
        mpn: selectedProduct.id,
        brand: {
          '@type': 'Brand',
          name: 'The Lyallpur Store',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: selectedProduct.rating,
          reviewCount: selectedProduct.reviewsCount,
          bestRating: '5',
          worstRating: '1',
        },
        offers: offers.length === 1 ? offers[0] : offers,
      });
    }

    // Remove existing dynamic script
    const existingScript = document.getElementById('json-ld-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject fresh script tag
    const script = document.createElement('script');
    script.id = 'json-ld-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // clean up on unmount if needed
    };
  }, [activeTab, selectedCategory, selectedProduct]);

  return null;
};
