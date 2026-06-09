"use client";

type PolicyModalProps = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

export default function PolicyModal({
  open,
  title,
  content,
  onClose,
}: PolicyModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-3xl
          max-h-[80vh]
          overflow-y-auto
          p-8
        "
      >
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-black
              text-xl
            "
          >
            ✕
          </button>

        </div>

        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
          {content}
        </div>

      </div>
    </div>
  );
}