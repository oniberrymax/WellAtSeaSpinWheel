import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";

const wheelItems = ["Sleep", "Stress", "Energy", "Focus", "Fitness", "Nutrition"];

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

const tipsMatrix: Record<string, Record<string, string>> = {
  Sleep: { Sleep: "Consistent sleep and wake times strengthen your body clock and improve sleep quality.", Stress: "Poor sleep increases cortisol levels. Improving sleep duration helps your body handle stress better.", Energy: "Sleep is your primary energy source. One extra hour of sleep can boost next-day energy more than caffeine.", Focus: "Lack of sleep reduces attention and memory. Quality sleep sharpens focus and decision-making.", Fitness: "Muscle recovery happens during deep sleep. Better sleep leads to stronger training results.", Nutrition: "Sleep deprivation increases cravings for sugary foods. Good sleep supports healthier eating choices." },
  Stress: { Sleep: "Stress raises cortisol, which delays sleep. Power down screens 30 minutes before bed to help your body unwind.", Stress: "Managing stress daily prevents burnout. Short breathing breaks can reset your nervous system.", Energy: "Chronic stress drains energy reserves. Reducing stress helps restore natural energy levels.", Focus: "Stress overloads working memory. Calming your mind improves concentration and clarity.", Fitness: "Moderate exercise reduces stress hormones. Even a short walk can improve your mood.", Nutrition: "Stress affects digestion and cravings. Balanced meals help stabilize stress responses." },
  Energy: { Sleep: "Low energy often signals sleep debt. Consistent sleep restores energy more effectively than stimulants.", Stress: "Energy crashes increase stress. Stable routines help maintain both energy and calm.", Energy: "Sustained energy comes from habits, not hacks. Regular sleep and meals prevent crashes.", Focus: "Mental focus consumes energy. Working in short bursts helps preserve it.", Fitness: "Movement increases circulation and energy. Light exercise can re-energize you quickly.", Nutrition: "Energy depends on fuel quality. Whole foods release energy more steadily than sugar." },
  Focus: { Sleep: "Sleep strengthens attention and memory. One poor night can reduce focus by up to 30%.", Stress: "Stress disrupts focus. Slowing your breathing helps clear mental noise.", Energy: "Focus fades when energy drops. Short breaks help recharge your mental battery.", Focus: "The brain focuses best in intervals. Try 25-minute focus sessions for peak performance.", Fitness: "Physical activity boosts brain oxygen. Moving your body improves mental clarity.", Nutrition: "Hydration and nutrients support focus. Even mild dehydration can impair attention." },
  Fitness: { Sleep: "Exercise improves sleep depth, but late workouts can delay sleep. Train earlier when possible.", Stress: "Exercise lowers stress hormones naturally. Regular movement builds stress resilience.", Energy: "Fitness increases long-term energy. Active people feel less fatigue throughout the day.", Focus: "Movement enhances brain function. A short workout can improve focus afterward.", Fitness: "Consistency matters more than intensity. Small daily workouts deliver lasting results.", Nutrition: "Nutrition fuels fitness. Protein and carbs help muscles recover and perform better." },
  Nutrition: { Sleep: "Heavy or late meals disrupt sleep. Eating earlier supports better rest.", Stress: "Nutrient deficiencies increase stress sensitivity. Balanced meals support emotional stability.", Energy: "Food quality drives energy levels. Whole foods prevent energy spikes and crashes.", Focus: "The brain needs steady fuel. Balanced meals improve attention and mental performance.", Fitness: "Nutrition supports recovery and strength. Eating well improves training outcomes.", Nutrition: "Consistent, balanced eating supports every system in your body." }
};

export default function SpinTheWheelUX() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Sleep");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const [snapRotation, setSnapRotation] = useState<number | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [result, setResult] = useState<null | { chosen: string; landed: string; tip: string }>(null);

  const BackButton = () => (
    <Button variant="ghost" className="mb-4 text-slate-300" onClick={() => setStep((s) => Math.max(1, s - 1))}>
      ← Back
    </Button>
  );

  const resetWheel = () => {
    setSpinning(false);
    setRotation(0);
    rotationRef.current = 0;
    setSnapRotation(null);
    setIsSnapping(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl">
        <CardContent className="p-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-semibold mb-2 text-white">Welcome aboard 👋</h1>
              <p className="text-slate-300 mb-6">Start your wellness journey by completing a few quick steps.</p>
              <div className="grid gap-4">
                <input className="rounded-xl p-3 bg-slate-800 border border-slate-600 text-white" placeholder="Full Name" />
                <input className="rounded-xl p-3 bg-slate-800 border border-slate-600 text-white" placeholder="Email" />
                <input className="rounded-xl p-3 bg-slate-800 border border-slate-600 text-white" placeholder="Mobile Number (optional)" />
              </div>
              <Button className="mt-6 w-full" onClick={() => setStep(2)}>Next</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <BackButton />
              <h2 className="text-2xl font-semibold mb-4 text-white">What’s your biggest challenge right now?</h2>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl p-3 bg-slate-800 border border-slate-600 text-white">
                {wheelItems.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <Button className="mt-6 w-full" onClick={() => setStep(3)}>Next</Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-semibold mb-6 text-center text-white">Are you currently?</h2>
              <div className="flex gap-4 justify-center">
                {['Onshore','Offshore'].map(r => (
                  <Button key={r} className="rounded-xl px-8" onClick={() => setStep(4)}>{r}</Button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <BackButton />
              <h2 className="text-2xl font-semibold mb-6 text-center text-white">Spin the Wheel</h2>

              <div className="relative flex justify-center">
                <div className="relative w-72 h-72 rounded-full border-8 border-slate-700 overflow-hidden">
                  <motion.div animate={{ rotate: snapRotation ?? rotation }} transition={{ duration: isSnapping ? 0.25 : spinning ? 15 : 0, ease: isSnapping ? 'easeInOut' : 'easeOut' }} className="absolute inset-0" style={{ background: 'conic-gradient(#6366f1 0deg 60deg,#22c55e 60deg 120deg,#eab308 120deg 180deg,#ec4899 180deg 240deg,#14b8a6 240deg 300deg,#f97316 300deg 360deg)' }}>
                    <svg viewBox="0 0 288 288" className="absolute inset-0">
                      {wheelItems.map((item, index) => {
                        const slice = 360 / wheelItems.length;
                        const startAngle = slice * index;
                        const radius = 110;
                        const start = polarToCartesian(144,144,radius,startAngle+4);
                        const end = polarToCartesian(144,144,radius,startAngle+slice-4);
                        const pathId = `arc-${index}`;
                        return (
                          <g key={item}>
                            <defs>
                              <path id={pathId} d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`} />
                            </defs>
                            <text fill="#fff" fontSize="12" fontWeight="700">
                              <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">{item}</textPath>
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </motion.div>
                </div>
                <div className="absolute -top-1 w-0 h-0 border-l-8 border-r-8 border-t-[14px] border-l-transparent border-r-transparent border-t-red-500" />
              </div>

              {!result && (
                <Button className="mt-8 w-full" disabled={spinning} onClick={() => {
                  setSpinning(true);
                  setResult(null);
                  const slice = 360 / wheelItems.length;
                  const randomIndex = Math.floor(Math.random() * wheelItems.length);
                  const ANGULAR_BIAS = slice * 0.002;
                  const targetRotation = 360*6 + (360 - (randomIndex*slice + slice/2)) + ANGULAR_BIAS;
                  setRotation(r => { const next = r+targetRotation; rotationRef.current = next; return next; });
                  setTimeout(() => {
                    const finalRotation = rotationRef.current % 360;
                    const normalized = (360-finalRotation+360)%360;
                    const safeMargin = slice*0.2;
                    let nearestIndex = Math.floor(normalized/slice);
                    const sliceStart = nearestIndex*slice + safeMargin;
                    const sliceCenter = nearestIndex*slice + slice/2;
                    const sliceEnd = (nearestIndex+1)*slice - safeMargin;
                    let snappedAngle = sliceCenter;
                    if (normalized < sliceStart) snappedAngle = sliceStart;
                    if (normalized > sliceEnd) snappedAngle = sliceEnd;
                    const snapDelta = (360 - snappedAngle) - finalRotation;
                    setIsSnapping(true);
                    setSnapRotation(rotationRef.current + snapDelta);
                  },15000);
                  setTimeout(() => {
                    const landed = wheelItems[randomIndex];
                    setResult({chosen:category,landed,tip:tipsMatrix[category][landed]});
                    setSpinning(false);
                    setTimeout(() => {setIsSnapping(false); setSnapRotation(null);},300);
                  },15000);
                }}>{spinning ? 'Spinning…' : 'Spin Now'}</Button>
              )}

              {result && (
                <>
                  <div className="mt-6 p-4 rounded-xl bg-slate-800 border border-slate-600 text-white">
                    <p><strong>Chosen:</strong> {result.chosen}</p>
                    <p><strong>Landed on:</strong> {result.landed}</p>
                    <p className="mt-2">{result.tip}</p>
                  </div>
                  <Button className="mt-4 w-full" onClick={resetWheel}>Restart</Button>
                </>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
