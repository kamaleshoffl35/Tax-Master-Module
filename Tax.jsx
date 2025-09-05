import React, { useEffect, useState } from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import axios from 'axios';
const Tax = () => {
    const [taxes, setTaxes] = useState([])
    const [form, setForm] = useState({
        name: "",
        cgst_percent: "",
        sgst_percent: "",
        igst_percent: "",
        cess_percent: "",
        is_inclusive: false,
    })
    useEffect(()=>{
        axios.get("http://localhost:5000/api/taxes")
        .then(res=>setTaxes(res.data))
        .catch(err=>console.error(err))
    },[])
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target
        setForm({ ...form, [name]: type === "checkbox" ? checked : value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/api/taxes", form)
            setTaxes([...taxes, res.data])
            setForm({
                name: "",
                cgst_percent: "",
                sgst_percent: "",
                igst_percent: "",
                cess_percent: "",
                is_inclusive: false,
            })
            setForm(existingTax)
        }
        catch (err) {
            console.error(err.response?.data || err.message)
        }
    }

    return (
        <div className="container mt-4 bg-gradient-warning">
            <h2 className="mb-4"><span className="text-success"><MdOutlineAttachMoney /></span><b>TAX MASTER</b></h2>
            <form className="row g-3" onSubmit={handleSubmit}>

                <div className="col-md-6">
                    <label className="form-label">Tax Name</label>
                    <input type="text"
                        className="form-control bg-light"
                        name="name" value={form.name} onChange={handleChange}
                        placeholder='e.g,GST 18%' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">CGST %</label>
                    <input type="text"
                        className="form-control bg-light" name="cgst_percent" value={form.cgst_percent} onChange={handleChange}
                        placeholder='0.00' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">SGST %</label>
                    <input type="text"
                        className="form-control bg-light" name="sgst_percent" value={form.sgst_percent} onChange={handleChange}
                        placeholder='0.00' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">IGST %</label>
                    <input type="text" name="igst_percent" value={form.igst_percent} onChange={handleChange}
                        className="form-control bg-light"
                        placeholder='0.00' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">CESS % (Optional)</label>
                    <input type="text"
                        className="form-control bg-light" name="cess_percent" value={form.cess_percent} onChange={handleChange}
                        placeholder='0.00' />
                </div>
                <div className="col-md-6 form-check">
                    <input type="checkbox" className="form-check-input " name="is_inclusive" value={form.is_inclusive} onChange={handleChange} />
                    <label className="form-check-label">Inclusive Tax</label>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary"><span className="text-warning"><FaRegSave /></span>Save</button>
                    <button type="submit" className="btn btn-secondary"> <span ><FcCancel /></span>Cancel</button>
                </div>
            </form>


            <div className="card shadow-sm my-4">
                <div className="card-body">
                    <h5>Existing Tax Rates</h5>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th className="fw-bold">Tax Name/Value</th>
                                <th className="fw-bold">CGST</th>
                                <th className="fw-bold">SGST</th>
                                <th className="fw-bold">IGST</th>
                                <th className="fw-bold">CESS</th>
                                <th className="fw-bold">Inclusive Tax</th>
                                <th className="fw-bold">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {taxes.map((t) => {
                                <tr key={t._id}>
                                    <td>{t.name}</td>
                                    <td>{t.cgst_percent}</td>
                                    <td>{t.sgst_percent}</td>
                                    <td>{t.igst_percent}</td>
                                    <td>{t.cess_percent}</td>
                                    <td className={t.is_inclusive ? "text-success" : "text-danger"}>
                                        {t.status ? "Active" : "Inactive"}
                                    </td>
                                </tr>
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Tax