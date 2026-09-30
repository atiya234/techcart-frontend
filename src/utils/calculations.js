export const DISCOUNT_THRESHOLD = 1000
export const DISCOUNT_PERCENTAGE = 10;
export const FREE_DELIVERY_THRESHOLD = 500;
export const DELIVERY_FEE = 40;

export const calculationTotals = (subtotal) => {

    const discount = subtotal >= DISCOUNT_THRESHOLD ? (subtotal * DISCOUNT_PERCENTAGE) / 100 : 0;
    const after_discount = subtotal - discount;

    const delivery = after_discount === 0 || after_discount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

    const total = after_discount + delivery


    return { discount , delivery , total}

    
};

export const formatPrice = (value) => `$${Number(value).toFixed(2)}`;
