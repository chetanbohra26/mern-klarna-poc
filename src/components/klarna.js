import { useState } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Klarna = (props) => {
  const [frameData, setFrameData] = useState();

  const handleCreate = async () => {
    const cart = props.cart;
    if (!cart || cart?.length === 0) return;

    const res = await fetch(`${BASE_URL}/create-klarna-order`, {
      method: 'POST'
    });

    const result = await res.json();
    if (!res.ok) {
      console.log('Error:', res);
      return;
    }
    const snippet = result?.data?.html_snippet;
    setFrameData(snippet);
  }

  return <div>
    <h1>Klarna</h1>
    {
      frameData
        ? <iframe
          title="Klarna Checkout"
          width='100%'
          height='900px'
          srcDoc={
            frameData
          }
        >
        </iframe>
        : <button
          style={{ padding: 10 }}
          onClick={handleCreate}
        >
          Checkout
        </button>
    }

  </div>
}

export default Klarna;