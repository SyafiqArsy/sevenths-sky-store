"use client";

type Props = {
  stock: number;
  quantity: number;
  setQuantity: (value: number) => void;
};

export default function QuantitySelector({
  stock,
  quantity,
  setQuantity,
}: Props) {
  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-full w-fit overflow-hidden bg-gray-50/50">
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        className="px-5 py-3 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        −
      </button>

      <span className="px-6 font-semibold text-sm min-w-[3rem] text-center">
        {quantity}
      </span>

      <button
        onClick={increase}
        disabled={quantity >= stock}
        className="px-5 py-3 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        +
      </button>
    </div>
  );
}
