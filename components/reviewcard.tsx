import { CircleUserRound, Star } from "lucide-react";
import React from "react";

function ReviewCard() {
  return (
    <div className="bg-orange-500 rounded-xl p-4 mt-4 font-belanosima">
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
        surga, gigitan kedua membawamu kesana
      </p>
    </div>
  );
}

export default ReviewCard;
