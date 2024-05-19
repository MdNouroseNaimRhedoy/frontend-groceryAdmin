import {useEffect, useState} from 'react';
import {useProducts} from '@/hooks/useProducts.jsx';
import {useProduct} from '@/hooks/useProduct.jsx';
import CreateProductModal from "@/views/products/CreateProductModal.jsx";
import EditProductModal from "@/views/products/EditProductModal.jsx"; // Import the EditProductModal component

function ProductList() {
    const {products, getProducts} = useProducts();
    const {destroyProduct} = useProduct();
    const [isProductCreateModalOpen, setIsProductCreateModalOpen] = useState(false);
    const [isProductEditModalOpen, setIsProductEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleDelete = (product) => {
        destroyProduct(product);
        getProducts(); // refresh the product list after deletion
    };

    const handleAdd = () => {
        setIsProductCreateModalOpen(true);
    };

    const handleCreateModalClose = () => {
        setIsProductCreateModalOpen(false);
        getProducts();
    };

    const handleCreateModalSave = () => {
        getProducts()
        handleCreateModalClose();
    };

    const handleEdit = (product) => {
        setIsProductEditModalOpen(true);
        setCurrentProduct({...product});
    };

    const handleEditModalSave = () => {
        getProducts()
    }

    const dummyImage = "https://via.placeholder.com/300"; // placeholder image URL

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Product List</h3>
                    <button onClick={handleAdd}
                            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Add
                        Product
                    </button>
                </div>

                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id}
                             className="group bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div
                                className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <img src={product.image || dummyImage} alt={'Product Image'}
                                     className=" h-[200px] w-[300px] object-cover object-center group-hover:opacity-75"/>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-900">Edit
                                    </button>
                                    <button onClick={() => handleDelete(product)}
                                            className="text-red-600 hover:text-red-900">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isProductCreateModalOpen && (
                <CreateProductModal
                    onClose={handleCreateModalClose}
                    onSave={handleCreateModalSave}
                />
            )}

            {isProductEditModalOpen && (
                <EditProductModal
                    product={currentProduct}
                    onClose={() => setIsProductEditModalOpen(false)}
                    onSave={handleEditModalSave}
                />
            )}
        </div>
    );
}

export default ProductList;
