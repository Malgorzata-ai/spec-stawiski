const DEFAULT_DATA = {
  guests: [
    {id:1,name:'Burmistrz Łomży',companion:'',role:'5 miejsc',cat:'vip'},
    {id:2,name:'Przedstawiciele banku',companion:'',role:'4 miejsca',cat:'vip'},
    {id:3,name:'Farm Frites',companion:'Osoba towarzysząca',role:'Kontrahent',cat:'vip'},
    {id:4,name:'Damak',companion:'Osoba towarzysząca',role:'Kontrahent',cat:'vip'},
    {id:5,name:'Projektanci',companion:'',role:'3 miejsca',cat:'vip'},
    {id:6,name:'Tomasz Józefczyk',companion:'Kinga Józefczyk',role:'',cat:'staff'},
    {id:7,name:'Ksawery Józefczyk',companion:'',role:'',cat:'staff'},
    {id:8,name:'Ernest Józefczyk',companion:'',role:'',cat:'staff'},
    {id:9,name:'Lena Józefczyk',companion:'',role:'',cat:'staff'},
    {id:10,name:'Stanisław Józefczyk',companion:'Maria Józefczyk',role:'',cat:'staff'},
    {id:11,name:'Mateusz Józefczyk',companion:'Joanna Józefczyk',role:'',cat:'staff'},
    {id:12,name:'Dariusz Józefczyk',companion:'Zuzanna Józefczyk',role:'',cat:'staff'},
    {id:13,name:'Artur Józefczyk',companion:'Małgorzata Józefczyk',role:'',cat:'staff'},
    {id:14,name:'Zbigniew Janeczko',companion:'Danuta Janeczko',role:'',cat:'staff'},
    {id:15,name:'Sławomir Peszek',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:16,name:'Beata Lekka',companion:'Marek Lekki',role:'',cat:'staff'},
    {id:17,name:'Kornelia Lekka Olbrycht',companion:'Kamil Olbrycht',role:'',cat:'staff'},
    {id:18,name:'Agnieszka Kłos',companion:'Mirosław Kłos',role:'',cat:'staff'},
    {id:19,name:'Konstancja Kłos Iliasz',companion:'Bogdan Iliasz',role:'',cat:'staff'},
    {id:20,name:'Maria Rejman',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:21,name:'Tomasz Parys',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:22,name:'Mateusz Zieliński',companion:'Małgorzata Zielińska',role:'',cat:'staff'},
    {id:23,name:'Weronika Tryniecka',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:24,name:'Szymon Hadam',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:25,name:'Izabela Dolecka',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:26,name:'Luiza Stykal Kiełbasa',companion:'Wiktor Kiełbasa',role:'',cat:'staff'},
    {id:27,name:'Michał Pawlak',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:28,name:'Mateusz Lepionka',companion:'Anna Lepionka',role:'',cat:'staff'},
    {id:29,name:'Marek Rzeszótko',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:30,name:'Paulina Wodzińska',companion:'Tomasz Wodziński',role:'',cat:'staff'},
    {id:31,name:'Maciej Czudak',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:32,name:'Marzena Surowiec',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:33,name:'Dawid Zieliński',companion:'Osoba towarzysząca',role:'',cat:'staff'},
    {id:34,name:'Renata Cieślachowska',companion:'Osoba towarzysząca',role:'',cat:'staff'},
  ],
  tasks:[
    {id:1,text:'Zaproszenia — przygotowanie i wysyłka (RSVP do 15 listopada)',cat:'log',done:false},
    {id:2,text:'Czerwony dywan + wstęga do przecięcia',cat:'log',done:false},
    {id:3,text:'Stoliki i hokery — wynajem lub zakup',cat:'log',done:false},
    {id:4,text:'Słodki stolik słodkości — zamówienie u cukiernika',cat:'log',done:false},
    {id:5,text:'Barman + barista — rezerwacja na 28 listopada',cat:'log',done:false},
    {id:6,text:'Marcin Daniec — podpisanie umowy (28.11, godz. 21:00, 15 500 zł netto)',cat:'art',done:false},
    {id:7,text:'Cezary Pazura — oczekiwanie na odpowiedź na zapytanie',cat:'art',done:false},
    {id:8,text:'Kabaret Młodych Panów — oczekiwanie na odpowiedź',cat:'art',done:false},
    {id:9,text:'Wybór i rezerwacja zespołu muzycznego',cat:'art',done:false},
    {id:10,text:'Zdjęcia z historii powstawania firmy — selekcja, druk, oprawa wystawy',cat:'media',done:false},
    {id:11,text:'Lista mediów — zaproszenia dla dziennikarzy i fotoreporterów',cat:'media',done:false},
    {id:12,text:'Obsługa fotograficzna i wideo z całego eventu',cat:'media',done:false},
    {id:13,text:'Oficjalne zaproszenie Burmistrza Łomży (5 miejsc)',cat:'vip',done:false},
    {id:14,text:'Potwierdzenie obecności Farm Frites i Damak',cat:'vip',done:false},
  ],
  program:[
    {id:1,time:'27 listopada',name:'🛠️ Przygotowania i dekoracje',desc:'Czerwony dywan, wstęga, hokery i stoliki, słodki stolik, stanowiska barmana i baristy',badge:'',featured:false},
    {id:2,time:'12:00',name:'✂️ Uroczyste przecięcie wstęgi',desc:'Oficjalne otwarcie nowej siedziby — przemówienie Prezesa, goście VIP, media',badge:'Kulminacyjny moment dnia',featured:true},
    {id:3,time:'12:15 – 16:00',name:'🏢 Zwiedzanie obiektu',desc:'Gości prowadzi się przez nowy oddział; na ścianach wystawa zdjęć z historii firmy',badge:'',featured:false},
    {id:4,time:'16:00 – 17:00',name:'🚗 Przejazd do Hotelu Via Baltica',desc:'Grzymały Szczepankowskie 1A — możliwość zorganizowania transportu',badge:'',featured:false},
    {id:5,time:'19:00',name:'🥂 Bal otwarcia — Hotel Via Baltica',desc:'Uroczysta kolacja, catering, oprawa muzyczna — zespół na żywo',badge:'Bal',featured:true},
    {id:6,time:'21:00 – 22:00',name:'🎤 Marcin Daniec — kabaret',desc:'Potwierdzony występ — 28 listopada, godz. 21:00',badge:'Gwiazda wieczoru · 15 500 zł netto',featured:true},
    {id:7,time:'22:00 – 23:30',name:'💃 Część taneczna i networking',desc:'Muzyka, drinki, pamiątkowe zdjęcia, nieformalne rozmowy',badge:'',featured:false},
  ],
  artists:{
    confirmed:{name:'Marcin Daniec',info:'Kabaret · 28 listopada · godz. 21:00\nDostępny i z wielką chęcią wystąpi w Łomży',price:'15 500 zł netto'},
    pending:[
      {id:1,name:'Cezary Pazura',status:'Zapytanie wysłane'},
      {id:2,name:'Kabaret Młodych Panów',status:'Zapytanie wysłane'},
    ],
    bands:[
      {id:1,name:'Zespół A',url:'https://www.youtube.com/watch?v=WwRCzW7LovE'},
      {id:2,name:'Zespół B',url:'https://www.youtube.com/watch?v=iTdOncs96zc'},
      {id:3,name:'Zespół C',url:'https://www.youtube.com/watch?v=oyhY4E57ki8'},
      {id:4,name:'Zespół D',url:'https://www.youtube.com/watch?v=TFOaWVUB4DM'},
    ]
  }
}

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/event_data?key=eq.main&select=value`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        }
      }
    )
    const rows = await res.json()
    if (rows && rows.length > 0) return Response.json(rows[0].value)
    return Response.json(DEFAULT_DATA)
  } catch(e) {
    return Response.json(DEFAULT_DATA)
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/event_data`,
      {
        method: 'POST',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({ key: 'main', value: body })
      }
    )
    if (!res.ok) {
      const err = await res.text()
      return Response.json({ ok: false, error: err }, { status: 500 })
    }
    return Response.json({ ok: true })
  } catch(e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 })
  }
}
