import { useState } from "react";
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

const onshoreTips: Record<string, Record<string, string>> = {
  Sleep: {
    Sleep: "Maintain consistent sleep/wake times — your body thrives on routine.",
    Stress: "Poor sleep increases stress. Try a relaxing evening routine to calm your mind.",
    Energy: "Extra rest boosts next-day energy more than caffeine.",
    Focus: "Sleep sharpens attention and memory. Even one bad night can reduce focus.",
    Fitness: "Muscle recovery happens during deep sleep — plan workouts earlier to optimize rest.",
    Nutrition: "Sleep affects appetite. Proper rest helps you make healthier food choices."
  },
  Stress: {
    Sleep: "Stress raises cortisol, which delays sleep. Power down screens 30 mins before bed.",
    Stress: "Daily stress management prevents burnout. Try 5-min breathing exercises.",
    Energy: "Stress drains energy. Short breaks and steady routines help maintain stamina.",
    Focus: "Stress overloads your mind. Mindful pauses improve concentration.",
    Fitness: "Exercise reduces stress hormones. Even a quick walk helps.",
    Nutrition: "Stress affects cravings and digestion. Balanced meals stabilize mood."
  },
  Energy: {
    Sleep: "Low energy often signals sleep debt. A consistent sleep schedule restores it naturally.",
    Stress: "Energy crashes increase stress. Maintain steady routines to balance both.",
    Energy: "Sustained energy comes from habits, not hacks. Regular meals prevent spikes and crashes.",
    Focus: "Focus dips when energy is low. Short breaks recharge your mental battery.",
    Fitness: "Movement boosts circulation and energy. Even 10 min of activity helps.",
    Nutrition: "Fuel quality drives energy. Whole foods release energy steadily."
  },
  Focus: {
    Sleep: "Sleep strengthens memory and attention. Avoid late-night distractions.",
    Stress: "Stress interrupts focus. Slow breathing clears mental clutter.",
    Energy: "Focus fades as energy drops. Short breaks help recharge your mind.",
    Focus: "Your brain works best in intervals. Try 25-min sessions for peak focus.",
    Fitness: "Physical activity boosts brain oxygen. Move to refresh mental clarity.",
    Nutrition: "Hydration and nutrients support attention. Even mild dehydration impairs focus."
  },
  Fitness: {
    Sleep: "Exercise improves sleep depth, but late workouts can delay rest.",
    Stress: "Fitness lowers stress hormones naturally. Short daily sessions build resilience.",
    Energy: "Regular activity increases long-term energy.",
    Focus: "Movement enhances cognitive function. A short workout boosts clarity.",
    Fitness: "Consistency beats intensity. Small daily workouts produce lasting results.",
    Nutrition: "Nutrition fuels fitness. Protein and carbs help recovery and performance."
  },
  Nutrition: {
    Sleep: "Heavy meals close to bedtime disrupt rest. Eat earlier for better sleep.",
    Stress: "Nutrient deficiencies increase stress sensitivity. Balanced meals help stabilize mood.",
    Energy: "Food quality drives energy. Whole foods prevent spikes and crashes.",
    Focus: "The brain needs steady fuel. Balanced meals improve mental performance.",
    Fitness: "Nutrition supports recovery. Eating well boosts strength and training outcomes.",
    Nutrition: "Consistent, balanced eating supports every system in your body."
  }
};

const offshoreTips: Record<string, Record<string, string>> = {
  Sleep: {
    Sleep: "Irregular shifts make sleep tricky. Use blackout curtains, earplugs, and a sleep mask to create night wherever you are.",
    Stress: "Poor sleep increases cortisol. Even a short nap can help manage tension between shifts.",
    Energy: "Sleep is your main energy source. A 20-min power nap can restore alertness like two cups of coffee.",
    Focus: "Sleep deprivation reduces attention. Stick to naps or quiet rest periods to maintain sharpness.",
    Fitness: "Muscle recovery happens during sleep. Even short rest periods improve workout results.",
    Nutrition: "Sleep affects hunger hormones. Rest helps prevent cravings for high-sugar snacks in limited mess options."
  },
  Stress: {
    Sleep: "Stress delays sleep, especially in tight quarters. Try deep breathing or guided meditation before bed.",
    Stress: "Isolation can heighten stress. Connect with colleagues, even briefly, to relieve tension.",
    Energy: "Stress drains energy fast. Structured breaks and pacing yourself during long shifts help restore stamina.",
    Focus: "High stress overloads your mind. Short mental resets improve clarity for critical tasks.",
    Fitness: "Exercise in small spaces reduces stress hormones. Bodyweight circuits or stretching work well.",
    Nutrition: "Stress affects digestion and cravings. Opt for balanced meals with available options to stabilize mood."
  },
  Energy: {
    Sleep: "Energy drops often signal sleep debt. Prioritize naps and consistent sleep when off-shift.",
    Stress: "Low energy increases stress. Hydration and pacing your workload help maintain both.",
    Energy: "Sustained energy offshore comes from habits, not caffeine. Eat regularly and move when possible.",
    Focus: "Mental focus drains energy. Use short breaks to recharge during long watch hours.",
    Fitness: "Movement boosts circulation and energy. Even 10–15 minutes of stretching or stairs helps.",
    Nutrition: "Fuel quality matters. Protein-rich snacks and whole foods help avoid energy spikes and crashes."
  },
  Focus: {
    Sleep: "Sleep restores attention and memory. Guard rest times around shift changes.",
    Stress: "Stress clouds focus. Mindful breathing or brief meditation clears mental noise.",
    Energy: "Focus fades when energy is low. Use micro-breaks to recharge.",
    Focus: "Brain works best in intervals. Try 25-min focused tasks with short movement breaks.",
    Fitness: "Physical activity increases brain oxygen. Even short onboard workouts boost mental clarity.",
    Nutrition: "Hydration and small nutrient-rich snacks support attention during long shifts."
  },
  Fitness: {
    Sleep: "Exercise improves sleep quality. Schedule workouts earlier in your shift cycle.",
    Stress: "Fitness lowers stress hormones naturally. Even short onboard routines help.",
    Energy: "Consistent activity increases energy throughout long days offshore.",
    Focus: "Movement improves cognitive function. Quick circuits can sharpen attention.",
    Fitness: "Consistency is key in limited spaces. Daily short workouts outperform infrequent long ones.",
    Nutrition: "Fuel supports fitness. Use protein-rich meals and snacks for recovery and performance."
  },
  Nutrition: {
    Sleep: "Heavy meals before rest disrupt sleep. Stick to light options near bedtime.",
    Stress: "Limited variety can increase stress sensitivity. Eat balanced meals when possible.",
    Energy: "Energy depends on available fuel. Prioritize nutrient-dense meals to avoid crashes.",
    Focus: "Steady fuel improves attention. Small, balanced portions prevent mid-shift dips.",
    Fitness: "Nutrition aids recovery. Protein and carbs improve training outcomes even in confined gyms.",
    Nutrition: "Consistency matters. Eat regularly and hydrate to support all bodily systems offshore."
  }
};

export default function SpinTheWheelUX() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Sleep");
  const [crewType, setCrewType] = useState<"Onshore" | "Offshore" | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<null | { chosen: string; landed: string; tip: string }>(null);

  const BackButton = () => (
    <Button className="mb-4 text-slate-300 bg-blue-500 hover:bg-blue-600;" onClick={() => setStep((s) => Math.max(1, s - 1))}>
      ← Back
    </Button>
  );

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
              <Button className="mt-6 w-full bg-blue-500 hover:bg-blue-600;" onClick={() => setStep(2)}>Next</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <BackButton />
              <h2 className="text-2xl font-semibold mb-4 text-white">What’s your biggest challenge right now?</h2>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl p-3 bg-slate-800 text-white border border-slate-600">
                {wheelItems.map((item) => (
                  <option key={item} value={item} className="text-white">{item}</option>
                ))}
              </select>
              <p><Button className="mt-6 w-full bg-blue-500 hover:bg-blue-600;" onClick={() => setStep(3)}>Next</Button></p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-semibold mb-4 text-white">Are you currently?</h2>
              <div className="flex gap-4 justify-center">
            {['Onshore', 'Offshore'].map((r) => (
              <Button
                key={r}
                className="rounded-xl px-8 bg-blue-500 hover:bg-blue-800"
                onClick={() => {
                  setCrewType(r as 'Onshore' | 'Offshore');
                  setStep(4);
                }}
              >
                {r}
              </Button>
            ))}
          </div>
              <Button className="mt-6 w-full bg-blue-500 hover:bg-blue-800;" onClick={() => setStep(4)}>Save</Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <BackButton />
              <h2 className="text-2xl font-semibold mb-6 text-center text-white">Spin the Wheel</h2>

              <div className="relative flex justify-center">
                <div className="relative w-72 h-72 rounded-full border-8 border-slate-700 overflow-hidden">
                  <motion.div animate={{ rotate: rotation }} transition={{ duration: spinning ? 15 : 0, ease: "easeOut" }} className="absolute inset-0" style={{ background: "conic-gradient(#6366f1 0deg 60deg,#22c55e 60deg 120deg,#eab308 120deg 180deg,#ec4899 180deg 240deg,#14b8a6 240deg 300deg,#f97316 300deg 360deg)" }}>
                    <svg viewBox="0 0 288 288" className="absolute inset-0">
                      {wheelItems.map((item, index) => {
                        const slice = 360 / wheelItems.length;
                        const startAngle = slice * index;
                        const radius = 110;
                        const start = polarToCartesian(144, 144, radius, startAngle + 4);
                        const end = polarToCartesian(144, 144, radius, startAngle + slice - 4);
                        const pathId = `arc-${index}`;
                        return (
                          <g key={item}>
                            <defs>
                              <path id={pathId} d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`} />
                            </defs>
                            <text fill="#ffffff" fontSize="12" fontWeight="700" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>
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

              <Button className="mt-8 w-full" disabled={spinning} onClick={() => {
                setSpinning(true);
                setResult(null);
                const slice = 360 / wheelItems.length;
                const randomIndex = Math.floor(Math.random() * wheelItems.length);
                setRotation((r) => r + 360 * 6 + randomIndex * slice + slice / 2);
                setTimeout(() => {
                  const landed = wheelItems[randomIndex];
                  const tipsSource = crewType === 'Offshore' ? offshoreTips : onshoreTips;
                  setResult({ chosen: category, landed, tip: tipsSource[category][landed] });
                  setSpinning(false);
                }, 15000);
              }}>{spinning ? "Spinning…" : "Spin Now"}</Button>

              {result && (
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    className="w-full mb-3"
                    onClick={() => {
                      setResult(null);
                      setRotation(0);
                    }}
                  >
                    Re-spin
                  </Button>
                  <div className="mt-6 p-4 rounded-xl bg-slate-800 border border-slate-600">
                    <p className="text-sm text-white"><strong>Chosen:</strong> {result.chosen}</p>
                    <p className="text-sm text-white"><strong>Landed on:</strong> {result.landed}</p>
                    <p className="mt-2 text-white">{result.tip}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
