export function GradientBackground() {
    return (
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-100">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_24px]" />
  
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/20 via-gradient-middle/20 to-gradient-end/20" />
  
        {/* Secondary gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-slate-200/50 to-gray-100/50" />
  
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]" />
      </div>
    )
  }
  