"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { BedDoubleIcon, BathIcon, LandPlotIcon, BadgeCheckIcon, XIcon, ZoomInIcon, ZoomOutIcon } from "./icons"
import { ChevronLeft, ChevronRight } from "lucide-react"

const nomorWhatsApp = "628170031130";
const pesan = "Halo, saya tertarik dengan properti Sapphire Madani Tegal";
const linkWhatsApp= `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

function formatIDR(value: number) {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
}

function SimulasiKPRContent({
  harga,
  dp,
  tahun,
  bunga,
  onHargaChange,
  onDpChange,
  onTahunChange,
  onBungaChange,
}: {
  harga: string
  dp: string
  tahun: string
  bunga: string
  onHargaChange: (value: string) => void
  onDpChange: (value: string) => void
  onTahunChange: (value: string) => void
  onBungaChange: (value: string) => void
}) {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  function formatNumberWithDots(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function formatInputValue(value: string): string {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')
    // Add dots for thousands separator
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function parseInputValue(value: string): string {
    // Remove all dots to get raw number
    return value.replace(/\./g, '')
  }

  const hargaNum = parseFloat(harga.replace(/\./g, '')) || 0
  const dpNum = parseFloat(dp.replace(/\./g, '')) || 0
  const tahunNum = parseFloat(tahun) || 0
  const bungaNum = parseFloat(bunga) || 0

  const jumlahPinjaman = useMemo(() => Math.max(0, hargaNum - dpNum), [hargaNum, dpNum])

  const cicilanPerBulan = useMemo(() => {
    if (tahunNum <= 0) return 0
    const bulan = tahunNum * 12

    if (bungaNum === 0) {
      return jumlahPinjaman / bulan
    } else {
      const bungaPerBulan = bungaNum / 100 / 12
      const pembilang = jumlahPinjaman * bungaPerBulan * Math.pow(1 + bungaPerBulan, bulan)
      const penyebut = Math.pow(1 + bungaPerBulan, bulan) - 1
      return pembilang / penyebut
    }
  }, [jumlahPinjaman, tahunNum, bungaNum])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      paddingTop: '16px'
    }} className="kpr-grid-responsive">
      {/* CSS for pointer styling */}
      <style>{`
        .kpr-editable-field {
          cursor: text;
          position: relative;
        }
        .kpr-editable-field::after {
          content: '✎';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #999;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .kpr-editable-field:hover::after {
          opacity: 1;
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px',
            fontFamily: 'inherit'
          }}>Harga Properti</label>
          <div className="kpr-editable-field" style={{ position: 'relative' }}>
            <input
              type="text"
              value={harga}
              onChange={(e) => {
                const formatted = formatInputValue(e.target.value)
                onHargaChange(formatted)
              }}
              onFocus={() => setFocusedField('harga')}
              onBlur={() => setFocusedField(null)}
              placeholder="masukan harga rumah"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: focusedField === 'harga' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#334155',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
                cursor: 'text'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '6px',
            fontFamily: 'inherit'
          }}>
            Uang Muka (DP)
          </label>
          <div className="kpr-editable-field" style={{ position: 'relative' }}>
            <input
              type="text"
              value={dp}
              onChange={(e) => {
                const formatted = formatInputValue(e.target.value)
                onDpChange(formatted)
              }}
              onFocus={() => setFocusedField('dp')}
              onBlur={() => setFocusedField(null)}
              placeholder="masukan uang muka yang anda miliki"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: focusedField === 'dp' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#334155',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
                cursor: 'text'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '6px',
              fontFamily: 'inherit'
            }}>
              Jangka Waktu (Tahun)
            </label>
            <div className="kpr-editable-field" style={{ position: 'relative' }}>
              <input
                type="number"
                value={tahun}
                onChange={(e) => onTahunChange(e.target.value)}
                onFocus={() => setFocusedField('tahun')}
                onBlur={() => setFocusedField(null)}
                placeholder="masukan jangka waktu dalam tahun"
                min="1"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: focusedField === 'tahun' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#334155',
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  cursor: focusedField === 'tahun' ? 'text' : 'default'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '6px',
              fontFamily: 'inherit'
            }}>
              Suku Bunga (%)
            </label>
            <div className="kpr-editable-field" style={{ position: 'relative' }}>
              <input
                type="number"
                value={bunga}
                onChange={(e) => onBungaChange(e.target.value)}
                onFocus={() => setFocusedField('bunga')}
                onBlur={() => setFocusedField(null)}
                placeholder="masukan contoh 5,5%"
                min="0"
                step="0.1"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: focusedField === 'bunga' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#334155',
                  backgroundColor: '#ffffff',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  cursor: focusedField === 'bunga' ? 'text' : 'default'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          backgroundColor: '#831016',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'inherit',
            margin: 0,
            marginBottom: '6px'
          }}>
            Cicilan Per Bulan
          </p>
          <p style={{
            fontSize: '28px',
            fontWeight: '800',
            fontFamily: 'inherit',
            margin: '8px 0 0 0',
            lineHeight: 1
          }}>
            {hargaNum > 0 ? `Rp ${Math.round(cicilanPerBulan).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '-'}
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
            margin: 0,
            fontFamily: 'inherit'
          }}>
            Jumlah Pinjaman
          </p>
          <p style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#0f172a',
            margin: '6px 0 0 0',
            fontFamily: 'inherit'
          }}>
            {hargaNum > 0 ? `Rp ${Math.round(jumlahPinjaman).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Properties() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [activeType, setActiveType] = useState("tipe-rumah")
  const [isSiteplanModalOpen, setIsSiteplanModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [siteplanZoom, setSiteplanZoom] = useState(1)
  const [locationZoom, setLocationZoom] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [touchStart, setTouchStart] = useState<{ [key: number]: number }>({})
  const [isDragging, setIsDragging] = useState<{ [key: number]: boolean }>({})
  const [dragStart, setDragStart] = useState<{ [key: number]: number }>({})
  const [modalTab, setModalTab] = useState<'detail' | 'simulasi'>('detail')
  const [kprHarga, setKprHarga] = useState<string>('')
  const [kprDp, setKprDp] = useState<string>('')
  const [kprTahun, setKprTahun] = useState<string>('')
  const [kprBunga, setKprBunga] = useState<string>('')

  const propertyTypes: PropertyType[] = [
    { id: "tipe-rumah", label: "Tipe Rumah", active: true },
    { id: "siteplan", label: "Siteplan", active: false },
    { id: "spesifikasi", label: "Spesifikasi", active: false },
    { id: "lokasi", label: "Lokasi", active: false },
  ]

  const properties = [
    {
      id: 1,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841482/Screenshot_2025-10-30_231147_zwtwds.avif",
      name: "Tipe 42/78 Saba",
      price: "4XX.XX.XXX",
      bedrooms: 2,
      bathrooms: 1,
      area: "78",
      description:
        "Tipe 42/78 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 2,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841481/Screenshot_2025-10-30_231157_fyjaii.avif",
      name: "Tipe 47/84 Saba",
      price: "4XX.XX.XXX",
      bedrooms: 2,
      bathrooms: 1,
      area: "84",
      description:
        "Tipe 47/84 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 3,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841481/Screenshot_2025-10-30_231208_eccz6j.avif",
      name: "Tipe 52/84 Saba",
      price: "4XX.XX.XXX",
      bedrooms: 3,
      bathrooms: 2,
      area: "84",
      description:
        "Tipe 52/84 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 4,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841481/Screenshot_2025-10-30_231222_xzrlzc.avif",
      name: "Tipe 53/84 Saba",
      price: "4XX.XX.XXX",
      bedrooms: 3,
      bathrooms: 2,
      area: "84",
      description:
        "Tipe 53/84 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 5,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841481/Screenshot_2025-10-30_231234_dflvdt.avif",
      name: "Tipe 58/112 Saba",
      price: "4XX.XX.XXX",
      bedrooms: 2,
      bathrooms: 1,
      area: "112",
      description:
        "Tipe 58/112 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 6,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841480/Screenshot_2025-10-30_231249_hgffil.avif",
      name: "Tipe Studio",
      price: "4XX.XX.XXX",
      bedrooms: 1,
      bathrooms: 1,
      area: "",
      description:
        "Tipe Studio dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 7,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841480/Screenshot_2025-10-30_231943_a63ip4.avif",
      name: "Tipe 48/90 Palmyra",
      price: "5XX.XX.XXX",
      bedrooms: 2,
      bathrooms: 1,
      area: "90",
      description:
        "Tipe 48/90 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 8,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841480/Screenshot_2025-10-30_231956_upzxwh.avif",
      name: "Tipe 55/108 Palmyra",
      price: "5XX.XX.XXX",
      bedrooms: 2,
      bathrooms: 1,
      area: "108",
      description:
        "Tipe 55/108 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 9,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841480/Screenshot_2025-10-30_232005_nf8mrn.avif",
      name: "Tipe 69/108 Palmyra",
      price: "5XX.XX.XXX",
      bedrooms: 3,
      bathrooms: 2,
      area: "108",
      description:
        "Tipe 69/108 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 10,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841480/Screenshot_2025-10-30_232014_vf4aa1.avif",
      name: "Tipe 69/135 Hook Palmyra",
      price: "5XX.XX.XXX",
      bedrooms: 3,
      bathrooms: 1,
      area: "135",
      description:
        "Tipe 69/135 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 11,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755489734/madani_tegal_saba_gxht7l.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/v1755488814/madani_tegal_palmyra_re2pyv.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841480/Screenshot_2025-10-30_232026_ua1fcl.avif",
      name: "Tipe 90/108 Palmyra",
      price: "5XX.XX.XXX",
      bedrooms: 3,
      bathrooms: 2,
      area: "108",
      description:
        "Tipe 90/108 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
  ]

  const siteplan = {
    id: "siteplan-1",
    image: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761841486/Screenshot_2025-10-30_231105_wqqujs.avif",
    name: "Siteplan Sapphire Madani Tegal",
    description:
      "Masterplan perumahan Sapphire Madani Tegal yang menampilkan layout, jalan, ruang terbuka hijau, dan fasilitas umum.",
  }

  const specificationsSaba = {
    pondasi: " Batu kali",
    dinding: "Bata Merah/Hebel",
    lantai: "Granit tile 60×60",
    atap: "Rangka baja ringan, genteng multiroof dan spandek",
    kamarMandi: "Closet American Standard / Setara",
    septicTank:"Buis beton 80cm",
    kusenPintu: "Aluminium 4 Inch setara Inkalum & HPL Eksterior Taco atau setara",
    jendela: "kaca",
    plafon:"Rangka hollow, gypsum, list gypsum",
    air: "PDAM",
    listrik: "1300 watt",
    mejaDapur:"50cm",
    stopKontak:"Panasonic",
    lampu:"Model Downlight Warmlight",
  }

  const specificationsPalmyra = {
    pondasi: " Batu kali",
    dinding: "Bata Merah/Hebel",
    lantai: "Granit tile 60×60",
    atap: "Rangka baja ringan, genteng beton flat",
    kamarMandi: "Closet American Standard / Setara",
    septicTank:"500L untuk 1 Lantai, 1.000L untuk 2 Lantai",
    kusenPintu: "Aluminium 4 Inch setara Alexindo & HPL Eksterior CT",
    jendela: "kaca",
    plafon:"Rangka hollow, gypsum, list gypsum",
    air: "PDAM",
    listrik: "1300 watt",
    mejaDapur:"60cm",
    stopKontak:"Nero",
    lampu:"Model Downlight Warmligh",
    tinggiPintu:"2,4M",
    carPort:"Batu Andesit",

  }
  
  const location = {
    // embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.152090540976!2d109.1275648!3d-6.991360799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fbf007c3b46cb%3A0x5da496f205d213b2!2sSapphire%20Serenity%20Slawi!5e0!3m2!1sen!2sid!4v1761065829691!5m2!1sen!2sid" width="100%" height="450" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>',
      embed:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2132983092697!2d109.11558769999999!3d-6.8650234999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb7a8a431fae7%3A0x1b0368ed90e6941a!2sSapphire%20Madani%20Tegal!5e0!3m2!1sid!2sid!4v1762298248824!5m2!1sid!2sid" width="120%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    name: "Denah Lokasi Sapphire Madani Tegal",
    description: "Lokasi strategis di pusat kota Slawi dengan akses mudah ke berbagai fasilitas umum.",
  }

  interface Property {
    id: number
    images: string[]
    floorPlan: string
    name: string
    price: string
    bedrooms: number
    bathrooms: number
    area: string
    description: string
    certificate: string
  }

  const handleTouchStart = (propertyId: number, e: React.TouchEvent) => {
    setTouchStart((prev) => ({ ...prev, [propertyId]: e.targetTouches[0].clientX }))
  }

  const handleTouchEnd = (propertyId: number, e: React.TouchEvent, totalImages: number) => {
    const start = touchStart[propertyId]
    const end = e.changedTouches[0].clientX

    if (!start) return

    const distance = start - end
    const threshold = 50

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swipe left - next image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
        }))
      } else {
        // Swipe right - previous image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
        }))
      }
    }

    setTouchStart((prev) => ({ ...prev, [propertyId]: 0 }))
  }

  const handleMouseDown = (propertyId: number, e: React.MouseEvent) => {
    setIsDragging((prev) => ({ ...prev, [propertyId]: true }))
    setDragStart((prev) => ({ ...prev, [propertyId]: e.clientX }))
  }

  const handleMouseMove = (propertyId: number, e: React.MouseEvent) => {
    if (!isDragging[propertyId]) return
    e.preventDefault()
  }

  const handleMouseUp = (propertyId: number, e: React.MouseEvent, totalImages: number) => {
    if (!isDragging[propertyId]) return

    const start = dragStart[propertyId]
    const end = e.clientX

    if (!start) {
      setIsDragging((prev) => ({ ...prev, [propertyId]: false }))
      return
    }

    const distance = start - end
    const threshold = 50

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Drag left - next image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
        }))
      } else {
        // Drag right - previous image
        setCurrentImageIndex((prev) => ({
          ...prev,
          [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
        }))
      }
    }

    setIsDragging((prev) => ({ ...prev, [propertyId]: false }))
    setDragStart((prev) => ({ ...prev, [propertyId]: 0 }))
  }

  const handleMouseLeave = (propertyId: number) => {
    setIsDragging((prev) => ({ ...prev, [propertyId]: false }))
    setDragStart((prev) => ({ ...prev, [propertyId]: 0 }))
  }

  const goToImage = (propertyId: number, index: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: index,
    }))
  }

  const openModal = (property: Property): void => {
    setSelectedProperty(property)
    setIsModalOpen(true)
    setModalTab('detail')
    // Keep KPR simulator empty for user input
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalTab('detail')
    setTimeout(() => {
      setSelectedProperty(null)
    }, 300)
  }

  const openSiteplanModal = () => {
    setIsSiteplanModalOpen(true)
    setSiteplanZoom(1)
    document.body.style.overflow = "hidden"
  }

  const closeSiteplanModal = () => {
    setIsSiteplanModalOpen(false)
    setSiteplanZoom(1)
    document.body.style.overflow = "auto"
  }

  const openLocationModal = () => {
    setIsLocationModalOpen(true)
    setLocationZoom(1)
    document.body.style.overflow = "hidden"
  }

  const closeLocationModal = () => {
    setIsLocationModalOpen(false)
    setLocationZoom(1)
    document.body.style.overflow = "auto"
  }

  const handleSiteplanZoomIn = () => {
    setSiteplanZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleSiteplanZoomOut = () => {
    setSiteplanZoom((prev) => Math.max(prev - 0.5, 1))
  }

  const handleLocationZoomIn = () => {
    setLocationZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleLocationZoomOut = () => {
    setLocationZoom((prev) => Math.max(prev - 0.5, 1))
  }

  type PropertyTypeId = "tipe-rumah" | "siteplan" | "spesifikasi" | "lokasi"

  interface PropertyType {
    id: PropertyTypeId
    label: string
    active: boolean
  }

  const handleTypeChange = (typeId: PropertyTypeId): void => {
    setActiveType(typeId)
  }

  return (
    <section id="tipe-rumah" className="section">
      <div className="container">
        <h2 className="section-title">Sapphire Madani Tegal</h2>
        <p className="section-subtitle">
          Berada di Jl. Pendidikan, Pesurungan Lor, Sapphire Madani Tegal menawarkan perumahan Tegal yang memadukan kenyamanan tinggal dan kemudahan beraktivitas. Kawasan ini dekat pusat kota dan berbagai fasilitas penting, sehingga Anda bisa menjalani rutinitas tanpa harus menempuh perjalanan jauh. Dengan lokasi yang strategis dan lingkungan yang tertata, hunian ini memberi Anda tempat tinggal yang nyaman sekaligus peluang investasi yang terus berkembang seiring pesatnya pertumbuhan Kota Tegal.
        </p>

        <div className="property-type-container">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`property-type-button ${activeType === type.id ? "property-type-button-active" : "property-type-button-inactive"
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {activeType === "tipe-rumah" ? (
          <div className="property-grid">
            {properties.map((property) => {
              const currentIndex = currentImageIndex[property.id] || 0
              return (
                <div key={property.id} className="property-card">
                  <div
                    className="property-image-container property-slider"
                    onTouchStart={(e) => handleTouchStart(property.id, e)}
                    onTouchEnd={(e) => handleTouchEnd(property.id, e, property.images.length)}
                    onMouseDown={(e) => handleMouseDown(property.id, e)}
                    onMouseMove={(e) => handleMouseMove(property.id, e)}
                    onMouseUp={(e) => handleMouseUp(property.id, e, property.images.length)}
                    onMouseLeave={() => handleMouseLeave(property.id)}
                    style={{ cursor: isDragging[property.id] ? "grabbing" : "grab" }}
                  >
                    <Image
                      src={property.images[currentIndex] || "/placeholder.svg"}
                      alt={`${property.name} - Image ${currentIndex + 1}`}
                      fill
                      className="property-image"
                      draggable={false}
                    />

                    {property.images.length > 1 && (
                      <>
                        <button
                          className="property-slider-arrow property-slider-arrow-prev"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [property.id]: ((prev[property.id] || 0) - 1 + property.images.length) % property.images.length,
                            }))
                          }}
                          title="Previous image"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          className="property-slider-arrow property-slider-arrow-next"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [property.id]: ((prev[property.id] || 0) + 1) % property.images.length,
                            }))
                          }}
                          title="Next image"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {property.images.length > 1 && (
                      <div className="property-slider-dots">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            className={`property-slider-dot ${currentIndex === index ? "active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              goToImage(property.id, index)
                            }}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="property-content">
                    <div className="property-header">
                      <h3 className="property-name">{property.name}</h3>
                      <button onClick={() => openModal(property)} className="property-detail-button">
                        Lihat Detail
                      </button>
                    </div>

                    <div className="property-features">
                      <div className="property-feature">
                        <BedDoubleIcon className="property-feature-icon" />
                        <span>{property.bedrooms} Kamar</span>
                      </div>
                      <div className="property-feature">
                        <BathIcon className="property-feature-icon" />
                        <span>{property.bathrooms} Kamar Mandi</span>
                      </div>
                      <div className="property-feature">
                        <LandPlotIcon className="property-feature-icon" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : activeType === "siteplan" ? (
          <div className="siteplan-container">
            <div className="siteplan-image-container" onClick={openSiteplanModal} style={{ cursor: "pointer" }}>
              <Image
                src={siteplan.image || "/placeholder.svg"}
                alt={siteplan.name}
                width={1200}
                height={800}
                className="siteplan-image"
              />
            </div>
            <div className="siteplan-content">
              <h3 className="siteplan-title">{siteplan.name}</h3>
              <p>{siteplan.description}</p>
            </div>
          </div>
        
        // --- PERUBAHAN TAMPILAN (VIEW) DIMULAI DI SINI ---
        // Mengganti blok 'specifications-container' dengan 'property-grid'
        ) : activeType === "spesifikasi" ? (
          <div className="property-grid">
            {/* Card 1: Saba */}
            <div className="property-card" style={{ borderRadius: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src="https://res.cloudinary.com/dqobwse9q/image/upload/v1761842084/Screenshot_2025-10-30_233323_livwoh.avif"
                  alt="Spesifikasi Saba"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="specifications-content" style={{ padding: '1.5rem' }}>
                <h3 className="specifications-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#831016', marginBottom: '1.5rem', marginTop: 0 }}>
                  Spesifikasi Saba
                </h3>
                <div className="specifications-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Map dari data specificationsSaba */}
                  {Object.entries(specificationsSaba).map(([key, value]) => (
                    <div className="specification-item" key={key} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem',
                      padding: '0.6rem 0.8rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.5rem',
                      borderLeft: '3px solid #831016'
                    }}>
                      <span className="specification-label" style={{ fontWeight: 700, color: '#831016', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="specification-value" style={{ color: '#374151', lineHeight: 1.5, fontSize: '0.8rem' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Palmyra */}
            <div className="property-card" style={{ borderRadius: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src="https://res.cloudinary.com/dqobwse9q/image/upload/v1761842084/Screenshot_2025-10-30_233323_livwoh.avif"
                  alt="Spesifikasi Palmyra"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="specifications-content" style={{ padding: '1.5rem' }}>
                <h3 className="specifications-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#831016', marginBottom: '1.5rem', marginTop: 0 }}>
                  Spesifikasi Palmyra
                </h3>
                <div className="specifications-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Map dari data specificationsPalmyra */}
                  {Object.entries(specificationsPalmyra).map(([key, value]) => (
                    <div className="specification-item" key={key} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem',
                      padding: '0.6rem 0.8rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.5rem',
                      borderLeft: '3px solid #831016'
                    }}>
                      <span className="specification-label" style={{ fontWeight: 700, color: '#831016', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="specification-value" style={{ color: '#374151', lineHeight: 1.5, fontSize: '0.8rem' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        // --- PERUBAHAN TAMPILAN (VIEW) SELESAI ---

        ) : activeType === "lokasi" ? (
          <div className="location-container">
            <div className="location-image-wrapper" onClick={openLocationModal}>
              <div
                dangerouslySetInnerHTML={{ __html: location.embed }}
                style={{
                  width: '100%',
                  height: '450px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              />
            </div>
            <div className="location-content">
              <h3 className="location-title">{location.name}</h3>
              <p>{location.description}</p>
              <div className="location-button-container">
                <Link
                  href="https://maps.app.goo.gl/nBkRc22GBjEfwRN48"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-gmaps-button"
                >
                  <svg className="location-gmaps-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  Lihat Lokasi di Google Maps
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {isModalOpen && selectedProperty && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <XIcon />
            </button>

            {/* Modal Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: 0,
              marginBottom: 0,
              gap: '32px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '24px'
            }}>
              <button
                onClick={() => setModalTab('detail')}
                style={{
                  padding: '12px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: modalTab === 'detail' ? '700' : '500',
                  color: modalTab === 'detail' ? '#831016' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: modalTab === 'detail' ? '2px solid #831016' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  marginBottom: '-1px'
                }}
              >
                Detail Properti
              </button>
              <button
                onClick={() => setModalTab('simulasi')}
                style={{
                  padding: '12px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: modalTab === 'simulasi' ? '700' : '500',
                  color: modalTab === 'simulasi' ? '#831016' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: modalTab === 'simulasi' ? '2px solid #831016' : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  marginBottom: '-1px'
                }}
              >
                Simulasi KPR
              </button>
            </div>

            <div className="modal-content">
              {modalTab === 'detail' ? (
                <>
                  <h2 className="modal-title">{selectedProperty.name}</h2>
                  <div className="modal-image">
                    <Image
                      src={selectedProperty.floorPlan || "/placeholder.svg"}
                      alt={`Denah ${selectedProperty.name}`}
                      width={1200}
                      height={800}
                      style={{ objectFit: "contain", width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="modal-description">
                    <p>{selectedProperty.description}</p>

                    <h3 className="modal-subtitle">Spesifikasi</h3>
                    <div className="modal-property-features">
                      <div className="modal-property-feature">
                        <BedDoubleIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Kamar Tidur</div>
                          <div className="modal-feature-value">{selectedProperty.bedrooms}</div>
                        </div>
                      </div>
                      <div className="modal-property-feature">
                        <BathIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Kamar Mandi</div>
                          <div className="modal-feature-value">{selectedProperty.bathrooms}</div>
                        </div>
                      </div>
                      <div className="modal-property-feature">
                        <LandPlotIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Luas Tanah</div>
                          <div className="modal-feature-value">{selectedProperty.area} m²</div>
                        </div>
                      </div>
                      <div className="modal-property-feature">
                        <BadgeCheckIcon className="modal-feature-icon" />
                        <div>
                          <div className="modal-feature-label">Sertifikat</div>
                          <div className="modal-feature-value">{selectedProperty.certificate}</div>
                        </div>
                      </div>
                    </div>

                    {/* <h3 className="modal-subtitle">Harga</h3>
                    <div className="modal-price">Rp {selectedProperty.price}</div> */}

                    <div className="modal-cta">
                    <Link
                      href={linkWhatsApp}
                      className="modal-cta-button"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Hubungi Kami
                    </Link>
                  </div>
                  </div>
                </>
              ) : (
                <SimulasiKPRContent
                  harga={kprHarga}
                  dp={kprDp}
                  tahun={kprTahun}
                  bunga={kprBunga}
                  onHargaChange={setKprHarga}
                  onDpChange={setKprDp}
                  onTahunChange={setKprTahun}
                  onBungaChange={setKprBunga}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {isSiteplanModalOpen && (
        <div className="concept-modal-overlay" onClick={closeSiteplanModal}>
          <div className="concept-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="concept-modal-close" onClick={closeSiteplanModal}>
              <XIcon size={24} />
            </button>
            <div className="gallery-zoom-controls">
              <button className="gallery-zoom-button" onClick={handleSiteplanZoomIn} disabled={siteplanZoom >= 3}>
                <ZoomInIcon size={20} />
              </button>
              <button className="gallery-zoom-button" onClick={handleSiteplanZoomOut} disabled={siteplanZoom <= 1}>
                <ZoomOutIcon size={20} />
              </button>
            </div>
            <div className="concept-modal-content">
              <div className="gallery-lightbox-image-wrapper">
                <Image
                  src={siteplan.image || "/placeholder.svg"}
                  alt={siteplan.name}
                  width={1800}
                  height={1200}
                  className="concept-modal-image"
                  style={{ transform: `scale(${siteplanZoom})` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isLocationModalOpen && (
        <div className="concept-modal-overlay" onClick={closeLocationModal}>
          <div className="concept-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="concept-modal-close" onClick={closeLocationModal}>
              <XIcon size={24} />
            </button>
            <div className="concept-modal-content">
              <div className="gallery-lightbox-image-wrapper" style={{ height: '600px' }}>
                <div
                  dangerouslySetInnerHTML={{ __html: location.embed }}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}