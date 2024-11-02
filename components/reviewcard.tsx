import { CircleUserRound, Star } from "lucide-react";
import React from "react";

function ReviewCard({ loading = false }: { loading?: boolean }) {
  return (
    <div className="bg-orange-500 rounded-xl p-4 mt-4 font-belanosima">
      {loading ? (
        // Render skeleton saat loading
        <div className="animate-pulse">
          <div className="flex gap-2 items-center">
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
            <div className="flex flex-col space-y-2">
              <div className="bg-gray-300 w-24 h-4 rounded"></div>
              <div className="flex items-center space-x-1">
                <div className="bg-gray-300 w-12 h-4 rounded"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 w-full h-4 rounded mt-4"></div>
          <div className="bg-gray-300 w-3/4 h-4 rounded mt-2"></div>
        </div>
      ) : (
        // Render data review saat loading selesai
        <>
          <div className="flex gap-2 items-center">
            <CircleUserRound size={32} />
            <div>
              <p>Barbara Oakley</p>
              <div className="flex items-center">
                <Star size={18} fill="yellow" />
                <p>3/5</p>
              </div>
            </div>
          </div>
          <p>
            Makan disini kayak makan di surga. Gigitan pertama terasa seperti di
            surga, gigitan kedua membawamu kesana.
          </p>
        </>
      )}
    </div>
  );
}

export default ReviewCard;
