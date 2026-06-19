'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const PASSWORD = 'SpecStawiski2026'

function initials(name) {
  return name.split(' ').slice(0,2).map(w => w[0]||'').join('').toUpperCase()
}

function countPersons(list) {
  let n = 0
  list.forEach(g => { n++; if (g.companion && g.companion.trim()) n++ })
  return n
}

// ── SAVE INDICATOR ──
function SaveIndicator({ saving }) {
  return (
    <div className={`save-indicator ${saving ? 'visible' : ''}`}>
      {saving === 'saving' ? '⏳ Zapisywanie...' : '✅ Zapisano'}
    </div>
  )
}

// ── LOGIN SCREEN ──
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const submit = () => {
    if (pw === PASSWORD) onLogin()
    else { setErr('Nieprawidłowe hasło. Spróbuj ponownie.'); setPw('') }
  }
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-eyebrow">Materiał poufny</div>
        <h1 className="login-title">Spec Food Service<br/><span>Stawiski 2026</span></h1>
        <div className="gold-divider" />
        <p className="login-sub">Podaj hasło aby uzyskać dostęp</p>
        <input
          className="login-input"
          type="password"
          placeholder="Hasło dostępu"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          autoFocus
        />
        <button className="login-btn" onClick={submit}>Wejdź →</button>
        {err && <div className="login-error">{err}</div>}
        <div className="login-footer">Spec Food Service Sp. z o.o.</div>
      </div>
    </div>
  )
}

// ── PROGRAM TAB ──
function ProgramTab({ program, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({ time:'', name:'', desc:'', badge:'', featured:false })

  const addItem = () => {
    if (!newItem.name.trim()) return alert('Wpisz nazwę punktu')
    const updated = [...program, { ...newItem, id: Date.now() }]
    onUpdate(updated)
    setNewItem({ time:'', name:'', desc:'', badge:'', featured:false })
    setShowForm(false)
  }

  const delItem = (id) => {
    if (confirm('Usunąć ten punkt programu?')) onUpdate(program.filter(p => p.id !== id))
  }

  const updateField = (id, field, val) => {
    onUpdate(program.map(p => p.id === id ? {...p, [field]: val} : p))
  }

  return (
    <div id="panel-program" className="panel active">
      <div className="sh-flex">
        <div>
          <div className="section-eyebrow">Plan eventu</div>
          <h2 className="section-title">Program 28 listopada</h2>
        </div>
        <div className="sh-btns">
          <button className={`ep-btn ${editing?'on':''}`} onClick={() => { setEditing(!editing); setShowForm(false) }}>
            {editing ? '✅ Gotowe' : '✏️ Edytuj'}
          </button>
          {editing && <button className="ep-btn ep-add" onClick={() => setShowForm(!showForm)}>+ Dodaj punkt</button>}
        </div>
      </div>

      <div className="loc-grid">
        <div className="loc-card">
          <div className="loc-icon">🏢</div>
          <div className="loc-label">Część I — Oficjalna</div>
          <div className="loc-name">Nowa siedziba w Stawiskach</div>
          <div className="loc-detail">Otwarcie i zwiedzanie obiektu<br/>godz. 12:00 – 16:00</div>
        </div>
        <div className="loc-card">
          <div className="loc-icon">🥂</div>
          <div className="loc-label">Część II — Uroczysta</div>
          <div className="loc-name">Hotel Via Baltica</div>
          <div className="loc-detail">Grzymały Szczepankowskie 1A<br/>18-400 Grzymały Szczepankowskie<br/>Bal od godz. 19:00</div>
        </div>
      </div>

      <div className="sh-flex" style={{marginTop:'2rem'}}>
        <div>
          <div className="section-eyebrow">Oś czasu</div>
          <h2 className="section-title" style={{fontSize:'1.3rem'}}>Harmonogram</h2>
        </div>
      </div>

      {showForm && (
        <div className="add-form-box" style={{marginBottom:'1rem'}}>
          <div style={{fontSize:'13px',fontWeight:600,marginBottom:'8px'}}>Nowy punkt programu</div>
          <div className="form-row">
            <input className="ab-input" placeholder="Godzina (np. 20:00)" value={newItem.time} onChange={e=>setNewItem({...newItem,time:e.target.value})}/>
            <input className="ab-input" placeholder="Nazwa punktu" value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})}/>
          </div>
          <input className="ab-input" placeholder="Opis (opcjonalnie)" value={newItem.desc} onChange={e=>setNewItem({...newItem,desc:e.target.value})} style={{width:'100%',marginBottom:'8px'}}/>
          <input className="ab-input" placeholder="Etykieta (opcjonalnie)" value={newItem.badge} onChange={e=>setNewItem({...newItem,badge:e.target.value})} style={{width:'100%',marginBottom:'8px'}}/>
          <label style={{fontSize:'12px',color:'var(--text-muted)',display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px',cursor:'pointer'}}>
            <input type="checkbox" checked={newItem.featured} onChange={e=>setNewItem({...newItem,featured:e.target.checked})}/> Wyróżniony (złota ramka)
          </label>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="form-btn btn-primary" onClick={addItem}>Dodaj</button>
            <button className="form-btn btn-secondary" onClick={()=>setShowForm(false)}>Anuluj</button>
          </div>
        </div>
      )}

      <div className="timeline">
        {program.map(p => (
          <div key={p.id} className={`t-item ${p.featured?'featured':''}`} style={{opacity:1,transform:'none'}}>
            <div className="t-dot"/>
            <div className="t-card">
              {editing ? (
                <>
                  <input className="ab-input" style={{marginBottom:'4px'}} value={p.time} onChange={e=>updateField(p.id,'time',e.target.value)} placeholder="Godzina"/>
                  <input className="ab-input" style={{marginBottom:'4px',fontFamily:'var(--font-playfair)',fontSize:'1.05rem'}} value={p.name} onChange={e=>updateField(p.id,'name',e.target.value)} placeholder="Nazwa"/>
                  <input className="ab-input" style={{marginBottom:'4px'}} value={p.desc} onChange={e=>updateField(p.id,'desc',e.target.value)} placeholder="Opis"/>
                  <input className="ab-input" value={p.badge} onChange={e=>updateField(p.id,'badge',e.target.value)} placeholder="Etykieta (opcja)"/>
                </>
              ) : (
                <>
                  {p.time && <div className="t-time">{p.time}</div>}
                  <div className="t-name">{p.name}</div>
                  {p.desc && <div className="t-desc">{p.desc}</div>}
                  {p.badge && <div className="t-badge">{p.badge}</div>}
                </>
              )}
            </div>
            {editing && <button className="del-btn" style={{position:'absolute',right:'6px',top:'14px'}} onClick={()=>delItem(p.id)}>✕</button>}
          </div>
        ))}
      </div>

      <div className="rsvp-banner">
        <p>Termin potwierdzenia obecności</p>
        <strong>do 15 listopada 2026 roku</strong>
      </div>
    </div>
  )
}

// ── ARTISTS TAB ──
function ArtistsTab({ artists, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [showBandForm, setShowBandForm] = useState(false)
  const [showPendingForm, setShowPendingForm] = useState(false)
  const [newBand, setNewBand] = useState({name:'',url:''})
  const [newPending, setNewPending] = useState({name:'',status:'Zapytanie wysłane'})

  const upConfirmed = (field, val) => onUpdate({...artists, confirmed:{...artists.confirmed,[field]:val}})
  const delPending  = (id) => onUpdate({...artists, pending: artists.pending.filter(p=>p.id!==id)})
  const upPending   = (id, field, val) => onUpdate({...artists, pending: artists.pending.map(p=>p.id===id?{...p,[field]:val}:p)})
  const delBand     = (id) => onUpdate({...artists, bands: artists.bands.filter(b=>b.id!==id)})
  const upBand      = (id, field, val) => onUpdate({...artists, bands: artists.bands.map(b=>b.id===id?{...b,[field]:val}:b)})

  const addBand = () => {
    if (!newBand.name.trim()) return alert('Wpisz nazwę zespołu')
    onUpdate({...artists, bands:[...artists.bands, {...newBand, id:Date.now()}]})
    setNewBand({name:'',url:''}); setShowBandForm(false)
  }
  const addPending = () => {
    if (!newPending.name.trim()) return alert('Wpisz nazwę artysty')
    onUpdate({...artists, pending:[...artists.pending, {...newPending, id:Date.now()}]})
    setNewPending({name:'',status:'Zapytanie wysłane'}); setShowPendingForm(false)
  }

  return (
    <div id="panel-artysci" className="panel active">
      <div className="sh-flex">
        <div>
          <div className="section-eyebrow">Oprawa artystyczna</div>
          <h2 className="section-title">Artyści i muzyka</h2>
        </div>
        <div className="sh-btns">
          <button className={`ep-btn ${editing?'on':''}`} onClick={()=>setEditing(!editing)}>
            {editing?'✅ Gotowe':'✏️ Edytuj'}
          </button>
          {editing && <button className="ep-btn ep-add" onClick={()=>setShowBandForm(!showBandForm)}>+ Dodaj zespół</button>}
        </div>
      </div>

      <div className="artist-confirmed">
        <div className="artist-badge">🎤</div>
        <div style={{flex:1}}>
          <div className="artist-confirmed-label">✅ Potwierdzony — gwiazda wieczoru</div>
          {editing ? (
            <>
              <input className="ab-input" style={{marginBottom:'4px',fontFamily:'var(--font-playfair)',fontSize:'1.1rem'}} value={artists.confirmed.name} onChange={e=>upConfirmed('name',e.target.value)}/>
              <input className="ab-input" style={{marginBottom:'4px'}} value={artists.confirmed.info} onChange={e=>upConfirmed('info',e.target.value)}/>
              <input className="ab-input" value={artists.confirmed.price} onChange={e=>upConfirmed('price',e.target.value)}/>
            </>
          ) : (
            <>
              <div className="artist-name">{artists.confirmed.name}</div>
              <div className="artist-info" style={{whiteSpace:'pre-line'}}>{artists.confirmed.info}</div>
              <div className="artist-price">{artists.confirmed.price}</div>
            </>
          )}
        </div>
      </div>

      <div style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'.8em',marginBottom:'.75rem'}}>
          <div className="section-eyebrow" style={{marginBottom:0}}>Oczekujemy na odpowiedź</div>
          {editing && <button className="ep-btn ep-add" style={{fontSize:'11px'}} onClick={()=>setShowPendingForm(!showPendingForm)}>+ Dodaj</button>}
        </div>
        {showPendingForm && editing && (
          <div className="add-form-box" style={{marginBottom:'1rem'}}>
            <input className="ab-input" placeholder="Nazwa artysty" value={newPending.name} onChange={e=>setNewPending({...newPending,name:e.target.value})} style={{marginBottom:'8px'}}/>
            <input className="ab-input" placeholder="Status" value={newPending.status} onChange={e=>setNewPending({...newPending,status:e.target.value})} style={{marginBottom:'8px'}}/>
            <div style={{display:'flex',gap:'8px'}}>
              <button className="form-btn btn-primary" onClick={addPending}>Dodaj</button>
              <button className="form-btn btn-secondary" onClick={()=>setShowPendingForm(false)}>Anuluj</button>
            </div>
          </div>
        )}
        <div className="pending-grid">
          {artists.pending.map(p => (
            <div key={p.id} className="pending-card">
              <div className="pending-dot"/>
              <div style={{flex:1}}>
                {editing ? (
                  <>
                    <input className="ab-input" value={p.name} onChange={e=>upPending(p.id,'name',e.target.value)} style={{marginBottom:'4px'}}/>
                    <input className="ab-input" value={p.status} onChange={e=>upPending(p.id,'status',e.target.value)}/>
                  </>
                ) : (
                  <>
                    <div className="pending-name">{p.name}</div>
                    <div className="pending-sub">{p.status}</div>
                  </>
                )}
              </div>
              {editing && <button className="del-btn" onClick={()=>delPending(p.id)}>✕</button>}
            </div>
          ))}
        </div>
      </div>

      <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'1rem'}}>
        🎵 Propozycje zespołów muzycznych
      </div>

      {showBandForm && editing && (
        <div className="add-form-box" style={{marginBottom:'1rem'}}>
          <input className="ab-input" placeholder="Nazwa zespołu" value={newBand.name} onChange={e=>setNewBand({...newBand,name:e.target.value})} style={{marginBottom:'8px'}}/>
          <input className="ab-input" placeholder="Link YouTube" value={newBand.url} onChange={e=>setNewBand({...newBand,url:e.target.value})} style={{marginBottom:'8px'}}/>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="form-btn btn-primary" onClick={addBand}>Dodaj</button>
            <button className="form-btn btn-secondary" onClick={()=>setShowBandForm(false)}>Anuluj</button>
          </div>
        </div>
      )}

      <div className="yt-note">
        <strong>Jak odsłuchać:</strong> Kliknij zespół — link otworzy się na YouTube.
        <div className="yt-links">
          {artists.bands.map(b => (
            <div key={b.id} style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <a className="yt-link-btn" href={b.url||'#'} target="_blank" rel="noreferrer" style={{flex:1}}>
                <div className="yt-play-icon">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><path d="M0 0l10 6-10 6z"/></svg>
                </div>
                {editing ? (
                  <div style={{flex:1}} onClick={e=>e.preventDefault()}>
                    <input className="ab-input" value={b.name} onChange={e=>upBand(b.id,'name',e.target.value)} style={{marginBottom:'4px'}}/>
                    <input className="ab-input" value={b.url} onChange={e=>upBand(b.id,'url',e.target.value)} placeholder="Link YouTube"/>
                  </div>
                ) : (
                  <div><strong>{b.name}</strong> <span style={{fontWeight:300,color:'rgba(61,46,14,.6)'}}>— kliknij żeby odsłuchać</span></div>
                )}
              </a>
              {editing && <button className="del-btn" onClick={()=>delBand(b.id)}>✕</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── GUESTS TAB ──
function GuestsTab({ guests, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [newGuest, setNewGuest] = useState({name:'',companion:'',cat:'vip',role:''})

  const vip   = guests.filter(g => g.cat==='vip')
  const staff = guests.filter(g => g.cat==='staff')

  const addGuest = () => {
    if (!newGuest.name.trim()) return alert('Wpisz imię i nazwisko')
    onUpdate([...guests, {...newGuest, id:Date.now()}])
    setNewGuest({name:'',companion:'',cat:'vip',role:''}); setShowForm(false)
  }
  const delGuest = (id) => { if(confirm('Usunąć tego gościa?')) onUpdate(guests.filter(g=>g.id!==id)) }

  const Chip = ({g}) => (
    <div className={`guest-chip ${g.cat==='vip'?'vip':''}`}>
      <div className={`g-avatar ${g.cat==='vip'?'av-gold':'av-dark'}`}>{initials(g.name)}</div>
      <div className="g-info">
        <div className="g-name">{g.name}</div>
        {g.companion && <div className="g-sub">+ {g.companion}</div>}
        {g.role && <div className="g-role">{g.role}</div>}
      </div>
      {editing && <button className="del-btn" onClick={()=>delGuest(g.id)}>✕</button>}
    </div>
  )

  return (
    <div id="panel-goscie" className="panel active">
      <div className="sh-flex">
        <div>
          <div className="section-eyebrow">Lista gości</div>
          <h2 className="section-title">Zaproszeni goście</h2>
        </div>
        <div className="sh-btns">
          <button className={`ep-btn ${editing?'on':''}`} onClick={()=>{setEditing(!editing);setShowForm(false)}}>
            {editing?'✅ Gotowe':'✏️ Edytuj listę'}
          </button>
          {editing && <button className="ep-btn ep-add" onClick={()=>setShowForm(!showForm)}>+ Dodaj gościa</button>}
        </div>
      </div>

      {showForm && editing && (
        <div className="add-form-box" style={{marginBottom:'1rem'}}>
          <div style={{fontSize:'13px',fontWeight:600,marginBottom:'10px'}}>Dodaj nowego gościa</div>
          <div className="form-row">
            <input className="form-input" placeholder="Imię i nazwisko" value={newGuest.name} onChange={e=>setNewGuest({...newGuest,name:e.target.value})}/>
            <input className="form-input" placeholder="Osoba towarzysząca (opcja)" value={newGuest.companion} onChange={e=>setNewGuest({...newGuest,companion:e.target.value})}/>
          </div>
          <div className="form-row">
            <select className="form-select" value={newGuest.cat} onChange={e=>setNewGuest({...newGuest,cat:e.target.value})}>
              <option value="vip">Goście VIP</option>
              <option value="staff">Zarząd i pracownicy</option>
            </select>
            <input className="form-input" placeholder="Rola / firma (opcja)" value={newGuest.role} onChange={e=>setNewGuest({...newGuest,role:e.target.value})}/>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'4px'}}>
            <button className="form-btn btn-primary" onClick={addGuest}>Dodaj gościa</button>
            <button className="form-btn btn-secondary" onClick={()=>setShowForm(false)}>Anuluj</button>
          </div>
        </div>
      )}

      <div>
        <div className="guest-section-title">
          ⭐ Goście VIP i partnerzy biznesowi
          <span className="guest-count-badge">{countPersons(vip)} os.</span>
        </div>
        <div className="guest-grid">{vip.map(g=><Chip key={g.id} g={g}/>)}</div>
      </div>
      <div style={{marginTop:'0.5rem'}}>
        <div className="guest-section-title">
          👔 Zarząd i pracownicy
          <span className="guest-count-badge">{countPersons(staff)} os.</span>
        </div>
        <div className="guest-grid">{staff.map(g=><Chip key={g.id} g={g}/>)}</div>
      </div>
    </div>
  )
}

// ── TODO TAB ──
function TodoTab({ tasks, onUpdate }) {
  const [showForm, setShowForm] = useState(false)
  const [newTask, setNewTask] = useState({text:'',cat:'log'})

  const catLabels = {log:'📋 Logistyka i dekoracje',art:'🎤 Artyści i muzyka',media:'📸 Media i dokumentacja',vip:'🤝 Koordynacja z gośćmi VIP'}

  const toggle = (id) => onUpdate(tasks.map(t=>t.id===id?{...t,done:!t.done}:t))
  const addTask = () => {
    if (!newTask.text.trim()) return alert('Wpisz treść zadania')
    onUpdate([...tasks, {...newTask, id:Date.now(), done:false}])
    setNewTask({text:'',cat:'log'}); setShowForm(false)
  }

  const done = tasks.filter(t=>t.done).length
  const pct  = tasks.length ? Math.round(done/tasks.length*100) : 0

  return (
    <div id="panel-todo" className="panel active">
      <div className="sh-flex">
        <div>
          <div className="section-eyebrow">Organizacja</div>
          <h2 className="section-title">Lista zadań</h2>
        </div>
        <button className="ep-btn ep-add" onClick={()=>setShowForm(!showForm)}>+ Dodaj zadanie</button>
      </div>

      <div className="check-count">{done} / {tasks.length} gotowych</div>
      <div className="check-progress"><div className="check-bar" style={{width:`${pct}%`}}/></div>

      {showForm && (
        <div className="add-form-box" style={{marginBottom:'1rem'}}>
          <div style={{fontSize:'13px',fontWeight:600,marginBottom:'10px'}}>Nowe zadanie</div>
          <input className="form-input" placeholder="Treść zadania" value={newTask.text} onChange={e=>setNewTask({...newTask,text:e.target.value})} style={{width:'100%',marginBottom:'10px'}}/>
          <select className="form-select" value={newTask.cat} onChange={e=>setNewTask({...newTask,cat:e.target.value})} style={{marginBottom:'10px'}}>
            <option value="log">📋 Logistyka i dekoracje</option>
            <option value="art">🎤 Artyści i muzyka</option>
            <option value="media">📸 Media i dokumentacja</option>
            <option value="vip">🤝 Koordynacja z gośćmi VIP</option>
          </select>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="form-btn btn-primary" onClick={addTask}>Dodaj</button>
            <button className="form-btn btn-secondary" onClick={()=>setShowForm(false)}>Anuluj</button>
          </div>
        </div>
      )}

      {Object.entries(catLabels).map(([cat, label]) => {
        const catTasks = tasks.filter(t=>t.cat===cat)
        if (!catTasks.length) return null
        return (
          <div key={cat}>
            <div className="check-cat">{label}</div>
            <div className="check-grid">
              {catTasks.map(t => (
                <div key={t.id} className={`check-row ${t.done?'done':''}`} onClick={()=>toggle(t.id)}>
                  <div className="check-box">
                    {t.done && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div className="check-text">{t.text}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── MAIN APP ──
export default function Home() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('program')
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(null)
  const saveTimer = useRef(null)

  // Check session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('spec_auth') === '1') setAuthed(true)
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('spec_auth', '1')
    setAuthed(true)
  }

  // Load data
  useEffect(() => {
    if (!authed) return
    fetch('/api/data').then(r=>r.json()).then(setData)
  }, [authed])

  // Save data with debounce
  const save = useCallback((newData) => {
    setData(newData)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaving('saving')
    saveTimer.current = setTimeout(async () => {
      await fetch('/api/data', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newData) })
      setSaving('saved')
      setTimeout(() => setSaving(null), 2000)
    }, 800)
  }, [])

  const totalGuests = data ? countPersons(data.guests) : 0

  if (!authed) return <LoginScreen onLogin={handleLogin}/>
  if (!data)   return <div style={{minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--gold)',fontFamily:'var(--font-playfair)',fontSize:'1.2rem'}}>Ładowanie...</div>

  return (
    <>
      <div className="hero">
        <div className="hero-border">
          <div className="hero-eyebrow">Materiał dla Prezesa — Poufne</div>
          <h1 className="hero-title">Uroczyste Otwarcie<br/><span>Nowej Siedziby</span></h1>
          <div className="gold-divider"/>
          <div className="hero-date">28 listopada 2026 roku</div>
          <div className="hero-meta">
            <div className="hero-meta-item">📍 Oddział w Stawiskach + Hotel Via Baltica</div>
            <div className="hero-meta-item">🕐 12:00 – 23:30</div>
            <div className="hero-meta-item">👥 ~{totalGuests} osób</div>
          </div>
        </div>
      </div>

      <div className="nav-wrap">
        <div className="nav-tabs">
          {[['program','Program dnia'],['artysci','Artyści i muzyka'],['goscie','Goście'],['todo','Do zrobienia']].map(([id,label]) => (
            <button key={id} className={`nav-tab ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="panels">
        {tab==='program'  && <ProgramTab  program={data.program}   onUpdate={p => save({...data, program:p})}/>}
        {tab==='artysci'  && <ArtistsTab  artists={data.artists}   onUpdate={a => save({...data, artists:a})}/>}
        {tab==='goscie'   && <GuestsTab   guests={data.guests}     onUpdate={g => save({...data, guests:g})}/>}
        {tab==='todo'     && <TodoTab     tasks={data.tasks}       onUpdate={t => save({...data, tasks:t})}/>}
      </div>

      <div className="page-footer" style={{textAlign:'center',padding:'2rem',fontSize:'12px',color:'var(--text-muted)',borderTop:'1px solid var(--border)'}}>
        Spec Food Service Sp. z o.o. · Otwarcie Oddziału w Stawiskach · 28 listopada 2026
      </div>

      <SaveIndicator saving={saving}/>
    </>
  )
}
