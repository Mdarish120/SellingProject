// Define the API URL
const apiUrl = 'https://crudcrud.com/api/0017b9fcd5824c94af17d9ae75bdef10/Products';

// Function to fetch and display products
function fetchProducts() {
    axios.get(apiUrl)
        .then((response) => {
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; // Clear previous data

            response.data.forEach((product, index) => {
                const productItem = document.createElement('div');
                productItem.classList.add('alert', 'alert-primary', 'mt-2');
                productItem.innerHTML = `
                     <h2>Products</h2>
                    <p><strong>Product Name:</strong> ${product.productName}</p>
                    <p><strong>Selling Price:</strong> Rs.${product.sellingPrice}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <button class="btn btn-danger delete-button" data-id="${product._id}">Delete</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
}

// Initial data fetch and display
fetchProducts();

// Function to add a product
document.getElementById('addProduct').addEventListener('click', () => {
    const sellingPrice = document.getElementById('sellingPrice').value;
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;

    // Validate input fields
    if (!sellingPrice || !productName) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new product object
    const newProduct = {
        sellingPrice: parseFloat(sellingPrice),
        productName,
        category,
    };

    // Send data to the API to add a new product
    axios.post(apiUrl, newProduct)
        .then(() => {
            // Clear input fields

            document.getElementById('sellingPrice').value = '';
            document.getElementById('productName').value = '';
            // Fetch and display updated products

            console.log("checkinggg")
            fetchProducts();
        })
        .catch((error) => {
            console.error('Error adding product:', error);
        });
});

// Event delegation for delete buttons
document.getElementById('productList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        const dataId = e.target.getAttribute('data-id');
        const deleteUrl = `${apiUrl}/${dataId}`; // Construct the delete URL

        // Send a DELETE request to remove the product
        axios.delete(deleteUrl)
            .then(() => {
                // Fetch and display updated products after deletion
                fetchProducts();
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    }
});
