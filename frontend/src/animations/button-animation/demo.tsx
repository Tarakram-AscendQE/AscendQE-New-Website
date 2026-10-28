import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function InteractiveHoverButtonDemo() {
  return (
    <div className="relative flex justify-center p-8 bg-surface-subtle rounded-2xl border border-surface-border">
      <InteractiveHoverButton text="Automate my first 100 test cases" to="/start" />
    </div>
  );
}

export default InteractiveHoverButtonDemo;

