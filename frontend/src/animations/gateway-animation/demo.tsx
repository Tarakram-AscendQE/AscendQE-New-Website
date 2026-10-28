import GatewayFlow from "@/components/ui/gateway-flow";

export default function GatewayFlowDemo() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-xl border border-surface-border bg-white">
      <GatewayFlow className="h-full w-full" mode="light" />
    </div>
  );
}

