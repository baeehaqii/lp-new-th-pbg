"use client"

import { WhatsAppIcon } from "./icons"

export default function WhatsAppFloat() {
  const handleClick = () => {
    // Replace with your WhatsApp number (format: country code + number without + or spaces)
    const phoneNumber = "6281127010001" // Example: Indonesian number
    const message = encodeURIComponent("Halo, saya tertarik dengan Sapphire Townhouse Purbalingga")
    window.open(`https://api.whatsapp.com/send/?phone=6281127010001&text=Halo%2C+saya+tertarik+dengan+properti+Sapphire+TownHouse+Purbalingga&type=phone_number&app_absent=0`, "_blank")
  }

  return (
    <div className="whatsapp-float" onClick={handleClick}>
      <div className="whatsapp-button">
        <WhatsAppIcon size={28} className="whatsapp-icon" />
      </div>
    </div>
  )
}
