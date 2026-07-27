"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const viewMode = "orbital";
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const centerOffset = { x: 0, y: 0 };
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 280;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-background bg-foreground border-background";
      case "in-progress":
        return "text-foreground bg-background border-foreground";
      case "pending":
        return "text-background bg-foreground/40 border-background/50";
      default:
        return "text-background bg-foreground/40 border-background/50";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl h-[800px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-32 h-32 rounded-full border border-foreground/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-40 h-40 rounded-full border border-foreground/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-12 h-12 rounded-full bg-foreground/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[560px] h-[560px] rounded-full border border-foreground/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer group"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)`,
                    width: `${item.energy * 0.8 + 60}px`,
                    height: `${item.energy * 0.8 + 60}px`,
                    left: `-${(item.energy * 0.8 + 60 - 56) / 2}px`,
                    top: `-${(item.energy * 0.8 + 60 - 56) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-foreground text-background"
                      : isRelated
                      ? "bg-foreground/80 text-background"
                      : "bg-foreground/90 text-background group-hover:bg-foreground"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-foreground shadow-lg shadow-foreground/30"
                      : isRelated
                      ? "border-foreground animate-pulse"
                      : "border-foreground/40 group-hover:border-foreground"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-[1.8]" : "group-hover:scale-[1.3]"}
                `}
                >
                  <Icon size={24} />
                </div>

                <div
                  className={`
                  absolute top-16 whitespace-nowrap
                  text-sm font-semibold tracking-wider
                  transition-all duration-300 transform
                  ${isExpanded ? "text-foreground scale-[1.3] translate-y-3" : "text-foreground/70 group-hover:text-foreground group-hover:scale-110 group-hover:translate-y-1"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-36 left-1/2 -translate-x-1/2 w-[550px] bg-background/95 backdrop-blur-lg border-foreground/10 shadow-2xl shadow-foreground/10 overflow-visible z-50">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-foreground/20"></div>
                    <CardHeader className="pb-4 pt-6 px-8">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-4 py-1.5 text-xs tracking-wider font-bold ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-lg font-mono font-medium text-foreground/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-3xl font-bold mt-6 tracking-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg text-foreground/80 leading-relaxed px-8 pb-8">
                      <p className="mt-2">{item.content}</p>

                      <div className="mt-8 pt-6 border-t border-foreground/5">
                        <div className="flex justify-between items-center text-base mb-4">
                          <span className="flex items-center font-semibold text-foreground/90">
                            <Zap size={20} className="mr-2 text-yellow-500" />
                            Energy Level
                          </span>
                          <span className="font-mono font-bold text-xl">{item.energy}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-foreground/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-foreground/5">
                          <div className="flex items-center mb-4">
                            <Link size={16} className="text-foreground/70 mr-2.5" />
                            <h4 className="text-sm uppercase tracking-widest font-bold text-foreground/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-10 px-4 py-2 text-sm font-medium rounded-md border-foreground/20 bg-transparent hover:bg-foreground/5 text-foreground/80 hover:text-foreground transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={14}
                                    className="ml-2 text-foreground/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
