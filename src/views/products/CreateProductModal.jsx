import {useState} from 'react';
import ValidationError from '@/components/ValidationError';
import IconSpinner from '@/components/IconSpinner';
import {useProduct} from "@/hooks/useProduct.jsx";

function CreateProductModal({onClose, onSave}) {
    const {product, createProduct} = useProduct()
    const [image, setImage] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', product.data.name ?? '');
        formData.append('price', product.data.price ?? '');
        formData.append('stock', product.data.stock ?? '');
        formData.append('description', product.data.description ?? '');
        formData.append('image', image ?? '');

        await createProduct(formData).then(
            () => {
                product.setData({})
                setImage(null)
            }
        );
    }


    function handleCancelButton() {
        onClose()
    }

    function handleImageChange(event) {
        setImage(event.target.files[0]);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                {product.success && (
                    <div className="alert alert-success">
                        {product.message}
                        <button className="cursor-pointer bg-red-500 text-white p-1 rounded-sm"
                                onClick={() => product.setSuccess(false)}>✕
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col mx-auto md:w-150 w-full">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Product Name</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={product.data.name ?? ''}
                                onChange={event => product.setData({
                                    ...product.data,
                                    name: event.target.value,
                                })}
                                className="form-input"
                                disabled={product.loading}
                            />
                            <ValidationError errors={product.errors} field="name"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Price</label>
                            <input
                                id="description"
                                name="description"
                                type="number"
                                value={product.data.price ?? ''}
                                onChange={event => product.setData({
                                    ...product.data,
                                    price: event.target.value,
                                })}
                                className="form-input"
                                disabled={product.loading}
                            />
                            <ValidationError errors={product.errors} field="price"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Stock</label>
                            <input
                                id="description"
                                name="description"
                                type="number"
                                value={product.data.stock ?? ''}
                                onChange={event => product.setData({
                                    ...product.data,
                                    stock: event.target.value,
                                })}
                                className="form-input"
                                disabled={product.loading}
                            />
                            <ValidationError errors={product.errors} field="stock"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={product.data.description ?? ''}
                                onChange={event => product.setData({
                                    ...product.data,
                                    description: event.target.value,
                                })}
                                className="form-input"
                                disabled={product.loading}
                            />
                            <ValidationError errors={product.errors} field="description"/>
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
                                disabled={product.loading}
                            />
                            <ValidationError errors={product.errors} field="description"/>
                        </div>

                        <div className="border-t h-[1px] my-6"></div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={product.loading}
                            >
                                {product.loading && <IconSpinner/>}
                                Save
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled={product.loading}
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

export default CreateProductModal;
