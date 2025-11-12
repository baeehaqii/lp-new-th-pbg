import { Phone, ClipboardList, Percent } from "lucide-react"
import Link from "next/link"

const nomorWhatsApp = "628170031130";
const pesan = "Halo, saya tertarik dengan properti Sapphire Madani Tegal";
const linkWhatsApp= `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

export default function CallToAction() {
  return (
    <section id="cta" className="cta-section">
      <div className="container">
        <div className="cta-container">
          <h2 className="cta-title">Siapkan Masa Anda Depan dari Sekarang</h2>
          <p className="cta-description">
            Mulai dengan hunian strategis yang memberi kemudahan hidup dan nilai investasi jangka panjang. Hubungi kami sekarang juga!
          </p>
          <div className="cta-buttons">
            <Link 
              href={linkWhatsApp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button cta-button-primary"
            >
              <Phone className="cta-button-icon" />
              Whatsapp Kami
            </Link>
            <Link 
            //border cta
              href={linkWhatsApp}
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button cta-button-outline"
            >
              <Percent className="cta-button-icon" />
              Dapatkan Promo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}