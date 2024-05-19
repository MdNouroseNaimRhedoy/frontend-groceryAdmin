import {useState} from 'react';
import ValidationError from '@/components/ValidationError';
import IconSpinner from '@/components/IconSpinner';
import {useProduct} from "@/hooks/useProduct.jsx";

function EditProductModal({product, onClose, onSave}) {
    const [editedProduct, setEditedProduct] = useState(product);
    const {updateProduct, errors} = useProduct();
    const [image, setImage] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', editedProduct.name ?? '');
        formData.append('price', editedProduct.price ?? '');
        formData.append('stock', editedProduct.stock ?? '');
        formData.append('description', editedProduct.description ?? '');
        formData.append('image', image ?? '');
        formData.append('_method', 'PUT');

        await updateProduct(event, editedProduct.id, formData).then(
            () => {
                onSave();
            }
        );
    }

    function handleCancelButton() {
        onClose();
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col mx-auto md:w-150 w-full">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Product Name</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={editedProduct.name ?? ''}
                                onChange={event => setEditedProduct({
                                    ...editedProduct,
                                    name: event.target.value,
                                })}
                                className="form-input"
                            />
                            <ValidationError errors={errors} field="name"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Price</label>
                            <input
                                id="description"
                                name="description"
                                type="number"
                                value={editedProduct.price ?? ''}
                                onChange={event => setEditedProduct({
                                    ...editedProduct,
                                    price: event.target.value,
                                })}
                                className="form-input"
                            />
                            <ValidationError errors={errors} field="price"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Stock</label>
                            <input
                                id="description"
                                name="description"
                                type="number"
                                value={editedProduct.stock ?? ''}
                                onChange={event => setEditedProduct({
                                    ...editedProduct,
                                    stock: event.target.value,
                                })}
                                className="form-input"
                            />
                            <ValidationError errors={errors} field="stock"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={editedProduct.description ?? ''}
                                onChange={event => setEditedProduct({
                                    ...editedProduct,
                                    description: event.target.value,
                                })}
                                className="form-input"
                            />
                            <ValidationError errors={errors} field="description"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="image">Product Image</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="form-input"
                            />
                            <ValidationError errors={errors} field="image"/>
                        </div>

                        <div className="border-t h-[1px] my-6"></div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancelButton}
                            >
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;
