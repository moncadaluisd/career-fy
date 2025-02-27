interface CircularLoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  thickness?: "thin" | "normal" | "thick";
  className?: string;
}

export default function CircularLoader({
  size = "md",
  color = "primary",
  thickness = "normal",
  className = "",
}: CircularLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-gray-800",
    secondary: "border-gray-300 dark:border-gray-600",
    success: "border-green-500",
    danger: "border-red-500",
    warning: "border-amber-500",
  };

  const thicknessClasses = {
    thin: "border",
    normal: "border-2",
    thick: "border-4",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className={`w-full h-full rounded-full ${thicknessClasses[thickness]} ${colorClasses[color]} border-t-transparent animate-spin`}
      />
    </div>
  );
}
