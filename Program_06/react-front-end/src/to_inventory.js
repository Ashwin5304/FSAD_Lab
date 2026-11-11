import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:8000";

function Display_Inventory({ inventory }) {
    return (
        <div>
            <h1>Inventory Management</h1>
            <table border="1">
                <th>ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                
                {inventory.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.prodname}</td>
                        <td>{item.qty}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

function InventoryApp() {
    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        const response = await axios.get(URL);
        setInventory(response.data);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div>
            <AddInventory onAdded={fetchInventory} />
            <Display_Inventory inventory={inventory} />
        </div>
    );
}

function AddInventory({ onAdded }) {
    const [form, setForm] = useState({
        id: "", prodname: "", qty: "", price: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const SubmitEvent = async (e) => {
        e.preventDefault();

        await axios.post(URL + "/add", {
            ...form,
            id: Number(form.id),
            qty: Number(form.qty),
            price: Number(form.price)
        });

        onAdded();
        setForm({ id: "", prodname: "", qty: "", price: "" });
    };

    return (
        <div>
            <h1>Add Inventory</h1>

            <form onSubmit={SubmitEvent}>
                <input name="id" placeholder="ID" value={form.id} onChange={handleChange} />
                <input name="prodname" placeholder="Product Name" value={form.prodname} onChange={handleChange} />
                <input name="qty" placeholder="Quantity" value={form.qty} onChange={handleChange} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default InventoryApp;