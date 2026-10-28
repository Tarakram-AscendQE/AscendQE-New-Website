import { Eyebrow } from "../../../../components/ui/shared";
import { RoadmapJourney } from "./RoadmapJourney";

export function Horizons() {
  return (
    <section className="bg-[#0a1628] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="flex justify-center">
          <Eyebrow>The Trajectory</Eyebrow>
        </div>
        <h2
          className="aqe-display mt-5 text-white"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", lineHeight: 1.12, fontWeight: 600 }}
        >
          Value compounds across <span className="aqe-cyan-text">three horizons.</span>
        </h2>
        <p className="mt-5 text-[#9fb0c2]" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
          Scroll to plot the route — or jump to any stage. Each milestone unlocks as the
          journey reaches it.
        </p>
      </div>

      <div className="mt-14">
        <RoadmapJourney />
      </div>
    </section>
  );
}

