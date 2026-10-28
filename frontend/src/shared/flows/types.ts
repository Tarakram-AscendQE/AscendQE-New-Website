import React from "react";

export interface FlowAgent {
  id: string;
  name: string;
  role?: string;
  desc: string;
  icon: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  borderColor?: string;
}

export interface FlowInput {
  title: string;
  desc?: string;
  items?: string[];
  badge: string;
  lineLabel: string;
  icon: React.ElementType;
}

export interface FlowOutput {
  title: string;
  desc?: string;
  items?: string[];
  badge: string;
  lineLabel: string;
  icon: React.ElementType;
}

export interface FlowPlatformStack {
  platformName: string;
  platformTagline: string;
  platformIcon: React.ElementType;
  facilitiesTitle: string;
  facilitiesDesc: string;
  facilitiesIcon: React.ElementType;
  helmTitle: string;
  helmDesc: string;
  helmIcon: React.ElementType;
  orchestratorTitle: string;
  orchestratorDesc: string;
  orchestratorIcon: React.ElementType;
}

export interface FlowBottomBar {
  title: string;
  category: string;
  desc: string;
  icon: React.ElementType;
}

export interface PlatformFlowConfig {
  productId: "mystlc" | "mysdet" | "mytevv" | "myp95" | "myut" | "mytdm";
  kicker: string;
  heading: React.ReactNode;
  subtitle: string;
  finalStateBadge: string;
  input: FlowInput;
  platformStack: FlowPlatformStack;
  output: FlowOutput;
  agentsTitle: string;
  agents: FlowAgent[];
  agentsFooterNote?: string;
  bottomBar?: FlowBottomBar;
}
