import React from "react";

interface DataSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

export function DataSection({
  title,
  icon,
  children,
  columns = 3,
}: DataSectionProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className={`grid ${gridCols[columns]} gap-4`}>{children}</div>
    </div>
  );
}
