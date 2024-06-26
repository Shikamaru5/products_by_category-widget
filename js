window.initProductsByCategory = function(categorySlug) {
    const postsPerPage = 6;
    
    // Use the site's root URL
    const siteUrl = 'your website url';
    
    // Construct the API URL
    let apiUrl = `${siteUrl}/wp-json/wc/v3/products?per_page=${postsPerPage}`;
    
    // Only add the category parameter if a slug is provided
    if (categorySlug && categorySlug.trim() !== '') {
        apiUrl += `&category=${categorySlug}`;
    }
    
    console.log('API URL:', apiUrl); // For debugging
    
    jQuery.ajax({
        url: apiUrl,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa('rest api consumer key:rest api consumer secret'));
        },
        success: function(products) {
            console.log('Products received:', products); // For debugging
            let productsHtml = '';
            products.forEach(product => {
                productsHtml += `
                    <a href="${product.permalink}" class="product-item">
                        <img src="${product.images[0].src}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p class="price">${product.price_html}</p>
                    </a>
                `;
            });
            jQuery('#products-container').html(productsHtml);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching products:', textStatus, errorThrown);
            console.log('Response:', jqXHR.responseText);
            jQuery('#products-container').html('<p>Error loading products. Please try again later.</p>');
        }
    });
};

jQuery(document).ready(function($) {
    var categorySlug = '{{category_slug}}'; // This will be dynamically replaced by Elementor
    console.log('Category Slug:', categorySlug); // For debugging
    window.initProductsByCategory(categorySlug);
});
