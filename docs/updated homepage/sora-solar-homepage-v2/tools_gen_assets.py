#!/usr/bin/env python3
"""
Sora Solar — asset generator.
Regenerates every SVG in ./assets from code. Style: flat vector, "Dawn Over the
Roof" palette (warm sunrise, never cold blue). Run:  python3 tools_gen_assets.py
"""
import os, math

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
os.makedirs(OUT, exist_ok=True)

INK="#0c1f33"; DUSK="#081426"; INKS="#41586f"; SUN="#ffb703"; SUND="#e39b00"
EMBER="#f4801f"; MOSS="#1f6f5c"; PAPER="#faf6ee"; SAND="#f2ead9"; LINE="#e5dcc8"

def lerp(a,b,t): return a+(b-a)*t
def bil(q,u,v):
    x = lerp(lerp(q[0][0],q[1][0],u), lerp(q[3][0],q[2][0],u), v)
    y = lerp(lerp(q[0][1],q[1][1],u), lerp(q[3][1],q[2][1],u), v)
    return (x,y)

def panels(quad, cols, rows, gap=0.014, fill="url(#panelGrad)", stroke="#081426", sw=1.4):
    out=[]
    for r in range(rows):
        for c in range(cols):
            u0=c/cols+gap; u1=(c+1)/cols-gap
            v0=r/rows+gap; v1=(r+1)/rows-gap
            pts=[bil(quad,u0,v0),bil(quad,u1,v0),bil(quad,u1,v1),bil(quad,u0,v1)]
            d=" ".join(f"{x:.1f},{y:.1f}" for x,y in pts)
            out.append(f'<polygon points="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>')
            for k in (1,2):
                a=bil(quad,u0,lerp(v0,v1,k/3)); b=bil(quad,u1,lerp(v0,v1,k/3))
                out.append(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="#0c1f33" stroke-width="0.7" opacity="0.35"/>')
    return "\n".join(out)

DEFS = f'''
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="{DUSK}"/><stop offset="34%" stop-color="#2b3a52"/>
    <stop offset="60%" stop-color="#8a5a3c"/><stop offset="78%" stop-color="{EMBER}"/>
    <stop offset="100%" stop-color="{SUN}"/>
  </linearGradient>
  <linearGradient id="skyMorning" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#9fb4c4"/><stop offset="42%" stop-color="#e7d6bd"/>
    <stop offset="74%" stop-color="#ffd79a"/><stop offset="100%" stop-color="{SUN}"/>
  </linearGradient>
  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff3c4"/><stop offset="45%" stop-color="{SUN}" stop-opacity="0.75"/>
    <stop offset="100%" stop-color="{SUN}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#16324f"/><stop offset="45%" stop-color="#0c1f33"/>
    <stop offset="72%" stop-color="#274a6b"/><stop offset="100%" stop-color="#0c1f33"/>
  </linearGradient>
  <linearGradient id="panelWarm" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#3b5a76"/><stop offset="40%" stop-color="#12283f"/>
    <stop offset="70%" stop-color="{SUND}" stop-opacity="0.34"/><stop offset="100%" stop-color="#0c1f33"/>
  </linearGradient>
  <linearGradient id="roofFace" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#3a4c63"/><stop offset="100%" stop-color="#1a2c42"/></linearGradient>
  <linearGradient id="wallFace" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#f7efe0"/><stop offset="100%" stop-color="#dcc9a8"/></linearGradient>
  <linearGradient id="wallShade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#c2ab8a"/><stop offset="100%" stop-color="#9d8567"/></linearGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>
    <feColorMatrix type="saturate" values="0"/></filter>
'''

def wrap(w,h,body,title="",grain=True,extra=""):
    g=f'<rect width="{w}" height="{h}" filter="url(#grain)" opacity="0.05" style="mix-blend-mode:multiply"/>' if grain else ""
    t=f"<title>{title}</title>" if title else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" preserveAspectRatio="xMidYMid slice">{t}\n<defs>{DEFS}{extra}</defs>\n{body}\n{g}\n</svg>\n')

def save(name, s):
    open(os.path.join(OUT,name),"w").write(s); print("wrote", name)

def clouds(y,w,op=0.3,color="#ffd89a"):
    return "\n".join(
        f'<ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{rx}" ry="{ry}" fill="{color}" opacity="{op}"/>'
        for cx,cy,rx,ry in [(w*0.18,y,w*0.10,16),(w*0.52,y-46,w*0.13,13),(w*0.80,y+26,w*0.085,11)])

def palm(x,ground,s=1.0,color=INK,op=0.9):
    h=170*s; out=[f'<path d="M{x:.0f},{ground:.0f} Q{x-14*s:.0f},{ground-h*0.55:.0f} {x:.0f},{ground-h:.0f}" stroke="{color}" stroke-width="{11*s:.1f}" fill="none" stroke-linecap="round" opacity="{op}"/>']
    for a in (-150,-115,-65,-30,-8,-172):
        rad=math.radians(a); L=95*s
        ex=x+math.cos(rad)*L; ey=ground-h+math.sin(rad)*L*0.75
        cx=x+math.cos(rad)*L*0.5; cy=ground-h+math.sin(rad)*L*0.28-22*s
        out.append(f'<path d="M{x:.0f},{ground-h:.0f} Q{cx:.0f},{cy:.0f} {ex:.0f},{ey:.0f}" stroke="{color}" stroke-width="{9*s:.1f}" fill="none" stroke-linecap="round" opacity="{op}"/>')
    return "\n".join(out)

# ══════════════════════════════════════════════════ 1. HERO
W,H=1600,1100; sx,sy=1180,660
save("hero-dawn-roof.svg", wrap(W,H,f'''
<rect width="{W}" height="{H}" fill="url(#sky)"/>
<circle cx="{sx}" cy="{sy}" r="430" fill="url(#sunGlow)"/>
<circle cx="{sx}" cy="{sy}" r="96" fill="#fff6d0"/><circle cx="{sx}" cy="{sy}" r="96" fill="{SUN}" opacity="0.5"/>
{clouds(300,W,0.22,"#ffc46b")}{clouds(470,W,0.30,"#ffd89a")}
<path d="M0,720 L180,660 L340,700 L520,640 L700,690 L900,630 L1120,700 L1320,650 L1600,706 L1600,1100 L0,1100Z" fill="#2b3d57" opacity="0.55"/>
<path d="M0,790 L240,742 L470,786 L760,730 L1040,790 L1330,742 L1600,796 L1600,1100 L0,1100Z" fill="#1a2b41" opacity="0.85"/>
<g opacity="0.35" fill="{INK}"><rect x="120" y="742" width="46" height="60"/><rect x="186" y="758" width="34" height="44"/>
<rect x="1380" y="748" width="52" height="56"/><rect x="1452" y="764" width="30" height="40"/></g>
{palm(120,980,1.15)}{palm(232,1010,0.8,INK,0.75)}{palm(1500,1000,1.0,INK,0.85)}
<g>
  <polygon points="360,700 1010,586 1274,760 560,918" fill="url(#roofFace)"/>
  <polygon points="360,700 1010,586 1274,760 560,918" fill="{SUND}" opacity="0.10"/>
  <polygon points="1010,586 1274,760 1300,748 1030,576" fill="#4a5f79"/>
  {panels([(400,706),(985,604),(1226,752),(590,890)],6,3,0.014,"url(#panelWarm)")}
  <polygon points="360,700 560,918 560,940 360,722" fill="#20344b"/>
  <polygon points="560,918 1274,760 1274,782 560,940" fill="#16273b"/>
  <polygon points="560,940 1274,782 1274,1010 560,1100" fill="url(#wallFace)"/>
  <polygon points="360,722 560,940 560,1100 360,1100" fill="url(#wallShade)"/>
  <polygon points="660,928 780,901 780,981 660,1010" fill="{SUN}" opacity="0.9"/>
  <polygon points="836,889 956,862 956,942 836,970" fill="{EMBER}" opacity="0.85"/>
  <polygon points="1030,845 1150,818 1150,898 1030,926" fill="{SUN}" opacity="0.75"/>
  <line x1="720" y1="914" x2="720" y2="996" stroke="{INK}" stroke-width="4" opacity="0.5"/>
  <line x1="896" y1="875" x2="896" y2="957" stroke="{INK}" stroke-width="4" opacity="0.5"/>
  <line x1="1090" y1="831" x2="1090" y2="913" stroke="{INK}" stroke-width="4" opacity="0.5"/>
  <polygon points="430,880 500,956 500,1100 430,1100" fill="#2c3f57"/>
</g>
<g><polygon points="1186,830 1246,817 1246,886 1186,900" fill="#e9dfcb" stroke="{INK}" stroke-width="3"/>
<circle cx="1216" cy="856" r="7" fill="{MOSS}"/></g>
<path d="M0,1100 L0,1000 Q120,960 210,1020 Q300,1075 420,1035 L420,1100Z" fill="{DUSK}" opacity="0.9"/>
<path d="M1600,1100 L1600,990 Q1470,952 1370,1018 Q1290,1068 1180,1044 L1180,1100Z" fill="{DUSK}" opacity="0.9"/>
<g stroke="{INK}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.55">
<path d="M300,300 q18,-14 36,0 q18,-14 36,0"/><path d="M400,250 q13,-10 26,0 q13,-10 26,0"/>
<path d="M480,330 q11,-8 22,0 q11,-8 22,0"/></g>
''', "Philippine home at sunrise with rooftop solar panels"))

# ══════════════════════════════════════════════════ 2-4. PROJECT CARDS
def morning_sky(w,h,sunx,suny):
    return f'''<rect width="{w}" height="{h}" fill="url(#skyMorning)"/>
<circle cx="{sunx}" cy="{suny}" r="{w*0.34:.0f}" fill="url(#sunGlow)"/>
<circle cx="{sunx}" cy="{suny}" r="{w*0.055:.0f}" fill="#fff6d0" opacity="0.95"/>
{clouds(h*0.28,w,0.35,"#fff0d2")}'''

# --- bungalow (Cebu)
w,h=900,620
save("project-bungalow.svg", wrap(w,h,f'''
{morning_sky(w,h,720,180)}
<path d="M0,430 L150,392 L330,424 L520,386 L720,428 L900,398 L900,620 L0,620Z" fill="#5b7f6a" opacity="0.5"/>
<rect y="470" width="{w}" height="150" fill="#7c9a72"/>
{palm(80,520,0.7,"#1f4a3c",0.8)}{palm(842,540,0.62,"#1f4a3c",0.7)}
<g>
  <polygon points="180,392 620,320 790,430 330,520" fill="url(#roofFace)"/>
  {panels([(212,394),(600,332),(752,424),(352,500)],5,2)}
  <polygon points="180,392 330,520 330,540 180,412" fill="#20344b"/>
  <polygon points="330,520 790,430 790,450 330,540" fill="#16273b"/>
  <polygon points="330,540 790,450 790,560 330,620" fill="url(#wallFace)"/>
  <polygon points="180,412 330,540 330,620 180,620" fill="url(#wallShade)"/>
  <polygon points="400,556 470,542 470,596 400,612" fill="{SUN}" opacity="0.85"/>
  <polygon points="530,530 600,516 600,570 530,586" fill="{SUN}" opacity="0.7"/>
  <polygon points="660,504 730,490 730,560 660,576" fill="#2c3f57"/>
</g>
<ellipse cx="500" cy="612" rx="330" ry="18" fill="{INK}" opacity="0.12"/>
''', "Bungalow with a 5 kW grid-tied rooftop array"))

# --- townhouse (Tagaytay)
_tr=[(140,300),(560,240),(820,322),(392,398)]
save("project-townhouse.svg", wrap(w,h,f'''
{morning_sky(w,h,170,150)}
<path d="M0,440 L200,392 L420,438 L660,384 L900,436 L900,620 L0,620Z" fill="#4d7a68" opacity="0.55"/>
<rect y="500" width="{w}" height="120" fill="#6f9370"/>
<g>
  <polygon points="140,300 560,240 820,322 392,398" fill="url(#roofFace)"/>
  {panels([bil(_tr,0.46,0.12),bil(_tr,0.96,0.12),bil(_tr,0.96,0.88),bil(_tr,0.46,0.88)],3,2)}
  <polygon points="140,300 392,398 392,420 140,322" fill="#20344b"/>
  <polygon points="392,398 820,322 820,344 392,420" fill="#16273b"/>
  <polygon points="392,420 820,344 820,560 392,620" fill="url(#wallFace)"/>
  <polygon points="140,322 392,420 392,620 140,620" fill="url(#wallShade)"/>
  <!-- party walls: three narrow units -->
  <g stroke="{INK}" stroke-width="4" opacity="0.18">
    <line x1="534" y1="394" x2="534" y2="606"/><line x1="676" y1="369" x2="676" y2="586"/>
  </g>
  <g fill="{SUN}" opacity="0.85">
    <polygon points="430,444 500,432 500,486 430,500"/>
    <polygon points="562,420 632,408 632,462 562,476"/>
  </g>
  <polygon points="700,396 770,384 770,438 700,452" fill="{EMBER}" opacity="0.8"/>
  <polygon points="440,528 500,517 500,606 440,620" fill="#2c3f57"/>
  <polygon points="580,504 640,493 640,582 580,596" fill="#2c3f57"/>
  <!-- shaded quadrant marker: neighbouring tree casting shade on left roof half -->
</g>
<ellipse cx="470" cy="612" rx="330" ry="16" fill="{INK}" opacity="0.12"/>
{palm(96,470,0.72,"#1f4a3c",0.85)}
{palm(846,556,0.7,"#1f4a3c",0.75)}
''', "Townhouse with a compact 3.5 kW array on the unshaded roof quadrant"))

# --- hybrid + battery (Davao)
save("project-hybrid.svg", wrap(w,h,f'''
{morning_sky(w,h,700,160)}
<path d="M0,436 L180,398 L400,440 L640,392 L900,438 L900,620 L0,620Z" fill="#57806b" opacity="0.5"/>
<rect y="486" width="{w}" height="134" fill="#7c9a72"/>
<g>
  <polygon points="150,380 580,306 760,418 320,512" fill="url(#roofFace)"/>
  {panels([(182,382),(562,318),(722,412),(342,492)],5,2,0.014,"url(#panelWarm)")}
  <polygon points="150,380 320,512 320,532 150,400" fill="#20344b"/>
  <polygon points="320,512 760,418 760,438 320,532" fill="#16273b"/>
  <polygon points="320,532 760,438 760,552 320,620" fill="url(#wallFace)"/>
  <polygon points="150,400 320,532 320,620 150,620" fill="url(#wallShade)"/>
  <polygon points="380,548 450,534 450,590 380,606" fill="{SUN}" opacity="0.9"/>
  <polygon points="510,520 580,506 580,562 510,578" fill="{SUN}" opacity="0.8"/>
</g>
<!-- battery cabinet + inverter, glowing = backup ready -->
<g>
  <rect x="700" y="470" width="112" height="150" rx="10" fill="#123047" stroke="{INK}" stroke-width="4"/>
  <rect x="716" y="490" width="80" height="14" rx="7" fill="{MOSS}"/>
  <rect x="716" y="514" width="80" height="14" rx="7" fill="{MOSS}"/>
  <rect x="716" y="538" width="80" height="14" rx="7" fill="{SUN}"/>
  <path d="M762,566 l-22,32 h18 l-8,26 26,-36 h-18 z" fill="{SUN}"/>
  <circle cx="756" cy="452" r="44" fill="{SUN}" opacity="0.22"/>
</g>
<ellipse cx="470" cy="612" rx="320" ry="16" fill="{INK}" opacity="0.12"/>
''', "Hybrid solar home with a battery cabinet sized for brownout backup"))

# ══════════════════════════════════════════════════ 5. INSTALL DAY / TEAM
w,h=900,700
def worker(x,y,s=1.0,shirt=SUN,flip=False):
    f=-1 if flip else 1
    return f'''<g transform="translate({x},{y}) scale({f*s},{s})">
  <circle cx="0" cy="-96" r="26" fill="#c98a5b"/>
  <path d="M-30,-108 a30,26 0 0 1 60,0 l6,6 -72,0 z" fill="{EMBER}"/>
  <path d="M-26,-66 q26,-14 52,0 l10,72 -72,0 z" fill="{shirt}"/>
  <rect x="-24" y="6" width="20" height="62" rx="8" fill="{INK}"/>
  <rect x="6" y="6" width="20" height="62" rx="8" fill="{INK}"/>
  <path d="M22,-58 q34,16 54,-8" stroke="{shirt}" stroke-width="17" fill="none" stroke-linecap="round"/>
  <path d="M-22,-58 q-30,20 -46,44" stroke="{shirt}" stroke-width="17" fill="none" stroke-linecap="round"/>
</g>'''
save("why-install-team.svg", wrap(w,h,f'''
{morning_sky(w,h,730,140)}
<path d="M0,330 L200,296 L430,334 L660,290 L900,332 L900,700 L0,700Z" fill="#5b7f6a" opacity="0.35"/>
<!-- roof plane, lit by the morning sun -->
<polygon points="-40,470 940,352 940,700 -40,700" fill="url(#roofFace)"/>
<polygon points="-40,470 940,352 940,378 -40,496" fill="#5a708b"/>
<polygon points="-40,470 940,352 940,700 -40,700" fill="{SUND}" opacity="0.10"/>
{panels([(40,556),(520,498),(560,652),(60,724)],3,2,0.014,"url(#panelWarm)")}
<!-- panel being fitted -->
<polygon points="352,404 620,372 634,424 366,458" fill="url(#panelGrad)" stroke="{INK}" stroke-width="5"/>
<line x1="360" y1="432" x2="628" y2="399" stroke="#0c1f33" stroke-width="2.5" opacity="0.45"/>
{worker(320,596,1.45,SUN)}
{worker(650,556,1.38,EMBER,True)}
<g><rect x="760" y="592" width="104" height="64" rx="10" fill="{MOSS}"/>
<rect x="794" y="574" width="36" height="18" rx="7" fill="{INK}"/>
<rect x="778" y="612" width="68" height="8" rx="4" fill="{PAPER}" opacity="0.5"/></g>
''', "Sora installation crew fitting a panel on a roof"))

# ══════════════════════════════════════════════════ 6. CALCULATOR DEVICE MOCK
w,h=760,860
save("calculator-device.svg", wrap(w,h,f'''
<rect width="{w}" height="{h}" fill="none"/>
<!-- paper electric bill behind -->
<g transform="rotate(-8 300 430)">
  <rect x="70" y="170" width="330" height="470" rx="12" fill="#ffffff" stroke="{LINE}" stroke-width="3"/>
  <rect x="70" y="170" width="330" height="52" rx="12" fill="{SAND}"/>
  <text x="94" y="204" font-family="Sora, sans-serif" font-size="20" font-weight="700" fill="{INK}">ELECTRIC BILL</text>
  <g fill="{LINE}">
    <rect x="94" y="252" width="230" height="12" rx="6"/><rect x="94" y="284" width="180" height="12" rx="6"/>
    <rect x="94" y="316" width="250" height="12" rx="6"/><rect x="94" y="392" width="140" height="12" rx="6"/>
    <rect x="94" y="424" width="200" height="12" rx="6"/><rect x="94" y="456" width="160" height="12" rx="6"/>
  </g>
  <rect x="94" y="342" width="180" height="34" rx="8" fill="{SUN}" opacity="0.45"/>
  <text x="104" y="368" font-family="Sora, sans-serif" font-size="22" font-weight="800" fill="{INK}">₱ 10,800</text>
  <rect x="94" y="510" width="252" height="3" fill="{LINE}"/>
  <g fill="{INK}" opacity="0.15"><rect x="94" y="536" width="120" height="66" rx="6"/></g>
</g>
<!-- phone -->
<g>
  <rect x="330" y="90" width="368" height="700" rx="46" fill="{INK}"/>
  <rect x="344" y="104" width="340" height="672" rx="36" fill="{PAPER}"/>
  <rect x="470" y="118" width="88" height="14" rx="7" fill="{INK}" opacity="0.8"/>
  <!-- app header -->
  <rect x="344" y="146" width="340" height="66" fill="{SAND}"/>
  <circle cx="382" cy="179" r="16" fill="{SUN}"/>
  <text x="408" y="186" font-family="Sora, sans-serif" font-size="19" font-weight="700" fill="{INK}">Sora Solar</text>
  <!-- input -->
  <text x="376" y="256" font-family="Instrument Sans, sans-serif" font-size="16" fill="{INKS}">Average monthly bill</text>
  <rect x="376" y="270" width="276" height="60" rx="14" fill="#ffffff" stroke="{SUN}" stroke-width="3"/>
  <text x="396" y="310" font-family="Sora, sans-serif" font-size="26" font-weight="800" fill="{INK}">₱ 10,800</text>
  <!-- result card -->
  <rect x="376" y="352" width="276" height="228" rx="18" fill="{INK}"/>
  <rect x="376" y="352" width="276" height="4" rx="2" fill="{SUN}"/>
  <text x="398" y="392" font-family="Instrument Sans, sans-serif" font-size="14" fill="#faf6ee" opacity="0.7">INDICATIVE SYSTEM</text>
  <text x="398" y="436" font-family="Sora, sans-serif" font-size="38" font-weight="800" fill="{SUN}">6.0 kW</text>
  <text x="398" y="472" font-family="Instrument Sans, sans-serif" font-size="15" fill="#faf6ee" opacity="0.8">13 panels</text>
  <rect x="398" y="490" width="232" height="2" fill="#faf6ee" opacity="0.2"/>
  <text x="398" y="524" font-family="Instrument Sans, sans-serif" font-size="14" fill="#faf6ee" opacity="0.7">EST. MONTHLY SAVINGS</text>
  <text x="398" y="558" font-family="Sora, sans-serif" font-size="26" font-weight="800" fill="#faf6ee">₱6.0k – ₱8.1k</text>
  <!-- bar chart -->
  <g>
    <rect x="376" y="606" width="52" height="96" rx="8" fill="{LINE}"/>
    <rect x="440" y="640" width="52" height="62" rx="8" fill="{SUN}"/>
    <rect x="504" y="654" width="52" height="48" rx="8" fill="{SUN}"/>
    <rect x="568" y="668" width="52" height="34" rx="8" fill="{SUND}"/>
  </g>
  <text x="376" y="726" font-family="Instrument Sans, sans-serif" font-size="13" fill="{INKS}">Bill before vs. after (indicative)</text>
  <rect x="376" y="738" width="276" height="20" rx="10" fill="{SUN}" opacity="0.25"/>
</g>
''', "Phone showing the Sora bill-first savings calculator next to an electric bill", grain=False))

# ══════════════════════════════════════════════════ 7. SYSTEM STRIPS
def strip(name, title, art):
    save(name, wrap(640,260,f'''
<rect width="640" height="260" fill="url(#skyMorning)"/>
<circle cx="540" cy="60" r="150" fill="url(#sunGlow)"/>
<rect y="196" width="640" height="64" fill="#7c9a72"/>
{art}''', title))

strip("sys-on-grid.svg","On-grid: panels feeding the house and the utility grid", f'''
<g>
  <polygon points="70,150 250,118 330,168 150,206" fill="url(#roofFace)"/>
  {panels([(88,150),(240,124),(306,164),(160,194)],4,1)}
  <polygon points="150,206 330,168 330,196 150,240" fill="url(#wallFace)"/>
  <polygon points="70,150 150,206 150,240 70,196" fill="url(#wallShade)"/>
</g>
<g stroke="{INK}" stroke-width="6" fill="none" stroke-linecap="round">
  <path d="M470,196 L470,70"/><path d="M430,92 L510,92"/><path d="M440,120 L500,120"/>
</g>
<path d="M340,168 Q408,132 462,110" stroke="{SUN}" stroke-width="7" stroke-dasharray="16 12" fill="none" stroke-linecap="round"/>
<path d="M395,150 l-12,20 h10 l-6,18 16,-24 h-10 z" fill="{SUND}"/>''')

strip("sys-hybrid.svg","Hybrid: panels plus a battery for brownout backup", f'''
<g>
  <polygon points="60,150 240,118 320,168 140,206" fill="url(#roofFace)"/>
  {panels([(78,150),(230,124),(296,164),(150,194)],4,1,0.014,"url(#panelWarm)")}
  <polygon points="140,206 320,168 320,196 140,240" fill="url(#wallFace)"/>
  <polygon points="60,150 140,206 140,240 60,196" fill="url(#wallShade)"/>
</g>
<g><rect x="420" y="112" width="90" height="128" rx="10" fill="#123047" stroke="{INK}" stroke-width="4"/>
<rect x="436" y="130" width="58" height="12" rx="6" fill="{MOSS}"/>
<rect x="436" y="150" width="58" height="12" rx="6" fill="{MOSS}"/>
<rect x="436" y="170" width="58" height="12" rx="6" fill="{SUN}"/>
<path d="M470,196 l-16,26 h13 l-7,22 20,-30 h-13 z" fill="{SUN}"/>
<circle cx="465" cy="96" r="34" fill="{SUN}" opacity="0.25"/></g>
<path d="M330,168 Q378,150 414,150" stroke="{SUN}" stroke-width="7" stroke-dasharray="16 12" fill="none" stroke-linecap="round"/>''')

strip("sys-off-grid.svg","Off-grid: a self-contained solar, battery and inverter system", f'''
<g>
  <polygon points="70,158 230,128 300,172 140,210" fill="url(#roofFace)"/>
  {panels([(86,158),(222,132),(280,168),(148,200)],4,1)}
  <polygon points="140,210 300,172 300,198 140,240" fill="url(#wallFace)"/>
  <polygon points="70,158 140,210 140,240 70,198" fill="url(#wallShade)"/>
</g>
<g transform="translate(360,0)">
  <polygon points="20,110 150,86 200,126 70,156" fill="url(#roofFace)"/>
  {panels([(34,110),(142,90),(184,122),(78,146)],3,1)}
  <rect x="40" y="156" width="120" height="84" rx="8" fill="#123047" stroke="{INK}" stroke-width="4"/>
  <rect x="58" y="176" width="84" height="12" rx="6" fill="{MOSS}"/>
  <rect x="58" y="198" width="84" height="12" rx="6" fill="{SUN}"/>
</g>
<g stroke="{INK}" stroke-width="6" stroke-linecap="round" opacity="0.35">
  <path d="M330,120 L360,90"/><path d="M330,90 L360,120"/></g>
<circle cx="345" cy="105" r="26" fill="none" stroke="{INK}" stroke-width="5" opacity="0.35"/>''')

# ══════════════════════════════════════════════════ 8. LOGO / FAVICON / OG
logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 64" width="260" height="64" role="img"><title>Sora Solar</title>
<circle cx="32" cy="32" r="26" fill="{SUN}"/>
<g stroke="{INK}" stroke-width="3.2" stroke-linecap="round" fill="none">
  <circle cx="32" cy="32" r="9"/>
  <path d="M32 12v4M32 48v4M17.9 17.9l2.8 2.8M43.3 43.3l2.8 2.8M12 32h4M48 32h4M17.9 46.1l2.8-2.8M43.3 20.7l2.8-2.8"/>
</g>
<text x="72" y="42" font-family="Sora, ui-sans-serif, sans-serif" font-size="27" font-weight="800" fill="{INK}">Sora</text>
<text x="140" y="42" font-family="Sora, ui-sans-serif, sans-serif" font-size="27" font-weight="800" fill="{SUND}">Solar</text>
</svg>'''
save("logo-sora.svg", logo)

save("favicon.svg", f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
<rect width="64" height="64" rx="14" fill="{INK}"/>
<circle cx="32" cy="32" r="22" fill="{SUN}"/>
<g stroke="{INK}" stroke-width="3.4" stroke-linecap="round" fill="none"><circle cx="32" cy="32" r="8"/>
<path d="M32 14v3.5M32 46.5V50M19.2 19.2l2.5 2.5M42.3 42.3l2.5 2.5M14 32h3.5M46.5 32H50M19.2 44.8l2.5-2.5M42.3 21.7l2.5-2.5"/></g>
</svg>''')

save("og-image.svg", wrap(1200,630,f'''
<rect width="1200" height="630" fill="{INK}"/>
<rect width="1200" height="6" fill="{SUN}"/>
<circle cx="1030" cy="470" r="330" fill="url(#sunGlow)" opacity="0.5"/>
<polygon points="700,420 1080,352 1210,436 830,520" fill="url(#roofFace)"/>
{panels([(722,420),(1064,358),(1176,430),(850,502)],5,2,0.014,"url(#panelWarm)")}
<text x="80" y="250" font-family="Sora, sans-serif" font-size="70" font-weight="800" fill="{PAPER}">Sunlight on your roof.</text>
<text x="80" y="336" font-family="Sora, sans-serif" font-size="70" font-weight="800" fill="{SUN}">Smaller bills every month.</text>
<text x="80" y="404" font-family="Instrument Sans, sans-serif" font-size="28" fill="{PAPER}" opacity="0.75">Residential solar across the Philippines · Free indicative estimate</text>
<rect x="80" y="452" width="300" height="64" rx="32" fill="{SUN}"/>
<text x="122" y="493" font-family="Sora, sans-serif" font-size="24" font-weight="700" fill="{INK}">Calculate My Savings</text>
''',"Sora Solar", grain=False))
print("done")
