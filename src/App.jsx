import { useEffect, useRef, useState } from 'react'
import './App.css'

const weddingDate = new Date('2026-10-10T10:00:00+02:00')

function useCountdown() {
  const calculate = () => {
    const distance = Math.max(0, weddingDate.getTime() - Date.now())
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance / 3600000) % 24),
      minutes: Math.floor((distance / 60000) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    }
  }
  const [time, setTime] = useState(calculate)
  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return time
}

const Ornament = () => <div className="ornament" aria-hidden="true"><span /><i>◆</i><span /></div>

const AmbientEffects = () => (
  <div className="ambient-effects" aria-hidden="true">
    <div className="snowfall">
      {Array.from({ length: 28 }, (_, index) => <i key={index} style={{ '--left': `${(index * 37) % 101}%`, '--size': `${3 + (index % 5) * 1.4}px`, '--fall': `${11 + (index % 7) * 2.3}s`, '--delay': `${-(index % 13) * 1.7}s`, '--drift': `${-35 + (index % 8) * 10}px`, '--opacity': 0.25 + (index % 5) * 0.11 }} />)}
    </div>
    <div className="fireflies">
      {Array.from({ length: 16 }, (_, index) => <i key={index} style={{ '--left': `${4 + (index * 43) % 92}%`, '--top': `${8 + (index * 31) % 84}%`, '--glow': `${3.8 + (index % 6) * 0.7}s`, '--delay': `${-(index % 9) * 0.8}s`, '--travel-x': `${-22 + (index % 5) * 12}px`, '--travel-y': `${-28 + (index % 7) * 9}px` }} />)}
    </div>
  </div>
)

function MelodyControl() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const saveData = navigator.connection?.saveData
    const start = () => audio.play().then(() => setPlaying(true)).catch(() => {})
    if (!saveData) start()
    window.addEventListener('pointerdown', start, { once: true })
    return () => window.removeEventListener('pointerdown', start)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {})
    else { audio.pause(); setPlaying(false) }
  }

  return <><audio ref={audioRef} src="/assets/invitation-wedding-375839.mp3" preload="auto" autoPlay playsInline loop /><button className="melody-control" type="button" onClick={toggle} aria-label={playing ? 'Mute background melody' : 'Play background melody'}>{playing ? '♪ Sound on' : '♪ Play music'}</button></>
}

function App() {
  const countdown = useCountdown()
  const openMomo = () => {
    window.location.href = 'tel:*182*1*1*0788328805%23'
  }

  return (
    <main>
      <AmbientEffects />
      <MelodyControl />
      <section className="hero">
        <div className="hero-glow" />
        <div className="eyebrow">Wedding invitation</div>
        <p className="monogram">Y <span>&</span> J</p>
        <h1>D. Yvette <em>&</em> J.Pierre</h1>
        <p className="hero-copy">Together with their families, joyfully invite you to celebrate their wedding.</p>
        <div className="hero-meta"><span>10 October 2026</span><span className="dot">•</span><span>Kigali Prime Garden</span></div>
        <div className="hero-photo">
          <img src="/image1.jpeg" alt="D. Yvette and J.Pierre smiling together" width="720" height="1080" fetchPriority="high" />
          <div className="photo-frame" />
        </div>
        <a className="scroll-cue" href="#invitation" aria-label="Continue to invitation">↓</a>
      </section>

      <section className="paper-section invitation" id="invitation">
        <div className="section-inner">
          <p className="script-label">Two lives, one love</p>
          <h2>We are getting married</h2>
          <Ornament />
          <blockquote>“So they are no longer two but one flesh. What therefore God has joined together, let not man separate.”<cite>Matthew 19:6</cite></blockquote>
          <p className="invitation-copy">With grateful hearts, we invite you to witness our vows and share in the joy of a new chapter written together.</p>
        </div>
      </section>

      <section className="family-section">
        <div className="section-inner">
          <p className="kicker light">Together with our families</p>
          <h2>With the blessing of our parents</h2>
          <div className="family-grid">
            <article><span>Bride’s parent</span><h3>Hitimana Théoneste</h3></article>
            <div className="family-mark">&</div>
            <article><span>Groom’s family</span><h3>The family of Ntiyamira Justin</h3><p>Represented by Habimana Silas</p></article>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="section-inner">
          <p className="script-label">Save the date</p>
          <h2>Saturday, 10 October 2026</h2>
          <Ornament />
          <div className="date-card">
            <div><span>Saturday</span><strong>10</strong><span>October</span></div>
            <div className="venue-copy"><span>The celebration will take place at</span><h3>Kigali Prime Garden</h3><p>Kigali, Rwanda</p><a href="https://www.google.com/maps/search/?api=1&query=Kigali+Prime+Garden" target="_blank" rel="noreferrer"><span>View location</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-9 9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg></a></div>
          </div>
          <div className="countdown-wrap">
            <p className="kicker">Counting down to forever</p>
            <div className="countdown" aria-label="Countdown to the wedding">
              {Object.entries(countdown).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="portrait-section">
        <img src="/image2.jpeg" alt="Portrait of D. Yvette and J.Pierre" width="853" height="1280" loading="lazy" decoding="async" />
        <div className="portrait-overlay"><span>Our forever begins</span><strong>10 · 10 · 2026</strong></div>
      </section>

      <section className="invitation-download">
        <div className="section-inner">
          <p className="script-label">Keep the date close</p>
          <h2>Our wedding invitation</h2>
          <p className="download-copy">Save a copy of our invitation to your phone or computer.</p>
          <a className="download-button" href="/assets/new_invitation.png" download="D-Yvette-and-J-Pierre-Wedding-Invitation.png">Download invitation ↓</a>
        </div>
      </section>

      <section className="momo-section">
        <div className="section-inner">
          <p className="script-label">A gift from the heart</p>
          <h2>Celebrate our new beginning</h2>
          <p className="momo-intro">Your presence is our greatest gift. For those who wish to bless us further, you may send your gift through Mobile Money or bank transfer.</p>
          <div className="gift-accounts">
            <article className="gift-account"><img src="/assets/im-bank.webp" alt="I&M Bank" width="54" height="42" loading="lazy" /><span>I&amp;M Bank</span><strong>20041092002</strong><p>Ndagijimana Jean Pierre</p></article>
            <article className="gift-account"><img src="https://equitygroupholdings.com/wp-content/themes/equity/assets/img/equity-bank-logo.png" alt="Equity" width="54" height="42" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = '/assets/equity-bank.webp' }} /><span>Equity Bank</span><strong>4777111589027</strong><p>Dusabimana Yvette</p></article>
            <button className="gift-account momo-account" type="button" onClick={openMomo}><img src="/assets/mtn-momo.webp" alt="MTN MoMo" width="54" height="42" loading="lazy" /><span>MTN Mobile Money</span><strong>0788328805</strong><p>Dusabimana Yvette</p><small>Tap to open MoMo</small></button>
          </div>
          <p className="ussd-note">The MoMo card opens <strong>*182*1*1*0788328805#</strong>. Enter the amount and confirm securely on your phone.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-inner">
          <p className="script-label">We cannot wait to celebrate with you</p>
          <h2>Contact us</h2>
          <p className="contact-intro">For questions or additional information, please feel free to call.</p>
          <div className="contact-grid">
            <article><span>The bride</span><h3>D. Yvette</h3><a href="tel:+250788328805">0788 328 805</a><a href="tel:+250788400620">0788 400 620</a><a href="tel:+250788775352">0788 775 352</a></article>
            <article><span>The groom</span><h3>N. Jean Pierre</h3><a href="tel:+250780329903">0780 329 903</a></article>
          </div>
        </div>
      </section>

      <footer><p className="monogram footer-monogram">Y <span>&</span> J</p><p>D. Yvette & J.Pierre</p><small>10 October 2026 · Kigali</small></footer>
    </main>
  )
}

export default App
