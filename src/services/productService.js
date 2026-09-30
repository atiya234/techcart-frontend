const API_URL = "http://localhost:5000/products";


export async function getProductById(id){
    const response = await fetch(`${API_URL}/${id}`);

    if(!response.ok){
        throw new Error("Failed to fetch product")
    }
    return response.json();

}

export async function getProducts(){
    const response = await fetch(API_URL);

    if (!response.ok){
        throw  new Error("Failed to fetch");

    }
    return response.json();
}