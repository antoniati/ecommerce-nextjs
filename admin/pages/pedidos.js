import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Pedidos() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("/api/orders").then(response => {
            setOrders(response.data);
        })
    }, [])
    return (
        <Layout>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Remetente</th>
                        <th>Produtos</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 && orders.map(order => (
                        <tr>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td>
                                {order.name} {order.email}<br />
                                {order.street} {order.cep}<br />
                                {order.city} <br />
                                {order.phone}
                            </td>
                            <td>{order.line_items.map( 
                                line => (
                                    <>
                                    {line.price_data?.product_data.name}<br/>
                                    Quantidade: {line.quantity}<br/>
                                    </>
                                )
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}