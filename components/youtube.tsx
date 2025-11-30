"use client"

import Link from "next/link"
import { useState } from "react"

export default function YouTube() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <section className="youtube-section">
            <div className="container">
                <div className="youtube-grid">
                    {/* Kolom Kiri - Judul dan Deskripsi */}
                    <div className="youtube-content">
                        <h2 className="youtube-title">Subscribe Channel Sapphire Grup</h2>
                        <p className="youtube-description">
                            Ikuti channel YouTube kami untuk mendapatkan update terbaru tentang Sapphire Grup,
                            tour virtual, tips properti, dan konten menarik lainnya.
                        </p>
                        <Link
                            href="https://www.youtube.com/@SapphireGrup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="youtube-button"
                        >
                            <svg className="youtube-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span>Ke Channel YouTube</span>
                        </Link>
                    </div>

                    {/* Kolom Kanan - Video Embed dengan Lazy Loading */}
                    <div className="youtube-video-wrapper">
                            <iframe
                                width="100%"
                                height="400"
                                src="https://www.youtube.com/embed/TVDndFFiC54?si=-zu4-JrJj6PP-oeu&autoplay=1"
                                title="Sapphire Town House Purbalingga"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="youtube-video"
                                loading="lazy"
                            ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}
