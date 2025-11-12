"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { BedDoubleIcon, BathIcon, LandPlotIcon, BadgeCheckIcon, XIcon, ZoomInIcon, ZoomOutIcon } from "./icons"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_3_kvv2os.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_4_hkpqk0.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761729628/Screenshot_2025-10-29_160919_awwawf.avif",
      name: "Tipe 45 ",
      price: "5XX.XX.XXX",
      bedrooms: 2,
      bathrooms: 1,
      area: "105",
      description:
        "Tipe 45/105 dengan 1 lantai adalah pilihan ideal untuk pasangan muda yang menginginkan rumah mewah di kawasan eksklusif. Dengan desain yang efisien, rumah ini menawarkan kenyamanan dengan harga terjangkau.",
      certificate: "SHM",
    },
    {
      id: 2,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_3_kvv2os.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_4_hkpqk0.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1762280114/Screenshot_2025-11-05_011330_xw1ipf.avif",
      name: "Tipe 57",
      price: "8XX.XXX.XXX",
      bedrooms: 3,
      bathrooms: 2,
      area: "105",
      description:
        "Tipe 57/105 dengan 1 lantai menawarkan ruang yang lebih luas dengan tambahan kamar tidur, cocok untuk keluarga dengan anak. Desain modern dan berada di kawasan eksklusif.",
      certificate: "SHM",
    },
    {
      id: 3,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_3_kvv2os.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_4_hkpqk0.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761729628/Screenshot_2025-10-29_160939_nf9orc.avif",
      name: "Tipe 51",
      price: "9XX.XXX.XXX",
      bedrooms: 3,
      bathrooms: 2,
      area: "51",
      description:
        "Tipe 51/105 dengan 1 Lantai adalah pilihan premium dengan ruang lebih luas dan 4 kamar tidur. Ideal untuk keluarga yang membutuhkan ruang ekstra dan kenyamanan maksimal.",
      certificate: "SHM",
    },
        {
      id: 5,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_3_kvv2os.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_4_hkpqk0.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761729627/Screenshot_2025-10-29_161010_dyiwuh.avif",
      name: "Tipe 24/52 (1/2 Kav)",
      price: "9XX.XXX.XXX",
      bedrooms: 1,
      bathrooms: 1,
      area: "52",
      description:
        "Tipe 24/52 dengan 1 Lantai adalah pilihan premium dengan ruang lebih luas dan 4 kamar tidur. Ideal untuk keluarga yang membutuhkan ruang ekstra dan kenyamanan maksimal.",
      certificate: "SHM",
    },
        {
      id: 6,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_3_kvv2os.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_4_hkpqk0.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761729627/Screenshot_2025-10-29_161025_laf9ri.avif",
      name: "Tipe 28",
      price: "9XX.XXX.XXX",
      bedrooms: 1,
      bathrooms: 1,
      area: "105",
      description:
        "Tipe 28/105 dengan 1 Lantai adalah pilihan premium dengan ruang lebih luas dan 4 kamar tidur. Ideal untuk keluarga yang membutuhkan ruang ekstra dan kenyamanan maksimal.",
      certificate: "SHM",
    },
            {
      id: 7,
      images: [
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_3_kvv2os.png",
        "https://res.cloudinary.com/dqobwse9q/image/upload/w_380,h_285,c_fill,f_auto,q_auto:eco/v1754883008/rend_4_hkpqk0.png",
      ],
      floorPlan: "https://res.cloudinary.com/dqobwse9q/image/upload/v1761729627/Screenshot_2025-10-29_160959_cgbftn.avif",
      name: "Tipe 67",
      price: "9XX.XXX.XXX",
      bedrooms: 3,
      bathrooms: 1,
      area: "105",
      description:
        "Tipe 67/105 dengan 1 Lantai adalah pilihan premium dengan ruang lebih luas dan 4 kamar tidur. Ideal untuk keluarga yang membutuhkan ruang ekstra dan kenyamanan maksimal.",
      certificate: "SHM",
    },
  ]

  const siteplan = {
    id: "siteplan-1",
    // image: "https://res.cloudinary.com/dqobwse9q/image/upload/w_1000,h_700,c_fill,f_auto,q_auto:eco/v1755444815/siteplane_serenity_slawi_kvzyhe.png",
    image:"https://res.cloudinary.com/dqobwse9q/image/upload/v1761727757/Siteplan_th_purbalingga_jy9y6r.avif",
    name: "Siteplan Sapphire Townhouse Purbalingga Purbalingga",
    description:
      "Masterplan perumahan Sapphire Townhouse Purbalingga Purbalingga yang menampilkan layout, jalan, ruang terbuka hijau, dan fasilitas umum.",
  }

  const specifications = {
    pondasi: "Batu kali",
    dinding: "Bata merah/Hebel",
    lantai: "Granit tile 60×60",
    atap: "Rangka baja ringan, genteng metal",
    kamarMandi: "Closet American Standard / Setara",
    septicTank:"Buis beton 80cm",
    kusenPintu: "Kayu/Aluminium & Pintu Fabrikasi",
    jendela: "kaca",
    plafon: "Rangka hollow, gypsum, list gypsum",
    carport: "Keramik",
    air: "PDAM",
    listrik: " 1300 watt",
    elektrikal: "Panasonic",
    lampu:"Model Downlight Warmwhite",
    mejaDapur:"Granite tile 60×60",


    // mezanin: "double hollow, lantai SPC (type 55)",
    // fiturRumah: "kanopi rangka hollow, cover wood plank, smart door lock",
  }

  const location = {
    embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.5642564407754!2d109.3746424!3d-7.398806800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559cfd41c5e01%3A0xf3ca425516273da6!2sPerumahan%20Sapphire%20Town%20House%20Purbalingga!5e1!3m2!1sid!2sid!4v1761726450664!5m2!1sid!2sid" width="120%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    name: "Denah Lokasi Sapphire Townhouse Purbalingga Purbalingga",
    description: "Lokasi strategis di pusat kota Purbalingga dengan akses mudah ke berbagai fasilitas umum.",
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
        <h2 className="section-title">Siteplan & Tipe Rumah</h2>
        <p className="section-subtitle">
          Temukan rumah impian Anda di Sapphire Townhouse Purbalingga Purbalingga. Kami menawarkan berbagai tipe rumah yang dirancang untuk
          memenuhi kebutuhan dan gaya hidup Anda.
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
        ) : activeType === "spesifikasi" ? (
          <div className="specifications-container">
            <div className="specifications-image">
              <Image
                src="https://res.cloudinary.com/dqobwse9q/image/upload/w_500,h_350,c_fill,f_auto,q_auto:eco/v1754637084/TYPE_85_1_i718cl.png"
                alt="Spesifikasi Rumah"
                width={600}
                height={800}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="specifications-content">
              <h3 className="specifications-title">Spesifikasi Rumah</h3>
              <div className="specifications-list">
                <div className="specification-item">
                  <span className="specification-label">Pondasi:</span>
                  <span className="specification-value">{specifications.pondasi}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Dinding:</span>
                  <span className="specification-value">{specifications.dinding}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Lantai:</span>
                  <span className="specification-value">{specifications.lantai}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Atap:</span>
                  <span className="specification-value">{specifications.atap}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Kamar Mandi/WC:</span>
                  <span className="specification-value">{specifications.kamarMandi}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Kusen & Pintu:</span>
                  <span className="specification-value">{specifications.kusenPintu}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Jendela:</span>
                  <span className="specification-value">{specifications.jendela}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Plafon:</span>
                  <span className="specification-value">{specifications.plafon}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Air:</span>
                  <span className="specification-value">{specifications.air}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Listrik:</span>
                  <span className="specification-value">{specifications.listrik}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Elektrikal:</span>
                  <span className="specification-value">{specifications.elektrikal}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">Meja Dapur:</span>
                  <span className="specification-value">{specifications.mejaDapur}</span>
                </div>
                <div className="specification-item">
                  <span className="specification-label">lampu:</span>
                  <span className="specification-value">{specifications.lampu}</span>
                </div>
              </div>
            </div>
          </div>
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
                  href="https://maps.app.goo.gl/QK5XWkFSP4nvkv7J9"
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

                    {/*<h3 className="modal-subtitle">Harga</h3>
                    <div className="modal-price">Rp {selectedProperty.price}</div>*/}

                    <div className="modal-cta">
                      <Link
                        href="https://wa.me/6281127010001?text=Halo,%20saya%20tertarik%20dengan%20properti%20Sapphire%20Serenity%20Slawi"
                        className="modal-cta-button"
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
