import React, { useRef, useState } from 'react';
import Data from './Data.json';
import './App.css';

function App() {
    const [data, setData] = useState(Data);
    const [update, setUpdate] = useState(-1);

    function handleDelete(index) {
        const newList = data.filter((item, i) => i !== index);
        setData(newList);
    }

    function handleEdit(index) {
        setUpdate(index);
    }

    return (
        <div className='crud'>
            <div>
                <AddList setData={setData} />
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>EMAIL</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((current, index) => (
                            update === index ? <Edit key={index} current={current} data={data} setData={setData} setUpdate={setUpdate} update={update} /> :  
                            <tr key={index}>
                                <td>{current.name}</td>
                                <td>{current.price}</td>
                                <td>{current.email}</td>
                                <td>
                                    <button className='edit' onClick={() => handleEdit(index)}>EDIT</button>
                                    <button className='delete' onClick={() => handleDelete(index)}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Edit({ current, data, setData, setUpdate,update }) {
    const [formData, setFormData] = useState(current);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleUpdate() {
        const newData = data.map((item, i) => (i === update ? formData : item));
        setData(newData);
        setUpdate(-1);
    }

    return (
        <tr>
            <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
            <td><input type="text" name="price" value={formData.price} onChange={handleChange} /></td>
            <td><input type="text" name="email" value={formData.email} onChange={handleChange} /></td>
            <td><button onClick={handleUpdate}>Update</button></td>
        </tr>
    );
}

function AddList({ setData }) {
    const nameRef = useRef();
    const priceRef = useRef();
    const emailRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const price = e.target.elements.price.value;
        const email = e.target.elements.email.value;
        const newElement = {
            name,
            price,
            email,
        };
        setData(prevData => prevData.concat(newElement));
        nameRef.current.value = "";
        priceRef.current.value = "";
        emailRef.current.value = "";
    }

    return (
        <form className='addform' onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='name' ref={nameRef} />
            <input type='text' name='price' placeholder='price' ref={priceRef} />
            <input type='text' name='email' placeholder='email' ref={emailRef} />
            <button type='submit'>ADD</button>
        </form>
    );
}

export default App;
